
import React from 'react';
import AnalysisImplementationFlow from '@/components/AnalysisImplementationFlow';
import { FileUp, Database, ChartPie, CheckCircle } from 'lucide-react';

const EnergyImplementation = () => {
  const energyImplementationProps = {
    industry: "energia",
    analysisName: "Predicción de Demanda Energética",
    description: "Análisis predictivo para optimizar la distribución y producción energética basado en patrones históricos de consumo.",
    totalTime: "1-2 semanas",
    steps: [
      {
        id: 1,
        title: "Recopilación de datos",
        description: "Reúna datos históricos de consumo energético, variables climáticas y eventos especiales que afectan la demanda.",
        icon: FileUp,
        time: "2-3 días"
      },
      {
        id: 2,
        title: "Preprocesamiento de datos",
        description: "Normalización, limpieza e integración de datos de múltiples fuentes para crear conjuntos coherentes para análisis.",
        icon: Database,
        time: "1-2 días"
      },
      {
        id: 3,
        title: "Desarrollo de modelo predictivo",
        description: "Aplicación de algoritmos de series temporales y machine learning para crear modelos de predicción de demanda.",
        icon: ChartPie,
        time: "3-5 días"
      },
      {
        id: 4,
        title: "Validación y optimización",
        description: "Ajuste fino del modelo y generación de recomendaciones de distribución energética basadas en predicciones.",
        icon: CheckCircle,
        time: "2-3 días"
      }
    ],
    dataRequirements: [
      {
        name: "Datos de consumo energético",
        description: "Registros históricos de consumo por hora/día, segmentados por zona geográfica y tipo de consumidor.",
        format: "CSV o Excel, con timestamps en formato YYYY-MM-DD HH:MM:SS",
        example: "timestamp,zona_id,tipo_cliente,consumo_kwh\n2023-06-15 08:00:00,Z001,residencial,1450.25\n2023-06-15 09:00:00,Z001,residencial,1520.75"
      },
      {
        name: "Datos meteorológicos",
        description: "Temperaturas, humedad, velocidad del viento y condiciones climáticas asociadas a cada período.",
        format: "CSV con registros horarios o diarios",
        example: "fecha,hora,temperatura,humedad,vel_viento,condicion\n2023-06-15,08:00,24.5,65,8.2,soleado\n2023-06-15,09:00,25.8,63,7.5,soleado"
      },
      {
        name: "Eventos especiales",
        description: "Registro de días festivos, eventos importantes o situaciones excepcionales que afectan el consumo.",
        format: "CSV o Excel con fechas y descripción de eventos",
        example: "fecha,tipo_evento,descripcion,impacto_estimado\n2023-12-25,festivo,Navidad,alto\n2023-07-15,evento_deportivo,Final campeonato,medio"
      }
    ],
    methods: [
      {
        name: "Series Temporales (SARIMA)",
        description: "Modelo estadístico avanzado que captura dependencias temporales, tendencias y estacionalidad en series de datos.",
        useCases: [
          "Predicción de demanda energética a corto y medio plazo",
          "Análisis de patrones estacionales de consumo",
          "Detección de anomalías en el consumo energético"
        ],
        benefits: [
          "Captura patrones complejos de estacionalidad (diaria, semanal, anual)",
          "Proporciona intervalos de confianza para planificación",
          "Maneja eficazmente datos con componentes temporales"
        ]
      },
      {
        name: "XGBoost",
        description: "Algoritmo de boosting de alto rendimiento que combina múltiples modelos para mejorar la precisión predictiva.",
        useCases: [
          "Predicción precisa de demanda energética considerando múltiples variables",
          "Identificación de factores determinantes del consumo",
          "Optimización de distribución energética"
        ],
        benefits: [
          "Superior precisión predictiva en datos complejos",
          "Manejo eficiente de múltiples variables predictoras",
          "Capacidad para identificar interacciones no lineales entre variables"
        ]
      }
    ],
    benefits: [
      "Reducción de hasta un 20% en costos operativos mediante la optimización de la generación y distribución energética basada en predicciones precisas.",
      "Disminución de emisiones de carbono gracias a la optimización del uso de fuentes renovables en períodos adecuados según las predicciones de demanda.",
      "Mayor estabilidad de la red eléctrica al anticipar picos de demanda y prevenir sobrecargas del sistema.",
      "Ahorro de 10-15% en costos de mantenimiento mediante la planificación optimizada basada en predicciones de carga.",
      "Mejora en la satisfacción del cliente mediante un suministro más estable y la prevención proactiva de interrupciones.",
      "Optimización del almacenamiento energético, maximizando la eficiencia de baterías y sistemas de reserva."
    ],
    templateUrl: "#" // URL for the template download
  };

  return <AnalysisImplementationFlow {...energyImplementationProps} />;
};

export default EnergyImplementation;
