
from fastapi import APIRouter, UploadFile, File, Form, BackgroundTasks, HTTPException, Depends
from fastapi.responses import JSONResponse
import os
import uuid
import json
import logging
from typing import Dict, Any, Optional, List
from app.models.schemas import ModelType, Industry, AnalysisResponse
from app.services.ml_service import ml_service
from app.services.supabase_service import supabase_service
from app.services.models import MODEL_REGISTRY, get_models_by_industry, get_models_by_category, get_model_parameters

router = APIRouter(prefix="/analyze", tags=["Analysis"])

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

@router.post("/", response_model=AnalysisResponse)
async def analyze_file(
    background_tasks: BackgroundTasks,
    file: UploadFile = File(...),
    file_id: str = Form(...),
    industry: Industry = Form(...),
    model_type: ModelType = Form(...),
    parameters: Optional[str] = Form("{}")
):
    """
    Endpoint to analyze a file using a specific model
    """
    try:
        # Generate a unique ID for this analysis
        analysis_id = str(uuid.uuid4())
        
        # Save the uploaded file temporarily
        temp_file_path = f"/tmp/{file_id}_{file.filename}"
        with open(temp_file_path, "wb") as temp_file:
            content = await file.read()
            temp_file.write(content)
        
        # Parse parameters
        params_dict = json.loads(parameters)
        
        # Process the file in the background
        background_tasks.add_task(
            process_analysis,
            temp_file_path,
            file_id,
            analysis_id,
            model_type,
            industry,
            params_dict
        )
        
        return {
            "id": analysis_id,
            "status": "processing",
            "message": "Analysis started"
        }
        
    except Exception as e:
        logger.error(f"Error starting analysis: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error starting analysis: {str(e)}")

@router.post("/from-storage", response_model=AnalysisResponse)
async def analyze_from_storage(
    background_tasks: BackgroundTasks,
    file_id: str,
    industry: Industry,
    model_type: ModelType,
    parameters: Dict[str, Any] = {}
):
    """
    Endpoint to analyze a file that is already in Supabase storage
    """
    try:
        # Generate a unique ID for this analysis
        analysis_id = str(uuid.uuid4())
        
        # Update file status to processing
        await supabase_service.update_file_status(file_id, "processing")
        
        # Get the file path from Supabase
        file_path = await supabase_service.get_file_path(file_id)
        
        if not file_path:
            raise HTTPException(status_code=404, detail="File not found")
        
        # Download the file to a temporary location
        temp_file_path = f"/tmp/{file_id}_{file_path.split('/')[-1]}"
        success = await supabase_service.download_file("excel_templates", file_path, temp_file_path)
        
        if not success:
            raise HTTPException(status_code=500, detail="Failed to download file")
        
        # Process the file in the background
        background_tasks.add_task(
            process_analysis,
            temp_file_path,
            file_id,
            analysis_id,
            model_type,
            industry,
            parameters
        )
        
        return {
            "id": analysis_id,
            "status": "processing",
            "message": "Analysis started"
        }
        
    except Exception as e:
        logger.error(f"Error starting analysis: {str(e)}")
        # Update file status to failed
        await supabase_service.update_file_status(file_id, "failed")
        raise HTTPException(status_code=500, detail=f"Error starting analysis: {str(e)}")

@router.get("/models")
async def get_available_models(industry: Optional[str] = None, category: Optional[str] = None):
    """Get all supported model types and their descriptions"""
    
    if industry and category:
        # Filter by both industry and category
        models_by_industry = get_models_by_industry(industry)
        models_by_category = get_models_by_category(category)
        
        # Intersection of both filters
        models = {k: v for k, v in models_by_industry.items() if k in models_by_category}
    elif industry:
        # Filter by industry only
        models = get_models_by_industry(industry)
    elif category:
        # Filter by category only
        models = get_models_by_category(category)
    else:
        # No filters, return all models
        models = MODEL_REGISTRY
    
    # Format the response
    formatted_models = {}
    for model_id, model_info in models.items():
        formatted_models[model_id] = {
            "name": model_info.get("class", model_id),
            "description": model_info.get("description", ""),
            "category": model_info.get("category", "other"),
            "parameters": model_info.get("parameters", []),
            "industries": model_info.get("industries", [])
        }
    
    return formatted_models

@router.get("/models/{model_id}/parameters")
async def get_model_parameters_endpoint(model_id: str):
    """Get parameters for a specific model"""
    if model_id not in MODEL_REGISTRY:
        raise HTTPException(status_code=404, detail=f"Model {model_id} not found")
    
    # Get parameters from the model registry
    parameters = MODEL_REGISTRY[model_id].get("parameters", [])
    
    # Get additional metadata about parameters if available
    parameter_metadata = {}
    for param in parameters:
        parameter_metadata[param] = {
            "description": f"Parameter {param} for {model_id} model",
            "required": param in ["target_column", "date_column", "value_column", "group_column"],
            "type": "number" if param in ["n_clusters", "p", "d", "q", "epochs", "degree", "alpha"] else "string"
        }
    
    return {
        "model_id": model_id,
        "parameters": parameters,
        "metadata": parameter_metadata
    }

@router.get("/categories")
async def get_model_categories():
    """Get all available model categories"""
    
    categories = set()
    for model_info in MODEL_REGISTRY.values():
        if "category" in model_info:
            categories.add(model_info["category"])
    
    return {"categories": sorted(list(categories))}

@router.get("/industries")
async def get_model_industries():
    """Get all available industries supported by models"""
    
    industries = set()
    for model_info in MODEL_REGISTRY.values():
        if "industries" in model_info:
            industries.update(model_info["industries"])
    
    return {"industries": sorted(list(industries))}

async def process_analysis(
    file_path: str,
    file_id: str,
    analysis_id: str,
    model_type: ModelType,
    industry: Industry,
    parameters: Dict[str, Any]
):
    """
    Process the analysis in the background
    """
    try:
        # Process the file with ML service
        result, metrics = await ml_service.process_file(
            file_path, model_type, industry, parameters
        )
        
        # Store the result in Supabase
        result_id = await supabase_service.store_analysis_result(
            file_id, model_type, industry, result, metrics
        )
        
        # Update file status
        if result_id:
            await supabase_service.update_file_status(file_id, "completed", result_id)
        else:
            await supabase_service.update_file_status(file_id, "failed")
            
    except Exception as e:
        logger.error(f"Error processing analysis: {str(e)}")
        await supabase_service.update_file_status(file_id, "failed")
    finally:
        # Clean up the temporary file
        if os.path.exists(file_path):
            os.remove(file_path)
