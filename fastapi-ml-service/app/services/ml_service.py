
import pandas as pd
import numpy as np
import logging
from typing import Dict, Any, Tuple
import importlib
from app.models.schemas import ModelType, Industry
from app.services.models import get_model_class

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class MLService:
    def __init__(self):
        # We no longer need to map model types to functions directly
        # Instead, we'll use the model registry to get the appropriate model class
        pass
    
    async def process_file(self, file_path: str, model_type: ModelType, 
                         industry: Industry, parameters: Dict[str, Any]) -> Tuple[Dict[str, Any], Dict[str, Any]]:
        """
        Process the file with the specified model type
        """
        try:
            # Read the Excel file
            df = pd.read_excel(file_path)
            
            # Get the appropriate model class
            try:
                model_class = get_model_class(model_type)
                
                # Process with the model
                result, metrics = model_class.analyze(df, industry, parameters)
                return result, metrics
                
            except ValueError as e:
                logger.error(f"Error getting model class: {str(e)}")
                raise
                
        except Exception as e:
            logger.error(f"Error processing file: {str(e)}")
            raise

# Create a singleton instance
ml_service = MLService()
