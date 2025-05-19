
from typing import Dict, Any, List, Optional
import logging
import importlib
from app.models.schemas import ModelType, Industry

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Model Registry with metadata
MODEL_REGISTRY = {
    # Time Series Models
    "sarima": {
        "class": "SARIMAModel",
        "module": "app.services.models.time_series_models",
        "description": "Modelo SARIMA para series temporales con componentes estacionales",
        "category": "time_series",
        "parameters": ["date_column", "value_column", "p", "d", "q", "seasonal_periods"],
        "industries": ["retail", "finanzas", "manufactura", "tecnologia"],
        "complementary": ["prophet", "arima", "exponential_smoothing"]
    },
    "arima": {
        "class": "ARIMAModel",
        "module": "app.services.models.time_series_models",
        "description": "Modelo ARIMA para series temporales sin componentes estacionales",
        "category": "time_series",
        "parameters": ["date_column", "value_column", "p", "d", "q"],
        "industries": ["retail", "finanzas", "manufactura", "salud"],
        "complementary": ["sarima", "prophet", "linear_regression"]
    },
    "prophet": {
        "class": "ProphetModel",
        "module": "app.services.models.time_series_models",
        "description": "Modelo Prophet para series temporales con múltiples estacionalidades",
        "category": "time_series",
        "parameters": ["date_column", "value_column", "yearly_seasonality", "weekly_seasonality", "daily_seasonality"],
        "industries": ["retail", "finanzas", "tecnologia", "salud", "manufactura"],
        "complementary": ["sarima", "arima", "exponential_smoothing"]
    },
    "lstm": {
        "class": "LSTMModel",
        "module": "app.services.models.time_series_models",
        "description": "Redes neuronales recurrentes tipo LSTM para series temporales complejas",
        "category": "time_series",
        "parameters": ["date_column", "value_column", "sequence_length", "epochs", "batch_size"],
        "industries": ["finanzas", "tecnologia", "manufactura"],
        "complementary": ["prophet", "arima", "xgboost"]
    },
    "exponential_smoothing": {
        "class": "ExponentialSmoothingModel",
        "module": "app.services.models.time_series_models",
        "description": "Suavizado exponencial para series temporales con tendencia y estacionalidad",
        "category": "time_series",
        "parameters": ["date_column", "value_column", "trend", "seasonal", "seasonal_periods"],
        "industries": ["retail", "finanzas", "manufactura", "salud"],
        "complementary": ["sarima", "prophet", "arima"]
    },
    
    # Classification Models
    "randomForest": {
        "class": "RandomForestModel",
        "module": "app.services.models.classification_models",
        "description": "Random Forest para clasificación y regresión con múltiples árboles de decisión",
        "category": "classification",
        "parameters": ["target_column", "n_estimators", "max_depth", "feature_columns"],
        "industries": ["retail", "finanzas", "salud", "manufactura", "tecnologia", "educacion"],
        "complementary": ["xgboost", "svm", "logistic_regression"]
    },
    "xgboost": {
        "class": "XGBoostModel",
        "module": "app.services.models.classification_models",
        "description": "Gradient Boosting optimizado para clasificación y regresión de alto rendimiento",
        "category": "classification",
        "parameters": ["target_column", "n_estimators", "learning_rate", "max_depth", "feature_columns"],
        "industries": ["retail", "finanzas", "salud", "manufactura", "tecnologia"],
        "complementary": ["randomForest", "svm", "logistic_regression"]
    },
    "svm": {
        "class": "SVMModel",
        "module": "app.services.models.classification_models",
        "description": "Support Vector Machine para clasificación con margen máximo",
        "category": "classification",
        "parameters": ["target_column", "kernel", "C", "gamma", "feature_columns"],
        "industries": ["finanzas", "salud", "tecnologia", "educacion"],
        "complementary": ["randomForest", "logistic_regression", "naive_bayes"]
    },
    "logistic_regression": {
        "class": "LogisticRegressionModel",
        "module": "app.services.models.classification_models",
        "description": "Regresión logística para clasificación binaria y multiclase",
        "category": "classification",
        "parameters": ["target_column", "C", "penalty", "solver", "feature_columns"],
        "industries": ["finanzas", "salud", "retail", "educacion"],
        "complementary": ["randomForest", "svm", "naive_bayes"]
    },
    "naive_bayes": {
        "class": "NaiveBayesModel",
        "module": "app.services.models.classification_models",
        "description": "Clasificador probabilístico basado en el teorema de Bayes",
        "category": "classification",
        "parameters": ["target_column", "var_smoothing", "feature_columns"],
        "industries": ["tecnologia", "salud", "educacion"],
        "complementary": ["logistic_regression", "randomForest"]
    },
    
    # Clustering Models
    "kmeans": {
        "class": "KMeansModel",
        "module": "app.services.models.clustering_models",
        "description": "Agrupación de datos en clusters mediante K-means",
        "category": "clustering",
        "parameters": ["n_clusters", "feature_columns", "random_state"],
        "industries": ["retail", "finanzas", "tecnologia", "educacion"],
        "complementary": ["hierarchical", "dbscan", "pca"]
    },
    "hierarchical": {
        "class": "HierarchicalModel",
        "module": "app.services.models.clustering_models",
        "description": "Agrupación jerárquica para identificar estructura anidada en datos",
        "category": "clustering",
        "parameters": ["n_clusters", "linkage", "feature_columns"],
        "industries": ["retail", "finanzas", "salud", "educacion"],
        "complementary": ["kmeans", "dbscan", "pca"]
    },
    "dbscan": {
        "class": "DBSCANModel",
        "module": "app.services.models.clustering_models",
        "description": "Agrupación basada en densidad para clusters de forma arbitraria",
        "category": "clustering",
        "parameters": ["eps", "min_samples", "feature_columns"],
        "industries": ["retail", "tecnologia", "manufactura"],
        "complementary": ["kmeans", "hierarchical"]
    },
    
    # Statistical Models
    "anova": {
        "class": "ANOVAModel",
        "module": "app.services.models.statistical_models",
        "description": "Análisis de varianza para comparar medias entre grupos",
        "category": "statistical",
        "parameters": ["group_column", "value_column"],
        "industries": ["salud", "educacion", "manufactura", "tecnologia"],
        "complementary": ["t_test", "chi_square"]
    },
    "t_test": {
        "class": "TTestModel",
        "module": "app.services.models.statistical_models",
        "description": "Test t para comparar medias de dos grupos",
        "category": "statistical",
        "parameters": ["group_column", "value_column", "equal_var"],
        "industries": ["salud", "educacion", "tecnologia"],
        "complementary": ["anova", "chi_square"]
    },
    "chi_square": {
        "class": "ChiSquareModel",
        "module": "app.services.models.statistical_models",
        "description": "Test de chi-cuadrado para variables categóricas",
        "category": "statistical",
        "parameters": ["column1", "column2"],
        "industries": ["salud", "educacion", "retail", "tecnologia"],
        "complementary": ["anova", "t_test"]
    },
    
    # Regression Models
    "linear_regression": {
        "class": "LinearRegressionModel",
        "module": "app.services.models.regression_models",
        "description": "Regresión lineal para modelar relaciones lineales",
        "category": "regression",
        "parameters": ["target_column", "feature_columns"],
        "industries": ["retail", "finanzas", "salud", "manufactura", "tecnologia", "educacion"],
        "complementary": ["polynomial_regression", "ridge_regression", "arima"]
    },
    "polynomial_regression": {
        "class": "PolynomialRegressionModel",
        "module": "app.services.models.regression_models",
        "description": "Regresión polinómica para relaciones no lineales",
        "category": "regression",
        "parameters": ["target_column", "feature_columns", "degree"],
        "industries": ["retail", "finanzas", "manufactura", "tecnologia"],
        "complementary": ["linear_regression", "ridge_regression"]
    },
    "ridge_regression": {
        "class": "RidgeRegressionModel",
        "module": "app.services.models.regression_models",
        "description": "Regresión Ridge con regularización L2",
        "category": "regression",
        "parameters": ["target_column", "feature_columns", "alpha"],
        "industries": ["finanzas", "manufactura", "tecnologia"],
        "complementary": ["linear_regression", "polynomial_regression"]
    },
    
    # Dimensionality Reduction Models
    "pca": {
        "class": "PCAModel",
        "module": "app.services.models.dimensionality_models",
        "description": "Análisis de componentes principales para reducción de dimensionalidad",
        "category": "dimensionality_reduction",
        "parameters": ["n_components", "feature_columns"],
        "industries": ["finanzas", "salud", "manufactura", "tecnologia"],
        "complementary": ["tsne", "kmeans", "hierarchical"]
    },
    "tsne": {
        "class": "TSNEModel",
        "module": "app.services.models.dimensionality_models",
        "description": "t-SNE para visualización de datos de alta dimensionalidad",
        "category": "dimensionality_reduction",
        "parameters": ["n_components", "perplexity", "feature_columns"],
        "industries": ["salud", "tecnologia", "educacion"],
        "complementary": ["pca", "kmeans"]
    }
}

def get_model_class(model_type: ModelType):
    """
    Get the appropriate model class based on the model type
    """
    model_type_str = model_type.value

    if model_type_str not in MODEL_REGISTRY:
        logger.warning(f"Model type {model_type_str} not found in registry, using fallback model")
        # Import and return a fallback model
        from app.services.models.fallback_model import FallbackModel
        return FallbackModel
    
    try:
        # Get model info from the registry
        model_info = MODEL_REGISTRY[model_type_str]
        module_name = model_info.get("module")
        class_name = model_info.get("class")
        
        # Import the module
        module = importlib.import_module(module_name)
        
        # Get the class from the module
        model_class = getattr(module, class_name)
        
        return model_class
        
    except (ImportError, AttributeError) as e:
        logger.error(f"Error loading model class for {model_type_str}: {str(e)}")
        
        # Import and return a fallback model
        from app.services.models.fallback_model import FallbackModel
        return FallbackModel

def get_models_by_category(category: str) -> Dict[str, Any]:
    """
    Get all models for a specific category
    """
    return {k: v for k, v in MODEL_REGISTRY.items() if v.get("category") == category}

def get_models_by_industry(industry: str) -> Dict[str, Any]:
    """
    Get all models suitable for a specific industry
    """
    return {k: v for k, v in MODEL_REGISTRY.items() if industry in v.get("industries", [])}

def get_model_parameters(model_type: str) -> List[str]:
    """
    Get parameters for a specific model type
    """
    if model_type in MODEL_REGISTRY:
        return MODEL_REGISTRY[model_type].get("parameters", [])
    return []

def get_complementary_models(model_type: str, industry: str = None) -> List[Dict[str, Any]]:
    """
    Get complementary model recommendations for a specific model type and industry
    """
    if model_type not in MODEL_REGISTRY:
        return []
    
    complementary_model_ids = MODEL_REGISTRY[model_type].get("complementary", [])
    complementary_models = []
    
    for model_id in complementary_model_ids:
        if model_id in MODEL_REGISTRY:
            model_info = MODEL_REGISTRY[model_id]
            
            # Filter by industry if specified
            if industry and industry not in model_info.get("industries", []):
                continue
                
            complementary_models.append({
                "id": model_id,
                "name": model_info.get("class", model_id),
                "description": model_info.get("description", ""),
                "category": model_info.get("category", "other")
            })
    
    return complementary_models
