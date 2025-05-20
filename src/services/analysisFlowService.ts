import { AnalysisFlow, AnalysisStep, InputField, OutputInsight, RecommendedFor } from '@/types/analysis';

// Mock data for analysis flows
const analysisFlows: AnalysisFlow[] = [
  {
    id: "churn-prediction",
    name: "Predicción de Fuga de Clientes",
    description: "Este flujo analiza datos de clientes para predecir la probabilidad de que un cliente abandone la empresa.",
    industry: "Telecomunicaciones",
    businessGoal: "Reducir la tasa de abandono de clientes.",
    totalEstimatedTime: "30-45 minutos",
    recommendedTools: ["Python", "scikit-learn", "Pandas"],
    recommendedFor: [
      {
        title: "Gerentes de Marketing",
        reason: "Para identificar clientes en riesgo y tomar medidas preventivas."
      },
      {
        title: "Analistas de Datos",
        reason: "Para mejorar la precisión de los modelos de predicción de churn."
      }
    ],
    steps: [
      {
        id: "churn-step-1",
        name: "Recopilación de Datos",
        description: "Recopila datos de clientes de diversas fuentes.",
        prerequisiteSteps: [],
        estimatedProcessingTime: "5 minutos",
        difficulty: "básico",
        modelType: "N/A",
        inputFields: [
          {
            name: "Datos del Cliente",
            description: "Información demográfica y de contacto del cliente.",
            example: "customer_data.csv",
            required: true,
            type: "text"
          },
          {
            name: "Historial de Compras",
            description: "Registro de todas las compras realizadas por el cliente.",
            example: "purchase_history.csv",
            required: true,
            type: "text"
          },
          {
            name: "Interacciones con el Servicio al Cliente",
            description: "Registro de todas las interacciones del cliente con el servicio al cliente.",
            example: "customer_service_interactions.csv",
            required: false,
            type: "text"
          }
        ],
        outputInsights: [
          {
            name: "Conjunto de Datos Integrado",
            description: "Un conjunto de datos único que combina todas las fuentes de datos.",
            visualizationType: "Tabla",
            businessValue: "Proporciona una visión completa del cliente."
          }
        ]
      },
      {
        id: "churn-step-2",
        name: "Análisis Exploratorio de Datos",
        description: "Realiza un análisis exploratorio de los datos para identificar patrones y tendencias.",
        prerequisiteSteps: ["churn-step-1"],
        estimatedProcessingTime: "10 minutos",
        difficulty: "intermedio",
        modelType: "N/A",
        inputFields: [],
        outputInsights: [
          {
            name: "Visualizaciones de Datos",
            description: "Gráficos y tablas que muestran patrones y tendencias en los datos.",
            visualizationType: "Gráficos de Barras, Gráficos de Dispersión",
            businessValue: "Ayuda a comprender los factores que contribuyen al churn."
          }
        ]
      },
      {
        id: "churn-step-3",
        name: "Construcción del Modelo de Predicción",
        description: "Construye un modelo de machine learning para predecir el churn.",
        prerequisiteSteps: ["churn-step-2"],
        estimatedProcessingTime: "15 minutos",
        difficulty: "avanzado",
        modelType: "Regresión Logística",
        inputFields: [],
        outputInsights: [
          {
            name: "Modelo de Predicción de Churn",
            description: "Un modelo de machine learning que predice la probabilidad de churn.",
            visualizationType: "N/A",
            businessValue: "Permite identificar clientes en riesgo de churn."
          },
          {
            name: "Métricas de Rendimiento del Modelo",
            description: "Métricas que evalúan la precisión del modelo.",
            visualizationType: "Tabla",
            businessValue: "Ayuda a optimizar el modelo."
          }
        ]
      }
    ],
    technicalImplementation: {
      approach: "Utilizar un enfoque de machine learning supervisado.",
      technologies: ["Python", "scikit-learn", "Pandas"],
      openSourceAlternatives: [
        {
          name: "TensorFlow",
          description: "Una biblioteca de código abierto para machine learning.",
          url: "https://www.tensorflow.org/"
        }
      ],
      implementationSteps: [
        {
          name: "Preparación de Datos",
          description: "Limpiar y transformar los datos para el modelo.",
          resources: ["Pandas"]
        },
        {
          name: "Entrenamiento del Modelo",
          description: "Entrenar el modelo con los datos preparados.",
          resources: ["scikit-learn"]
        },
        {
          name: "Evaluación del Modelo",
          description: "Evaluar el rendimiento del modelo.",
          resources: ["scikit-learn"]
        }
      ],
      challenges: ["Obtención de datos de alta calidad.", "Selección del modelo adecuado."]
    }
  },
  {
    id: "credit-risk-analysis",
    name: "Análisis de Riesgo Crediticio",
    description: "Este flujo analiza datos financieros para evaluar el riesgo crediticio de los solicitantes.",
    industry: "Banca",
    businessGoal: "Reducir las pérdidas por incumplimiento de préstamos.",
    totalEstimatedTime: "40-50 minutos",
    recommendedTools: ["R", "glmnet", "dplyr"],
    recommendedFor: [
      {
        title: "Analistas de Crédito",
        reason: "Para tomar decisiones de préstamo más informadas."
      },
      {
        title: "Gerentes de Riesgo",
        reason: "Para monitorear y gestionar el riesgo crediticio."
      }
    ],
    steps: [
      {
        id: "credit-step-1",
        name: "Recopilación de Datos Financieros",
        description: "Recopila datos financieros de los solicitantes de préstamo.",
        prerequisiteSteps: [],
        estimatedProcessingTime: "10 minutos",
        difficulty: "básico",
        modelType: "N/A",
        inputFields: [
          {
            name: "Solicitud de Préstamo",
            description: "Información del solicitante, como ingresos, empleo, etc.",
            example: "loan_application.csv",
            required: true,
            type: "text"
          },
          {
            name: "Historial Crediticio",
            description: "Información del historial crediticio del solicitante.",
            example: "credit_history.csv",
            required: true,
            type: "text"
          }
        ],
        outputInsights: [
          {
            name: "Conjunto de Datos Integrado",
            description: "Un conjunto de datos único que combina todas las fuentes de datos.",
            visualizationType: "Tabla",
            businessValue: "Proporciona una visión completa del solicitante."
          }
        ]
      },
      {
        id: "credit-step-2",
        name: "Análisis Exploratorio de Datos",
        description: "Realiza un análisis exploratorio de los datos para identificar patrones y tendencias.",
        prerequisiteSteps: ["credit-step-1"],
        estimatedProcessingTime: "10 minutos",
        difficulty: "intermedio",
        modelType: "N/A",
        inputFields: [],
        outputInsights: [
          {
            name: "Visualizaciones de Datos",
            description: "Gráficos y tablas que muestran patrones y tendencias en los datos.",
            visualizationType: "Gráficos de Barras, Gráficos de Dispersión",
            businessValue: "Ayuda a comprender los factores que contribuyen al riesgo crediticio."
          }
        ]
      },
      {
        id: "credit-step-3",
        name: "Construcción del Modelo de Riesgo Crediticio",
        description: "Construye un modelo de machine learning para evaluar el riesgo crediticio.",
        prerequisiteSteps: ["credit-step-2"],
        estimatedProcessingTime: "20 minutos",
        difficulty: "avanzado",
        modelType: "Regresión Logística",
        inputFields: [],
        outputInsights: [
          {
            name: "Modelo de Riesgo Crediticio",
            description: "Un modelo de machine learning que evalúa el riesgo crediticio.",
            visualizationType: "N/A",
            businessValue: "Permite evaluar el riesgo de los solicitantes."
          },
          {
            name: "Métricas de Rendimiento del Modelo",
            description: "Métricas que evalúan la precisión del modelo.",
            visualizationType: "Tabla",
            businessValue: "Ayuda a optimizar el modelo."
          }
        ]
      }
    ],
    technicalImplementation: {
      approach: "Utilizar un enfoque de machine learning supervisado.",
      technologies: ["R", "glmnet", "dplyr"],
      openSourceAlternatives: [
        {
          name: "H2O.ai",
          description: "Una plataforma de código abierto para machine learning.",
          url: "https://www.h2o.ai/"
        }
      ],
      implementationSteps: [
        {
          name: "Preparación de Datos",
          description: "Limpiar y transformar los datos para el modelo.",
          resources: ["dplyr"]
        },
        {
          name: "Entrenamiento del Modelo",
          description: "Entrenar el modelo con los datos preparados.",
          resources: ["glmnet"]
        },
        {
          name: "Evaluación del Modelo",
          description: "Evaluar el rendimiento del modelo.",
          resources: ["caret"]
        }
      ],
      challenges: ["Obtención de datos de alta calidad.", "Selección del modelo adecuado."]
    }
  },
  // Cross-category analysis flow - Finance + Retail
  {
    id: "finance-retail-synergy",
    name: "Análisis Cruzado: Finanzas y Retail",
    description: "Este flujo combina análisis financieros y de retail para maximizar el valor de los datos comerciales.",
    industry: "Multisector",
    applicableIndustries: ["Finanzas", "Retail"],
    businessGoal: "Optimizar la relación entre el rendimiento financiero y las operaciones de retail.",
    totalEstimatedTime: "45-60 minutos",
    recommendedTools: ["Python", "R", "Power BI", "Tableau"],
    recommendedFor: [
      {
        title: "Directores Financieros",
        reason: "Para entender cómo las operaciones de retail afectan directamente los resultados financieros."
      },
      {
        title: "Gerentes de Tienda",
        reason: "Para tomar decisiones operativas basadas en métricas financieras clave."
      },
      {
        title: "Analistas de Negocio",
        reason: "Para encontrar correlaciones entre datos financieros y comportamiento de ventas."
      }
    ],
    steps: [
      {
        id: "cr-paso-1",
        name: "Análisis de Correlación Ventas-Liquidez",
        description: "Examina la relación entre patrones de venta y flujo de efectivo.",
        prerequisiteSteps: [],
        estimatedProcessingTime: "15 minutos",
        difficulty: "intermedio",
        modelType: "Análisis de Series Temporales + Regresión",
        howItWorks: "Este análisis utiliza técnicas de series temporales para alinear datos de ventas con indicadores financieros, seguido de análisis de regresión para identificar relaciones significativas.",
        benefits: [
          "Identificar cómo los ciclos de ventas afectan la posición de liquidez",
          "Predecir necesidades de capital de trabajo basadas en tendencias de ventas",
          "Optimizar el ciclo de conversión de efectivo"
        ],
        inputFields: [
          {
            name: "Datos de Ventas Diarias",
            description: "Registros de ventas por día, categoría y ubicación.",
            example: "ventas_diarias.xlsx",
            required: true,
            type: "numeric"
          },
          {
            name: "Estados de Flujo de Efectivo",
            description: "Informes de flujo de efectivo para el mismo período.",
            example: "flujo_efectivo_mensual.csv",
            required: true,
            type: "numeric"
          },
          {
            name: "Calendario Promocional",
            description: "Fechas de campañas y promociones especiales.",
            example: "calendario_promocional.xlsx",
            required: false,
            type: "date"
          }
        ],
        outputInsights: [
          {
            name: "Correlación Ventas-Liquidez",
            description: "Grado de correlación entre picos de ventas y posición de liquidez.",
            visualizationType: "Mapa de Calor",
            businessValue: "Planificar mejor el flujo de efectivo basado en estacionalidad de ventas."
          },
          {
            name: "Predicción de Necesidades de Capital",
            description: "Estimación de capital de trabajo requerido basado en proyecciones de venta.",
            visualizationType: "Gráfico de Líneas con Bandas de Confianza",
            businessValue: "Evitar problemas de liquidez durante períodos de alta demanda."
          },
          {
            name: "Impacto Promocional en Flujo de Caja",
            description: "Análisis de cómo las promociones afectan tanto ventas como flujo de efectivo.",
            visualizationType: "Dashboard Interactivo",
            businessValue: "Optimizar calendario promocional considerando impacto financiero completo."
          }
        ]
      },
      {
        id: "cr-paso-2",
        name: "Segmentación de Clientes por Valor Financiero",
        description: "Clasifica clientes según su valor para la empresa combinando métricas de retail y financieras.",
        prerequisiteSteps: ["cr-paso-1"],
        estimatedProcessingTime: "20 minutos",
        difficulty: "avanzado",
        modelType: "Clustering K-Means + Análisis RFM",
        howItWorks: "Combina el análisis RFM (Recencia, Frecuencia, Monto) tradicional con métricas financieras como costo de adquisición y valor del cliente, utilizando algoritmos de clustering para identificar segmentos de alto valor.",
        benefits: [
          "Identificar clientes con mayor rentabilidad neta, no solo por volumen de compra",
          "Optimizar estrategias de marketing basadas en el verdadero retorno de inversión",
          "Personalizar ofertas según el impacto financiero real de cada segmento"
        ],
        inputFields: [
          {
            name: "Historial de Compras de Clientes",
            description: "Datos de compras con identificadores de cliente, fechas, montos.",
            example: "historial_compras.csv",
            required: true,
            type: "text"
          },
          {
            name: "Costos de Marketing por Canal",
            description: "Gastos de marketing asignados por canal de adquisición.",
            example: "costos_marketing.xlsx",
            required: true,
            type: "numeric"
          },
          {
            name: "Datos de Costos Operativos",
            description: "Costos asociados a la atención de diferentes segmentos.",
            example: "costos_operativos.csv",
            required: false,
            type: "numeric"
          }
        ],
        outputInsights: [
          {
            name: "Segmentos de Clientes por Valor Real",
            description: "Grupos de clientes clasificados por rentabilidad neta considerando todos los costos asociados.",
            visualizationType: "Gráfico de Dispersión 3D",
            businessValue: "Enfocar recursos en clientes que generan valor real para el negocio."
          },
          {
            name: "Análisis de ROI por Segmento",
            description: "Retorno de inversión calculado para cada segmento identificado.",
            visualizationType: "Gráfico de Barras Comparativo",
            businessValue: "Justificar inversiones de marketing con datos concretos de retorno."
          },
          {
            name: "Predicción de Valor de Vida del Cliente",
            description: "Proyección del valor total que cada segmento generará en el tiempo.",
            visualizationType: "Gráfico de Proyección",
            businessValue: "Tomar decisiones estratégicas basadas en valor a largo plazo, no solo ventas inmediatas."
          }
        ]
      },
      {
        id: "cr-paso-3",
        name: "Optimización de Inventario por Métricas Financieras",
        description: "Determina niveles óptimos de inventario considerando tanto demanda como impacto financiero.",
        prerequisiteSteps: ["cr-paso-1"],
        estimatedProcessingTime: "15-25 minutos",
        difficulty: "avanzado",
        modelType: "Optimización Multiobjetivo + Series de Tiempo",
        howItWorks: "Utiliza algoritmos de optimización multiobjetivo que equilibran múltiples factores: minimizar costos de inventario, maximizar disponibilidad de productos y optimizar el capital de trabajo, incorporando pronósticos de demanda basados en series de tiempo.",
        benefits: [
          "Reducir costos de almacenamiento sin afectar niveles de servicio",
          "Liberar capital invertido en exceso de inventario",
          "Minimizar pérdidas por caducidad o obsolescencia"
        ],
        inputFields: [
          {
            name: "Datos de Inventario Históricos",
            description: "Niveles de inventario por producto y tiempo.",
            example: "inventario_historico.xlsx",
            required: true,
            type: "numeric"
          },
          {
            name: "Costos de Almacenamiento",
            description: "Costos asociados al mantenimiento de inventario.",
            example: "costos_almacenamiento.csv",
            required: true,
            type: "numeric"
          },
          {
            name: "Historial de Ventas",
            description: "Datos de ventas por producto a lo largo del tiempo.",
            example: "ventas_producto.xlsx",
            required: true,
            type: "numeric"
          },
          {
            name: "Datos de Rotación de Inventario",
            description: "Métricas de rotación por categoría y producto.",
            example: "rotacion_inventario.csv",
            required: false,
            type: "numeric"
          }
        ],
        outputInsights: [
          {
            name: "Niveles Óptimos de Inventario",
            description: "Recomendaciones de cantidades a mantener por producto considerando métricas financieras.",
            visualizationType: "Dashboard con Semáforos",
            businessValue: "Reducir costos de inventario manteniendo niveles adecuados de servicio."
          },
          {
            name: "Impacto Financiero de Políticas de Inventario",
            description: "Análisis de cómo diferentes estrategias de inventario afectan el flujo de caja.",
            visualizationType: "Análisis de Escenarios",
            businessValue: "Seleccionar la política más favorable para los objetivos financieros."
          },
          {
            name: "Productos con Alto Impacto Financiero",
            description: "Identificación de productos que inmovilizan mayor capital con menor retorno.",
            visualizationType: "Matriz de Decisión",
            businessValue: "Priorizar acciones en productos que liberarán mayor capital de trabajo."
          }
        ]
      }
    ],
    technicalImplementation: {
      approach: "Enfoque híbrido combinando herramientas de BI y análisis avanzado de datos",
      technologies: ["Python (pandas, scikit-learn)", "R (forecast package)", "Power BI", "SQL Server"],
      openSourceAlternatives: [
        {
          name: "Prophet + Darts",
          description: "Biblioteca de Facebook para pronósticos de series temporales combinada con Darts para análisis avanzado",
          url: "https://facebook.github.io/prophet/"
        },
        {
          name: "Metabase + RStudio",
          description: "Combinación de plataforma BI open source con entorno estadístico R",
          url: "https://www.metabase.com/"
        }
      ],
      implementationSteps: [
        {
          name: "Configuración de ETL para fuentes financieras y retail",
          description: "Establecer procesos de extracción, transformación y carga para combinar datos de ambos dominios",
          resources: ["Python (pandas, numpy)", "SQL", "Apache Airflow"]
        },
        {
          name: "Desarrollo de modelos predictivos y correlación",
          description: "Implementar modelos de machine learning para análisis de correlaciones y predicciones",
          resources: ["scikit-learn", "statsmodels", "XGBoost"]
        },
        {
          name: "Creación de dashboards integrados",
          description: "Diseñar visualizaciones interactivas que muestren insights financieros y de retail juntos",
          resources: ["Power BI", "Tableau", "R Shiny"]
        }
      ],
      challenges: [
        "Integración de datos de diferentes sistemas y formatos",
        "Alineación temporal entre datos financieros (mensuales) y datos de retail (diarios/semanales)",
        "Validación de hipótesis de correlación versus causalidad"
      ]
    }
  },
  
  // Healthcare + Technology cross-category flow
  {
    id: "healthcare-tech-integration",
    name: "Análisis Cruzado: Salud y Tecnología",
    description: "Integra análisis del sector salud con tecnologías avanzadas para mejorar resultados clínicos y eficiencia.",
    industry: "Multisector",
    applicableIndustries: ["Salud", "Tecnología"],
    businessGoal: "Optimizar la atención médica mediante el uso estratégico de tecnologías y análisis de datos.",
    totalEstimatedTime: "50-65 minutos",
    recommendedTools: ["Python", "TensorFlow", "SPSS", "Tableau"],
    recommendedFor: [
      {
        title: "Directores de Hospitales",
        reason: "Para mejorar la eficiencia operativa y la calidad de atención."
      },
      {
        title: "Desarrolladores de Soluciones Médicas",
        reason: "Para crear productos tecnológicos basados en necesidades reales del sector salud."
      },
      {
        title: "Investigadores Clínicos",
        reason: "Para identificar patrones en datos médicos que puedan conducir a mejores tratamientos."
      }
    ],
    steps: [
      {
        id: "ht-paso-1",
        name: "Predicción de Readmisiones Hospitalarias",
        description: "Identifica factores de riesgo para readmisiones evitables utilizando aprendizaje automático.",
        prerequisiteSteps: [],
        estimatedProcessingTime: "20 minutos",
        difficulty: "avanzado",
        modelType: "Gradient Boosting (XGBoost)",
        howItWorks: "Este modelo analiza múltiples variables clínicas y demográficas para identificar patrones que predicen qué pacientes tienen mayor probabilidad de ser readmitidos, utilizando algoritmos de gradient boosting que son particularmente efectivos con datos médicos complejos y variables categóricas.",
        benefits: [
          "Reducir tasas de readmisión y costos asociados",
          "Mejorar la calidad de atención y satisfacción del paciente",
          "Optimizar asignación de recursos para intervenciones preventivas"
        ],
        inputFields: [
          {
            name: "Datos de Pacientes",
            description: "Información demográfica y clínica anonimizada de pacientes.",
            example: "pacientes_anonimizados.csv",
            required: true,
            type: "text"
          },
          {
            name: "Historial de Admisiones",
            description: "Registro de hospitalizaciones previas con fechas y diagnósticos.",
            example: "historial_admisiones.xlsx",
            required: true,
            type: "date"
          },
          {
            name: "Datos de Tratamientos",
            description: "Medicamentos y terapias administradas a los pacientes.",
            example: "tratamientos.csv",
            required: true,
            type: "categorical"
          },
          {
            name: "Resultados de Laboratorio",
            description: "Valores de análisis clínicos realizados durante la hospitalización.",
            example: "resultados_lab.xlsx",
            required: false,
            type: "numeric"
          }
        ],
        outputInsights: [
          {
            name: "Score de Riesgo de Readmisión",
            description: "Puntuación para cada paciente indicando su probabilidad de readmisión.",
            visualizationType: "Dashboard de Riesgo con Semáforos",
            businessValue: "Dirigir intervenciones preventivas a pacientes de alto riesgo."
          },
          {
            name: "Factores Principales de Readmisión",
            description: "Variables con mayor impacto en la predicción de readmisiones.",
            visualizationType: "Gráfico de Importancia de Variables",
            businessValue: "Desarrollar protocolos específicos para mitigar factores de riesgo clave."
          },
          {
            name: "Patrones Temporales de Readmisiones",
            description: "Análisis de cuándo ocurren readmisiones en relación al alta inicial.",
            visualizationType: "Análisis de Supervivencia (Kaplan-Meier)",
            businessValue: "Optimizar seguimiento post-alta en períodos críticos identificados."
          }
        ]
      },
      {
        id: "ht-paso-2",
        name: "Optimización de Rutas de Atención Clínica",
        description: "Analiza y optimiza flujos de procesos clínicos para mejorar eficiencia y resultados.",
        prerequisiteSteps: [],
        estimatedProcessingTime: "15 minutos",
        difficulty: "intermedio",
        modelType: "Process Mining + Simulación Monte Carlo",
        howItWorks: "Combina técnicas de minería de procesos para descubrir rutas reales de atención a partir de registros electrónicos, con simulaciones Monte Carlo para evaluar el impacto de cambios propuestos en dichas rutas.",
        benefits: [
          "Identificar cuellos de botella en procesos de atención",
          "Reducir tiempos de espera y mejorar experiencia del paciente",
          "Optimizar asignación de recursos médicos y tecnológicos"
        ],
        inputFields: [
          {
            name: "Logs de Actividad Clínica",
            description: "Registros de actividades médicas con timestamps e identificadores.",
            example: "logs_actividad.csv",
            required: true,
            type: "text"
          },
          {
            name: "Tiempos de Proceso",
            description: "Duración de diferentes procedimientos y actividades clínicas.",
            example: "tiempos_proceso.xlsx",
            required: true,
            type: "numeric"
          },
          {
            name: "Recursos Disponibles",
            description: "Inventario de personal, equipos y recursos por área.",
            example: "recursos_disponibles.xlsx",
            required: true,
            type: "numeric"
          }
        ],
        outputInsights: [
          {
            name: "Mapa de Procesos Optimizado",
            description: "Visualización de rutas de atención actuales y optimizadas con análisis de impacto.",
            visualizationType: "Diagrama de Flujo Interactivo",
            businessValue: "Implementar cambios en rutas de atención con máximo beneficio y mínima disrupción."
          },
          {
            name: "Simulación de Escenarios",
            description: "Modelado de diferentes configuraciones de recursos y su impacto en tiempos de espera.",
            visualizationType: "Dashboard Comparativo",
            businessValue: "Tomar decisiones informadas sobre asignación de recursos y cambios de proceso."
          },
          {
            name: "Análisis de Variación de Procesos",
            description: "Identificación de desviaciones del proceso estándar y su impacto en resultados.",
            visualizationType: "Mapa de Calor de Variaciones",
            businessValue: "Estandarizar procesos clave manteniendo flexibilidad donde sea necesario."
          }
        ]
      },
      {
        id: "ht-paso-3",
        name: "Detección Temprana de Complicaciones",
        description: "Sistema de alertas basado en IA para identificar señales tempranas de complicaciones médicas.",
        prerequisiteSteps: ["ht-paso-1"],
        estimatedProcessingTime: "25 minutos",
        difficulty: "avanzado",
        modelType: "Deep Learning (LSTM) + Reglas Clínicas",
        howItWorks: "Combina redes neuronales recurrentes (LSTM) que capturan patrones temporales en datos fisiológicos con reglas clínicas basadas en evidencia médica, creando un sistema híbrido que balancea el poder predictivo del aprendizaje profundo con la interpretabilidad de reglas médicas establecidas.",
        benefits: [
          "Detectar complicaciones horas o días antes de su manifestación clínica evidente",
          "Reducir morbilidad, mortalidad y costos asociados a complicaciones",
          "Permitir intervenciones preventivas menos invasivas y más económicas"
        ],
        inputFields: [
          {
            name: "Datos de Monitoreo Continuo",
            description: "Series temporales de signos vitales y parámetros fisiológicos.",
            example: "monitoreo_continuo.csv",
            required: true,
            type: "numeric"
          },
          {
            name: "Resultados de Laboratorio Seriados",
            description: "Evolución temporal de valores de laboratorio clave.",
            example: "lab_seriados.xlsx",
            required: true,
            type: "numeric"
          },
          {
            name: "Notas Clínicas",
            description: "Observaciones del personal médico y de enfermería.",
            example: "notas_clinicas.txt",
            required: false,
            type: "text"
          },
          {
            name: "Historial de Medicación",
            description: "Registro de medicamentos administrados con dosis y tiempos.",
            example: "medicacion.csv",
            required: true,
            type: "categorical"
          }
        ],
        outputInsights: [
          {
            name: "Alertas de Riesgo Temprano",
            description: "Notificaciones en tiempo real de pacientes con patrones indicativos de complicaciones inminentes.",
            visualizationType: "Sistema de Alertas Multinivel",
            businessValue: "Intervenir antes que las complicaciones se desarrollen completamente, mejorando resultados y reduciendo costos."
          },
          {
            name: "Trayectorias de Deterioro",
            description: "Visualización de la evolución de parámetros clave que predicen complicaciones.",
            visualizationType: "Gráficos de Tendencia con Umbrales",
            businessValue: "Entender la progresión de las complicaciones para mejorar protocolos de intervención."
          },
          {
            name: "Explicabilidad de Predicciones",
            description: "Justificación de cada alerta basada en factores contribuyentes identificados.",
            visualizationType: "Gráfico de Contribución de Factores",
            businessValue: "Aumentar confianza del personal clínico en el sistema y facilitar decisiones informadas."
          }
        ]
      }
    ],
    technicalImplementation: {
      approach: "Implementación híbrida con componentes on-premise para datos sensibles y cloud para análisis avanzado",
      technologies: ["TensorFlow", "Python", "FHIR (Fast Healthcare Interoperability Resources)", "Azure Healthcare APIs"],
      openSourceAlternatives: [
        {
          name: "OMOP Common Data Model + OHDSI Tools",
          description: "Modelo de datos estandarizado para salud con suite de herramientas analíticas open source",
          url: "https://www.ohdsi.org/data-standardization/"
        },
        {
          name: "OpenMRS + Bahmni",
          description: "Sistema de registros médicos electrónicos con capacidades analíticas integradas",
          url: "https://openmrs.org/"
        },
        {
          name: "Project MONAI",
          description: "Framework AI de código abierto especializado en imágenes médicas",
          url: "https://monai.io/"
        }
      ],
      implementationSteps: [
        {
          name: "Anonimización y estandarización de datos médicos",
          description: "Procesamiento seguro de información clínica sensible conforme a regulaciones de privacidad",
          resources: ["Python (pandas)", "HIPAA Safe Harbor Tools", "K-anonymity techniques"]
        },
        {
          name: "Desarrollo de modelos predictivos",
          description: "Creación y validación de algoritmos de machine learning para detección temprana y optimización",
          resources: ["TensorFlow/PyTorch", "scikit-learn", "XGBoost"]
        },
        {
          name: "Integración con sistemas clínicos existentes",
          description: "Conexión segura con EMR (Electronic Medical Records) y otras plataformas hospitalarias",
          resources: ["FHIR API", "HL7 interfaces", "RESTful services"]
        },
        {
          name: "Despliegue de dashboards clínicos",
          description: "Implementación de interfaces visuales diseñadas específicamente para entornos médicos",
          resources: ["Tableau", "Power BI", "R Shiny"]
        }
      ],
      challenges: [
        "Cumplimiento con regulaciones de privacidad médica (HIPAA, GDPR para salud)",
        "Integración con sistemas legados hospitalarios heterogéneos",
        "Adopción por personal médico y entrenamiento en nuevas herramientas",
        "Validación clínica rigurosa antes de implementación completa"
      ]
    }
  }
];

export const getAnalysisFlows = (): AnalysisFlow[] => {
  return analysisFlows;
};

export const getAnalysisFlowById = (id: string): AnalysisFlow | undefined => {
  return analysisFlows.find(flow => flow.id === id);
};
