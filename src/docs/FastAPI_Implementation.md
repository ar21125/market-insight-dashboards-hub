
# FastAPI Implementation Guide for MCP Integration

This document provides guidance on implementing the FastAPI backend that will connect to the MCP (Model Communication Protocol) for machine learning analysis.

## Project Structure

```
mcp-fastapi/
├── app/
│   ├── __init__.py
│   ├── main.py
│   ├── models/
│   │   ├── __init__.py
│   │   └── schemas.py
│   ├── services/
│   │   ├── __init__.py
│   │   └── mcp_service.py
│   └── routers/
│       ├── __init__.py
│       └── analysis.py
├── requirements.txt
└── README.md
```

## Requirements

Create a `requirements.txt` file with these dependencies:

```
fastapi==0.95.0
uvicorn==0.21.1
python-multipart==0.0.6
supabase==1.0.3
pandas==1.5.3
numpy==1.24.2
scikit-learn==1.2.2
prophet==1.1.4
statsmodels==0.13.5
matplotlib==3.7.1
seaborn==0.12.2
```

## FastAPI Implementation

### 1. Main Application (`main.py`)

```python
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import analysis

app = FastAPI(
    title="MCP Analysis API",
    description="API for machine learning analysis using MCP",
    version="1.0.0"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(analysis.router)

@app.get("/")
async def root():
    return {"message": "Welcome to MCP Analysis API"}
```

### 2. Schemas (`models/schemas.py`)

```python
from pydantic import BaseModel
from typing import Dict, Any, Optional, List
from enum import Enum

class ModelType(str, Enum):
    SARIMA = "sarima"
    ARIMA = "arima"
    PROPHET = "prophet"
    KMEANS = "kmeans"
    RANDOM_FOREST = "randomForest"
    XGBOOST = "xgboost"
    LSTM = "lstm"
    SVM = "svm"
    ANOVA = "anova"

class Industry(str, Enum):
    RETAIL = "retail"
    FINANZAS = "finanzas"
    SALUD = "salud"
    MANUFACTURA = "manufactura"
    TECNOLOGIA = "tecnologia"
    EDUCACION = "educacion"

class AnalysisRequest(BaseModel):
    file_id: str
    model_type: ModelType
    industry: Industry
    parameters: Optional[Dict[str, Any]] = {}

class AnalysisResponse(BaseModel):
    id: str
    status: str
    message: Optional[str] = None
```

### 3. MCP Service (`services/mcp_service.py`)

```python
import os
import pandas as pd
import numpy as np
import uuid
import json
from typing import Dict, Any, Tuple, Optional
import logging
from app.models.schemas import ModelType, Industry

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class MCPService:
    def __init__(self):
        self.model_registry = {
            ModelType.SARIMA: self.sarima_analysis,
            ModelType.ARIMA: self.arima_analysis,
            ModelType.PROPHET: self.prophet_analysis,
            ModelType.KMEANS: self.kmeans_analysis,
            ModelType.RANDOM_FOREST: self.random_forest_analysis,
            ModelType.XGBOOST: self.xgboost_analysis,
            ModelType.LSTM: self.lstm_analysis,
            ModelType.SVM: self.svm_analysis,
            ModelType.ANOVA: self.anova_analysis,
        }
    
    async def process_file(self, file_path: str, model_type: ModelType, 
                         industry: Industry, parameters: Dict[str, Any]) -> Tuple[Dict[str, Any], Dict[str, Any]]:
        """
        Process the file with the specified model type
        """
        try:
            # Read the Excel file
            df = pd.read_excel(file_path)
            
            # Process with the appropriate model
            if model_type in self.model_registry:
                processor = self.model_registry[model_type]
                result, metrics = processor(df, industry, parameters)
                return result, metrics
            else:
                raise ValueError(f"Unsupported model type: {model_type}")
                
        except Exception as e:
            logger.error(f"Error processing file: {str(e)}")
            raise
    
    # Model implementations
    def sarima_analysis(self, df: pd.DataFrame, industry: Industry, 
                      parameters: Dict[str, Any]) -> Tuple[Dict[str, Any], Dict[str, Any]]:
        """
        Implement SARIMA analysis (seasonal time series)
        """
        logger.info(f"Running SARIMA analysis for {industry}")
        
        # Example implementation - replace with actual SARIMA model
        result = {
            "summary": "Análisis SARIMA completado con éxito. Se ha identificado una estacionalidad clara en los datos.",
            "forecast": [val for val in np.random.normal(100, 10, 12).tolist()],
            "seasonal_components": {
                "trend": [val for val in np.random.normal(0, 1, 12).tolist()],
                "seasonal": [val for val in np.sin(np.linspace(0, 2*np.pi, 12)).tolist()],
                "residual": [val for val in np.random.normal(0, 0.5, 12).tolist()]
            }
        }
        
        metrics = {
            "AIC": round(np.random.normal(500, 50), 2),
            "BIC": round(np.random.normal(520, 50), 2),
            "RMSE": round(np.random.uniform(5, 15), 2),
            "MAPE": round(np.random.uniform(3, 8), 2)
        }
        
        return result, metrics
    
    # Implement other model analyses with similar patterns
    def arima_analysis(self, df: pd.DataFrame, industry: Industry, 
                     parameters: Dict[str, Any]) -> Tuple[Dict[str, Any], Dict[str, Any]]:
        # Implement ARIMA analysis
        # ...
        return {"summary": "ARIMA analysis completed"}, {"RMSE": 12.5}
        
    def prophet_analysis(self, df: pd.DataFrame, industry: Industry, 
                       parameters: Dict[str, Any]) -> Tuple[Dict[str, Any], Dict[str, Any]]:
        # Implement Prophet analysis
        # ...
        return {"summary": "Prophet analysis completed"}, {"MAPE": 5.2}
    
    def kmeans_analysis(self, df: pd.DataFrame, industry: Industry, 
                      parameters: Dict[str, Any]) -> Tuple[Dict[str, Any], Dict[str, Any]]:
        # Implement KMeans clustering
        # ...
        return {"summary": "KMeans clustering completed"}, {"Silhouette": 0.68}
    
    def random_forest_analysis(self, df: pd.DataFrame, industry: Industry, 
                             parameters: Dict[str, Any]) -> Tuple[Dict[str, Any], Dict[str, Any]]:
        # Implement Random Forest analysis
        # ...
        return {"summary": "Random Forest analysis completed"}, {"Accuracy": 0.92}
    
    def xgboost_analysis(self, df: pd.DataFrame, industry: Industry, 
                       parameters: Dict[str, Any]) -> Tuple[Dict[str, Any], Dict[str, Any]]:
        # Implement XGBoost analysis
        # ...
        return {"summary": "XGBoost analysis completed"}, {"AUC": 0.95}
    
    def lstm_analysis(self, df: pd.DataFrame, industry: Industry, 
                    parameters: Dict[str, Any]) -> Tuple[Dict[str, Any], Dict[str, Any]]:
        # Implement LSTM analysis
        # ...
        return {"summary": "LSTM analysis completed"}, {"MAE": 8.7}
    
    def svm_analysis(self, df: pd.DataFrame, industry: Industry, 
                   parameters: Dict[str, Any]) -> Tuple[Dict[str, Any], Dict[str, Any]]:
        # Implement SVM analysis
        # ...
        return {"summary": "SVM analysis completed"}, {"F1-Score": 0.88}
    
    def anova_analysis(self, df: pd.DataFrame, industry: Industry, 
                     parameters: Dict[str, Any]) -> Tuple[Dict[str, Any], Dict[str, Any]]:
        # Implement ANOVA analysis
        # ...
        return {"summary": "ANOVA analysis completed"}, {"p-value": 0.023}

# Create a singleton instance
mcp_service = MCPService()
```

### 4. Analysis Router (`routers/analysis.py`)

```python
from fastapi import APIRouter, UploadFile, File, Form, BackgroundTasks, HTTPException
from fastapi.responses import JSONResponse
import os
import uuid
import json
import logging
from supabase import create_client, Client
from typing import Dict, Any, Optional
from app.models.schemas import ModelType, Industry, AnalysisResponse
from app.services.mcp_service import mcp_service

router = APIRouter(prefix="/analyze", tags=["Analysis"])

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Initialize Supabase client
supabase_url = os.getenv("SUPABASE_URL")
supabase_key = os.getenv("SUPABASE_KEY")
supabase: Client = create_client(supabase_url, supabase_key)

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
        # Save the uploaded file temporarily
        temp_file_path = f"/tmp/{uuid.uuid4()}-{file.filename}"
        with open(temp_file_path, "wb") as temp_file:
            content = await file.read()
            temp_file.write(content)
        
        # Parse parameters
        params_dict = json.loads(parameters)
        
        # Generate a unique ID for this analysis
        analysis_id = str(uuid.uuid4())
        
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
        # Update status to processing
        data, error = supabase.table("analysis_results").insert({
            "id": analysis_id,
            "file_id": file_id,
            "model_type": model_type,
            "industry": industry,
            "status": "processing"
        }).execute()
        
        if error:
            logger.error(f"Error creating analysis record: {error}")
            return
            
        # Process the file with MCP service
        result, metrics = await mcp_service.process_file(
            file_path, model_type, industry, parameters
        )
        
        # Update the analysis record with results
        data, error = supabase.table("analysis_results").update({
            "result": result,
            "metrics": metrics,
            "status": "completed"
        }).eq("id", analysis_id).execute()
        
        if error:
            logger.error(f"Error updating analysis record: {error}")
            
        # Clean up the temporary file
        os.remove(file_path)
        
    except Exception as e:
        logger.error(f"Error processing analysis: {str(e)}")
        # Update analysis record with error
        supabase.table("analysis_results").update({
            "status": "failed",
            "result": {"error": str(e)}
        }).eq("id", analysis_id).execute()
        
        # Clean up the temporary file if it exists
        if os.path.exists(file_path):
            os.remove(file_path)
```

## Running the FastAPI Application

Create a `run.py` file in the project root:

```python
import uvicorn

if __name__ == "__main__":
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
```

Run with:
```
python run.py
```

## Environment Variables

Create a `.env` file with the following variables:

```
SUPABASE_URL=https://lvqambsuvlqauledrndt.supabase.co
SUPABASE_KEY=your-supabase-key
```

Make sure to set these environment variables before running the application.
