
import { toast } from "sonner";

export interface Recommendation {
  id: string;
  type: 'action' | 'insight' | 'tool' | 'analysis';
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  source: string;
  actionable: boolean;
}

export interface MCPTool {
  id: string;
  name: string;
  description: string;
  category: string;
  sourceUrl: string;
  apiEndpoint?: string;
}

export const mcpIntegrationService = {
  /**
   * Get recommendations based on model type and metrics
   */
  getRecommendations(modelType: string, metrics?: Record<string, any>): Recommendation[] {
    // Default return empty array if no model type
    if (!modelType) return [];
    
    // Get recommendations based on model type
    const modelRecommendations = this._getModelSpecificRecommendations(modelType);
    
    // If metrics available, filter and sort by relevance
    if (metrics && Object.keys(metrics).length > 0) {
      return this._enhanceRecommendationsWithMetrics(modelRecommendations, metrics);
    }
    
    return modelRecommendations;
  },
  
  /**
   * Get complementary analyses for the current model and industry
   */
  getComplementaryAnalyses(modelType: string, industry: string): any[] {
    if (!modelType) return [];
    
    return COMPLEMENTARY_ANALYSES
      .filter(analysis => 
        analysis.applicableModels.includes(modelType) || 
        analysis.applicableIndustries.includes(industry)
      )
      .slice(0, 4); // Limit to 4 recommendations
  },
  
  /**
   * Get compatible MCP tools for a model type
   */
  getCompatibleMCPTools(modelType: string): MCPTool[] {
    if (!modelType) return [];
    
    return MCP_TOOLS.filter(tool => 
      tool.compatibleModels.includes(modelType) ||
      tool.compatibleModels.includes('any')
    );
  },
  
  /**
   * Execute an MCP tool with parameters
   */
  async executeMCPTool(toolId: string, params: Record<string, any> = {}): Promise<any> {
    try {
      const tool = MCP_TOOLS.find(t => t.id === toolId);
      if (!tool) {
        throw new Error(`Tool ${toolId} not found`);
      }
      
      toast.info(`Conectando con herramienta: ${tool.name}`);
      
      // Simulate API call with timeout
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      if (Math.random() > 0.8) {
        throw new Error("Error de conexión simulado");
      }
      
      toast.success(`Operación completada con ${tool.name}`);
      return { success: true, toolId, params };
    } catch (error: any) {
      console.error('Error executing MCP tool:', error);
      toast.error(`Error al ejecutar herramienta: ${error.message}`);
      throw error;
    }
  },
  
  /**
   * Get model specific recommendations
   * @private
   */
  _getModelSpecificRecommendations(modelType: string): Recommendation[] {
    // Find recommendations for the model type
    switch (modelType) {
      case 'sarima':
      case 'arima':
      case 'prophet':
        return TIME_SERIES_RECOMMENDATIONS;
      case 'kmeans':
      case 'hierarchical':
      case 'dbscan':
        return CLUSTERING_RECOMMENDATIONS;
      case 'random_forest':
      case 'xgboost':
      case 'logistic_regression':
        return CLASSIFICATION_RECOMMENDATIONS;
      case 'pca':
      case 'tsne':
      case 'umap':
        return DIMENSIONALITY_RECOMMENDATIONS;
      default:
        return GENERAL_RECOMMENDATIONS;
    }
  },
  
  /**
   * Enhance recommendations based on metrics
   * @private
   */
  _enhanceRecommendationsWithMetrics(recommendations: Recommendation[], metrics: Record<string, any>): Recommendation[] {
    // For time series models
    if ('mape' in metrics && typeof metrics.mape === 'number') {
      if (metrics.mape > 15) {
        recommendations.push({
          id: 'high-mape',
          type: 'action',
          title: 'Error de predicción elevado (MAPE)',
          description: `El MAPE actual de ${metrics.mape.toFixed(2)}% es alto. Considere ajustar los parámetros del modelo o incluir variables exógenas adicionales.`,
          priority: 'high',
          source: 'mcp_ts_analyzer',
          actionable: true
        });
      }
    }
    
    // For classification models
    if ('accuracy' in metrics && typeof metrics.accuracy === 'number') {
      if (metrics.accuracy < 0.7) {
        recommendations.push({
          id: 'low-accuracy',
          type: 'action',
          title: 'Precisión baja del modelo',
          description: `La precisión actual de ${(metrics.accuracy * 100).toFixed(1)}% es subóptima. Considere técnicas de feature engineering o ajustar hiperparámetros.`,
          priority: 'high',
          source: 'mcp_class_analyzer',
          actionable: true
        });
      }
    }
    
    // For clustering models
    if ('silhouette_score' in metrics && typeof metrics.silhouette_score === 'number') {
      if (metrics.silhouette_score < 0.5) {
        recommendations.push({
          id: 'low-silhouette',
          type: 'action',
          title: 'Separación de clusters deficiente',
          description: `El índice de silueta de ${metrics.silhouette_score.toFixed(2)} indica clusters mal definidos. Pruebe diferentes algoritmos o ajuste el número de clusters.`,
          priority: 'medium',
          source: 'mcp_cluster_analyzer',
          actionable: true
        });
      }
    }
    
    return recommendations;
  }
};

// Time series model recommendations
const TIME_SERIES_RECOMMENDATIONS: Recommendation[] = [
  {
    id: 'ts-seasonal',
    type: 'action',
    title: 'Optimizar parámetros estacionales',
    description: 'Ajuste los parámetros estacionales para mejorar la precisión de las predicciones. Los patrones estacionales detectados pueden tener diferentes frecuencias.',
    priority: 'medium',
    source: 'statsmodels',
    actionable: true
  },
  {
    id: 'ts-pattern',
    type: 'insight',
    title: 'Patrones estacionales detectados',
    description: 'Se han detectado patrones estacionales significativos en los datos. Esto puede indicar ciclos repetitivos que afectan las variables objetivo.',
    priority: 'low',
    source: 'prophet_analyzer',
    actionable: false
  },
  {
    id: 'ts-exogenous',
    type: 'action',
    title: 'Incluir variables exógenas',
    description: 'Incorporar variables externas como indicadores económicos o eventos podría mejorar significativamente el rendimiento del modelo.',
    priority: 'high',
    source: 'sarima_enhancer',
    actionable: true
  },
  {
    id: 'ts-outliers',
    type: 'action',
    title: 'Detectar y tratar outliers',
    description: 'Se detectaron valores atípicos que pueden estar afectando la calidad de las predicciones. Se recomienda una estrategia de tratamiento de outliers.',
    priority: 'medium',
    source: 'outlier_detector',
    actionable: true
  }
];

// Clustering model recommendations
const CLUSTERING_RECOMMENDATIONS: Recommendation[] = [
  {
    id: 'cluster-k',
    type: 'action',
    title: 'Evaluar número de clusters',
    description: 'Pruebe diferentes valores de k para optimizar la agrupación. El método del codo o silueta puede ayudar a determinar el número óptimo.',
    priority: 'high',
    source: 'scikit_learn',
    actionable: true
  },
  {
    id: 'cluster-balance',
    type: 'insight',
    title: 'Clusters desequilibrados',
    description: 'Algunos clusters tienen muchos más elementos que otros. Esto puede indicar estructura de datos inherente o problemas con la configuración del modelo.',
    priority: 'medium',
    source: 'cluster_analyzer',
    actionable: false
  },
  {
    id: 'cluster-scaling',
    type: 'action',
    title: 'Escalar características',
    description: 'Las variables no están en la misma escala, lo que puede sesgar los resultados del clustering. Se recomienda normalizar o estandarizar las variables.',
    priority: 'high',
    source: 'data_preprocessor',
    actionable: true
  },
  {
    id: 'cluster-viz',
    type: 'tool',
    title: 'Visualización 3D de clusters',
    description: 'La complejidad de los datos puede requerir visualizaciones avanzadas. Pruebe técnicas de reducción de dimensionalidad para visualizar mejor los clusters.',
    priority: 'low',
    source: 'cluster_viz',
    actionable: true
  }
];

// Classification model recommendations
const CLASSIFICATION_RECOMMENDATIONS: Recommendation[] = [
  {
    id: 'class-features',
    type: 'action',
    title: 'Considerar feature engineering',
    description: 'Cree nuevas variables basadas en las existentes para mejorar el rendimiento del modelo. La interacción entre características puede revelar patrones ocultos.',
    priority: 'medium',
    source: 'feature_engineer',
    actionable: true
  },
  {
    id: 'class-imbalance',
    type: 'action',
    title: 'Tratar desbalance de clases',
    description: 'Las clases están desbalanceadas, lo que puede sesgar el modelo. Considere técnicas de sobremuestreo o submuestreo para equilibrar las clases.',
    priority: 'high',
    source: 'imbalance_handler',
    actionable: true
  },
  {
    id: 'class-importance',
    type: 'insight',
    title: 'Variables importantes identificadas',
    description: 'Un pequeño conjunto de variables tiene una influencia desproporcionada en las predicciones. Centrarse en estas variables puede simplificar el modelo.',
    priority: 'medium',
    source: 'feature_analyzer',
    actionable: false
  },
  {
    id: 'class-threshold',
    type: 'action',
    title: 'Optimizar umbral de decisión',
    description: 'Ajustar el umbral de probabilidad para optimizar precision, recall o F1-score según los objetivos del negocio.',
    priority: 'medium',
    source: 'threshold_optimizer',
    actionable: true
  }
];

// Dimensionality reduction recommendations
const DIMENSIONALITY_RECOMMENDATIONS: Recommendation[] = [
  {
    id: 'dim-components',
    type: 'action',
    title: 'Optimizar número de componentes',
    description: 'Pruebe diferentes números de componentes para encontrar el equilibrio entre simplicidad y varianza explicada.',
    priority: 'medium',
    source: 'pca_optimizer',
    actionable: true
  },
  {
    id: 'dim-interpret',
    type: 'insight',
    title: 'Interpretación de componentes',
    description: 'Los componentes principales muestran patrones interesantes que pueden tener significado en el contexto del negocio.',
    priority: 'low',
    source: 'component_analyzer',
    actionable: false
  },
  {
    id: 'dim-perplexity',
    type: 'action',
    title: 'Ajustar parámetro de perplejidad',
    description: 'Para t-SNE, ajustar la perplejidad puede mejorar significativamente la calidad de la visualización y revelar estructuras ocultas.',
    priority: 'medium',
    source: 'tsne_optimizer',
    actionable: true
  }
];

// General recommendations for any model type
const GENERAL_RECOMMENDATIONS: Recommendation[] = [
  {
    id: 'gen-missing',
    type: 'action',
    title: 'Tratar datos faltantes',
    description: 'Se detectaron valores faltantes que pueden estar afectando el rendimiento. Considere estrategias de imputación más avanzadas.',
    priority: 'high',
    source: 'data_cleaner',
    actionable: true
  },
  {
    id: 'gen-validation',
    type: 'action',
    title: 'Mejorar estrategia de validación',
    description: 'Una validación más robusta (como k-fold cross-validation) podría proporcionar una estimación más confiable del rendimiento del modelo.',
    priority: 'medium',
    source: 'validation_enhancer',
    actionable: true
  },
  {
    id: 'gen-feature',
    type: 'insight',
    title: 'Reducción de dimensionalidad recomendada',
    description: 'El alto número de variables puede causar sobreajuste. Considere técnicas como PCA o selección de características.',
    priority: 'medium',
    source: 'dimension_analyzer',
    actionable: false
  }
];

// Complementary analyses
const COMPLEMENTARY_ANALYSES = [
  {
    id: 'anomaly_detection',
    type: 'analysis',
    title: 'Detección de anomalías',
    description: 'Identifica valores atípicos y eventos inusuales en sus datos',
    source: 'anomaly_detector',
    applicableModels: ['sarima', 'arima', 'prophet', 'exponential_smoothing'],
    applicableIndustries: ['finanzas', 'manufactura', 'retail']
  },
  {
    id: 'sensitivity_analysis',
    type: 'analysis',
    title: 'Análisis de sensibilidad',
    description: 'Evalúa cómo las variaciones en los inputs afectan los outputs del modelo',
    source: 'sensitivity_analyzer',
    applicableModels: ['random_forest', 'xgboost', 'logistic_regression'],
    applicableIndustries: ['finanzas', 'salud', 'retail']
  },
  {
    id: 'cluster_profiling',
    type: 'analysis',
    title: 'Perfilado de clusters',
    description: 'Caracteriza cada grupo identificado por sus atributos más distintivos',
    source: 'cluster_profiler',
    applicableModels: ['kmeans', 'hierarchical', 'dbscan'],
    applicableIndustries: ['retail', 'finanzas', 'salud']
  },
  {
    id: 'feature_importance',
    type: 'analysis',
    title: 'Importancia de variables',
    description: 'Analiza la contribución de cada variable al rendimiento del modelo',
    source: 'feature_analyzer',
    applicableModels: ['random_forest', 'xgboost', 'logistic_regression'],
    applicableIndustries: ['tecnologia', 'finanzas', 'salud']
  },
  {
    id: 'causal_analysis',
    type: 'analysis',
    title: 'Análisis causal',
    description: 'Explora relaciones causa-efecto entre variables para entender mecanismos subyacentes',
    source: 'causal_analyzer',
    applicableModels: ['regression', 'structural_equation', 'bayesian_networks'],
    applicableIndustries: ['finanzas', 'salud', 'educacion']
  },
  {
    id: 'seasonality_decomposition',
    type: 'analysis',
    title: 'Descomposición estacional',
    description: 'Separa tendencia, estacionalidad y residuos en series temporales',
    source: 'seasonal_decomposer',
    applicableModels: ['sarima', 'arima', 'prophet'],
    applicableIndustries: ['retail', 'finanzas', 'tecnologia']
  },
  {
    id: 'correlation_network',
    type: 'analysis',
    title: 'Redes de correlación',
    description: 'Visualiza relaciones complejas entre múltiples variables como una red',
    source: 'correlation_network',
    applicableModels: ['any'],
    applicableIndustries: ['finanzas', 'salud', 'retail']
  },
  {
    id: 'survival_analysis',
    type: 'analysis',
    title: 'Análisis de supervivencia',
    description: 'Analiza el tiempo hasta que ocurre un evento de interés',
    source: 'survival_analyzer',
    applicableModels: ['cox_regression', 'kaplan_meier'],
    applicableIndustries: ['salud', 'finanzas', 'retail']
  }
];

// MCP Compatible Tools
const MCP_TOOLS: (MCPTool & { compatibleModels: string[] })[] = [
  {
    id: 'statsmodels',
    name: 'StatsModels',
    description: 'Modelos estadísticos y tests para Python',
    category: 'Estadística',
    sourceUrl: 'https://github.com/statsmodels/statsmodels',
    apiEndpoint: 'https://api.mcp-platform.com/tools/statsmodels',
    compatibleModels: ['sarima', 'arima', 'linear_regression', 'any']
  },
  {
    id: 'prophet',
    name: 'Prophet',
    description: 'Herramienta de forecasting de Facebook',
    category: 'Series temporales',
    sourceUrl: 'https://github.com/facebook/prophet',
    apiEndpoint: 'https://api.mcp-platform.com/tools/prophet',
    compatibleModels: ['prophet', 'sarima', 'arima', 'exponential_smoothing']
  },
  {
    id: 'scikit_learn',
    name: 'Scikit-Learn',
    description: 'Biblioteca de aprendizaje automático para Python',
    category: 'ML General',
    sourceUrl: 'https://github.com/scikit-learn/scikit-learn',
    apiEndpoint: 'https://api.mcp-platform.com/tools/sklearn',
    compatibleModels: ['random_forest', 'kmeans', 'pca', 'svm', 'any']
  },
  {
    id: 'xgboost',
    name: 'XGBoost',
    description: 'Biblioteca optimizada de Gradient Boosting',
    category: 'ML Avanzado',
    sourceUrl: 'https://github.com/dmlc/xgboost',
    apiEndpoint: 'https://api.mcp-platform.com/tools/xgboost',
    compatibleModels: ['xgboost', 'random_forest']
  },
  {
    id: 'shap',
    name: 'SHAP',
    description: 'Explicaciones de modelos basadas en valores Shapley',
    category: 'Explicabilidad',
    sourceUrl: 'https://github.com/slundberg/shap',
    apiEndpoint: 'https://api.mcp-platform.com/tools/shap',
    compatibleModels: ['random_forest', 'xgboost', 'logistic_regression', 'any']
  },
  {
    id: 'optuna',
    name: 'Optuna',
    description: 'Framework de optimización de hiperparámetros',
    category: 'Optimización',
    sourceUrl: 'https://github.com/optuna/optuna',
    apiEndpoint: 'https://api.mcp-platform.com/tools/optuna',
    compatibleModels: ['any']
  },
  {
    id: 'yellowbrick',
    name: 'Yellowbrick',
    description: 'Visualizadores para análisis de modelos ML',
    category: 'Visualización',
    sourceUrl: 'https://github.com/DistrictDataLabs/yellowbrick',
    compatibleModels: ['kmeans', 'random_forest', 'pca', 'any']
  },
  {
    id: 'alibi_detect',
    name: 'Alibi Detect',
    description: 'Detección de anomalías y drift en datos',
    category: 'Monitoreo',
    sourceUrl: 'https://github.com/SeldonIO/alibi-detect',
    apiEndpoint: 'https://api.mcp-platform.com/tools/alibi',
    compatibleModels: ['any']
  },
  {
    id: 'tsne_viz',
    name: 't-SNE Visualizer',
    description: 'Visualización avanzada con t-SNE',
    category: 'Visualización',
    sourceUrl: 'https://github.com/oreillymedia/t-SNE-tutorial',
    compatibleModels: ['pca', 'tsne', 'umap']
  },
  {
    id: 'lime',
    name: 'LIME',
    description: 'Explicaciones locales para modelos de caja negra',
    category: 'Explicabilidad',
    sourceUrl: 'https://github.com/marcotcr/lime',
    apiEndpoint: 'https://api.mcp-platform.com/tools/lime',
    compatibleModels: ['random_forest', 'xgboost', 'svm', 'any']
  },
  {
    id: 'sktime',
    name: 'sktime',
    description: 'Biblioteca unificada para ML con series temporales',
    category: 'Series temporales',
    sourceUrl: 'https://github.com/alan-turing-institute/sktime',
    apiEndpoint: 'https://api.mcp-platform.com/tools/sktime',
    compatibleModels: ['sarima', 'arima', 'prophet']
  },
  {
    id: 'feature_engine',
    name: 'Feature Engine',
    description: 'Transformación y selección de características',
    category: 'Preprocesamiento',
    sourceUrl: 'https://github.com/feature-engine/feature_engine',
    apiEndpoint: 'https://api.mcp-platform.com/tools/feature-engine',
    compatibleModels: ['random_forest', 'xgboost', 'linear_regression', 'any']
  }
];
