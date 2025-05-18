
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ArrowDownIcon, ArrowUpIcon, HelpCircleIcon } from "lucide-react";
import { formatNumber } from "@/lib/api";
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from "@/components/ui/tooltip";
import IndustryFieldsDropdown from './IndustryFieldsDropdown';
import { toast } from "sonner";

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
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Modelos de Machine Learning disponibles</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {Object.entries(modelInfo).map(([key, model]) => (
          <div key={key} className="space-y-2">
            <h3 className="font-medium text-md">{model.title}</h3>
            <p className="text-muted-foreground text-sm">{model.description}</p>
            <div className="bg-slate-50 p-3 rounded-md text-sm">
              <strong>Aplicación en {industry}:</strong> {model.applications[industry as keyof typeof model.applications]}
            </div>
          </div>
        ))}
        
        <div className="mt-4 pt-4 border-t text-sm text-muted-foreground">
          <p>Para utilizar estos modelos, descargue la plantilla Excel y complete los datos requeridos.</p>
        </div>
      </CardContent>
    </Card>
  );
};
