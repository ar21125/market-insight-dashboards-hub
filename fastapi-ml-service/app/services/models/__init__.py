
# Models package initialization

from .time_series_models import *
from .classification_models import *
from .clustering_models import *
from .statistical_models import *
from .regression_models import *
from .dimensionality_models import *

# Define model registry to track available models
MODEL_REGISTRY = {
    # Time series models
    "sarima": {
        "module": "time_series_models",
        "class": "SARIMAModel",
        "description": "Seasonal ARIMA model for time series forecasting",
        "category": "time_series",
        "parameters": ["p", "d", "q", "P", "D", "Q", "s"],
        "industries": ["retail", "finanzas", "manufactura"]
    },
    "arima": {
        "module": "time_series_models",
        "class": "ARIMAModel",
        "description": "ARIMA model for time series forecasting",
        "category": "time_series",
        "parameters": ["p", "d", "q"],
        "industries": ["retail", "finanzas", "manufactura"]
    },
    "prophet": {
        "module": "time_series_models",
        "class": "ProphetModel", 
        "description": "Facebook Prophet model for time series forecasting with multiple seasonality",
        "category": "time_series",
        "parameters": ["date_column", "target_column", "forecast_periods"],
        "industries": ["retail", "finanzas", "manufactura", "tecnologia"]
    },
    "lstm": {
        "module": "time_series_models",
        "class": "LSTMModel",
        "description": "LSTM neural network for time series forecasting",
        "category": "time_series",
        "parameters": ["sequence_length", "epochs"],
        "industries": ["tecnologia", "finanzas"]
    },
    "exponential_smoothing": {
        "module": "time_series_models",
        "class": "ExponentialSmoothingModel",
        "description": "Exponential Smoothing for time series forecasting",
        "category": "time_series",
        "parameters": ["trend", "seasonal", "seasonal_periods"],
        "industries": ["retail", "manufactura"]
    },
    
    # Classification models
    "randomForest": {
        "module": "classification_models",
        "class": "RandomForestModel",
        "description": "Random Forest for classification and regression",
        "category": "classification",
        "parameters": ["task", "target_column", "n_estimators", "max_depth"],
        "industries": ["salud", "finanzas", "tecnologia"]
    },
    "xgboost": {
        "module": "classification_models", 
        "class": "XGBoostModel",
        "description": "XGBoost for gradient boosting classification and regression",
        "category": "classification",
        "parameters": ["task", "target_column", "n_estimators", "learning_rate"],
        "industries": ["salud", "finanzas", "tecnologia"]
    },
    "svm": {
        "module": "classification_models",
        "class": "SVMModel",
        "description": "Support Vector Machine for classification and regression",
        "category": "classification",
        "parameters": ["kernel", "C", "target_column"],
        "industries": ["salud", "tecnologia", "manufactura"]
    },
    "logistic_regression": {
        "module": "classification_models",
        "class": "LogisticRegressionModel",
        "description": "Logistic Regression for binary classification",
        "category": "classification",
        "parameters": ["target_column", "regularization"],
        "industries": ["salud", "finanzas"]
    },
    "naive_bayes": {
        "module": "classification_models",
        "class": "NaiveBayesModel",
        "description": "Naive Bayes classifier",
        "category": "classification",
        "parameters": ["target_column", "type"],
        "industries": ["salud", "tecnologia", "educacion"]
    },
    
    # Clustering models
    "kmeans": {
        "module": "clustering_models",
        "class": "KMeansModel",
        "description": "K-means for clustering analysis",
        "category": "clustering",
        "parameters": ["n_clusters", "random_state"],
        "industries": ["retail", "finanzas", "tecnologia"]
    },
    "hierarchical": {
        "module": "clustering_models",
        "class": "HierarchicalModel",
        "description": "Hierarchical clustering",
        "category": "clustering",
        "parameters": ["n_clusters", "linkage"],
        "industries": ["retail", "finanzas", "tecnologia"]
    },
    "dbscan": {
        "module": "clustering_models",
        "class": "DBSCANModel",
        "description": "Density-based spatial clustering",
        "category": "clustering",
        "parameters": ["eps", "min_samples"],
        "industries": ["retail", "tecnologia", "salud"]
    },
    
    # Statistical models
    "anova": { 
        "module": "statistical_models",
        "class": "ANOVAModel",
        "description": "Analysis of variance for statistical testing",
        "category": "statistical",
        "parameters": ["group_column", "value_column"],
        "industries": ["salud", "educacion", "manufactura"]
    },
    "t_test": {
        "module": "statistical_models",
        "class": "TTestModel",
        "description": "T-test for comparing means",
        "category": "statistical",
        "parameters": ["group_column", "value_column", "paired"],
        "industries": ["salud", "educacion"]
    },
    "chi_square": {
        "module": "statistical_models",
        "class": "ChiSquareModel",
        "description": "Chi-square test for categorical data",
        "category": "statistical",
        "parameters": ["variable_1", "variable_2"],
        "industries": ["salud", "educacion", "retail"]
    },
    
    # Regression models
    "linear_regression": {
        "module": "regression_models",
        "class": "LinearRegressionModel",
        "description": "Linear Regression model",
        "category": "regression",
        "parameters": ["target_column", "features"],
        "industries": ["finanzas", "retail", "manufactura"]
    },
    "polynomial_regression": {
        "module": "regression_models",
        "class": "PolynomialRegressionModel",
        "description": "Polynomial Regression model",
        "category": "regression",
        "parameters": ["target_column", "features", "degree"],
        "industries": ["finanzas", "manufactura", "tecnologia"]
    },
    "ridge_regression": {
        "module": "regression_models",
        "class": "RidgeRegressionModel",
        "description": "Ridge Regression model with L2 regularization",
        "category": "regression",
        "parameters": ["target_column", "features", "alpha"],
        "industries": ["finanzas", "tecnologia"]
    },
    
    # Dimensionality reduction models
    "pca": {
        "module": "dimensionality_models",
        "class": "PCAModel",
        "description": "Principal Component Analysis",
        "category": "dimensionality_reduction",
        "parameters": ["n_components"],
        "industries": ["tecnologia", "salud", "finanzas"]
    },
    "tsne": {
        "module": "dimensionality_models",
        "class": "TSNEModel",
        "description": "t-distributed Stochastic Neighbor Embedding",
        "category": "dimensionality_reduction",
        "parameters": ["n_components", "perplexity"],
        "industries": ["tecnologia", "salud"]
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

# Function to get available models by industry
def get_models_by_industry(industry=None):
    """
    Get all available models filtered by industry if specified
    
    Args:
        industry (str, optional): Industry to filter models by
        
    Returns:
        dict: Dictionary of models with their metadata
    """
    if industry is None:
        return MODEL_REGISTRY
        
    filtered_models = {}
    for model_id, model_info in MODEL_REGISTRY.items():
        if 'industries' not in model_info or industry in model_info['industries']:
            filtered_models[model_id] = model_info
            
    return filtered_models

# Function to get model parameters
def get_model_parameters(model_type):
    """
    Get the required parameters for a specific model type
    
    Args:
        model_type (str): Type of model
        
    Returns:
        list: List of parameter names
    """
    if model_type not in MODEL_REGISTRY:
        return []
        
    return MODEL_REGISTRY[model_type].get('parameters', [])

# Function to get models by category
def get_models_by_category(category=None):
    """
    Get all available models filtered by category if specified
    
    Args:
        category (str, optional): Category to filter models by
        
    Returns:
        dict: Dictionary of models with their metadata
    """
    if category is None:
        return MODEL_REGISTRY
        
    filtered_models = {}
    for model_id, model_info in MODEL_REGISTRY.items():
        if model_info.get('category') == category:
            filtered_models[model_id] = model_info
            
    return filtered_models
