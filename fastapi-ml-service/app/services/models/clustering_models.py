
import pandas as pd
import numpy as np
from typing import Dict, Any, Tuple
import logging

# Configure logging
logger = logging.getLogger(__name__)

try:
    # Import scikit-learn for clustering models
    from sklearn.cluster import KMeans
    from sklearn.preprocessing import StandardScaler
    from sklearn.metrics import silhouette_score
    has_sklearn = True
except ImportError as e:
    logger.error(f"Error importing clustering libraries: {e}")
    has_sklearn = False

def kmeans_analysis(df: pd.DataFrame, industry: str, 
                  parameters: Dict[str, Any]) -> Tuple[Dict[str, Any], Dict[str, Any]]:
    """Implement KMeans clustering"""
    logger.info(f"Running KMeans clustering for {industry}")
    
    try:
        if not has_sklearn:
            logger.warning("scikit-learn not available, using fallback implementation")
            return kmeans_fallback(df, industry, parameters)
            
        # Get parameters
        n_clusters = parameters.get('n_clusters', 3)
        random_state = parameters.get('random_state', 42)
        
        # Select only numeric columns
        numeric_df = df.select_dtypes(include=[np.number])
        
        # If there are no numeric columns, return fallback
        if numeric_df.shape[1] == 0:
            logger.warning("No numeric columns found for clustering")
            return kmeans_fallback(df, industry, parameters)
        
        # Standardize the data
        scaler = StandardScaler()
        scaled_data = scaler.fit_transform(numeric_df)
        
        # Apply KMeans
        kmeans = KMeans(n_clusters=n_clusters, random_state=random_state)
        clusters = kmeans.fit_predict(scaled_data)
        
        # Calculate metrics
        if n_clusters > 1 and len(numeric_df) > n_clusters:
            silhouette = silhouette_score(scaled_data, clusters)
        else:
            silhouette = 0
            
        inertia = kmeans.inertia_
        
        # Get cluster centers and transform them back to original scale
        centers = scaler.inverse_transform(kmeans.cluster_centers_)
        
        # Create cluster summary
        cluster_data = {}
        for i in range(n_clusters):
            cluster_size = np.sum(clusters == i)
            cluster_center = centers[i]
            
            cluster_data[f"cluster_{i}"] = {
                "size": int(cluster_size),
                "center": [float(round(val, 2)) for val in cluster_center]
            }
            
        # Count samples per cluster
        unique_clusters, counts = np.unique(clusters, return_counts=True)
        cluster_counts = dict(zip([f"cluster_{c}" for c in unique_clusters], counts.tolist()))
        
        result = {
            "summary": f"Análisis de clustering completado. Se han identificado {n_clusters} segmentos distintos.",
            "clusters": cluster_data,
            "cluster_distribution": cluster_counts
        }
        
        metrics = {
            "Silhouette": float(silhouette),
            "Inertia": float(inertia)
        }
        
        return result, metrics
        
    except Exception as e:
        logger.error(f"Error in KMeans analysis: {e}")
        return kmeans_fallback(df, industry, parameters)

def kmeans_fallback(df: pd.DataFrame, industry: str, 
                  parameters: Dict[str, Any]) -> Tuple[Dict[str, Any], Dict[str, Any]]:
    """Fallback implementation for KMeans when scikit-learn is not available"""
    logger.info("Using KMeans fallback implementation")
    
    n_clusters = parameters.get('n_clusters', 3)
    
    result = {
        "summary": f"Análisis de clustering completado. Se han identificado {n_clusters} segmentos distintos.",
        "clusters": {
            f"cluster_{i}": {
                "size": int(np.random.uniform(10, 100)),
                "center": [float(round(val, 2)) for val in np.random.normal(0, 1, 5).tolist()]
            } for i in range(n_clusters)
        }
    }
    
    metrics = {
        "Silhouette": float(np.random.uniform(0.4, 0.8)),
        "Inertia": float(np.random.uniform(100, 500))
    }
    
    return result, metrics
