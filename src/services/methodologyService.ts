import { toast } from "sonner";

export interface MethodologyInsight {
  name: string;
  description: string;
  visualizationType: string;
  businessValue: string;
}

export interface MethodologyInputField {
  name: string;
  description: string;
  example: string;
  required: boolean;
}

export interface MethodologyStep {
  id: string;
  name: string;
  description: string;
  modelType: string;
  difficulty: "básico" | "intermedio" | "avanzado";
  estimatedProcessingTime: string;
  prerequisiteSteps: string[];
  inputFields: MethodologyInputField[];
  outputInsights: MethodologyInsight[];
}

export interface MethodologyFlow {
  id: string;
  name: string;
  description: string;
  industry: string;
  businessGoal: string;
  totalEstimatedTime: string;
  recommendedTools: string[];
  steps: MethodologyStep[];
}

class MethodologyService {
  private mockMethodologyFlows: MethodologyFlow[] = [
    {
      id: "ventas-retail-1",
      name: "Análisis de Ventas en Retail",
      description:
        "Este flujo te ayuda a entender y optimizar tus ventas en el sector retail.",
      industry: "Retail",
      businessGoal:
        "Aumentar las ventas y mejorar la eficiencia operativa en tiendas retail.",
      totalEstimatedTime: "25-30 minutos",
      recommendedTools: ["Excel, Power BI"],
      steps: [
        {
          id: "paso-1",
          name: "Análisis Descriptivo de Ventas",
          description:
            "Revisa las tendencias de ventas históricas para identificar patrones clave.",
          modelType: "Análisis Descriptivo",
          difficulty: "básico",
          estimatedProcessingTime: "5-7 minutos",
          prerequisiteSteps: [],
          inputFields: [
            {
              name: "Datos de Ventas",
              description: "Archivo con datos de ventas por día/mes.",
              example: "ventas_2023.xlsx",
              required: true,
            },
            {
              name: "Categorías de Productos",
              description: "Lista de categorías de productos.",
              example: "Electrónicos, Ropa",
              required: false,
            },
          ],
          outputInsights: [
            {
              name: "Tendencias de Ventas Mensuales",
              description: "Gráfico de ventas por mes.",
              visualizationType: "Gráfico de Líneas",
              businessValue: "Identificar meses de alta y baja demanda.",
            },
            {
              name: "Ventas por Categoría",
              description: "Distribución de ventas por categoría de producto.",
              visualizationType: "Gráfico de Barras",
              businessValue: "Conocer qué categorías generan más ingresos.",
            },
          ],
        },
        {
          id: "paso-2",
          name: "Pronóstico de Ventas",
          description:
            "Predice las ventas futuras basándote en datos históricos.",
          modelType: "SARIMA",
          difficulty: "intermedio",
          estimatedProcessingTime: "10-12 minutos",
          prerequisiteSteps: ["paso-1"],
          inputFields: [
            {
              name: "Datos de Ventas Históricos",
              description: "Archivo con datos de ventas a lo largo del tiempo.",
              example: "ventas_historicas.csv",
              required: true,
            },
            {
              name: "Periodo de Pronóstico",
              description: "Número de meses a pronosticar.",
              example: "6 meses",
              required: true,
            },
          ],
          outputInsights: [
            {
              name: "Pronóstico de Ventas Mensual",
              description: "Gráfico de ventas pronosticadas para los próximos meses.",
              visualizationType: "Gráfico de Líneas",
              businessValue: "Planificar inventario y recursos.",
            },
            {
              name: "Intervalos de Confianza",
              description: "Rangos de posibles valores de ventas futuras.",
              visualizationType: "Gráfico de Área",
              businessValue: "Evaluar riesgos y oportunidades.",
            },
          ],
        },
        {
          id: "paso-3",
          name: "Análisis de Correlación",
          description:
            "Identifica qué factores influyen en tus ventas (ej. promociones, clima).",
          modelType: "Regresión Lineal",
          difficulty: "avanzado",
          estimatedProcessingTime: "8-10 minutos",
          prerequisiteSteps: ["paso-1"],
          inputFields: [
            {
              name: "Datos de Ventas",
              description: "Archivo con datos de ventas.",
              example: "ventas_con_factores.xlsx",
              required: true,
            },
            {
              name: "Variables Independientes",
              description: "Factores que podrían influir en las ventas.",
              example: "Promociones, clima",
              required: true,
            },
          ],
          outputInsights: [
            {
              name: "Coeficientes de Correlación",
              description: "Medida de la influencia de cada factor en las ventas.",
              visualizationType: "Tabla",
              businessValue: "Optimizar estrategias de marketing y ventas.",
            },
            {
              name: "Gráfico de Dispersión",
              description: "Relación entre factores y ventas.",
              visualizationType: "Gráfico de Dispersión",
              businessValue: "Visualizar la fuerza de las relaciones.",
            },
          ],
        },
      ],
    },
    {
      id: "riesgos-financieros-2",
      name: "Evaluación de Riesgos Financieros",
      description:
        "Este flujo te ayuda a evaluar y mitigar riesgos en el sector financiero.",
      industry: "Finanzas",
      businessGoal:
        "Minimizar pérdidas y optimizar la gestión de riesgos en instituciones financieras.",
      totalEstimatedTime: "35-40 minutos",
      recommendedTools: ["Python, Tableau"],
      steps: [
        {
          id: "paso-4",
          name: "Análisis de Componentes Principales (PCA)",
          description:
            "Reduce la dimensionalidad de los datos financieros para simplificar el análisis.",
          modelType: "PCA",
          difficulty: "intermedio",
          estimatedProcessingTime: "10-12 minutos",
          prerequisiteSteps: [],
          inputFields: [
            {
              name: "Datos Financieros",
              description: "Archivo con datos de indicadores financieros.",
              example: "datos_financieros.csv",
              required: true,
            },
            {
              name: "Número de Componentes",
              description: "Cantidad de componentes principales a conservar.",
              example: "5",
              required: true,
            },
          ],
          outputInsights: [
            {
              name: "Varianza Explicada",
              description:
                "Porcentaje de varianza explicada por cada componente principal.",
              visualizationType: "Gráfico de Barras",
              businessValue: "Evaluar la representatividad de los componentes.",
            },
            {
              name: "Cargas de Componentes",
              description:
                "Contribución de cada variable original a los componentes principales.",
              visualizationType: "Mapa de Calor",
              businessValue: "Identificar variables clave.",
            },
          ],
        },
        {
          id: "paso-5",
          name: "Modelado de Riesgo de Crédito",
          description:
            "Predice la probabilidad de incumplimiento de pago de los clientes.",
          modelType: "Regresión Logística",
          difficulty: "avanzado",
          estimatedProcessingTime: "15-18 minutos",
          prerequisiteSteps: ["paso-4"],
          inputFields: [
            {
              name: "Datos de Crédito",
              description: "Archivo con datos de historial crediticio de clientes.",
              example: "datos_credito.xlsx",
              required: true,
            },
            {
              name: "Variable Objetivo",
              description: "Indicador de incumplimiento (0 o 1).",
              example: "Incumplimiento",
              required: true,
            },
          ],
          outputInsights: [
            {
              name: "Curva ROC",
              description: "Evaluación del rendimiento del modelo.",
              visualizationType: "Gráfico de Líneas",
              businessValue: "Medir la capacidad predictiva del modelo.",
            },
            {
              name: "Matriz de Confusión",
              description: "Clasificación de predicciones correctas e incorrectas.",
              visualizationType: "Tabla",
              businessValue: "Evaluar la precisión del modelo.",
            },
          ],
        },
        {
          id: "paso-6",
          name: "Análisis de Sensibilidad",
          description:
            "Evalúa cómo los cambios en las variables afectan los resultados del modelo.",
          modelType: "Simulación Monte Carlo",
          difficulty: "avanzado",
          estimatedProcessingTime: "10-12 minutos",
          prerequisiteSteps: ["paso-5"],
          inputFields: [
            {
              name: "Modelo de Riesgo",
              description: "Modelo de riesgo de crédito calibrado.",
              example: "modelo_riesgo.pkl",
              required: true,
            },
            {
              name: "Distribuciones de Variables",
              description:
                "Distribuciones de probabilidad de las variables clave.",
              example: "Normal, Uniforme",
              required: true,
            },
          ],
          outputInsights: [
            {
              name: "Histograma de Resultados",
              description: "Distribución de posibles resultados del modelo.",
              visualizationType: "Histograma",
              businessValue: "Evaluar la variabilidad de los resultados.",
            },
            {
              name: "Gráfico de Tornado",
              description:
                "Sensibilidad de los resultados a los cambios en las variables.",
              visualizationType: "Gráfico de Barras",
              businessValue: "Identificar variables críticas.",
            },
          ],
        },
      ],
    },
  ];

  // Add these missing methods that are being referenced
  getMethodologyForModel(modelType: string): MethodologyFlow | null {
    return this.mockMethodologyFlows.find(flow => 
      flow.steps.some(step => step.modelType.toLowerCase() === modelType.toLowerCase())
    ) || null;
  }

  hasMethodologyForModel(modelType: string): boolean {
    return this.mockMethodologyFlows.some(flow => 
      flow.steps.some(step => step.modelType.toLowerCase() === modelType.toLowerCase())
    );
  }

  // Keep your existing methods
  getAllMethodologyFlows(): MethodologyFlow[] {
    return this.mockMethodologyFlows;
  }

  getMethodologyFlowsByIndustry(industry: string): MethodologyFlow[] {
    return this.mockMethodologyFlows.filter(
      flow => flow.industry.toLowerCase() === industry.toLowerCase()
    );
  }

  getCompatibleMethodologyFlows(modelType: string): MethodologyFlow[] {
    return this.mockMethodologyFlows.filter(flow =>
      flow.steps.some(step => step.modelType.toLowerCase() === modelType.toLowerCase())
    );
  }

  getMethodologyFlowById(id: string): MethodologyFlow | undefined {
    return this.mockMethodologyFlows.find(flow => flow.id === id);
  }

  getStepById(flowId: string, stepId: string): MethodologyStep | undefined {
    const flow = this.getMethodologyFlowById(flowId);
    return flow?.steps.find(step => step.id === stepId);
  }

  async executeMethodologyFlow(
    flowId: string,
    parameters?: Record<string, any>
  ): Promise<any> {
    const flow = this.getMethodologyFlowById(flowId);
    if (!flow) {
      throw new Error(`Methodology flow with ID ${flowId} not found`);
    }

    // In a real app, this would execute the flow through the API
    toast.success(`Executing methodology flow: ${flow.name}`);

    // Mock execution delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Mock results
    return {
      success: true,
      flowName: flow.name,
      executionTime: "2 minutes",
      results: [
        {
          stepName: flow.steps[0].name,
          status: "completed",
          insights: flow.steps[0].outputInsights,
        },
      ],
    };
  }
}

export const methodologyService = new MethodologyService();
