
import { AnalysisFlow } from '@/types/analysis';

// Return all analysis flows for a specific industry
export const getAnalysisFlowsByIndustry = (industry: string): AnalysisFlow[] => {
  // Get industry flows
  const industryFlows = flows.filter(flow => flow.industry === industry);
  // Get cross-industry flows that apply to this industry
  const crossIndustryFlows = flows.filter(flow => 
    flow.industry === 'cross-industry' && 
    (flow.applicableIndustries?.includes(industry) || !flow.applicableIndustries)
  );
  
  return [...industryFlows, ...crossIndustryFlows];
};

// Get a specific flow by ID
export const getAnalysisFlowById = (flowId: string): AnalysisFlow | undefined => {
  return flows.find(flow => flow.id === flowId);
};

// Database of analysis flows
export const flows: AnalysisFlow[] = [
  // RETAIL FLOWS
  {
    id: "retail-demand-forecasting",
    name: "Previsión de demanda y optimización de inventario",
    description: "Análisis para predecir la demanda futura y optimizar los niveles de inventario",
    industry: "retail",
    businessGoal: "Reducir costos de inventario mientras se mantiene un nivel de servicio óptimo, evitando tanto el exceso como la escasez de productos.",
    totalEstimatedTime: "3-4 semanas",
    recommendedTools: ["Prophet", "SARIMA", "XGBoost", "Tableau"],
    recommendedFor: [
      {
        title: "Gerente de Operaciones",
        reason: "Para optimizar la cadena de suministro y reducir costos de inventario"
      },
      {
        title: "Director Comercial",
        reason: "Para mejorar disponibilidad de producto y evitar roturas de stock"
      }
    ],
    steps: [
      {
        id: "historical-sales-analysis",
        name: "Análisis histórico de ventas",
        description: "Evaluación de patrones históricos de ventas, estacionalidad y tendencias",
        prerequisiteSteps: [],
        estimatedProcessingTime: "3-5 días",
        difficulty: "básico",
        modelType: "análisis exploratorio",
        howItWorks: "Este análisis examina los datos históricos de ventas para identificar patrones recurrentes, tendencias a largo plazo y comportamientos estacionales. Utiliza técnicas estadísticas básicas para descomponer las series temporales.",
        benefits: [
          "Identificación de patrones estacionales que afectan la demanda",
          "Detección de tendencias de crecimiento o decrecimiento en categorías",
          "Base sólida para cualquier modelo predictivo posterior"
        ],
        inputFields: [
          {
            name: "fecha",
            description: "Fecha de la venta (YYYY-MM-DD)",
            example: "2023-01-15",
            required: true,
            type: "date"
          },
          {
            name: "producto_id",
            description: "Identificador único del producto",
            example: "PRD-12345",
            required: true,
            type: "text"
          },
          {
            name: "categoria",
            description: "Categoría del producto",
            example: "Electrónica",
            required: true,
            type: "categorical"
          },
          {
            name: "unidades_vendidas",
            description: "Cantidad de unidades vendidas",
            example: 42,
            required: true,
            type: "numeric"
          },
          {
            name: "precio_unitario",
            description: "Precio por unidad en la fecha de venta",
            example: 59.99,
            required: true,
            type: "numeric"
          },
          {
            name: "ubicacion_tienda",
            description: "Ubicación de la tienda donde se realizó la venta",
            example: "Madrid Centro",
            required: false,
            type: "categorical"
          }
        ],
        outputInsights: [
          {
            name: "Patrones estacionales",
            description: "Identificación de ciclos y patrones estacionales en las ventas",
            visualizationType: "Gráfico de líneas",
            businessValue: "Anticipar aumentos de demanda estacionales"
          },
          {
            name: "Análisis de tendencias",
            description: "Evolución de ventas por categoría y producto a lo largo del tiempo",
            visualizationType: "Gráfico de área",
            businessValue: "Identificar productos en crecimiento o declive"
          },
          {
            name: "Correlación con precios",
            description: "Relación entre cambios de precio y volumen de ventas",
            visualizationType: "Gráfico de dispersión",
            businessValue: "Optimizar estrategias de precios"
          }
        ]
      },
      {
        id: "demand-forecasting",
        name: "Previsión de demanda",
        description: "Predicción de la demanda futura por producto y categoría",
        prerequisiteSteps: ["historical-sales-analysis"],
        estimatedProcessingTime: "5-7 días",
        difficulty: "intermedio",
        modelType: "SARIMA/Prophet",
        howItWorks: "Este modelo combina técnicas de series temporales (SARIMA) y el algoritmo Prophet de Facebook para generar previsiones precisas de demanda futura. Incorpora automáticamente factores estacionales, tendencias y eventos especiales.",
        benefits: [
          "Previsiones precisas a corto y medio plazo (3-12 meses)",
          "Identificación automática de factores estacionales y festivos",
          "Intervalos de confianza para gestionar la incertidumbre"
        ],
        inputFields: [
          {
            name: "fecha",
            description: "Fecha de la venta (YYYY-MM-DD)",
            example: "2023-01-15",
            required: true,
            type: "date"
          },
          {
            name: "producto_id",
            description: "Identificador único del producto",
            example: "PRD-12345",
            required: true,
            type: "text"
          },
          {
            name: "unidades_vendidas",
            description: "Cantidad de unidades vendidas",
            example: 42,
            required: true,
            type: "numeric"
          },
          {
            name: "eventos_especiales",
            description: "Indicador de eventos que afectan las ventas (ej. Black Friday)",
            example: "BlackFriday",
            required: false,
            type: "categorical"
          },
          {
            name: "precio_promedio",
            description: "Precio promedio del producto en el período",
            example: 59.99,
            required: false,
            type: "numeric"
          }
        ],
        outputInsights: [
          {
            name: "Previsión de demanda",
            description: "Predicción de ventas para los próximos períodos con intervalos de confianza",
            visualizationType: "Gráfico de previsión",
            businessValue: "Planificación precisa de compras e inventario"
          },
          {
            name: "Componentes de la previsión",
            description: "Descomposición de la previsión en tendencia, estacionalidad y eventos",
            visualizationType: "Gráfico de descomposición",
            businessValue: "Entender los drivers de la demanda futura"
          },
          {
            name: "Precisión del modelo",
            description: "Métricas de precisión del modelo y comparación con previsiones anteriores",
            visualizationType: "Tabla de métricas",
            businessValue: "Validar la fiabilidad de las previsiones"
          }
        ]
      },
      {
        id: "inventory-optimization",
        name: "Optimización de inventario",
        description: "Cálculo de niveles óptimos de inventario y puntos de reorden",
        prerequisiteSteps: ["demand-forecasting"],
        estimatedProcessingTime: "4-6 días",
        difficulty: "avanzado",
        modelType: "optimización matemática",
        howItWorks: "A partir de las previsiones de demanda, este modelo calcula el inventario óptimo utilizando técnicas de optimización matemática. Tiene en cuenta costos de almacenaje, pedido, nivel de servicio deseado y tiempos de entrega de proveedores.",
        benefits: [
          "Reducción de costos de inventario de 15-30%",
          "Mejora en el nivel de servicio (disponibilidad)",
          "Optimización del flujo de caja al reducir capital inmovilizado"
        ],
        inputFields: [
          {
            name: "producto_id",
            description: "Identificador único del producto",
            example: "PRD-12345",
            required: true,
            type: "text"
          },
          {
            name: "demanda_prevista",
            description: "Demanda esperada por período (puede ser importado del paso anterior)",
            example: 120,
            required: true,
            type: "numeric"
          },
          {
            name: "desviacion_demanda",
            description: "Desviación estándar de la demanda",
            example: 15,
            required: true,
            type: "numeric"
          },
          {
            name: "tiempo_reabastecimiento",
            description: "Tiempo de entrega del proveedor en días",
            example: 14,
            required: true,
            type: "numeric"
          },
          {
            name: "costo_almacenamiento",
            description: "Costo de mantener una unidad en inventario por período",
            example: 2.5,
            required: true,
            type: "numeric"
          },
          {
            name: "costo_pedido",
            description: "Costo fijo de realizar un pedido al proveedor",
            example: 50,
            required: true,
            type: "numeric"
          },
          {
            name: "nivel_servicio",
            description: "Nivel de servicio objetivo (0-1)",
            example: 0.95,
            required: true,
            type: "numeric"
          }
        ],
        outputInsights: [
          {
            name: "Inventario de seguridad",
            description: "Nivel óptimo de inventario de seguridad por producto",
            visualizationType: "Tabla interactiva",
            businessValue: "Prevenir roturas de stock mientras se minimiza capital inmovilizado"
          },
          {
            name: "Punto de reorden",
            description: "Nivel de inventario que debe disparar un nuevo pedido",
            visualizationType: "Dashboard operativo",
            businessValue: "Automatizar decisiones de reabastecimiento"
          },
          {
            name: "Simulación de políticas",
            description: "Simulación de diferentes políticas de inventario y su impacto",
            visualizationType: "Gráfico comparativo",
            businessValue: "Evaluar trade-offs entre nivel de servicio y costos"
          }
        ]
      }
    ]
  },
  {
    id: "retail-customer-segmentation",
    name: "Segmentación avanzada de clientes",
    description: "Identificación y caracterización de segmentos de clientes para estrategias personalizadas",
    industry: "retail",
    businessGoal: "Desarrollar estrategias de marketing más efectivas y personalizadas para cada segmento de clientes, aumentando la lealtad y el valor del ciclo de vida del cliente.",
    totalEstimatedTime: "2-3 semanas",
    recommendedTools: ["K-means", "XGBoost", "Power BI"],
    steps: [
      {
        id: "customer-data-preprocessing",
        name: "Preparación de datos de clientes",
        description: "Limpieza y preparación de datos transaccionales y demográficos",
        prerequisiteSteps: [],
        estimatedProcessingTime: "3-4 días",
        difficulty: "básico",
        modelType: "preprocesamiento",
        inputFields: [
          {
            name: "cliente_id",
            description: "Identificador único del cliente",
            example: "CL-78945",
            required: true,
            type: "text"
          },
          {
            name: "fecha_transaccion",
            description: "Fecha de cada compra",
            example: "2023-04-18",
            required: true,
            type: "date"
          },
          {
            name: "monto_compra",
            description: "Valor total de la compra",
            example: 135.75,
            required: true,
            type: "numeric"
          },
          {
            name: "categorias_compradas",
            description: "Categorías de productos incluidas en la compra",
            example: "Hogar,Electrónica",
            required: true,
            type: "text"
          },
          {
            name: "canal",
            description: "Canal de compra (online, tienda física)",
            example: "online",
            required: true,
            type: "categorical"
          },
          {
            name: "edad",
            description: "Edad del cliente",
            example: 34,
            required: false,
            type: "numeric"
          },
          {
            name: "genero",
            description: "Género del cliente",
            example: "Femenino",
            required: false,
            type: "categorical"
          },
          {
            name: "ubicacion",
            description: "Código postal o ciudad del cliente",
            example: "28001",
            required: false,
            type: "text"
          }
        ],
        outputInsights: [
          {
            name: "Datos RFM preparados",
            description: "Métricas RFM (Recency, Frequency, Monetary) calculadas por cliente",
            visualizationType: "Tabla procesada",
            businessValue: "Base para segmentación y análisis de valor de cliente"
          },
          {
            name: "Patrones de compra",
            description: "Comportamientos y preferencias de compra identificados",
            visualizationType: "Matriz de correlación",
            businessValue: "Identificación de oportunidades de venta cruzada"
          }
        ]
      },
      {
        id: "rfm-segmentation",
        name: "Segmentación RFM",
        description: "Segmentación basada en Recencia, Frecuencia y Valor Monetario",
        prerequisiteSteps: ["customer-data-preprocessing"],
        estimatedProcessingTime: "2-3 días",
        difficulty: "intermedio",
        modelType: "clustering",
        inputFields: [
          {
            name: "cliente_id",
            description: "Identificador único del cliente",
            example: "CL-78945",
            required: true,
            type: "text"
          },
          {
            name: "recencia",
            description: "Días desde la última compra",
            example: 45,
            required: true,
            type: "numeric"
          },
          {
            name: "frecuencia",
            description: "Número de compras en el período analizado",
            example: 12,
            required: true,
            type: "numeric"
          },
          {
            name: "valor_monetario",
            description: "Gasto promedio o total del cliente",
            example: 1250.80,
            required: true,
            type: "numeric"
          }
        ],
        outputInsights: [
          {
            name: "Segmentos RFM",
            description: "Clasificación de clientes en segmentos RFM (campeones, en riesgo, etc.)",
            visualizationType: "Gráfico de burbujas",
            businessValue: "Priorización de esfuerzos de marketing y retención"
          },
          {
            name: "Valor del ciclo de vida",
            description: "Estimación del valor potencial de cada segmento",
            visualizationType: "Gráfico de barras",
            businessValue: "Focalizar recursos en clientes de alto valor"
          }
        ]
      },
      {
        id: "behavior-segmentation",
        name: "Segmentación por comportamiento",
        description: "Agrupación de clientes según patrones de compra y preferencias",
        prerequisiteSteps: ["customer-data-preprocessing"],
        estimatedProcessingTime: "4-5 días",
        difficulty: "avanzado",
        modelType: "K-means clustering",
        inputFields: [
          {
            name: "cliente_id",
            description: "Identificador único del cliente",
            example: "CL-78945",
            required: true,
            type: "text"
          },
          {
            name: "categorias_preferidas",
            description: "Distribución porcentual de compras por categoría",
            example: "Ropa:45%,Calzado:30%,Accesorios:25%",
            required: true,
            type: "text"
          },
          {
            name: "horario_compra",
            description: "Horario preferido de compra",
            example: "Noche",
            required: false,
            type: "categorical"
          },
          {
            name: "dispositivo_compra",
            description: "Dispositivo preferido para compras online",
            example: "Móvil",
            required: false,
            type: "categorical"
          },
          {
            name: "sensibilidad_precio",
            description: "Indicador de sensibilidad a precios y promociones",
            example: 0.85,
            required: true,
            type: "numeric"
          },
          {
            name: "tiempo_decision",
            description: "Tiempo promedio entre visitas y compras (días)",
            example: 2.3,
            required: false,
            type: "numeric"
          }
        ],
        outputInsights: [
          {
            name: "Perfiles de comportamiento",
            description: "Caracterización detallada de cada segmento identificado",
            visualizationType: "Mapa de calor",
            businessValue: "Personalización de experiencia de cliente y comunicación"
          },
          {
            name: "Patrones de navegación",
            description: "Rutas típicas de compra por segmento",
            visualizationType: "Diagrama de flujo",
            businessValue: "Optimización del recorrido del cliente y diseño de tienda"
          }
        ]
      },
      {
        id: "personalization-strategy",
        name: "Estrategias de personalización",
        description: "Desarrollo de estrategias personalizadas para cada segmento",
        prerequisiteSteps: ["rfm-segmentation", "behavior-segmentation"],
        estimatedProcessingTime: "5-7 días",
        difficulty: "intermedio",
        modelType: "análisis prescriptivo",
        inputFields: [
          {
            name: "segmento_id",
            description: "Identificador del segmento de clientes",
            example: "Champions-Digital",
            required: true,
            type: "text"
          },
          {
            name: "descripcion_segmento",
            description: "Características clave del segmento",
            example: "Clientes frecuentes, alto valor, prefieren canal digital",
            required: true,
            type: "text"
          },
          {
            name: "productos_recomendados",
            description: "Productos con alta probabilidad de compra para este segmento",
            example: "SKU-1234,SKU-5678,SKU-9012",
            required: false,
            type: "text"
          },
          {
            name: "promociones_efectivas",
            description: "Tipos de promociones con mejor respuesta histórica",
            example: "Envío gratis,Descuento por volumen",
            required: false,
            type: "text"
          },
          {
            name: "canales_preferidos",
            description: "Canales de comunicación preferidos",
            example: "Email,SMS",
            required: true,
            type: "text"
          },
          {
            name: "presupuesto_marketing",
            description: "Presupuesto asignado para este segmento",
            example: 25000,
            required: true,
            type: "numeric"
          }
        ],
        outputInsights: [
          {
            name: "Plan de personalización",
            description: "Estrategias detalladas por segmento",
            visualizationType: "Dashboard ejecutivo",
            businessValue: "Aumento en conversión y retención de clientes"
          },
          {
            name: "ROI proyectado",
            description: "Retorno esperado de las estrategias por segmento",
            visualizationType: "Gráfico de retorno",
            businessValue: "Optimización de inversión en marketing"
          },
          {
            name: "Calendario de acciones",
            description: "Planificación temporal de acciones por segmento",
            visualizationType: "Diagrama de Gantt",
            businessValue: "Implementación efectiva y medición de resultados"
          }
        ]
      }
    ]
  },

  // FINANZAS FLOWS
  {
    id: "financial-risk-assessment",
    name: "Evaluación integral de riesgos financieros",
    description: "Análisis predictivo de riesgos financieros para toma de decisiones",
    industry: "finanzas",
    businessGoal: "Identificar, cuantificar y mitigar riesgos financieros para proteger los activos de la institución y optimizar la relación riesgo-rendimiento.",
    totalEstimatedTime: "4-6 semanas",
    recommendedTools: ["XGBoost", "RandomForest", "Tableau", "Python"],
    steps: [
      {
        id: "credit-risk-analysis",
        name: "Análisis de riesgo crediticio",
        description: "Evaluación del riesgo de impago de préstamos y créditos",
        prerequisiteSteps: [],
        estimatedProcessingTime: "7-10 días",
        difficulty: "avanzado",
        modelType: "XGBoost/Random Forest",
        inputFields: [
          {
            name: "cliente_id",
            description: "Identificador único del cliente",
            example: "A12345",
            required: true,
            type: "text"
          },
          {
            name: "historial_credito",
            description: "Puntuación crediticia histórica",
            example: 720,
            required: true,
            type: "numeric"
          },
          {
            name: "ingresos_anuales",
            description: "Ingresos anuales verificados",
            example: 45000,
            required: true,
            type: "numeric"
          },
          {
            name: "ratio_deuda_ingreso",
            description: "Proporción de deuda respecto a ingresos",
            example: 0.32,
            required: true,
            type: "numeric"
          },
          {
            name: "empleo_anos",
            description: "Años en el empleo actual",
            example: 5.5,
            required: true,
            type: "numeric"
          },
          {
            name: "prestamos_activos",
            description: "Número de préstamos activos",
            example: 2,
            required: true,
            type: "numeric"
          },
          {
            name: "impagos_anteriores",
            description: "Número de impagos en los últimos 24 meses",
            example: 0,
            required: true,
            type: "numeric"
          },
          {
            name: "edad",
            description: "Edad del solicitante",
            example: 42,
            required: false,
            type: "numeric"
          },
          {
            name: "propiedad_vivienda",
            description: "Tipo de propiedad de vivienda",
            example: "Hipoteca",
            required: false,
            type: "categorical"
          },
          {
            name: "proposito_prestamo",
            description: "Finalidad del préstamo solicitado",
            example: "Consolidación de deudas",
            required: false,
            type: "categorical"
          }
        ],
        outputInsights: [
          {
            name: "Scoring crediticio",
            description: "Puntuación de riesgo con probabilidad de impago",
            visualizationType: "Dashboard interactivo",
            businessValue: "Evaluación automatizada de solicitudes de crédito"
          },
          {
            name: "Factores de riesgo",
            description: "Principales variables que influyen en el riesgo",
            visualizationType: "Gráfico de importancia",
            businessValue: "Ajuste de políticas de crédito basadas en evidencia"
          },
          {
            name: "Segmentación de riesgo",
            description: "Agrupación de clientes por perfiles de riesgo similares",
            visualizationType: "Mapa de calor",
            businessValue: "Estrategias diferenciadas por segmento"
          }
        ]
      },
      {
        id: "market-risk-assessment",
        name: "Evaluación de riesgo de mercado",
        description: "Análisis de impacto de movimientos de mercado en portafolios",
        prerequisiteSteps: [],
        estimatedProcessingTime: "6-8 días",
        difficulty: "avanzado",
        modelType: "Value at Risk (VaR)/Monte Carlo",
        inputFields: [
          {
            name: "activo_id",
            description: "Identificador del instrumento financiero",
            example: "AAPL",
            required: true,
            type: "text"
          },
          {
            name: "fecha",
            description: "Fecha de la cotización",
            example: "2023-05-18",
            required: true,
            type: "date"
          },
          {
            name: "precio",
            description: "Precio de cierre del activo",
            example: 145.23,
            required: true,
            type: "numeric"
          },
          {
            name: "volumen",
            description: "Volumen de transacciones",
            example: 1250000,
            required: true,
            type: "numeric"
          },
          {
            name: "volatilidad",
            description: "Volatilidad histórica a 30 días",
            example: 0.18,
            required: false,
            type: "numeric"
          },
          {
            name: "ponderacion_cartera",
            description: "Peso del activo en el portafolio",
            example: 0.05,
            required: true,
            type: "numeric"
          },
          {
            name: "correlaciones",
            description: "Correlaciones con otros activos clave",
            example: "SPY:0.72,QQQ:0.81",
            required: false,
            type: "text"
          },
          {
            name: "riesgo_divisa",
            description: "Exposición a riesgo de tipo de cambio",
            example: "EUR:0.3,USD:0.7",
            required: false,
            type: "text"
          }
        ],
        outputInsights: [
          {
            name: "Value at Risk (VaR)",
            description: "Estimación de pérdida máxima potencial",
            visualizationType: "Gráfico de distribución",
            businessValue: "Cuantificación precisa del riesgo de mercado"
          },
          {
            name: "Análisis de escenarios",
            description: "Simulación de escenarios extremos de mercado",
            visualizationType: "Análisis de estrés",
            businessValue: "Preparación para eventos de mercado extremos"
          },
          {
            name: "Diversificación óptima",
            description: "Recomendaciones para optimizar la diversificación",
            visualizationType: "Frontera eficiente",
            businessValue: "Mejora de relación riesgo-rendimiento del portafolio"
          }
        ]
      },
      {
        id: "liquidity-risk-analysis",
        name: "Análisis de riesgo de liquidez",
        description: "Evaluación de la capacidad para cumplir obligaciones financieras",
        prerequisiteSteps: [],
        estimatedProcessingTime: "5-7 días",
        difficulty: "intermedio",
        modelType: "Cash Flow Forecast",
        inputFields: [
          {
            name: "fecha",
            description: "Fecha del flujo de caja",
            example: "2023-06-15",
            required: true,
            type: "date"
          },
          {
            name: "entradas_efectivo",
            description: "Ingresos de efectivo previstos",
            example: 1250000,
            required: true,
            type: "numeric"
          },
          {
            name: "salidas_efectivo",
            description: "Pagos y salidas previstas",
            example: 980000,
            required: true,
            type: "numeric"
          },
          {
            name: "obligaciones_corto_plazo",
            description: "Deudas con vencimiento en 30 días",
            example: 350000,
            required: true,
            type: "numeric"
          },
          {
            name: "activos_liquidos",
            description: "Activos convertibles en efectivo rápidamente",
            example: 3750000,
            required: true,
            type: "numeric"
          },
          {
            name: "lineas_credito",
            description: "Disponibilidad en líneas de crédito",
            example: 2000000,
            required: false,
            type: "numeric"
          },
          {
            name: "concentracion_depositantes",
            description: "Porcentaje de depósitos de los 10 mayores clientes",
            example: 0.35,
            required: false,
            type: "numeric"
          }
        ],
        outputInsights: [
          {
            name: "Proyección de liquidez",
            description: "Previsión de posición de liquidez a 30, 90 y 180 días",
            visualizationType: "Gráfico de cascada",
            businessValue: "Planificación anticipada de necesidades de liquidez"
          },
          {
            name: "Indicadores de alerta temprana",
            description: "Métricas clave para monitorear riesgos de liquidez",
            visualizationType: "Panel de control",
            businessValue: "Detección temprana de problemas potenciales"
          },
          {
            name: "Plan de contingencia",
            description: "Acciones recomendadas ante diferentes escenarios de estrés",
            visualizationType: "Plan de acción",
            businessValue: "Preparación para crisis de liquidez"
          }
        ]
      },
      {
        id: "integrated-risk-dashboard",
        name: "Dashboard integrado de riesgos",
        description: "Visión holística de todos los riesgos financieros",
        prerequisiteSteps: ["credit-risk-analysis", "market-risk-assessment", "liquidity-risk-analysis"],
        estimatedProcessingTime: "8-10 días",
        difficulty: "avanzado",
        modelType: "Consolidación analítica",
        inputFields: [
          {
            name: "fecha_analisis",
            description: "Fecha del análisis integrado",
            example: "2023-06-30",
            required: true,
            type: "date"
          },
          {
            name: "resultados_riesgo_credito",
            description: "Métricas agregadas de riesgo crediticio",
            example: "pérdida_esperada:1250000,ratio_morosidad:0.025",
            required: true,
            type: "text"
          },
          {
            name: "resultados_riesgo_mercado",
            description: "Métricas agregadas de riesgo de mercado",
            example: "var_95:1820000,var_99:2450000",
            required: true,
            type: "text"
          },
          {
            name: "resultados_riesgo_liquidez",
            description: "Métricas agregadas de riesgo de liquidez",
            example: "lcr:1.2,nsfr:1.05",
            required: true,
            type: "text"
          },
          {
            name: "limites_riesgo",
            description: "Límites establecidos para cada tipo de riesgo",
            example: "crédito:3000000,mercado:2500000,liquidez:1.0",
            required: true,
            type: "text"
          },
          {
            name: "correlaciones_riesgos",
            description: "Correlaciones entre diferentes tipos de riesgo",
            example: "crédito_mercado:0.4,mercado_liquidez:0.5,liquidez_crédito:0.3",
            required: false,
            type: "text"
          }
        ],
        outputInsights: [
          {
            name: "Mapa de calor de riesgos",
            description: "Visualización integrada de todas las exposiciones al riesgo",
            visualizationType: "Mapa de calor interactivo",
            businessValue: "Visión ejecutiva completa de la posición de riesgo"
          },
          {
            name: "Capital económico requerido",
            description: "Estimación del capital necesario para cubrir riesgos",
            visualizationType: "Gráfico de asignación",
            businessValue: "Optimización de la asignación de capital"
          },
          {
            name: "Análisis de interrelaciones",
            description: "Evaluación de cómo los riesgos se afectan entre sí",
            visualizationType: "Diagrama de red",
            businessValue: "Comprensión de efectos sistémicos y cascada"
          },
          {
            name: "Escenarios de estrés integrados",
            description: "Simulación de eventos extremos y su impacto holístico",
            visualizationType: "Tablero de escenarios",
            businessValue: "Preparación para crisis multifactoriales"
          }
        ]
      }
    ]
  },
  {
    id: "investment-portfolio-optimization",
    name: "Optimización de carteras de inversión",
    description: "Análisis y optimización de rendimiento de portafolios ajustados al riesgo",
    industry: "finanzas",
    businessGoal: "Maximizar el rendimiento de las carteras de inversión manteniendo niveles de riesgo aceptables y alineados con los objetivos de los clientes.",
    totalEstimatedTime: "3-4 semanas",
    recommendedTools: ["Python", "Power BI", "Monte Carlo", "Modern Portfolio Theory"],
    steps: [
      {
        id: "asset-performance-analysis",
        name: "Análisis de rendimiento de activos",
        description: "Evaluación histórica del comportamiento de diferentes clases de activos",
        prerequisiteSteps: [],
        estimatedProcessingTime: "4-6 días",
        difficulty: "intermedio",
        modelType: "análisis estadístico",
        inputFields: [
          {
            name: "activo_id",
            description: "Identificador del activo financiero",
            example: "MSFT",
            required: true,
            type: "text"
          },
          {
            name: "fecha",
            description: "Fecha de la cotización",
            example: "2023-05-10",
            required: true,
            type: "date"
          },
          {
            name: "precio_cierre",
            description: "Precio de cierre ajustado",
            example: 289.45,
            required: true,
            type: "numeric"
          },
          {
            name: "volumen",
            description: "Volumen negociado",
            example: 25000000,
            required: false,
            type: "numeric"
          },
          {
            name: "dividendo",
            description: "Dividendo pagado (si aplica)",
            example: 0.68,
            required: false,
            type: "numeric"
          },
          {
            name: "clase_activo",
            description: "Tipo de activo (acción, bono, etc.)",
            example: "Acción",
            required: true,
            type: "categorical"
          },
          {
            name: "sector",
            description: "Sector económico",
            example: "Tecnología",
            required: false,
            type: "categorical"
          },
          {
            name: "region",
            description: "Región geográfica",
            example: "Norteamérica",
            required: false,
            type: "categorical"
          }
        ],
        outputInsights: [
          {
            name: "Rendimiento histórico",
            description: "Análisis de rentabilidad en diferentes horizontes temporales",
            visualizationType: "Gráfico comparativo",
            businessValue: "Evaluación objetiva del desempeño pasado"
          },
          {
            name: "Métricas de riesgo",
            description: "Volatilidad, beta, downside risk y otras métricas",
            visualizationType: "Tabla de métricas",
            businessValue: "Cuantificación precisa de riesgos por activo"
          },
          {
            name: "Análisis de tendencias",
            description: "Identificación de tendencias y puntos de inflexión",
            visualizationType: "Gráfico técnico",
            businessValue: "Detección de oportunidades y riesgos emergentes"
          }
        ]
      },
      {
        id: "correlation-analysis",
        name: "Análisis de correlaciones",
        description: "Estudio de correlaciones entre diferentes activos y clases de activos",
        prerequisiteSteps: ["asset-performance-analysis"],
        estimatedProcessingTime: "3-4 días",
        difficulty: "intermedio",
        modelType: "correlación multivariante",
        inputFields: [
          {
            name: "rendimientos_diarios",
            description: "Matriz de rendimientos diarios por activo",
            example: "MSFT:0.015,AAPL:0.008,BND:-0.002",
            required: true,
            type: "text"
          },
          {
            name: "periodo_analisis",
            description: "Período para el cálculo de correlaciones",
            example: "1Y",
            required: true,
            type: "categorical"
          },
          {
            name: "condiciones_mercado",
            description: "Condición de mercado para análisis condicional",
            example: "Bull Market",
            required: false,
            type: "categorical"
          }
        ],
        outputInsights: [
          {
            name: "Matriz de correlación",
            description: "Visualización de correlaciones entre activos",
            visualizationType: "Mapa de calor",
            businessValue: "Identificación de oportunidades de diversificación"
          },
          {
            name: "Correlaciones dinámicas",
            description: "Evolución de correlaciones en diferentes períodos",
            visualizationType: "Gráfico de series temporales",
            businessValue: "Adaptación a cambios estructurales en mercados"
          },
          {
            name: "Análisis de clusters",
            description: "Agrupación de activos con comportamiento similar",
            visualizationType: "Dendrograma",
            businessValue: "Simplificación de decisiones de diversificación"
          }
        ]
      },
      {
        id: "efficient-frontier",
        name: "Construcción de frontera eficiente",
        description: "Generación de portafolios óptimos según Teoría Moderna de Portafolios",
        prerequisiteSteps: ["asset-performance-analysis", "correlation-analysis"],
        estimatedProcessingTime: "5-7 días",
        difficulty: "avanzado",
        modelType: "optimización cuadrática",
        inputFields: [
          {
            name: "universo_activos",
            description: "Lista de activos disponibles para la cartera",
            example: "MSFT,AAPL,AMZN,BND,VTI",
            required: true,
            type: "text"
          },
          {
            name: "rendimientos_esperados",
            description: "Rendimientos anualizados esperados por activo",
            example: "MSFT:0.12,AAPL:0.10,AMZN:0.14,BND:0.04,VTI:0.08",
            required: true,
            type: "text"
          },
          {
            name: "matriz_covarianza",
            description: "Matriz de covarianza entre activos",
            example: "[datos de matriz]",
            required: true,
            type: "text"
          },
          {
            name: "restricciones",
            description: "Restricciones de asignación mínima y máxima",
            example: "min:0.05,max:0.30",
            required: false,
            type: "text"
          },
          {
            name: "activo_libre_riesgo",
            description: "Rendimiento del activo libre de riesgo",
            example: 0.035,
            required: true,
            type: "numeric"
          },
          {
            name: "preferencia_riesgo",
            description: "Coeficiente de aversión al riesgo (1-10)",
            example: 6,
            required: true,
            type: "numeric"
          }
        ],
        outputInsights: [
          {
            name: "Frontera eficiente",
            description: "Visualización de la frontera eficiente de Markowitz",
            visualizationType: "Gráfico riesgo/retorno",
            businessValue: "Identificación visual de carteras óptimas"
          },
          {
            name: "Cartera óptima",
            description: "Asignación de activos para la cartera óptima según preferencia de riesgo",
            visualizationType: "Gráfico circular",
            businessValue: "Implementación directa de estrategia optimizada"
          },
          {
            name: "Análisis de contribución al riesgo",
            description: "Desglose de contribución de cada activo al riesgo total",
            visualizationType: "Gráfico de descomposición",
            businessValue: "Gestión precisa de fuentes de riesgo"
          }
        ]
      },
      {
        id: "monte-carlo-simulation",
        name: "Simulación Monte Carlo",
        description: "Proyección de escenarios futuros para la cartera optimizada",
        prerequisiteSteps: ["efficient-frontier"],
        estimatedProcessingTime: "6-8 días",
        difficulty: "avanzado",
        modelType: "simulación estocástica",
        inputFields: [
          {
            name: "composicion_cartera",
            description: "Pesos de cada activo en la cartera",
            example: "MSFT:0.25,AAPL:0.20,AMZN:0.15,BND:0.30,VTI:0.10",
            required: true,
            type: "text"
          },
          {
            name: "parametros_distribucion",
            description: "Parámetros estadísticos para la simulación",
            example: "media:0.09,volatilidad:0.15,asimetria:-0.2,curtosis:3.5",
            required: true,
            type: "text"
          },
          {
            name: "horizonte_inversion",
            description: "Horizonte temporal de la simulación (años)",
            example: 10,
            required: true,
            type: "numeric"
          },
          {
            name: "numero_simulaciones",
            description: "Número de simulaciones a ejecutar",
            example: 10000,
            required: true,
            type: "numeric"
          },
          {
            name: "aportes_periodicos",
            description: "Aportes periódicos a la cartera",
            example: 1000,
            required: false,
            type: "numeric"
          },
          {
            name: "inflacion_esperada",
            description: "Tasa de inflación anual esperada",
            example: 0.03,
            required: false,
            type: "numeric"
          }
        ],
        outputInsights: [
          {
            name: "Distribución de resultados",
            description: "Distribución probabilística de rentabilidades futuras",
            visualizationType: "Histograma interactivo",
            businessValue: "Comunicación realista de expectativas al cliente"
          },
          {
            name: "Análisis de riesgo de cola",
            description: "Evaluación de escenarios extremos adversos",
            visualizationType: "Gráfico de percentiles",
            businessValue: "Preparación para eventos de mercado extremos"
          },
          {
            name: "Probabilidad de objetivos",
            description: "Probabilidad de alcanzar diferentes objetivos financieros",
            visualizationType: "Dashboard de planificación",
            businessValue: "Alineación de inversiones con metas concretas del cliente"
          },
          {
            name: "Análisis de tasa de retiro",
            description: "Tasas de retiro sostenibles para jubilación",
            visualizationType: "Simulador interactivo",
            businessValue: "Planificación financiera precisa a largo plazo"
          }
        ]
      }
    ]
  },

  // EDUCATION FLOWS
  {
    id: "student-performance-prediction",
    name: "Predicción de rendimiento académico",
    description: "Análisis predictivo del desempeño estudiantil para intervenciones tempranas",
    industry: "educacion",
    businessGoal: "Identificar de manera temprana a estudiantes en riesgo académico para implementar medidas de apoyo oportunas y mejorar las tasas de retención y graduación.",
    totalEstimatedTime: "3-4 semanas",
    recommendedTools: ["R", "XGBoost", "Tableau", "RandomForest"],
    steps: [
      {
        id: "historical-data-analysis",
        name: "Análisis de datos históricos",
        description: "Exploración y preparación de datos académicos históricos",
        prerequisiteSteps: [],
        estimatedProcessingTime: "5-7 días",
        difficulty: "básico",
        modelType: "análisis exploratorio",
        inputFields: [
          {
            name: "estudiante_id",
            description: "Identificador único del estudiante",
            example: "EST-12345",
            required: true,
            type: "text"
          },
          {
            name: "semestre",
            description: "Período académico",
            example: "2023-1",
            required: true,
            type: "text"
          },
          {
            name: "asignatura_id",
            description: "Identificador de la asignatura cursada",
            example: "MAT101",
            required: true,
            type: "text"
          },
          {
            name: "calificacion",
            description: "Calificación obtenida (escala 0-10)",
            example: 7.5,
            required: true,
            type: "numeric"
          },
          {
            name: "asistencia",
            description: "Porcentaje de asistencia",
            example: 85,
            required: false,
            type: "numeric"
          },
          {
            name: "programa_academico",
            description: "Carrera o programa que cursa",
            example: "Ingeniería Informática",
            required: true,
            type: "categorical"
          },
          {
            name: "creditos_completados",
            description: "Créditos aprobados hasta el momento",
            example: 120,
            required: false,
            type: "numeric"
          },
          {
            name: "promedio_acumulado",
            description: "Promedio general acumulado",
            example: 8.2,
            required: false,
            type: "numeric"
          },
          {
            name: "datos_demograficos",
            description: "Información demográfica básica",
            example: "edad:20,sexo:M,región:Norte",
            required: false,
            type: "text"
          }
        ],
        outputInsights: [
          {
            name: "Patrones de desempeño",
            description: "Tendencias y patrones de rendimiento por programa y curso",
            visualizationType: "Mapas de calor",
            businessValue: "Identificación de áreas académicas críticas"
          },
          {
            name: "Distribución de calificaciones",
            description: "Análisis estadístico de calificaciones por asignatura",
            visualizationType: "Histogramas",
            businessValue: "Evaluación comparativa de dificultad por asignatura"
          },
          {
            name: "Correlaciones clave",
            description: "Relaciones entre variables académicas y desempeño",
            visualizationType: "Matriz de correlación",
            businessValue: "Identificación de factores predictivos tempranos"
          }
        ]
      },
      {
        id: "early-indicators-model",
        name: "Modelo de indicadores tempranos",
        description: "Desarrollo de modelo para identificar factores de riesgo tempranos",
        prerequisiteSteps: ["historical-data-analysis"],
        estimatedProcessingTime: "6-8 días",
        difficulty: "intermedio",
        modelType: "Random Forest/XGBoost",
        inputFields: [
          {
            name: "estudiante_id",
            description: "Identificador único del estudiante",
            example: "EST-12345",
            required: true,
            type: "text"
          },
          {
            name: "promedio_primer_semestre",
            description: "Promedio de calificaciones del primer semestre",
            example: 6.8,
            required: true,
            type: "numeric"
          },
          {
            name: "tasa_asistencia_inicial",
            description: "Porcentaje de asistencia en primeras semanas",
            example: 75,
            required: true,
            type: "numeric"
          },
          {
            name: "participacion_actividades",
            description: "Nivel de participación en actividades complementarias",
            example: "Bajo",
            required: false,
            type: "categorical"
          },
          {
            name: "uso_recursos_digitales",
            description: "Frecuencia de uso de plataforma educativa",
            example: 45,
            required: false,
            type: "numeric"
          },
          {
            name: "entregas_a_tiempo",
            description: "Porcentaje de trabajos entregados puntualmente",
            example: 80,
            required: true,
            type: "numeric"
          },
          {
            name: "dificultades_detectadas",
            description: "Áreas en las que se han identificado dificultades",
            example: "matemáticas,expresión escrita",
            required: false,
            type: "text"
          },
          {
            name: "tipo_bachillerato",
            description: "Tipo de educación secundaria previa",
            example: "Científico",
            required: false,
            type: "categorical"
          }
        ],
        outputInsights: [
          {
            name: "Indicadores de riesgo",
            description: "Factores tempranos que predicen dificultades académicas",
            visualizationType: "Gráfico de importancia",
            businessValue: "Focalización de recursos de apoyo donde son más necesarios"
          },
          {
            name: "Umbrales críticos",
            description: "Valores límite para cada indicador que señalan riesgo elevado",
            visualizationType: "Dashboard de alertas",
            businessValue: "Sistema de alerta temprana para intervención proactiva"
          },
          {
            name: "Perfiles de riesgo",
            description: "Agrupaciones de estudiantes según patrones similares de riesgo",
            visualizationType: "Segmentación visual",
            businessValue: "Estrategias de apoyo personalizadas por perfil"
          }
        ]
      },
      {
        id: "predictive-performance-model",
        name: "Modelo predictivo de rendimiento",
        description: "Predicción de calificaciones y riesgo de abandono",
        prerequisiteSteps: ["early-indicators-model"],
        estimatedProcessingTime: "7-10 días",
        difficulty: "avanzado",
        modelType: "Ensemble Learning",
        inputFields: [
          {
            name: "estudiante_id",
            description: "Identificador único del estudiante",
            example: "EST-12345",
            required: true,
            type: "text"
          },
          {
            name: "asignatura_id",
            description: "Identificador de la asignatura",
            example: "MAT101",
            required: true,
            type: "text"
          },
          {
            name: "indicadores_tempranos",
            description: "Resultados del modelo de indicadores tempranos",
            example: "riesgo_asistencia:alto,riesgo_participacion:medio",
            required: true,
            type: "text"
          },
          {
            name: "evaluaciones_parciales",
            description: "Calificaciones en evaluaciones parciales",
            example: "parcial1:6.5,parcial2:5.8",
            required: true,
            type: "text"
          },
          {
            name: "tendencia_calif",
            description: "Tendencia en calificaciones recientes",
            example: "descendente",
            required: false,
            type: "categorical"
          },
          {
            name: "historico_asignatura",
            description: "Estadísticas históricas de la asignatura",
            example: "tasa_aprobacion:65,dificultad:alta",
            required: false,
            type: "text"
          },
          {
            name: "carga_academica",
            description: "Número de créditos matriculados en el semestre",
            example: 28,
            required: true,
            type: "numeric"
          },
          {
            name: "apoyo_recibido",
            description: "Intervenciones de apoyo ya implementadas",
            example: "tutoría,taller_métodos_estudio",
            required: false,
            type: "text"
          }
        ],
        outputInsights: [
          {
            name: "Probabilidad de aprobación",
            description: "Predicción de probabilidad de aprobar cada asignatura",
            visualizationType: "Mapa de calor predictivo",
            businessValue: "Priorización de recursos de apoyo académico"
          },
          {
            name: "Riesgo de abandono",
            description: "Estimación del riesgo de deserción académica",
            visualizationType: "Indicador de riesgo",
            businessValue: "Prevención proactiva de la deserción estudiantil"
          },
          {
            name: "Proyección de calificaciones",
            description: "Calificación final esperada por asignatura",
            visualizationType: "Dashboard predictivo",
            businessValue: "Planificación anticipada de refuerzos académicos"
          }
        ]
      },
      {
        id: "intervention-recommendation",
        name: "Recomendación de intervenciones",
        description: "Sistema de recomendación de estrategias de apoyo personalizadas",
        prerequisiteSteps: ["predictive-performance-model"],
        estimatedProcessingTime: "5-7 días",
        difficulty: "intermedio",
        modelType: "Sistemas de recomendación",
        inputFields: [
          {
            name: "estudiante_id",
            description: "Identificador único del estudiante",
            example: "EST-12345",
            required: true,
            type: "text"
          },
          {
            name: "perfil_riesgo",
            description: "Perfil de riesgo identificado",
            example: "Alto riesgo académico, dificultades en materias cuantitativas",
            required: true,
            type: "text"
          },
          {
            name: "areas_dificultad",
            description: "Áreas académicas con dificultades identificadas",
            example: "matemáticas,estadística",
            required: true,
            type: "text"
          },
          {
            name: "estilo_aprendizaje",
            description: "Estilo de aprendizaje predominante",
            example: "Visual",
            required: false,
            type: "categorical"
          },
          {
            name: "disponibilidad_horaria",
            description: "Disponibilidad para actividades de refuerzo",
            example: "tardes,fines_semana",
            required: false,
            type: "text"
          },
          {
            name: "intervenciones_previas",
            description: "Historial de intervenciones anteriores y su efectividad",
            example: "tutoría:alta,taller:baja",
            required: false,
            type: "text"
          },
          {
            name: "recursos_disponibles",
            description: "Recursos institucionales disponibles actualmente",
            example: "tutorías,talleres,asesoría_psicoeducativa",
            required: true,
            type: "text"
          }
        ],
        outputInsights: [
          {
            name: "Plan de intervención",
            description: "Recomendaciones específicas de apoyo por estudiante",
            visualizationType: "Plan personalizado",
            businessValue: "Maximización de efectividad de recursos de apoyo"
          },
          {
            name: "Priorización de intervenciones",
            description: "Ranking de efectividad esperada de diferentes intervenciones",
            visualizationType: "Gráfico de impacto",
            businessValue: "Optimización de resultados con recursos limitados"
          },
          {
            name: "Calendario de seguimiento",
            description: "Planificación temporal de intervenciones y evaluaciones",
            visualizationType: "Calendario interactivo",
            businessValue: "Implementación sistemática y evaluación de resultados"
          },
          {
            name: "Análisis de efectividad",
            description: "Estimación de mejora esperada por tipo de intervención",
            visualizationType: "Proyección comparativa",
            businessValue: "Justificación de inversión en programas de apoyo"
          }
        ]
      }
    ]
  },
  {
    id: "educational-resource-optimization",
    name: "Optimización de recursos educativos",
    description: "Análisis para la asignación eficiente de recursos docentes y materiales",
    industry: "educacion",
    businessGoal: "Maximizar el impacto educativo mediante la distribución óptima de recursos limitados, considerando necesidades específicas de estudiantes y programas.",
    totalEstimatedTime: "2-3 semanas",
    recommendedTools: ["Python", "Tableau", "Optimización lineal"],
    steps: [
      {
        id: "resource-utilization-analysis",
        name: "Análisis de utilización de recursos",
        description: "Evaluación del uso actual de recursos educativos",
        prerequisiteSteps: [],
        estimatedProcessingTime: "4-5 días",
        difficulty: "básico",
        modelType: "análisis descriptivo",
        inputFields: [
          {
            name: "recurso_id",
            description: "Identificador del recurso (aula, laboratorio, etc.)",
            example: "LAB-COMP-01",
            required: true,
            type: "text"
          },
          {
            name: "tipo_recurso",
            description: "Categoría del recurso",
            example: "Laboratorio",
            required: true,
            type: "categorical"
          },
          {
            name: "capacidad",
            description: "Capacidad máxima (si aplica)",
            example: 30,
            required: false,
            type: "numeric"
          },
          {
            name: "fecha",
            description: "Fecha de uso",
            example: "2023-04-15",
            required: true,
            type: "date"
          },
          {
            name: "hora_inicio",
            description: "Hora de inicio de uso",
            example: "10:00",
            required: true,
            type: "text"
          },
          {
            name: "hora_fin",
            description: "Hora de finalización de uso",
            example: "12:00",
            required: true,
            type: "text"
          },
          {
            name: "actividad",
            description: "Tipo de actividad realizada",
            example: "Clase teórica",
            required: true,
            type: "categorical"
          },
          {
            name: "programa_id",
            description: "Programa académico que utiliza el recurso",
            example: "ING-SISTEMAS",
            required: true,
            type: "text"
          },
          {
            name: "numero_asistentes",
            description: "Cantidad de personas que utilizaron el recurso",
            example: 25,
            required: false,
            type: "numeric"
          }
        ],
        outputInsights: [
          {
            name: "Mapa de uso",
            description: "Visualización de la utilización de espacios y recursos por hora/día",
            visualizationType: "Mapa de calor temporal",
            businessValue: "Identificación de recursos subutilizados y sobrecargados"
          },
          {
            name: "Eficiencia de ocupación",
            description: "Análisis de la relación entre capacidad y ocupación real",
            visualizationType: "Gráfico de barras",
            businessValue: "Optimización del tamaño y distribución de grupos"
          },
          {
            name: "Patrones de uso",
            description: "Identificación de patrones temporales y estacionales",
            visualizationType: "Gráfico de tendencias",
            businessValue: "Planificación anticipada de necesidades de recursos"
          }
        ]
      },
      {
        id: "demand-forecasting",
        name: "Pronóstico de demanda educativa",
        description: "Predicción de necesidades futuras de recursos por programa",
        prerequisiteSteps: ["resource-utilization-analysis"],
        estimatedProcessingTime: "5-7 días",
        difficulty: "intermedio",
        modelType: "series temporales",
        inputFields: [
          {
            name: "periodo",
            description: "Periodo académico",
            example: "2023-1",
            required: true,
            type: "text"
          },
          {
            name: "programa_id",
            description: "Programa académico",
            example: "ING-SISTEMAS",
            required: true,
            type: "text"
          },
          {
            name: "matriculados",
            description: "Número de estudiantes matriculados",
            example: 120,
            required: true,
            type: "numeric"
          },
          {
            name: "cursos_ofrecidos",
            description: "Número de cursos ofrecidos",
            example: 15,
            required: true,
            type: "numeric"
          },
          {
            name: "horas_teoricas",
            description: "Total de horas teóricas requeridas",
            example: 450,
            required: true,
            type: "numeric"
          },
          {
            name: "horas_practicas",
            description: "Total de horas prácticas requeridas",
            example: 300,
            required: true,
            type: "numeric"
          },
          {
            name: "factores_externos",
            description: "Factores que pueden influir en la demanda",
            example: "nueva_normativa,cambio_plan_estudios",
            required: false,
            type: "text"
          },
          {
            name: "tendencia_inscripciones",
            description: "Tendencia de inscripciones (últimos 3 periodos)",
            example: "creciente",
            required: false,
            type: "categorical"
          }
        ],
        outputInsights: [
          {
            name: "Proyección de matriculación",
            description: "Previsión de inscripciones por programa y nivel",
            visualizationType: "Gráfico de proyección",
            businessValue: "Anticipación de necesidades de personal y espacios"
          },
          {
            name: "Necesidades por tipo de recurso",
            description: "Estimación de la demanda futura por tipo de recurso",
            visualizationType: "Dashboard predictivo",
            businessValue: "Planificación proactiva de inversiones en infraestructura"
          },
          {
            name: "Escenarios de crecimiento",
            description: "Simulación de diferentes escenarios de crecimiento",
            visualizationType: "Análisis de escenarios",
            businessValue: "Preparación para múltiples futuros posibles"
          }
        ]
      },
      {
        id: "resource-allocation-model",
        name: "Modelo de asignación óptima",
        description: "Sistema de optimización para distribución eficiente de recursos",
        prerequisiteSteps: ["demand-forecasting"],
        estimatedProcessingTime: "6-8 días",
        difficulty: "avanzado",
        modelType: "optimización lineal",
        inputFields: [
          {
            name: "recurso_id",
            description: "Identificador del recurso disponible",
            example: "AULA-205",
            required: true,
            type: "text"
          },
          {
            name: "disponibilidad_semanal",
            description: "Horas disponibles semanalmente",
            example: 40,
            required: true,
            type: "numeric"
          },
          {
            name: "caracteristicas",
            description: "Características especiales del recurso",
            example: "proyector,internet,capacidad:40",
            required: true,
            type: "text"
          },
          {
            name: "ubicacion",
            description: "Ubicación del recurso",
            example: "Edificio A, Piso 2",
            required: true,
            type: "text"
          },
          {
            name: "costo_operativo",
            description: "Costo por hora de operación",
            example: 45,
            required: false,
            type: "numeric"
          },
          {
            name: "curso_id",
            description: "Identificadores de cursos que requieren asignación",
            example: "MAT101,FIS202,PROG303",
            required: true,
            type: "text"
          },
          {
            name: "requisitos_cursos",
            description: "Requisitos específicos por curso",
            example: "MAT101:aula_normal,FIS202:laboratorio,PROG303:sala_computadoras",
            required: true,
            type: "text"
          },
          {
            name: "horas_requeridas",
            description: "Horas semanales requeridas por curso",
            example: "MAT101:4,FIS202:6,PROG303:8",
            required: true,
            type: "text"
          },
          {
            name: "restricciones_horario",
            description: "Restricciones horarias específicas",
            example: "MAT101:mañanas,FIS202:no_viernes",
            required: false,
            type: "text"
          },
          {
            name: "prioridades",
            description: "Nivel de prioridad por curso (1-5)",
            example: "MAT101:5,FIS202:3,PROG303:4",
            required: false,
            type: "text"
          }
        ],
        outputInsights: [
          {
            name: "Asignación óptima",
            description: "Plan óptimo de distribución de recursos por curso",
            visualizationType: "Horario visual",
            businessValue: "Maximización de uso eficiente de la infraestructura"
          },
          {
            name: "Análisis de restricciones",
            description: "Identificación de cuellos de botella en la asignación",
            visualizationType: "Diagrama de impacto",
            businessValue: "Focalización de inversiones en recursos críticos"
          },
          {
            name: "Escenarios comparativos",
            description: "Comparación de diferentes modelos de asignación",
            visualizationType: "Análisis de trade-offs",
            businessValue: "Selección de estrategia óptima según prioridades institucionales"
          }
        ]
      },
      {
        id: "impact-analysis",
        name: "Análisis de impacto educativo",
        description: "Evaluación del efecto de la distribución de recursos en resultados académicos",
        prerequisiteSteps: ["resource-allocation-model"],
        estimatedProcessingTime: "5-6 días",
        difficulty: "intermedio",
        modelType: "análisis causal",
        inputFields: [
          {
            name: "curso_id",
            description: "Identificador del curso",
            example: "MAT101",
            required: true,
            type: "text"
          },
          {
            name: "periodo",
            description: "Periodo académico",
            example: "2023-1",
            required: true,
            type: "text"
          },
          {
            name: "recursos_asignados",
            description: "Recursos asignados al curso",
            example: "aula:AULA-205,laboratorio:LAB-03,horas_profesor:60",
            required: true,
            type: "text"
          },
          {
            name: "calidad_recursos",
            description: "Evaluación de la calidad de los recursos (1-5)",
            example: 4,
            required: false,
            type: "numeric"
          },
          {
            name: "resultados_academicos",
            description: "Indicadores de rendimiento académico",
            example: "promedio:7.8,tasa_aprobacion:85,asistencia:78",
            required: true,
            type: "text"
          },
          {
            name: "satisfaccion_estudiantes",
            description: "Nivel de satisfacción con recursos (1-10)",
            example: 7.5,
            required: false,
            type: "numeric"
          },
          {
            name: "satisfaccion_docentes",
            description: "Nivel de satisfacción docente con recursos (1-10)",
            example: 8,
            required: false,
            type: "numeric"
          }
        ],
        outputInsights: [
          {
            name: "Correlación recursos-resultados",
            description: "Análisis de la relación entre recursos y rendimiento académico",
            visualizationType: "Gráfico de correlación",
            businessValue: "Validación del impacto de inversiones en recursos"
          },
          {
            name: "ROI educativo",
            description: "Estimación del retorno educativo por tipo de recurso",
            visualizationType: "Análisis de eficiencia",
            businessValue: "Priorización de recursos con mayor impacto por costo"
          },
          {
            name: "Recomendaciones de mejora",
            description: "Sugerencias específicas para optimizar la asignación",
            visualizationType: "Dashboard de recomendaciones",
            businessValue: "Mejora continua del proceso de distribución de recursos"
          },
          {
            name: "Previsión de impacto",
            description: "Proyección de resultados esperados tras ajustes",
            visualizationType: "Gráfico de proyección",
            businessValue: "Establecimiento de objetivos realistas y medibles"
          }
        ]
      }
    ]
  },

  // MANUFACTURING FLOWS
  {
    id: "predictive-maintenance",
    name: "Mantenimiento predictivo industrial",
    description: "Predicción avanzada de fallos en equipos industriales",
    industry: "manufactura",
    businessGoal: "Reducir tiempos de inactividad no planificados, optimizar costos de mantenimiento y extender la vida útil de los activos industriales.",
    totalEstimatedTime: "2-3 meses",
    recommendedTools: ["Python", "IoT Analytics", "XGBoost", "PowerBI"],
    steps: [
      {
        id: "equipment-data-collection",
        name: "Recopilación de datos de equipos",
        description: "Captura y preprocesamiento de datos de sensores y equipos",
        prerequisiteSteps: [],
        estimatedProcessingTime: "2-3 semanas",
        difficulty: "intermedio",
        modelType: "preprocesamiento IoT",
        inputFields: [
          {
            name: "equipo_id",
            description: "Identificador único del equipo",
            example: "PUMP-A102",
            required: true,
            type: "text"
          },
          {
            name: "timestamp",
            description: "Fecha y hora de la lectura",
            example: "2023-06-15 14:30:22",
            required: true,
            type: "date"
          },
          {
            name: "sensor_id",
            description: "Identificador del sensor",
            example: "TEMP-S01",
            required: true,
            type: "text"
          },
          {
            name: "valor",
            description: "Lectura del sensor",
            example: 85.4,
            required: true,
            type: "numeric"
          },
          {
            name: "unidad",
            description: "Unidad de medida",
            example: "°C",
            required: true,
            type: "text"
          },
          {
            name: "estado_operativo",
            description: "Estado de operación del equipo",
            example: "normal",
            required: false,
            type: "categorical"
          },
          {
            name: "carga_trabajo",
            description: "Nivel de carga o utilización (%)",
            example: 75,
            required: false,
            type: "numeric"
          },
          {
            name: "vibracion",
            description: "Nivel de vibración registrado",
            example: 0.15,
            required: false,
            type: "numeric"
          },
          {
            name: "ruido",
            description: "Nivel de ruido en dB",
            example: 68,
            required: false,
            type: "numeric"
          },
          {
            name: "temperatura_ambiente",
            description: "Temperatura ambiental",
            example: 24,
            required: false,
            type: "numeric"
          }
        ],
        outputInsights: [
          {
            name: "Patrones operativos",
            description: "Identificación de patrones normales y anómalos en funcionamiento",
            visualizationType: "Series temporales",
            businessValue: "Establecimiento de líneas base para detección de anomalías"
          },
          {
            name: "Correlaciones entre sensores",
            description: "Análisis de relaciones entre diferentes parámetros",
            visualizationType: "Matriz de correlación",
            businessValue: "Comprensión integral del comportamiento de equipos"
          },
          {
            name: "Calidad de datos",
            description: "Evaluación de integridad y confiabilidad de datos",
            visualizationType: "Dashboard de calidad",
            businessValue: "Garantía de base sólida para modelos predictivos"
          }
        ]
      },
      {
        id: "failure-pattern-recognition",
        name: "Reconocimiento de patrones de fallos",
        description: "Identificación de señales que preceden a fallos de equipos",
        prerequisiteSteps: ["equipment-data-collection"],
        estimatedProcessingTime: "3-4 semanas",
        difficulty: "avanzado",
        modelType: "machine learning supervisado",
        inputFields: [
          {
            name: "equipo_id",
            description: "Identificador único del equipo",
            example: "PUMP-A102",
            required: true,
            type: "text"
          },
          {
            name: "historico_lecturas",
            description: "Serie temporal de lecturas de sensores clave",
            example: "[serie de datos]",
            required: true,
            type: "text"
          },
          {
            name: "eventos_fallo",
            description: "Registro histórico de fallos",
            example: "fecha:2023-02-15,tipo:sobrecalentamiento,componente:rodamiento",
            required: true,
            type: "text"
          },
          {
            name: "tipo_equipo",
            description: "Categoría del equipo",
            example: "Bomba centrífuga",
            required: true,
            type: "categorical"
          },
          {
            name: "fabricante",
            description: "Fabricante del equipo",
            example: "Siemens",
            required: false,
            type: "categorical"
          },
          {
            name: "modelo",
            description: "Modelo específico",
            example: "XC-5000",
            required: false,
            type: "text"
          },
          {
            name: "edad_equipo",
            description: "Años desde la instalación",
            example: 4.5,
            required: true,
            type: "numeric"
          },
          {
            name: "mantenimientos_previos",
            description: "Historial de mantenimientos realizados",
            example: "fecha:2022-11-10,tipo:preventivo,componentes:filtros,rodamientos",
            required: false,
            type: "text"
          }
        ],
        outputInsights: [
          {
            name: "Precursores de fallos",
            description: "Patrones específicos que preceden cada tipo de fallo",
            visualizationType: "Patrones de anomalías",
            businessValue: "Detección temprana de potenciales fallos"
          },
          {
            name: "Modos de fallo frecuentes",
            description: "Categorización y frecuencia de diferentes tipos de fallos",
            visualizationType: "Gráfico de Pareto",
            businessValue: "Priorización de esfuerzos de mantenimiento"
          },
          {
            name: "Curvas de degradación",
            description: "Trayectorias típicas hacia el fallo por tipo de equipo",
            visualizationType: "Curvas de vida útil",
            businessValue: "Planificación proactiva de reemplazos"
          }
        ]
      },
      {
        id: "predictive-model-development",
        name: "Desarrollo de modelo predictivo",
        description: "Construcción de algoritmos para predecir fallos futuros",
        prerequisiteSteps: ["failure-pattern-recognition"],
        estimatedProcessingTime: "4-5 semanas",
        difficulty: "avanzado",
        modelType: "ensemble learning",
        inputFields: [
          {
            name: "historico_operacion",
            description: "Historial completo de operación y fallos",
            example: "[conjunto de datos]",
            required: true,
            type: "text"
          },
          {
            name: "features_seleccionados",
            description: "Variables seleccionadas como predictoras",
            example: "temperatura,vibracion,presion,corriente",
            required: true,
            type: "text"
          },
          {
            name: "horizonte_prediccion",
            description: "Tiempo de anticipación deseado para alertas",
            example: 168,
            required: true,
            type: "numeric"
          },
          {
            name: "tipos_fallo_objetivo",
            description: "Tipos de fallos que se busca predecir",
            example: "rodamiento,sobrecalentamiento,cavitacion",
            required: true,
            type: "text"
          },
          {
            name: "umbral_confianza",
            description: "Nivel mínimo de confianza para alertas",
            example: 0.85,
            required: true,
            type: "numeric"
          },
          {
            name: "costo_falso_positivo",
            description: "Costo estimado de falsa alarma",
            example: 1000,
            required: false,
            type: "numeric"
          },
          {
            name: "costo_falso_negativo",
            description: "Costo estimado de fallo no detectado",
            example: 75000,
            required: false,
            type: "numeric"
          }
        ],
        outputInsights: [
          {
            name: "Modelo predictivo",
            description: "Sistema capaz de predecir fallos con anticipación",
            visualizationType: "Dashboard predictivo",
            businessValue: "Prevención proactiva de paradas no planificadas"
          },
          {
            name: "Indicadores de salud",
            description: "Índices compuestos de salud de equipos",
            visualizationType: "Indicadores RUL",
            businessValue: "Monitoreo claro del estado de activos críticos"
          },
          {
            name: "Confiabilidad predictiva",
            description: "Métricas de precisión y confiabilidad del modelo",
            visualizationType: "Matrices de confusión",
            businessValue: "Validación de la efectividad del sistema"
          }
        ]
      },
      {
        id: "maintenance-optimization",
        name: "Optimización del plan de mantenimiento",
        description: "Diseño de estrategias óptimas basadas en predicciones",
        prerequisiteSteps: ["predictive-model-development"],
        estimatedProcessingTime: "3-4 semanas",
        difficulty: "intermedio",
        modelType: "optimización de decisiones",
        inputFields: [
          {
            name: "predicciones_fallo",
            description: "Predicciones generadas por el modelo",
            example: "equipo:PUMP-A102,probabilidad_fallo:0.78,tiempo_estimado:340h",
            required: true,
            type: "text"
          },
          {
            name: "recursos_disponibles",
            description: "Recursos de mantenimiento disponibles",
            example: "tecnicos:5,horas_disponibles:160,presupuesto:25000",
            required: true,
            type: "text"
          },
          {
            name: "criticidad_equipos",
            description: "Nivel de importancia operativa de cada equipo",
            example: "PUMP-A102:alto,COMP-B201:medio,VALVE-C033:bajo",
            required: true,
            type: "text"
          },
          {
            name: "costo_reparacion",
            description: "Costo estimado de reparación por tipo de fallo",
            example: "rodamiento:2500,motor:8500,sello:1200",
            required: true,
            type: "text"
          },
          {
            name: "tiempo_reparacion",
            description: "Tiempo necesario por tipo de intervención",
            example: "preventivo_menor:4h,preventivo_mayor:16h,correctivo:24h",
            required: true,
            type: "text"
          },
          {
            name: "ventanas_mantenimiento",
            description: "Períodos disponibles para mantenimiento",
            example: "lunes:8-12,miércoles:13-17,sábado:8-16",
            required: false,
            type: "text"
          },
          {
            name: "impacto_produccion",
            description: "Costo por hora de parada de producción",
            example: "línea_A:5000,línea_B:3500,línea_C:2800",
            required: false,
            type: "text"
          }
        ],
        outputInsights: [
          {
            name: "Plan optimizado",
            description: "Calendario óptimo de intervenciones preventivas",
            visualizationType: "Horario interactivo",
            businessValue: "Reducción de costos y tiempos de inactividad"
          },
          {
            name: "Análisis de riesgo",
            description: "Evaluación de riesgos operativos residuales",
            visualizationType: "Mapa de riesgos",
            businessValue: "Gestión estratégica de riesgos industriales"
          },
          {
            name: "Previsión presupuestaria",
            description: "Proyección de costos de mantenimiento e inventario",
            visualizationType: "Forecast financiero",
            businessValue: "Planificación precisa de recursos financieros"
          },
          {
            name: "Impacto en OEE",
            description: "Estimación de mejora en eficiencia global de equipos",
            visualizationType: "Tendencia OEE",
            businessValue: "Cuantificación del retorno de inversión"
          }
        ]
      }
    ]
  },

  // HEALTHCARE FLOWS
  {
    id: "patient-risk-stratification",
    name: "Estratificación de riesgo de pacientes",
    description: "Identificación de pacientes con mayor riesgo de complicaciones para intervenciones preventivas",
    industry: "salud",
    businessGoal: "Mejorar resultados clínicos mediante la identificación temprana de pacientes de alto riesgo y la implementación de intervenciones preventivas personalizadas.",
    totalEstimatedTime: "2-3 meses",
    recommendedTools: ["R", "Python", "Tableau", "XGBoost"],
    steps: [
      {
        id: "patient-data-integration",
        name: "Integración de datos del paciente",
        description: "Consolidación de datos clínicos, demográficos y administrativos",
        prerequisiteSteps: [],
        estimatedProcessingTime: "3-4 semanas",
        difficulty: "intermedio",
        modelType: "ETL médico",
        inputFields: [
          {
            name: "paciente_id",
            description: "Identificador único del paciente",
            example: "PAC-120589",
            required: true,
            type: "text"
          },
          {
            name: "datos_demograficos",
            description: "Información demográfica básica",
            example: "edad:65,género:F,código_postal:28046",
            required: true,
            type: "text"
          },
          {
            name: "diagnosticos",
            description: "Códigos ICD-10 de diagnósticos",
            example: "E11.9,I10,E78.5",
            required: true,
            type: "text"
          },
          {
            name: "medicacion",
            description: "Medicamentos actuales",
            example: "metformina,lisinopril,atorvastatina",
            required: true,
            type: "text"
          },
          {
            name: "resultados_laboratorio",
            description: "Resultados recientes de pruebas de laboratorio",
            example: "glucosa:148,HbA1c:7.2,colesterol:210",
            required: true,
            type: "text"
          },
          {
            name: "signos_vitales",
            description: "Signos vitales recientes",
            example: "presión:145/90,pulso:78,temperatura:36.7",
            required: true,
            type: "text"
          },
          {
            name: "hospitalizaciones",
            description: "Historial de hospitalizaciones (últimos 12 meses)",
            example: "fecha:2023-01-15,duración:3,motivo:hipoglucemia",
            required: false,
            type: "text"
          },
          {
            name: "visitas_emergencia",
            description: "Visitas a urgencias (últimos 12 meses)",
            example: "fecha:2023-03-22,motivo:dolor_torácico",
            required: false,
            type: "text"
          },
          {
            name: "comorbilidades",
            description: "Condiciones crónicas diagnosticadas",
            example: "diabetes,hipertensión,dislipidemia",
            required: true,
            type: "text"
          },
          {
            name: "adherencia_tratamiento",
            description: "Nivel estimado de adherencia al tratamiento (%)",
            example: 75,
            required: false,
            type: "numeric"
          }
        ],
        outputInsights: [
          {
            name: "Perfil clínico completo",
            description: "Visualización 360 de la situación clínica del paciente",
            visualizationType: "Ficha interactiva",
            businessValue: "Base completa para evaluación precisa de riesgos"
          },
          {
            name: "Tendencias temporales",
            description: "Evolución de parámetros clínicos clave",
            visualizationType: "Series temporales",
            businessValue: "Identificación temprana de deterioro clínico"
          },
          {
            name: "Gaps asistenciales",
            description: "Identificación de áreas de atención incompleta",
            visualizationType: "Checklist clínico",
            businessValue: "Mejora en la continuidad y calidad asistencial"
          }
        ]
      },
      {
        id: "condition-specific-risk",
        name: "Análisis de riesgos específicos por condición",
        description: "Evaluación de riesgos para patologías crónicas específicas",
        prerequisiteSteps: ["patient-data-integration"],
        estimatedProcessingTime: "3-4 semanas",
        difficulty: "avanzado",
        modelType: "modelos clínicos predictivos",
        inputFields: [
          {
            name: "paciente_id",
            description: "Identificador único del paciente",
            example: "PAC-120589",
            required: true,
            type: "text"
          },
          {
            name: "condicion",
            description: "Condición clínica para evaluar",
            example: "diabetes",
            required: true,
            type: "categorical"
          },
          {
            name: "parametros_clinicos",
            description: "Parámetros específicos de la condición",
            example: "HbA1c:7.2,glucosa_ayuno:148,microalbuminuria:40",
            required: true,
            type: "text"
          },
          {
            name: "tiempo_diagnostico",
            description: "Años desde el diagnóstico",
            example: 8.5,
            required: true,
            type: "numeric"
          },
          {
            name: "complicaciones",
            description: "Complicaciones ya presentes",
            example: "retinopatía_leve,neuropatía_periférica",
            required: false,
            type: "text"
          },
          {
            name: "factores_riesgo",
            description: "Factores de riesgo adicionales",
            example: "tabaquismo,obesidad,sedentarismo",
            required: true,
            type: "text"
          },
          {
            name: "tratamiento_actual",
            description: "Régimen de tratamiento actual",
            example: "metformina_1000mg:2,insulina_glargina_20U:1",
            required: true,
            type: "text"
          },
          {
            name: "adherencia_especifica",
            description: "Adherencia específica al tratamiento de esta condición (%)",
            example: 65,
            required: false,
            type: "numeric"
          }
        ],
        outputInsights: [
          {
            name: "Score de riesgo",
            description: "Puntuación de riesgo para complicaciones específicas",
            visualizationType: "Panel de riesgo",
            businessValue: "Priorización eficiente de intervenciones preventivas"
          },
          {
            name: "Proyección de complicaciones",
            description: "Probabilidad de desarrollar complicaciones en diferentes horizontes temporales",
            visualizationType: "Gráfico predictivo",
            businessValue: "Planificación anticipada de cuidados avanzados"
          },
          {
            name: "Factores modificables",
            description: "Identificación de factores de riesgo modificables con mayor impacto",
            visualizationType: "Gráfico de impacto",
            businessValue: "Focalización de esfuerzos en intervenciones de mayor eficacia"
          }
        ]
      },
      {
        id: "readmission-risk",
        name: "Predicción de riesgo de reingreso",
        description: "Evaluación del riesgo de rehospitalización tras el alta",
        prerequisiteSteps: ["patient-data-integration"],
        estimatedProcessingTime: "2-3 semanas",
        difficulty: "avanzado",
        modelType: "machine learning con datos temporales",
        inputFields: [
          {
            name: "paciente_id",
            description: "Identificador único del paciente",
            example: "PAC-120589",
            required: true,
            type: "text"
          },
          {
            name: "admision_id",
            description: "Identificador de la hospitalización actual",
            example: "ADM-F32698",
            required: true,
            type: "text"
          },
          {
            name: "diagnostico_principal",
            description: "Diagnóstico principal de la hospitalización",
            example: "J44.1",
            required: true,
            type: "text"
          },
          {
            name: "diagnosticos_secundarios",
            description: "Diagnósticos secundarios",
            example: "I50.9,J96.0,E11.9",
            required: true,
            type: "text"
          },
          {
            name: "duracion_estancia",
            description: "Duración prevista de la hospitalización (días)",
            example: 6,
            required: true,
            type: "numeric"
          },
          {
            name: "hospitalizaciones_previas",
            description: "Número de hospitalizaciones en los últimos 12 meses",
            example: 2,
            required: true,
            type: "numeric"
          },
          {
            name: "polifarmacia",
            description: "Número de medicamentos al alta",
            example: 9,
            required: true,
            type: "numeric"
          },
          {
            name: "soporte_social",
            description: "Nivel de soporte social (bajo, medio, alto)",
            example: "bajo",
            required: false,
            type: "categorical"
          },
          {
            name: "capacidad_funcional",
            description: "Índice de Barthel o similar",
            example: 65,
            required: false,
            type: "numeric"
          },
          {
            name: "estatus_alta",
            description: "Condiciones previstas para el alta",
            example: "domicilio_con_apoyo",
            required: true,
            type: "categorical"
          }
        ],
        outputInsights: [
          {
            name: "Riesgo de reingreso a 30 días",
            description: "Probabilidad de rehospitalización en los primeros 30 días tras el alta",
            visualizationType: "Indicador de riesgo",
            businessValue: "Prevención de reingresos y penalizaciones asociadas"
          },
          {
            name: "Factores críticos",
            description: "Variables con mayor influencia en el riesgo de reingreso",
            visualizationType: "Gráfico de contribución",
            businessValue: "Diseño de intervenciones específicas pre-alta"
          },
          {
            name: "Plan de transición asistencial",
            description: "Recomendaciones personalizadas para la transición hospital-domicilio",
            visualizationType: "Plan de cuidados",
            businessValue: "Mejora en la continuidad asistencial post-alta"
          }
        ]
      },
      {
        id: "intervention-planning",
        name: "Planificación de intervenciones",
        description: "Diseño de plan de intervenciones personalizado según perfil de riesgo",
        prerequisiteSteps: ["condition-specific-risk", "readmission-risk"],
        estimatedProcessingTime: "2-3 semanas",
        difficulty: "intermedio",
        modelType: "sistemas de soporte a la decisión",
        inputFields: [
          {
            name: "paciente_id",
            description: "Identificador único del paciente",
            example: "PAC-120589",
            required: true,
            type: "text"
          },
          {
            name: "perfil_riesgo",
            description: "Clasificación de riesgo agregada",
            example: "alto_cardiovascular,moderado_readmision,bajo_renal",
            required: true,
            type: "text"
          },
          {
            name: "recursos_disponibles",
            description: "Servicios asistenciales disponibles",
            example: "enfermera_gestora,televigilancia,rehabilitacion_domiciliaria",
            required: true,
            type: "text"
          },
          {
            name: "preferencias_paciente",
            description: "Preferencias expresadas por el paciente",
            example: "prefiere_atencion_domiciliaria,rechaza_polifarmacia",
            required: false,
            type: "text"
          },
          {
            name: "barreras_identificadas",
            description: "Obstáculos potenciales para las intervenciones",
            example: "bajo_nivel_socioeconomico,problemas_movilidad,baja_alfabetizacion_salud",
            required: false,
            type: "text"
          },
          {
            name: "intervenciones_previas",
            description: "Intervenciones ya realizadas y su efectividad",
            example: "educacion_diabetica:efectiva,dieta:inefectiva",
            required: false,
            type: "text"
          },
          {
            name: "presupuesto_disponible",
            description: "Recursos económicos asignables por paciente",
            example: 1500,
            required: false,
            type: "numeric"
          }
        ],
        outputInsights: [
          {
            name: "Plan de intervención personal",
            description: "Conjunto de intervenciones priorizadas y personalizadas",
            visualizationType: "Plan de acción",
            businessValue: "Maximización de efectividad clínica con recursos limitados"
          },
          {
            name: "Calendario asistencial",
            description: "Secuencia temporal óptima de intervenciones",
            visualizationType: "Calendario médico",
            businessValue: "Coordinación efectiva entre niveles asistenciales"
          },
          {
            name: "Impacto proyectado",
            description: "Estimación de la efectividad esperada de las intervenciones",
            visualizationType: "Indicadores clínicos",
            businessValue: "Evaluación continua del retorno asistencial"
          },
          {
            name: "Panel de seguimiento",
            description: "Herramienta de monitorización de adherencia e impacto",
            visualizationType: "Dashboard clínico",
            businessValue: "Ajuste dinámico del plan según resultados intermedios"
          }
        ]
      }
    ]
  },

  // TECHNOLOGY FLOWS
  {
    id: "user-churn-prediction",
    name: "Predicción y prevención de abandono de usuarios",
    description: "Sistema para identificar y retener usuarios en riesgo de abandono",
    industry: "tecnologia",
    businessGoal: "Reducir la tasa de abandono (churn) de usuarios, incrementar la retención y maximizar el valor del ciclo de vida del cliente.",
    totalEstimatedTime: "3-4 semanas",
    recommendedTools: ["Python", "XGBoost", "Tableau", "SQL"],
    steps: [
      {
        id: "user-behavior-analysis",
        name: "Análisis de comportamiento de usuario",
        description: "Estudio de patrones de uso e interacción con la plataforma",
        prerequisiteSteps: [],
        estimatedProcessingTime: "5-7 días",
        difficulty: "intermedio",
        modelType: "análisis exploratorio",
        inputFields: [
          {
            name: "usuario_id",
            description: "Identificador único del usuario",
            example: "U12345678",
            required: true,
            type: "text"
          },
          {
            name: "fecha_registro",
            description: "Fecha de registro en la plataforma",
            example: "2022-11-15",
            required: true,
            type: "date"
          },
          {
            name: "plan_suscripcion",
            description: "Tipo de plan o suscripción",
            example: "premium",
            required: true,
            type: "categorical"
          },
          {
            name: "sesiones",
            description: "Datos de sesiones de los últimos 30 días",
            example: "total:12,duracion_promedio:18.5,dias_activos:8",
            required: true,
            type: "text"
          },
          {
            name: "interacciones",
            description: "Número y tipo de interacciones por funcionalidad",
            example: "feature1:25,feature2:10,feature3:0",
            required: true,
            type: "text"
          },
          {
            name: "ultima_sesion",
            description: "Fecha de la última sesión",
            example: "2023-05-28",
            required: true,
            type: "date"
          },
          {
            name: "dispositivos",
            description: "Dispositivos utilizados para acceder",
            example: "mobile:60%,desktop:40%,tablet:0%",
            required: false,
            type: "text"
          },
          {
            name: "canal_adquisicion",
            description: "Canal por el que llegó el usuario",
            example: "social_media",
            required: false,
            type: "categorical"
          },
          {
            name: "tickets_soporte",
            description: "Historial de tickets de soporte",
            example: "total:2,resueltos:1,satisfaccion:3.5",
            required: false,
            type: "text"
          }
        ],
        outputInsights: [
          {
            name: "Patrones de uso",
            description: "Identificación de patrones típicos de interacción",
            visualizationType: "Heatmaps temporales",
            businessValue: "Comprensión profunda del comportamiento de usuarios"
          },
          {
            name: "Análisis de cohortes",
            description: "Comparativa de retención por cohortes de usuarios",
            visualizationType: "Gráfico de retención",
            businessValue: "Identificación de momentos críticos en el ciclo de vida"
          },
          {
            name: "Engagement por funcionalidad",
            description: "Nivel de uso de diferentes características del producto",
            visualizationType: "Gráficos de uso",
            businessValue: "Priorización del desarrollo de funcionalidades"
          }
        ]
      },
      {
        id: "churn-prediction-model",
        name: "Modelo predictivo de abandono",
        description: "Desarrollo de algoritmo para predecir la probabilidad de abandono",
        prerequisiteSteps: ["user-behavior-analysis"],
        estimatedProcessingTime: "7-10 días",
        difficulty: "avanzado",
        modelType: "machine learning supervisado",
        inputFields: [
          {
            name: "datos_comportamiento",
            description: "Dataset de comportamiento de usuario",
            example: "[conjunto de datos preprocesados]",
            required: true,
            type: "text"
          },
          {
            name: "historico_churn",
            description: "Datos históricos de abandono para entrenamiento",
            example: "usuario_id:churn_status",
            required: true,
            type: "text"
          },
          {
            name: "features_seleccionadas",
            description: "Variables seleccionadas para el modelo",
            example: "sesiones_mes,dias_inactividad,uso_funcionalidad_clave",
            required: true,
            type: "text"
          },
          {
            name: "periodo_prediccion",
            description: "Horizonte temporal para la predicción",
            example: 30,
            required: true,
            type: "numeric"
          },
          {
            name: "definicion_churn",
            description: "Criterio utilizado para definir el abandono",
            example: "30_dias_sin_acceso",
            required: true,
            type: "text"
          },
          {
            name: "segmentos_analisis",
            description: "Segmentos específicos para análisis separado",
            example: "nuevo_usuario,usuario_establecido,usuario_power",
            required: false,
            type: "text"
          }
        ],
        outputInsights: [
          {
            name: "Score de propensión al churn",
            description: "Probabilidad individual de abandono en el período definido",
            visualizationType: "Scoring de riesgo",
            businessValue: "Identificación precisa de usuarios en riesgo"
          },
          {
            name: "Factores de abandono",
            description: "Variables con mayor impacto en la decisión de abandono",
            visualizationType: "Gráfico de importancia",
            businessValue: "Focalización en causas raíz del abandono"
          },
          {
            name: "Segmentación por riesgo",
            description: "Agrupación de usuarios según nivel y tipo de riesgo",
            visualizationType: "Matriz de segmentación",
            businessValue: "Estrategias diferenciadas por perfil de riesgo"
          }
        ]
      },
      {
        id: "early-warning-system",
        name: "Sistema de alerta temprana",
        description: "Implementación de alertas automáticas para usuarios en riesgo",
        prerequisiteSteps: ["churn-prediction-model"],
        estimatedProcessingTime: "4-6 días",
        difficulty: "intermedio",
        modelType: "sistema de reglas",
        inputFields: [
          {
            name: "criterios_alerta",
            description: "Condiciones para generar diferentes niveles de alerta",
            example: "alerta_alta:>80%,alerta_media:60-80%,alerta_baja:40-60%",
            required: true,
            type: "text"
          },
          {
            name: "canales_notificacion",
            description: "Canales disponibles para enviar alertas",
            example: "dashboard,email,slack",
            required: true,
            type: "text"
          },
          {
            name: "destinatarios",
            description: "Roles que deben recibir diferentes tipos de alertas",
            example: "customer_success,product_manager,marketing",
            required: true,
            type: "text"
          },
          {
            name: "frecuencia_actualizacion",
            description: "Frecuencia de actualización de predicciones",
            example: "diaria",
            required: true,
            type: "categorical"
          },
          {
            name: "umbrales_accion",
            description: "Niveles que desencadenan diferentes acciones",
            example: "contacto_inmediato:90%,oferta_especial:70%,email_educativo:50%",
            required: true,
            type: "text"
          },
          {
            name: "formato_alertas",
            description: "Estructura y contenido de las alertas",
            example: "usuario,score,factores_principales,tendencia,acciones_recomendadas",
            required: false,
            type: "text"
          }
        ],
        outputInsights: [
          {
            name: "Panel de alertas",
            description: "Dashboard en tiempo real de usuarios en riesgo",
            visualizationType: "Panel de control",
            businessValue: "Monitorización continua de la salud de la base de usuarios"
          },
          {
            name: "Flujo de trabajo de intervención",
            description: "Proceso estructurado para abordar cada nivel de riesgo",
            visualizationType: "Diagrama de flujo",
            businessValue: "Estandarización de respuestas a señales de abandono"
          },
          {
            name: "Priorización automática",
            description: "Ordenación de casos según urgencia e impacto potencial",
            visualizationType: "Cola priorizada",
            businessValue: "Optimización del tiempo del equipo de customer success"
          }
        ]
      },
      {
        id: "retention-strategy-optimization",
        name: "Optimización de estrategias de retención",
        description: "Desarrollo y evaluación de tácticas para prevenir el abandono",
        prerequisiteSteps: ["churn-prediction-model", "early-warning-system"],
        estimatedProcessingTime: "8-10 días",
        difficulty: "avanzado",
        modelType: "experimentación y optimización",
        inputFields: [
          {
            name: "segmento_usuario",
            description: "Segmento de usuarios para la estrategia",
            example: "alto_riesgo_alto_valor",
            required: true,
            type: "categorical"
          },
          {
            name: "intervenciones_disponibles",
            description: "Catálogo de posibles intervenciones",
            example: "descuento,email_engagement,llamada_cs,nuevas_funcionalidades",
            required: true,
            type: "text"
          },
          {
            name: "historico_intervenciones",
            description: "Datos de efectividad de intervenciones pasadas",
            example: "tipo:descuento,efectividad:65%,coste_promedio:12",
            required: true,
            type: "text"
          },
          {
            name: "ltv_segmento",
            description: "Valor de vida del cliente por segmento",
            example: 850,
            required: true,
            type: "numeric"
          },
          {
            name: "costo_adquisicion",
            description: "Costo de adquisición de un nuevo cliente",
            example: 120,
            required: true,
            type: "numeric"
          },
          {
            name: "presupuesto_retencion",
            description: "Presupuesto disponible para acciones de retención",
            example: 50000,
            required: false,
            type: "numeric"
          },
          {
            name: "ventana_intervencion",
            description: "Tiempo disponible para implementar la estrategia",
            example: "7_dias",
            required: false,
            type: "text"
          }
        ],
        outputInsights: [
          {
            name: "Matriz de intervenciones",
            description: "Estrategias óptimas por segmento de usuario y nivel de riesgo",
            visualizationType: "Matriz de decisión",
            businessValue: "Maximización del ROI en esfuerzos de retención"
          },
          {
            name: "Proyección de impacto",
            description: "Estimación del impacto esperado en retención y LTV",
            visualizationType: "Simulación de escenarios",
            businessValue: "Justificación de inversión en programas de retención"
          },
          {
            name: "Plan de experimentación",
            description: "Diseño de tests A/B para validar nuevas estrategias",
            visualizationType: "Plan de pruebas",
            businessValue: "Mejora continua basada en evidencia"
          },
          {
            name: "Análisis coste-beneficio",
            description: "Evaluación económica de diferentes estrategias",
            visualizationType: "Dashboard financiero",
            businessValue: "Optimización del presupuesto de retención"
          }
        ]
      }
    ]
  },

  // CROSS-INDUSTRY FLOWS
  {
    id: "cross-customer-lifetime-value",
    name: "Análisis avanzado del valor del ciclo de vida del cliente",
    description: "Modelado predictivo del valor futuro de cada cliente para optimizar estrategias comerciales",
    industry: "cross-industry",
    applicableIndustries: ["retail", "finanzas", "tecnologia"],
    businessGoal: "Maximizar el retorno de inversión marketing y ventas mediante la priorización de clientes según su valor potencial a largo plazo.",
    totalEstimatedTime: "4-6 semanas",
    recommendedTools: ["Python", "R", "XGBoost", "Power BI"],
    recommendedFor: [
      {
        title: "Director de Marketing",
        reason: "Para optimizar la asignación del presupuesto de marketing por segmento"
      },
      {
        title: "Gerente de CRM",
        reason: "Para diseñar programas de fidelización basados en valor potencial"
      },
      {
        title: "Director Comercial",
        reason: "Para enfocar recursos comerciales en los clientes con mayor potencial"
      }
    ],
    steps: [
      {
        id: "historical-value-analysis",
        name: "Análisis histórico de valor",
        description: "Evaluación del valor histórico aportado por cada cliente",
        prerequisiteSteps: [],
        estimatedProcessingTime: "7-10 días",
        difficulty: "intermedio",
        modelType: "análisis retrospectivo",
        inputFields: [
          {
            name: "cliente_id",
            description: "Identificador único del cliente",
            example: "C-12345",
            required: true,
            type: "text"
          },
          {
            name: "fecha_transaccion",
            description: "Fecha de cada transacción",
            example: "2023-05-18",
            required: true,
            type: "date"
          },
          {
            name: "monto_transaccion",
            description: "Valor monetario de la transacción",
            example: 125.50,
            required: true,
            type: "numeric"
          },
          {
            name: "categoria_producto",
            description: "Categoría del producto o servicio adquirido",
            example: "Electrónica",
            required: true,
            type: "categorical"
          },
          {
            name: "canal_venta",
            description: "Canal por el que se realizó la venta",
            example: "web",
            required: true,
            type: "categorical"
          },
          {
            name: "descuentos_aplicados",
            description: "Descuentos aplicados a la transacción",
            example: 15.25,
            required: false,
            type: "numeric"
          },
          {
            name: "costo_adquisicion",
            description: "Costo de adquisición asignado al cliente",
            example: 50,
            required: false,
            type: "numeric"
          },
          {
            name: "costo_servicio",
            description: "Costos de servicio asociados al cliente",
            example: 28.75,
            required: false,
            type: "numeric"
          },
          {
            name: "datos_cliente",
            description: "Información demográfica y de perfil",
            example: "edad:35,segmento:profesional,antiguedad:2.5",
            required: false,
            type: "text"
          }
        ],
        outputInsights: [
          {
            name: "Valor histórico por cliente",
            description: "Cálculo del valor aportado hasta la fecha por cada cliente",
            visualizationType: "Dashboard de valor",
            businessValue: "Identificación de los clientes actualmente más valiosos"
          },
          {
            name: "Patrones de compra",
            description: "Análisis de frecuencia, recencia y valor de transacciones",
            visualizationType: "Análisis RFM",
            businessValue: "Segmentación inicial basada en comportamiento histórico"
          },
          {
            name: "Rentabilidad por cliente",
            description: "Análisis de margen neto considerando todos los costos asociados",
            visualizationType: "Mapa de calor de rentabilidad",
            businessValue: "Identificación de clientes con alta facturación pero baja rentabilidad"
          }
        ]
      },
      {
        id: "predictive-clv-modeling",
        name: "Modelado predictivo de CLV",
        description: "Desarrollo de modelos para predecir el valor futuro de clientes",
        prerequisiteSteps: ["historical-value-analysis"],
        estimatedProcessingTime: "14-18 días",
        difficulty: "avanzado",
        modelType: "machine learning predictivo",
        inputFields: [
          {
            name: "historico_cliente",
            description: "Datos históricos completos de comportamiento",
            example: "[conjunto de datos procesados]",
            required: true,
            type: "text"
          },
          {
            name: "horizonte_prediccion",
            description: "Periodo futuro para la predicción (meses)",
            example: 36,
            required: true,
            type: "numeric"
          },
          {
            name: "tasa_descuento",
            description: "Tasa para descontar flujos futuros",
            example: 0.05,
            required: false,
            type: "numeric"
          },
          {
            name: "metricas_engagement",
            description: "Indicadores de compromiso del cliente",
            example: "uso_app:alto,respuesta_emails:media,participacion_programa:baja",
            required: false,
            type: "text"
          },
          {
            name: "factores_contextuales",
            description: "Variables de contexto que pueden afectar la predicción",
            example: "tendencia_categoria:creciente,estacionalidad:alta",
            required: false,
            type: "text"
          },
          {
            name: "factores_riesgo",
            description: "Indicadores de posible abandono o reducción de valor",
            example: "quejas_recientes:2,uso_decreciente:true",
            required: false,
            type: "text"
          }
        ],
        outputInsights: [
          {
            name: "CLV proyectado",
            description: "Predicción del valor del ciclo de vida para cada cliente",
            visualizationType: "Distribución y ranking",
            businessValue: "Base para decisiones estratégicas de inversión por cliente"
          },
          {
            name: "Factores predictivos",
            description: "Variables con mayor impacto en la predicción del CLV",
            visualizationType: "Gráfico de importancia",
            businessValue: "Identificación de palancas para incrementar el valor futuro"
          },
          {
            name: "Segmentación por valor potencial",
            description: "Agrupación de clientes según su valor proyectado",
            visualizationType: "Matriz de segmentación",
            businessValue: "Estrategias diferenciadas según potencial de cada segmento"
          },
          {
            name: "Curvas de valor temporal",
            description: "Proyección de la evolución del valor en el tiempo",
            visualizationType: "Curvas de valor",
            businessValue: "Planificación de intervenciones en momentos óptimos"
          }
        ]
      },
      {
        id: "customer-equity-analysis",
        name: "Análisis de capital cliente",
        description: "Evaluación del valor agregado de toda la base de clientes",
        prerequisiteSteps: ["predictive-clv-modeling"],
        estimatedProcessingTime: "5-7 días",
        difficulty: "intermedio",
        modelType: "análisis estratégico",
        inputFields: [
          {
            name: "predicciones_clv",
            description: "Predicciones de CLV para todos los clientes",
            example: "[dataset con predicciones]",
            required: true,
            type: "text"
          },
          {
            name: "segmentacion_clientes",
            description: "Clasificación de clientes en segmentos",
            example: "alto_valor:12%,valor_medio:38%,bajo_valor:50%",
            required: true,
            type: "text"
          },
          {
            name: "proyeccion_churn",
            description: "Tasas de abandono proyectadas por segmento",
            example: "alto_valor:5%,valor_medio:12%,bajo_valor:25%",
            required: true,
            type: "text"
          },
          {
            name: "costo_adquisicion_segmento",
            description: "Costo de adquisición por segmento",
            example: "alto_valor:200,valor_medio:100,bajo_valor:50",
            required: false,
            type: "text"
          },
          {
            name: "objetivos_crecimiento",
            description: "Objetivos de crecimiento de la base de clientes",
            example: "tasa_anual:15%,enfoque:alto_valor",
            required: false,
            type: "text"
          }
        ],
        outputInsights: [
          {
            name: "Valor total de la base",
            description: "Valoración del capital cliente total de la empresa",
            visualizationType: "Dashboard financiero",
            businessValue: "Métrica estratégica para valoración del negocio"
          },
          {
            name: "Distribución de valor",
            description: "Análisis de concentración del valor en la base de clientes",
            visualizationType: "Gráfico de Pareto",
            businessValue: "Evaluación de dependencia de clientes clave"
          },
          {
            name: "Proyección de capital cliente",
            description: "Evolución esperada del capital cliente total",
            visualizationType: "Proyección temporal",
            businessValue: "Alineación de estrategias comerciales con objetivos financieros"
          }
        ]
      },
      {
        id: "strategy-optimization",
        name: "Optimización de estrategias por valor",
        description: "Desarrollo de estrategias diferenciadas según valor del cliente",
        prerequisiteSteps: ["predictive-clv-modeling", "customer-equity-analysis"],
        estimatedProcessingTime: "10-12 días",
        difficulty: "avanzado",
        modelType: "optimización estratégica",
        inputFields: [
          {
            name: "segmento_cliente",
            description: "Segmento de valor del cliente",
            example: "alto_potencial_bajo_actual",
            required: true,
            type: "categorical"
          },
          {
            name: "presupuesto_marketing",
            description: "Presupuesto disponible para acciones de marketing",
            example: 500000,
            required: true,
            type: "numeric"
          },
          {
            name: "costos_accion",
            description: "Costo por tipo de acción comercial",
            example: "campana_email:0.5,descuento:15,programa_fidelizacion:50",
            required: true,
            type: "text"
          },
          {
            name: "efectividad_historica",
            description: "Eficacia histórica de diferentes acciones",
            example: "campana_email:3%,descuento:12%,programa_fidelizacion:25%",
            required: true,
            type: "text"
          },
          {
            name: "elasticidad_precio",
            description: "Sensibilidad a cambios de precio por segmento",
            example: "alto_valor:0.8,valor_medio:1.2,bajo_valor:2.1",
            required: false,
            type: "text"
          },
          {
            name: "capacidad_operativa",
            description: "Limitaciones operativas para implementación",
            example: "max_campanas_mes:4,capacidad_atencion_personalizada:200",
            required: false,
            type: "text"
          }
        ],
        outputInsights: [
          {
            name: "Matriz de estrategias",
            description: "Estrategias óptimas por segmento de valor",
            visualizationType: "Matriz de decisión",
            businessValue: "Maximización del retorno de inversión en marketing"
          },
          {
            name: "Plan de inversión",
            description: "Distribución óptima del presupuesto por segmento y acción",
            visualizationType: "Plan de asignación",
            businessValue: "Optimización de la asignación de recursos limitados"
          },
          {
            name: "ROI proyectado",
            description: "Estimación del retorno por tipo de acción y segmento",
            visualizationType: "Comparativa de ROI",
            businessValue: "Justificación de inversiones basada en valor esperado"
          },
          {
            name: "Plan de implementación",
            description: "Secuencia y calendario de acciones recomendadas",
            visualizationType: "Calendario de implementación",
            businessValue: "Hoja de ruta clara para ejecutar la estrategia"
          }
        ]
      }
    ]
  },
  {
    id: "cross-supply-chain-optimization",
    name: "Optimización integral de cadena de suministro",
    description: "Análisis avanzado para optimizar toda la cadena de valor desde proveedores hasta clientes",
    industry: "cross-industry",
    applicableIndustries: ["retail", "manufactura"],
    businessGoal: "Mejorar la eficiencia operativa, reducir costos logísticos y aumentar la capacidad de respuesta a la demanda del mercado.",
    totalEstimatedTime: "6-8 semanas",
    recommendedTools: ["Python", "Gurobi", "Tableau", "Simulación Monte Carlo"],
    recommendedFor: [
      {
        title: "Director de Operaciones",
        reason: "Para identificar oportunidades de eficiencia en toda la cadena de suministro"
      },
      {
        title: "Gerente de Logística",
        reason: "Para optimizar rutas, inventarios y programación de entregas"
      },
      {
        title: "Responsable de Compras",
        reason: "Para mejorar la selección y evaluación de proveedores"
      }
    ],
    steps: [
      {
        id: "supply-chain-mapping",
        name: "Mapeo de la cadena de suministro",
        description: "Análisis y visualización de la estructura completa de la cadena",
        prerequisiteSteps: [],
        estimatedProcessingTime: "8-10 días",
        difficulty: "básico",
        modelType: "análisis descriptivo",
        inputFields: [
          {
            name: "nodo_id",
            description: "Identificador del nodo en la cadena",
            example: "PROV-A123",
            required: true,
            type: "text"
          },
          {
            name: "tipo_nodo",
            description: "Tipo de nodo (proveedor, fábrica, almacén, etc.)",
            example: "proveedor_tier1",
            required: true,
            type: "categorical"
          },
          {
            name: "ubicacion",
            description: "Localización geográfica",
            example: "40.4168,-3.7038",
            required: true,
            type: "text"
          },
          {
            name: "capacidad",
            description: "Capacidad productiva o de almacenamiento",
            example: 5000,
            required: true,
            type: "numeric"
          },
          {
            name: "tiempo_procesamiento",
            description: "Tiempo promedio de procesamiento (horas)",
            example: 48,
            required: true,
            type: "numeric"
          },
          {
            name: "conexiones",
            description: "Enlaces con otros nodos",
            example: "FAB-B456,ALM-C789",
            required: true,
            type: "text"
          },
          {
            name: "flujo_material",
            description: "Volumen de material que fluye entre nodos",
            example: "FAB-B456:1200,ALM-C789:800",
            required: true,
            type: "text"
          },
          {
            name: "lead_time",
            description: "Tiempo de tránsito entre nodos conectados (horas)",
            example: "FAB-B456:24,ALM-C789:36",
            required: true,
            type: "text"
          },
          {
            name: "costo_transporte",
            description: "Costo de transporte entre nodos",
            example: "FAB-B456:1200,ALM-C789:1800",
            required: false,
            type: "text"
          },
          {
            name: "riesgo_asociado",
            description: "Nivel de riesgo asociado al nodo o conexión",
            example: "politico:bajo,climatico:alto,operativo:medio",
            required: false,
            type: "text"
          }
        ],
        outputInsights: [
          {
            name: "Mapa de cadena de valor",
            description: "Visualización completa de la estructura de la cadena de suministro",
            visualizationType: "Mapa interactivo",
            businessValue: "Comprensión integral de la red logística y puntos críticos"
          },
          {
            name: "Análisis de flujos",
            description: "Visualización de volúmenes y direcciones de flujo de materiales",
            visualizationType: "Diagrama Sankey",
            businessValue: "Identificación de cuellos de botella y rutas principales"
          },
          {
            name: "Métricas de red",
            description: "Indicadores clave de la estructura de la red",
            visualizationType: "Dashboard de métricas",
            businessValue: "Evaluación de resilencia y complejidad de la cadena"
          }
        ]
      },
      {
        id: "demand-forecasting-multi-echelon",
        name: "Pronóstico de demanda multi-nivel",
        description: "Predicción coordinada de la demanda en diferentes niveles de la cadena",
        prerequisiteSteps: ["supply-chain-mapping"],
        estimatedProcessingTime: "12-15 días",
        difficulty: "avanzado",
        modelType: "series temporales jerárquicas",
        inputFields: [
          {
            name: "producto_id",
            description: "Identificador del producto",
            example: "SKU-123456",
            required: true,
            type: "text"
          },
          {
            name: "nivel",
            description: "Nivel en la cadena (retail, distribución, producción)",
            example: "retail",
            required: true,
            type: "categorical"
          },
          {
            name: "ubicacion_id",
            description: "Identificador de la ubicación",
            example: "TIENDA-B123",
            required: true,
            type: "text"
          },
          {
            name: "fecha",
            description: "Fecha de la demanda histórica",
            example: "2023-04-15",
            required: true,
            type: "date"
          },
          {
            name: "demanda",
            description: "Cantidad demandada",
            example: 250,
            required: true,
            type: "numeric"
          },
          {
            name: "precio",
            description: "Precio de venta",
            example: 29.99,
            required: false,
            type: "numeric"
          },
          {
            name: "promocion",
            description: "Indicador de promoción activa",
            example: true,
            required: false,
            type: "categorical"
          },
          {
            name: "evento_especial",
            description: "Eventos que afectan la demanda",
            example: "festivo_local",
            required: false,
            type: "categorical"
          },
          {
            name: "variables_externas",
            description: "Variables exógenas que impactan la demanda",
            example: "temperatura:28,indice_consumo:105",
            required: false,
            type: "text"
          }
        ],
        outputInsights: [
          {
            name: "Pronóstico reconciliado",
            description: "Predicción de demanda coherente en todos los niveles de la cadena",
            visualizationType: "Forecast jerárquico",
            businessValue: "Alineación de expectativas en toda la cadena de suministro"
          },
          {
            name: "Patrones de propagación",
            description: "Análisis de cómo la demanda se propaga entre niveles",
            visualizationType: "Cascada de demanda",
            businessValue: "Comprensión del efecto látigo y sus causas"
          },
          {
            name: "Escenarios de demanda",
            description: "Simulación de diferentes escenarios de demanda futura",
            visualizationType: "Simulación Monte Carlo",
            businessValue: "Preparación para múltiples escenarios de mercado"
          }
        ]
      },
      {
        id: "inventory-network-optimization",
        name: "Optimización de red de inventarios",
        description: "Determinación de niveles y ubicaciones óptimas de inventario",
        prerequisiteSteps: ["supply-chain-mapping", "demand-forecasting-multi-echelon"],
        estimatedProcessingTime: "14-18 días",
        difficulty: "avanzado",
        modelType: "optimización estocástica",
        inputFields: [
          {
            name: "nodo_id",
            description: "Identificador del nodo de inventario",
            example: "ALM-C789",
            required: true,
            type: "text"
          },
          {
            name: "producto_id",
            description: "Identificador del producto",
            example: "SKU-123456",
            required: true,
            type: "text"
          },
          {
            name: "demanda_pronosticada",
            description: "Pronóstico de demanda por periodo",
            example: "P1:250,P2:280,P3:310",
            required: true,
            type: "text"
          },
          {
            name: "incertidumbre",
            description: "Medidas de incertidumbre del pronóstico",
            example: "desv_std:45,sesgo:5%",
            required: true,
            type: "text"
          },
          {
            name: "lead_time",
            description: "Tiempo de reabastecimiento",
            example: "promedio:5,desv_std:1.2",
            required: true,
            type: "text"
          },
          {
            name: "costo_mantenimiento",
            description: "Costo de mantener inventario por unidad y periodo",
            example: 0.25,
            required: true,
            type: "numeric"
          },
          {
            name: "costo_pedido",
            description: "Costo fijo de realizar un pedido",
            example: 150,
            required: true,
            type: "numeric"
          },
          {
            name: "costo_faltante",
            description: "Costo o penalización por falta de stock",
            example: 15,
            required: true,
            type: "numeric"
          },
          {
            name: "restricciones_capacidad",
            description: "Limitaciones de capacidad de almacenamiento",
            example: 10000,
            required: false,
            type: "numeric"
          },
          {
            name: "politica_servicio",
            description: "Nivel de servicio objetivo",
            example: 0.98,
            required: true,
            type: "numeric"
          }
        ],
        outputInsights: [
          {
            name: "Política de inventario óptima",
            description: "Parámetros óptimos de gestión de inventario por ubicación y producto",
            visualizationType: "Dashboard operativo",
            businessValue: "Reducción de costos de inventario manteniendo nivel de servicio"
          },
          {
            name: "Ubicación estratégica",
            description: "Distribución óptima de inventario en la red logística",
            visualizationType: "Mapa de calor logístico",
            businessValue: "Reducción de tiempos de entrega y costos de transporte"
          },
          {
            name: "Análisis de trade-offs",
            description: "Evaluación de compromisos entre nivel de servicio y costos",
            visualizationType: "Curva eficiente",
            businessValue: "Toma de decisiones informada sobre políticas de inventario"
          }
        ]
      },
      {
        id: "supply-chain-resilience",
        name: "Análisis de resiliencia y riesgos",
        description: "Evaluación de vulnerabilidades y desarrollo de estrategias de mitigación",
        prerequisiteSteps: ["supply-chain-mapping", "inventory-network-optimization"],
        estimatedProcessingTime: "10-12 días",
        difficulty: "avanzado",
        modelType: "simulación de riesgos",
        inputFields: [
          {
            name: "escenario_riesgo",
            description: "Tipo de escenario de riesgo a evaluar",
            example: "interrupcion_proveedor_principal",
            required: true,
            type: "categorical"
          },
          {
            name: "nodos_afectados",
            description: "Nodos potencialmente afectados",
            example: "PROV-A123,FAB-B456",
            required: true,
            type: "text"
          },
          {
            name: "duracion_evento",
            description: "Duración estimada del evento disruptivo (días)",
            example: "min:5,promedio:12,max:30",
            required: true,
            type: "text"
          },
          {
            name: "probabilidad",
            description: "Probabilidad estimada del evento",
            example: 0.05,
            required: true,
            type: "numeric"
          },
          {
            name: "impacto_capacidad",
            description: "Reducción porcentual de capacidad",
            example: "min:30%,promedio:60%,max:100%",
            required: true,
            type: "text"
          },
          {
            name: "alternativas_disponibles",
            description: "Opciones alternativas de suministro",
            example: "PROV-D789:capacidad_limitada,PROV-E012:costo_alto",
            required: false,
            type: "text"
          },
          {
            name: "tiempo_activacion",
            description: "Tiempo necesario para activar alternativas (días)",
            example: 7,
            required: false,
            type: "numeric"
          }
        ],
        outputInsights: [
          {
            name: "Mapa de vulnerabilidades",
            description: "Identificación de puntos críticos y vulnerables en la cadena",
            visualizationType: "Mapa de riesgos",
            businessValue: "Priorización de esfuerzos de mitigación"
          },
          {
            name: "Impacto de disrupciones",
            description: "Cuantificación del impacto de diferentes escenarios de riesgo",
            visualizationType: "Simulación de eventos",
            businessValue: "Preparación anticipada para posibles disrupciones"
          },
          {
            name: "Estrategias de mitigación",
            description: "Recomendaciones para incrementar la resiliencia",
            visualizationType: "Plan de acción",
            businessValue: "Reducción de impacto financiero de eventos disruptivos"
          },
          {
            name: "Análisis costo-beneficio",
            description: "Evaluación económica de diferentes estrategias de resiliencia",
            visualizationType: "Comparativa ROI",
            businessValue: "Justificación de inversiones en resiliencia"
          }
        ]
      }
    ]
  },
  {
    id: "cross-predictive-maintenance-analytics",
    name: "Análisis predictivo de mantenimiento y equipos",
    description: "Sistema integral para predecir fallos y optimizar el mantenimiento preventivo de activos críticos",
    industry: "cross-industry",
    applicableIndustries: ["manufactura", "salud", "tecnologia"],
    businessGoal: "Minimizar tiempos de inactividad no planificados, optimizar costos de mantenimiento y extender la vida útil de activos valiosos.",
    totalEstimatedTime: "8-12 semanas",
    recommendedTools: ["Python", "TensorFlow", "IoT Analytics", "Tableau"],
    recommendedFor: [
      {
        title: "Director de Operaciones",
        reason: "Para optimizar la disponibilidad de activos críticos y reducir costos operativos"
      },
      {
        title: "Jefe de Mantenimiento",
        reason: "Para implementar estrategias de mantenimiento basadas en condición y no en calendario"
      },
      {
        title: "Gerente de Activos",
        reason: "Para maximizar el retorno de inversión de equipos e infraestructura"
      }
    ],
    steps: [
      {
        id: "sensor-data-collection",
        name: "Recolección de datos de sensores",
        description: "Captura y procesamiento de datos operativos en tiempo real",
        prerequisiteSteps: [],
        estimatedProcessingTime: "15-20 días",
        difficulty: "intermedio",
        modelType: "IoT data processing",
        howItWorks: "Este paso establece la infraestructura para capturar, validar y almacenar datos de sensores IoT de manera eficiente. Utiliza técnicas de filtrado de ruido, detección de valores atípicos y compresión de datos para manejar grandes volúmenes de información de sensores manteniendo la integridad de las señales relevantes.",
        benefits: [
          "Base de datos robusta para entrenar modelos predictivos precisos",
          "Visibilidad en tiempo real del estado de los equipos",
          "Detección temprana de anomalías operativas"
        ],
        inputFields: [
          {
            name: "equipo_id",
            description: "Identificador único del equipo o activo",
            example: "PUMP-A102",
            required: true,
            type: "text"
          },
          {
            name: "timestamp",
            description: "Marca de tiempo de la lectura",
            example: "2023-06-15T14:30:22Z",
            required: true,
            type: "date"
          },
          {
            name: "sensor_id",
            description: "Identificador del sensor",
            example: "VIB-S01",
            required: true,
            type: "text"
          },
          {
            name: "tipo_sensor",
            description: "Tipo de sensor o medición",
            example: "vibración",
            required: true,
            type: "categorical"
          },
          {
            name: "valor",
            description: "Lectura del sensor",
            example: 0.45,
            required: true,
            type: "numeric"
          },
          {
            name: "unidad",
            description: "Unidad de medida",
            example: "mm/s",
            required: true,
            type: "text"
          },
          {
            name: "estado_operativo",
            description: "Estado del equipo durante la medición",
            example: "carga_completa",
            required: true,
            type: "categorical"
          },
          {
            name: "indicadores_contextuales",
            description: "Variables contextuales relevantes",
            example: "temperatura_ambiente:24,humedad:65%",
            required: false,
            type: "text"
          },
          {
            name: "configuracion_operativa",
            description: "Parámetros operativos del equipo",
            example: "velocidad:1200rpm,presión:3.2bar",
            required: false,
            type: "text"
          }
        ],
        outputInsights: [
          {
            name: "Perfil operativo",
            description: "Caracterización del comportamiento normal del equipo",
            visualizationType: "Panel de condición",
            businessValue: "Establecimiento de líneas base para detección de anomalías"
          },
          {
            name: "Tendencias paramétricas",
            description: "Evolución de parámetros críticos a lo largo del tiempo",
            visualizationType: "Gráficos de series temporales",
            businessValue: "Identificación visual de degradación gradual"
          },
          {
            name: "Correlaciones entre sensores",
            description: "Análisis de relaciones entre diferentes parámetros",
            visualizationType: "Matriz de correlación",
            businessValue: "Comprensión de interacciones complejas entre variables"
          }
        ]
      },
      {
        id: "failure-pattern-detection",
        name: "Detección de patrones de fallo",
        description: "Identificación de firmas y precursores de fallos en los datos",
        prerequisiteSteps: ["sensor-data-collection"],
        estimatedProcessingTime: "20-25 días",
        difficulty: "avanzado",
        modelType: "machine learning supervisado/no supervisado",
        howItWorks: "Este paso emplea técnicas avanzadas de aprendizaje automático para identificar patrones sutiles que preceden a los fallos. Combina métodos supervisados (usando datos históricos de fallos) y no supervisados (detección de anomalías) para crear una librería completa de firmas de fallo que pueden ser detectadas con anticipación.",
        benefits: [
          "Detección temprana de problemas antes de que causen fallos críticos",
          "Reducción de falsos positivos mediante la identificación de patrones específicos",
          "Creación de conocimiento organizacional sobre modos de fallo"
        ],
        inputFields: [
          {
            name: "historico_sensor",
            description: "Datos históricos de sensores (período anterior a fallos)",
            example: "[conjunto de datos procesados]",
            required: true,
            type: "text"
          },
          {
            name: "registro_fallos",
            description: "Registro de fallos históricos documentados",
            example: "equipo:PUMP-A102,fecha:2023-02-15,tipo:rodamiento,componente:radial",
            required: true,
            type: "text"
          },
          {
            name: "ventana_analisis",
            description: "Período previo al fallo a analizar (horas)",
            example: 168,
            required: true,
            type: "numeric"
          },
          {
            name: "tipo_equipo",
            description: "Clasificación del tipo de equipo",
            example: "bomba_centrifuga",
            required: true,
            type: "categorical"
          },
          {
            name: "taxonomia_fallos",
            description: "Categorización de tipos de fallos a detectar",
            example: "mecanico,electrico,hidraulico",
            required: true,
            type: "text"
          },
          {
            name: "mantenimientos_previos",
            description: "Registro de mantenimientos realizados",
            example: "fecha:2023-01-10,tipo:preventivo,componentes:rodamientos",
            required: false,
            type: "text"
          },
          {
            name: "umbral_deteccion",
            description: "Umbral de confianza para la detección",
            example: 0.85,
            required: false,
            type: "numeric"
          }
        ],
        outputInsights: [
          {
            name: "Biblioteca de patrones",
            description: "Catálogo de firmas características por tipo de fallo",
            visualizationType: "Atlas de patrones",
            businessValue: "Referencia para detección temprana de problemas potenciales"
          },
          {
            name: "Precursores de fallo",
            description: "Indicadores tempranos específicos por tipo de fallo",
            visualizationType: "Secuencia temporal",
            businessValue: "Ventana de tiempo ampliada para intervención preventiva"
          },
          {
            name: "Probabilidad por modo de fallo",
            description: "Clasificación de probabilidad por tipo de fallo",
            visualizationType: "Dashboard multi-riesgo",
            businessValue: "Priorización precisa de intervenciones según tipo de riesgo"
          }
        ]
      },
      {
        id: "predictive-model-development",
        name: "Desarrollo de modelos predictivos",
        description: "Construcción de algoritmos para predecir fallos futuros",
        prerequisiteSteps: ["failure-pattern-detection"],
        estimatedProcessingTime: "25-30 días",
        difficulty: "avanzado",
        modelType: "deep learning/algoritmos avanzados",
        howItWorks: "Este paso implementa arquitecturas avanzadas de Machine Learning y Deep Learning (como LSTM, Transformers o Random Forest) para crear modelos predictivos precisos. Combina técnicas de feature engineering, selección de variables y ensemble learning para maximizar la precisión predictiva mientras mantiene la interpretabilidad necesaria para su aplicación práctica.",
        benefits: [
          "Predicción anticipada de fallos con semanas o meses de antelación",
          "Estimación del tiempo restante hasta el fallo (Remaining Useful Life)",
          "Cuantificación de la incertidumbre en las predicciones para tomar decisiones informadas"
        ],
        inputFields: [
          {
            name: "dataset_entrenamiento",
            description: "Conjunto de datos procesado para entrenamiento",
            example: "[conjunto completo procesado]",
            required: true,
            type: "text"
          },
          {
            name: "arquitectura_modelo",
            description: "Tipo de arquitectura de modelo a entrenar",
            example: "LSTM",
            required: true,
            type: "categorical"
          },
          {
            name: "horizonte_prediccion",
            description: "Horizonte temporal para la predicción (horas)",
            example: 720,
            required: true,
            type: "numeric"
          },
          {
            name: "metricas_evaluacion",
            description: "Métricas principales para evaluar el modelo",
            example: "precision:0.9,recall:0.85,f1:0.87",
            required: true,
            type: "text"
          },
          {
            name: "tipo_prediccion",
            description: "Enfoque predictivo primario",
            example: "RUL",
            required: true,
            type: "categorical"
          },
          {
            name: "parametros_entrenamiento",
            description: "Hiperparámetros para el entrenamiento",
            example: "learning_rate:0.001,batch_size:64,epochs:100",
            required: false,
            type: "text"
          },
          {
            name: "tecnicas_validacion",
            description: "Método de validación del modelo",
            example: "k-fold_cross_validation",
            required: false,
            type: "categorical"
          }
        ],
        outputInsights: [
          {
            name: "Predicción de vida útil",
            description: "Estimación del tiempo restante hasta el fallo",
            visualizationType: "Indicador RUL",
            businessValue: "Planificación precisa de intervenciones preventivas"
          },
          {
            name: "Probabilidad de fallo",
            description: "Probabilidad de fallo en diferentes horizontes temporales",
            visualizationType: "Curva de probabilidad",
            businessValue: "Gestión de riesgos operativos basada en datos"
          },
          {
            name: "Explicación del modelo",
            description: "Interpretación de los factores que influyen en la predicción",
            visualizationType: "SHAP Values",
            businessValue: "Comprensión de causas raíz para acciones correctivas precisas"
          },
          {
            name: "Confianza del modelo",
            description: "Cuantificación de la incertidumbre en las predicciones",
            visualizationType: "Intervalos de confianza",
            businessValue: "Toma de decisiones consciente del nivel de certeza"
          }
        ]
      },
      {
        id: "maintenance-strategy-optimization",
        name: "Optimización de estrategias de mantenimiento",
        description: "Diseño de planes óptimos basados en predicciones y limitaciones operativas",
        prerequisiteSteps: ["predictive-model-development"],
        estimatedProcessingTime: "15-20 días",
        difficulty: "avanzado",
        modelType: "optimización de decisiones",
        howItWorks: "Este paso integra los resultados predictivos con restricciones operativas y financieras para determinar cuándo y cómo realizar intervenciones de mantenimiento. Utiliza técnicas de optimización para balancear múltiples objetivos como minimización de costos, maximización de disponibilidad y extensión de vida útil, considerando las limitaciones prácticas de recursos y ventanas de mantenimiento.",
        benefits: [
          "Reducción de 20-40% en costos de mantenimiento",
          "Aumento de 10-25% en disponibilidad de equipos",
          "Optimización del inventario de repuestos y utilización de recursos"
        ],
        inputFields: [
          {
            name: "predicciones_equipo",
            description: "Predicciones generadas por el modelo",
            example: "equipo:PUMP-A102,probabilidad_fallo:0.78,RUL:450h",
            required: true,
            type: "text"
          },
          {
            name: "criticidad_equipo",
            description: "Nivel de criticidad del activo",
            example: "alto",
            required: true,
            type: "categorical"
          },
          {
            name: "recursos_disponibles",
            description: "Recursos de mantenimiento disponibles",
            example: "tecnicos:5,horas_disponibles:160,presupuesto:35000",
            required: true,
            type: "text"
          },
          {
            name: "costos_mantenimiento",
            description: "Estructura de costos por tipo de intervención",
            example: "preventivo_menor:1500,preventivo_mayor:7500,correctivo:25000",
            required: true,
            type: "text"
          },
          {
            name: "tiempo_intervencion",
            description: "Duración estimada por tipo de intervención (horas)",
            example: "preventivo_menor:4,preventivo_mayor:24,correctivo:72",
            required: true,
            type: "text"
          },
          {
            name: "disponibilidad_repuestos",
            description: "Inventario y plazos de entrega de repuestos críticos",
            example: "rodamiento:stock,sello:7_dias,motor:14_dias",
            required: true,
            type: "text"
          },
          {
            name: "ventanas_mantenimiento",
            description: "Períodos disponibles para intervenciones",
            example: "programado:2023-07-15,duracion:48h",
            required: false,
            type: "text"
          },
          {
            name: "costo_inactividad",
            description: "Costo por hora de inactividad no planificada",
            example: 5000,
            required: true,
            type: "numeric"
          }
        ],
        outputInsights: [
          {
            name: "Plan óptimo de mantenimiento",
            description: "Calendario optimizado de intervenciones preventivas",
            visualizationType: "Calendario de mantenimiento",
            businessValue: "Maximización de disponibilidad con recursos limitados"
          },
          {
            name: "Análisis financiero",
            description: "Proyección de costos y ahorros por estrategia",
            visualizationType: "Dashboard financiero",
            businessValue: "Justificación económica de inversiones en mantenimiento"
          },
          {
            name: "Planificación de recursos",
            description: "Programación óptima de personal, repuestos y herramientas",
            visualizationType: "Plan de recursos",
            businessValue: "Utilización eficiente de recursos limitados"
          },
          {
            name: "Análisis de escenarios",
            description: "Evaluación de diferentes estrategias y restricciones",
            visualizationType: "Comparativa de escenarios",
            businessValue: "Flexibilidad ante cambios en prioridades o recursos"
          }
        ]
      }
    ]
  }
];
