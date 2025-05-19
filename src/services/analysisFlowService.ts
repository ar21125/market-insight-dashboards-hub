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

// **************************************
// CROSS-CATEGORY ANALYSIS FLOWS
// **************************************
const crossIndustryFinanzasTech: AnalysisFlow = {
  id: 'cross-finanzas-tech',
  name: 'Optimización financiera para empresas de tecnología',
  description: 'Secuencia que combina análisis financieros con patrones de comportamiento de usuarios tecnológicos',
  industry: 'finanzas',
  businessGoal: 'Maximizar rentabilidad a través de la optimización de estrategias basadas en comportamiento de usuarios',
  steps: [
    {
      id: 'step1-user-segmentation',
      name: 'Segmentación de usuarios tecnológicos',
      description: 'Identifica patrones de uso y preferencias en usuarios de plataformas tecnológicas',
      modelType: 'kmeans',
      prerequisiteSteps: [],
      inputFields: [
        {
          name: 'Datos de uso',
          description: 'Métricas de interacción con la plataforma',
          example: 'Tabla con Usuario_ID, Tiempo_Uso, Funciones_Utilizadas',
          required: true,
          type: 'numeric'
        },
        {
          name: 'Información demográfica',
          description: 'Datos básicos de usuarios',
          example: 'Edad: 34, Ubicación: Madrid, Ocupación: Desarrollador',
          required: true,
          type: 'categorical'
        },
        {
          name: 'Historial de pagos',
          description: 'Registro de pagos por servicios',
          example: 'Tabla con Usuario_ID, Fecha_Pago, Monto, Tipo_Servio',
          required: true,
          type: 'numeric'
        }
      ],
      outputInsights: [
        {
          name: 'Perfiles de usuarios',
          description: 'Segmentos con comportamientos financieros y tecnológicos similares',
          businessValue: 'Permite personalizar ofertas y servicios financieros según perfil tecnológico',
          visualizationType: 'scatter'
        },
        {
          name: 'Sensibilidad a precios',
          description: 'Relación entre uso tecnológico y sensibilidad a modelos de precio',
          businessValue: 'Ayuda a optimizar estrategias de precios y suscripciones',
          visualizationType: 'heatmap'
        }
      ],
      estimatedProcessingTime: '25-40 minutos',
      difficulty: 'intermedio'
    },
    {
      id: 'step2-financial-forecast',
      name: 'Proyección financiera basada en adopción tecnológica',
      description: 'Predice comportamiento financiero basado en patrones de adopción tecnológica',
      modelType: 'xgboost',
      prerequisiteSteps: ['step1-user-segmentation'],
      inputFields: [
        {
          name: 'Segmento de usuario',
          description: 'Grupo del análisis anterior',
          example: 'Adoptadores tempranos de alto valor',
          required: true,
          type: 'categorical'
        },
        {
          name: 'Historial de inversiones',
          description: 'Registro de inversiones y rendimientos',
          example: 'Tabla con Usuario_ID, Tipo_Inversión, Monto, Rendimiento',
          required: true,
          type: 'numeric'
        },
        {
          name: 'Tendencias tecnológicas',
          description: 'Índices de adopción de nuevas tecnologías',
          example: 'Tabla con Tecnología, Tasa_Adopción, Fecha',
          required: true,
          type: 'numeric'
        }
      ],
      outputInsights: [
        {
          name: 'Predicción de inversiones',
          description: 'Proyección de comportamiento inversor basado en perfil tecnológico',
          businessValue: 'Permite anticipar necesidades de capital y servicios financieros',
          visualizationType: 'line'
        },
        {
          name: 'Oportunidades de cross-selling',
          description: 'Productos financieros con mayor probabilidad de adopción',
          businessValue: 'Optimiza estrategias de venta cruzada entre servicios financieros y tecnológicos',
          visualizationType: 'bar'
        }
      ],
      estimatedProcessingTime: '35-50 minutos',
      difficulty: 'avanzado'
    },
    {
      id: 'step3-risk-innovation-balance',
      name: 'Balance riesgo-innovación',
      description: 'Optimiza la cartera de inversiones balanceando innovación tecnológica y riesgo financiero',
      modelType: 'portfolioOptimization',
      prerequisiteSteps: ['step2-financial-forecast'],
      inputFields: [
        {
          name: 'Riesgo de inversiones',
          description: 'Perfiles de riesgo de diferentes inversiones',
          example: 'Tabla con Instrumento, Riesgo, Retorno_Esperado',
          required: true,
          type: 'numeric'
        },
        {
          name: 'Índice de innovación',
          description: 'Cuantificación del nivel de innovación de cada inversión',
          example: '75/100 - Altamente innovador',
          required: true,
          type: 'numeric'
        },
        {
          name: 'Restricciones de cartera',
          description: 'Límites y requisitos para el balance',
          example: 'Mín. 20% bajo riesgo, Máx. 30% alta innovación',
          required: true,
          type: 'text'
        }
      ],
      outputInsights: [
        {
          name: 'Cartera optimizada',
          description: 'Distribución óptima entre seguridad financiera e innovación',
          businessValue: 'Maximiza retorno ajustado a riesgo incorporando factor de innovación',
          visualizationType: 'pie'
        },
        {
          name: 'Escenarios de adopción',
          description: 'Simulaciones de resultados bajo diferentes escenarios de adopción tecnológica',
          businessValue: 'Permite planificación adaptativa según evolucionen las tendencias',
          visualizationType: 'radar'
        }
      ],
      estimatedProcessingTime: '45-70 minutos',
      difficulty: 'avanzado'
    }
  ],
  totalEstimatedTime: '2-3 horas',
  recommendedTools: ['Bloomberg Terminal', 'Tableau', 'Python con librerías financieras']
};

const crossHealthEducation: AnalysisFlow = {
  id: 'cross-salud-educacion',
  name: 'Optimización de educación médica basada en resultados',
  description: 'Secuencia que combina análisis educativos y de salud para mejorar formación de profesionales médicos',
  industry: 'salud',
  businessGoal: 'Mejorar resultados de salud mediante optimización de programas formativos',
  steps: [
    {
      id: 'step1-outcomes-analysis',
      name: 'Análisis de resultados clínicos',
      description: 'Evalúa los resultados de salud para identificar áreas de mejora',
      modelType: 'regression',
      prerequisiteSteps: [],
      inputFields: [
        {
          name: 'Resultados pacientes',
          description: 'Indicadores de salud post-tratamiento',
          example: 'Tabla con ID_Paciente, Procedimiento, Resultado, Tiempo_Recuperación',
          required: true,
          type: 'numeric'
        },
        {
          name: 'Perfil profesional',
          description: 'Información sobre formación del profesional que atendió',
          example: 'Años_Experiencia: 5, Especialización: Cardiología, Centro_Formación: Hospital X',
          required: true,
          type: 'categorical'
        },
        {
          name: 'Protocolos aplicados',
          description: 'Procedimientos y protocolos seguidos',
          example: 'Protocolo A-35, Versión 2.1, Fecha_Actualización: 2023-10',
          required: true,
          type: 'categorical'
        }
      ],
      outputInsights: [
        {
          name: 'Factores determinantes',
          description: 'Variables de formación que más impactan en resultados',
          businessValue: 'Identifica puntos críticos para intervención educativa',
          visualizationType: 'bar'
        },
        {
          name: 'Brechas de conocimiento',
          description: 'Áreas donde existen mayores discrepancias entre formación y práctica',
          businessValue: 'Permite priorizar áreas de actualización formativa',
          visualizationType: 'heatmap'
        }
      ],
      estimatedProcessingTime: '30-45 minutos',
      difficulty: 'intermedio'
    },
    {
      id: 'step2-learning-path-optimization',
      name: 'Optimización de rutas de aprendizaje médico',
      description: 'Diseña trayectorias formativas optimizadas según resultados',
      modelType: 'sequential',
      prerequisiteSteps: ['step1-outcomes-analysis'],
      inputFields: [
        {
          name: 'Factores críticos',
          description: 'Variables identificadas en análisis previo',
          example: 'Lista de factores con ponderación de importancia',
          required: true,
          type: 'categorical'
        },
        {
          name: 'Recursos formativos',
          description: 'Catálogo de módulos formativos disponibles',
          example: 'Tabla con Módulo, Duración, Competencias, Formato',
          required: true,
          type: 'categorical'
        },
        {
          name: 'Restricciones temporales',
          description: 'Limitaciones de tiempo para formación',
          example: '120 horas totales, máximo 8 horas semanales',
          required: true,
          type: 'text'
        }
      ],
      outputInsights: [
        {
          name: 'Secuencias óptimas',
          description: 'Orden recomendado de módulos formativos',
          businessValue: 'Maximiza impacto en resultados clínicos con recursos limitados',
          visualizationType: 'table'
        },
        {
          name: 'Puntos de evaluación',
          description: 'Momentos críticos para evaluar competencias adquiridas',
          businessValue: 'Permite ajustes en tiempo real a la ruta formativa',
          visualizationType: 'line'
        }
      ],
      estimatedProcessingTime: '40-55 minutos',
      difficulty: 'avanzado'
    },
    {
      id: 'step3-simulation-based-training',
      name: 'Programa de simulación personalizado',
      description: 'Genera escenarios de simulación basados en datos reales',
      modelType: 'generative',
      prerequisiteSteps: ['step2-learning-path-optimization'],
      inputFields: [
        {
          name: 'Perfiles de aprendizaje',
          description: 'Estilos de aprendizaje de los profesionales',
          example: 'Perfil: Visual-práctico, Ritmo: Intensivo',
          required: true,
          type: 'categorical'
        },
        {
          name: 'Casos históricos',
          description: 'Base de casos clínicos anonimizados',
          example: 'Tabla con Síntomas, Diagnóstico, Complicaciones, Tratamiento',
          required: true,
          type: 'categorical'
        },
        {
          name: 'Áreas de mejora',
          description: 'Competencias específicas a reforzar',
          example: 'Diagnóstico diferencial en cardiología geriátrica',
          required: true,
          type: 'text'
        }
      ],
      outputInsights: [
        {
          name: 'Escenarios simulados',
          description: 'Casos clínicos adaptados para entrenamiento',
          businessValue: 'Proporciona entrenamiento realista sin riesgos para pacientes',
          visualizationType: 'table'
        },
        {
          name: 'Métricas de progresión',
          description: 'Indicadores de mejora en competencias',
          businessValue: 'Permite validar la eficacia del entrenamiento antes de aplicación clínica',
          visualizationType: 'radar'
        }
      ],
      estimatedProcessingTime: '60-90 minutos',
      difficulty: 'avanzado'
    }
  ],
  totalEstimatedTime: '2.5-3.5 horas',
  recommendedTools: ['Plataforma LMS médico', 'Simuladores clínicos', 'Learning Analytics']
};

const crossRetailManufactura: AnalysisFlow = {
  id: 'cross-retail-manufactura',
  name: 'Cadena de suministro integrada orientada al consumidor',
  description: 'Secuencia que optimiza la producción y distribución desde la fábrica al consumidor final',
  industry: 'retail',
  businessGoal: 'Reducir costos operativos mientras se mejora la satisfacción del cliente',
  steps: [
    {
      id: 'step1-consumer-demand-analysis',
      name: 'Análisis de demanda del consumidor',
      description: 'Identifica patrones de demanda y preferencias de consumo',
      modelType: 'timeSeries',
      prerequisiteSteps: [],
      inputFields: [
        {
          name: 'Datos de ventas',
          description: 'Histórico detallado de transacciones',
          example: 'Tabla con Fecha, Producto, Cantidad, Lugar, Precio',
          required: true,
          type: 'numeric'
        },
        {
          name: 'Características de productos',
          description: 'Atributos y categorías de productos',
          example: 'Tabla con ID_Producto, Categoría, Atributos, Origen',
          required: true,
          type: 'categorical'
        },
        {
          name: 'Factores externos',
          description: 'Variables externas que afectan la demanda',
          example: 'Tabla con Fecha, Evento, Impacto_Estimado',
          required: false,
          type: 'categorical'
        }
      ],
      outputInsights: [
        {
          name: 'Patrones de demanda',
          description: 'Estacionalidad y tendencias por producto y ubicación',
          businessValue: 'Permite anticipar cambios en la demanda para producción y distribución',
          visualizationType: 'line'
        },
        {
          name: 'Elasticidad de precio',
          description: 'Sensibilidad de demanda a cambios de precio',
          businessValue: 'Ayuda a optimizar estrategias de precio y producción',
          visualizationType: 'scatter'
        }
      ],
      estimatedProcessingTime: '30-45 minutos',
      difficulty: 'intermedio'
    },
    {
      id: 'step2-manufacturing-optimization',
      name: 'Optimización de ciclos de producción',
      description: 'Ajusta la producción según la demanda prevista',
      modelType: 'optimization',
      prerequisiteSteps: ['step1-consumer-demand-analysis'],
      inputFields: [
        {
          name: 'Previsión de demanda',
          description: 'Resultados del análisis anterior',
          example: 'Producto A: 10,000 unidades esperadas en abril',
          required: true,
          type: 'numeric'
        },
        {
          name: 'Capacidad de producción',
          description: 'Límites y recursos disponibles',
          example: 'Línea 1: 500 uds/hora, Línea 2: 750 uds/hora',
          required: true,
          type: 'numeric'
        },
        {
          name: 'Costos operativos',
          description: 'Estructura de costos por línea y producto',
          example: 'Tabla con Producto, Línea, Costo_Unitario, Tiempo_Configuración',
          required: true,
          type: 'numeric'
        }
      ],
      outputInsights: [
        {
          name: 'Plan de producción',
          description: 'Calendario optimizado de producción por línea',
          businessValue: 'Minimiza costos mientras asegura disponibilidad de productos',
          visualizationType: 'table'
        },
        {
          name: 'Puntos críticos',
          description: 'Cuellos de botella y restricciones identificadas',
          businessValue: 'Identifica áreas para mejora de capacidad o flexibilidad',
          visualizationType: 'bar'
        }
      ],
      estimatedProcessingTime: '45-60 minutos',
      difficulty: 'avanzado'
    },
    {
      id: 'step3-inventory-distribution-optimization',
      name: 'Optimización de inventario y distribución',
      description: 'Determina niveles óptimos de inventario y rutas de distribución',
      modelType: 'network',
      prerequisiteSteps: ['step2-manufacturing-optimization'],
      inputFields: [
        {
          name: 'Plan de producción',
          description: 'Resultados del análisis anterior',
          example: 'Tabla con Producto, Fecha_Producción, Cantidad',
          required: true,
          type: 'numeric'
        },
        {
          name: 'Red logística',
          description: 'Centros de distribución y tiendas',
          example: 'Tabla con Origen, Destino, Distancia, Capacidad, Costo',
          required: true,
          type: 'categorical'
        },
        {
          name: 'Restricciones de inventario',
          description: 'Limitaciones de espacio y requerimientos',
          example: 'Tabla con Ubicación, Capacidad_Máxima, Stock_Seguridad',
          required: true,
          type: 'numeric'
        }
      ],
      outputInsights: [
        {
          name: 'Política de inventario',
          description: 'Niveles óptimos por ubicación y producto',
          businessValue: 'Reduce costos de mantenimiento de inventario y evita roturas de stock',
          visualizationType: 'heatmap'
        },
        {
          name: 'Plan de distribución',
          description: 'Rutas y frecuencias óptimas de transporte',
          businessValue: 'Minimiza costos logísticos mientras mantiene niveles de servicio',
          visualizationType: 'table'
        }
      ],
      estimatedProcessingTime: '50-75 minutos',
      difficulty: 'avanzado'
    }
  ],
  totalEstimatedTime: '2.5-3 horas',
  recommendedTools: ['Power BI', 'Python con librerías de optimización', 'GIS para rutas']
};

// Update the getAnalysisFlowsByIndustry function to include cross-industry flows
// Add these cross-industry flows to the appropriate arrays

// Update the existing arrays with our new cross-industry flows
const allFlows: Record<string, AnalysisFlow[]> = {
  finanzas: [finanzasCreditRiskFlow, finanzasFraudeDetectionFlow, crossIndustryFinanzasTech],
  retail: [retailCustomerLifetimeValueFlow, crossRetailManufactura],
  educacion: [educacionAprendizajeFlow, crossHealthEducation],
  salud: [saludPredictiveFlow, crossHealthEducation],
  manufactura: [manufacturaMantenimientoPredictivo, crossRetailManufactura],
  tecnologia: [tecnologiaEngagementFlow, crossIndustryFinanzasTech]
};

// Update the getAnalysisFlowsByIndustry function to include cross-industry flows
export const getAnalysisFlowsByIndustry = (industry: string): AnalysisFlow[] => {
  const industrySpecificFlows: Record<string, AnalysisFlow[]> = {
    finanzas: [finanzasCreditRiskFlow, finanzasFraudeDetectionFlow, crossIndustryFinanzasTech],
    retail: [retailCustomerLifetimeValueFlow, crossRetailManufactura],
    educacion: [educacionAprendizajeFlow, crossHealthEducation],
    salud: [saludPredictiveFlow, crossHealthEducation],
    manufactura: [manufacturaMantenimientoPredictivo, crossRetailManufactura],
    tecnologia: [tecnologiaEngagementFlow, crossIndustryFinanzasTech]
  };

  return industrySpecificFlows[industry] || [];
};

// Update getAnalysisFlowById with our new flows
export const getAnalysisFlowById = (flowId: string): AnalysisFlow | null => {
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
