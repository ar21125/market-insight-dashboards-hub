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
  // ... Add more analysis flows as needed
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
