
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { ArrowRight, Clock, FileSearch, Activity, Download, Info, HelpCircle, BarChart2, PieChart, LineChart, Database, Code } from 'lucide-react';
import { getAnalysisFlowsByIndustry, getAnalysisFlowById } from '@/services/analysisFlowService';
import { toast } from 'sonner';
import { generateExcelTemplate, createTemplateSectionsFromFlow } from '@/utils/excelTemplateGenerator';
import { AnalysisFlow } from '@/types/analysis';

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

  // Get the appropriate icon for each visualization type
  const getVisualizationIcon = (type: string) => {
    const lowerType = type.toLowerCase();
    if (lowerType.includes('barra') || lowerType.includes('bar')) return <BarChart2 className="h-4 w-4 text-primary" />;
    if (lowerType.includes('pie') || lowerType.includes('donut') || lowerType.includes('torta')) return <PieChart className="h-4 w-4 text-primary" />;
    if (lowerType.includes('línea') || lowerType.includes('line') || lowerType.includes('serie')) return <LineChart className="h-4 w-4 text-primary" />;
    return <BarChart2 className="h-4 w-4 text-primary" />;
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
      <div className="py-4 space-y-6">
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
            Este flujo de análisis combina {flow.steps.length} técnicas analíticas especializadas para proporcionar una visión
            integral de su negocio. Cada paso se complementa con el anterior para obtener insights 
            más profundos y accionables.
          </p>
          
          <div className="mt-4 p-4 bg-primary/5 rounded-lg">
            <h4 className="font-medium mb-2 flex items-center gap-2">
              <Database className="h-4 w-4 text-primary" />
              Proceso de análisis
            </h4>
            <ol className="space-y-3">
              <li className="flex items-center gap-3">
                <div className="bg-primary h-6 w-6 rounded-full text-white flex items-center justify-center flex-shrink-0">1</div>
                <span>Usted proporciona los datos en la plantilla de Excel personalizada.</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="bg-primary h-6 w-6 rounded-full text-white flex items-center justify-center flex-shrink-0">2</div>
                <span>Nuestros algoritmos procesan automáticamente los datos proporcionados.</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="bg-primary h-6 w-6 rounded-full text-white flex items-center justify-center flex-shrink-0">3</div>
                <span>Se generan visualizaciones e insights fáciles de entender.</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="bg-primary h-6 w-6 rounded-full text-white flex items-center justify-center flex-shrink-0">4</div>
                <span>Recibe recomendaciones accionables para su negocio.</span>
              </li>
            </ol>
          </div>
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
        
        {flow.technicalImplementation && (
          <div className="border-t pt-4">
            <h3 className="font-medium text-lg flex items-center gap-2">
              <Code className="h-4 w-4 text-primary" />
              ¿Cómo implementamos esta tecnología?
            </h3>
            <p className="mt-2 text-muted-foreground">
              {flow.technicalImplementation.approach}
            </p>
            
            <div className="mt-4 grid grid-cols-1 gap-3">
              <div className="bg-slate-50 p-3 rounded-md">
                <h4 className="font-medium mb-1">Tecnologías utilizadas</h4>
                <div className="flex flex-wrap gap-2 mt-2">
                  {flow.technicalImplementation.technologies.map((tech, i) => (
                    <Badge key={i} variant="outline">{tech}</Badge>
                  ))}
                </div>
              </div>
              
              {flow.technicalImplementation.openSourceAlternatives && (
                <div className="bg-slate-50 p-3 rounded-md">
                  <h4 className="font-medium mb-1">Alternativas Open Source</h4>
                  <div className="space-y-2 mt-2">
                    {flow.technicalImplementation.openSourceAlternatives.map((alt, i) => (
                      <div key={i}>
                        <p className="font-medium text-sm">{alt.name}</p>
                        <p className="text-xs text-muted-foreground">{alt.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
        
        <div className="border-t pt-4">
          <h3 className="font-medium text-lg">Requisitos para comenzar</h3>
          <ul className="mt-2 space-y-3">
            <li className="flex items-start gap-2">
              <span className="bg-primary/20 text-primary h-5 w-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">1</span>
              <span>Descargue la plantilla Excel desde el botón "Descargar plantilla"</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="bg-primary/20 text-primary h-5 w-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">2</span>
              <span>Complete los datos solicitados en cada hoja de la plantilla (no se preocupe por campos técnicos, solo llene lo que conoce)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="bg-primary/20 text-primary h-5 w-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">3</span>
              <span>Suba el archivo en la sección "Modelos ML" para ver los resultados</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="bg-primary/20 text-primary h-5 w-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">4</span>
              <span>Un especialista puede contactarlo para explicar los resultados a detalle (opcional)</span>
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
      <div className="py-4 space-y-6">
        <div>
          <h3 className="font-medium text-lg">¿Qué hace este análisis?</h3>
          <p className="mt-2 text-muted-foreground">
            {step.description}
          </p>
          
          <div className="mt-3 p-3 rounded-md bg-primary/5">
            <p className="text-sm italic">
              <span className="font-medium">Nivel de complejidad: </span>
              {step.difficulty === 'básico' ? 'Básico - fácil de implementar y entender' :
                step.difficulty === 'intermedio' ? 'Intermedio - requiere algunos conocimientos técnicos' : 
                'Avanzado - utiliza algoritmos sofisticados para mayor precisión'}
            </p>
            <p className="text-sm italic mt-1">
              <span className="font-medium">Tiempo estimado: </span>
              {step.estimatedProcessingTime}
            </p>
          </div>
        </div>
        
        <div className="border-t pt-4">
          <h3 className="font-medium text-lg">¿Cómo funciona este análisis?</h3>
          <div className="bg-slate-50 p-4 rounded-lg mt-3">
            <p className="text-muted-foreground">
              {step.howItWorks || `Este análisis utiliza algoritmos especializados (${step.modelType}) para procesar los datos 
              proporcionados y generar insights importantes para su negocio. Está diseñado para ser potente pero fácil de interpretar.`}
            </p>
            
            <div className="mt-4 bg-white p-3 rounded-md border">
              <h4 className="font-medium text-sm mb-2">En términos sencillos:</h4>
              <p className="text-sm">
                {step.modelType.toLowerCase().includes('regresión') ? 
                  'Predice valores futuros basados en patrones históricos.' :
                step.modelType.toLowerCase().includes('clasificación') ?
                  'Agrupa elementos en categorías predefinidas según sus características.' :
                step.modelType.toLowerCase().includes('clustering') ?
                  'Descubre grupos naturales dentro de sus datos sin categorías previas.' :
                step.modelType.toLowerCase().includes('serie') ?
                  'Analiza datos que cambian a lo largo del tiempo para detectar patrones.' :
                  'Transforma datos complejos en insights accionables para su negocio.'}
              </p>
            </div>
          </div>
        </div>
        
        <div className="border-t pt-4">
          <h3 className="font-medium text-lg">¿Qué beneficios obtendrá?</h3>
          <div className="p-3 bg-green-50 rounded-lg mt-2">
            <ul className="space-y-3">
              {step.benefits ? (
                step.benefits.map((benefit: string, i: number) => (
                  <li key={i} className="flex items-start gap-2">
                    <ArrowRight className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
                    <span className="text-green-800">{benefit}</span>
                  </li>
                ))
              ) : (
                <>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
                    <span className="text-green-800">Obtener insights precisos sobre sus datos sin necesidad de conocimientos técnicos</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
                    <span className="text-green-800">Identificar patrones y tendencias que podrían pasar desapercibidos</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
                    <span className="text-green-800">Tomar decisiones estratégicas basadas en evidencia sólida</span>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
        
        <div className="border-t pt-4">
          <h3 className="font-medium text-lg">¿Qué datos necesitamos de usted?</h3>
          <p className="text-sm text-muted-foreground mt-1">
            No se preocupe si no tiene todos los datos — podemos trabajar con lo que tenga disponible.
          </p>
          <div className="mt-2 space-y-3">
            {step.inputFields.map((field: any, i: number) => (
              <div key={i} className="bg-slate-50 p-3 rounded-md">
                <div className="flex items-start gap-2">
                  <Badge variant={field.required ? "default" : "outline"} className="mt-0.5">
                    {field.required ? "Necesario" : "Opcional"}
                  </Badge>
                  <div>
                    <p className="font-medium">{field.name}</p>
                    <p className="text-sm text-muted-foreground">{field.description}</p>
                    {field.example && (
                      <p className="text-xs italic mt-0.5">Ejemplo: {field.example}</p>
                    )}
                    <p className="text-xs bg-white px-2 py-1 inline-block rounded mt-1 border">
                      Tipo de dato: {
                        field.type === 'numeric' ? 'Números' :
                        field.type === 'text' ? 'Texto' :
                        field.type === 'date' ? 'Fechas' : 'Categorías'
                      }
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="border-t pt-4">
          <h3 className="font-medium text-lg mb-2">¿Qué resultados obtendrá?</h3>
          <div className="grid grid-cols-1 gap-4">
            {step.outputInsights.map((insight: any, i: number) => (
              <div key={i} className="bg-slate-50 p-4 rounded-md border">
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    {getVisualizationIcon(insight.visualizationType)}
                    <h4 className="font-medium">{insight.name}</h4>
                  </div>
                  <Badge variant="outline">
                    {insight.visualizationType}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{insight.description}</p>
                <div className="mt-3 bg-primary/10 p-2 rounded">
                  <p className="text-sm font-medium text-primary">Valor para su negocio:</p>
                  <p className="text-sm">{insight.businessValue}</p>
                </div>
                
                <div className="mt-3 bg-slate-100 p-2 rounded">
                  <p className="text-xs text-slate-500 italic">Este insight le permitirá tomar decisiones informadas sobre {
                    insight.name.toLowerCase().includes('segmentación') ? 'sus grupos de clientes' :
                    insight.name.toLowerCase().includes('predicción') ? 'tendencias futuras' :
                    insight.name.toLowerCase().includes('correlación') ? 'relaciones entre variables' :
                    insight.name.toLowerCase().includes('optimización') ? 'mejora de procesos' :
                    'aspectos clave de su negocio'
                  }.</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="border-t pt-4 bg-blue-50 p-4 rounded-lg">
          <h3 className="font-medium text-blue-800">¿Necesita ayuda para interpretar los resultados?</h3>
          <p className="text-sm text-blue-700 mt-2">
            Nuestro equipo de especialistas puede agendar una sesión personalizada para explicar 
            en detalle los resultados y cómo implementar las recomendaciones en su negocio.
          </p>
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
        Cada flujo combina diferentes tipos de análisis que se complementan entre sí para ofrecerle una visión integral de su negocio, sin necesidad de conocimientos técnicos.
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
                      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
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
                  <div className="bg-primary/5 p-4 rounded-lg flex flex-col sm:flex-row items-start sm:items-center gap-3">
                    <Activity className="h-6 w-6 text-primary flex-shrink-0" />
                    <div>
                      <h4 className="font-medium">Objetivo de negocio</h4>
                      <p className="text-sm">{flow.businessGoal}</p>
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
                                      Ver detalles
                                    </Button>
                                  </DialogTrigger>
                                  <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                                    {renderStepExplanationContent(step)}
                                  </DialogContent>
                                </Dialog>
                              </div>
                              
                              {/* Inputs needed */}
                              <div className="bg-muted/30 p-3 rounded-md">
                                <h5 className="text-sm font-medium mb-2">Datos necesarios:</h5>
                                <ul className="space-y-2">
                                  {step.inputFields.slice(0, 3).map((field, i) => (
                                    <li key={i} className="text-sm flex items-start gap-2">
                                      <Badge variant={field.required ? "default" : "outline"} className="mt-0.5">
                                        {field.required ? "Necesario" : "Opcional"}
                                      </Badge>
                                      <div>
                                        <span className="font-medium">{field.name}</span>
                                        <p className="text-muted-foreground text-xs">{field.description}</p>
                                      </div>
                                    </li>
                                  ))}
                                  {step.inputFields.length > 3 && (
                                    <li className="text-sm">
                                      <Button variant="ghost" size="sm" className="p-0 h-auto">
                                        +{step.inputFields.length - 3} campos adicionales (ver detalles)
                                      </Button>
                                    </li>
                                  )}
                                </ul>
                              </div>
                              
                              {/* Outputs */}
                              <div className="bg-muted/30 p-3 rounded-md">
                                <h5 className="text-sm font-medium mb-2">Resultados obtenidos:</h5>
                                <ul className="space-y-3">
                                  {step.outputInsights.map((insight, i) => (
                                    <li key={i} className="text-sm">
                                      <div className="flex items-center gap-1">
                                        {getVisualizationIcon(insight.visualizationType)}
                                        <span className="font-medium">{insight.name}</span>
                                        <Badge variant="outline" className="ml-auto">
                                          {insight.visualizationType}
                                        </Badge>
                                      </div>
                                      <p className="text-muted-foreground text-xs ml-6">{insight.description}</p>
                                      <p className="text-primary text-xs ml-6 mt-1">Valor de negocio: {insight.businessValue}</p>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                              
                              <div className="flex items-center justify-between text-xs text-muted-foreground bg-slate-50 p-2 rounded-md">
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
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm" className="gap-1">
                      Ver guía completa
                      <ArrowRight className="h-3 w-3" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>Guía completa: {flow.name}</DialogTitle>
                      <DialogDescription>
                        Una explicación detallada de todo el proceso de análisis
                      </DialogDescription>
                    </DialogHeader>
                    
                    <div className="mt-4 space-y-6">
                      <div>
                        <h3 className="text-lg font-medium">Introducción</h3>
                        <p className="text-muted-foreground mt-1">
                          {flow.description} Este flujo está diseñado para {flow.businessGoal.toLowerCase()}
                        </p>
                        
                        <div className="mt-4 p-3 bg-primary/5 rounded-md">
                          <h4 className="font-medium">Este análisis es ideal para:</h4>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
                            {flow.recommendedFor?.map((role, i) => (
                              <div key={i} className="flex items-start gap-2">
                                <ArrowRight className="h-4 w-4 text-primary mt-1" />
                                <div>
                                  <p className="font-medium">{role.title}</p>
                                  <p className="text-sm text-muted-foreground">{role.reason}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                      
                      <div className="border-t pt-4">
                        <h3 className="text-lg font-medium mb-4">Proceso paso a paso</h3>
                        
                        {flow.steps.map((step, index) => (
                          <div key={step.id} className="mb-8 relative">
                            <div className="flex items-start gap-4">
                              <div className="bg-primary h-8 w-8 rounded-full text-white flex items-center justify-center flex-shrink-0">
                                {index + 1}
                              </div>
                              <div className="space-y-3 w-full">
                                <h4 className="font-medium text-lg">{step.name}</h4>
                                <p>{step.description}</p>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <div className="bg-slate-50 p-3 rounded-md">
                                    <h5 className="font-medium mb-2">Beneficios clave:</h5>
                                    <ul className="space-y-2">
                                      {step.benefits ? step.benefits.map((benefit, i) => (
                                        <li key={i} className="flex items-start gap-2">
                                          <ArrowRight className="h-4 w-4 text-primary mt-1" />
                                          <span>{benefit}</span>
                                        </li>
                                      )) : (
                                        <li className="text-muted-foreground">
                                          Información detallada disponible en la explicación del paso.
                                        </li>
                                      )}
                                    </ul>
                                  </div>
                                  
                                  <div className="bg-slate-50 p-3 rounded-md">
                                    <h5 className="font-medium mb-2">Resultados esperados:</h5>
                                    <ul className="space-y-2">
                                      {step.outputInsights.map((insight, i) => (
                                        <li key={i} className="flex items-start gap-2">
                                          <ArrowRight className="h-4 w-4 text-primary mt-1" />
                                          <span>{insight.name}</span>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                </div>
                                
                                <div className="bg-primary/5 p-3 rounded-md">
                                  <h5 className="font-medium mb-1">Detalles técnicos:</h5>
                                  <p className="text-sm">Este paso utiliza <span className="font-medium">{step.modelType}</span>, 
                                  que {step.howItWorks ? step.howItWorks.split('.')[0].toLowerCase() + '.' : 
                                  'procesa los datos proporcionados para generar resultados precisos y accionables.'}</p>
                                  <p className="text-xs text-muted-foreground mt-2">
                                    Complejidad: {step.difficulty} • Tiempo estimado: {step.estimatedProcessingTime}
                                  </p>
                                </div>
                              </div>
                            </div>
                            
                            {/* Connector line between steps */}
                            {index < flow.steps.length - 1 && (
                              <div className="absolute left-4 top-8 bottom-0 w-0.5 bg-muted" style={{height: "calc(100% + 1rem)"}} />
                            )}
                          </div>
                        ))}
                      </div>
                      
                      {flow.technicalImplementation && (
                        <div className="border-t pt-4">
                          <h3 className="text-lg font-medium">Implementación técnica</h3>
                          <p className="text-muted-foreground mt-1">{flow.technicalImplementation.approach}</p>
                          
                          <div className="mt-4 space-y-4">
                            <div className="bg-slate-50 p-3 rounded-md">
                              <h4 className="font-medium">Tecnologías utilizadas</h4>
                              <div className="flex flex-wrap gap-2 mt-2">
                                {flow.technicalImplementation.technologies.map((tech, i) => (
                                  <Badge key={i} variant="outline">{tech}</Badge>
                                ))}
                              </div>
                            </div>
                            
                            {flow.technicalImplementation.openSourceAlternatives && (
                              <div className="bg-slate-50 p-3 rounded-md">
                                <h4 className="font-medium">Alternativas Open Source</h4>
                                <div className="space-y-3 mt-2">
                                  {flow.technicalImplementation.openSourceAlternatives.map((alt, i) => (
                                    <div key={i} className="border-b pb-2 last:border-0 last:pb-0">
                                      <p className="font-medium">{alt.name}</p>
                                      <p className="text-sm text-muted-foreground">{alt.description}</p>
                                      {alt.url && <p className="text-xs text-primary mt-1">{alt.url}</p>}
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                            
                            <div className="bg-slate-50 p-3 rounded-md">
                              <h4 className="font-medium mb-2">Proceso de implementación</h4>
                              {flow.technicalImplementation.implementationSteps.map((step, i) => (
                                <div key={i} className="mb-3 last:mb-0">
                                  <div className="flex items-center gap-2">
                                    <div className="bg-primary h-5 w-5 rounded-full text-white flex items-center justify-center text-xs">
                                      {i + 1}
                                    </div>
                                    <p className="font-medium">{step.name}</p>
                                  </div>
                                  <p className="text-sm text-muted-foreground ml-7">{step.description}</p>
                                  
                                  {step.resources && (
                                    <div className="ml-7 mt-1">
                                      <p className="text-xs font-medium">Recursos:</p>
                                      <ul className="text-xs text-muted-foreground">
                                        {step.resources.map((resource, j) => (
                                          <li key={j}>{resource}</li>
                                        ))}
                                      </ul>
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>
                            
                            {flow.technicalImplementation.challenges && (
                              <div className="bg-slate-50 p-3 rounded-md">
                                <h4 className="font-medium">Consideraciones importantes</h4>
                                <ul className="space-y-1 mt-2">
                                  {flow.technicalImplementation.challenges.map((challenge, i) => (
                                    <li key={i} className="text-sm flex items-start gap-2">
                                      <span className="text-primary font-bold">•</span>
                                      <span>{challenge}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                      
                      <div className="border-t pt-4">
                        <h3 className="text-lg font-medium">Próximos pasos</h3>
                        <ol className="mt-3 space-y-3">
                          <li className="flex items-start gap-3">
                            <div className="bg-primary h-6 w-6 rounded-full text-white flex items-center justify-center flex-shrink-0">1</div>
                            <div>
                              <p className="font-medium">Descargue la plantilla Excel</p>
                              <p className="text-sm text-muted-foreground">
                                Use el botón "Descargar plantilla" para obtener un archivo Excel con todas las hojas necesarias.
                              </p>
                            </div>
                          </li>
                          <li className="flex items-start gap-3">
                            <div className="bg-primary h-6 w-6 rounded-full text-white flex items-center justify-center flex-shrink-0">2</div>
                            <div>
                              <p className="font-medium">Complete con sus datos</p>
                              <p className="text-sm text-muted-foreground">
                                Llene las celdas con la información solicitada. No se preocupe si no tiene todos los datos opcionales.
                              </p>
                            </div>
                          </li>
                          <li className="flex items-start gap-3">
                            <div className="bg-primary h-6 w-6 rounded-full text-white flex items-center justify-center flex-shrink-0">3</div>
                            <div>
                              <p className="font-medium">Cargue la plantilla completa</p>
                              <p className="text-sm text-muted-foreground">
                                Suba el archivo en la sección "Modelos ML" y espere mientras procesamos sus datos.
                              </p>
                            </div>
                          </li>
                          <li className="flex items-start gap-3">
                            <div className="bg-primary h-6 w-6 rounded-full text-white flex items-center justify-center flex-shrink-0">4</div>
                            <div>
                              <p className="font-medium">Revise los resultados</p>
                              <p className="text-sm text-muted-foreground">
                                Examine los insights generados y las recomendaciones para su negocio.
                              </p>
                            </div>
                          </li>
                          <li className="flex items-start gap-3">
                            <div className="bg-primary h-6 w-6 rounded-full text-white flex items-center justify-center flex-shrink-0">5</div>
                            <div>
                              <p className="font-medium">Agende una sesión con especialistas (opcional)</p>
                              <p className="text-sm text-muted-foreground">
                                Nuestro equipo puede ayudarle a interpretar los resultados y aplicarlos a su negocio.
                              </p>
                            </div>
                          </li>
                        </ol>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </CardFooter>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};
