
// Analysis Flow Service - Defines specialized flows of complementary analyses by industry
// This service allows frontend to show users recommended analysis sequences that build upon each other

interface FlowInputField {
  name: string;
  description: string;
  example: string;
  required: boolean;
  type: 'text' | 'numeric' | 'date' | 'categorical';
}

interface FlowOutputInsight {
  name: string;
  description: string;
  businessValue: string;
  visualizationType: 'bar' | 'line' | 'pie' | 'scatter' | 'heatmap' | 'radar' | 'table';
}

interface AnalysisStep {
  id: string;
  name: string;
  description: string;
  modelType: string;
  prerequisiteSteps: string[];
  inputFields: FlowInputField[];
  outputInsights: FlowOutputInsight[];
  estimatedProcessingTime: string;
  difficulty: 'básico' | 'intermedio' | 'avanzado';
}

export interface AnalysisFlow {
  id: string;
  name: string;
  description: string;
  industry: string;
  businessGoal: string;
  steps: AnalysisStep[];
  totalEstimatedTime: string;
  recommendedTools: string[];
}

// **************************************
// FINANZAS - Specialized Analysis Flows
// **************************************
const finanzasCreditRiskFlow: AnalysisFlow = {
  id: 'finanzas-credit-risk',
  name: 'Evaluación integral de riesgo crediticio',
  description: 'Secuencia de análisis para evaluar, predecir y gestionar el riesgo crediticio en su cartera de clientes',
  industry: 'finanzas',
  businessGoal: 'Reducir tasas de impago mientras se mantiene o aumenta la base de clientes',
  steps: [
    {
      id: 'step1-segmentation',
      name: 'Segmentación de clientes',
      description: 'Agrupa clientes en categorías según su comportamiento financiero y características',
      modelType: 'kmeans',
      prerequisiteSteps: [],
      inputFields: [
        {
          name: 'Historial de pagos',
          description: 'Registro de pagos puntuales o atrasados de los últimos 24 meses',
          example: 'Tabla con ID_Cliente, Fecha_Pago, Días_Atraso',
          required: true,
          type: 'numeric'
        },
        {
          name: 'Datos demográficos',
          description: 'Información básica como edad, ubicación, estado civil',
          example: 'Edad: 35, Región: Centro, Estado civil: Casado',
          required: true,
          type: 'categorical'
        },
        {
          name: 'Ingresos declarados',
          description: 'Nivel de ingresos mensuales reportados por el cliente',
          example: '45000',
          required: true,
          type: 'numeric'
        }
      ],
      outputInsights: [
        {
          name: 'Grupos de clientes',
          description: 'Categorías de clientes con características similares',
          businessValue: 'Permite diseñar estrategias específicas para cada grupo',
          visualizationType: 'scatter'
        },
        {
          name: 'Características distintivas',
          description: 'Variables más importantes que definen cada grupo',
          businessValue: 'Identifica factores clave para diferenciar grupos de riesgo',
          visualizationType: 'radar'
        }
      ],
      estimatedProcessingTime: '15-30 minutos',
      difficulty: 'básico'
    },
    {
      id: 'step2-risk-prediction',
      name: 'Predicción de riesgo de impago',
      description: 'Calcula la probabilidad de impago para cada cliente',
      modelType: 'randomForest',
      prerequisiteSteps: ['step1-segmentation'],
      inputFields: [
        {
          name: 'Segmento del cliente',
          description: 'Grupo al que pertenece el cliente (del paso anterior)',
          example: 'Grupo 3 - Riesgo moderado',
          required: true,
          type: 'categorical'
        },
        {
          name: 'Ratio deuda/ingresos',
          description: 'Proporción de deudas mensuales respecto a ingresos',
          example: '0.35',
          required: true,
          type: 'numeric'
        },
        {
          name: 'Número de productos financieros',
          description: 'Cantidad de productos que tiene contratados con su entidad',
          example: '3',
          required: false,
          type: 'numeric'
        }
      ],
      outputInsights: [
        {
          name: 'Probabilidad de impago',
          description: 'Porcentaje de riesgo de impago en los próximos 6 meses',
          businessValue: 'Permite tomar decisiones preventivas antes del impago',
          visualizationType: 'bar'
        },
        {
          name: 'Variables influyentes',
          description: 'Factores que más afectan al riesgo de impago',
          businessValue: 'Ayuda a entender qué aspectos monitorear para reducir riesgos',
          visualizationType: 'bar'
        }
      ],
      estimatedProcessingTime: '30-45 minutos',
      difficulty: 'intermedio'
    },
    {
      id: 'step3-optimization',
      name: 'Optimización de condiciones crediticias',
      description: 'Recomendaciones personalizadas para ajustar condiciones según el perfil de riesgo',
      modelType: 'optimization',
      prerequisiteSteps: ['step2-risk-prediction'],
      inputFields: [
        {
          name: 'Puntuación de riesgo',
          description: 'Puntuación numérica de riesgo (del paso anterior)',
          example: '78.5',
          required: true,
          type: 'numeric'
        },
        {
          name: 'Márgenes actuales',
          description: 'Rentabilidad actual de cada producto por cliente',
          example: 'Tabla con ID_Cliente, Producto, Margen',
          required: true,
          type: 'numeric'
        },
        {
          name: 'Sensibilidad de precio',
          description: 'Elasticidad del cliente ante cambios en las condiciones',
          example: '0.85',
          required: false,
          type: 'numeric'
        }
      ],
      outputInsights: [
        {
          name: 'Ajustes recomendados',
          description: 'Sugerencias de modificaciones en tasas, plazos o límites',
          businessValue: 'Balance óptimo entre riesgo y rentabilidad para cada cliente',
          visualizationType: 'table'
        },
        {
          name: 'Impacto proyectado',
          description: 'Efecto esperado en morosidad y rentabilidad',
          businessValue: 'Permite evaluar el beneficio de implementar los cambios sugeridos',
          visualizationType: 'line'
        }
      ],
      estimatedProcessingTime: '45-60 minutos',
      difficulty: 'avanzado'
    }
  ],
  totalEstimatedTime: '2-3 horas',
  recommendedTools: ['PowerBI', 'Tableau', 'Excel avanzado']
};

const finanzasFraudeDetectionFlow: AnalysisFlow = {
  id: 'finanzas-fraude-detection',
  name: 'Detección avanzada de fraude financiero',
  description: 'Secuencia de análisis para identificar patrones sospechosos y prevenir fraudes en tiempo real',
  industry: 'finanzas',
  businessGoal: 'Reducir pérdidas por fraude mientras se minimiza la fricción con clientes legítimos',
  steps: [
    {
      id: 'step1-anomaly-detection',
      name: 'Detección de anomalías',
      description: 'Identifica transacciones que se desvían del comportamiento normal del cliente',
      modelType: 'anomalyDetection',
      prerequisiteSteps: [],
      inputFields: [
        {
          name: 'Historial de transacciones',
          description: 'Registro de movimientos financieros de los últimos 6 meses',
          example: 'Tabla con Fecha, Monto, Comercio, Tipo_Transacción',
          required: true,
          type: 'numeric'
        },
        {
          name: 'Ubicación geográfica',
          description: 'Lugar donde se realizó cada transacción',
          example: 'Ciudad: Madrid, País: España',
          required: true,
          type: 'categorical'
        },
        {
          name: 'Dispositivo utilizado',
          description: 'Tipo de dispositivo desde el que se realizó la transacción',
          example: 'Mobile, Desktop, ATM',
          required: false,
          type: 'categorical'
        }
      ],
      outputInsights: [
        {
          name: 'Puntuación de anomalía',
          description: 'Calificación de qué tan inusual es cada transacción',
          businessValue: 'Permite priorizar qué transacciones requieren revisión',
          visualizationType: 'scatter'
        },
        {
          name: 'Patrones temporales',
          description: 'Comportamiento de transacciones a lo largo del tiempo',
          businessValue: 'Identifica momentos de mayor riesgo',
          visualizationType: 'line'
        }
      ],
      estimatedProcessingTime: '20-40 minutos',
      difficulty: 'intermedio'
    },
    {
      id: 'step2-pattern-recognition',
      name: 'Reconocimiento de patrones fraudulentos',
      description: 'Compara transacciones con patrones conocidos de fraude',
      modelType: 'xgboost',
      prerequisiteSteps: ['step1-anomaly-detection'],
      inputFields: [
        {
          name: 'Puntuación de anomalía',
          description: 'Resultado del análisis anterior',
          example: '0.87',
          required: true,
          type: 'numeric'
        },
        {
          name: 'Velocidad de transacciones',
          description: 'Tiempo entre operaciones consecutivas',
          example: '45 segundos',
          required: true,
          type: 'numeric'
        },
        {
          name: 'Cambio en patrones',
          description: 'Diferencias respecto al comportamiento histórico',
          example: 'Alto - Compras en categorías nunca utilizadas',
          required: true,
          type: 'categorical'
        }
      ],
      outputInsights: [
        {
          name: 'Probabilidad de fraude',
          description: 'Porcentaje que indica la probabilidad de que sea fraude',
          businessValue: 'Permite bloquear automáticamente transacciones de alto riesgo',
          visualizationType: 'bar'
        },
        {
          name: 'Factores de riesgo',
          description: 'Variables que más influyen en la clasificación',
          businessValue: 'Ayuda a entender qué aspectos monitorear',
          visualizationType: 'radar'
        }
      ],
      estimatedProcessingTime: '15-30 minutos',
      difficulty: 'avanzado'
    },
    {
      id: 'step3-network-analysis',
      name: 'Análisis de redes y conexiones',
      description: 'Identifica relaciones entre transacciones y entidades para detectar redes fraudulentas',
      modelType: 'networkAnalysis',
      prerequisiteSteps: ['step2-pattern-recognition'],
      inputFields: [
        {
          name: 'Conexiones entre cuentas',
          description: 'Transferencias y relaciones entre cuentas',
          example: 'Tabla con Cuenta_Origen, Cuenta_Destino, Monto, Fecha',
          required: true,
          type: 'categorical'
        },
        {
          name: 'Información de beneficiarios',
          description: 'Datos sobre quienes reciben los fondos',
          example: 'Nombre, Frecuencia de aparición, País',
          required: true,
          type: 'categorical'
        },
        {
          name: 'Alertas previas',
          description: 'Registros de alertas anteriores relacionadas',
          example: 'ID_Alerta, Tipo, Fecha, Resolución',
          required: false,
          type: 'categorical'
        }
      ],
      outputInsights: [
        {
          name: 'Gráfico de conexiones',
          description: 'Visualización de relaciones entre entidades',
          businessValue: 'Identifica redes complejas difíciles de detectar individualmente',
          visualizationType: 'heatmap'
        },
        {
          name: 'Entidades sospechosas',
          description: 'Cuentas, beneficiarios o comercios con mayor probabilidad de fraude',
          businessValue: 'Permite investigar proactivamente antes de más transacciones',
          visualizationType: 'table'
        }
      ],
      estimatedProcessingTime: '60-90 minutos',
      difficulty: 'avanzado'
    }
  ],
  totalEstimatedTime: '2-4 horas',
  recommendedTools: ['GraphDB', 'NetworkX', 'Gephi']
};

// **************************************
// RETAIL - Specialized Analysis Flows
// **************************************
const retailCustomerLifetimeValueFlow: AnalysisFlow = {
  id: 'retail-customer-ltv',
  name: 'Análisis de valor del ciclo de vida del cliente',
  description: 'Secuencia para calcular, predecir y optimizar el valor total que un cliente genera durante su relación con la empresa',
  industry: 'retail',
  businessGoal: 'Maximizar el valor de cada cliente e identificar oportunidades de crecimiento',
  steps: [
    {
      id: 'step1-customer-segmentation',
      name: 'Segmentación de clientes',
      description: 'Divide a los clientes en grupos significativos según su comportamiento de compra',
      modelType: 'kmeans',
      prerequisiteSteps: [],
      inputFields: [
        {
          name: 'Historial de compras',
          description: 'Registro de todas las transacciones de compra de los clientes',
          example: 'Tabla con ID_Cliente, Fecha, Productos, Monto',
          required: true,
          type: 'numeric'
        },
        {
          name: 'Frecuencia de compra',
          description: 'Cada cuánto tiempo realiza compras el cliente',
          example: '14 días promedio entre compras',
          required: true,
          type: 'numeric'
        },
        {
          name: 'Datos demográficos',
          description: 'Información sobre edad, ubicación, etc.',
          example: 'Edad: 28, Ciudad: Barcelona',
          required: false,
          type: 'categorical'
        }
      ],
      outputInsights: [
        {
          name: 'Segmentos de clientes',
          description: 'Grupos de clientes con patrones de compra similares',
          businessValue: 'Permite diseñar estrategias específicas para cada grupo',
          visualizationType: 'scatter'
        },
        {
          name: 'Características de cada segmento',
          description: 'Qué define a cada grupo de clientes',
          businessValue: 'Ayuda a entender los diferentes tipos de clientes',
          visualizationType: 'radar'
        }
      ],
      estimatedProcessingTime: '20-40 minutos',
      difficulty: 'básico'
    },
    {
      id: 'step2-ltv-calculation',
      name: 'Cálculo de valor de vida del cliente',
      description: 'Calcula el valor pasado y proyectado de cada cliente',
      modelType: 'regression',
      prerequisiteSteps: ['step1-customer-segmentation'],
      inputFields: [
        {
          name: 'Segmento del cliente',
          description: 'Grupo al que pertenece (del paso anterior)',
          example: 'Compradores frecuentes de alto valor',
          required: true,
          type: 'categorical'
        },
        {
          name: 'Historial de gastos',
          description: 'Montos de compras a lo largo del tiempo',
          example: 'Tabla con Fecha, Monto, Categoría',
          required: true,
          type: 'numeric'
        },
        {
          name: 'Tasa de retención',
          description: 'Probabilidad de que el cliente siga comprando',
          example: '78%',
          required: true,
          type: 'numeric'
        }
      ],
      outputInsights: [
        {
          name: 'Valor de vida actual',
          description: 'Estimación del valor total que generará cada cliente',
          businessValue: 'Permite priorizar esfuerzos en clientes más valiosos',
          visualizationType: 'bar'
        },
        {
          name: 'Proyección futura',
          description: 'Evolución esperada del valor del cliente',
          businessValue: 'Ayuda a planificar estrategias a largo plazo',
          visualizationType: 'line'
        }
      ],
      estimatedProcessingTime: '30-45 minutos',
      difficulty: 'intermedio'
    },
    {
      id: 'step3-recommendation-engine',
      name: 'Motor de recomendaciones personalizadas',
      description: 'Sugiere productos específicos para aumentar el valor de cada cliente',
      modelType: 'recommendationSystem',
      prerequisiteSteps: ['step2-ltv-calculation'],
      inputFields: [
        {
          name: 'Historial de productos',
          description: 'Productos que ha comprado cada cliente',
          example: 'Tabla con ID_Cliente, ID_Producto, Fecha',
          required: true,
          type: 'categorical'
        },
        {
          name: 'Valor de vida calculado',
          description: 'LTV del paso anterior',
          example: '2450€',
          required: true,
          type: 'numeric'
        },
        {
          name: 'Comportamiento de navegación',
          description: 'Cómo interactúa el cliente con su sitio web/app',
          example: 'Páginas visitadas, tiempo en cada sección',
          required: false,
          type: 'categorical'
        }
      ],
      outputInsights: [
        {
          name: 'Productos recomendados',
          description: 'Lista de productos con mayor probabilidad de compra',
          businessValue: 'Incrementa ventas cruzadas y valor del cliente',
          visualizationType: 'table'
        },
        {
          name: 'Incremento potencial de LTV',
          description: 'Cuánto puede aumentar el valor del cliente',
          businessValue: 'Cuantifica el beneficio de las recomendaciones',
          visualizationType: 'bar'
        }
      ],
      estimatedProcessingTime: '45-60 minutos',
      difficulty: 'avanzado'
    }
  ],
  totalEstimatedTime: '2-3 horas',
  recommendedTools: ['Tableau', 'PowerBI', 'Customer Data Platform']
};

// **************************************
// EDUCACIÓN - Specialized Analysis Flows
// **************************************
const educacionAprendizajeFlow: AnalysisFlow = {
  id: 'educacion-aprendizaje-personalizado',
  name: 'Análisis de aprendizaje personalizado',
  description: 'Secuencia para evaluar, predecir y mejorar el rendimiento académico mediante rutas de aprendizaje personalizadas',
  industry: 'educacion',
  businessGoal: 'Mejorar resultados académicos y reducir tasas de abandono',
  steps: [
    {
      id: 'step1-perfil-estudiante',
      name: 'Perfilado de estudiantes',
      description: 'Identifica patrones de aprendizaje y estilos cognitivos',
      modelType: 'clustering',
      prerequisiteSteps: [],
      inputFields: [
        {
          name: 'Resultados académicos',
          description: 'Notas y evaluaciones por asignatura',
          example: 'Tabla con ID_Estudiante, Asignatura, Calificación',
          required: true,
          type: 'numeric'
        },
        {
          name: 'Tiempo dedicado',
          description: 'Horas de estudio o interacción con materiales',
          example: '4.5 horas semanales',
          required: true,
          type: 'numeric'
        },
        {
          name: 'Preferencias de formato',
          description: 'Tipo de contenido con el que interactúa más',
          example: 'Video, Texto, Interactivo',
          required: false,
          type: 'categorical'
        }
      ],
      outputInsights: [
        {
          name: 'Estilos de aprendizaje',
          description: 'Categorías de estudiantes según cómo aprenden mejor',
          businessValue: 'Permite adaptar contenidos al estilo de cada estudiante',
          visualizationType: 'radar'
        },
        {
          name: 'Fortalezas y debilidades',
          description: 'Áreas donde cada estudiante destaca o necesita apoyo',
          businessValue: 'Permite enfocar recursos donde más se necesitan',
          visualizationType: 'bar'
        }
      ],
      estimatedProcessingTime: '15-30 minutos',
      difficulty: 'básico'
    },
    {
      id: 'step2-prediccion-rendimiento',
      name: 'Predicción de rendimiento académico',
      description: 'Estima el rendimiento futuro y riesgo de fracaso',
      modelType: 'regression',
      prerequisiteSteps: ['step1-perfil-estudiante'],
      inputFields: [
        {
          name: 'Perfil de aprendizaje',
          description: 'Resultados del análisis anterior',
          example: 'Visual-práctico',
          required: true,
          type: 'categorical'
        },
        {
          name: 'Patrones de asistencia',
          description: 'Registro de asistencia a clases o acceso a plataforma',
          example: '85% de asistencia',
          required: true,
          type: 'numeric'
        },
        {
          name: 'Participación',
          description: 'Nivel de interacción en actividades',
          example: 'Alto/Medio/Bajo',
          required: true,
          type: 'categorical'
        }
      ],
      outputInsights: [
        {
          name: 'Predicción de calificaciones',
          description: 'Estimación de resultados futuros por asignatura',
          businessValue: 'Permite intervenir antes de que surjan problemas',
          visualizationType: 'line'
        },
        {
          name: 'Riesgo de abandono',
          description: 'Probabilidad de que el estudiante abandone el curso',
          businessValue: 'Ayuda a implementar medidas de retención',
          visualizationType: 'heatmap'
        }
      ],
      estimatedProcessingTime: '30-45 minutos',
      difficulty: 'intermedio'
    },
    {
      id: 'step3-ruta-personalizada',
      name: 'Generación de ruta de aprendizaje personalizada',
      description: 'Crea un itinerario adaptado a cada estudiante',
      modelType: 'sequential',
      prerequisiteSteps: ['step2-prediccion-rendimiento'],
      inputFields: [
        {
          name: 'Objetivos de aprendizaje',
          description: 'Metas específicas a alcanzar',
          example: 'Dominio de álgebra lineal',
          required: true,
          type: 'categorical'
        },
        {
          name: 'Predicciones de rendimiento',
          description: 'Resultados del análisis anterior',
          example: 'Calificación esperada: 7.5',
          required: true,
          type: 'numeric'
        },
        {
          name: 'Recursos disponibles',
          description: 'Materiales y actividades que pueden asignarse',
          example: 'Lista de recursos educativos',
          required: true,
          type: 'categorical'
        }
      ],
      outputInsights: [
        {
          name: 'Plan de aprendizaje',
          description: 'Secuencia recomendada de actividades y recursos',
          businessValue: 'Optimiza el proceso de aprendizaje para cada estudiante',
          visualizationType: 'table'
        },
        {
          name: 'Proyección de mejora',
          description: 'Estimación de la mejora con el plan personalizado',
          businessValue: 'Demuestra el valor de la personalización',
          visualizationType: 'line'
        }
      ],
      estimatedProcessingTime: '45-60 minutos',
      difficulty: 'avanzado'
    }
  ],
  totalEstimatedTime: '2-3 horas',
  recommendedTools: ['Moodle Analytics', 'LMS integrado', 'Tableau']
};

// **************************************
// SALUD - Specialized Analysis Flows
// **************************************
const saludPredictiveFlow: AnalysisFlow = {
  id: 'salud-prediccion-pacientes',
  name: 'Predicción de readmisiones hospitalarias',
  description: 'Secuencia para identificar pacientes con alto riesgo de reingreso y planificar intervenciones preventivas',
  industry: 'salud',
  businessGoal: 'Reducir tasas de readmisión y mejorar resultados clínicos',
  steps: [
    {
      id: 'step1-estratificacion-pacientes',
      name: 'Estratificación de pacientes',
      description: 'Categoriza pacientes según su perfil clínico y factores de riesgo',
      modelType: 'clustering',
      prerequisiteSteps: [],
      inputFields: [
        {
          name: 'Historial clínico',
          description: 'Diagnósticos previos y tratamientos',
          example: 'Tabla con ID_Paciente, Diagnóstico, Tratamiento',
          required: true,
          type: 'categorical'
        },
        {
          name: 'Datos demográficos',
          description: 'Edad, género y factores sociales',
          example: 'Edad: 65, Género: F, Situación social: Vive solo',
          required: true,
          type: 'categorical'
        },
        {
          name: 'Indicadores clínicos',
          description: 'Valores de pruebas y signos vitales',
          example: 'Presión arterial, niveles de glucosa, etc.',
          required: true,
          type: 'numeric'
        }
      ],
      outputInsights: [
        {
          name: 'Grupos de riesgo',
          description: 'Categorías de pacientes según su nivel de riesgo',
          businessValue: 'Permite priorizar recursos de seguimiento',
          visualizationType: 'pie'
        },
        {
          name: 'Factores determinantes',
          description: 'Variables que más influyen en cada grupo',
          businessValue: 'Identifica factores clave para intervenciones',
          visualizationType: 'bar'
        }
      ],
      estimatedProcessingTime: '20-40 minutos',
      difficulty: 'intermedio'
    },
    {
      id: 'step2-prediccion-readmision',
      name: 'Predicción de readmisiones',
      description: 'Calcula la probabilidad de reingreso en 30 días',
      modelType: 'xgboost',
      prerequisiteSteps: ['step1-estratificacion-pacientes'],
      inputFields: [
        {
          name: 'Grupo de riesgo',
          description: 'Resultado de la estratificación anterior',
          example: 'Alto riesgo - Tipo 2',
          required: true,
          type: 'categorical'
        },
        {
          name: 'Medicación actual',
          description: 'Tratamientos que está recibiendo el paciente',
          example: 'Lista de medicamentos y dosis',
          required: true,
          type: 'categorical'
        },
        {
          name: 'Adherencia terapéutica',
          description: 'Nivel de cumplimiento del tratamiento',
          example: '75% de adherencia',
          required: false,
          type: 'numeric'
        }
      ],
      outputInsights: [
        {
          name: 'Probabilidad de readmisión',
          description: 'Porcentaje de riesgo para cada paciente',
          businessValue: 'Permite planificar intervenciones preventivas',
          visualizationType: 'heatmap'
        },
        {
          name: 'Causas probables',
          description: 'Razones más probables para el reingreso',
          businessValue: 'Ayuda a personalizar las intervenciones',
          visualizationType: 'radar'
        }
      ],
      estimatedProcessingTime: '30-50 minutos',
      difficulty: 'avanzado'
    },
    {
      id: 'step3-plan-intervencion',
      name: 'Planificación de intervenciones personalizadas',
      description: 'Diseña un plan de seguimiento adaptado a cada paciente',
      modelType: 'optimization',
      prerequisiteSteps: ['step2-prediccion-readmision'],
      inputFields: [
        {
          name: 'Riesgo de readmisión',
          description: 'Porcentaje calculado en el paso anterior',
          example: '68%',
          required: true,
          type: 'numeric'
        },
        {
          name: 'Recursos disponibles',
          description: 'Personal y programas de seguimiento disponibles',
          example: 'Visitas domiciliarias, telemonitorización, etc.',
          required: true,
          type: 'categorical'
        },
        {
          name: 'Preferencias del paciente',
          description: 'Modo de contacto preferido y disponibilidad',
          example: 'Prefiere llamadas telefónicas por la tarde',
          required: false,
          type: 'categorical'
        }
      ],
      outputInsights: [
        {
          name: 'Plan de intervención',
          description: 'Acciones específicas recomendadas por paciente',
          businessValue: 'Maximiza la efectividad del seguimiento',
          visualizationType: 'table'
        },
        {
          name: 'Impacto esperado',
          description: 'Reducción proyectada en la tasa de readmisión',
          businessValue: 'Permite evaluar el retorno de la inversión',
          visualizationType: 'line'
        }
      ],
      estimatedProcessingTime: '40-60 minutos',
      difficulty: 'avanzado'
    }
  ],
  totalEstimatedTime: '2-3 horas',
  recommendedTools: ['FHIR Analytics', 'HL7 Integration', 'Tableau Healthcare']
};

// **************************************
// MANUFACTURA - Specialized Analysis Flows
// **************************************
const manufacturaMantenimientoPredictivo: AnalysisFlow = {
  id: 'manufactura-mantenimiento-predictivo',
  name: 'Mantenimiento predictivo de equipos industriales',
  description: 'Secuencia para anticipar fallos en maquinaria antes de que ocurran y optimizar el mantenimiento',
  industry: 'manufactura',
  businessGoal: 'Reducir tiempos de inactividad y costos de mantenimiento',
  steps: [
    {
      id: 'step1-monitoreo-anomalias',
      name: 'Detección de anomalías en sensores',
      description: 'Identifica patrones inusuales en las lecturas de sensores',
      modelType: 'anomalyDetection',
      prerequisiteSteps: [],
      inputFields: [
        {
          name: 'Datos de sensores',
          description: 'Lecturas de temperatura, vibración, presión, etc.',
          example: 'Tabla con ID_Sensor, Timestamp, Valor',
          required: true,
          type: 'numeric'
        },
        {
          name: 'Especificaciones técnicas',
          description: 'Rangos normales de funcionamiento',
          example: 'Temperatura: 60-85°C, Vibración: <2.5mm/s',
          required: true,
          type: 'numeric'
        },
        {
          name: 'Historial de mantenimiento',
          description: 'Registro de intervenciones previas',
          example: 'Fecha, Tipo (preventivo/correctivo), Componentes',
          required: false,
          type: 'categorical'
        }
      ],
      outputInsights: [
        {
          name: 'Puntuación de anomalía',
          description: 'Índice que indica qué tan inusual es cada lectura',
          businessValue: 'Detecta problemas potenciales antes de que causen fallos',
          visualizationType: 'line'
        },
        {
          name: 'Patrones temporales',
          description: 'Evolución de anomalías a lo largo del tiempo',
          businessValue: 'Identifica tendencias y patrones cíclicos',
          visualizationType: 'heatmap'
        }
      ],
      estimatedProcessingTime: '30-45 minutos',
      difficulty: 'intermedio'
    },
    {
      id: 'step2-prediccion-fallos',
      name: 'Predicción de fallos de equipos',
      description: 'Calcula la probabilidad y tiempo hasta el fallo',
      modelType: 'survival',
      prerequisiteSteps: ['step1-monitoreo-anomalias'],
      inputFields: [
        {
          name: 'Anomalías detectadas',
          description: 'Resultados del análisis anterior',
          example: 'Puntuaciones de anomalía por sensor',
          required: true,
          type: 'numeric'
        },
        {
          name: 'Ciclos de operación',
          description: 'Horas de funcionamiento y ciclos completados',
          example: '45.000 horas, 8.500 ciclos',
          required: true,
          type: 'numeric'
        },
        {
          name: 'Historial de fallos previos',
          description: 'Registro de fallos anteriores en equipos similares',
          example: 'Componente, Tiempo hasta fallo, Condiciones',
          required: true,
          type: 'categorical'
        }
      ],
      outputInsights: [
        {
          name: 'Probabilidad de fallo',
          description: 'Porcentaje de riesgo de fallo por equipo',
          businessValue: 'Permite priorizar intervenciones',
          visualizationType: 'bar'
        },
        {
          name: 'Tiempo estimado hasta fallo',
          description: 'Días/horas restantes hasta fallo probable',
          businessValue: 'Ayuda a programar el mantenimiento en el momento óptimo',
          visualizationType: 'scatter'
        }
      ],
      estimatedProcessingTime: '45-60 minutos',
      difficulty: 'avanzado'
    },
    {
      id: 'step3-optimizacion-mantenimiento',
      name: 'Optimización del calendario de mantenimiento',
      description: 'Diseña un programa óptimo para minimizar costos e inactividad',
      modelType: 'optimization',
      prerequisiteSteps: ['step2-prediccion-fallos'],
      inputFields: [
        {
          name: 'Predicciones de fallos',
          description: 'Resultados del análisis anterior',
          example: 'Probabilidad y tiempo hasta fallo por equipo',
          required: true,
          type: 'numeric'
        },
        {
          name: 'Costos asociados',
          description: 'Costos de mantenimiento y de tiempo inactivo',
          example: 'Preventivo: 5000€, Correctivo: 25000€, Hora inactiva: 2000€',
          required: true,
          type: 'numeric'
        },
        {
          name: 'Restricciones operativas',
          description: 'Limitaciones de personal y producción',
          example: 'Ventanas de mantenimiento disponibles, personal técnico',
          required: true,
          type: 'categorical'
        }
      ],
      outputInsights: [
        {
          name: 'Calendario óptimo',
          description: 'Programa de intervenciones recomendado',
          businessValue: 'Balance óptimo entre prevención y producción',
          visualizationType: 'table'
        },
        {
          name: 'Ahorro proyectado',
          description: 'Estimación de costos evitados y eficiencia ganada',
          businessValue: 'Cuantifica el beneficio del mantenimiento predictivo',
          visualizationType: 'bar'
        }
      ],
      estimatedProcessingTime: '60-90 minutos',
      difficulty: 'avanzado'
    }
  ],
  totalEstimatedTime: '3-4 horas',
  recommendedTools: ['IoT Platform', 'SCADA Integration', 'PowerBI']
};

// **************************************
// TECNOLOGIA - Specialized Analysis Flows
// **************************************
const tecnologiaEngagementFlow: AnalysisFlow = {
  id: 'tecnologia-user-engagement',
  name: 'Optimización de la retención y engagement de usuarios',
  description: 'Secuencia para analizar, predecir y mejorar la participación y retención de usuarios en aplicaciones digitales',
  industry: 'tecnologia',
  businessGoal: 'Incrementar retención de usuarios y tiempo de uso de la plataforma',
  steps: [
    {
      id: 'step1-analisis-comportamiento',
      name: 'Análisis de patrones de comportamiento',
      description: 'Identifica cómo interactúan los usuarios con la plataforma',
      modelType: 'clustering',
      prerequisiteSteps: [],
      inputFields: [
        {
          name: 'Logs de actividad',
          description: 'Registro de acciones de usuario en la plataforma',
          example: 'Usuario, Timestamp, Acción, Sección',
          required: true,
          type: 'categorical'
        },
        {
          name: 'Tiempo de sesión',
          description: 'Duración de las sesiones de usuario',
          example: '12 minutos promedio',
          required: true,
          type: 'numeric'
        },
        {
          name: 'Rutas de navegación',
          description: 'Secuencia de páginas/pantallas visitadas',
          example: 'Home > Producto > Carrito > Checkout',
          required: false,
          type: 'categorical'
        }
      ],
      outputInsights: [
        {
          name: 'Perfiles de uso',
          description: 'Grupos de usuarios con comportamientos similares',
          businessValue: 'Permite personalizar la experiencia por tipo de usuario',
          visualizationType: 'scatter'
        },
        {
          name: 'Puntos de fricción',
          description: 'Áreas donde los usuarios abandonan con frecuencia',
          businessValue: 'Identifica oportunidades de mejora específicas',
          visualizationType: 'heatmap'
        }
      ],
      estimatedProcessingTime: '20-40 minutos',
      difficulty: 'básico'
    },
    {
      id: 'step2-prediccion-abandono',
      name: 'Predicción de abandono (churn)',
      description: 'Calcula la probabilidad de que un usuario deje de usar la plataforma',
      modelType: 'xgboost',
      prerequisiteSteps: ['step1-analisis-comportamiento'],
      inputFields: [
        {
          name: 'Perfil de usuario',
          description: 'Grupo identificado en el análisis anterior',
          example: 'Usuario ocasional de alto valor',
          required: true,
          type: 'categorical'
        },
        {
          name: 'Frecuencia de uso',
          description: 'Regularidad con la que usa la plataforma',
          example: '2.5 días por semana',
          required: true,
          type: 'numeric'
        },
        {
          name: 'Interacciones recientes',
          description: 'Actividad en los últimos X días',
          example: 'Disminución del 30% en acciones',
          required: true,
          type: 'numeric'
        }
      ],
      outputInsights: [
        {
          name: 'Riesgo de abandono',
          description: 'Probabilidad de que cada usuario abandone',
          businessValue: 'Permite intervenir antes de perder usuarios',
          visualizationType: 'bar'
        },
        {
          name: 'Factores determinantes',
          description: 'Variables que más influyen en el abandono',
          businessValue: 'Identifica qué aspectos mejorar prioritariamente',
          visualizationType: 'radar'
        }
      ],
      estimatedProcessingTime: '30-45 minutos',
      difficulty: 'intermedio'
    },
    {
      id: 'step3-personalizacion-experiencia',
      name: 'Personalización dinámica de experiencia',
      description: 'Genera recomendaciones para adaptar la experiencia según el perfil',
      modelType: 'recommendationSystem',
      prerequisiteSteps: ['step2-prediccion-abandono'],
      inputFields: [
        {
          name: 'Riesgo de abandono',
          description: 'Probabilidad calculada en el paso anterior',
          example: '68%',
          required: true,
          type: 'numeric'
        },
        {
          name: 'Preferencias de usuario',
          description: 'Funciones y contenido que más utiliza',
          example: 'Preferencia por videos, usa principalmente móvil',
          required: true,
          type: 'categorical'
        },
        {
          name: 'Historial de respuesta',
          description: 'Cómo ha reaccionado a intervenciones previas',
          example: 'Responde bien a notificaciones pero ignora emails',
          required: false,
          type: 'categorical'
        }
      ],
      outputInsights: [
        {
          name: 'Acciones recomendadas',
          description: 'Intervenciones sugeridas por usuario',
          businessValue: 'Maximiza la retención con acciones personalizadas',
          visualizationType: 'table'
        },
        {
          name: 'Impacto proyectado',
          description: 'Mejora esperada en retención y engagement',
          businessValue: 'Permite medir el ROI de las intervenciones',
          visualizationType: 'line'
        }
      ],
      estimatedProcessingTime: '45-60 minutos',
      difficulty: 'avanzado'
    }
  ],
  totalEstimatedTime: '2-3 horas',
  recommendedTools: ['Mixpanel', 'Amplitude', 'Customer.io']
};

// Function to get all flows for a specific industry
export const getAnalysisFlowsByIndustry = (industry: string): AnalysisFlow[] => {
  const allFlows: Record<string, AnalysisFlow[]> = {
    finanzas: [finanzasCreditRiskFlow, finanzasFraudeDetectionFlow],
    retail: [retailCustomerLifetimeValueFlow],
    educacion: [educacionAprendizajeFlow],
    salud: [saludPredictiveFlow],
    manufactura: [manufacturaMantenimientoPredictivo],
    tecnologia: [tecnologiaEngagementFlow]
  };

  return allFlows[industry] || [];
};

// Function to get a specific flow by ID
export const getAnalysisFlowById = (flowId: string): AnalysisFlow | null => {
  const allFlows = [
    finanzasCreditRiskFlow, 
    finanzasFraudeDetectionFlow,
    retailCustomerLifetimeValueFlow,
    educacionAprendizajeFlow,
    saludPredictiveFlow,
    manufacturaMantenimientoPredictivo,
    tecnologiaEngagementFlow
  ];
  
  return allFlows.find(flow => flow.id === flowId) || null;
};

// Function to get recommended flows based on model type and industry
export const getRecommendedFlows = (modelType: string, industry: string): AnalysisFlow[] => {
  const industryFlows = getAnalysisFlowsByIndustry(industry);
  
  // Filter flows that include steps with the specified model type
  return industryFlows.filter(flow => 
    flow.steps.some(step => step.modelType === modelType)
  );
};
