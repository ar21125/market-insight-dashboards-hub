
from pydantic import BaseModel
from typing import Dict, Any, Optional, List
from enum import Enum

class ModelType(str, Enum):
    # Time Series Models
    SARIMA = "sarima"
    ARIMA = "arima"
    PROPHET = "prophet"
    LSTM = "lstm"
    EXPONENTIAL_SMOOTHING = "exponential_smoothing"
    
    # Classification Models
    RANDOM_FOREST = "randomForest"
    XGBOOST = "xgboost"
    SVM = "svm"
    LOGISTIC_REGRESSION = "logistic_regression"
    NAIVE_BAYES = "naive_bayes"
    
    # Clustering Models
    KMEANS = "kmeans"
    HIERARCHICAL = "hierarchical"
    DBSCAN = "dbscan"
    
    # Statistical Models
    ANOVA = "anova"
    T_TEST = "t_test"
    CHI_SQUARE = "chi_square"
    
    # Regression Models
    LINEAR_REGRESSION = "linear_regression"
    POLYNOMIAL_REGRESSION = "polynomial_regression"
    RIDGE_REGRESSION = "ridge_regression"
    
    # Dimensionality Reduction Models
    PCA = "pca"
    TSNE = "tsne"

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

class ModelInfo(BaseModel):
    name: str
    description: str
    category: str
    parameters: List[str]
    industries: Optional[List[str]] = None

class ModelParameter(BaseModel):
    description: str
    required: bool
    type: str

class ModelParametersResponse(BaseModel):
    model_id: str
    parameters: List[str]
    metadata: Dict[str, ModelParameter]

class ModelsResponse(BaseModel):
    models: Dict[str, ModelInfo]

class CategoriesResponse(BaseModel):
    categories: List[str]

class IndustriesResponse(BaseModel):
    industries: List[str]
