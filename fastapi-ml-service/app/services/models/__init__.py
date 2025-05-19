
# Models package initialization

from .time_series_models import *
from .classification_models import *
from .clustering_models import *
from .statistical_models import *

# Define model registry to track available models
MODEL_REGISTRY = {
    # Time series models
    "sarima": {
        "module": "time_series_models",
        "class": "SARIMAModel",
        "description": "Seasonal ARIMA model for time series forecasting"
    },
    "arima": {
        "module": "time_series_models",
        "class": "ARIMAModel",
        "description": "ARIMA model for time series forecasting"
    },
    "prophet": {
        "module": "time_series_models",
        "class": "ProphetModel", 
        "description": "Facebook Prophet model for time series forecasting with multiple seasonality"
    },
    "lstm": {
        "module": "time_series_models",
        "class": "LSTMModel",
        "description": "LSTM neural network for time series forecasting"
    },
    
    # Classification models
    "randomForest": {
        "module": "classification_models",
        "class": "RandomForestModel",
        "description": "Random Forest for classification and regression"
    },
    "xgboost": {
        "module": "classification_models", 
        "class": "XGBoostModel",
        "description": "XGBoost for gradient boosting classification and regression"
    },
    "svm": {
        "module": "classification_models",
        "class": "SVMModel",
        "description": "Support Vector Machine for classification and regression"
    },
    
    # Clustering models
    "kmeans": {
        "module": "clustering_models",
        "class": "KMeansModel",
        "description": "K-means for clustering analysis"
    },
    
    # Statistical models
    "anova": { 
        "module": "statistical_models",
        "class": "ANOVAModel",
        "description": "Analysis of variance for statistical testing"
    }
}

# Function to get model class based on model_type
def get_model_class(model_type):
    """
    Get the appropriate model class based on model type
    
    Args:
        model_type (str): Type of model to use
        
    Returns:
        class: The model class
    """
    if model_type not in MODEL_REGISTRY:
        raise ValueError(f"Unknown model type: {model_type}")
        
    model_info = MODEL_REGISTRY[model_type]
    module_name = model_info["module"]
    class_name = model_info["class"]
    
    # Import dynamically from the appropriate module
    try:
        module = globals()[module_name]
        model_class = getattr(module, class_name)
        return model_class
    except (KeyError, AttributeError) as e:
        # Fallback for models that might not be available due to missing dependencies
        from .fallback_model import FallbackModel
        return FallbackModel
