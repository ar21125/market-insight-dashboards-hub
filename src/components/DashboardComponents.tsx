
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ArrowDownIcon, ArrowUpIcon, HelpCircleIcon, Download } from "lucide-react";
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
      applications: {
        retail: "Clasificación de productos y clientes.",
        finanzas: "Clasificación de transacciones y detección de anomalías.",
        salud: "Diagnóstico médico y clasificación de imágenes médicas.",
        manufactura: "Control de calidad y clasificación de defectos.",
        tecnologia: "Filtrado de contenido y detección de spam.",
        educacion: "Clasificación de perfiles de aprendizaje."
      }
    },
    movingAverage: {
      title: "Media Móvil",
      description: "Técnica estadística básica para suavizar fluctuaciones y detectar tendencias.",
      applications: {
        retail: "Análisis básico de tendencias de ventas y estacionalidad.",
        finanzas: "Análisis técnico de mercados y detección de tendencias.",
        salud: "Identificación de tendencias en métricas de salud pública.",
        manufactura: "Monitoreo de tendencias en procesos de producción.",
        tecnologia: "Análisis de tendencias en métricas de uso.",
        educacion: "Seguimiento de tendencias en indicadores educativos."
      }
    },
    anova: {
      title: "Análisis ANOVA",
      description: "Análisis de varianza para comparar diferencias entre grupos.",
      applications: {
        retail: "Comparación de rendimiento entre tiendas o promociones.",
        finanzas: "Evaluación de estrategias de inversión y rendimientos.",
        salud: "Comparación de efectividad entre tratamientos o protocolos.",
        manufactura: "Análisis comparativo de rendimiento entre líneas o plantas.",
        tecnologia: "Testing A/B y comparación de versiones de producto.",
        educacion: "Comparación de métodos educativos y resultados."
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
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Modelos de Machine Learning disponibles</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-6">
          {Object.entries(modelInfo).map(([key, model]) => (
            <div key={key} className="space-y-2 border-b pb-4 last:border-b-0">
              <div className="flex justify-between items-center">
                <h3 className="font-medium text-md">{model.title}</h3>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="flex items-center gap-1"
                  onClick={() => handleDownload(key)}
                >
                  <Download className="h-4 w-4" />
                  Plantilla Excel
                </Button>
              </div>
              <p className="text-muted-foreground text-sm">{model.description}</p>
              <div className="bg-slate-50 p-3 rounded-md text-sm">
                <strong>Aplicación en {industry}:</strong> {model.applications[industry as keyof typeof model.applications]}
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6 pt-4 border-t text-sm text-muted-foreground">
          <p>
            Para utilizar estos modelos, descargue la plantilla Excel específica, complete los datos requeridos 
            y súbala para su procesamiento. Cada plantilla está optimizada para el análisis específico y sector de {industry}.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
