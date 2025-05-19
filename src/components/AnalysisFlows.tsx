
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { ArrowRight, Clock, FileSearch, Activity, Download, Info, HelpCircle } from 'lucide-react';
import { getAnalysisFlowsByIndustry, AnalysisFlow, getAnalysisFlowById } from '@/services/analysisFlowService';
import { toast } from 'sonner';
import { generateExcelTemplate, createTemplateSectionsFromFlow } from '@/utils/excelTemplateGenerator';

interface AnalysisFlowsProps {
  industry: string;
}

export const AnalysisFlows: React.FC<AnalysisFlowsProps> = ({ industry }) => {
  const [selectedFlow, setSelectedFlow] = useState<string | null>(null);
  const [selectedStep, setSelectedStep] = useState<any | null>(null);
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

  // Explanation modals content
  const renderFlowExplanationContent = (flow: AnalysisFlow) => (
    <>
      <DialogHeader>
        <DialogTitle className="text-xl">{flow.name}</DialogTitle>
        <DialogDescription>
          {flow.description}
        </DialogDescription>
      </DialogHeader>
      <div className="py-4 space-y-4">
        <div>
          <h3 className="font-medium text-lg flex items-center gap-2">
            <Activity className="h-5 w-5 text-primary" />
            ¿Qué resuelve este flujo?
          </h3>
          <p className="mt-2 text-muted-foreground">
            {flow.businessGoal}
          </p>
        </div>
        
        <div className="border-t pt-4">
          <h3 className="font-medium text-lg">¿Cómo funciona?</h3>
          <p className="mt-2 text-muted-foreground">
            Este flujo de análisis combina {flow.steps.length} técnicas analíticas para proporcionar una visión
            integral de su negocio. Cada paso se complementa con el anterior para obtener insights 
            más profundos y accionables.
          </p>
        </div>
        
        <div className="border-t pt-4">
          <h3 className="font-medium text-lg">¿Quién debería utilizarlo?</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
            {flow.recommendedFor?.map((role, i) => (
              <div key={i} className="bg-slate-50 p-3 rounded-md">
                <p className="font-medium">{role.title}</p>
                <p className="text-sm text-muted-foreground">{role.reason}</p>
              </div>
            ))}
            {!flow.recommendedFor && (
              <p className="text-muted-foreground">
                Recomendado para gerentes, analistas y tomadores de decisiones que necesitan una 
                visión integral de su operación.
              </p>
            )}
          </div>
        </div>
        
        <div className="border-t pt-4">
          <h3 className="font-medium text-lg">Requisitos para comenzar</h3>
          <ul className="mt-2 space-y-2">
            <li className="flex items-start gap-2">
              <span className="bg-primary/20 text-primary h-5 w-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">1</span>
              <span>Descargue la plantilla Excel desde el botón "Descargar plantilla"</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="bg-primary/20 text-primary h-5 w-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">2</span>
              <span>Complete los datos solicitados en cada hoja de la plantilla</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="bg-primary/20 text-primary h-5 w-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">3</span>
              <span>Suba el archivo en la sección "Modelos ML" para ver los resultados</span>
            </li>
          </ul>
        </div>
      </div>
      <DialogFooter>
        <Button variant="outline" onClick={() => handleDownloadTemplate(flow.id)}>
          <Download className="mr-2 h-4 w-4" />
          Descargar plantilla
        </Button>
      </DialogFooter>
    </>
  );

  const renderStepExplanationContent = (step: any) => (
    <>
      <DialogHeader>
        <DialogTitle className="text-xl">{step.name}</DialogTitle>
        <DialogDescription>
          Tipo de análisis: {step.modelType}
        </DialogDescription>
      </DialogHeader>
      <div className="py-4 space-y-4">
        <div>
          <h3 className="font-medium text-lg">Descripción</h3>
          <p className="mt-2 text-muted-foreground">
            {step.description}
          </p>
        </div>
        
        <div className="border-t pt-4">
          <h3 className="font-medium text-lg">¿Cómo funciona este análisis?</h3>
          <p className="mt-2 text-muted-foreground">
            {step.howItWorks || `Este análisis utiliza algoritmos especializados para procesar los datos 
            proporcionados y generar insights importantes para su negocio. La técnica principal 
            empleada es ${step.modelType}, que es particularmente efectiva para este tipo de datos.`}
          </p>
        </div>
        
        <div className="border-t pt-4">
          <h3 className="font-medium text-lg">¿Qué beneficios obtendrá?</h3>
          <ul className="mt-2 space-y-2">
            {step.benefits ? (
              step.benefits.map((benefit: string, i: number) => (
                <li key={i} className="flex items-start gap-2">
                  <ArrowRight className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                  <span>{benefit}</span>
                </li>
              ))
            ) : (
              <>
                <li className="flex items-start gap-2">
                  <ArrowRight className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                  <span>Obtener insights precisos sobre sus datos</span>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                  <span>Identificar patrones que podrían pasar desapercibidos</span>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                  <span>Tomar decisiones basadas en evidencia estadística</span>
                </li>
              </>
            )}
          </ul>
        </div>
        
        <div className="border-t pt-4">
          <h3 className="font-medium text-lg">Datos necesarios</h3>
          <div className="mt-2 bg-slate-50 p-3 rounded-md space-y-3">
            {step.inputFields.map((field: any, i: number) => (
              <div key={i} className="flex items-start gap-2">
                <Badge variant={field.required ? "default" : "outline"} className="mt-0.5">
                  {field.required ? "Requerido" : "Opcional"}
                </Badge>
                <div>
                  <p className="font-medium">{field.name}</p>
                  <p className="text-sm text-muted-foreground">{field.description}</p>
                  {field.example && (
                    <p className="text-xs italic mt-0.5">Ejemplo: {field.example}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="border-t pt-4">
          <h3 className="font-medium text-lg mb-2">Ejemplos de resultados</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {step.outputInsights.map((insight: any, i: number) => (
              <div key={i} className="bg-slate-50 p-3 rounded-md">
                <div className="flex items-center gap-1 mb-1">
                  <span className="font-medium">{insight.name}</span>
                  <Badge variant="outline" className="ml-auto">
                    {insight.visualizationType}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{insight.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );

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
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm" className="flex items-center gap-1">
                          <Info className="h-4 w-4" />
                          Más información
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        {renderFlowExplanationContent(flow)}
                      </DialogContent>
                    </Dialog>
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
                              <div className="flex items-start justify-between">
                                <p className="text-sm">{step.description}</p>
                                <Dialog>
                                  <DialogTrigger asChild>
                                    <Button variant="ghost" size="sm" className="flex items-center gap-1">
                                      <HelpCircle className="h-4 w-4" />
                                      Explicación 
                                    </Button>
                                  </DialogTrigger>
                                  <DialogContent className="max-w-2xl">
                                    {renderStepExplanationContent(step)}
                                  </DialogContent>
                                </Dialog>
                              </div>
                              
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
                                        {field.example && (
                                          <p className="text-xs italic mt-0.5">Ejemplo: {field.example}</p>
                                        )}
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
