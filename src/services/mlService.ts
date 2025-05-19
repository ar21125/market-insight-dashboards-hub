import { API_URL } from "@/config";

/**
 * Data structure for file upload and analysis request.
 */
interface UploadForAnalysisParams {
  file: File;
  industry: string;
  modelType: string;
  parameters: Record<string, any>;
}

/**
 * Service class for interacting with the Machine Learning API.
 */
class MLService {
  /**
   * Uploads a file for analysis.
   * @param params - The parameters for the analysis.
   * @returns A promise that resolves with the analysis results or rejects with an error.
   */
  async uploadForAnalysis(params: UploadForAnalysisParams): Promise<any> {
    const { file, industry, modelType, parameters } = params;
    const formData = new FormData();
    formData.append("file", file);
    formData.append("industry", industry);
    formData.append("model_type", modelType);
    formData.append("parameters", JSON.stringify(parameters));
    formData.append("file_id", file.name + "-" + Date.now());

    try {
      const response = await fetch(`${API_URL}/analyze/`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        // Check if the response has JSON content
        if (response.headers.get("content-type")?.includes("application/json")) {
          const errorData = await response.json();
          throw new Error(errorData.detail || `Upload failed with status: ${response.status}`);
        } else {
          // If not JSON, read as text
          const errorText = await response.text();
          throw new Error(`Upload failed with status: ${response.status}, ${errorText}`);
        }
      }

      return await response.json();
    } catch (error: any) {
      console.error("Upload error:", error);
      throw error;
    }
  }

  /**
   * Get available models for a specific industry
   */
  async getAvailableModels(industry: string): Promise<any> {
    try {
      const response = await fetch(`${API_URL}/analyze/models?industry=${industry}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch models: ${response.status}`);
      }
      return await response.json();
    } catch (error: any) {
      console.error("Error getting available models:", error);
      throw error;
    }
  }

  /**
   * Simplifies the description of model parameters for non-technical users.
   */
  private simplifyParameterDescriptions = (parameters: Record<string, any>) => {
    const simplifiedDescriptions: Record<string, string> = {
      // Time series parameters
      'p': 'Número de términos anteriores a considerar (cuántos días/meses previos influyen)',
      'd': 'Número de diferencias para estabilizar los datos (si los datos tienen tendencias fuertes)',
      'q': 'Términos de error anteriores a considerar (ajuste para variaciones inesperadas)',
      'seasonal_p': 'Patrones estacionales a considerar (por ejemplo, variaciones mensuales o trimestrales)',
      'seasonal_d': 'Diferenciación estacional (elimina patrones repetitivos)',
      'seasonal_q': 'Ajustes de error estacionales',
      'seasonal_period': 'Duración del ciclo estacional (7 para semanal, 12 para mensual, etc.)',
      'trend': 'Tipo de tendencia en los datos (creciente, decreciente o constante)',
      'damped': 'Si la tendencia debe suavizarse con el tiempo',
      
      // General parameters
      'target_column': 'Columna que desea predecir o analizar (ej: "Ventas", "Ingresos")',
      'date_column': 'Columna con fechas (ej: "Fecha", "Mes")',
      'value_column': 'Columna con valores numéricos a analizar (ej: "Monto", "Cantidad")',
      'group_column': 'Columna para agrupar datos (ej: "Región", "Producto")',
      'forecast_periods': 'Número de periodos futuros a predecir',
      
      // Classification/Regression parameters
      'n_estimators': 'Número de modelos a combinar (mayor número = más preciso pero más lento)',
      'max_depth': 'Complejidad máxima del modelo (mayor número = potencialmente más preciso pero riesgo de sobreajuste)',
      'learning_rate': 'Velocidad de aprendizaje (valores pequeños aprenden más lento pero pueden ser más precisos)',
      'alpha': 'Intensidad de la regularización (controla la complejidad del modelo)',
      'l1_ratio': 'Balance entre regularización L1 y L2 (0 = L2, 1 = L1)',
      'degree': 'Grado del polinomio (para regresión polinomial)',
      
      // Clustering parameters
      'n_clusters': 'Número de grupos a identificar',
      'eps': 'Distancia máxima para considerar puntos como vecinos',
      'min_samples': 'Número mínimo de puntos para formar un grupo',
      
      // Dimensionality reduction
      'n_components': 'Número de dimensiones a mantener',
      'perplexity': 'Equilibrio entre preservar estructura local y global (recomendado: 5-50)'
    };

    const metadata = parameters.metadata || {};
    
    // Create a copy to not modify the original
    const updatedMetadata = {...metadata};
    
    // Update descriptions to be more user-friendly
    Object.keys(updatedMetadata).forEach(param => {
      if (simplifiedDescriptions[param]) {
        if (typeof updatedMetadata[param] === 'object' && updatedMetadata[param] !== null) {
          updatedMetadata[param].description = simplifiedDescriptions[param];
        }
      }
    });
    
    return {
      ...parameters,
      metadata: updatedMetadata
    };
  };

  // Enhance getMockedModelParams to include better descriptions
  private getMockedModelParams = (modelType: string) => {
    // Default parameters for different model types
    const mockParams: Record<string, any> = {
      // Time Series Models
      'sarima': {
        parameters: ['target_column', 'date_column', 'p', 'd', 'q', 'seasonal_p', 'seasonal_d', 'seasonal_q', 'seasonal_period', 'forecast_periods'],
        metadata: {
          target_column: {
            description: 'Columna que desea predecir o analizar (ej: "Ventas", "Ingresos")',
            type: 'string',
            required: true
          },
          date_column: {
            description: 'Columna con fechas (ej: "Fecha", "Mes")',
            type: 'string',
            required: true
          },
          p: {
            description: 'Número de términos anteriores a considerar (cuántos días/meses previos influyen)',
            type: 'number',
            required: false
          },
          d: {
            description: 'Número de diferencias para estabilizar los datos (si los datos tienen tendencias fuertes)',
            type: 'number',
            required: false
          },
          q: {
            description: 'Términos de error anteriores a considerar (ajuste para variaciones inesperadas)',
            type: 'number',
            required: false
          },
          seasonal_p: {
            description: 'Patrones estacionales a considerar (por ejemplo, variaciones mensuales o trimestrales)',
            type: 'number',
            required: false
          },
          seasonal_d: {
            description: 'Diferenciación estacional (elimina patrones repetitivos)',
            type: 'number',
            required: false
          },
          seasonal_q: {
            description: 'Ajustes de error estacionales',
            type: 'number',
            required: false
          },
          seasonal_period: {
            description: 'Duración del ciclo estacional (7 para semanal, 12 para mensual, etc.)',
            type: 'number',
            required: false
          },
          forecast_periods: {
            description: 'Número de periodos futuros a predecir',
            type: 'number',
            required: true
          }
        }
      },
      'prophet': {
        parameters: ['target_column', 'date_column', 'forecast_periods', 'yearly_seasonality', 'weekly_seasonality', 'daily_seasonality'],
        metadata: {
          target_column: {
            description: 'Columna que desea predecir o analizar (ej: "Ventas", "Ingresos")',
            type: 'string',
            required: true
          },
          date_column: {
            description: 'Columna con fechas (ej: "Fecha", "Mes")',
            type: 'string',
            required: true
          },
          forecast_periods: {
            description: 'Número de periodos futuros a predecir',
            type: 'number',
            required: true
          },
          yearly_seasonality: {
            description: 'Activar análisis de patrones anuales (útil para datos con ciclos anuales)',
            type: 'string',
            required: false
          },
          weekly_seasonality: {
            description: 'Activar análisis de patrones semanales (útil para datos diarios)',
            type: 'string',
            required: false
          },
          daily_seasonality: {
            description: 'Activar análisis de patrones diarios (útil para datos por hora)',
            type: 'string',
            required: false
          }
        }
      },
      'arima': {
        parameters: ['target_column', 'date_column', 'p', 'd', 'q', 'forecast_periods'],
        metadata: {
          target_column: {
            description: 'Columna que desea predecir o analizar (ej: "Ventas", "Ingresos")',
            type: 'string',
            required: true
          },
          date_column: {
            description: 'Columna con fechas (ej: "Fecha", "Mes")',
            type: 'string',
            required: true
          },
          p: {
            description: 'Número de términos anteriores a considerar (cuántos días/meses previos influyen)',
            type: 'number',
            required: false
          },
          d: {
            description: 'Número de diferencias para estabilizar los datos (si los datos tienen tendencias fuertes)',
            type: 'number',
            required: false
          },
          q: {
            description: 'Términos de error anteriores a considerar (ajuste para variaciones inesperadas)',
            type: 'number',
            required: false
          },
          forecast_periods: {
            description: 'Número de periodos futuros a predecir',
            type: 'number',
            required: true
          }
        }
      },
      
      // Classification Models
      'random_forest': {
        parameters: ['target_column', 'n_estimators', 'max_depth'],
        metadata: {
          target_column: {
            description: 'Columna que desea predecir o clasificar (ej: "Categoría", "Estado")',
            type: 'string',
            required: true
          },
          n_estimators: {
            description: 'Número de modelos a combinar (mayor número = más preciso pero más lento)',
            type: 'number',
            required: false
          },
          max_depth: {
            description: 'Complejidad máxima del modelo (mayor número = potencialmente más preciso pero riesgo de sobreajuste)',
            type: 'number',
            required: false
          }
        }
      },
      'xgboost': {
        parameters: ['target_column', 'n_estimators', 'max_depth', 'learning_rate'],
        metadata: {
          target_column: {
            description: 'Columna que desea predecir o clasificar (ej: "Categoría", "Estado")',
            type: 'string',
            required: true
          },
          n_estimators: {
            description: 'Número de modelos a combinar (mayor número = más preciso pero más lento)',
            type: 'number',
            required: false
          },
          max_depth: {
            description: 'Complejidad máxima del modelo (mayor número = potencialmente más preciso pero riesgo de sobreajuste)',
            type: 'number',
            required: false
          },
          learning_rate: {
            description: 'Velocidad de aprendizaje (valores pequeños aprenden más lento pero pueden ser más precisos)',
            type: 'number',
            required: false
          }
        }
      },
      
      // Regression Models
      'linear_regression': {
        parameters: ['target_column'],
        metadata: {
          target_column: {
            description: 'Columna que desea predecir (ej: "Precio", "Ventas")',
            type: 'string',
            required: true
          }
        }
      },
      'polynomial_regression': {
        parameters: ['target_column', 'degree'],
        metadata: {
          target_column: {
            description: 'Columna que desea predecir (ej: "Precio", "Ventas")',
            type: 'string',
            required: true
          },
          degree: {
            description: 'Complejidad del modelo (2 = cuadrático, 3 = cúbico, etc.)',
            type: 'number',
            required: true
          }
        }
      },
      
      // Clustering Models
      'kmeans': {
        parameters: ['n_clusters'],
        metadata: {
          n_clusters: {
            description: 'Número de grupos a identificar en los datos',
            type: 'number',
            required: true
          }
        }
      },
      'dbscan': {
        parameters: ['eps', 'min_samples'],
        metadata: {
          eps: {
            description: 'Distancia máxima entre puntos para considerarlos del mismo grupo',
            type: 'number',
            required: true
          },
          min_samples: {
            description: 'Número mínimo de puntos para formar un grupo',
            type: 'number',
            required: true
          }
        }
      },
      
      // Dimensionality Reduction
      'pca': {
        parameters: ['n_components'],
        metadata: {
          n_components: {
            description: 'Número de dimensiones a mantener (simplifica sus datos a este número de variables)',
            type: 'number',
            required: true
          }
        }
      },
      'tsne': {
        parameters: ['n_components', 'perplexity'],
        metadata: {
          n_components: {
            description: 'Número de dimensiones a mantener (simplifica sus datos a este número de variables)',
            type: 'number',
            required: true
          },
          perplexity: {
            description: 'Equilibrio entre preservar estructura local y global (recomendado entre 5-50)',
            type: 'number',
            required: false
          }
        }
      }
    };
    
    // Return the parameters for the requested model type or default ones
    return mockParams[modelType] || {
      parameters: ['target_column'],
      metadata: {
        target_column: {
          description: 'Columna que desea analizar en sus datos',
          type: 'string',
          required: true
        }
      }
    };
  };

  /**
   * Get parameters for a specific ML model
   */
  async getModelParameters(modelType: string): Promise<any> {
    try {
      // Try to fetch from API first
      const response = await fetch(`${API_URL}/analyze/models/${modelType}/parameters`);
      
      if (response.ok) {
        const data = await response.json();
        return this.simplifyParameterDescriptions(data);
      } else {
        console.log('Fallback to mocked model parameters');
        return this.getMockedModelParams(modelType);
      }
    } catch (error) {
      console.error('Error getting model parameters:', error);
      return this.getMockedModelParams(modelType);
    }
  }
}

export const mlService = new MLService();
