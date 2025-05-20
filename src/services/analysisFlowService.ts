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
    id: "educacion-flow-1",
    name: "Análisis de Desempeño Estudiantil",
    description: "Identifica factores clave que influyen en el rendimiento académico y diseña estrategias de intervención personalizadas.",
    industry: "educacion",
    applicableIndustries: ["educacion", "ed-tech"],
    businessGoal: "Mejorar los resultados académicos y reducir las tasas de deserción escolar.",
    totalEstimatedTime: "3 semanas",
    recommendedTools: ["Python", "Tableau", "Power BI", "R"],
    recommendedFor: [
      { title: "Directores Académicos", reason: "Para implementar programas educativos basados en evidencia." },
      { title: "Coordinadores Pedagógicos", reason: "Para personalizar intervenciones educativas según necesidades específicas." }
    ],
    steps: [
      {
        id: "edu-step1",
        name: "Análisis de Datos Históricos",
        description: "Recopilación y análisis de datos académicos y demográficos de estudiantes.",
        prerequisiteSteps: [],
        estimatedProcessingTime: "1 semana",
        difficulty: "básico",
        modelType: "Análisis Exploratorio",
        howItWorks: "Aplicación de estadística descriptiva para identificar patrones y tendencias en datos educativos.",
        benefits: ["Identificación de patrones de rendimiento", "Detección de factores de riesgo temprano"],
        inputFields: [
          { name: "Registros Académicos", description: "Calificaciones y asistencia de estudiantes.", example: "CSV con historial académico", required: true, type: "text" },
          { name: "Datos Demográficos", description: "Información sociodemográfica de estudiantes.", example: "Edad, género, ubicación", required: true, type: "text" }
        ],
        outputInsights: [
          { name: "Perfiles de Rendimiento", description: "Segmentación de estudiantes por patrones de desempeño.", visualizationType: "clusters", businessValue: "Identificación de grupos que requieren diferentes estrategias pedagógicas." },
          { name: "Factores Predictivos", description: "Variables con mayor correlación al rendimiento académico.", visualizationType: "barras", businessValue: "Priorización de factores para intervención educativa." }
        ]
      },
      {
        id: "edu-step2",
        name: "Modelado Predictivo de Rendimiento",
        description: "Desarrollo de modelos para predecir el rendimiento académico y riesgo de abandono.",
        prerequisiteSteps: ["edu-step1"],
        estimatedProcessingTime: "1 semana",
        difficulty: "avanzado",
        modelType: "Random Forest",
        howItWorks: "Algoritmo de aprendizaje supervisado que combina múltiples árboles de decisión para predecir resultados.",
        benefits: ["Predicción temprana de estudiantes en riesgo", "Alta precisión en identificación de factores clave"],
        inputFields: [
          { name: "Datos Procesados", description: "Datos del paso anterior con features seleccionadas.", example: "Dataset pre-procesado", required: true, type: "text" }
        ],
        outputInsights: [
          { name: "Probabilidad de Éxito", description: "Estimación de probabilidad de éxito académico por estudiante.", visualizationType: "heatmap", businessValue: "Priorización de recursos de apoyo académico." },
          { name: "Factores de Influencia", description: "Variables con mayor impacto en el rendimiento.", visualizationType: "importancia", businessValue: "Diseño de programas educativos basados en evidencia." }
        ]
      },
      {
        id: "edu-step3",
        name: "Diseño de Intervenciones Personalizadas",
        description: "Creación de estrategias de intervención basadas en los perfiles identificados.",
        prerequisiteSteps: ["edu-step2"],
        estimatedProcessingTime: "1 semana",
        difficulty: "intermedio",
        modelType: "Sistemas de Recomendación",
        howItWorks: "Algoritmo de recomendación que asigna recursos educativos según perfiles y necesidades.",
        benefits: ["Personalización a escala", "Optimización de recursos educativos"],
        inputFields: [
          { name: "Perfiles de Estudiantes", description: "Segmentos identificados en pasos anteriores.", example: "Grupos de estudiantes", required: true, type: "text" },
          { name: "Recursos Disponibles", description: "Catálogo de recursos y programas educativos.", example: "Lista de programas de apoyo", required: true, type: "text" }
        ],
        outputInsights: [
          { name: "Plan de Intervención", description: "Asignación óptima de recursos por perfil de estudiante.", visualizationType: "matriz", businessValue: "Maximización del impacto de programas educativos." },
          { name: "Calendario de Seguimiento", description: "Cronograma de intervenciones y puntos de evaluación.", visualizationType: "gantt", businessValue: "Implementación sistemática de estrategias educativas." }
        ]
      }
    ],
    technicalImplementation: {
      approach: "Combinamos análisis estadístico tradicional con técnicas de aprendizaje automático para predicciones precisas y personalizadas.",
      technologies: ["Python", "Scikit-learn", "Pandas", "Flask", "PostgreSQL"],
      openSourceAlternatives: [
        { name: "RapidMiner", description: "Plataforma de análisis predictivo con interfaz visual.", url: "https://rapidminer.com/" },
        { name: "KNIME", description: "Software de análisis de datos sin código.", url: "https://www.knime.com/" }
      ],
      implementationSteps: [
        { name: "Integración de Datos", description: "Conexión con sistemas de gestión académica existentes." },
        { name: "Ingeniería de Features", description: "Creación de variables derivadas con valor predictivo." },
        { name: "Entrenamiento de Modelos", description: "Desarrollo y validación de modelos predictivos." },
        { name: "Implementación en Dashboard", description: "Creación de interfaces para visualización y seguimiento." }
      ],
      challenges: [
        "Privacidad y protección de datos de estudiantes menores.",
        "Variabilidad en la calidad y formato de datos entre instituciones.",
        "Resistencia al cambio en entornos educativos tradicionales."
      ]
    },
    success_stories: [
      {
        company: "Universidad Nacional de Innovación Educativa",
        industry: "educacion",
        challenge: "Alta tasa de deserción en primer año de carreras STEM.",
        solution: "Implementación de sistema predictivo para identificación temprana de estudiantes en riesgo.",
        results: [
          "Reducción del 28% en tasa de deserción en primer año.",
          "Aumento del 15% en rendimiento promedio de estudiantes con intervención temprana.",
          "Optimización de recursos de tutoría con asignación basada en datos."
        ],
        testimonial: {
          quote: "El sistema nos permitió intervenir de manera preventiva y no reactiva, transformando nuestra forma de brindar apoyo estudiantil.",
          author: "Dra. María Sánchez",
          position: "Directora de Innovación Educativa"
        }
      }
    ]
  },
  {
    id: "educacion-flow-2",
    name: "Optimización de Contenidos Educativos",
    description: "Analiza la efectividad de materiales didácticos y optimiza la secuencia de aprendizaje para maximizar la retención y aplicación de conocimientos.",
    industry: "educacion",
    applicableIndustries: ["educacion", "ed-tech", "capacitacion-corporativa"],
    businessGoal: "Maximizar la efectividad del aprendizaje y optimizar recursos educativos.",
    totalEstimatedTime: "4 semanas",
    recommendedTools: ["Python", "Tableau", "LMS Analytics", "R"],
    recommendedFor: [
      { title: "Diseñadores Instruccionales", reason: "Para crear secuencias de aprendizaje optimizadas basadas en datos." },
      { title: "Directores de E-Learning", reason: "Para maximizar la efectividad de plataformas educativas digitales." }
    ],
    steps: [
      {
        id: "edu-content-step1",
        name: "Análisis de Interacción con Contenidos",
        description: "Evaluación de patrones de interacción de estudiantes con materiales educativos.",
        prerequisiteSteps: [],
        estimatedProcessingTime: "1 semana",
        difficulty: "intermedio",
        modelType: "Análisis de Comportamiento",
        howItWorks: "Extracción y análisis de datos de interacción de plataformas de aprendizaje (LMS).",
        benefits: ["Identificación de contenidos más efectivos", "Detección de puntos de abandono"],
        inputFields: [
          { name: "Logs de Plataforma", description: "Registros de actividad en plataformas educativas.", example: "Logs de Moodle o Canvas", required: true, type: "text" },
          { name: "Estructura de Contenidos", description: "Mapa de contenidos y objetivos de aprendizaje.", example: "Syllabus estructurado", required: true, type: "text" }
        ],
        outputInsights: [
          { name: "Mapa de Calor de Engagement", description: "Visualización de niveles de interacción por contenido.", visualizationType: "heatmap", businessValue: "Identificación de contenidos que requieren optimización." },
          { name: "Patrones de Navegación", description: "Rutas comunes seguidas por estudiantes en la plataforma.", visualizationType: "grafo", businessValue: "Optimización de la estructura de cursos." }
        ]
      },
      {
        id: "edu-content-step2",
        name: "Análisis de Efectividad de Aprendizaje",
        description: "Evaluación de la correlación entre interacción con contenidos y resultados de aprendizaje.",
        prerequisiteSteps: ["edu-content-step1"],
        estimatedProcessingTime: "1 semana",
        difficulty: "avanzado",
        modelType: "Análisis Causal",
        howItWorks: "Aplicación de modelos estadísticos para identificar relaciones causales entre interacción y aprendizaje.",
        benefits: ["Validación de efectividad de contenidos", "Optimización basada en resultados"],
        inputFields: [
          { name: "Datos de Interacción", description: "Análisis del paso anterior.", example: "Dataset procesado", required: true, type: "text" },
          { name: "Resultados de Evaluaciones", description: "Calificaciones y completitud de objetivos.", example: "Registros de evaluaciones", required: true, type: "text" }
        ],
        outputInsights: [
          { name: "Índice de Efectividad", description: "Puntuación de efectividad por contenido educativo.", visualizationType: "barras", businessValue: "Priorización de contenidos para revisión y mejora." },
          { name: "Factores de Éxito", description: "Características de contenidos con mayor efectividad.", visualizationType: "radar", businessValue: "Guía para desarrollo de nuevos materiales." }
        ]
      },
      {
        id: "edu-content-step3",
        name: "Personalización de Rutas de Aprendizaje",
        description: "Desarrollo de algoritmos para personalizar secuencias de contenido según perfil de aprendizaje.",
        prerequisiteSteps: ["edu-content-step2"],
        estimatedProcessingTime: "2 semanas",
        difficulty: "avanzado",
        modelType: "Aprendizaje por Refuerzo",
        howItWorks: "Algoritmo adaptativo que optimiza la secuencia de presentación de contenidos según retroalimentación.",
        benefits: ["Personalización a escala", "Mejora continua de la experiencia de aprendizaje"],
        inputFields: [
          { name: "Perfiles de Aprendizaje", description: "Estilos y preferencias de aprendizaje.", example: "Taxonomía de perfiles", required: true, type: "text" },
          { name: "Contenidos Evaluados", description: "Contenidos con índices de efectividad.", example: "Biblioteca de contenidos", required: true, type: "text" }
        ],
        outputInsights: [
          { name: "Algoritmo de Secuenciación", description: "Sistema que determina el orden óptimo de contenidos por perfil.", visualizationType: "algoritmo", businessValue: "Maximización de resultados de aprendizaje." },
          { name: "Recomendaciones de Mejora", description: "Sugerencias específicas para optimizar contenidos existentes.", visualizationType: "tabla", businessValue: "Guía práctica para revisión de materiales." }
        ]
      }
    ],
    technicalImplementation: {
      approach: "Utilizamos técnicas de learning analytics y algoritmos adaptativos para optimizar la experiencia educativa.",
      technologies: ["Python", "TensorFlow", "Neo4j", "D3.js", "API LMS"],
      openSourceAlternatives: [
        { name: "Learning Locker", description: "LRS (Learning Record Store) de código abierto.", url: "https://learninglocker.net/" },
        { name: "H5P", description: "Framework para crear contenido interactivo.", url: "https://h5p.org/" }
      ],
      implementationSteps: [
        { name: "Implementación de Tracking", description: "Integración con xAPI o sistemas de seguimiento de LMS." },
        { name: "Modelado de Contenidos", description: "Estructuración de contenidos y objetivos de aprendizaje." },
        { name: "Desarrollo Algorítmico", description: "Implementación de modelos de secuenciación adaptativa." },
        { name: "Integración con LMS", description: "Conexión con plataformas educativas existentes." }
      ],
      challenges: [
        "Diversidad de plataformas y formatos de contenido educativo.",
        "Necesidad de volumen suficiente de datos para entrenar algoritmos adaptativos.",
        "Balance entre personalización y cohesión curricular."
      ]
    }
  },
  {
    id: "tecnologia-flow-1",
    name: "Análisis de Comportamiento de Usuarios Digitales",
    description: "Comprende patrones de comportamiento de usuarios en plataformas digitales para optimizar experiencias y maximizar conversiones.",
    industry: "tecnologia",
    applicableIndustries: ["tecnologia", "e-commerce", "saas", "medios-digitales"],
    businessGoal: "Aumentar engagement, retención y conversión de usuarios en plataformas digitales.",
    totalEstimatedTime: "3 semanas",
    recommendedTools: ["Python", "Google Analytics", "Mixpanel", "Tableau"],
    recommendedFor: [
      { title: "Product Managers", reason: "Para tomar decisiones de producto basadas en comportamiento real de usuarios." },
      { title: "UX Designers", reason: "Para optimizar flujos de usuarios basados en datos de interacción." }
    ],
    steps: [
      {
        id: "tech-step1",
        name: "Segmentación de Usuarios",
        description: "Identificación de patrones de comportamiento y creación de segmentos de usuarios.",
        prerequisiteSteps: [],
        estimatedProcessingTime: "1 semana",
        difficulty: "intermedio",
        modelType: "Clustering",
        howItWorks: "Aplicación de algoritmos de agrupamiento para identificar segmentos naturales de usuarios.",
        benefits: ["Personalización de experiencias", "Estrategias diferenciadas por segmento"],
        inputFields: [
          { name: "Datos de Comportamiento", description: "Registros de interacción de usuarios.", example: "Eventos de analítica web", required: true, type: "text" },
          { name: "Datos Demográficos", description: "Información demográfica de usuarios.", example: "Edad, ubicación, dispositivo", required: false, type: "text" }
        ],
        outputInsights: [
          { name: "Perfiles de Usuario", description: "Segmentos de usuarios con comportamientos similares.", visualizationType: "clusters", businessValue: "Estrategias personalizadas por segmento." },
          { name: "Características Distintivas", description: "Atributos que definen cada segmento de usuario.", visualizationType: "radar", businessValue: "Comprensión profunda de cada segmento." }
        ]
      },
      {
        id: "tech-step2",
        name: "Análisis de Funnel de Conversión",
        description: "Evaluación detallada de la progresión de usuarios a través del funnel de conversión.",
        prerequisiteSteps: ["tech-step1"],
        estimatedProcessingTime: "1 semana",
        difficulty: "intermedio",
        modelType: "Análisis Secuencial",
        howItWorks: "Modelado de secuencias de eventos para identificar patrones y puntos de abandono.",
        benefits: ["Identificación de cuellos de botella", "Optimización de tasas de conversión"],
        inputFields: [
          { name: "Eventos de Usuario", description: "Secuencias de acciones por usuario.", example: "Logs de eventos secuenciales", required: true, type: "text" },
          { name: "Definición de Conversión", description: "Eventos considerados como conversión.", example: "Compra, registro, etc.", required: true, type: "text" }
        ],
        outputInsights: [
          { name: "Visualización de Funnel", description: "Representación visual de tasas de conversión por etapa.", visualizationType: "funnel", businessValue: "Identificación de oportunidades de optimización." },
          { name: "Análisis de Abandono", description: "Caracterización de puntos de abandono por segmento.", visualizationType: "heatmap", businessValue: "Priorización de mejoras en UX." }
        ]
      },
      {
        id: "tech-step3",
        name: "Modelado Predictivo de Comportamiento",
        description: "Desarrollo de modelos para predecir acciones futuras de usuarios.",
        prerequisiteSteps: ["tech-step2"],
        estimatedProcessingTime: "1 semana",
        difficulty: "avanzado",
        modelType: "Modelos de Secuencia",
        howItWorks: "Aplicación de algoritmos predictivos como cadenas de Markov o redes neuronales recurrentes.",
        benefits: ["Anticipación de comportamiento", "Intervenciones proactivas"],
        inputFields: [
          { name: "Histórico de Comportamiento", description: "Secuencias históricas de acciones por usuario.", example: "Series temporales de eventos", required: true, type: "text" },
          { name: "Segmentos de Usuario", description: "Categorización de usuarios del paso anterior.", example: "Etiquetas de segmento", required: true, type: "text" }
        ],
        outputInsights: [
          { name: "Probabilidad de Conversión", description: "Estimación de probabilidad de conversión por usuario.", visualizationType: "tabla", businessValue: "Priorización de esfuerzos de marketing." },
          { name: "Siguientes Acciones Probables", description: "Predicción de secuencias de acciones más probables.", visualizationType: "grafo", businessValue: "Diseño proactivo de experiencias." }
        ]
      }
    ],
    technicalImplementation: {
      approach: "Combinamos análisis descriptivo, diagnóstico, predictivo y prescriptivo para una comprensión completa del comportamiento de usuarios.",
      technologies: ["Python", "Scikit-learn", "TensorFlow", "Neo4j", "Kafka"],
      openSourceAlternatives: [
        { name: "Matomo", description: "Plataforma de análisis web de código abierto.", url: "https://matomo.org/" },
        { name: "Apache Spark MLlib", description: "Biblioteca de machine learning para procesamiento distribuido.", url: "https://spark.apache.org/mllib/" }
      ],
      implementationSteps: [
        { name: "Instrumentación de Tracking", description: "Implementación de seguimiento de eventos de usuario." },
        { name: "ETL de Datos", description: "Procesamiento y estructuración de datos de comportamiento." },
        { name: "Modelado Estadístico", description: "Desarrollo de modelos predictivos de comportamiento." },
        { name: "Visualización Interactiva", description: "Creación de dashboards para análisis continuo." }
      ],
      challenges: [
        "Privacidad y cumplimiento de regulaciones (GDPR, CCPA).",
        "Integración de datos de múltiples fuentes y plataformas.",
        "Balance entre personalización y protección de datos de usuarios."
      ]
    },
    success_stories: [
      {
        company: "TechFlow SaaS",
        industry: "tecnologia",
        challenge: "Alta tasa de abandono durante onboarding de nueva plataforma SaaS.",
        solution: "Implementación de análisis secuencial y optimización de funnel basada en datos.",
        results: [
          "Incremento del 35% en tasa de activación de nuevos usuarios.",
          "Reducción del 28% en tiempo de onboarding.",
          "Aumento del 22% en retención a 30 días."
        ],
        testimonial: {
          quote: "El análisis de comportamiento transformó nuestra comprensión de los usuarios y nos permitió crear una experiencia verdaderamente centrada en sus necesidades.",
          author: "Carlos Méndez",
          position: "CPO de TechFlow"
        }
      }
    ]
  },
  {
    id: "tecnologia-flow-2",
    name: "Detección de Anomalías en Sistemas TI",
    description: "Identifica y previene problemas operativos mediante análisis avanzado de datos de infraestructura y aplicaciones.",
    industry: "tecnologia",
    applicableIndustries: ["tecnologia", "telecomunicaciones", "fintech", "ciberseguridad"],
    businessGoal: "Minimizar tiempo de inactividad y optimizar el rendimiento de sistemas críticos.",
    totalEstimatedTime: "4 semanas",
    recommendedTools: ["Python", "Elasticsearch", "Prometheus", "Grafana"],
    recommendedFor: [
      { title: "DevOps Engineers", reason: "Para implementar monitoreo predictivo y detección anticipada de fallos." },
      { title: "CIOs/CTOs", reason: "Para reducir riesgos operativos y optimizar inversión en infraestructura." }
    ],
    steps: [
      {
        id: "tech-anomaly-step1",
        name: "Integración y Normalización de Datos",
        description: "Recopilación y estandarización de datos de múltiples sistemas y fuentes.",
        prerequisiteSteps: [],
        estimatedProcessingTime: "1 semana",
        difficulty: "intermedio",
        modelType: "ETL Especializado",
        howItWorks: "Extracción, transformación y carga de datos heterogéneos de logs, métricas y eventos.",
        benefits: ["Visión unificada de sistemas", "Base para análisis complejo"],
        inputFields: [
          { name: "Logs de Aplicación", description: "Registros de eventos de aplicaciones.", example: "Logs de servidores web", required: true, type: "text" },
          { name: "Métricas de Sistema", description: "Indicadores de rendimiento de infraestructura.", example: "CPU, memoria, latencia", required: true, type: "numeric" },
          { name: "Eventos de Seguridad", description: "Alertas y eventos de seguridad.", example: "Logs de firewall", required: false, type: "text" }
        ],
        outputInsights: [
          { name: "Dataset Unificado", description: "Base de datos centralizada de métricas y eventos.", visualizationType: "tabla", businessValue: "Fundamento para detección de anomalías." },
          { name: "Líneas Base", description: "Comportamiento normal establecido para cada métrica.", visualizationType: "líneas", businessValue: "Referencia para identificar desviaciones." }
        ]
      },
      {
        id: "tech-anomaly-step2",
        name: "Modelado de Comportamiento Normal",
        description: "Establecimiento de patrones de comportamiento normal para cada sistema y componente.",
        prerequisiteSteps: ["tech-anomaly-step1"],
        estimatedProcessingTime: "1 semana",
        difficulty: "avanzado",
        modelType: "Series Temporales",
        howItWorks: "Aplicación de algoritmos estadísticos y machine learning para modelar comportamiento típico.",
        benefits: ["Detección precisa de anomalías", "Reducción de falsos positivos"],
        inputFields: [
          { name: "Datos Históricos", description: "Métricas y logs de periodo estable.", example: "Dataset de 3 meses", required: true, type: "text" },
          { name: "Calendario de Eventos", description: "Registro de mantenimientos y eventos planificados.", example: "Calendario de despliegues", required: false, type: "date" }
        ],
        outputInsights: [
          { name: "Modelos de Normalidad", description: "Representación matemática de comportamiento normal.", visualizationType: "modelo", businessValue: "Base para detección de anomalías." },
          { name: "Patrones Temporales", description: "Identificación de ciclos y estacionalidades.", visualizationType: "calendario", businessValue: "Ajuste de expectativas según periodos." }
        ]
      },
      {
        id: "tech-anomaly-step3",
        name: "Detección de Anomalías en Tiempo Real",
        description: "Implementación de sistema de monitoreo continuo para identificar desviaciones.",
        prerequisiteSteps: ["tech-anomaly-step2"],
        estimatedProcessingTime: "1 semana",
        difficulty: "avanzado",
        modelType: "Detección de Anomalías",
        howItWorks: "Comparación continua de datos en tiempo real con modelos de comportamiento normal.",
        benefits: ["Alerta temprana de problemas", "Reducción de tiempo de respuesta"],
        inputFields: [
          { name: "Datos en Tiempo Real", description: "Flujo continuo de métricas y eventos.", example: "Stream de telemetría", required: true, type: "text" },
          { name: "Modelos de Normalidad", description: "Modelos del paso anterior.", example: "Modelos entrenados", required: true, type: "text" }
        ],
        outputInsights: [
          { name: "Alertas de Anomalías", description: "Notificaciones en tiempo real de comportamientos inusuales.", visualizationType: "alertas", businessValue: "Respuesta proactiva a incidentes." },
          { name: "Puntuación de Anomalía", description: "Cuantificación de la desviación respecto a lo normal.", visualizationType: "gauge", businessValue: "Priorización de respuesta a incidentes." }
        ]
      },
      {
        id: "tech-anomaly-step4",
        name: "Análisis de Causa Raíz Automatizado",
        description: "Desarrollo de sistema para identificar causas subyacentes de anomalías detectadas.",
        prerequisiteSteps: ["tech-anomaly-step3"],
        estimatedProcessingTime: "1 semana",
        difficulty: "avanzado",
        modelType: "Análisis Causal",
        howItWorks: "Aplicación de técnicas de correlación y causalidad para identificar fuentes de problemas.",
        benefits: ["Resolución más rápida", "Prevención de problemas recurrentes"],
        inputFields: [
          { name: "Registro de Anomalías", description: "Histórico de anomalías detectadas.", example: "Dataset de incidentes", required: true, type: "text" },
          { name: "Gráfico de Dependencias", description: "Mapa de relaciones entre componentes.", example: "Diagrama de arquitectura", required: true, type: "text" }
        ],
        outputInsights: [
          { name: "Análisis de Causas", description: "Identificación de factores causales de anomalías.", visualizationType: "grafo", businessValue: "Resolución definitiva de problemas." },
          { name: "Recomendaciones Preventivas", description: "Sugerencias para evitar problemas similares.", visualizationType: "lista", businessValue: "Mejora continua de la fiabilidad." }
        ]
      }
    ],
    technicalImplementation: {
      approach: "Implementamos una arquitectura de observabilidad avanzada con capacidades de machine learning para detección proactiva.",
      technologies: ["Python", "Kafka", "Elasticsearch", "TensorFlow", "Docker"],
      openSourceAlternatives: [
        { name: "Prometheus + Grafana", description: "Stack de monitorización de código abierto.", url: "https://prometheus.io/" },
        { name: "OpenTelemetry", description: "Framework para instrumentación y telemetría.", url: "https://opentelemetry.io/" }
      ],
      implementationSteps: [
        { name: "Instrumentación", description: "Implementación de agentes y colectores de datos." },
        { name: "Pipeline de Datos", description: "Desarrollo de flujo de procesamiento de datos en tiempo real." },
        { name: "Entrenamiento de Modelos", description: "Creación de modelos de detección de anomalías." },
        { name: "Integración con Sistemas", description: "Conexión con plataformas de monitoreo y alertas existentes." }
      ],
      challenges: [
        "Volumen y velocidad de datos en entornos de gran escala.",
        "Balance entre sensibilidad de detección y tasa de falsos positivos.",
        "Necesidad de adaptación continua a entornos cambiantes."
      ]
    }
  },
  {
    id: "agricultura-flow-1",
    name: "Agricultura de Precisión y Optimización de Cultivos",
    description: "Maximiza el rendimiento de cultivos y optimiza el uso de recursos mediante análisis de datos agronómicos y ambientales.",
    industry: "agricultura",
    applicableIndustries: ["agricultura", "agroindustria", "servicios-ambientales"],
    businessGoal: "Aumentar rendimiento de cultivos y reducir costos operativos mediante decisiones basadas en datos.",
    totalEstimatedTime: "4 semanas",
    recommendedTools: ["Python", "QGIS", "Sensores IoT", "Imágenes Satelitales"],
    recommendedFor: [
      { title: "Gerentes Agrícolas", reason: "Para optimizar la gestión de cultivos y recursos." },
      { title: "Consultores Agronómicos", reason: "Para ofrecer recomendaciones específicas basadas en datos." }
    ],
    steps: [
      {
        id: "agro-step1",
        name: "Análisis de Suelos y Microclimas",
        description: "Evaluación detallada de características del suelo y condiciones microclimáticas.",
        prerequisiteSteps: [],
        estimatedProcessingTime: "1 semana",
        difficulty: "intermedio",
        modelType: "Análisis Espacial",
        howItWorks: "Integración de datos geoespaciales, muestras de suelo y datos de estaciones meteorológicas.",
        benefits: ["Zonificación precisa de terrenos", "Identificación de áreas óptimas para cultivos específicos"],
        inputFields: [
          { name: "Análisis de Suelos", description: "Resultados de muestras de suelo.", example: "CSV con datos de nutrientes", required: true, type: "text" },
          { name: "Datos Meteorológicos", description: "Registros de temperatura, precipitación, etc.", example: "Serie temporal climatológica", required: true, type: "numeric" },
          { name: "Mapas Topográficos", description: "Información sobre elevación y pendientes.", example: "Archivos GIS", required: false, type: "text" }
        ],
        outputInsights: [
          { name: "Mapa de Variabilidad", description: "Visualización espacial de características del terreno.", visualizationType: "mapa", businessValue: "Fundamento para manejo diferenciado por zonas." },
          { name: "Perfiles de Suelo", description: "Caracterización de zonas por composición y propiedades.", visualizationType: "clusters", businessValue: "Planificación optimizada de cultivos." }
        ]
      },
      {
        id: "agro-step2",
        name: "Modelado Predictivo de Rendimiento",
        description: "Desarrollo de modelos para predecir rendimiento de cultivos bajo diferentes escenarios.",
        prerequisiteSteps: ["agro-step1"],
        estimatedProcessingTime: "2 semanas",
        difficulty: "avanzado",
        modelType: "Regresión Avanzada",
        howItWorks: "Aplicación de algoritmos de machine learning que incorporan variables ambientales, agronómicas e históricas.",
        benefits: ["Predicciones precisas de rendimiento", "Evaluación de diferentes estrategias de manejo"],
        inputFields: [
          { name: "Datos Históricos", description: "Rendimientos de cultivos anteriores.", example: "Registros de producción", required: true, type: "numeric" },
          { name: "Datos Agronómicos", description: "Información sobre variedades, fertilización, etc.", example: "Registros de manejo", required: true, type: "text" },
          { name: "Datos Ambientales", description: "Condiciones climáticas históricas.", example: "Dataset climatológico", required: true, type: "numeric" }
        ],
        outputInsights: [
          { name: "Predicción de Rendimiento", description: "Estimación de producción por área.", visualizationType: "mapa", businessValue: "Planificación financiera y logística precisa." },
          { name: "Factores de Influencia", description: "Variables con mayor impacto en el rendimiento.", visualizationType: "barras", businessValue: "Priorización de inversiones agrícolas." }
        ]
      },
      {
        id: "agro-step3",
        name: "Optimización de Recursos",
        description: "Desarrollo de recomendaciones específicas para optimización de insumos agrícolas.",
        prerequisiteSteps: ["agro-step2"],
        estimatedProcessingTime: "1 semana",
        difficulty: "intermedio",
        modelType: "Optimización",
        howItWorks: "Aplicación de algoritmos de optimización para maximizar rendimiento y minimizar costos.",
        benefits: ["Reducción de costos de insumos", "Minimización de impacto ambiental"],
        inputFields: [
          { name: "Modelo de Rendimiento", description: "Modelo predictivo del paso anterior.", example: "Modelo calibrado", required: true, type: "text" },
          { name: "Costos de Insumos", description: "Precios de fertilizantes, semillas, etc.", example: "Lista de precios", required: true, type: "numeric" },
          { name: "Restricciones", description: "Limitaciones operativas o regulatorias.", example: "Restricciones de uso de agua", required: false, type: "text" }
        ],
        outputInsights: [
          { name: "Plan de Fertilización", description: "Recomendaciones específicas por zona.", visualizationType: "mapa", businessValue: "Optimización de costos y resultados." },
          { name: "Calendario de Riego", description: "Programación óptima de irrigación.", visualizationType: "calendario", businessValue: "Uso eficiente del agua." }
        ]
      }
    ],
    technicalImplementation: {
      approach: "Combinamos datos de múltiples fuentes con modelos agronómicos y algoritmos de machine learning para recomendaciones específicas.",
      technologies: ["Python", "R", "TensorFlow", "QGIS", "IoT", "Sensores Remotos"],
      openSourceAlternatives: [
        { name: "QGIS", description: "Sistema de Información Geográfica de código abierto.", url: "https://qgis.org/" },
        { name: "R", description: "Entorno para análisis estadístico y gráficos.", url: "https://www.r-project.org/" }
      ],
      implementationSteps: [
        { name: "Recolección de Datos", description: "Implementación de sensores y protocolos de muestreo." },
        { name: "Procesamiento Geoespacial", description: "Integración y análisis de datos espacialmente explícitos." },
        { name: "Modelado Agronómico", description: "Desarrollo de modelos específicos para cultivos locales." },
        { name: "Implementación de Campo", description: "Traducción de recomendaciones a acciones operativas." }
      ],
      challenges: [
        "Variabilidad espacial y temporal significativa en condiciones agrícolas.",
        "Integración de conocimiento agronómico tradicional con análisis de datos.",
        "Necesidad de sistemas robustos para entornos rurales con conectividad limitada."
      ]
    },
    success_stories: [
      {
        company: "Cooperativa Agrícola El Progreso",
        industry: "agricultura",
        challenge: "Rendimientos irregulares y altos costos de fertilizantes en 2,000 hectáreas de maíz.",
        solution: "Implementación de sistema de agricultura de precisión con mapeo detallado y fertilización variable.",
        results: [
          "Incremento del 18% en rendimiento promedio.",
          "Reducción del 25% en uso de fertilizantes.",
          "ROI de 3.2:1 en el primer año de implementación."
        ],
        testimonial: {
          quote: "El análisis de datos transformó nuestra forma de trabajar la tierra. Ahora tomamos decisiones con precisión científica sin perder el conocimiento tradicional.",
          author: "Roberto Campos",
          position: "Director de Producción"
        }
      }
    ]
  },
  {
    id: "energia-flow-1",
    name: "Optimización de Redes Eléctricas Inteligentes",
    description: "Maximiza la eficiencia y confiabilidad de redes eléctricas mediante análisis avanzado y predicción de demanda.",
    industry: "energia",
    applicableIndustries: ["energia", "utilities", "infraestructura", "smart-cities"],
    businessGoal: "Reducir pérdidas de distribución, optimizar operaciones y mejorar la integración de energías renovables.",
    totalEstimatedTime: "5 semanas",
    recommendedTools: ["Python", "R", "TensorFlow", "SCADA", "GIS"],
    recommendedFor: [
      { title: "Gerentes de Operaciones", reason: "Para optimizar la gestión de la red eléctrica." },
      { title: "Planificadores Energéticos", reason: "Para desarrollar estrategias basadas en predicciones precisas de demanda." }
    ],
    steps: [
      {
        id: "energy-step1",
        name: "Análisis de Patrones de Consumo",
        description: "Identificación de patrones temporales y espaciales en el consumo energético.",
        prerequisiteSteps: [],
        estimatedProcessingTime: "1 semana",
        difficulty: "intermedio",
        modelType: "Series Temporales",
        howItWorks: "Aplicación de algoritmos de descomposición y análisis espectral para identificar patrones.",
        benefits: ["Caracterización de perfiles de consumo", "Identificación de anomalías y oportunidades"],
        inputFields: [
          { name: "Datos de Medidores", description: "Registros de consumo por punto de medición.", example: "Serie temporal horaria", required: true, type: "numeric" },
          { name: "Datos Meteorológicos", description: "Temperatura, radiación solar, etc.", example: "Registros meteorológicos", required: true, type: "numeric" },
          { name: "Información Geoespacial", description: "Ubicación de puntos de consumo y activos.", example: "Coordenadas", required: false, type: "text" }
        ],
        outputInsights: [
          { name: "Perfiles de Carga", description: "Caracterización de patrones de consumo por segmento.", visualizationType: "curvas", businessValue: "Planificación operativa optimizada." },
          { name: "Mapa de Calor Temporal", description: "Visualización de patrones de consumo en el tiempo.", visualizationType: "heatmap", businessValue: "Identificación de patrones estacionales y horarios." }
        ]
      },
      {
        id: "energy-step2",
        name: "Predicción de Demanda a Múltiples Escalas",
        description: "Desarrollo de modelos predictivos para diferentes horizontes temporales y niveles de la red.",
        prerequisiteSteps: ["energy-step1"],
        estimatedProcessingTime: "2 semanas",
        difficulty: "avanzado",
        modelType: "Deep Learning",
        howItWorks: "Aplicación de redes neuronales recurrentes y convolucionales para modelar patrones complejos.",
        benefits: ["Predicciones precisas a múltiples horizontes", "Optimización de despacho y balance de carga"],
        inputFields: [
          { name: "Histórico de Demanda", description: "Datos de consumo procesados.", example: "Series temporales", required: true, type: "numeric" },
          { name: "Variables Exógenas", description: "Factores externos que influyen en la demanda.", example: "Clima, eventos, etc.", required: true, type: "text" },
          { name: "Topología de Red", description: "Estructura de la red eléctrica.", example: "Diagrama unifilar", required: false, type: "text" }
        ],
        outputInsights: [
          { name: "Pronóstico de Demanda", description: "Predicción de consumo a diferentes escalas temporales.", visualizationType: "líneas", businessValue: "Planificación operativa y estratégica precisa." },
          { name: "Intervalos de Confianza", description: "Estimación de incertidumbre en predicciones.", visualizationType: "banda", businessValue: "Gestión de riesgo operativo." }
        ]
      },
      {
        id: "energy-step3",
        name: "Detección de Pérdidas y Anomalías",
        description: "Identificación de pérdidas técnicas y no técnicas en la red eléctrica.",
        prerequisiteSteps: ["energy-step2"],
        estimatedProcessingTime: "1 semana",
        difficulty: "avanzado",
        modelType: "Detección de Anomalías",
        howItWorks: "Aplicación de algoritmos de balance energético y detección de outliers en los datos de consumo.",
        benefits: ["Reducción de pérdidas no técnicas", "Mantenimiento proactivo de activos"],
        inputFields: [
          { name: "Balances Energéticos", description: "Datos de inyección y consumo por sector.", example: "Dataset de flujos", required: true, type: "numeric" },
          { name: "Histórico de Fallos", description: "Registro de incidentes previos.", example: "Log de eventos", required: false, type: "text" }
        ],
        outputInsights: [
          { name: "Mapa de Pérdidas", description: "Visualización geoespacial de áreas con pérdidas elevadas.", visualizationType: "mapa", businessValue: "Priorización de intervenciones." },
          { name: "Alertas de Anomalías", description: "Identificación temprana de comportamientos inusuales.", visualizationType: "dashboard", businessValue: "Respuesta rápida a incidentes." }
        ]
      },
      {
        id: "energy-step4",
        name: "Optimización de Operaciones de Red",
        description: "Desarrollo de recomendaciones para optimizar la operación de la red eléctrica.",
        prerequisiteSteps: ["energy-step3"],
        estimatedProcessingTime: "1 semana",
        difficulty: "avanzado",
        modelType: "Optimización Multi-objetivo",
        howItWorks: "Aplicación de algoritmos de optimización considerando múltiples restricciones técnicas y económicas.",
        benefits: ["Reducción de costos operativos", "Mejora de confiabilidad de suministro"],
        inputFields: [
          { name: "Topología de Red", description: "Configuración actual de la red eléctrica.", example: "Modelo de red", required: true, type: "text" },
          { name: "Predicciones de Demanda", description: "Resultados del paso de predicción.", example: "Pronósticos", required: true, type: "numeric" },
          { name: "Restricciones Operativas", description: "Límites técnicos y regulatorios.", example: "Parámetros técnicos", required: true, type: "text" }
        ],
        outputInsights: [
          { name: "Plan de Operación Óptimo", description: "Recomendaciones para configuración de red.", visualizationType: "diagrama", businessValue: "Minimización de pérdidas técnicas." },
          { name: "Análisis de Contingencias", description: "Evaluación de escenarios ante eventos críticos.", visualizationType: "tabla", businessValue: "Aumento de resiliencia operativa." }
        ]
      }
    ],
    technicalImplementation: {
      approach: "Integramos datos de sistemas SCADA, medidores inteligentes y fuentes externas para una visión completa de la red eléctrica.",
      technologies: ["Python", "TensorFlow", "PyTorch", "PostgreSQL/PostGIS", "Apache Kafka", "Tableau"],
      openSourceAlternatives: [
        { name: "PyCaret", description: "Framework de AutoML para modelado rápido.", url: "https://pycaret.org/" },
        { name: "GridAPPS-D", description: "Plataforma para simulación y análisis de redes eléctricas.", url: "https://gridappsd.readthedocs.io/" }
      ],
      implementationSteps: [
        { name: "Integración de Datos", description: "Conexión con sistemas operativos y bases de datos existentes." },
        { name: "Procesamiento ETL", description: "Transformación y enriquecimiento de datos para análisis." },
        { name: "Desarrollo de Modelos", description: "Creación de modelos predictivos y prescriptivos." },
        { name: "Implementación en Sistemas", description: "Integración con sistemas de gestión y operación." }
      ],
      challenges: [
        "Integración de múltiples sistemas y formatos de datos heredados.",
        "Necesidad de algoritmos robustos para operar en tiempo real.",
        "Balance entre optimización económica y confiabilidad técnica."
      ]
    },
    success_stories: [
      {
        company: "Distribuidora Eléctrica Regional",
        industry: "energia",
        challenge: "Pérdidas técnicas y no técnicas del 18% en red de distribución urbana.",
        solution: "Implementación de sistema analítico para detección de anomalías y optimización de configuración de red.",
        results: [
          "Reducción de pérdidas totales al 11.5% en 18 meses.",
          "Mejora del 22% en indicadores de calidad de servicio (SAIDI/SAIFI).",
          "ROI de 2.8:1 considerando solo la reducción de pérdidas."
        ],
        testimonial: {
          quote: "La transformación digital de nuestra operación nos permitió no solo reducir pérdidas, sino mejorar significativamente la calidad del servicio a nuestros usuarios.",
          author: "Ing. Luisa Martínez",
          position: "Directora de Operaciones"
        }
      }
    ]
  },
  {
    id: "salud-flow-2",
    name: "Optimización de Operaciones Hospitalarias",
    description: "Mejora la eficiencia operativa hospitalaria y la experiencia del paciente mediante análisis avanzado de flujos de trabajo clínicos.",
    industry: "salud",
    applicableIndustries: ["salud", "hospitales", "centros-medicos"],
    businessGoal: "Reducir tiempos de espera, optimizar asignación de recursos y mejorar satisfacción de pacientes.",
    totalEstimatedTime: "4 semanas",
    recommendedTools: ["Python", "R", "Tableau", "HL7 FHIR", "Process Mining"],
    recommendedFor: [
      { title: "Directores de Operaciones", reason: "Para optimizar procesos hospitalarios y reducir costos operativos." },
      { title: "Jefes de Departamento", reason: "Para mejorar la planificación y asignación de recursos clínicos." }
    ],
    steps: [
      {
        id: "salud-ops-step1",
        name: "Análisis de Flujos de Pacientes",
        description: "Mapeo y caracterización de rutas de pacientes a través del sistema hospitalario.",
        prerequisiteSteps: [],
        estimatedProcessingTime: "1 semana",
        difficulty: "intermedio",
        modelType: "Process Mining",
        howItWorks: "Aplicación de técnicas de minería de procesos para descubrir flujos reales de pacientes.",
        benefits: ["Visualización clara de cuellos de botella", "Identificación de variaciones no planificadas"],
        inputFields: [
          { name: "Logs de Admisión", description: "Registros de ingresos y transferencias.", example: "Dataset de eventos", required: true, type: "text" },
          { name: "Tiempos de Espera", description: "Duración entre etapas de atención.", example: "Registros de tiempo", required: true, type: "numeric" },
          { name: "Datos de Ocupación", description: "Niveles de ocupación por unidad.", example: "Series temporales", required: false, type: "numeric" }
        ],
        outputInsights: [
          { name: "Mapa de Procesos", description: "Visualización de flujos reales de pacientes.", visualizationType: "grafo", businessValue: "Identificación de ineficiencias en procesos." },
          { name: "Análisis de Cuellos de Botella", description: "Identificación de puntos críticos de congestión.", visualizationType: "heatmap", businessValue: "Priorización de mejoras de proceso." }
        ]
      },
      {
        id: "salud-ops-step2",
        name: "Predicción de Demanda y Capacidad",
        description: "Desarrollo de modelos para predecir volumen de pacientes y necesidades de recursos.",
        prerequisiteSteps: ["salud-ops-step1"],
        estimatedProcessingTime: "1 semana",
        difficulty: "avanzado",
        modelType: "Series Temporales",
        howItWorks: "Aplicación de modelos predictivos para estimar flujos de pacientes con antelación.",
        benefits: ["Planificación proactiva de recursos", "Reducción de tiempos de espera"],
        inputFields: [
          { name: "Histórico de Ingresos", description: "Datos históricos de admisiones.", example: "Serie temporal diaria", required: true, type: "numeric" },
          { name: "Calendario", description: "Días festivos, eventos especiales, etc.", example: "Calendario anual", required: true, type: "date" },
          { name: "Datos Epidemiológicos", description: "Tendencias de enfermedades estacionales.", example: "Reportes sanitarios", required: false, type: "text" }
        ],
        outputInsights: [
          { name: "Pronóstico de Admisiones", description: "Predicción de volumen de pacientes por departamento.", visualizationType: "líneas", businessValue: "Planificación óptima de personal y recursos." },
          { name: "Patrones Estacionales", description: "Identificación de ciclos en la demanda de servicios.", visualizationType: "calendario", businessValue: "Preparación para períodos de alta demanda." }
        ]
      },
      {
        id: "salud-ops-step3",
        name: "Optimización de Programación",
        description: "Desarrollo de algoritmos para optimizar programación de personal y recursos.",
        prerequisiteSteps: ["salud-ops-step2"],
        estimatedProcessingTime: "2 semanas",
        difficulty: "avanzado",
        modelType: "Optimización Combinatoria",
        howItWorks: "Aplicación de algoritmos de optimización considerando múltiples restricciones y objetivos.",
        benefits: ["Reducción de costos de personal", "Mejora en niveles de servicio"],
        inputFields: [
          { name: "Predicciones de Demanda", description: "Resultados del paso anterior.", example: "Pronósticos", required: true, type: "numeric" },
          { name: "Restricciones de Personal", description: "Disponibilidad, habilidades, etc.", example: "Matriz de capacidades", required: true, type: "text" },
          { name: "Estándares de Servicio", description: "Niveles mínimos de atención requeridos.", example: "KPIs de servicio", required: true, type: "text" }
        ],
        outputInsights: [
          { name: "Programación Óptima", description: "Asignación eficiente de personal por turnos.", visualizationType: "tabla", businessValue: "Balance entre costos y calidad de servicio." },
          { name: "Simulación de Escenarios", description: "Evaluación de diferentes configuraciones operativas.", visualizationType: "dashboard", businessValue: "Toma de decisiones informada ante cambios." }
        ]
      }
    ],
    technicalImplementation: {
      approach: "Combinamos técnicas de ciencia de datos con conocimiento específico de operaciones hospitalarias para soluciones prácticas.",
      technologies: ["Python", "R", "Discrete Event Simulation", "ProM", "Tableau", "FHIR API"],
      openSourceAlternatives: [
        { name: "BUPAR", description: "Paquete R para minería de procesos.", url: "https://bupar.net/" },
        { name: "SimPy", description: "Framework Python para simulación de eventos discretos.", url: "https://simpy.readthedocs.io/" }
      ],
      implementationSteps: [
        { name: "Extracción de Logs", description: "Obtención de datos de eventos del HIS y otros sistemas." },
        { name: "Descubrimiento de Procesos", description: "Aplicación de algoritmos de minería de procesos." },
        { name: "Modelado Predictivo", description: "Desarrollo de modelos de demanda y capacidad." },
        { name: "Optimización", description: "Creación de algoritmos de programación y asignación." }
      ],
      challenges: [
        "Integración con sistemas hospitalarios heterogéneos.",
        "Necesidad de soluciones que respeten restricciones clínicas y regulatorias.",
        "Balance entre optimización matemática y factibilidad práctica en entorno clínico."
      ]
    },
    success_stories: [
      {
        company: "Hospital Metropolitano Central",
        industry: "salud",
        challenge: "Tiempos de espera prolongados en urgencias y servicios ambulatorios.",
        solution: "Implementación de sistema analítico para optimización de flujos de pacientes y programación de recursos.",
        results: [
          "Reducción del 35% en tiempos de espera en urgencias.",
          "Mejora del 22% en utilización de quirófanos.",
          "Incremento del 18% en satisfacción de pacientes."
        ],
        testimonial: {
          quote: "Transformamos nuestra operación gracias al análisis de datos. Ahora podemos anticiparnos a los picos de demanda y ajustar nuestros recursos de forma proactiva.",
          author: "Dr. Fernando Alonso",
          position: "Director Médico"
        }
      }
    ]
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
