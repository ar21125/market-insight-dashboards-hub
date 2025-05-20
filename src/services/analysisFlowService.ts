
import { AnalysisFlow, AnalysisStep, InputField, OutputInsight, RecommendedFor } from '@/types/analysis';

// Mock data for analysis flows
const analysisFlows: AnalysisFlow[] = [
  {
    id: "retail-flow",
    name: "Análisis de Ventas en Retail",
    description: "Optimiza tus ventas y reduce devoluciones mediante análisis de datos.",
    industry: "retail",
    applicableIndustries: ["retail", "e-commerce"],
    businessGoal: "Aumentar las ventas y mejorar la satisfacción del cliente.",
    totalEstimatedTime: "2 semanas",
    recommendedTools: ["Excel", "Tableau", "Power BI"],
    recommendedFor: [
      { title: "Gerentes de Ventas", reason: "Para entender mejor el comportamiento del consumidor." },
      { title: "Analistas de Datos", reason: "Para optimizar las estrategias de ventas." }
    ],
    steps: [
      {
        id: "step1",
        name: "Recopilación de Datos",
        description: "Reúne datos de ventas, inventario y comportamiento del cliente.",
        prerequisiteSteps: [],
        estimatedProcessingTime: "1 semana",
        difficulty: "básico",
        modelType: "Regresión Lineal",
        howItWorks: "Este análisis utiliza regresión para predecir ventas futuras basadas en datos históricos.",
        benefits: ["Identificación de tendencias de ventas", "Optimización de inventario"],
        inputFields: [
          { name: "Ventas Mensuales", description: "Datos de ventas por mes.", example: 10000, required: true, type: "numeric" },
          { name: "Inventario", description: "Cantidad de productos en stock.", example: 500, required: true, type: "numeric" }
        ],
        outputInsights: [
          { name: "Predicción de Ventas", description: "Estimación de ventas para el próximo trimestre.", visualizationType: "línea", businessValue: "Mejor planificación de inventario." }
        ]
      },
      {
        id: "step2",
        name: "Análisis de Resultados",
        description: "Analiza los resultados obtenidos y ajusta las estrategias.",
        prerequisiteSteps: ["step1"],
        estimatedProcessingTime: "1 semana",
        difficulty: "intermedio",
        modelType: "Análisis de Clúster",
        howItWorks: "Agrupa a los clientes según su comportamiento de compra.",
        benefits: ["Segmentación de clientes", "Mejora en la personalización de ofertas"],
        inputFields: [
          { name: "Datos de Clientes", description: "Información demográfica y de compra.", example: "Edad, Género, Historial de Compras", required: true, type: "text" }
        ],
        outputInsights: [
          { name: "Segmentos de Clientes", description: "Identificación de grupos de clientes con comportamientos similares.", visualizationType: "barra", businessValue: "Mejor enfoque en marketing." }
        ]
      }
    ],
    technicalImplementation: {
      approach: "Utilizamos herramientas de análisis de datos y machine learning para optimizar el flujo.",
      technologies: ["Python", "Pandas", "Scikit-learn"],
      openSourceAlternatives: [
        { name: "R", description: "Lenguaje de programación para análisis estadístico.", url: "https://www.r-project.org/" }
      ],
      implementationSteps: [
        { name: "Instalación de Herramientas", description: "Instalar Python y bibliotecas necesarias." },
        { name: "Recopilación de Datos", description: "Reunir datos de ventas y clientes." }
      ],
      challenges: ["Requiere datos limpios y bien estructurados.", "Puede necesitar ajustes en los modelos."]
    }
  },
  {
    id: "finanzas-flow",
    name: "Predicción de Riesgos Financieros",
    description: "Anticipa y mitiga riesgos financieros con modelos predictivos avanzados.",
    industry: "finanzas",
    applicableIndustries: ["finanzas", "seguros", "banca"],
    businessGoal: "Reducir pérdidas por impagos y optimizar decisiones de crédito.",
    totalEstimatedTime: "4 semanas",
    recommendedTools: ["Python", "R", "SAS", "Tableau"],
    recommendedFor: [
      { title: "Analistas de Riesgo", reason: "Para mejorar modelos de evaluación de riesgo crediticio." },
      { title: "Directores Financieros", reason: "Para tomar decisiones basadas en predicciones precisas." }
    ],
    steps: [
      {
        id: "step1",
        name: "Preparación de Datos Históricos",
        description: "Recopila y prepara datos históricos de créditos, pagos y perfiles de clientes.",
        prerequisiteSteps: [],
        estimatedProcessingTime: "1 semana",
        difficulty: "intermedio",
        modelType: "Limpieza y ETL",
        howItWorks: "Extracción, transformación y carga de datos de múltiples fuentes para crear un conjunto coherente.",
        benefits: ["Base de datos unificada", "Identificación de datos faltantes o incorrectos"],
        inputFields: [
          { name: "Historial de Créditos", description: "Registros históricos de créditos otorgados.", example: "Archivo CSV con 10,000 registros", required: true, type: "text" },
          { name: "Registros de Pagos", description: "Historial de pagos de clientes.", example: "Archivo Excel con fechas y montos", required: true, type: "text" }
        ],
        outputInsights: [
          { name: "Dataset Preparado", description: "Conjunto de datos limpio y estructurado.", visualizationType: "tabla", businessValue: "Fundamento para análisis precisos." }
        ]
      },
      {
        id: "step2",
        name: "Modelado Predictivo",
        description: "Desarrolla modelos predictivos para identificar riesgos potenciales.",
        prerequisiteSteps: ["step1"],
        estimatedProcessingTime: "2 semanas",
        difficulty: "avanzado",
        modelType: "Random Forest y XGBoost",
        howItWorks: "Combinación de algoritmos de machine learning para predecir la probabilidad de impago.",
        benefits: ["Alta precisión de predicción", "Identificación temprana de riesgos"],
        inputFields: [
          { name: "Dataset Preparado", description: "Datos limpios del paso anterior.", example: "DataFrame con 50 variables", required: true, type: "text" }
        ],
        outputInsights: [
          { name: "Puntuaciones de Riesgo", description: "Calificación de riesgo para cada cliente o transacción.", visualizationType: "heatmap", businessValue: "Reducción de pérdidas por impagos." },
          { name: "Variables Clave", description: "Factores más importantes para la predicción de riesgos.", visualizationType: "barra", businessValue: "Mejora en políticas de crédito." }
        ]
      },
      {
        id: "step3",
        name: "Implementación y Monitoreo",
        description: "Integra los modelos en sistemas operativos y establece monitoreo continuo.",
        prerequisiteSteps: ["step2"],
        estimatedProcessingTime: "1 semana",
        difficulty: "intermedio",
        modelType: "API y Dashboard",
        howItWorks: "Creación de APIs para integración en sistemas existentes y dashboards para monitoreo.",
        benefits: ["Automatización de evaluaciones", "Monitoreo en tiempo real"],
        inputFields: [
          { name: "Modelo Entrenado", description: "Modelo predictivo del paso anterior.", example: "Archivo .pkl o similar", required: true, type: "text" },
          { name: "Datos en Tiempo Real", description: "Flujo continuo de datos transaccionales.", example: "API de transacciones", required: false, type: "text" }
        ],
        outputInsights: [
          { name: "Dashboard de Riesgos", description: "Visualización en tiempo real de métricas de riesgo.", visualizationType: "dashboard", businessValue: "Respuesta rápida ante cambios en patrones de riesgo." }
        ]
      }
    ],
    technicalImplementation: {
      approach: "Implementamos modelos de machine learning supervisados con validación cruzada y monitoreo continuo.",
      technologies: ["Python", "Scikit-learn", "XGBoost", "Flask", "Docker"],
      openSourceAlternatives: [
        { name: "H2O.ai", description: "Plataforma de machine learning automatizado.", url: "https://www.h2o.ai/" },
        { name: "KNIME", description: "Plataforma de análisis visual sin código.", url: "https://www.knime.com/" }
      ],
      implementationSteps: [
        { name: "Análisis Exploratorio", description: "Exploración estadística de los datos para identificar patrones." },
        { name: "Feature Engineering", description: "Creación de variables derivadas con mayor poder predictivo." },
        { name: "Entrenamiento de Modelos", description: "Entrenamiento y validación cruzada de múltiples algoritmos." },
        { name: "Despliegue del Modelo", description: "Implementación como API REST en contenedores Docker." }
      ],
      challenges: [
        "Desbalance en clases (pocos casos de impago vs muchos pagos correctos).",
        "Datos faltantes en historiales antiguos.",
        "Necesidad de actualización periódica para mantener precisión."
      ]
    }
  },
  {
    id: "salud-flow",
    name: "Análisis Predictivo de Diagnósticos",
    description: "Mejora la precisión diagnóstica y optimiza la atención médica con IA.",
    industry: "salud",
    applicableIndustries: ["salud", "farmacéutica", "seguros-médicos"],
    businessGoal: "Reducir diagnósticos incorrectos y optimizar planes de tratamiento.",
    totalEstimatedTime: "6 semanas",
    recommendedTools: ["TensorFlow", "PyTorch", "MATLAB", "R"],
    recommendedFor: [
      { title: "Directores Médicos", reason: "Para mejorar protocolos de diagnóstico basados en datos." },
      { title: "Científicos de Datos en Salud", reason: "Para desarrollar modelos de apoyo al diagnóstico." }
    ],
    steps: [
      {
        id: "step1",
        name: "Recopilación de Datos Clínicos",
        description: "Extracción segura y anonimizada de historiales médicos e imágenes diagnósticas.",
        prerequisiteSteps: [],
        estimatedProcessingTime: "2 semanas",
        difficulty: "intermedio",
        modelType: "Extracción y Anonimización",
        howItWorks: "Extracción de datos estructurados y no estructurados de sistemas electrónicos de salud con técnicas de anonimización.",
        benefits: ["Base de conocimiento médico", "Protección de datos sensibles"],
        inputFields: [
          { name: "Historiales Clínicos", description: "Registros médicos electrónicos.", example: "10,000 registros en formato HL7", required: true, type: "text" },
          { name: "Imágenes Médicas", description: "Radiografías, resonancias, etc.", example: "5,000 imágenes en formato DICOM", required: false, type: "text" }
        ],
        outputInsights: [
          { name: "Dataset Médico", description: "Conjunto de datos anonimizado y estructurado.", visualizationType: "tabla", businessValue: "Fundamento para análisis diagnóstico." }
        ]
      },
      {
        id: "step2",
        name: "Análisis de Patrones Diagnósticos",
        description: "Identificación de patrones y correlaciones en diagnósticos y tratamientos.",
        prerequisiteSteps: ["step1"],
        estimatedProcessingTime: "2 semanas",
        difficulty: "avanzado",
        modelType: "Deep Learning y NLP",
        howItWorks: "Aplicación de redes neuronales para imágenes y procesamiento de lenguaje natural para notas clínicas.",
        benefits: ["Identificación de patrones ocultos", "Correlaciones entre síntomas y diagnósticos"],
        inputFields: [
          { name: "Dataset Médico", description: "Datos procesados del paso anterior.", example: "Dataset estructurado", required: true, type: "text" }
        ],
        outputInsights: [
          { name: "Correlaciones Diagnósticas", description: "Relaciones entre síntomas, diagnósticos y tratamientos.", visualizationType: "red", businessValue: "Mejora en precisión diagnóstica." },
          { name: "Análisis de Efectividad", description: "Efectividad de tratamientos por tipo de paciente.", visualizationType: "heatmap", businessValue: "Optimización de protocolos de tratamiento." }
        ]
      },
      {
        id: "step3",
        name: "Desarrollo de Sistema de Apoyo",
        description: "Creación de un sistema de apoyo a decisiones clínicas.",
        prerequisiteSteps: ["step2"],
        estimatedProcessingTime: "2 semanas",
        difficulty: "avanzado",
        modelType: "Sistemas Expertos e IA",
        howItWorks: "Combinación de modelos predictivos con reglas médicas establecidas.",
        benefits: ["Apoyo en tiempo real", "Reducción de errores diagnósticos"],
        inputFields: [
          { name: "Modelos Entrenados", description: "Modelos del paso anterior.", example: "Conjunto de modelos predictivos", required: true, type: "text" },
          { name: "Protocolos Médicos", description: "Guías clínicas establecidas.", example: "Documentos PDF de protocolos", required: true, type: "text" }
        ],
        outputInsights: [
          { name: "Sistema de Recomendación", description: "Recomendaciones diagnósticas basadas en síntomas y pruebas.", visualizationType: "interfaz", businessValue: "Reducción de diagnósticos incorrectos." },
          { name: "Alertas Médicas", description: "Alertas sobre posibles condiciones críticas.", visualizationType: "dashboard", businessValue: "Atención temprana de condiciones graves." }
        ]
      }
    ],
    technicalImplementation: {
      approach: "Combinamos técnicas de IA de vanguardia con conocimiento médico establecido para crear sistemas de apoyo al diagnóstico.",
      technologies: ["Python", "TensorFlow", "PyTorch", "FHIR", "HL7", "DICOM"],
      openSourceAlternatives: [
        { name: "MedPy", description: "Biblioteca Python para procesamiento de imágenes médicas.", url: "https://loli.github.io/medpy/" },
        { name: "MONAI", description: "Framework para IA en imágenes médicas.", url: "https://monai.io/" }
      ],
      implementationSteps: [
        { name: "Preprocesamiento de Datos Médicos", description: "Limpieza y estructuración de datos clínicos heterogéneos." },
        { name: "Entrenamiento de Modelos Especializados", description: "Desarrollo de modelos para diferentes tipos de diagnóstico." },
        { name: "Validación Clínica", description: "Validación con médicos especialistas." },
        { name: "Integración con Sistemas Hospitalarios", description: "Implementación compatible con sistemas existentes." }
      ],
      challenges: [
        "Alta sensibilidad de los datos médicos.",
        "Necesidad de explicabilidad en las predicciones.",
        "Requisitos estrictos de regulación médica (HIPAA, GDPR para salud).",
        "Resistencia a la adopción por parte del personal médico."
      ]
    }
  },
  {
    id: "manufactura-flow",
    name: "Optimización de Procesos Industriales",
    description: "Mejora la eficiencia productiva y reduce costos operativos mediante análisis avanzado.",
    industry: "manufactura",
    applicableIndustries: ["manufactura", "automotriz", "electrónica", "alimentos"],
    businessGoal: "Incrementar la eficiencia operativa y reducir desperdicios en procesos de producción.",
    totalEstimatedTime: "5 semanas",
    recommendedTools: ["Python", "RapidMiner", "Tableau", "Azure IoT"],
    recommendedFor: [
      { title: "Gerentes de Producción", reason: "Para optimizar líneas de producción y reducir tiempos muertos." },
      { title: "Ingenieros de Calidad", reason: "Para identificar factores clave en la calidad del producto." }
    ],
    steps: [
      {
        id: "step1",
        name: "Captura de Datos Operativos",
        description: "Implementación de sensores IoT y conexión con sistemas MES/ERP existentes.",
        prerequisiteSteps: [],
        estimatedProcessingTime: "2 semanas",
        difficulty: "intermedio",
        modelType: "IoT y ETL Industrial",
        howItWorks: "Captura de datos en tiempo real de máquinas, sensores y sistemas de producción.",
        benefits: ["Visibilidad en tiempo real", "Detección temprana de anomalías"],
        inputFields: [
          { name: "Datos de Sensores", description: "Mediciones de temperatura, presión, vibración, etc.", example: "CSV con 100,000 lecturas por día", required: true, type: "numeric" },
          { name: "Registros de Producción", description: "Datos de lotes, tiempos, unidades.", example: "Exportación desde ERP", required: true, type: "text" }
        ],
        outputInsights: [
          { name: "Dataset Operativo", description: "Datos unificados de producción y sensores.", visualizationType: "tabla", businessValue: "Base para análisis de eficiencia." }
        ]
      },
      {
        id: "step2",
        name: "Análisis de Eficiencia",
        description: "Identificación de cuellos de botella y factores críticos de producción.",
        prerequisiteSteps: ["step1"],
        estimatedProcessingTime: "1 semana",
        difficulty: "intermedio",
        modelType: "Análisis Estadístico y Series Temporales",
        howItWorks: "Aplicación de técnicas estadísticas para identificar patrones y correlaciones en datos de producción.",
        benefits: ["Identificación de cuellos de botella", "Optimización de recursos"],
        inputFields: [
          { name: "Dataset Operativo", description: "Datos procesados del paso anterior.", example: "Dataset estructurado", required: true, type: "text" }
        ],
        outputInsights: [
          { name: "Factores de Eficiencia", description: "Variables que más impactan en la productividad.", visualizationType: "pareto", businessValue: "Priorización de mejoras." },
          { name: "Mapa de Procesos", description: "Visualización de flujos y tiempos de proceso.", visualizationType: "sankey", businessValue: "Identificación de oportunidades de mejora." }
        ]
      },
      {
        id: "step3",
        name: "Modelado Predictivo",
        description: "Desarrollo de modelos para predecir fallas y optimizar mantenimiento.",
        prerequisiteSteps: ["step2"],
        estimatedProcessingTime: "1 semana",
        difficulty: "avanzado",
        modelType: "Machine Learning Industrial",
        howItWorks: "Aplicación de algoritmos de machine learning para predecir fallos y calidad de producto.",
        benefits: ["Mantenimiento predictivo", "Reducción de paradas no programadas"],
        inputFields: [
          { name: "Historial de Fallas", description: "Registro de fallos y mantenimientos.", example: "CSV con incidentes", required: true, type: "text" },
          { name: "Datos de Sensores", description: "Datos de máquinas antes de fallos.", example: "Series temporales", required: true, type: "numeric" }
        ],
        outputInsights: [
          { name: "Predicción de Fallos", description: "Probabilidad de fallo por equipo.", visualizationType: "gauge", businessValue: "Reducción de paradas no programadas." },
          { name: "Calendario Óptimo", description: "Programación óptima de mantenimiento.", visualizationType: "calendario", businessValue: "Optimización de recursos de mantenimiento." }
        ]
      },
      {
        id: "step4",
        name: "Implementación de Mejoras",
        description: "Desarrollo de dashboards y sistemas de alerta para operaciones.",
        prerequisiteSteps: ["step3"],
        estimatedProcessingTime: "1 semana",
        difficulty: "básico",
        modelType: "Business Intelligence Industrial",
        howItWorks: "Implementación de indicadores clave y alertas en plataformas de visualización.",
        benefits: ["Monitoreo en tiempo real", "Toma de decisiones ágil"],
        inputFields: [
          { name: "Modelos Predictivos", description: "Modelos del paso anterior.", example: "Archivos de modelo", required: true, type: "text" },
          { name: "KPIs Definidos", description: "Indicadores clave de rendimiento.", example: "Lista de métricas", required: true, type: "text" }
        ],
        outputInsights: [
          { name: "Dashboard Operativo", description: "Panel de control con métricas en tiempo real.", visualizationType: "dashboard", businessValue: "Visibilidad inmediata de operaciones." },
          { name: "Sistema de Alertas", description: "Notificaciones automáticas ante anomalías.", visualizationType: "alertas", businessValue: "Respuesta rápida a problemas." }
        ]
      }
    ],
    technicalImplementation: {
      approach: "Utilizamos una combinación de IoT industrial, análisis estadístico y machine learning para optimizar procesos de manufactura.",
      technologies: ["Python", "TensorFlow", "Docker", "Grafana", "MQTT", "OPC-UA"],
      openSourceAlternatives: [
        { name: "Node-RED", description: "Plataforma de programación visual para IoT.", url: "https://nodered.org/" },
        { name: "Predictive Maintenance Toolkit", description: "Conjunto de herramientas para mantenimiento predictivo.", url: "https://github.com/microsoft/ML-For-Beginners" }
      ],
      implementationSteps: [
        { name: "Auditoría de Sistemas", description: "Evaluación de sistemas y sensores existentes." },
        { name: "Despliegue de Sensores", description: "Instalación de sensores adicionales si es necesario." },
        { name: "Integración de Datos", description: "Conexión de fuentes de datos heterogéneas." },
        { name: "Desarrollo de Modelos", description: "Entrenamiento de modelos predictivos específicos." },
        { name: "Implementación en Producción", description: "Despliegue de soluciones en entorno operativo." }
      ],
      challenges: [
        "Integración con equipos antiguos sin capacidades IoT.",
        "Necesidad de minimizar interrupciones durante la implementación.",
        "Requisitos de robustez para entornos industriales.",
        "Capacitación del personal para el uso de nuevas herramientas."
      ]
    }
  },
  {
    id: "turismo-flow",
    name: "Análisis de Comportamiento del Viajero",
    description: "Optimiza ofertas turísticas y mejora la experiencia del cliente mediante análisis de datos.",
    industry: "turismo",
    applicableIndustries: ["turismo", "hotelería", "transporte"],
    businessGoal: "Incrementar reservas y mejorar la satisfacción del cliente mediante ofertas personalizadas.",
    totalEstimatedTime: "3 semanas",
    recommendedTools: ["Python", "Tableau", "Google Analytics", "Power BI"],
    recommendedFor: [
      { title: "Gerentes de Marketing", reason: "Para diseñar campañas más efectivas basadas en preferencias reales." },
      { title: "Directores de Experiencia", reason: "Para optimizar servicios según comportamiento del cliente." }
    ],
    steps: [
      {
        id: "step1",
        name: "Recopilación de Datos del Cliente",
        description: "Extracción y unificación de datos de clientes de múltiples fuentes.",
        prerequisiteSteps: [],
        estimatedProcessingTime: "1 semana",
        difficulty: "básico",
        modelType: "ETL Turístico",
        howItWorks: "Integración de datos de reservas, comentarios, redes sociales y comportamiento web.",
        benefits: ["Visión 360° del cliente", "Identificación de fuentes de tráfico efectivas"],
        inputFields: [
          { name: "Datos de Reservas", description: "Historial de reservas y cancelaciones.", example: "CSV con 50,000 reservas", required: true, type: "text" },
          { name: "Interacciones Web", description: "Datos de navegación en sitio web.", example: "Exportación de Google Analytics", required: false, type: "text" }
        ],
        outputInsights: [
          { name: "Perfil de Cliente", description: "Segmentación de clientes por comportamiento.", visualizationType: "perfiles", businessValue: "Mejor entendimiento de la clientela." }
        ]
      },
      {
        id: "step2",
        name: "Análisis de Preferencias",
        description: "Identificación de patrones en preferencias de viaje y hospedaje.",
        prerequisiteSteps: ["step1"],
        estimatedProcessingTime: "1 semana",
        difficulty: "intermedio",
        modelType: "Análisis de Sentimiento y Clustering",
        howItWorks: "Aplicación de NLP para análisis de comentarios y agrupamiento por preferencias.",
        benefits: ["Identificación de tendencias", "Detección de oportunidades de mejora"],
        inputFields: [
          { name: "Reseñas de Clientes", description: "Comentarios y calificaciones.", example: "10,000 reseñas de TripAdvisor", required: true, type: "text" },
          { name: "Datos Demográficos", description: "Edad, nacionalidad, etc.", example: "Datos de registro", required: true, type: "text" }
        ],
        outputInsights: [
          { name: "Mapa de Preferencias", description: "Visualización de preferencias por segmento.", visualizationType: "heatmap", businessValue: "Diseño de ofertas personalizadas." },
          { name: "Análisis de Sentimiento", description: "Valoración de aspectos del servicio.", visualizationType: "radar", businessValue: "Identificación de áreas de mejora." }
        ]
      },
      {
        id: "step3",
        name: "Modelado Predictivo de Demanda",
        description: "Desarrollo de modelos para predecir demanda por temporada y tipo de servicio.",
        prerequisiteSteps: ["step2"],
        estimatedProcessingTime: "1 semana",
        difficulty: "avanzado",
        modelType: "Series Temporales y Regresión",
        howItWorks: "Combinación de modelos de series temporales con factores externos como temporada, eventos y economía.",
        benefits: ["Planificación de recursos", "Optimización de precios"],
        inputFields: [
          { name: "Histórico de Ocupación", description: "Datos de ocupación por temporada.", example: "CSV con datos de 5 años", required: true, type: "numeric" },
          { name: "Calendario de Eventos", description: "Fechas de eventos relevantes.", example: "CSV de eventos locales", required: false, type: "date" }
        ],
        outputInsights: [
          { name: "Pronóstico de Demanda", description: "Predicción de ocupación por temporada.", visualizationType: "línea", businessValue: "Mejor planificación de recursos y precios." },
          { name: "Elasticidad de Precios", description: "Impacto de variaciones de precio en la demanda.", visualizationType: "dispersión", businessValue: "Estrategias de precios optimizadas." }
        ]
      }
    ],
    technicalImplementation: {
      approach: "Combinamos análisis de datos estructurados y no estructurados para obtener insights sobre el comportamiento del viajero.",
      technologies: ["Python", "NLTK", "Prophet", "PostgreSQL", "Tableau"],
      openSourceAlternatives: [
        { name: "Metabase", description: "Plataforma de business intelligence de código abierto.", url: "https://www.metabase.com/" },
        { name: "Airflow", description: "Plataforma para automatizar flujos de trabajo de datos.", url: "https://airflow.apache.org/" }
      ],
      implementationSteps: [
        { name: "Integración de Fuentes de Datos", description: "Conexión con sistemas de reservas, web y redes sociales." },
        { name: "Limpieza y Transformación", description: "Preprocesamiento de datos textuales y numéricos." },
        { name: "Desarrollo de Modelos", description: "Creación de modelos de NLP y predicción." },
        { name: "Implementación de Dashboards", description: "Desarrollo de interfaces visuales para resultados." }
      ],
      challenges: [
        "Datos dispersos en múltiples sistemas.",
        "Estacionalidad marcada en la industria turística.",
        "Factores externos impredecibles (clima, eventos sociales, etc.).",
        "Privacidad de datos de clientes internacionales (GDPR)."
      ]
    }
  }
];

// Function to get analysis flows by industry
export const getAnalysisFlowsByIndustry = (industry: string): AnalysisFlow[] => {
  // For multi-sector flows, include them for any of their applicable industries
  return analysisFlows.filter(flow => 
    flow.industry === industry || 
    (flow.applicableIndustries && flow.applicableIndustries.includes(industry))
  );
};

// Function to get analysis flow by ID
export const getAnalysisFlowById = (id: string): AnalysisFlow | undefined => {
  return analysisFlows.find(flow => flow.id === id);
};

export default analysisFlows;
