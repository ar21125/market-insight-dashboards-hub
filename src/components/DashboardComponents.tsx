
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ArrowDownIcon, ArrowUpIcon, HelpCircleIcon, Download, FileChartLine } from "lucide-react";
import { formatNumber, getExcelTemplate } from "@/lib/api";
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from "@/components/ui/tooltip";
import IndustryFieldsDropdown from './IndustryFieldsDropdown';
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface StatCardProps {
  title: string;
  value: number;
  change: number;
  format?: boolean;
}

export const StatCard = ({ title, value, change, format = true }: StatCardProps) => {
  const isPositive = change >= 0;
  const displayValue = format ? formatNumber(value) : value.toString();
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{displayValue}</div>
        <div className="flex items-center mt-1">
          {isPositive ? (
            <ArrowUpIcon className="h-4 w-4 text-green-500 mr-1" />
          ) : (
            <ArrowDownIcon className="h-4 w-4 text-red-500 mr-1" />
          )}
          <p className={cn(
            "text-sm font-medium",
            isPositive ? "text-green-500" : "text-red-500"
          )}>
            {isPositive ? "+" : ""}{change}%
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

interface ChartContainerProps {
  title: string;
  children: React.ReactNode;
  className?: string;
  industry?: string;
  description?: string;
}

export const ChartContainer = ({ 
  title, 
  children, 
  className, 
  industry = "retail",
  description
}: ChartContainerProps) => {
  const handleFieldChange = (field: string) => {
    toast.info(`Seleccionado: ${field}`, {
      description: "En una implementación real, esto filtraría los datos para mostrar este campo específico."
    });
  };

  return (
    <Card className={className}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CardTitle className="text-lg font-medium">
              {title}
            </CardTitle>
            {description && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <HelpCircleIcon className="h-4 w-4 text-muted-foreground cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="max-w-xs text-sm">{description}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>
        </div>
        {industry && (
          <div className="mt-2 pt-2 border-t">
            <IndustryFieldsDropdown industry={industry} onChange={handleFieldChange} />
          </div>
        )}
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
    </Card>
  );
};

interface MlModelInfoProps {
  industry: string;
}

export const MlModelInfo: React.FC<MlModelInfoProps> = ({ industry }) => {
  const modelInfo = {
    sarima: {
      title: "Análisis SARIMA",
      description: "Modelo estadístico para análisis de series temporales con factores estacionales.",
      benefits: {
        retail: "Optimiza el inventario y reduce costes de almacenamiento anticipando patrones estacionales de demanda. Mejora hasta un 25% la precisión en planificación de inventario.",
        finanzas: "Anticipa tendencias de mercado considerando ciclos económicos y estacionalidad. Mejora la gestión de liquidez y planificación de inversiones.",
        salud: "Optimiza la asignación de recursos hospitalarios basándose en patrones estacionales de enfermedades y ocupación.",
        manufactura: "Reduce costes de producción y mejora la eficiencia anticipando demanda estacional y planificando la capacidad.",
        tecnologia: "Anticipa picos de uso, optimiza infraestructura y mejora la experiencia de usuario durante períodos de alta demanda.",
        educacion: "Predice patrones de matriculación y abandono, mejorando la planificación de recursos educativos y programas de retención."
      },
      implementation: "Integre este análisis en sus sistemas de planificación para anticipar tendencias estacionales. Los datos procesados pueden visualizarse en sus dashboards existentes mediante APIs REST.",
      inputFields: "Serie temporal (al menos 2-3 temporadas completas), factores estacionales, variables externas que afecten la demanda.",
      applications: {
        retail: "Predicción de ventas estacionales y demanda de productos.",
        finanzas: "Análisis de tendencias en mercados financieros y previsión de resultados.",
        salud: "Predicción de ocupación hospitalaria y demanda estacional de servicios.",
        manufactura: "Previsión de producción y demanda de inventarios con factores estacionales.",
        tecnologia: "Análisis de patrones de uso y predicción de tendencias de usuarios.",
        educacion: "Proyección de matriculaciones y abandono con factores estacionales."
      }
    },
    prophet: {
      title: "Modelo Prophet",
      description: "Algoritmo de Meta para pronósticos de series temporales con múltiples estacionalidades.",
      benefits: {
        retail: "Mejora la previsión de demanda considerando múltiples factores estacionales (diarios, semanales, anuales) y eventos especiales como promociones o festividades.",
        finanzas: "Genera pronósticos financieros robustos considerando ciclos de mercado, días festivos y eventos externos. Reduce la volatilidad en la planificación.",
        salud: "Optimiza la asignación de personal y recursos considerando múltiples patrones estacionales en la demanda de atención médica.",
        manufactura: "Mejora la planificación de producción con pronósticos que consideran tendencias, ciclos y eventos especiales que afectan la cadena de suministro.",
        tecnologia: "Anticipa patrones de uso complejos, optimizando infraestructura y reduciendo costos operativos hasta un 30%.",
        educacion: "Mejora la planificación académica incorporando múltiples factores estacionales y eventos que impactan en la demanda educativa."
      },
      implementation: "Prophet puede integrarse como microservicio independiente o mediante API conectada a sus fuentes de datos. Los resultados son compatibles con herramientas de visualización como Power BI o Tableau.",
      inputFields: "Serie temporal histórica, calendario de eventos especiales (feriados, promociones), datos de tendencias a largo plazo, capacidad máxima (opcional).",
      applications: {
        retail: "Gestión avanzada de inventarios y personal basado en tendencias.",
        finanzas: "Predicción de rendimientos y volatilidad de mercados.",
        salud: "Previsión de necesidades de recursos médicos y personal.",
        manufactura: "Optimización de cadena de suministro y previsión de mantenimiento.",
        tecnologia: "Pronóstico de crecimiento y comportamiento de usuarios.",
        educacion: "Análisis de tendencias educativas y asignación de recursos."
      }
    },
    kmeans: {
      title: "Segmentación K-means",
      description: "Algoritmo de clustering para segmentar datos en grupos con características similares.",
      benefits: {
        retail: "Identifica segmentos de clientes con comportamientos de compra similares, permitiendo estrategias de marketing personalizadas que aumentan la conversión hasta un 35%.",
        finanzas: "Segmenta clientes por perfil de riesgo y comportamiento, optimizando estrategias de inversión y ofertas de productos financieros.",
        salud: "Agrupa pacientes con perfiles médicos similares, mejorando tratamientos personalizados y resultados clínicos.",
        manufactura: "Identifica patrones en procesos de producción y calidad, reduciendo defectos y optimizando operaciones.",
        tecnologia: "Segmenta usuarios por comportamiento, mejorando la personalización y aumentando la retención hasta un 25%.",
        educacion: "Agrupa estudiantes según necesidades y rendimiento, permitiendo intervenciones educativas personalizadas."
      },
      implementation: "Los resultados de K-means pueden integrarse en sus CRM, sistemas de marketing o plataformas de análisis para acciones automatizadas basadas en segmentos.",
      inputFields: "Datos multidimensionales normalizados, número aproximado de clusters esperados, limitaciones de distancia (opcional).",
      applications: {
        retail: "Segmentación de clientes por patrones de compra y valor.",
        finanzas: "Agrupación de clientes por perfil de riesgo y comportamiento.",
        salud: "Segmentación de pacientes por perfiles de salud y tratamientos.",
        manufactura: "Detección de patrones de producción y calidad.",
        tecnologia: "Agrupación de usuarios por comportamiento y perfil de uso.",
        educacion: "Segmentación de estudiantes por rendimiento y necesidades."
      }
    },
    arima: {
      title: "Modelo ARIMA",
      description: "Modelo autorregresivo integrado de media móvil para series temporales no estacionales.",
      benefits: {
        retail: "Mejora pronósticos de corto plazo para optimizar pedidos y reducir costos de inventario hasta un 20%.",
        finanzas: "Captura tendencias y ciclos en mercados financieros para mejorar decisiones de trading e inversión.",
        salud: "Predice tendencias en indicadores de salud y demanda de servicios a corto plazo.",
        manufactura: "Optimiza la planificación de producción y mantenimiento en entornos de demanda variable.",
        tecnologia: "Mejora la predicción de métricas técnicas como latencia o uso de recursos.",
        educacion: "Anticipa cambios en indicadores educativos para intervenciones oportunas."
      },
      implementation: "ARIMA puede implementarse como componente de sistemas ERP o BI existentes, proporcionando pronósticos automatizados para decisiones operativas.",
      inputFields: "Serie temporal estacionaria o diferenciada, parámetros p, d, q sugeridos, pruebas de estacionariedad.",
      applications: {
        retail: "Pronóstico de tendencias de ventas a corto plazo.",
        finanzas: "Modelado de rendimientos financieros y precios de activos.",
        salud: "Predicción de métricas sanitarias no estacionales.",
        manufactura: "Análisis de tendencias de producción y calidad.",
        tecnologia: "Predicción de métricas de rendimiento técnico.",
        educacion: "Modelado de tendencias en resultados académicos."
      }
    },
    randomForest: {
      title: "Random Forest",
      description: "Algoritmo de aprendizaje conjunto basado en árboles de decisión para clasificación y regresión.",
      benefits: {
        retail: "Predice propensión de compra y riesgo de abandono con alta precisión (85-90%), permitiendo acciones preventivas y ofertas personalizadas.",
        finanzas: "Mejora la detección de fraude y evaluación de riesgo crediticio, reduciendo pérdidas y aumentando la seguridad.",
        salud: "Mejora diagnósticos y predicción de resultados clínicos con precisión superior a modelos tradicionales.",
        manufactura: "Predice fallos en equipos antes que ocurran, reduciendo tiempo de inactividad y costos de mantenimiento.",
        tecnologia: "Identifica patrones complejos en comportamiento de usuarios para personalización avanzada.",
        educacion: "Predice éxito académico y riesgo de abandono con múltiples variables, mejorando intervenciones."
      },
      implementation: "Random Forest puede integrarse como API o modelo local en sus aplicaciones de negocio, proporcionando predicciones en tiempo real o por lotes.",
      inputFields: "Datos de entrenamiento con múltiples variables predictoras, variable objetivo, parámetros de optimización del modelo.",
      applications: {
        retail: "Predicción de propensión de compra y análisis de abandono.",
        finanzas: "Detección de fraude y evaluación de riesgo crediticio.",
        salud: "Diagnóstico predictivo y análisis de resultados clínicos.",
        manufactura: "Detección predictiva de fallos y control de calidad.",
        tecnologia: "Predicción de comportamiento de usuarios y detección de anomalías.",
        educacion: "Predicción de éxito académico y riesgo de abandono."
      }
    },
    xgboost: {
      title: "XGBoost",
      description: "Algoritmo de gradient boosting de alto rendimiento para problemas de clasificación y regresión.",
      benefits: {
        retail: "Optimiza precios dinámicamente y genera recomendaciones con precisión superior (hasta 95%), aumentando ventas cruzadas y valor del cliente.",
        finanzas: "Mejora sistemas de trading algorítmico y predicción de riesgos con modelos más precisos y robustos.",
        salud: "Predice readmisiones hospitalarias y efectividad de tratamientos con mayor precisión que métodos convencionales.",
        manufactura: "Optimiza procesos industriales complejos con múltiples variables, reduciendo costos y mejorando calidad.",
        tecnologia: "Potencia sistemas de recomendación avanzados, aumentando engagement y conversión.",
        educacion: "Personaliza recomendaciones educativas basadas en múltiples factores de aprendizaje."
      },
      implementation: "XGBoost puede desplegarse como servicio escalable en la nube o integrarse en sus aplicaciones existentes a través de APIs de predicción.",
      inputFields: "Conjuntos de datos con múltiples variables, datos de entrenamiento y validación, especificación de hiperparámetros.",
      applications: {
        retail: "Optimización de precios y recomendaciones personalizadas.",
        finanzas: "Trading algorítmico y predicción avanzada de mercados.",
        salud: "Predicción de readmisiones y análisis de eficacia de tratamientos.",
        manufactura: "Optimización de procesos industriales y rendimiento.",
        tecnologia: "Modelos avanzados de recomendación y personalización.",
        educacion: "Sistemas de recomendación educativa personalizada."
      }
    },
    lstm: {
      title: "Redes LSTM",
      description: "Redes neuronales recurrentes para modelado de secuencias y dependencias temporales.",
      benefits: {
        retail: "Captura patrones complejos en datos de ventas multi-dimensionales, mejorando predicciones en escenarios variables o con múltiples factores externos.",
        finanzas: "Mejora predicciones de precios de activos y análisis de sentimiento de mercado, capturando dependencias temporales complejas.",
        salud: "Analiza series temporales médicas complejas (ECG, EEG) con mayor precisión que métodos tradicionales, mejorando diagnósticos.",
        manufactura: "Predice fallos de equipos analizando secuencias de datos de sensores, reduciendo mantenimiento no planificado hasta un 40%.",
        tecnologia: "Analiza secuencias de comportamiento de usuario para predecir acciones futuras y personalizar experiencias.",
        educacion: "Identifica patrones complejos en trayectorias de aprendizaje para intervenciones educativas personalizadas."
      },
      implementation: "Las LSTM requieren infraestructura de ML robusta, pero pueden implementarse como servicios escalables en la nube consumibles a través de API REST.",
      inputFields: "Secuencias temporales preprocesadas, definición de estructura de la red, hiperparámetros de entrenamiento, datos de validación.",
      applications: {
        retail: "Predicción de demanda con múltiples variables y patrones complejos.",
        finanzas: "Predicción de series temporales financieras y análisis de sentimiento.",
        salud: "Análisis de series temporales médicas (ECG, EEG) y detección de anomalías.",
        manufactura: "Predictivo avanzado de mantenimiento y control de calidad.",
        tecnologia: "Análisis de secuencias de comportamiento y patrones complejos.",
        educacion: "Análisis de trayectorias de aprendizaje y patrones de progreso."
      }
    },
    pca: {
      title: "Análisis PCA",
      description: "Reducción dimensional para visualización y preparación de datos multivariables.",
      benefits: {
        retail: "Identifica patrones ocultos en datos de ventas y clientes, reduciendo dimensiones de datos y facilitando visualizaciones efectivas.",
        finanzas: "Simplifica modelos financieros complejos manteniendo la información esencial, mejorando interpretabilidad y rendimiento.",
        salud: "Revela factores principales en grandes conjuntos de datos médicos, identificando variables determinantes en resultados clínicos.",
        manufactura: "Identifica variables clave en procesos de producción complejos, simplificando control y optimización.",
        tecnologia: "Mejora rendimiento de modelos reduciendo dimensionalidad de datos y encontrando características importantes.",
        educacion: "Identifica factores clave en rendimiento educativo entre múltiples variables."
      },
      implementation: "PCA puede utilizarse como paso de preprocesamiento en pipelines de análisis de datos o visualizaciones interactivas en dashboards.",
      inputFields: "Conjunto de datos multidimensional, número de componentes deseados, método de escalado de datos.",
      applications: {
        retail: "Análisis de patrones ocultos en datos de ventas y clientes.",
        finanzas: "Reducción de dimensionalidad para modelos financieros complejos.",
        salud: "Identificación de factores principales en datos médicos multivariables.",
        manufactura: "Detección de variables clave en procesos de producción complejos.",
        tecnologia: "Optimización de características en grandes conjuntos de datos.",
        educacion: "Identificación de factores clave en rendimiento educativo."
      }
    },
    svm: {
      title: "Support Vector Machines",
      description: "Algoritmo de aprendizaje supervisado para clasificación y regresión con margen máximo.",
      benefits: {
        retail: "Clasifica productos y clientes con alta precisión incluso con datos limitados, mejorando segmentación y gestión de catálogos.",
        finanzas: "Detecta transacciones anómalas y clasifica riesgos con robustez frente a outliers, mejorando seguridad.",
        salud: "Mejora diagnóstico médico y clasificación de imágenes, especialmente en casos con límites de decisión complejos.",
        manufactura: "Clasifica con precisión defectos de calidad y anomalías en procesos de producción.",
        tecnologia: "Filtra contenidos y detecta spam/fraude con alta precisión y robustez.",
        educacion: "Clasifica perfiles de aprendizaje para personalizar estrategias educativas."
      },
      implementation: "SVM puede implementarse como componente de clasificación en aplicaciones de negocio o como API de servicio para clasificación por lotes o en tiempo real.",
      inputFields: "Datos de entrenamiento con etiquetas, selección de kernel, parámetros de regularización, datos normalizados.",
      applications: {
        retail: "Clasificación de productos y clientes.",
        finanzas: "Clasificación de transacciones y detección de anomalías.",
        salud: "Diagnóstico médico y clasificación de imágenes médicas.",
        manufactura: "Control de calidad y clasificación de defectos.",
        tecnologia: "Filtrado de contenido y detección de spam.",
        educacion: "Clasificación de perfiles de aprendizaje."
      }
    },
    anova: {
      title: "Análisis ANOVA",
      description: "Análisis de varianza para comparar diferencias entre grupos.",
      benefits: {
        retail: "Evalúa estadísticamente la efectividad de diferentes estrategias de marketing, promociones o diseños de tienda.",
        finanzas: "Compara rendimientos entre diferentes estrategias de inversión, identificando opciones óptimas con significancia estadística.",
        salud: "Compara efectividad entre tratamientos médicos o protocolos, fundamentando decisiones clínicas con evidencia estadística.",
        manufactura: "Identifica diferencias significativas entre líneas de producción, proveedores o métodos de fabricación.",
        tecnologia: "Valida resultados de tests A/B con rigor estadístico, optimizando decisiones de diseño de producto.",
        educacion: "Compara efectividad entre metodologías educativas, currículos o enfoques pedagógicos."
      },
      implementation: "ANOVA puede integrarse en herramientas de análisis de negocio o implementarse como módulo estadístico en plataformas de BI existentes.",
      inputFields: "Datos agrupados por categorías, variable dependiente medible, factores de agrupación, nivel de significancia deseado.",
      applications: {
        retail: "Comparación de rendimiento entre tiendas o promociones.",
        finanzas: "Evaluación de estrategias de inversión y rendimientos.",
        salud: "Comparación de efectividad entre tratamientos o protocolos.",
        manufactura: "Análisis comparativo de rendimiento entre líneas o plantas.",
        tecnologia: "Testing A/B y comparación de versiones de producto.",
        educacion: "Comparación de métodos educativos y resultados."
      }
    },
    timeSeries: {
      title: "Análisis de Series Temporales",
      description: "Conjunto de técnicas estadísticas para analizar datos secuenciales en el tiempo.",
      benefits: {
        retail: "Identifica patrones cíclicos, tendencias y anomalías en ventas, mejorando planificación y detectando oportunidades.",
        finanzas: "Detecta tendencias y ciclos en mercados financieros, optimizando decisiones de inversión y gestión de riesgos.",
        salud: "Analiza tendencias en salud pública e indicadores hospitalarios, mejorando planificación sanitaria.",
        manufactura: "Optimiza mantenimiento preventivo y planificación de producción basándose en patrones históricos.",
        tecnologia: "Mejora monitoreo de sistemas y detección temprana de anomalías en métricas técnicas.",
        educacion: "Analiza tendencias en rendimiento académico y participación para optimizar intervenciones."
      },
      implementation: "Puede implementarse mediante bibliotecas estadísticas en su plataforma de análisis o como componente en dashboards de BI.",
      inputFields: "Serie temporal ordenada, frecuencia de muestreo, información de estacionalidad, eventos especiales o interrupciones.",
      applications: {
        retail: "Análisis de tendencias de ventas y patrones estacionales.",
        finanzas: "Estudio de tendencias y ciclos en mercados financieros.",
        salud: "Análisis de tendencias en indicadores de salud pública.",
        manufactura: "Monitoreo de tendencias en producción y calidad.",
        tecnologia: "Análisis de tendencias en métricas técnicas y de usuario.",
        educacion: "Estudio de tendencias en indicadores educativos."
      }
    },
    decisionTree: {
      title: "Árboles de Decisión",
      description: "Modelo de aprendizaje supervisado que crea un árbol de decisiones basado en reglas.",
      benefits: {
        retail: "Proporciona reglas claras y explicables para segmentación de clientes y predicción de comportamientos de compra.",
        finanzas: "Crea modelos transparentes y auditables para evaluación de riesgos y decisiones crediticias.",
        salud: "Desarrolla guías clínicas basadas en datos con decisiones fácilmente interpretables para diagnóstico.",
        manufactura: "Identifica causas raíz de defectos mediante reglas claras y accionables.",
        tecnologia: "Crea sistemas de recomendación explicables y transparentes para usuarios.",
        educacion: "Diseña rutas de aprendizaje personalizadas basadas en decisiones claras según perfil del estudiante."
      },
      implementation: "Puede implementarse como reglas de negocio explícitas en sistemas existentes o como modelos explicables en dashboards.",
      inputFields: "Conjunto de datos etiquetados, variables para la toma de decisiones, criterios de división y poda.",
      applications: {
        retail: "Segmentación de clientes y predicción de compras.",
        finanzas: "Evaluación de riesgo crediticio y detección de fraude.",
        salud: "Apoyo a diagnóstico y protocolos de tratamiento.",
        manufactura: "Análisis causa-raíz de defectos y control de calidad.",
        tecnologia: "Sistemas de recomendación y clasificación de usuarios.",
        educacion: "Personalización de rutas educativas."
      }
    },
    naiveBayes: {
      title: "Naive Bayes",
      description: "Clasificador probabilístico basado en el teorema de Bayes con independencia entre variables.",
      benefits: {
        retail: "Clasifica rápidamente productos y clientes con modelos simples que funcionan bien incluso con datos limitados.",
        finanzas: "Proporciona clasificación probabilística de riesgos y transacciones con alta eficiencia computacional.",
        salud: "Clasifica condiciones médicas basándose en síntomas con modelos sencillos y eficaces.",
        manufactura: "Identifica defectos de productos rápidamente con requisitos computacionales mínimos.",
        tecnologia: "Filtra contenido no deseado (spam, comentarios) con alta eficiencia y mínimo entrenamiento.",
        educacion: "Clasifica contenidos educativos y perfil de estudiantes con modelos simples y rápidos."
      },
      implementation: "Ideal como componente ligero en aplicaciones móviles o sistemas embebidos con recursos limitados.",
      inputFields: "Datos categóricos o discretos, etiquetas de clase, datos de entrenamiento con características independientes.",
      applications: {
        retail: "Clasificación rápida de clientes y productos.",
        finanzas: "Detección básica de fraude y clasificación de riesgos.",
        salud: "Diagnóstico preliminar basado en síntomas.",
        manufactura: "Clasificación rápida de control de calidad.",
        tecnologia: "Filtrado de spam y categorización básica de contenido.",
        educacion: "Clasificación de contenidos y perfiles educativos."
      }
    }
  };

  const handleDownload = (modelType: string) => {
    const fileName = getExcelTemplate(industry, modelType);
    toast.success(`Descargando plantilla: ${fileName}`, {
      description: `La plantilla ${modelType.toUpperCase()} para ${industry} está lista para descargar`,
      duration: 3000,
    });
    
    // Simulación de descarga real con Blob
    setTimeout(() => {
      // En una implementación real, aquí recibiríamos datos reales desde la API
      const fakeData = "Datos de ejemplo para la plantilla " + modelType;
      const blob = new Blob([fakeData], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const url = window.URL.createObjectURL(blob);
      
      // Crear un elemento de enlace invisible para la descarga
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      
      // Limpiar después de la descarga
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    }, 500);
  };

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Modelos de Machine Learning para {industry}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-6">
            Seleccione el modelo adecuado según sus necesidades de análisis. Cada modelo está optimizado para resolver 
            diferentes problemas de negocio específicos para el sector de {industry}.
          </p>
          
          <Accordion type="single" collapsible className="w-full">
            {Object.entries(modelInfo).map(([key, model]) => (
              <AccordionItem key={key} value={key}>
                <AccordionTrigger className="hover:bg-slate-50 px-4 py-2 rounded-md">
                  <div className="flex items-center">
                    <FileChartLine className="h-5 w-5 mr-2 text-primary" />
                    <span>{model.title}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-4 pt-2">
                  <div className="space-y-4 pb-2">
                    <div>
                      <p className="text-muted-foreground mb-2">{model.description}</p>
                      <div className="bg-blue-50 p-3 rounded-md mb-4">
                        <h4 className="font-medium text-blue-800 mb-1">Aplicación en {industry}</h4>
                        <p className="text-blue-700 text-sm">{model.applications[industry as keyof typeof model.applications]}</p>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-2">Beneficios clave</h4>
                      <p className="text-sm">{model.benefits[industry as keyof typeof model.benefits]}</p>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-2">Implementación</h4>
                      <p className="text-sm text-muted-foreground">{model.implementation}</p>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-2">Datos necesarios</h4>
                      <p className="text-sm text-muted-foreground">{model.inputFields}</p>
                    </div>
                    
                    <div className="pt-2">
                      <Button 
                        onClick={() => handleDownload(key)} 
                        variant="outline"
                        className="w-full flex items-center justify-center gap-2"
                      >
                        <Download className="h-4 w-4" />
                        Descargar plantilla Excel para {model.title}
                      </Button>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>
      
      <div className="bg-slate-50 p-6 rounded-lg border border-slate-200">
        <h3 className="text-lg font-medium mb-4">Integración con su infraestructura</h3>
        <div className="space-y-4">
          <p>
            Todos nuestros modelos de machine learning pueden integrarse en su infraestructura 
            existente mediante APIs REST o microservicios individuales. La arquitectura MCP 
            (Model Communication Protocol) permite la conexión con servicios de ML tanto propios 
            como de terceros.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="bg-white p-4 rounded-md border border-slate-200">
              <h4 className="font-medium mb-2">Conexión con servicios existentes</h4>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>Integración con bases de datos SQL/NoSQL</li>
                <li>Conexión con sistemas ERP/CRM</li>
                <li>APIs para herramientas de visualización</li>
                <li>Webhooks para automatización</li>
              </ul>
            </div>
            <div className="bg-white p-4 rounded-md border border-slate-200">
              <h4 className="font-medium mb-2">Servicios ML compatibles</h4>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>Amazon SageMaker</li>
                <li>Google AI Platform</li>
                <li>Azure Machine Learning</li>
                <li>TensorFlow Serving</li>
                <li>MLflow</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
