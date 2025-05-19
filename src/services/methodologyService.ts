
import { toast } from "sonner";

// Types for methodology management
export interface MethodologyFlow {
  id: string;
  name: string;
  description: string;
  industry: string | null;
  modelTypes: string[];
  requiredInputs: string[];
  outputs: string[];
  visualizations: VisualizationType[];
  complementaryFlows: string[];
  businessValue: string;
  expertise: string;
  implementationTime: "short" | "medium" | "long";
  roi: "low" | "medium" | "high";
}

export interface VisualizationType {
  id: string;
  name: string;
  chartType: string;
  description: string;
  applicableMetrics: string[];
  dataRequirements: string[];
}

export interface MethodologyPackage {
  id: string;
  name: string;
  description: string;
  flows: string[];
  totalBusinessValue: string;
  totalImplementationTime: string;
  industry: string | null;
}

export type MethodologyDifficulty = "beginner" | "intermediate" | "advanced" | "expert";

// Methodology Service
export const methodologyService = {
  /**
   * Get all available methodology flows
   */
  getAllMethodologyFlows(): MethodologyFlow[] {
    return METHODOLOGY_FLOWS;
  },

  /**
   * Get methodology flows by industry
   */
  getMethodologyFlowsByIndustry(industry: string): MethodologyFlow[] {
    return METHODOLOGY_FLOWS.filter(
      flow => !flow.industry || flow.industry === industry
    );
  },

  /**
   * Get methodology flows compatible with specific model types
   */
  getCompatibleMethodologyFlows(modelType: string): MethodologyFlow[] {
    return METHODOLOGY_FLOWS.filter(
      flow => flow.modelTypes.some(type => 
        modelType.includes(type) || type === "any"
      )
    );
  },

  /**
   * Get recommended methodology packages
   */
  getRecommendedPackages(industry: string, modelType: string, difficulty: MethodologyDifficulty = "intermediate"): MethodologyPackage[] {
    // Filter flows by compatibility
    const compatibleFlows = this.getCompatibleMethodologyFlows(modelType);
    
    // Get pre-defined packages for the industry if available
    const industryPackages = METHODOLOGY_PACKAGES.filter(
      pkg => !pkg.industry || pkg.industry === industry
    );
    
    // Filter packages that contain compatible flows
    const feasiblePackages = industryPackages.filter(pkg =>
      pkg.flows.some(flowId => 
        compatibleFlows.some(flow => flow.id === flowId)
      )
    );
    
    // If no feasible packages found, generate a custom one
    if (feasiblePackages.length === 0) {
      return this.generateCustomPackage(industry, compatibleFlows);
    }
    
    return feasiblePackages;
  },

  /**
   * Get recommended visualizations for a model type and metrics
   */
  getRecommendedVisualizations(modelType: string, metrics: Record<string, any> | undefined): VisualizationType[] {
    // Get flows compatible with the model type
    const compatibleFlows = this.getCompatibleMethodologyFlows(modelType);
    
    // Extract all recommended visualizations from compatible flows
    const allVisualizations = compatibleFlows.flatMap(flow => flow.visualizations);

    // Default visualizations if no metrics available
    if (!metrics || Object.keys(metrics).length === 0) {
      return allVisualizations.filter((viz, index, self) => 
        index === self.findIndex((v) => v.id === viz.id)
      ).slice(0, 5);
    }
    
    // Prioritize visualizations based on metrics
    const prioritizedVisualizations = allVisualizations.filter(viz => 
      viz.applicableMetrics.some(metric => metrics && metric in metrics)
    );
    
    // Deduplicate based on visualization ID
    return prioritizedVisualizations.filter((viz, index, self) => 
      index === self.findIndex((v) => v.id === viz.id)
    );
  },

  /**
   * Generate a custom methodology package
   */
  generateCustomPackage(industry: string, compatibleFlows: MethodologyFlow[]): MethodologyPackage[] {
    // Take up to 3 compatible flows
    const selectedFlows = compatibleFlows.slice(0, 3);
    
    // Generate a basic package
    const customPackage: MethodologyPackage = {
      id: `custom-${industry}-${Date.now()}`,
      name: `Paquete personalizado para ${industry}`,
      description: "Paquete de metodología generado automáticamente en base a los modelos disponibles",
      flows: selectedFlows.map(flow => flow.id),
      totalBusinessValue: "Incremento en eficiencia y toma de decisiones basada en datos",
      totalImplementationTime: "1-3 meses dependiendo de la complejidad",
      industry
    };
    
    return [customPackage];
  },

  /**
   * Get detailed information about visualization types
   */
  getVisualizationDetails(visualizationType: string): VisualizationType | undefined {
    return VISUALIZATION_TYPES.find(viz => viz.id === visualizationType);
  },

  /**
   * Execute a specific methodology flow
   */
  async executeMethodologyFlow(flowId: string, parameters: Record<string, any> = {}): Promise<boolean> {
    // Simulate flow execution
    try {
      toast.info(`Iniciando ejecución de flujo de metodología: ${flowId}`);
      
      // In a real application, this would call an API or execute a series of steps
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast.success(`Flujo de metodología ${flowId} ejecutado con éxito`);
      return true;
    } catch (error: any) {
      toast.error(`Error al ejecutar flujo: ${error.message}`);
      return false;
    }
  }
};

// Predefined visualization types
const VISUALIZATION_TYPES: VisualizationType[] = [
  {
    id: "time_series",
    name: "Serie temporal",
    chartType: "line",
    description: "Visualización de datos a lo largo del tiempo",
    applicableMetrics: ["rmse", "mae", "mape", "r_squared"],
    dataRequirements: ["timestamp", "numeric_value"]
  },
  {
    id: "bar_chart",
    name: "Gráfico de barras",
    chartType: "bar",
    description: "Comparación de categorías discretas",
    applicableMetrics: ["count", "sum", "average"],
    dataRequirements: ["category", "numeric_value"]
  },
  {
    id: "scatter_plot",
    name: "Gráfico de dispersión",
    chartType: "scatter",
    description: "Relación entre dos variables numéricas",
    applicableMetrics: ["correlation", "r_squared"],
    dataRequirements: ["numeric_x", "numeric_y"]
  },
  {
    id: "heat_map",
    name: "Mapa de calor",
    chartType: "heatmap",
    description: "Intensidad de valores en una matriz",
    applicableMetrics: ["correlation"],
    dataRequirements: ["matrix_data"]
  },
  {
    id: "pie_chart",
    name: "Gráfico circular",
    chartType: "pie",
    description: "Distribución proporcional de categorías",
    applicableMetrics: ["percentage", "proportion"],
    dataRequirements: ["category", "numeric_value"]
  },
  {
    id: "box_plot",
    name: "Diagrama de caja",
    chartType: "boxplot",
    description: "Distribución estadística y outliers",
    applicableMetrics: ["min", "max", "median", "q1", "q3"],
    dataRequirements: ["numeric_values", "categories"]
  },
  {
    id: "area_chart",
    name: "Gráfico de área",
    chartType: "area",
    description: "Evolución y acumulación a lo largo del tiempo",
    applicableMetrics: ["cumulative_sum"],
    dataRequirements: ["timestamp", "numeric_value"]
  },
  {
    id: "radar_chart",
    name: "Gráfico de radar",
    chartType: "radar",
    description: "Comparación multidimensional",
    applicableMetrics: ["multiple_metrics"],
    dataRequirements: ["dimensions", "values"]
  },
  {
    id: "tree_map",
    name: "Mapa de árbol",
    chartType: "treemap",
    description: "Visualización jerárquica y proporcional",
    applicableMetrics: ["hierarchical_data"],
    dataRequirements: ["hierarchy", "size_value"]
  },
  {
    id: "sankey_diagram",
    name: "Diagrama de Sankey",
    chartType: "sankey",
    description: "Flujos y transferencias entre categorías",
    applicableMetrics: ["flow_data"],
    dataRequirements: ["source", "target", "value"]
  }
];

// Predefined methodology flows
const METHODOLOGY_FLOWS: MethodologyFlow[] = [
  {
    id: "descriptive_analytics",
    name: "Análisis Descriptivo",
    description: "Comprende qué ha sucedido analizando datos históricos",
    industry: null, // Applicable to all industries
    modelTypes: ["statistical", "clustering", "any"],
    requiredInputs: [
      "Datos históricos", 
      "Variables categóricas y numéricas",
      "Metadatos de las variables"
    ],
    outputs: [
      "Estadísticas descriptivas",
      "Identificación de patrones",
      "Segmentación básica",
      "Validación de hipótesis simples"
    ],
    visualizations: [
      VISUALIZATION_TYPES.find(v => v.id === "bar_chart")!,
      VISUALIZATION_TYPES.find(v => v.id === "pie_chart")!,
      VISUALIZATION_TYPES.find(v => v.id === "box_plot")!
    ],
    complementaryFlows: ["diagnostic_analytics", "exploratory_analytics"],
    businessValue: "Establece la línea base de entendimiento sobre los datos de la organización",
    expertise: "Bajo - accesible para analistas de datos sin experiencia avanzada",
    implementationTime: "short",
    roi: "medium"
  },
  {
    id: "diagnostic_analytics",
    name: "Análisis Diagnóstico",
    description: "Identifica por qué ocurrieron ciertos eventos mediante análisis causal",
    industry: null, // Applicable to all industries
    modelTypes: ["regression", "statistical", "any"],
    requiredInputs: [
      "Datos históricos procesados",
      "Variables dependientes e independientes",
      "Eventos significativos"
    ],
    outputs: [
      "Factores causales identificados",
      "Correlaciones significativas",
      "Detección de anomalías",
      "Hipótesis validadas"
    ],
    visualizations: [
      VISUALIZATION_TYPES.find(v => v.id === "scatter_plot")!,
      VISUALIZATION_TYPES.find(v => v.id === "heat_map")!
    ],
    complementaryFlows: ["predictive_analytics", "exploratory_analytics"],
    businessValue: "Permite a la organización entender causas de eventos pasados para informar decisiones futuras",
    expertise: "Medio - requiere conocimientos de estadística y modelado",
    implementationTime: "medium",
    roi: "high"
  },
  {
    id: "predictive_analytics",
    name: "Análisis Predictivo",
    description: "Anticipa resultados futuros mediante modelos predictivos",
    industry: null, // Applicable to all industries
    modelTypes: ["time_series", "regression", "deep_learning"],
    requiredInputs: [
      "Datos históricos limpios",
      "Variables predictoras",
      "Parámetros temporales",
      "Objetivos de predicción"
    ],
    outputs: [
      "Predicciones con intervalos de confianza",
      "Modelos entrenados",
      "Escenarios futuros",
      "Indicadores de rendimiento predictivo"
    ],
    visualizations: [
      VISUALIZATION_TYPES.find(v => v.id === "time_series")!,
      VISUALIZATION_TYPES.find(v => v.id === "area_chart")!
    ],
    complementaryFlows: ["prescriptive_analytics", "diagnostic_analytics"],
    businessValue: "Anticipa tendencias y resultados para optimizar la planificación estratégica",
    expertise: "Alto - requiere especialistas en ciencia de datos",
    implementationTime: "long",
    roi: "high"
  },
  {
    id: "prescriptive_analytics",
    name: "Análisis Prescriptivo",
    description: "Recomienda acciones óptimas basadas en predicciones y objetivos",
    industry: null, // Applicable to all industries
    modelTypes: ["optimization", "reinforcement_learning"],
    requiredInputs: [
      "Resultados predictivos",
      "Objetivos de negocio",
      "Restricciones operativas",
      "Opciones de acción"
    ],
    outputs: [
      "Recomendaciones accionables",
      "Plan de implementación",
      "Análisis de escenarios",
      "Impacto esperado por acción"
    ],
    visualizations: [
      VISUALIZATION_TYPES.find(v => v.id === "tree_map")!,
      VISUALIZATION_TYPES.find(v => v.id === "sankey_diagram")!
    ],
    complementaryFlows: ["predictive_analytics", "monitoring_analytics"],
    businessValue: "Maximiza el retorno mediante recomendaciones de acción específicas",
    expertise: "Muy alto - requiere investigación operativa y optimización",
    implementationTime: "long",
    roi: "high"
  },
  {
    id: "exploratory_analytics",
    name: "Análisis Exploratorio",
    description: "Descubre patrones ocultos y genera hipótesis iniciales",
    industry: null, // Applicable to all industries
    modelTypes: ["clustering", "dimensionality_reduction", "any"],
    requiredInputs: [
      "Datos crudos o procesados",
      "Múltiples fuentes potenciales",
      "Variables sin filtrar"
    ],
    outputs: [
      "Insights preliminares",
      "Hipótesis para investigación",
      "Direcciones de análisis",
      "Patrones identificados"
    ],
    visualizations: [
      VISUALIZATION_TYPES.find(v => v.id === "scatter_plot")!,
      VISUALIZATION_TYPES.find(v => v.id === "heat_map")!
    ],
    complementaryFlows: ["descriptive_analytics", "diagnostic_analytics"],
    businessValue: "Descubre oportunidades y riesgos ocultos en los datos para ventaja competitiva",
    expertise: "Medio - requiere pensamiento analítico y curiosidad",
    implementationTime: "medium",
    roi: "medium"
  },
  {
    id: "real_time_analytics",
    name: "Análisis en Tiempo Real",
    description: "Procesa y analiza datos a medida que se generan",
    industry: null, // Applicable to all industries
    modelTypes: ["streaming", "anomaly_detection"],
    requiredInputs: [
      "Flujos de datos en vivo",
      "Modelos pre-entrenados",
      "Umbrales de alerta",
      "Reglas de acción"
    ],
    outputs: [
      "Alertas instantáneas",
      "Acciones automáticas",
      "Visualizaciones dinámicas",
      "Métricas en tiempo real"
    ],
    visualizations: [
      VISUALIZATION_TYPES.find(v => v.id === "time_series")!,
      VISUALIZATION_TYPES.find(v => v.id === "bar_chart")!
    ],
    complementaryFlows: ["monitoring_analytics", "prescriptive_analytics"],
    businessValue: "Permite respuestas inmediatas a cambios en condiciones operativas",
    expertise: "Muy alto - requiere infraestructura especializada",
    implementationTime: "long",
    roi: "high"
  },
  {
    id: "monitoring_analytics",
    name: "Análisis de Monitoreo",
    description: "Supervisa el rendimiento continuo y detecta problemas",
    industry: null, // Applicable to all industries
    modelTypes: ["anomaly_detection", "statistical", "any"],
    requiredInputs: [
      "Métricas clave",
      "Niveles de referencia",
      "Umbrales de alerta",
      "Ciclos de revisión"
    ],
    outputs: [
      "Dashboards operativos",
      "Informes de desviación",
      "Tendencias de rendimiento",
      "Alertas preventivas"
    ],
    visualizations: [
      VISUALIZATION_TYPES.find(v => v.id === "time_series")!,
      VISUALIZATION_TYPES.find(v => v.id === "radar_chart")!
    ],
    complementaryFlows: ["real_time_analytics", "diagnostic_analytics"],
    businessValue: "Mantiene la operación dentro de parámetros óptimos y anticipa problemas",
    expertise: "Medio - requiere conocimiento del dominio y métricas",
    implementationTime: "medium",
    roi: "medium"
  },
  {
    id: "financial_analytics",
    name: "Análisis Financiero",
    description: "Analiza rendimiento financiero y optimiza recursos",
    industry: "finanzas",
    modelTypes: ["time_series", "regression", "any"],
    requiredInputs: [
      "Datos financieros históricos",
      "Índices económicos",
      "Datos de mercado",
      "Presupuestos y proyecciones"
    ],
    outputs: [
      "Previsiones financieras",
      "Análisis de riesgo",
      "Optimización de capital",
      "Detección de anomalías"
    ],
    visualizations: [
      VISUALIZATION_TYPES.find(v => v.id === "time_series")!,
      VISUALIZATION_TYPES.find(v => v.id === "tree_map")!
    ],
    complementaryFlows: ["predictive_analytics", "risk_analytics"],
    businessValue: "Optimiza la gestión financiera y maximiza el retorno sobre inversión",
    expertise: "Alto - requiere conocimientos financieros y analíticos",
    implementationTime: "medium",
    roi: "high"
  },
  {
    id: "risk_analytics",
    name: "Análisis de Riesgos",
    description: "Identifica, cuantifica y mitiga riesgos potenciales",
    industry: "finanzas",
    modelTypes: ["statistical", "simulation", "any"],
    requiredInputs: [
      "Datos históricos de eventos",
      "Factores de riesgo",
      "Límites de tolerancia",
      "Escenarios de estrés"
    ],
    outputs: [
      "Mapas de riesgo",
      "Cuantificación de impacto",
      "Estrategias de mitigación",
      "Modelos de alerta temprana"
    ],
    visualizations: [
      VISUALIZATION_TYPES.find(v => v.id === "heat_map")!,
      VISUALIZATION_TYPES.find(v => v.id === "radar_chart")!
    ],
    complementaryFlows: ["financial_analytics", "simulation_analytics"],
    businessValue: "Protege activos de la organización y reduce pérdidas potenciales",
    expertise: "Alto - requiere gestión de riesgos especializada",
    implementationTime: "medium",
    roi: "high"
  },
  {
    id: "customer_analytics",
    name: "Análisis de Clientes",
    description: "Analiza comportamientos y valor de clientes",
    industry: "retail",
    modelTypes: ["clustering", "classification", "any"],
    requiredInputs: [
      "Datos transaccionales",
      "Información demográfica",
      "Interacciones con clientes",
      "Feedback y encuestas"
    ],
    outputs: [
      "Segmentación de clientes",
      "Modelos de valor del ciclo de vida",
      "Predicciones de abandono",
      "Estrategias de fidelización"
    ],
    visualizations: [
      VISUALIZATION_TYPES.find(v => v.id === "cluster_map")!,
      VISUALIZATION_TYPES.find(v => v.id === "sankey_diagram")!
    ],
    complementaryFlows: ["marketing_analytics", "behavioral_analytics"],
    businessValue: "Maximiza el valor del cliente y reduce la tasa de abandono",
    expertise: "Medio - requiere marketing y análisis de datos",
    implementationTime: "medium",
    roi: "high"
  }
];

// Predefined methodology packages
const METHODOLOGY_PACKAGES: MethodologyPackage[] = [
  {
    id: "finance_essentials",
    name: "Esenciales Financieros",
    description: "Paquete básico para análisis financiero y gestión de riesgos",
    flows: ["financial_analytics", "risk_analytics", "descriptive_analytics"],
    totalBusinessValue: "Mejora en la gestión de recursos financieros y mitigación de riesgos",
    totalImplementationTime: "2-3 meses",
    industry: "finanzas"
  },
  {
    id: "advanced_finance",
    name: "Finanzas Avanzadas",
    description: "Análisis financiero predictivo y optimización",
    flows: ["financial_analytics", "predictive_analytics", "prescriptive_analytics", "risk_analytics"],
    totalBusinessValue: "Planificación financiera estratégica y optimización avanzada de recursos",
    totalImplementationTime: "4-6 meses",
    industry: "finanzas"
  },
  {
    id: "retail_customer_insights",
    name: "Insights de Clientes para Retail",
    description: "Comprensión profunda del comportamiento de clientes y optimización de ventas",
    flows: ["customer_analytics", "descriptive_analytics", "predictive_analytics"],
    totalBusinessValue: "Incremento en satisfacción de clientes, retención y valor del ciclo de vida",
    totalImplementationTime: "3-4 meses",
    industry: "retail"
  },
  {
    id: "data_science_fundamentals",
    name: "Fundamentos de Ciencia de Datos",
    description: "Paquete esencial para organizaciones que inician en análisis de datos",
    flows: ["descriptive_analytics", "exploratory_analytics", "diagnostic_analytics"],
    totalBusinessValue: "Establecimiento de capacidades analíticas fundamentales",
    totalImplementationTime: "2-3 meses",
    industry: null
  },
  {
    id: "advanced_predictive",
    name: "Predicción Avanzada",
    description: "Capacidades predictivas y prescriptivas sofisticadas",
    flows: ["predictive_analytics", "prescriptive_analytics", "monitoring_analytics"],
    totalBusinessValue: "Toma de decisiones proactiva basada en predicciones precisas",
    totalImplementationTime: "5-8 meses",
    industry: null
  }
];
