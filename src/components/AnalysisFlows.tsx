
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { ArrowRight, Clock, FileSearch, Activity, Download, Info, HelpCircle, BarChart2, PieChart, LineChart, Database, Code, Brain, Sparkles, Zap, CheckCircle2, Lightbulb } from 'lucide-react';
import { getAnalysisFlowsByIndustry, getAnalysisFlowById } from '@/services/analysisFlowService';
import { toast } from 'sonner';
import { generateExcelTemplate, createTemplateSectionsFromFlow } from '@/utils/excelTemplateGenerator';
import { AnalysisFlow, AnalysisStep, OutputInsight } from '@/types/analysis';

interface AnalysisFlowsProps {
  industry: string;
}

export const AnalysisFlows: React.FC<AnalysisFlowsProps> = ({ industry }) => {
  const [selectedFlow, setSelectedFlow] = useState<string | null>(null);
  const [selectedStep, setSelectedStep] = useState<AnalysisStep | null>(null);
  const [showSuccessStory, setShowSuccessStory] = useState<boolean>(false);
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

      // Show success dialog after download
      setShowSuccessStory(true);
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
    if (lowerType.includes('dashboard') || lowerType.includes('semáforo')) return <Activity className="h-4 w-4 text-primary" />;
    if (lowerType.includes('dispersión') || lowerType.includes('scatter')) return <Sparkles className="h-4 w-4 text-primary" />;
    if (lowerType.includes('mapa') || lowerType.includes('heat')) return <Database className="h-4 w-4 text-primary" />;
    return <BarChart2 className="h-4 w-4 text-primary" />;
  };

  // Get ML model complexity icon
  const getDifficultyIcon = (difficulty: string) => {
    if (difficulty === 'básico') return <CheckCircle2 className="h-4 w-4 text-green-600" />;
    if (difficulty === 'intermedio') return <Zap className="h-4 w-4 text-amber-600" />;
    if (difficulty === 'avanzado') return <Brain className="h-4 w-4 text-purple-600" />;
    return <Info className="h-4 w-4 text-primary" />;
  };

  // Success stories by industry
  const getSuccessStory = (industry: string) => {
    const stories = {
      "Retail": {
        company: "TiendaFutura",
        challenge: "Enfrentaban altas tasas de devoluciones y bajas ventas cruzadas.",
        solution: "Implementaron nuestro análisis de segmentación de clientes y predicción de demanda.",
        result: "Redujeron devoluciones en un 28% y aumentaron ventas cruzadas en un 35% en 3 meses.",
        testimonial: "Este análisis nos permitió entender realmente a nuestros clientes y anticipar sus necesidades. Los resultados financieros fueron inmediatos."
      },
      "Servicios Financieros": {
        company: "BancoSeguro",
        challenge: "Necesitaban mejorar la detección de fraude sin generar falsos positivos.",
        solution: "Implementaron nuestro flujo de análisis de riesgo con algoritmos de aprendizaje profundo.",
        result: "Aumentaron la detección de fraude en 42% mientras redujeron los falsos positivos en un 18%.",
        testimonial: "La precisión de los modelos nos sorprendió. Ahora podemos proteger a nuestros clientes sin causarles inconvenientes innecesarios."
      },
      "Salud": {
        company: "Hospital Regional",
        challenge: "Buscaban reducir tiempos de espera y mejorar asignación de recursos.",
        solution: "Utilizaron nuestro análisis predictivo de demanda y optimización de recursos.",
        result: "Redujeron tiempos de espera un 24% y optimizaron la programación de personal médico.",
        testimonial: "Nuestra capacidad para atender pacientes mejoró drásticamente. Los pacientes lo notan y nuestro personal trabaja con menos estrés."
      },
      "Tecnología": {
        company: "TechSolution",
        challenge: "Querían mejorar la retención de usuarios en su plataforma SaaS.",
        solution: "Implementaron nuestro análisis de comportamiento de usuario y predicción de abandono.",
        result: "Aumentaron la retención en un 31% y el tiempo promedio de sesión en un 27%.",
        testimonial: "Pasamos de adivinar por qué los usuarios nos abandonaban a saber exactamente cuándo intervenir. El ROI fue inmediato."
      },
      "Manufactura": {
        company: "ProducciónOptima",
        challenge: "Enfrentaban problemas de control de calidad y mantenimiento reactivo.",
        solution: "Implementaron nuestros modelos de mantenimiento predictivo y control de calidad.",
        result: "Redujeron paradas no programadas en 38% y defectos de producción en 22%.",
        testimonial: "La capacidad de anticipar problemas antes de que ocurran cambió completamente nuestra operación. Los ahorros superaron nuestras expectativas."
      },
      "Educación": {
        company: "Universidad Innovadora",
        challenge: "Buscaban mejorar tasas de graduación y reducir deserción estudiantil.",
        solution: "Utilizaron nuestros modelos de predicción de riesgo académico y personalización de aprendizaje.",
        result: "Aumentaron tasas de graduación en 15% y redujeron deserción en primer año en 22%.",
        testimonial: "Ahora podemos intervenir cuando un estudiante está en riesgo, no cuando ya es demasiado tarde. El impacto ha sido transformador."
      }
    };
    
    return stories[industry as keyof typeof stories] || stories["Retail"];
  };

  // Explanation modals content
  const renderFlowExplanationContent = (flow: AnalysisFlow) => (
    <>
      <DialogHeader>
        <DialogTitle className="text-xl flex items-center gap-2">
          <Activity className="h-5 w-5 text-primary" />
          {flow.name}
        </DialogTitle>
        <DialogDescription className="text-base">
          {flow.description}
        </DialogDescription>
      </DialogHeader>
      <div className="py-4 space-y-6">
        <div>
          <h3 className="font-medium text-lg flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-amber-500" />
            ¿Qué desafíos resuelve este análisis?
          </h3>
          <p className="mt-2 text-muted-foreground">
            {flow.businessGoal}
          </p>
          
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-lg p-4 border border-primary/20 shadow-sm">
              <h4 className="font-medium text-primary flex items-center gap-2 mb-2">
                <CheckCircle2 className="h-4 w-4" />
                Beneficios clave
              </h4>
              <ul className="space-y-2">
                {flow.steps.flatMap(step => step.benefits || []).slice(0, 4).map((benefit, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <div className="h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center mt-0.5">
                      <CheckCircle2 className="h-3 w-3 text-primary" />
                    </div>
                    <span className="text-sm">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-4 border border-purple-200 shadow-sm">
              <h4 className="font-medium text-purple-700 flex items-center gap-2 mb-2">
                <Brain className="h-4 w-4" />
                Tecnología avanzada
              </h4>
              <p className="text-sm text-purple-800">
                Este flujo utiliza modelos avanzados de {flow.steps.map(s => s.modelType).join(', ')} 
                para transformar sus datos en insights accionables.
              </p>
              <div className="flex flex-wrap gap-2 mt-3">
                {flow.recommendedTools.map((tool, i) => (
                  <Badge key={i} variant="outline" className="bg-white">{tool}</Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t pt-4">
          <h3 className="font-medium text-lg">¿Cómo funciona?</h3>
          <p className="mt-2 text-muted-foreground">
            Este flujo de análisis combina {flow.steps.length} técnicas analíticas especializadas para proporcionar una visión
            integral de su negocio. Cada paso se complementa con el anterior para obtener insights 
            más profundos y accionables.
          </p>
          
          <div className="mt-4 p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg border border-blue-100">
            <h4 className="font-medium mb-3 text-blue-800 flex items-center gap-2">
              <Database className="h-4 w-4 text-blue-700" />
              Proceso de transformación de datos en insights
            </h4>
            <div className="space-y-3">
              <div className="bg-white p-3 rounded-md shadow-sm border border-blue-100 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1.5 h-full bg-blue-500"></div>
                <h5 className="font-medium text-blue-700 pl-2">1. Recopilación y preparación</h5>
                <p className="text-sm pl-2">Usted proporciona los datos en la plantilla de Excel personalizada, que están diseñados para ser fáciles de completar.</p>
              </div>
              
              <div className="ml-4 h-6 border-l-2 border-dashed border-blue-300 flex items-center justify-center">
                <ArrowRight className="h-4 w-4 text-blue-300 -ml-2" />
              </div>
              
              <div className="bg-white p-3 rounded-md shadow-sm border border-purple-100 relative overflow-hidden ml-4">
                <div className="absolute top-0 left-0 w-1.5 h-full bg-purple-500"></div>
                <h5 className="font-medium text-purple-700 pl-2">2. Análisis avanzado</h5>
                <p className="text-sm pl-2">Nuestros algoritmos avanzados procesan automáticamente los datos utilizando técnicas de machine learning y estadística avanzada.</p>
              </div>
              
              <div className="ml-8 h-6 border-l-2 border-dashed border-purple-300 flex items-center justify-center">
                <ArrowRight className="h-4 w-4 text-purple-300 -ml-2" />
              </div>
              
              <div className="bg-white p-3 rounded-md shadow-sm border border-green-100 relative overflow-hidden ml-8">
                <div className="absolute top-0 left-0 w-1.5 h-full bg-green-500"></div>
                <h5 className="font-medium text-green-700 pl-2">3. Visualización e insights</h5>
                <p className="text-sm pl-2">Generamos visualizaciones interactivas que transforman datos complejos en información fácilmente comprensible.</p>
              </div>
              
              <div className="ml-12 h-6 border-l-2 border-dashed border-green-300 flex items-center justify-center">
                <ArrowRight className="h-4 w-4 text-green-300 -ml-2" />
              </div>
              
              <div className="bg-white p-3 rounded-md shadow-sm border border-amber-100 relative overflow-hidden ml-12">
                <div className="absolute top-0 left-0 w-1.5 h-full bg-amber-500"></div>
                <h5 className="font-medium text-amber-700 pl-2">4. Recomendaciones accionables</h5>
                <p className="text-sm pl-2">Recibe recomendaciones concretas para su negocio basadas en los insights descubiertos, acompañadas de su impacto económico estimado.</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t pt-4">
          <h3 className="font-medium text-lg">¿Quién debería utilizarlo?</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-3">
            {flow.recommendedFor?.map((role, i) => (
              <div key={i} className="bg-gradient-to-r from-slate-50 to-slate-100 p-3 rounded-md border border-slate-200 shadow-sm">
                <p className="font-medium flex items-center gap-2">
                  <div className="h-6 w-6 rounded-full bg-primary text-white flex items-center justify-center">
                    {i + 1}
                  </div>
                  {role.title}
                </p>
                <p className="text-sm text-muted-foreground mt-1">{role.reason}</p>
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
            
            <div className="mt-4 grid grid-cols-1 gap-4">
              <div className="bg-gradient-to-r from-slate-50 to-slate-100 p-3 rounded-md border border-slate-200 shadow-sm">
                <h4 className="font-medium mb-2">Tecnologías utilizadas</h4>
                <div className="flex flex-wrap gap-2 mt-2">
                  {flow.technicalImplementation.technologies.map((tech, i) => (
                    <Badge key={i} variant="outline" className="bg-white">{tech}</Badge>
                  ))}
                </div>
              </div>
              
              {flow.technicalImplementation.openSourceAlternatives && (
                <div className="bg-gradient-to-r from-slate-50 to-slate-100 p-3 rounded-md border border-slate-200 shadow-sm">
                  <h4 className="font-medium mb-2">Alternativas Open Source</h4>
                  <div className="space-y-2 mt-2">
                    {flow.technicalImplementation.openSourceAlternatives.map((alt, i) => (
                      <div key={i} className="p-2 bg-white rounded border border-slate-100">
                        <p className="font-medium text-sm">{alt.name}</p>
                        <p className="text-xs text-muted-foreground">{alt.description}</p>
                        {alt.url && <p className="text-xs text-primary mt-1">{alt.url}</p>}
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-3 rounded-md border border-blue-100">
                <h4 className="font-medium mb-2 text-blue-800">Diagrama de implementación</h4>
                <div className="bg-white p-4 rounded-md border border-blue-100">
                  <div className="flex justify-center mb-4">
                    <div className="text-center w-40 p-2 bg-blue-100 rounded border border-blue-200 text-blue-800">
                      <p className="font-medium">Sus datos</p>
                      <p className="text-xs">Excel / CSV</p>
                    </div>
                  </div>
                  
                  <div className="flex justify-center">
                    <div className="h-8 w-0.5 bg-blue-200"></div>
                  </div>
                  
                  <div className="flex justify-center mb-4">
                    <div className="text-center w-56 p-2 bg-purple-100 rounded border border-purple-200 text-purple-800">
                      <p className="font-medium">Preprocesamiento</p>
                      <p className="text-xs">Normalización y validación</p>
                    </div>
                  </div>
                  
                  <div className="flex justify-center">
                    <div className="h-8 w-0.5 bg-purple-200"></div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-3 mb-4">
                    {flow.steps.slice(0, 3).map((step, i) => (
                      <div key={i} className="text-center p-2 bg-amber-50 rounded border border-amber-200 text-amber-800">
                        <p className="font-medium text-sm">{step.modelType.split(' ')[0]}</p>
                        <p className="text-xs">Análisis {i+1}</p>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex justify-center">
                    <div className="h-8 w-0.5 bg-amber-200"></div>
                  </div>
                  
                  <div className="flex justify-center">
                    <div className="text-center w-40 p-2 bg-green-100 rounded border border-green-200 text-green-800">
                      <p className="font-medium">Resultados</p>
                      <p className="text-xs">Insights accionables</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        <div className="border-t pt-4">
          <h3 className="font-medium text-lg">Requisitos para comenzar</h3>
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg p-4 mt-2 border border-amber-100">
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <span className="bg-amber-100 text-amber-800 h-6 w-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 font-semibold">1</span>
                <div>
                  <p className="font-medium text-amber-800">Descargue la plantilla Excel</p>
                  <p className="text-sm text-amber-700">Un simple clic en "Descargar plantilla" y obtendrá una planilla prediseñada para este análisis.</p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="bg-amber-100 text-amber-800 h-6 w-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 font-semibold">2</span>
                <div>
                  <p className="font-medium text-amber-800">Complete los datos solicitados</p>
                  <p className="text-sm text-amber-700">No se preocupe por campos técnicos, solo llene lo que conoce. Nosotros nos encargamos del resto.</p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="bg-amber-100 text-amber-800 h-6 w-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 font-semibold">3</span>
                <div>
                  <p className="font-medium text-amber-800">Suba el archivo para procesamiento</p>
                  <p className="text-sm text-amber-700">En la sección "Modelos ML" puede subir su archivo y comenzar el análisis automático.</p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="bg-amber-100 text-amber-800 h-6 w-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 font-semibold">4</span>
                <div>
                  <p className="font-medium text-amber-800">Revise los resultados interactivos</p>
                  <p className="text-sm text-amber-700">Explore visualizaciones interactivas y recomendaciones personalizadas para su negocio.</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t pt-4">
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-4 border border-green-100">
            <h3 className="font-medium text-green-800 flex items-center gap-2 mb-3">
              <Sparkles className="h-5 w-5 text-green-600" />
              Casos de éxito
            </h3>
            <div className="bg-white p-4 rounded-md border border-green-100">
              <blockquote className="italic text-sm text-green-800">
                "Implementamos este análisis y logramos reducir costos operativos en un 22% mientras aumentamos la satisfacción del cliente. El ROI fue evidente desde el primer mes."
              </blockquote>
              <div className="mt-3 flex items-center justify-between">
                <div>
                  <p className="font-medium text-green-900">María González</p>
                  <p className="text-xs text-green-700">Directora de Operaciones, {industry} Solutions Inc.</p>
                </div>
                <div className="flex">
                  {[1,2,3,4,5].map(star => (
                    <svg key={star} className="h-4 w-4 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <DialogFooter className="gap-2">
        <Button variant="outline" onClick={() => handleDownloadTemplate(flow.id)} className="gap-2">
          <Download className="h-4 w-4" />
          Descargar plantilla
        </Button>
        <Button variant="default" className="gap-2">
          <HelpCircle className="h-4 w-4" />
          Solicitar demostración
        </Button>
      </DialogFooter>
    </>
  );

  const renderStepExplanationContent = (step: AnalysisStep) => (
    <>
      <DialogHeader>
        <div className="flex items-center gap-2">
          <Badge variant={step.difficulty === 'básico' ? 'outline' : step.difficulty === 'intermedio' ? 'secondary' : 'default'} className="h-8 flex items-center gap-1">
            {getDifficultyIcon(step.difficulty)}
            {step.difficulty}
          </Badge>
          <DialogTitle className="text-xl">{step.name}</DialogTitle>
        </div>
        <DialogDescription className="text-base">
          <div className="flex items-center gap-2 mt-1">
            <Badge variant="outline" className="bg-slate-50">
              {step.modelType}
            </Badge>
            <span className="text-xs text-muted-foreground">Tiempo estimado: {step.estimatedProcessingTime}</span>
          </div>
        </DialogDescription>
      </DialogHeader>
      <div className="py-4 space-y-6">
        <div>
          <h3 className="font-medium text-lg">¿Qué hace este análisis?</h3>
          <div className="mt-2 bg-gradient-to-r from-slate-50 to-slate-100 p-4 rounded-lg border border-slate-200">
            <p className="text-muted-foreground">
              {step.description}
            </p>
            
            <div className="mt-4 bg-white p-3 rounded-md border border-slate-200">
              <h4 className="font-medium text-sm flex items-center gap-2 text-primary">
                <Lightbulb className="h-4 w-4 text-amber-500" />
                En términos sencillos:
              </h4>
              <p className="text-sm mt-1">
                {step.modelType.toLowerCase().includes('regresión') ? 
                  'Este análisis predice valores específicos (como ventas futuras o precios) basándose en patrones históricos y variables relacionadas.' :
                step.modelType.toLowerCase().includes('clasificación') ?
                  'Clasifica elementos en categorías predefinidas (como "cliente probable de abandonar" o "cliente fiel") según sus características.' :
                step.modelType.toLowerCase().includes('clustering') ?
                  'Descubre grupos naturales en sus datos (segmentos de clientes, productos similares) sin categorías predefinidas.' :
                step.modelType.toLowerCase().includes('serie') ?
                  'Analiza cómo cambian sus datos a lo largo del tiempo para identificar patrones, tendencias y proyectar comportamientos futuros.' :
                step.modelType.toLowerCase().includes('optimización') ?
                  'Encuentra la mejor solución posible entre muchas alternativas, maximizando beneficios o minimizando costos según sus objetivos.' :
                  'Transforma datos complejos en insights accionables para su negocio utilizando técnicas estadísticas avanzadas.'}
              </p>
            </div>
          </div>
        </div>
        
        <div className="border-t pt-4">
          <h3 className="font-medium text-lg">¿Cómo funciona este análisis?</h3>
          <div className="bg-gradient-to-r from-purple-50 to-indigo-50 p-4 rounded-lg mt-3 border border-purple-100">
            <div className="flex items-start gap-3">
              <div className="mt-1">
                <Brain className="h-8 w-8 text-purple-700" />
              </div>
              <div>
                <p className="text-muted-foreground">
                  {step.howItWorks || `Este análisis utiliza algoritmos especializados (${step.modelType}) para procesar los datos 
                  proporcionados y generar insights importantes para su negocio. Está diseñado para ser potente pero fácil de interpretar.`}
                </p>
                
                <div className="mt-4 space-y-3">
                  <div className="bg-white p-3 rounded-md border border-purple-100">
                    <h4 className="font-medium text-sm mb-2 text-purple-800">El proceso paso a paso:</h4>
                    <ol className="space-y-2">
                      <li className="flex items-start gap-2">
                        <span className="bg-purple-100 text-purple-800 h-5 w-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 text-xs font-semibold">1</span>
                        <span className="text-sm">
                          {step.modelType.toLowerCase().includes('regresión') ? 
                            'Analizamos relaciones entre sus variables para crear un modelo predictivo.' :
                          step.modelType.toLowerCase().includes('clasificación') ?
                            'Entrenamos un modelo con datos etiquetados para reconocer patrones distintivos de cada categoría.' :
                          step.modelType.toLowerCase().includes('clustering') ?
                            'Calculamos similitudes entre elementos y los agrupamos según características comunes.' :
                          step.modelType.toLowerCase().includes('serie') ?
                            'Identificamos componentes temporales (tendencias, estacionalidad, ciclos) en sus datos.' :
                            'Procesamos y normalizamos sus datos para hacerlos adecuados para el análisis.'}
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="bg-purple-100 text-purple-800 h-5 w-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 text-xs font-semibold">2</span>
                        <span className="text-sm">
                          {step.modelType.toLowerCase().includes('regresión') ? 
                            'Validamos el modelo con datos históricos para asegurar precisión en las predicciones.' :
                          step.modelType.toLowerCase().includes('clasificación') ?
                            'Refinamos el modelo para maximizar precisión y minimizar errores de clasificación.' :
                          step.modelType.toLowerCase().includes('clustering') ?
                            'Determinamos el número óptimo de grupos para representar mejor sus datos.' :
                          step.modelType.toLowerCase().includes('serie') ?
                            'Construimos modelos que capturan los patrones temporales identificados.' :
                            'Aplicamos algoritmos especializados para extraer patrones significativos.'}
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="bg-purple-100 text-purple-800 h-5 w-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 text-xs font-semibold">3</span>
                        <span className="text-sm">
                          {step.modelType.toLowerCase().includes('regresión') ? 
                            'Generamos predicciones con intervalos de confianza para guiar decisiones estratégicas.' :
                          step.modelType.toLowerCase().includes('clasificación') ?
                            'Aplicamos el modelo a nuevos datos para clasificarlos con alta precisión.' :
                          step.modelType.toLowerCase().includes('clustering') ?
                            'Caracterizamos cada grupo identificado para entender su significado de negocio.' :
                          step.modelType.toLowerCase().includes('serie') ?
                            'Proyectamos tendencias futuras con bandas de confianza para planificación.' :
                            'Transformamos resultados técnicos en visualizaciones intuitivas y recomendaciones accionables.'}
                        </span>
                      </li>
                    </ol>
                  </div>
                  
                  <div className="bg-white p-3 rounded-md border border-purple-100 flex items-start gap-3">
                    <div className="p-1 rounded-full bg-purple-100">
                      <Sparkles className="h-6 w-6 text-purple-700" />
                    </div>
                    <div>
                      <h4 className="font-medium text-purple-800">Tecnología bajo el capó:</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        Este análisis utiliza {step.modelType.split(' ')[0]} {
                          step.modelType.toLowerCase().includes('xgboost') ? '(algoritmo ganador de múltiples competencias de ciencia de datos)' :
                          step.modelType.toLowerCase().includes('deep') ? '(redes neuronales similares a las usadas en inteligencia artificial avanzada)' :
                          step.modelType.toLowerCase().includes('random') ? '(uno de los algoritmos más robustos y precisos del mercado)' :
                          step.modelType.toLowerCase().includes('series') ? '(técnicas estadísticas avanzadas para datos temporales)' :
                          ''
                        } para garantizar resultados precisos y confiables.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t pt-4">
          <h3 className="font-medium text-lg">¿Qué beneficios obtendrá?</h3>
          <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg mt-2 border border-green-100">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {step.benefits ? (
                step.benefits.map((benefit: string, i: number) => (
                  <div key={i} className="bg-white p-3 rounded-md flex items-start gap-2 border border-green-100">
                    <div className="bg-green-100 p-1 rounded-full mt-0.5">
                      <CheckCircle2 className="h-4 w-4 text-green-700" />
                    </div>
                    <div>
                      <span className="text-green-800">{benefit}</span>
                      <p className="text-xs text-green-600 mt-1">
                        {i === 0 ? 'Impacto directo en su operación diaria.' : 
                         i === 1 ? 'Beneficio demostrable a corto plazo.' : 
                         'Ventaja competitiva sostenible.'}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <>
                  <div className="bg-white p-3 rounded-md flex items-start gap-2 border border-green-100">
                    <div className="bg-green-100 p-1 rounded-full mt-0.5">
                      <CheckCircle2 className="h-4 w-4 text-green-700" />
                    </div>
                    <div>
                      <span className="text-green-800">Insights precisos sin conocimientos técnicos</span>
                      <p className="text-xs text-green-600 mt-1">Acceda a análisis avanzados sin necesidad de un equipo especializado.</p>
                    </div>
                  </div>
                  <div className="bg-white p-3 rounded-md flex items-start gap-2 border border-green-100">
                    <div className="bg-green-100 p-1 rounded-full mt-0.5">
                      <CheckCircle2 className="h-4 w-4 text-green-700" />
                    </div>
                    <div>
                      <span className="text-green-800">Identificación de patrones ocultos</span>
                      <p className="text-xs text-green-600 mt-1">Descubra relaciones en sus datos que pasarían desapercibidas con análisis tradicionales.</p>
                    </div>
                  </div>
                  <div className="bg-white p-3 rounded-md flex items-start gap-2 border border-green-100">
                    <div className="bg-green-100 p-1 rounded-full mt-0.5">
                      <CheckCircle2 className="h-4 w-4 text-green-700" />
                    </div>
                    <div>
                      <span className="text-green-800">Decisiones basadas en evidencia</span>
                      <p className="text-xs text-green-600 mt-1">Reemplace intuiciones con datos concretos para optimizar resultados.</p>
                    </div>
                  </div>
                  <div className="bg-white p-3 rounded-md flex items-start gap-2 border border-green-100">
                    <div className="bg-green-100 p-1 rounded-full mt-0.5">
                      <CheckCircle2 className="h-4 w-4 text-green-700" />
                    </div>
                    <div>
                      <span className="text-green-800">ROI mensurable y concreto</span>
                      <p className="text-xs text-green-600 mt-1">Vea el impacto directo en sus resultados financieros.</p>
                    </div>
                  </div>
                </>
              )}
            </div>
            
            <div className="mt-4 bg-white p-3 rounded-md border border-green-100">
              <h4 className="font-medium text-green-800 flex items-center gap-2 mb-2">
                <span className="p-1 rounded-full bg-green-100">
                  <Activity className="h-4 w-4 text-green-700" />
                </span>
                Impacto en su negocio
              </h4>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium w-40">Tiempo de implementación:</span>
                  <div className="flex-1 bg-slate-100 h-2 rounded-full">
                    <div className="bg-green-500 h-full rounded-full" style={{width: '30%'}}></div>
                  </div>
                  <span className="text-xs text-muted-foreground">Rápido</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium w-40">Facilidad de uso:</span>
                  <div className="flex-1 bg-slate-100 h-2 rounded-full">
                    <div className="bg-green-500 h-full rounded-full" style={{width: step.difficulty === 'básico' ? '70%' : step.difficulty === 'intermedio' ? '50%' : '30%'}}></div>
                  </div>
                  <span className="text-xs text-muted-foreground">{step.difficulty === 'básico' ? 'Muy fácil' : step.difficulty === 'intermedio' ? 'Moderado' : 'Avanzado'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium w-40">ROI potencial:</span>
                  <div className="flex-1 bg-slate-100 h-2 rounded-full">
                    <div className="bg-green-500 h-full rounded-full" style={{width: step.difficulty === 'avanzado' ? '80%' : '60%'}}></div>
                  </div>
                  <span className="text-xs text-muted-foreground">{step.difficulty === 'avanzado' ? 'Muy alto' : 'Alto'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t pt-4">
          <h3 className="font-medium text-lg flex items-center gap-2">
            <Database className="h-4 w-4 text-primary" />
            ¿Qué datos necesitamos de usted?
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            No se preocupe si no tiene todos los datos — podemos trabajar con lo que tenga disponible y guiarle en la recolección de información adicional si es necesario.
          </p>
          <div className="mt-3 grid grid-cols-1 gap-3">
            {step.inputFields.map((field: any, i: number) => (
              <div key={i} className="bg-gradient-to-r from-blue-50 to-cyan-50 p-3 rounded-md border border-blue-100">
                <div className="flex items-start gap-2">
                  <Badge variant={field.required ? "default" : "outline"} className={`mt-0.5 ${field.required ? 'bg-blue-600' : ''}`}>
                    {field.required ? "Necesario" : "Opcional"}
                  </Badge>
                  <div>
                    <p className="font-medium">{field.name}</p>
                    <p className="text-sm text-muted-foreground">{field.description}</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {field.example && (
                        <span className="text-xs bg-white px-2 py-1 rounded border border-blue-100">
                          Ejemplo: {field.example}
                        </span>
                      )}
                      <span className="text-xs bg-white px-2 py-1 rounded border border-blue-100">
                        Tipo: {
                          field.type === 'numeric' ? 'Números' :
                          field.type === 'text' ? 'Texto' :
                          field.type === 'date' ? 'Fechas' : 'Categorías'
                        }
                      </span>
                      <span className="text-xs bg-white px-2 py-1 rounded border border-blue-100">
                        Formato sugerido: {
                          field.type === 'numeric' ? '.csv / Excel' :
                          field.type === 'text' ? '.csv / .txt / Excel' :
                          field.type === 'date' ? 'YYYY-MM-DD' : 'Valores discretos'
                        }
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="border-t pt-4">
          <h3 className="font-medium text-lg mb-2 flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-amber-500" />
            ¿Qué resultados obtendrá?
          </h3>
          <div className="grid grid-cols-1 gap-4">
            {step.outputInsights.map((insight: OutputInsight, i: number) => (
              <div key={i} className="bg-gradient-to-r from-amber-50 to-orange-50 p-4 rounded-md border border-amber-100">
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    {getVisualizationIcon(insight.visualizationType)}
                    <h4 className="font-medium">{insight.name}</h4>
                  </div>
                  <Badge variant="outline" className="bg-white">
                    {insight.visualizationType}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{insight.description}</p>
                
                <div className="mt-3 bg-white p-3 rounded border border-amber-100">
                  <p className="text-sm font-medium text-amber-800">Valor para su negocio:</p>
                  <p className="text-sm">{insight.businessValue}</p>
                
                  <div className="mt-3 p-2 rounded bg-amber-50">
                    <p className="text-xs text-amber-700 italic">Este insight le permitirá {
                      insight.name.toLowerCase().includes('segmentación') ? 'personalizar estrategias para diferentes grupos de clientes, aumentando la efectividad de sus acciones.' :
                      insight.name.toLowerCase().includes('predicción') ? 'anticiparse a cambios del mercado y preparar su operación para maximizar oportunidades.' :
                      insight.name.toLowerCase().includes('correlación') ? 'entender qué factores realmente impactan sus resultados y cuáles son coincidencias.' :
                      insight.name.toLowerCase().includes('optimización') ? 'encontrar el punto exacto de equilibrio entre costos y beneficios en sus operaciones.' :
                      'tomar decisiones basadas en evidencia sólida sobre aspectos clave de su negocio.'
                    }</p>
                  </div>
                </div>
                
                <div className="mt-3">
                  <h5 className="text-xs font-medium text-amber-700 mb-1">Vista previa de visualización:</h5>
                  <div className="bg-white border border-amber-100 rounded-md p-3 flex items-center justify-center h-24">
                    {insight.visualizationType.toLowerCase().includes('barra') || insight.visualizationType.toLowerCase().includes('bar') ? (
                      <div className="flex items-end h-full gap-3">
                        {[60, 45, 75, 30, 55].map((h, i) => (
                          <div key={i} className="w-6 bg-gradient-to-t from-primary to-primary/60 rounded-t" style={{height: `${h}%`}}></div>
                        ))}
                      </div>
                    ) : insight.visualizationType.toLowerCase().includes('línea') || insight.visualizationType.toLowerCase().includes('line') ? (
                      <div className="w-full h-full flex items-center">
                        <svg viewBox="0 0 100 30" className="w-full">
                          <path d="M0,25 L20,20 L40,10 L60,15 L80,5 L100,15" fill="none" stroke="hsl(var(--primary))" strokeWidth="2" />
                        </svg>
                      </div>
                    ) : insight.visualizationType.toLowerCase().includes('pie') || insight.visualizationType.toLowerCase().includes('torta') ? (
                      <div className="w-16 h-16 rounded-full bg-gradient-conic from-primary from-0% via-primary/50 via-40% to-primary/20 to-100%"></div>
                    ) : insight.visualizationType.toLowerCase().includes('mapa') || insight.visualizationType.toLowerCase().includes('heat') ? (
                      <div className="grid grid-cols-5 gap-1 w-full">
                        {Array.from({length: 25}).map((_, i) => (
                          <div key={i} className="aspect-square rounded" style={{backgroundColor: `hsla(var(--primary), ${Math.random() * 100}%)`}}></div>
                        ))}
                      </div>
                    ) : insight.visualizationType.toLowerCase().includes('dash') ? (
                      <div className="grid grid-cols-2 gap-2 w-full">
                        <div className="h-5 bg-primary/20 rounded"></div>
                        <div className="h-5 bg-primary/30 rounded"></div>
                        <div className="h-5 bg-primary/40 rounded"></div>
                        <div className="h-5 bg-primary/50 rounded"></div>
                      </div>
                    ) : (
                      <div className="text-xs text-muted-foreground">Vista previa personalizada</div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="border-t pt-4">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg">
            <h3 className="font-medium text-blue-800 flex items-center gap-2 mb-3">
              <HelpCircle className="h-5 w-5 text-blue-700" />
              ¿Necesita ayuda para interpretar los resultados?
            </h3>
            <div className="bg-white p-4 rounded-md border border-blue-100">
              <p className="text-sm text-blue-700">
                Contamos con un equipo de especialistas expertos en su industria que pueden agendar una sesión personalizada para:
              </p>
              <ul className="mt-2 space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-blue-600 mt-0.5" />
                  <span className="text-sm">Explicar en detalle cada insight generado y su contexto</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-blue-600 mt-0.5" />
                  <span className="text-sm">Ayudarle a crear un plan de acción basado en los resultados</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-blue-600 mt-0.5" />
                  <span className="text-sm">Responder preguntas específicas sobre cómo implementar las recomendaciones</span>
                </li>
              </ul>
              <Button variant="outline" className="mt-3 w-full bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100">
                Solicitar asistencia de especialista
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );

  // Success story dialog content
  const renderSuccessStoryContent = () => {
    const story = getSuccessStory(industry);
    return (
      <>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-xl text-green-800">¡Felicitaciones por dar el primer paso!</AlertDialogTitle>
          <AlertDialogDescription className="text-base">
            Ha descargado la plantilla. Mientras la completa, le compartimos un caso de éxito en su industria.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="py-4">
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-5 rounded-lg border border-green-100">
            <h3 className="font-medium text-green-800 flex items-center gap-2 mb-4">
              <Sparkles className="h-5 w-5 text-green-600" />
              Historia de éxito: {story.company}
            </h3>
            
            <div className="space-y-3">
              <div className="bg-white p-3 rounded-md border border-green-100">
                <h4 className="font-medium text-green-700 mb-1">El desafío</h4>
                <p className="text-sm">{story.challenge}</p>
              </div>
              
              <div className="bg-white p-3 rounded-md border border-green-100">
                <h4 className="font-medium text-green-700 mb-1">Nuestra solución</h4>
                <p className="text-sm">{story.solution}</p>
              </div>
              
              <div className="bg-white p-3 rounded-md border border-green-100">
                <h4 className="font-medium text-green-700 mb-1">Los resultados</h4>
                <p className="text-sm text-green-800 font-medium">{story.result}</p>
                
                <div className="mt-3 grid grid-cols-2 gap-2">
                  <div className="bg-green-50 p-2 rounded text-center">
                    <p className="text-xs text-green-600">Tiempo de implementación</p>
                    <p className="font-semibold text-green-800">3-4 semanas</p>
                  </div>
                  <div className="bg-green-50 p-2 rounded text-center">
                    <p className="text-xs text-green-600">ROI calculado</p>
                    <p className="font-semibold text-green-800">315%</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-3 rounded-md border border-amber-100">
                <blockquote className="text-amber-800 italic">
                  "{story.testimonial}"
                </blockquote>
                <div className="mt-2 text-right">
                  <p className="font-medium text-amber-900 text-sm">Director/a de Operaciones</p>
                  <p className="text-xs text-amber-700">{story.company}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel>Cerrar</AlertDialogCancel>
          <AlertDialogAction className="gap-2">
            <HelpCircle className="h-4 w-4" />
            Solicitar demo personalizada
          </AlertDialogAction>
        </AlertDialogFooter>
      </>
    );
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
            <Card className="overflow-hidden border-primary/20">
              <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/10">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Activity className="h-5 w-5 text-primary" />
                      {flow.name}
                    </CardTitle>
                    <CardDescription className="mt-1">{flow.description}</CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="flex items-center gap-1 bg-white">
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
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="bg-gradient-to-r from-primary/5 to-primary/10 p-4 rounded-lg flex flex-col sm:flex-row items-start sm:items-center gap-3">
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
                        <AccordionItem key={step.id} value={step.id} className="border border-slate-200 mb-3 rounded-lg overflow-hidden">
                          <AccordionTrigger className="hover:bg-muted/50 px-3 rounded-md">
                            <div className="flex items-center gap-2">
                              <Badge variant="default" className="h-6 w-6 rounded-full flex items-center justify-center p-0">
                                {index + 1}
                              </Badge>
                              <span>{step.name}</span>
                              {step.prerequisiteSteps.length > 0 && (
                                <Badge variant="secondary" className="ml-2 text-xs">
                                  Requiere paso{step.prerequisiteSteps.length > 1 ? 's' : ''} previo{step.prerequisiteSteps.length > 1 ? 's' : ''}
                                </Badge>
                              )}
                              <Badge className="ml-auto flex items-center gap-1" variant={
                                step.difficulty === 'básico' ? 'outline' : 
                                step.difficulty === 'intermedio' ? 'secondary' : 
                                'default'
                              }>
                                {getDifficultyIcon(step.difficulty)}
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
                              <div className="bg-gradient-to-r from-slate-50 to-slate-100 p-3 rounded-md border border-slate-200">
                                <h5 className="text-sm font-medium mb-2 flex items-center gap-1">
                                  <Database className="h-4 w-4 text-primary" />
                                  Datos necesarios:
                                </h5>
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
                              <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-3 rounded-md border border-amber-100">
                                <h5 className="text-sm font-medium mb-2 flex items-center gap-1 text-amber-800">
                                  <Sparkles className="h-4 w-4 text-amber-500" />
                                  Resultados obtenidos:
                                </h5>
                                <ul className="space-y-3">
                                  {step.outputInsights.map((insight, i) => (
                                    <li key={i} className="text-sm">
                                      <div className="flex items-center gap-1">
                                        {getVisualizationIcon(insight.visualizationType)}
                                        <span className="font-medium">{insight.name}</span>
                                        <Badge variant="outline" className="ml-auto bg-white">
                                          {insight.visualizationType}
                                        </Badge>
                                      </div>
                                      <p className="text-muted-foreground text-xs ml-6">{insight.description}</p>
                                      <p className="text-primary text-xs ml-6 mt-1">Valor de negocio: {insight.businessValue}</p>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                              
                              <div className="flex items-center justify-between text-xs text-muted-foreground bg-slate-50 p-2 rounded-md border border-slate-200">
                                <span className="flex items-center gap-1">
                                  <Clock className="h-3 w-3" />
                                  Tiempo estimado: {step.estimatedProcessingTime}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Brain className="h-3 w-3" />
                                  Tecnología: {step.modelType}
                                </span>
                              </div>
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-wrap justify-between gap-3 bg-gradient-to-r from-slate-50 to-slate-100 p-4 border-t">
                <div className="text-sm">
                  <span className="font-medium">Herramientas recomendadas:</span>{' '}
                  <div className="flex flex-wrap gap-1 mt-1">
                    {flow.recommendedTools.map((tool, i) => (
                      <Badge key={i} variant="outline" className="bg-white">{tool}</Badge>
                    ))}
                  </div>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="default" size="sm" className="gap-1">
                      Ver guía completa
                      <ArrowRight className="h-3 w-3" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle className="text-xl flex items-center gap-2">
                        <FileSearch className="h-5 w-5 text-primary" />
                        Guía completa: {flow.name}
                      </DialogTitle>
                      <DialogDescription className="text-base">
                        Una explicación detallada de todo el proceso de análisis
                      </DialogDescription>
                    </DialogHeader>
                    
                    <div className="mt-4 space-y-6">
                      <div>
                        <h3 className="text-lg font-medium">Introducción</h3>
                        <p className="text-muted-foreground mt-1">
                          {flow.description} Este flujo está diseñado para {flow.businessGoal.toLowerCase()}
                        </p>
                        
                        <div className="mt-4 p-4 bg-gradient-to-r from-primary/5 to-primary/10 rounded-lg border border-primary/20">
                          <h4 className="font-medium">Este análisis es ideal para:</h4>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
                            {flow.recommendedFor?.map((role, i) => (
                              <div key={i} className="flex items-start gap-2 bg-white p-3 rounded-md border border-primary/10">
                                <ArrowRight className="h-4 w-4 text-primary mt-1" />
                                <div>
                                  <p className="font-medium">{role.title}</p>
                                  <p className="text-sm text-muted-foreground">{role.reason}</p>
                                </div>
                              </div>
                            ))}
                            {!flow.recommendedFor && (
                              <div className="bg-white p-3 rounded-md border border-primary/10">
                                <p className="font-medium">Profesionales de {industry}</p>
                                <p className="text-sm text-muted-foreground">
                                  Que buscan optimizar sus operaciones y tomar mejores decisiones basadas en datos.
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      <div className="border-t pt-4">
                        <h3 className="text-lg font-medium mb-4">Proceso paso a paso</h3>
                        
                        {flow.steps.map((step, index) => (
                          <div key={step.id} className="mb-8 relative">
                            <div className="flex items-start gap-4">
                              <div className="bg-gradient-to-br from-primary to-primary/80 h-10 w-10 rounded-full text-white flex items-center justify-center flex-shrink-0 shadow-md">
                                {index + 1}
                              </div>
                              <div className="space-y-3 w-full">
                                <h4 className="font-medium text-lg">{step.name}</h4>
                                <p>{step.description}</p>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <div className="bg-gradient-to-r from-slate-50 to-slate-100 p-3 rounded-md border border-slate-200">
                                    <h5 className="font-medium mb-2">Beneficios clave:</h5>
                                    <ul className="space-y-2">
                                      {step.benefits ? step.benefits.map((benefit, i) => (
                                        <li key={i} className="flex items-start gap-2">
                                          <div className="h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center mt-0.5">
                                            <CheckCircle2 className="h-3 w-3 text-primary" />
                                          </div>
                                          <span>{benefit}</span>
                                        </li>
                                      )) : (
                                        <li className="text-muted-foreground">
                                          Información detallada disponible en la explicación del paso.
                                        </li>
                                      )}
                                    </ul>
                                  </div>
                                  
                                  <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-3 rounded-md border border-amber-100">
                                    <h5 className="font-medium mb-2 text-amber-800">Resultados esperados:</h5>
                                    <ul className="space-y-2">
                                      {step.outputInsights.map((insight, i) => (
                                        <li key={i} className="flex items-start gap-2">
                                          <div className="bg-amber-100 p-1 rounded flex-shrink-0 mt-0.5">
                                            {getVisualizationIcon(insight.visualizationType)}
                                          </div>
                                          <div>
                                            <span className="font-medium">{insight.name}</span>
                                            <p className="text-xs text-amber-700">{insight.businessValue}</p>
                                          </div>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                </div>
                                
                                <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-3 rounded-md border border-indigo-100">
                                  <h5 className="font-medium mb-2 text-indigo-800">Detalles técnicos:</h5>
                                  <div className="flex items-start gap-3">
                                    <Brain className="h-5 w-5 text-indigo-600 mt-0.5" />
                                    <div>
                                      <p className="text-sm">Este paso utiliza <span className="font-medium">{step.modelType}</span>, 
                                      que {step.howItWorks ? step.howItWorks.split('.')[0].toLowerCase() + '.' : 
                                      'procesa los datos proporcionados para generar resultados precisos y accionables.'}</p>
                                      <p className="text-xs text-muted-foreground mt-2 flex items-center gap-2">
                                        <Badge variant={step.difficulty === 'básico' ? 'outline' : step.difficulty === 'intermedio' ? 'secondary' : 'default'} className="text-xs">
                                          {step.difficulty}
                                        </Badge>
                                        <span>•</span>
                                        <span>Tiempo estimado: {step.estimatedProcessingTime}</span>
                                      </p>
                                    </div>
                                  </div>
                                </div>

                                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-3 rounded-md border border-blue-100">
                                  <h5 className="font-medium mb-2 text-blue-800">Necesidades de datos:</h5>
                                  <div className="space-y-2">
                                    {step.inputFields.slice(0, 3).map((field, i) => (
                                      <div key={i} className="flex items-start gap-2 bg-white p-2 rounded border border-blue-100">
                                        <Badge variant={field.required ? "default" : "outline"} className="mt-0.5">
                                          {field.required ? "Necesario" : "Opcional"}
                                        </Badge>
                                        <div>
                                          <span className="font-medium">{field.name}</span>
                                          <p className="text-xs text-muted-foreground">{field.description}</p>
                                        </div>
                                      </div>
                                    ))}
                                    {step.inputFields.length > 3 && (
                                      <p className="text-xs text-center text-blue-600">
                                        +{step.inputFields.length - 3} campos adicionales (ver detalles del paso)
                                      </p>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                            
                            {/* Connector line between steps */}
                            {index < flow.steps.length - 1 && (
                              <div className="absolute left-5 top-10 bottom-0 w-0.5 bg-gradient-to-b from-primary to-primary/20" style={{height: "calc(100% + 1rem)"}} />
                            )}
                          </div>
                        ))}
                      </div>
                      
                      {flow.technicalImplementation && (
                        <div className="border-t pt-4">
                          <h3 className="text-lg font-medium flex items-center gap-2">
                            <Code className="h-5 w-5 text-primary" />
                            Implementación técnica
                          </h3>
                          <p className="text-muted-foreground mt-1">{flow.technicalImplementation.approach}</p>
                          
                          <div className="mt-4 space-y-4">
                            <div className="bg-gradient-to-r from-slate-50 to-slate-100 p-4 rounded-lg border border-slate-200">
                              <h4 className="font-medium mb-3 flex items-center gap-2">
                                <Database className="h-4 w-4 text-primary" />
                                Tecnologías utilizadas
                              </h4>
                              <div className="flex flex-wrap gap-2">
                                {flow.technicalImplementation.technologies.map((tech, i) => (
                                  <Badge key={i} variant="outline" className="bg-white">{tech}</Badge>
                                ))}
                              </div>
                              
                              <div className="mt-4 bg-white p-3 rounded-md border border-slate-200">
                                <h5 className="font-medium text-sm mb-2">¿Por qué elegimos estas tecnologías?</h5>
                                <ul className="space-y-1 text-sm">
                                  <li className="flex items-start gap-2">
                                    <ArrowRight className="h-4 w-4 text-primary mt-0.5" />
                                    <span>Proporcionan el mejor equilibrio entre rendimiento y facilidad de interpretación</span>
                                  </li>
                                  <li className="flex items-start gap-2">
                                    <ArrowRight className="h-4 w-4 text-primary mt-0.5" />
                                    <span>Permiten procesar grandes volúmenes de datos con bajos requisitos computacionales</span>
                                  </li>
                                  <li className="flex items-start gap-2">
                                    <ArrowRight className="h-4 w-4 text-primary mt-0.5" />
                                    <span>Generan visualizaciones interactivas que facilitan la comprensión de resultados</span>
                                  </li>
                                </ul>
                              </div>
                            </div>
                            
                            {flow.technicalImplementation.openSourceAlternatives && (
                              <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-lg border border-green-100">
                                <h4 className="font-medium mb-3 flex items-center gap-2 text-green-800">
                                  <Code className="h-4 w-4 text-green-700" />
                                  Alternativas Open Source
                                </h4>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                  {flow.technicalImplementation.openSourceAlternatives.map((alt, i) => (
                                    <div key={i} className="p-3 bg-white rounded border border-green-100">
                                      <p className="font-medium">{alt.name}</p>
                                      <p className="text-sm text-muted-foreground">{alt.description}</p>
                                      {alt.url && <p className="text-xs text-primary mt-1 truncate">{alt.url}</p>}
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                            
                            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-4 rounded-lg border border-indigo-100">
                              <h4 className="font-medium mb-3 text-indigo-800 flex items-center gap-2">
                                <Activity className="h-4 w-4 text-indigo-700" />
                                Proceso de implementación
                              </h4>
                              <div className="space-y-3">
                                {flow.technicalImplementation.implementationSteps.map((step, i) => (
                                  <div key={i} className="bg-white p-3 rounded-md border border-indigo-100">
                                    <div className="flex items-center gap-2">
                                      <div className="bg-indigo-100 h-6 w-6 rounded-full text-indigo-800 flex items-center justify-center text-sm font-medium">
                                        {i + 1}
                                      </div>
                                      <p className="font-medium">{step.name}</p>
                                    </div>
                                    <p className="text-sm text-muted-foreground mt-1 ml-8">{step.description}</p>
                                    
                                    {step.resources && (
                                      <div className="ml-8 mt-2 p-2 bg-indigo-50 rounded-md">
                                        <p className="text-xs font-medium text-indigo-800">Recursos utilizados:</p>
                                        <ul className="text-xs text-indigo-700 space-y-1 mt-1">
                                          {step.resources.map((resource, j) => (
                                            <li key={j} className="flex items-start gap-1">
                                              <span className="text-indigo-500">•</span>
                                              <span>{resource}</span>
                                            </li>
                                          ))}
                                        </ul>
                                      </div>
                                    )}
                                  </div>
                                ))}
                              </div>
                            </div>
                            
                            {flow.technicalImplementation.challenges && (
                              <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-4 rounded-lg border border-amber-100">
                                <h4 className="font-medium mb-3 text-amber-800 flex items-center gap-2">
                                  <HelpCircle className="h-4 w-4 text-amber-700" />
                                  Consideraciones importantes
                                </h4>
                                <ul className="space-y-2">
                                  {flow.technicalImplementation.challenges.map((challenge, i) => (
                                    <li key={i} className="flex items-start gap-2 bg-white p-2 rounded border border-amber-100">
                                      <span className="text-amber-500 font-bold mt-0.5">•</span>
                                      <span className="text-sm">{challenge}</span>
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
                        <div className="bg-gradient-to-r from-primary/5 to-primary/10 p-4 rounded-lg mt-3 border border-primary/20">
                          <ol className="space-y-4">
                            <li className="flex items-start gap-3">
                              <div className="bg-primary h-7 w-7 rounded-full text-white flex items-center justify-center flex-shrink-0 font-medium">1</div>
                              <div className="bg-white p-3 rounded-md border border-primary/20 flex-1">
                                <p className="font-medium">Descargue la plantilla Excel</p>
                                <p className="text-sm text-muted-foreground mt-1">
                                  Use el botón "Descargar plantilla" para obtener un archivo Excel con todas las hojas necesarias.
                                </p>
                                <Button variant="outline" size="sm" className="mt-2 gap-1" onClick={() => handleDownloadTemplate(flow.id)}>
                                  <Download className="h-4 w-4" />
                                  Descargar plantilla
                                </Button>
                              </div>
                            </li>
                            <li className="flex items-start gap-3">
                              <div className="bg-primary h-7 w-7 rounded-full text-white flex items-center justify-center flex-shrink-0 font-medium">2</div>
                              <div className="bg-white p-3 rounded-md border border-primary/20 flex-1">
                                <p className="font-medium">Complete con sus datos</p>
                                <p className="text-sm text-muted-foreground mt-1">
                                  Llene las celdas con la información solicitada. No se preocupe si no tiene todos los datos opcionales.
                                </p>
                                <div className="mt-2 grid grid-cols-3 gap-2">
                                  <div className="bg-slate-50 p-1 rounded text-center text-xs">Hoja 1: Datos básicos</div>
                                  <div className="bg-slate-50 p-1 rounded text-center text-xs">Hoja 2: Métricas</div>
                                  <div className="bg-slate-50 p-1 rounded text-center text-xs">Hoja 3: Opciones</div>
                                </div>
                              </div>
                            </li>
                            <li className="flex items-start gap-3">
                              <div className="bg-primary h-7 w-7 rounded-full text-white flex items-center justify-center flex-shrink-0 font-medium">3</div>
                              <div className="bg-white p-3 rounded-md border border-primary/20 flex-1">
                                <p className="font-medium">Cargue la plantilla completa</p>
                                <p className="text-sm text-muted-foreground mt-1">
                                  Suba el archivo en la sección "Modelos ML" y espere mientras procesamos sus datos.
                                </p>
                                <div className="mt-2 p-2 bg-blue-50 rounded text-xs text-blue-700 flex items-start gap-2">
                                  <Info className="h-4 w-4 flex-shrink-0 mt-0.5" />
                                  <span>Tiempo estimado de procesamiento: {flow.totalEstimatedTime}</span>
                                </div>
                              </div>
                            </li>
                            <li className="flex items-start gap-3">
                              <div className="bg-primary h-7 w-7 rounded-full text-white flex items-center justify-center flex-shrink-0 font-medium">4</div>
                              <div className="bg-white p-3 rounded-md border border-primary/20 flex-1">
                                <p className="font-medium">Revise los resultados</p>
                                <p className="text-sm text-muted-foreground mt-1">
                                  Examine los insights generados y las recomendaciones para su negocio.
                                </p>
                                <div className="mt-2 grid grid-cols-2 gap-2">
                                  <div className="p-2 bg-gradient-to-r from-amber-50 to-amber-100 rounded text-xs text-amber-700 flex items-center justify-center">
                                    Dashboard interactivo
                                  </div>
                                  <div className="p-2 bg-gradient-to-r from-green-50 to-green-100 rounded text-xs text-green-700 flex items-center justify-center">
                                    Recomendaciones accionables
                                  </div>
                                </div>
                              </div>
                            </li>
                            <li className="flex items-start gap-3">
                              <div className="bg-primary h-7 w-7 rounded-full text-white flex items-center justify-center flex-shrink-0 font-medium">5</div>
                              <div className="bg-white p-3 rounded-md border border-primary/20 flex-1">
                                <p className="font-medium">Agende una sesión con especialistas (opcional)</p>
                                <p className="text-sm text-muted-foreground mt-1">
                                  Nuestro equipo puede ayudarle a interpretar los resultados y aplicarlos a su negocio.
                                </p>
                                <Button variant="default" size="sm" className="mt-2 gap-1">
                                  <HelpCircle className="h-4 w-4" />
                                  Solicitar sesión personalizada
                                </Button>
                              </div>
                            </li>
                          </ol>
                        </div>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </CardFooter>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
      
      {/* Success Story Alert Dialog */}
      <AlertDialog open={showSuccessStory} onOpenChange={setShowSuccessStory}>
        <AlertDialogContent className="max-w-2xl">
          {renderSuccessStoryContent()}
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
