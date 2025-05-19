
import { toast } from "sonner";

// Interface for MCP tool integration
export interface MCPTool {
  id: string;
  name: string;
  description: string;
  category: string;
  sourceUrl: string;
  apiEndpoint?: string;
  requiredParams: string[];
  supportedModelTypes: string[];
}

// Interface for recommendation types
export interface Recommendation {
  id: string;
  type: 'action' | 'insight' | 'tool' | 'analysis';
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  modelType: string;
  actionable: boolean;
  source: string;
  metadata?: Record<string, any>;
}

// Available open source MCP tools
const mcpTools: MCPTool[] = [
  {
    id: 'forecasting-toolkit',
    name: 'Forecasting Toolkit',
    description: 'Open-source tools for advanced time series forecasting and anomaly detection',
    category: 'time-series',
    sourceUrl: 'https://github.com/facebook/prophet',
    apiEndpoint: 'https://api.forecasting-toolkit.org/v1/analyze',
    requiredParams: ['data', 'horizon', 'frequency'],
    supportedModelTypes: ['sarima', 'arima', 'prophet', 'exponential_smoothing']
  },
  {
    id: 'sklearn-toolkit',
    name: 'Scikit-Learn Toolkit',
    description: 'Machine learning models and tools based on scikit-learn',
    category: 'classification',
    sourceUrl: 'https://github.com/scikit-learn/scikit-learn',
    apiEndpoint: 'https://api.sklearn-toolkit.org/v1/analyze',
    requiredParams: ['data', 'target', 'features'],
    supportedModelTypes: ['random_forest', 'xgboost', 'svm', 'logistic_regression', 'naive_bayes', 'linear_regression', 'ridge_regression']
  },
  {
    id: 'clustering-toolkit',
    name: 'Clustering Toolkit',
    description: 'Advanced clustering algorithms and visualization tools',
    category: 'clustering',
    sourceUrl: 'https://github.com/scikit-learn/scikit-learn',
    apiEndpoint: 'https://api.clustering-toolkit.org/v1/analyze',
    requiredParams: ['data', 'n_clusters'],
    supportedModelTypes: ['kmeans', 'hierarchical', 'dbscan']
  },
  {
    id: 'stats-toolkit',
    name: 'Statistical Analysis Toolkit',
    description: 'Statistical analysis and hypothesis testing tools',
    category: 'statistics',
    sourceUrl: 'https://github.com/statsmodels/statsmodels',
    apiEndpoint: 'https://api.stats-toolkit.org/v1/analyze',
    requiredParams: ['data', 'test_type'],
    supportedModelTypes: ['anova', 't_test', 'chi_square']
  },
  {
    id: 'dimension-toolkit',
    name: 'Dimensionality Reduction Toolkit',
    description: 'Tools for dimensionality reduction and visualization',
    category: 'dimensionality',
    sourceUrl: 'https://github.com/scikit-learn/scikit-learn',
    apiEndpoint: 'https://api.dimension-toolkit.org/v1/analyze',
    requiredParams: ['data', 'n_components'],
    supportedModelTypes: ['pca', 'tsne']
  },
  {
    id: 'anomaly-detection',
    name: 'Anomaly Detection Toolkit',
    description: 'Tools for detecting anomalies in time series data',
    category: 'anomaly',
    sourceUrl: 'https://github.com/linkedin/luminol',
    apiEndpoint: 'https://api.anomaly-toolkit.org/v1/analyze',
    requiredParams: ['data', 'sensitivity'],
    supportedModelTypes: ['sarima', 'arima', 'prophet', 'exponential_smoothing', 'random_forest', 'xgboost']
  },
  {
    id: 'nlp-toolkit',
    name: 'NLP Toolkit',
    description: 'Natural language processing tools and models',
    category: 'nlp',
    sourceUrl: 'https://github.com/huggingface/transformers',
    apiEndpoint: 'https://api.nlp-toolkit.org/v1/analyze',
    requiredParams: ['text', 'task'],
    supportedModelTypes: ['random_forest', 'xgboost', 'logistic_regression', 'naive_bayes']
  }
];

// Predefined recommendations based on model types and results
const predefinedRecommendations: Record<string, Recommendation[]> = {
  'sarima': [
    {
      id: 'sarima-seasonal-adjustment',
      type: 'action',
      title: 'Ajustar componentes estacionales',
      description: 'Considere ajustar los componentes estacionales para mejorar la precisión del modelo',
      priority: 'medium',
      modelType: 'sarima',
      actionable: true,
      source: 'forecasting-toolkit'
    },
    {
      id: 'sarima-anomaly-detection',
      type: 'analysis',
      title: 'Detección de anomalías',
      description: 'Ejecute un análisis de detección de anomalías para identificar valores atípicos en sus series temporales',
      priority: 'high',
      modelType: 'sarima',
      actionable: true,
      source: 'anomaly-detection'
    }
  ],
  'arima': [
    {
      id: 'arima-differencing',
      type: 'action',
      title: 'Ajustar nivel de diferenciación',
      description: 'Considere aumentar el nivel de diferenciación para mejorar la estacionariedad',
      priority: 'medium',
      modelType: 'arima',
      actionable: true,
      source: 'forecasting-toolkit'
    },
    {
      id: 'arima-forecasting-horizon',
      type: 'insight',
      title: 'Horizonte de pronóstico óptimo',
      description: 'Este modelo tiene un horizonte de pronóstico óptimo de aproximadamente 10 períodos',
      priority: 'low',
      modelType: 'arima',
      actionable: false,
      source: 'forecasting-toolkit'
    }
  ],
  'kmeans': [
    {
      id: 'kmeans-optimal-clusters',
      type: 'action',
      title: 'Optimizar número de clusters',
      description: 'Utilice el método del codo o silueta para encontrar el número óptimo de clusters',
      priority: 'high',
      modelType: 'kmeans',
      actionable: true,
      source: 'clustering-toolkit'
    },
    {
      id: 'kmeans-feature-scaling',
      type: 'action',
      title: 'Escalado de características',
      description: 'Normalice o estandarice las características para mejorar la calidad de los clusters',
      priority: 'medium',
      modelType: 'kmeans',
      actionable: true,
      source: 'clustering-toolkit'
    }
  ],
  'random_forest': [
    {
      id: 'rf-feature-importance',
      type: 'insight',
      title: 'Importancia de características',
      description: 'Analice las características más importantes para entender los factores predictivos clave',
      priority: 'high',
      modelType: 'random_forest',
      actionable: true,
      source: 'sklearn-toolkit'
    },
    {
      id: 'rf-hyperparameter-tuning',
      type: 'action',
      title: 'Ajuste de hiperparámetros',
      description: 'Optimice los hiperparámetros del modelo para mejorar su rendimiento',
      priority: 'medium',
      modelType: 'random_forest',
      actionable: true,
      source: 'sklearn-toolkit'
    }
  ],
  'xgboost': [
    {
      id: 'xgb-early-stopping',
      type: 'action',
      title: 'Implementar early stopping',
      description: 'Utilice early stopping para prevenir el sobreajuste y optimizar el entrenamiento',
      priority: 'medium',
      modelType: 'xgboost',
      actionable: true,
      source: 'sklearn-toolkit'
    },
    {
      id: 'xgb-feature-engineering',
      type: 'action',
      title: 'Ingeniería de características',
      description: 'Considere crear características derivadas para mejorar el rendimiento del modelo',
      priority: 'high',
      modelType: 'xgboost',
      actionable: true,
      source: 'sklearn-toolkit'
    }
  ]
};

// Function to get available MCP tools filtered by model type
export const getCompatibleMCPTools = (modelType: string): MCPTool[] => {
  return mcpTools.filter(tool => 
    tool.supportedModelTypes.includes(modelType)
  );
};

// Function to get recommendations based on model type and results
export const getRecommendations = (modelType: string, metrics?: Record<string, any>): Recommendation[] => {
  // Start with predefined recommendations for this model type
  let recommendations = predefinedRecommendations[modelType] || [];
  
  // Generate dynamic recommendations based on metrics
  if (metrics) {
    // Example: Add accuracy-based recommendations for classification models
    if (['random_forest', 'xgboost', 'svm', 'logistic_regression', 'naive_bayes'].includes(modelType) && 
        metrics.accuracy !== undefined) {
      
      if (metrics.accuracy < 0.7) {
        recommendations.push({
          id: 'low-accuracy',
          type: 'action',
          title: 'Mejorar precisión del modelo',
          description: `La precisión actual es ${(metrics.accuracy * 100).toFixed(1)}%. Considere recolectar más datos o ajustar hiperparámetros.`,
          priority: 'high',
          modelType,
          actionable: true,
          source: 'sklearn-toolkit'
        });
      }
      
      // Add class imbalance recommendation if applicable
      if (metrics.class_balance && Math.min(...Object.values(metrics.class_balance)) < 0.1) {
        recommendations.push({
          id: 'class-imbalance',
          type: 'action',
          title: 'Corregir desbalance de clases',
          description: 'Los datos muestran un desbalance significativo entre clases. Considere técnicas de muestreo como SMOTE o ajuste de pesos.',
          priority: 'critical',
          modelType,
          actionable: true,
          source: 'sklearn-toolkit'
        });
      }
    }
    
    // Example: Add RMSE-based recommendations for regression models
    if (['linear_regression', 'ridge_regression'].includes(modelType) && 
        metrics.rmse !== undefined && metrics.mean_target !== undefined) {
      
      const relativeError = metrics.rmse / Math.abs(metrics.mean_target);
      if (relativeError > 0.3) {
        recommendations.push({
          id: 'high-rmse',
          type: 'action',
          title: 'Reducir error de predicción',
          description: `El RMSE relativo es alto (${(relativeError * 100).toFixed(1)}%). Considere transformaciones no lineales o regularización.`,
          priority: 'high',
          modelType,
          actionable: true,
          source: 'sklearn-toolkit'
        });
      }
    }
    
    // Example: Add recommendations for time series models
    if (['sarima', 'arima', 'prophet', 'exponential_smoothing'].includes(modelType) &&
        metrics.mape !== undefined) {
      
      if (metrics.mape > 15) {
        recommendations.push({
          id: 'high-mape',
          type: 'action',
          title: 'Mejorar precisión del pronóstico',
          description: `El MAPE es ${metrics.mape.toFixed(1)}%. Considere incluir variables externas o ajustar estacionalidad.`,
          priority: 'high',
          modelType,
          actionable: true,
          source: 'forecasting-toolkit'
        });
      }
      
      if (metrics.residual_autocorrelation && metrics.residual_autocorrelation > 0.2) {
        recommendations.push({
          id: 'residual-autocorrelation',
          type: 'action',
          title: 'Estructura en residuales',
          description: 'Los residuales muestran autocorrelación. Considere ajustar los términos AR o MA del modelo.',
          priority: 'medium',
          modelType,
          actionable: true,
          source: 'forecasting-toolkit'
        });
      }
    }
  }
  
  // Sort recommendations by priority
  const priorityOrder = { 'critical': 0, 'high': 1, 'medium': 2, 'low': 3 };
  recommendations.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
  
  return recommendations;
};

// Function to get complementary analyses that would be beneficial
export const getComplementaryAnalyses = (modelType: string, industry: string): Recommendation[] => {
  const complementary: Recommendation[] = [];
  
  // Suggest complementary analyses based on model type
  if (['sarima', 'arima', 'prophet', 'exponential_smoothing'].includes(modelType)) {
    complementary.push({
      id: 'anomaly-detection',
      type: 'analysis',
      title: 'Detección de anomalías',
      description: 'Identifique valores atípicos y patrones anómalos en sus series temporales',
      priority: 'high',
      modelType: 'anomaly_detection',
      actionable: true,
      source: 'anomaly-detection'
    });
    
    complementary.push({
      id: 'causal-impact',
      type: 'analysis',
      title: 'Análisis de impacto causal',
      description: 'Evalúe el impacto de intervenciones o eventos en sus métricas temporales',
      priority: 'medium',
      modelType: 'causal_impact',
      actionable: true,
      source: 'forecasting-toolkit'
    });
  }
  
  if (['kmeans', 'hierarchical', 'dbscan'].includes(modelType)) {
    complementary.push({
      id: 'dimension-reduction',
      type: 'analysis',
      title: 'Reducción de dimensionalidad',
      description: 'Visualice sus clusters en 2D o 3D mediante PCA o t-SNE',
      priority: 'medium',
      modelType: 'pca',
      actionable: true,
      source: 'dimension-toolkit'
    });
    
    complementary.push({
      id: 'cluster-profiling',
      type: 'analysis',
      title: 'Perfilado de clusters',
      description: 'Caracterice cada cluster según sus atributos distintivos',
      priority: 'high',
      modelType: 'cluster_profiling',
      actionable: true,
      source: 'clustering-toolkit'
    });
  }
  
  if (['random_forest', 'xgboost', 'svm', 'logistic_regression', 'naive_bayes'].includes(modelType)) {
    complementary.push({
      id: 'feature-importance',
      type: 'analysis',
      title: 'Importancia de características',
      description: 'Analice las características más relevantes para su modelo',
      priority: 'high',
      modelType: 'feature_importance',
      actionable: true,
      source: 'sklearn-toolkit'
    });
    
    complementary.push({
      id: 'model-comparison',
      type: 'analysis',
      title: 'Comparación de modelos',
      description: 'Compare el rendimiento de diferentes algoritmos de clasificación',
      priority: 'medium',
      modelType: 'model_comparison',
      actionable: true,
      source: 'sklearn-toolkit'
    });
  }
  
  // Industry-specific recommendations
  if (industry === 'retail') {
    complementary.push({
      id: 'retail-basket-analysis',
      type: 'analysis',
      title: 'Análisis de canasta de compra',
      description: 'Identifique patrones de compra conjunta y reglas de asociación',
      priority: 'high',
      modelType: 'association_rules',
      actionable: true,
      source: 'sklearn-toolkit'
    });
  } else if (industry === 'finanzas') {
    complementary.push({
      id: 'risk-assessment',
      type: 'analysis',
      title: 'Evaluación de riesgo',
      description: 'Analice el riesgo y la volatilidad en sus datos financieros',
      priority: 'critical',
      modelType: 'risk_models',
      actionable: true,
      source: 'sklearn-toolkit'
    });
  }
  
  return complementary;
};

// Function to execute an external MCP tool
export const executeMCPTool = async (
  toolId: string, 
  params: Record<string, any>
): Promise<any> => {
  try {
    const tool = mcpTools.find(t => t.id === toolId);
    if (!tool) {
      throw new Error(`Tool with id ${toolId} not found`);
    }
    
    // Check if all required parameters are provided
    const missingParams = tool.requiredParams.filter(param => !(param in params));
    if (missingParams.length > 0) {
      throw new Error(`Missing required parameters: ${missingParams.join(', ')}`);
    }
    
    // In a real implementation, this would make an actual API call
    // For now, we'll simulate a successful response
    toast.info(`Executing ${tool.name}...`);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Return simulated result
    return {
      success: true,
      toolId,
      results: {
        message: `Successfully executed ${tool.name}`,
        timestamp: new Date().toISOString(),
        executionTime: Math.random() * 5 + 0.5, // Random time between 0.5 and 5.5 seconds
        // Additional simulated results would go here
      }
    };
  } catch (error: any) {
    toast.error(`Error executing MCP tool: ${error.message}`);
    throw error;
  }
};

// Export the MCP integration service
export const mcpIntegrationService = {
  getCompatibleMCPTools,
  getRecommendations,
  getComplementaryAnalyses,
  executeMCPTool
};
