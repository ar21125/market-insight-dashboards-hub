
import React, { useState } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { 
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger
} from '@/components/ui/drawer';
import { Stepper, Step } from '@/components/ui/stepper';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { AIModelInfo } from '@/types/aiModels';
import { Check, ChevronRight, FileSpreadsheet, Upload, Database, ArrowRight, FileCog, ChartBar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent } from '@/components/ui/card';
import { useMediaQuery } from '@/hooks/use-mobile';

interface ModelSelectionFlowProps {
  model: AIModelInfo;
  trigger?: React.ReactNode;
  onComplete?: () => void;
}

const ModelSelectionFlow: React.FC<ModelSelectionFlowProps> = ({ model, trigger, onComplete }) => {
  const [open, setOpen] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const form = useForm({
    defaultValues: {
      dataSource: '',
      dataFields: '',
      objectives: '',
      additionalContext: '',
    }
  });
  
  const steps = [
    {
      title: "Datos requeridos",
      description: "Información necesaria",
      content: (
        <div className="space-y-4 mt-4">
          <h3 className="text-lg font-medium mb-2">Datos requeridos para {model.name}</h3>
          <div className="space-y-4 mb-6">
            {model.data_requirements.map((req, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="mt-1 bg-primary/10 p-1 rounded">
                  <Check className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p>{req}</p>
                </div>
              </div>
            ))}
          </div>
          
          <Card className="bg-muted/50 border-dashed">
            <CardContent className="p-4 space-y-2">
              <div className="flex items-center gap-2">
                <FileSpreadsheet className="h-5 w-5 text-primary" />
                <h4 className="font-medium">Recomendaciones para preparación de datos:</h4>
              </div>
              <ul className="list-disc list-inside text-sm space-y-1 pl-2">
                <li>Asegúrese de que sus datos no contengan valores faltantes o erróneos</li>
                <li>Los datos deben estar en formato {model.type === 'time_series' ? 'cronológico con timestamps regulares' : 'estructurado en tabla'}</li>
                <li>Utilice nuestra plantilla de importación para un procesamiento más rápido</li>
              </ul>
              <div className="mt-3">
                <Button variant="outline" size="sm" className="w-full">
                  <Download className="h-4 w-4 mr-2" />
                  Descargar plantilla
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )
    },
    {
      title: "Configuración",
      description: "Parámetros del modelo",
      content: (
        <div className="space-y-4 mt-4">
          <h3 className="text-lg font-medium mb-2">Configuración de {model.name}</h3>
          <p className="text-muted-foreground mb-4">
            Configure los parámetros del modelo para adaptarlo a sus necesidades específicas.
          </p>
          
          <div className="space-y-4">
            {model.parameters ? (
              <div className="space-y-4">
                {model.parameters.map((param, i) => (
                  <div key={i} className="p-3 border rounded-lg bg-card">
                    <div className="flex justify-between items-start mb-1">
                      <div>
                        <h4 className="font-medium">{param.name}</h4>
                        <p className="text-sm text-muted-foreground">{param.description}</p>
                      </div>
                      {param.required && (
                        <Badge>Requerido</Badge>
                      )}
                    </div>
                    
                    <div className="mt-2 flex items-center gap-2">
                      <span className="text-sm">Valor por defecto: </span>
                      <Badge variant="secondary">{String(param.default)}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-4 border rounded-md bg-muted text-center">
                <p className="text-muted-foreground">Este modelo no tiene parámetros configurables</p>
              </div>
            )}
          </div>
        </div>
      )
    },
    {
      title: "Formato de salida",
      description: "Resultados esperados",
      content: (
        <div className="space-y-4 mt-4">
          <h3 className="text-lg font-medium mb-2">Resultados esperados</h3>
          <p className="text-muted-foreground mb-4">
            Este es el tipo de información que podrá obtener con este modelo.
          </p>
          
          <div className="grid gap-4">
            <div className="p-4 border rounded-lg">
              <div className="flex items-start gap-3">
                <div className="mt-1">
                  <ChartBar className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium">Métricas principales</h4>
                  <div className="mt-2 space-y-2">
                    {model.typical_metrics.map((metric, i) => (
                      <div key={i} className="bg-muted/50 p-2 rounded">
                        <p className="font-medium text-sm">{metric.name}</p>
                        <p className="text-sm text-muted-foreground">{metric.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-4 border rounded-lg">
              <div className="flex items-start gap-3">
                <div className="mt-1">
                  <FileCog className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium">Visualizaciones y entregables</h4>
                  <div className="mt-2 space-y-2 text-sm">
                    <p>• Dashboard interactivo con resultados</p>
                    <p>• Exportación de datos en formato Excel/CSV</p>
                    <p>• Reporte PDF con hallazgos clave</p>
                    <p>• API para integración con sistemas existentes</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Iniciar análisis",
      description: "Confirmar ejecución",
      content: (
        <div className="space-y-4 mt-4">
          <h3 className="text-lg font-medium mb-2">Iniciar análisis con {model.name}</h3>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(() => setActiveStep(activeStep + 1))} className="space-y-4">
              <FormField
                control={form.control}
                name="dataSource"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Origen de datos</FormLabel>
                    <FormControl>
                      <Input placeholder="ej: Base de datos SQL, CSV, API..." {...field} />
                    </FormControl>
                    <FormDescription>
                      Indique de dónde provienen los datos que desea analizar
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="dataFields"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Campos/variables principales</FormLabel>
                    <FormControl>
                      <Input placeholder="ej: Fecha, Producto, Ventas, Región..." {...field} />
                    </FormControl>
                    <FormDescription>
                      Enumere los campos principales que contienen sus datos
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="objectives"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Objetivo del análisis</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Describa qué busca lograr con este análisis..."
                        className="min-h-[80px]"
                        {...field} 
                      />
                    </FormControl>
                    <FormDescription>
                      Explique el problema que intenta resolver o la pregunta que busca responder
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="additionalContext"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contexto adicional (opcional)</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Información adicional relevante..."
                        className="min-h-[80px]"
                        {...field} 
                      />
                    </FormControl>
                    <FormDescription>
                      Cualquier información adicional que pueda ser útil para el análisis
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <Button type="submit" className="w-full">
                Iniciar análisis
              </Button>
            </form>
          </Form>
        </div>
      )
    },
    {
      title: "Confirmación",
      description: "Análisis en proceso",
      content: (
        <div className="space-y-4 mt-4 text-center">
          <div className="py-6">
            <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Check className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-medium mb-2">¡Análisis iniciado!</h3>
            <p className="text-muted-foreground mb-6">
              Su análisis con {model.name} ha sido programado y está siendo procesado.
              Recibirá una notificación cuando los resultados estén disponibles.
            </p>
            
            <div className="flex flex-col space-y-4">
              <Button onClick={() => {
                setOpen(false);
                onComplete && onComplete();
                
                toast({
                  title: "Análisis iniciado con éxito",
                  description: `Su análisis con ${model.name} está siendo procesado.`
                });
                
                const industry = model.industry || 'general';
                navigate(`/dashboard/${industry}`);
              }}>
                Ver dashboard de resultados
              </Button>
              
              <Button variant="outline" onClick={() => {
                setOpen(false);
                onComplete && onComplete();
              }}>
                Cerrar
              </Button>
            </div>
          </div>
        </div>
      )
    }
  ];
  
  const handleNext = () => {
    if (activeStep === 3) {
      // Let the form submission handle this step
      return;
    }
    
    if (activeStep < steps.length - 1) {
      setActiveStep(activeStep + 1);
    }
  };
  
  const handleBack = () => {
    if (activeStep > 0) {
      setActiveStep(activeStep - 1);
    }
  };
  
  const CurrentStep = () => {
    return steps[activeStep].content;
  };
  
  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          {trigger || (
            <Button>
              Implementar <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          )}
        </DialogTrigger>
        <DialogContent className="max-w-3xl max-h-[95vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Implementación de {model.name}</DialogTitle>
            <DialogDescription>
              Configuración paso a paso para implementar este modelo de análisis
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            <Stepper activeStep={activeStep} className="mb-8">
              {steps.map((step, i) => (
                <Step
                  key={i}
                  title={step.title}
                  description={step.description}
                />
              ))}
            </Stepper>
            
            <div className="mt-6">
              <CurrentStep />
            </div>
          </div>
          
          <DialogFooter className="flex items-center justify-between border-t pt-4">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={activeStep === 0 || activeStep === steps.length - 1}
            >
              Anterior
            </Button>
            
            {activeStep < steps.length - 1 && activeStep !== 3 && (
              <Button onClick={handleNext}>
                Siguiente
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }
  
  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        {trigger || (
          <Button>
            Implementar <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        )}
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Implementación de {model.name}</DrawerTitle>
          <DrawerDescription>
            Configuración paso a paso para implementar este modelo de análisis
          </DrawerDescription>
        </DrawerHeader>
        
        <div className="px-4">
          <div className="py-4">
            <Stepper activeStep={activeStep} className="mb-8">
              {steps.map((step, i) => (
                <Step
                  key={i}
                  title={step.title}
                  description=""
                />
              ))}
            </Stepper>
            
            <div className="mt-6">
              <CurrentStep />
            </div>
          </div>
        </div>
        
        <DrawerFooter className="flex items-center justify-between border-t pt-4">
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={activeStep === 0 || activeStep === steps.length - 1}
          >
            Anterior
          </Button>
          
          {activeStep < steps.length - 1 && activeStep !== 3 && (
            <Button onClick={handleNext}>
              Siguiente
            </Button>
          )}
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

// For TypeScript - make sure to define the Download component
const Download: React.FC<{ className?: string }> = ({ className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" x2="12" y1="15" y2="3" />
  </svg>
);

export default ModelSelectionFlow;
