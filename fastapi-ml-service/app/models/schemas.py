
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
