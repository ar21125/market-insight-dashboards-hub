
import pandas as pd
import numpy as np
import logging
from typing import Dict, Any, Tuple
import importlib
from app.models.schemas import ModelType, Industry
from app.services.models import (
    time_series_models,
    classification_models, 
    clustering_models,
    statistical_models
)

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class MLService:
    def __init__(self):
        self.model_registry = {
            # Time series models
            ModelType.SARIMA: time_series_models.sarima_analysis,
            ModelType.ARIMA: time_series_models.arima_analysis,
            ModelType.PROPHET: time_series_models.prophet_analysis,
            ModelType.LSTM: time_series_models.lstm_analysis,
            
            # Classification models
            ModelType.RANDOM_FOREST: classification_models.random_forest_analysis,
            ModelType.XGBOOST: classification_models.xgboost_analysis,
            ModelType.SVM: classification_models.svm_analysis,
            
            # Clustering models
            ModelType.KMEANS: clustering_models.kmeans_analysis,
            
            # Statistical models
            ModelType.ANOVA: statistical_models.anova_analysis,
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

# Create a singleton instance
ml_service = MLService()
