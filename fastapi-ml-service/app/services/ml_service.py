
import pandas as pd
import numpy as np
import logging
from typing import Dict, Any, Tuple, List, Optional
import importlib
from app.models.schemas import ModelType, Industry
from app.services.models import get_model_class, get_complementary_models

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
                
                # Add visualization recommendations based on model type
                result["visualizations"] = self.get_visualization_recommendations(model_type)
                
                # Get complementary analysis recommendations
                complementary_models = get_complementary_models(model_type, industry)
                if complementary_models:
                    result["complementary_analyses"] = complementary_models
                
                return result, metrics
                
            except ValueError as e:
                logger.error(f"Error getting model class: {str(e)}")
                raise
                
        except Exception as e:
            logger.error(f"Error processing file: {str(e)}")
            raise
    
    def get_visualization_recommendations(self, model_type: ModelType) -> List[Dict[str, Any]]:
        """
        Get recommendations for visualizations based on the model type
        """
        visualizations = []
        
        # Time Series Models
        if model_type in [ModelType.SARIMA, ModelType.ARIMA, ModelType.PROPHET, ModelType.EXPONENTIAL_SMOOTHING]:
            visualizations = [
                {"type": "line", "title": "Predicción vs Valores Reales", "description": "Comparación entre valores predichos y reales"},
                {"type": "area", "title": "Intervalos de Confianza", "description": "Predicción con intervalos de confianza"},
                {"type": "bar", "title": "Error de Predicción", "description": "Error absoluto por periodo"}
            ]
        
        # Classification Models
        elif model_type in [ModelType.RANDOM_FOREST, ModelType.XGBOOST, ModelType.SVM, ModelType.LOGISTIC_REGRESSION, ModelType.NAIVE_BAYES]:
            visualizations = [
                {"type": "bar", "title": "Importancia de Variables", "description": "Variables más importantes para la clasificación"},
                {"type": "pie", "title": "Distribución de Clases", "description": "Distribución de las clases predichas"},
                {"type": "heatmap", "title": "Matriz de Confusión", "description": "Matriz de confusión del modelo"}
            ]
        
        # Clustering Models
        elif model_type in [ModelType.KMEANS, ModelType.HIERARCHICAL, ModelType.DBSCAN]:
            visualizations = [
                {"type": "scatter", "title": "Clusters Identificados", "description": "Visualización de clusters en 2D"},
                {"type": "bar", "title": "Tamaño de Clusters", "description": "Número de elementos por cluster"},
                {"type": "radar", "title": "Perfiles de Cluster", "description": "Características medias por cluster"}
            ]
        
        # Statistical Models
        elif model_type in [ModelType.ANOVA, ModelType.T_TEST, ModelType.CHI_SQUARE]:
            visualizations = [
                {"type": "bar", "title": "Valores P por Variable", "description": "Significancia estadística por variable"},
                {"type": "boxplot", "title": "Distribución por Grupos", "description": "Comparación de distribuciones entre grupos"},
                {"type": "heatmap", "title": "Correlaciones", "description": "Mapa de correlación entre variables"}
            ]
        
        # Regression Models
        elif model_type in [ModelType.LINEAR_REGRESSION, ModelType.POLYNOMIAL_REGRESSION, ModelType.RIDGE_REGRESSION]:
            visualizations = [
                {"type": "scatter", "title": "Valores Predichos vs Reales", "description": "Comparación de valores predichos y reales"},
                {"type": "bar", "title": "Coeficientes del Modelo", "description": "Importancia de cada variable en el modelo"},
                {"type": "line", "title": "Residuales", "description": "Distribución de residuales del modelo"}
            ]
        
        # Dimensionality Reduction Models
        elif model_type in [ModelType.PCA, ModelType.TSNE]:
            visualizations = [
                {"type": "scatter", "title": "Proyección 2D", "description": "Visualización de datos en espacio reducido"},
                {"type": "bar", "title": "Varianza Explicada", "description": "Porcentaje de varianza explicada por componente"},
                {"type": "heatmap", "title": "Cargas de Componentes", "description": "Contribución de variables originales a componentes"}
            ]
            
        # Add default visualizations in case the model type is not recognized
        if not visualizations:
            visualizations = [
                {"type": "bar", "title": "Resumen de Resultados", "description": "Resumen general de los resultados del análisis"},
                {"type": "line", "title": "Tendencias", "description": "Tendencias identificadas en los datos"}
            ]
            
        return visualizations

# Create a singleton instance
ml_service = MLService()
