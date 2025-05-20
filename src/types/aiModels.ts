
export interface AIModelParam {
  name: string;
  description: string;
  type: 'text' | 'numeric' | 'date' | 'boolean' | 'categorical';
  required: boolean;
  default?: string | number | boolean;
  options?: string[];
}

export interface AIModelInfo {
  id: string;
  name: string;
  type: string;
  industry: string;
  applicableIndustries?: string[];
  description: string;
  use_cases: string[];
  benefits: string[];
  implementation_difficulty: 'básico' | 'intermedio' | 'avanzado';
  data_requirements: string[];
  typical_metrics: { name: string; description: string }[];
  parameters?: AIModelParam[];
}

export interface ModelCategory {
  id: string;
  name: string;
  description: string;
  models: string[];
}

export const MODEL_CATEGORIES: ModelCategory[] = [
  {
    id: 'time-series',
    name: 'Series Temporales',
    description: 'Modelos para análisis y predicción de datos secuenciales con componente temporal.',
    models: ['sarima', 'arima', 'prophet', 'exponential_smoothing', 'lstm']
  },
  {
    id: 'classification',
    name: 'Clasificación',
    description: 'Algoritmos para asignar categorías o clases a observaciones basados en características.',
    models: ['randomForest', 'xgboost', 'svm', 'logistic_regression', 'naive_bayes']
  },
  {
    id: 'clustering',
    name: 'Clustering',
    description: 'Técnicas para agrupar observaciones similares sin etiquetas previas.',
    models: ['kmeans', 'hierarchical', 'dbscan']
  },
  {
    id: 'statistical',
    name: 'Análisis Estadístico',
    description: 'Métodos para pruebas de hipótesis y análisis de correlación.',
    models: ['anova', 't_test', 'chi_square']
  },
  {
    id: 'regression',
    name: 'Regresión',
    description: 'Modelos para predecir valores numéricos continuos.',
    models: ['linear_regression', 'polynomial_regression', 'ridge_regression']
  },
  {
    id: 'dimensionality',
    name: 'Reducción de Dimensionalidad',
    description: 'Técnicas para simplificar datos complejos manteniendo información esencial.',
    models: ['pca', 'tsne']
  },
  {
    id: 'nlp',
    name: 'Procesamiento de Lenguaje Natural',
    description: 'Análisis avanzado de textos y documentos.',
    models: ['sentiment_analysis', 'named_entity_recognition', 'topic_modeling', 'text_classification']
  },
  {
    id: 'deep-learning',
    name: 'Deep Learning',
    description: 'Modelos basados en redes neuronales para problemas complejos.',
    models: ['cnn', 'rnn', 'transformer', 'autoencoder']
  },
  {
    id: 'optimization',
    name: 'Optimización',
    description: 'Algoritmos para encontrar la mejor solución entre múltiples alternativas bajo restricciones.',
    models: ['linear_programming', 'genetic_algorithm', 'particle_swarm', 'simulated_annealing']
  }
];

export const getModelsByCategory = (categoryId: string): string[] => {
  const category = MODEL_CATEGORIES.find(cat => cat.id === categoryId);
  return category ? category.models : [];
};

export const getCategoryForModel = (modelId: string): ModelCategory | undefined => {
  return MODEL_CATEGORIES.find(category => 
    category.models.includes(modelId)
  );
};
