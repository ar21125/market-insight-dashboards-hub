
import React from 'react';
import AnalysisImplementationFlow from '@/components/AnalysisImplementationFlow';
import { FileUp, Database, ChartPie, CheckCircle } from 'lucide-react';

const AgricultureImplementation = () => {
  const agricultureImplementationProps = {
    industry: "agricultura",
    analysisName: "Optimización de Cultivos",
    description: "Análisis predictivo para maximizar la productividad de cultivos mediante la optimización de variables agrícolas.",
    totalTime: "1-2 semanas",
    steps: [
      {
        id: 1,
        title: "Preparación de datos",
        description: "Recopile datos históricos de rendimiento de cultivos, condiciones meteorológicas, tratamientos aplicados y características del suelo.",
        icon: FileUp,
        time: "2-3 días"
      },
      {
        id: 2,
        title: "Procesamiento y limpieza",
        description: "Validación y normalización de datos para eliminar valores atípicos y preparar los conjuntos para el análisis.",
        icon: Database,
        time: "1-2 días"
      },
      {
        id: 3,
        title: "Modelado predictivo",
        description: "Aplicación de algoritmos de machine learning para identificar patrones y construir modelos predictivos de rendimiento.",
        icon: ChartPie,
        time: "3-5 días"
      },
      {
        id: 4,
        title: "Optimización y recomendaciones",
        description: "Generación de recomendaciones específicas para optimizar la productividad de cultivos basadas en los resultados del modelo.",
        icon: CheckCircle,
        time: "2-3 días"
      }
    ],
    dataRequirements: [
      {
        name: "Datos de cultivo",
        description: "Historial de rendimiento por parcela, tipo de cultivo, fechas de siembra y cosecha.",
        format: "CSV o Excel, con fechas en formato YYYY-MM-DD",
        example: "parcela_id,cultivo,fecha_siembra,fecha_cosecha,rendimiento_kg_ha\n1,maiz,2023-03-15,2023-08-20,8500\n2,trigo,2023-04-10,2023-09-05,4200"
      },
      {
        name: "Datos meteorológicos",
        description: "Temperaturas, precipitaciones, humedad y radiación solar durante el ciclo de cultivo.",
        format: "CSV con registros diarios o semanales",
        example: "fecha,temp_max,temp_min,precip_mm,humedad,radiacion\n2023-03-15,28.5,15.2,0,65,850\n2023-03-16,27.8,16.0,12.5,75,750"
      },
      {
        name: "Datos de suelo",
        description: "Características del suelo por parcela, incluyendo pH, nutrientes y textura.",
        format: "CSV o Excel con una fila por parcela",
        example: "parcela_id,ph,nitrogeno_ppm,fosforo_ppm,potasio_ppm,materia_organica\n1,6.8,45,28,180,3.2\n2,7.1,38,22,165,2.8"
      }
    ],
    methods: [
      {
        name: "Random Forest",
        description: "Modelo de ensamble que combina múltiples árboles de decisión para predicción de rendimiento y clasificación de variables importantes.",
        useCases: [
          "Predicción de rendimiento de cultivos",
          "Identificación de variables críticas para la productividad",
          "Clasificación de tierras por potencial productivo"
        ],
        benefits: [
          "Alta precisión en problemas complejos con múltiples variables",
          "Capacidad para manejar datos faltantes",
          "Cálculo automático de importancia de variables"
        ]
      },
      {
        name: "Series Temporales (ARIMA/Prophet)",
        description: "Modelos estadísticos para análisis y predicción de datos secuenciales como rendimientos históricos o patrones climáticos.",
        useCases: [
          "Pronóstico de rendimientos futuros basados en tendencias históricas",
          "Análisis de estacionalidad en productividad",
          "Predicción de ventanas óptimas para siembra y cosecha"
        ],
        benefits: [
          "Captura patrones estacionales y cíclicos",
          "Incorpora múltiples variables temporales",
          "Proporciona intervalos de confianza para las predicciones"
        ]
      }
    ],
    benefits: [
      "Incremento de rendimiento de cultivos en un 15-25% mediante la optimización de prácticas agrícolas basada en datos.",
      "Reducción del uso de agua, fertilizantes y pesticidas hasta en un 20%, disminuyendo costos operativos y mejorando la sostenibilidad.",
      "Identificación temprana de riesgos potenciales como enfermedades o deficiencias nutricionales, permitiendo intervenciones preventivas.",
      "Planificación optimizada de siembra y cosecha para maximizar el aprovechamiento de condiciones climáticas favorables.",
      "Mejora en la calidad de cultivos mediante la optimización de factores clave identificados por el análisis.",
      "Reducción de pérdidas por factores ambientales adversos gracias a la anticipación basada en modelos predictivos."
    ],
    templateUrl: "#" // URL for the template download
  };

  return <AnalysisImplementationFlow {...agricultureImplementationProps} />;
};

export default AgricultureImplementation;
