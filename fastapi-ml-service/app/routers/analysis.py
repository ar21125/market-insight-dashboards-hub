
from fastapi import APIRouter, UploadFile, File, Form, BackgroundTasks, HTTPException, Depends
from fastapi.responses import JSONResponse
import os
import uuid
import json
import logging
from typing import Dict, Any, Optional
from app.models.schemas import ModelType, Industry, AnalysisResponse
from app.services.ml_service import ml_service
from app.services.supabase_service import supabase_service

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
