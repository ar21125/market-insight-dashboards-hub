
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRight, Clock, FileSearch, Activity, Download } from 'lucide-react';
import { getAnalysisFlowsByIndustry, AnalysisFlow, getAnalysisFlowById } from '@/services/analysisFlowService';
import { toast } from 'sonner';
import { generateExcelTemplate, createTemplateSectionsFromFlow } from '@/utils/excelTemplateGenerator';

interface AnalysisFlowsProps {
  industry: string;
}

export const AnalysisFlows: React.FC<AnalysisFlowsProps> = ({ industry }) => {
  const [selectedFlow, setSelectedFlow] = useState<string | null>(null);
  const flows = getAnalysisFlowsByIndustry(industry);

  const handleDownloadTemplate = (flowId: string) => {
    try {
      // Get the complete flow data
      const flow = getAnalysisFlowById(flowId);
      
      if (!flow) {
        toast.error('No se pudo encontrar el flujo de análisis');
        return;
      }
      
      // Show toast indicating download is starting
      toast.success('Descargando plantilla de análisis', {
        description: 'Se está preparando la plantilla con todos los campos necesarios para este flujo de análisis.',
        duration: 3000,
      });
      
      // Generate template sections from the flow
      const templateSections = createTemplateSectionsFromFlow(flow);
      
      // Generate and download the Excel template
      generateExcelTemplate(flowId, flow.name, templateSections);
      
      // Show completion toast
      toast.info('Plantilla descargada', {
        description: 'Recuerde completar todos los campos requeridos antes de subir el archivo.',
        duration: 4000,
      });
    } catch (error) {
      console.error('Error downloading template:', error);
      toast.error('Error al generar la plantilla', {
        description: 'No se pudo generar la plantilla. Por favor intente nuevamente.',
      });
    }
  };

  if (flows.length === 0) {
    return (
      <Card className="bg-muted/50">
        <CardContent className="pt-6 text-center">
          <p className="text-muted-foreground">
            No hay flujos de análisis definidos para esta industria.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium">Flujos de análisis especializados para {industry}</h3>
      <p className="text-muted-foreground">
        Cada flujo combina diferentes tipos de análisis que se complementan entre sí para ofrecer una visión más completa de su negocio.
      </p>
      
      <Tabs defaultValue={flows[0].id} onValueChange={setSelectedFlow}>
        <TabsList className="mb-4">
          {flows.map(flow => (
            <TabsTrigger key={flow.id} value={flow.id}>
              {flow.name}
            </TabsTrigger>
          ))}
        </TabsList>
        
        {flows.map(flow => (
          <TabsContent key={flow.id} value={flow.id} className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <CardTitle>{flow.name}</CardTitle>
                    <CardDescription className="mt-1">{flow.description}</CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {flow.totalEstimatedTime}
                    </Badge>
                    <Button 
                      size="sm" 
                      onClick={() => handleDownloadTemplate(flow.id)}
                      className="flex items-center gap-1"
                    >
                      <Download className="h-4 w-4" />
                      Descargar plantilla
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-muted/50 p-4 rounded-lg flex items-center gap-3">
                    <Activity className="h-5 w-5 text-primary flex-shrink-0" />
                    <div>
                      <h4 className="font-medium">Objetivo de negocio</h4>
                      <p className="text-sm text-muted-foreground">{flow.businessGoal}</p>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <h4 className="font-medium mb-3 flex items-center gap-1">
                      <FileSearch className="h-4 w-4 text-primary" />
                      Secuencia de análisis
                    </h4>
                    
                    <Accordion type="single" collapsible className="w-full">
                      {flow.steps.map((step, index) => (
                        <AccordionItem key={step.id} value={step.id}>
                          <AccordionTrigger className="hover:bg-muted/50 px-3 rounded-md">
                            <div className="flex items-center gap-2">
                              <Badge variant="outline" className="h-6 w-6 rounded-full flex items-center justify-center p-0">
                                {index + 1}
                              </Badge>
                              <span>{step.name}</span>
                              {step.prerequisiteSteps.length > 0 && (
                                <Badge variant="secondary" className="ml-2 text-xs">
                                  Requiere paso{step.prerequisiteSteps.length > 1 ? 's' : ''} previo{step.prerequisiteSteps.length > 1 ? 's' : ''}
                                </Badge>
                              )}
                              <Badge className="ml-auto" variant={
                                step.difficulty === 'básico' ? 'outline' : 
                                step.difficulty === 'intermedio' ? 'secondary' : 
                                'default'
                              }>
                                {step.difficulty}
                              </Badge>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent className="px-3">
                            <div className="space-y-4">
                              <p className="text-sm">{step.description}</p>
                              
                              {/* Inputs needed */}
                              <div className="bg-muted/30 p-3 rounded-md">
                                <h5 className="text-sm font-medium mb-2">Datos necesarios:</h5>
                                <ul className="space-y-2">
                                  {step.inputFields.map((field, i) => (
                                    <li key={i} className="text-sm flex items-start gap-2">
                                      <Badge variant={field.required ? "default" : "outline"} className="mt-0.5">
                                        {field.required ? "Requerido" : "Opcional"}
                                      </Badge>
                                      <div>
                                        <span className="font-medium">{field.name}</span>
                                        <p className="text-muted-foreground text-xs">{field.description}</p>
                                        <p className="text-xs italic mt-0.5">Ejemplo: {field.example}</p>
                                      </div>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                              
                              {/* Outputs */}
                              <div className="bg-muted/30 p-3 rounded-md">
                                <h5 className="text-sm font-medium mb-2">Resultados obtenidos:</h5>
                                <ul className="space-y-3">
                                  {step.outputInsights.map((insight, i) => (
                                    <li key={i} className="text-sm">
                                      <div className="flex items-center gap-1">
                                        <ArrowRight className="h-3 w-3 text-primary" />
                                        <span className="font-medium">{insight.name}</span>
                                        <Badge variant="outline" className="ml-auto">
                                          {insight.visualizationType}
                                        </Badge>
                                      </div>
                                      <p className="text-muted-foreground text-xs ml-4">{insight.description}</p>
                                      <p className="text-primary text-xs ml-4 mt-1">Valor de negocio: {insight.businessValue}</p>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                              
                              <div className="flex items-center justify-between text-xs text-muted-foreground">
                                <span>Tiempo estimado: {step.estimatedProcessingTime}</span>
                                <span>Modelo: {step.modelType}</span>
                              </div>
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between bg-muted/30">
                <div className="text-sm">
                  <span className="font-medium">Herramientas recomendadas:</span>{' '}
                  {flow.recommendedTools.join(', ')}
                </div>
                <Button variant="outline" size="sm" className="gap-1">
                  Ver guía completa
                  <ArrowRight className="h-3 w-3" />
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};
