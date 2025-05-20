import React from 'react';
import DefaultLayout from '../layouts/DefaultLayout';
import { Stepper, Step } from '@/components/ui/stepper';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, ArrowRight, Check, ChevronRight, Download, Eye, FileSpreadsheet } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const EnergyImplementation = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = React.useState(0);
  const [selectedTab, setSelectedTab] = React.useState('overview');

  const handleNext = () => {
    if (activeStep < 4) {
      setActiveStep(activeStep + 1);
    }
  };

  const handleBack = () => {
    if (activeStep > 0) {
      setActiveStep(activeStep - 1);
    }
  };
  
  const handleGoToDashboard = () => {
    navigate('/dashboard/energia');
  };

  return (
    <DefaultLayout>
      <div className="container mx-auto py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Optimización de Consumo Energético</h1>
            <p className="text-muted-foreground">
              Implementación de análisis predictivo para eficiencia energética y reducción de costos
            </p>
          </div>
          <Button variant="outline" asChild>
            <Link to="/industries">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Volver a Industrias
            </Link>
          </Button>
        </div>

        <div className="mb-8">
          <Stepper activeStep={activeStep} className="mb-12">
            <Step 
              title="Configuración"
              description="Definir parámetros"
            />
            <Step 
              title="Datos"
              description="Cargar información"
            />
            <Step 
              title="Análisis"
              description="Procesar datos"
            />
            <Step 
              title="Resultados"
              description="Visualizar insights"
            />
            <Step 
              title="Implementación"
              description="Aplicar soluciones"
            />
          </Stepper>

          <Card className="border-primary/20">
            <Tabs value={selectedTab} onValueChange={setSelectedTab}>
              <div className="border-b px-6 py-3">
                <TabsList>
                  <TabsTrigger value="overview">Vista general</TabsTrigger>
                  <TabsTrigger value="configuration">Configuración</TabsTrigger>
                  <TabsTrigger value="process">Proceso</TabsTrigger>
                  <TabsTrigger value="results">Resultados</TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="overview" className="p-6">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-lg font-medium mb-2">Optimización Energética con IA Predictiva</h3>
                    <p className="text-muted-foreground mb-4">
                      Esta solución utiliza algoritmos avanzados de machine learning para analizar patrones 
                      de consumo energético, identificar ineficiencias y predecir picos de demanda, 
                      permitiendo optimizar recursos y reducir costos operativos.
                    </p>

                    <div className="space-y-3 mb-6">
                      <div className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-primary mt-0.5" />
                        <div>
                          <p className="font-medium">Reducción de costos</p>
                          <p className="text-sm text-muted-foreground">
                            Disminución de hasta 18% en facturación energética
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-primary mt-0.5" />
                        <div>
                          <p className="font-medium">Mantenimiento predictivo</p>
                          <p className="text-sm text-muted-foreground">
                            Anticipación de fallas en equipos con 87% de precisión
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-primary mt-0.5" />
                        <div>
                          <p className="font-medium">Optimización de redes</p>
                          <p className="text-sm text-muted-foreground">
                            Mejora de distribución y reducción de pérdidas
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-primary mt-0.5" />
                        <div>
                          <p className="font-medium">Previsión de demanda</p>
                          <p className="text-sm text-muted-foreground">
                            Pronósticos precisos para planificación estratégica
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">Detalles de la implementación</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2 pt-0">
                        <div className="grid grid-cols-2 gap-1">
                          <div className="text-sm text-muted-foreground">Tiempo estimado:</div>
                          <div className="text-sm font-medium">6-8 semanas</div>
                          
                          <div className="text-sm text-muted-foreground">Complejidad:</div>
                          <div>
                            <Badge variant="outline">Alta</Badge>
                          </div>
                          
                          <div className="text-sm text-muted-foreground">ROI estimado:</div>
                          <div className="text-sm font-medium">312%</div>
                          
                          <div className="text-sm text-muted-foreground">Modelos utilizados:</div>
                          <div className="text-sm font-medium">
                            <span className="block">LSTM, Prophet, Random Forest</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-base">Sigue aprendiendo</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2 pt-0">
                        <div className="flex items-center gap-3 group">
                          <Eye className="h-4 w-4 text-primary" />
                          <Link to="/ai-models" className="text-sm group-hover:underline">
                            Catálogo de modelos para energía
                          </Link>
                          <ChevronRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                        <div className="flex items-center gap-3 group">
                          <FileSpreadsheet className="h-4 w-4 text-primary" />
                          <span className="text-sm group-hover:underline cursor-pointer">
                            Guía de preparación de datos energéticos
                          </span>
                          <ChevronRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                        <div className="flex items-center gap-3 group">
                          <Download className="h-4 w-4 text-primary" />
                          <span className="text-sm group-hover:underline cursor-pointer">
                            Plantilla de monitoreo de consumo
                          </span>
                          <ChevronRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="configuration">
                <div className="p-6">
                  <h3 className="text-lg font-medium mb-4">Parámetros de configuración</h3>
                  <p className="mb-6 text-muted-foreground">
                    Configure los parámetros para adaptar el análisis a sus necesidades específicas.
                  </p>
                  
                  <div className="space-y-6">
                    {/* Placeholder for configuration settings */}
                    <div className="bg-muted p-12 rounded-md flex items-center justify-center border border-dashed">
                      <p className="text-muted-foreground">Configuraciones específicas estarán disponibles al iniciar el proceso</p>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="process">
                <div className="p-6">
                  <h3 className="text-lg font-medium mb-4">Proceso de análisis</h3>
                  <p className="mb-6 text-muted-foreground">
                    El análisis se realizará siguiendo un proceso estructurado para garantizar resultados precisos.
                  </p>
                  
                  {/* Placeholder for process details */}
                  <div className="bg-muted p-12 rounded-md flex items-center justify-center border border-dashed">
                    <p className="text-muted-foreground">Detalles del proceso se mostrarán durante la implementación</p>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="results">
                <div className="p-6">
                  <h3 className="text-lg font-medium mb-4">Resultados esperados</h3>
                  <p className="mb-6 text-muted-foreground">
                    Al completar el análisis, obtendrá insights accionables para optimizar su consumo energético.
                  </p>
                  
                  {/* Placeholder for results preview */}
                  <div className="bg-muted p-12 rounded-md flex items-center justify-center border border-dashed">
                    <p className="text-muted-foreground">Vista previa de resultados estará disponible al completar el análisis</p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
            
            <CardFooter className="flex justify-between border-t px-6 py-4">
              <Button
                variant="outline"
                onClick={handleBack}
                disabled={activeStep === 0}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Anterior
              </Button>
              
              {activeStep < 4 ? (
                <Button onClick={handleNext}>
                  Siguiente
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              ) : (
                <Button onClick={handleGoToDashboard}>
                  Ver dashboard
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              )}
            </CardFooter>
          </Card>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default EnergyImplementation;
