
import React from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, ArrowRight } from "lucide-react";

export interface MCPRecommendationsProps {
  modelType: string; // Single model type
  // Add any other props needed
}

export const MCPRecommendations: React.FC<MCPRecommendationsProps> = ({ modelType }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recomendaciones de implementación</CardTitle>
        <CardDescription>
          Integre estos resultados con sus herramientas de negocio existentes
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-4">
          <div className="bg-muted/50 p-4 rounded-lg">
            <h3 className="font-medium mb-2">Acciones recomendadas para {modelType}</h3>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <Check className="h-5 w-5 text-primary mt-0.5" />
                <div className="space-y-1">
                  <p className="font-medium">Exportar datos procesados</p>
                  <p className="text-sm text-muted-foreground">
                    Descargue los resultados para integraciones personalizadas
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-5 w-5 text-primary mt-0.5" />
                <div className="space-y-1">
                  <p className="font-medium">Programar análisis automáticos</p>
                  <p className="text-sm text-muted-foreground">
                    Configure análisis periódicos para mantener insights actualizados
                  </p>
                </div>
              </li>
            </ul>
          </div>
          
          <div className="bg-muted/50 p-4 rounded-lg">
            <h3 className="font-medium mb-2">Integración con plataformas</h3>
            <ul className="space-y-3">
              <li className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <img src="/placeholder.svg" className="h-6 w-6" alt="Excel" />
                  <span>Microsoft Excel</span>
                </div>
                <Button variant="ghost" size="sm" className="gap-1">
                  Conectar <ArrowRight className="h-3 w-3" />
                </Button>
              </li>
              <li className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <img src="/placeholder.svg" className="h-6 w-6" alt="Power BI" />
                  <span>Power BI</span>
                </div>
                <Button variant="ghost" size="sm" className="gap-1">
                  Conectar <ArrowRight className="h-3 w-3" />
                </Button>
              </li>
              <li className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <img src="/placeholder.svg" className="h-6 w-6" alt="Tableau" />
                  <span>Tableau</span>
                </div>
                <Button variant="ghost" size="sm" className="gap-1">
                  Conectar <ArrowRight className="h-3 w-3" />
                </Button>
              </li>
            </ul>
          </div>
        </div>
        
        <Button className="w-full">Ver guía completa de integración</Button>
      </CardContent>
    </Card>
  );
};
