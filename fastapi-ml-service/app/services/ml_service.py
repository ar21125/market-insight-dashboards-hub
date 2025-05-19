
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
                
                # Add action recommendations based on model results and metrics
                result["action_recommendations"] = self.get_action_recommendations(model_type, metrics, industry)
                
                # Add important variables if applicable
                if "important_features" in result:
                    # Transform to a standardized format for frontend
                    result["important_variables"] = [
                        {"name": feature, "importance": importance}
                        for feature, importance in result["important_features"].items()
                    ]
                
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
    
    def get_action_recommendations(self, model_type: ModelType, metrics: Dict[str, Any], industry: Industry) -> List[Dict[str, Any]]:
        """
        Generate action recommendations based on model type, metrics, and industry
        """
        recommendations = []
        
        # Recommendations for time series models
        if model_type in [ModelType.SARIMA, ModelType.ARIMA, ModelType.PROPHET, ModelType.EXPONENTIAL_SMOOTHING]:
            # Check MAPE for forecast accuracy
            if 'mape' in metrics and metrics['mape'] > 15:
                recommendations.append({
                    "type": "action",
                    "title": "Mejorar precisión del pronóstico",
                    "description": "El error de pronóstico (MAPE) es alto. Considere incluir variables externas o ajustar la estacionalidad.",
                    "priority": "high"
                })
            
            # Check for residual autocorrelation
            if 'residual_autocorrelation' in metrics and metrics['residual_autocorrelation'] > 0.2:
                recommendations.append({
                    "type": "action",
                    "title": "Ajustar términos de autocorrelación",
                    "description": "Los residuales muestran autocorrelación significativa. Reconsidere los términos AR y MA del modelo.",
                    "priority": "medium"
                })
                
            # Industry-specific recommendations
            if industry == Industry.RETAIL:
                recommendations.append({
                    "type": "insight",
                    "title": "Optimización de inventario",
                    "description": "Utilice estas predicciones para optimizar niveles de inventario y reducir costos de almacenamiento.",
                    "priority": "medium"
                })
            elif industry == Industry.FINANZAS:
                recommendations.append({
                    "type": "insight",
                    "title": "Previsión de flujo de caja",
                    "description": "Implemente estas predicciones en su modelo de flujo de caja para mejorar la planificación financiera.",
                    "priority": "high"
                })
        
        # Recommendations for classification models
        elif model_type in [ModelType.RANDOM_FOREST, ModelType.XGBOOST, ModelType.SVM, ModelType.LOGISTIC_REGRESSION, ModelType.NAIVE_BAYES]:
            # Check accuracy
            if 'accuracy' in metrics:
                if metrics['accuracy'] < 0.7:
                    recommendations.append({
                        "type": "action",
                        "title": "Mejorar precisión del modelo",
                        "description": f"La precisión del modelo ({metrics['accuracy']:.2f}) es baja. Considere recolectar más datos o ajustar hiperparámetros.",
                        "priority": "high"
                    })
                elif metrics['accuracy'] > 0.95:
                    recommendations.append({
                        "type": "insight",
                        "title": "Verificar sobreajuste",
                        "description": "La precisión es muy alta, lo que podría indicar sobreajuste. Valide con datos completamente nuevos.",
                        "priority": "medium"
                    })
            
            # Check class imbalance
            if 'class_balance' in metrics:
                min_class_ratio = min(metrics['class_balance'].values()) if isinstance(metrics['class_balance'], dict) else 0
                if min_class_ratio < 0.1:
                    recommendations.append({
                        "type": "action",
                        "title": "Corregir desbalance de clases",
                        "description": "Los datos muestran un desbalance significativo. Considere técnicas de muestreo como SMOTE.",
                        "priority": "high"
                    })
            
            # Industry-specific recommendations
            if industry == Industry.SALUD:
                recommendations.append({
                    "type": "insight",
                    "title": "Validación clínica",
                    "description": "Este modelo debería validarse con expertos clínicos antes de su implementación.",
                    "priority": "critical"
                })
        
        # Recommendations for clustering models
        elif model_type in [ModelType.KMEANS, ModelType.HIERARCHICAL, ModelType.DBSCAN]:
            # Check silhouette score
            if 'silhouette_score' in metrics:
                if metrics['silhouette_score'] < 0.3:
                    recommendations.append({
                        "type": "action",
                        "title": "Mejorar calidad de clusters",
                        "description": "La cohesión de clusters es baja. Considere ajustar el número de clusters o las características utilizadas.",
                        "priority": "high"
                    })
            
            # Check cluster sizes
            if 'cluster_sizes' in metrics:
                smallest_cluster = min(metrics['cluster_sizes'].values()) if isinstance(metrics['cluster_sizes'], dict) else 0
                if smallest_cluster < 5:
                    recommendations.append({
                        "type": "insight",
                        "title": "Clusters muy pequeños",
                        "description": "Existen clusters con muy pocos elementos. Considere si representan outliers o son significativos.",
                        "priority": "medium"
                    })
            
            # Industry-specific recommendations
            if industry == Industry.RETAIL:
                recommendations.append({
                    "type": "action",
                    "title": "Segmentación de clientes",
                    "description": "Utilice estos clusters para personalizar estrategias de marketing y ofertas específicas.",
                    "priority": "high"
                })
        
        # Recommendations for regression models
        elif model_type in [ModelType.LINEAR_REGRESSION, ModelType.POLYNOMIAL_REGRESSION, ModelType.RIDGE_REGRESSION]:
            # Check R-squared
            if 'r2' in metrics:
                if metrics['r2'] < 0.5:
                    recommendations.append({
                        "type": "action",
                        "title": "Mejorar ajuste del modelo",
                        "description": f"El coeficiente de determinación (R²={metrics['r2']:.2f}) es bajo. Considere variables adicionales o transformaciones.",
                        "priority": "high"
                    })
            
            # Check RMSE relative to mean
            if 'rmse' in metrics and 'mean_target' in metrics and metrics['mean_target'] != 0:
                relative_rmse = metrics['rmse'] / abs(metrics['mean_target'])
                if relative_rmse > 0.3:
                    recommendations.append({
                        "type": "action",
                        "title": "Reducir error de predicción",
                        "description": f"El error relativo ({relative_rmse:.2f}) es alto. Considere técnicas de regularización o modelos no lineales.",
                        "priority": "medium"
                    })
        
        return recommendations

# Create a singleton instance
ml_service = MLService()
