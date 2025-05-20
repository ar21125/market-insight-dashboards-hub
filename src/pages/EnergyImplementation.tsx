
import React, { useState } from 'react';
import DefaultLayout from '@/layouts/DefaultLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Step, Stepper } from "@/components/ui/stepper";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, ArrowRight, Clock, FileSpreadsheet, Upload, Check, FileText, BrainCog, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

const EnergyImplementation = () => {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevStep) => Math.min(prevStep + 1, 4));
  };

  const handleBack = () => {
    setActiveStep((prevStep) => Math.max(prevStep - 1, 0));
  };

  return (
    <DefaultLayout>
      <div className="container mx-auto p-6">
        <Button variant="ghost" size="sm" asChild className="mb-6">
          <Link to="/dashboard/energia" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Volver al dashboard
          </Link>
        </Button>
        
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Implementación de Análisis - Energía</h1>
          <p className="text-muted-foreground">Proceso guiado para implementar análisis predictivo en sus operaciones energéticas</p>
        </div>
        
        <div className="mb-6">
          <Stepper activeStep={activeStep} className="mb-8">
            <Step
              title="Requisitos"
              description="Datos necesarios"
              icon={<FileText className="w-5 h-5" />}
            />
            <Step
              title="Plantilla"
              description="Formato de datos"
              icon={<FileSpreadsheet className="w-5 h-5" />}
            />
            <Step
              title="Carga"
              description="Subir información"
              icon={<Upload className="w-5 h-5" />}
            />
            <Step
              title="Procesamiento"
              description="Análisis de datos"
              icon={<BrainCog className="w-5 h-5" />}
            />
            <Step
              title="Resultados"
              description="Insights y recomendaciones"
              icon={<Check className="w-5 h-5" />}
            />
          </Stepper>

          <Card className="border-2 border-muted">
            <CardContent className="p-6">
              {activeStep === 0 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-semibold mb-4">Requisitos de datos</h2>
                    <p className="text-muted-foreground mb-6">
                      Para obtener el máximo valor del análisis predictivo energético, necesitamos los siguientes datos. 
                      La precisión de nuestros modelos depende directamente de la calidad y cantidad de los datos proporcionados.
                    </p>
                    
                    <div className="space-y-4">
                      <Card>
                        <CardHeader className="pb-2">
                          <div className="flex justify-between">
                            <CardTitle className="text-lg">Datos de generación</CardTitle>
                            <Badge variant="outline">Obligatorio</Badge>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <ul className="list-disc pl-5 space-y-1 text-sm">
                            <li>Capacidad instalada (MW)</li>
                            <li>Producción histórica por unidad (MWh)</li>
                            <li>Eficiencia de generación (%)</li>
                            <li>Tipo de generación (térmica, hidro, solar, eólica)</li>
                            <li>Parámetros técnicos de las unidades generadoras</li>
                          </ul>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardHeader className="pb-2">
                          <div className="flex justify-between">
                            <CardTitle className="text-lg">Datos operativos</CardTitle>
                            <Badge variant="outline">Obligatorio</Badge>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <ul className="list-disc pl-5 space-y-1 text-sm">
                            <li>Horas de funcionamiento</li>
                            <li>Registro de mantenimientos (preventivos y correctivos)</li>
                            <li>Incidencias y paradas no programadas</li>
                            <li>Consumo de combustible (si aplica)</li>
                          </ul>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardHeader className="pb-2">
                          <div className="flex justify-between">
                            <CardTitle className="text-lg">Datos de consumo</CardTitle>
                            <Badge variant="secondary">Recomendado</Badge>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <ul className="list-disc pl-5 space-y-1 text-sm">
                            <li>Perfiles de demanda (horarios, diarios, estacionales)</li>
                            <li>Consumo por categoría (industrial, residencial, etc.)</li>
                            <li>Picos de consumo y factores asociados</li>
                          </ul>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardHeader className="pb-2">
                          <div className="flex justify-between">
                            <CardTitle className="text-lg">Datos externos</CardTitle>
                            <Badge variant="secondary">Recomendado</Badge>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <ul className="list-disc pl-5 space-y-1 text-sm">
                            <li>Condiciones climáticas (temperatura, radiación solar, velocidad de viento)</li>
                            <li>Precios de mercado energético</li>
                            <li>Factores regulatorios relevantes</li>
                          </ul>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                  
                  <div className="flex justify-between">
                    <Button variant="outline" onClick={handleBack} disabled={activeStep === 0}>
                      Atrás
                    </Button>
                    <Button onClick={handleNext}>
                      Continuar <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
              
              {activeStep === 1 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-semibold mb-4">Plantilla de datos</h2>
                    <p className="text-muted-foreground mb-6">
                      Utilice nuestra plantilla estandarizada para proporcionar los datos necesarios. 
                      Hemos diseñado formatos específicos según el tipo de instalación energética.
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <Card className="bg-muted/30">
                        <CardHeader>
                          <CardTitle className="text-lg">Plantilla Excel</CardTitle>
                          <CardDescription>Formato estructurado para datos energéticos</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <img 
                            src="https://placehold.co/600x240" 
                            alt="Vista previa de plantilla Excel" 
                            className="rounded-md border" 
                          />
                          <div className="flex items-center text-sm text-muted-foreground">
                            <FileSpreadsheet className="h-4 w-4 mr-2" />
                            <span>energia_template.xlsx (48 KB)</span>
                          </div>
                        </CardContent>
                        <CardFooter>
                          <Button className="w-full">
                            Descargar plantilla
                          </Button>
                        </CardFooter>
                      </Card>
                      
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">Instrucciones</CardTitle>
                          <CardDescription>Pasos para completar la plantilla correctamente</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <ol className="list-decimal pl-5 space-y-2 text-sm">
                            <li>Descargue la plantilla correspondiente a su tipo de generación (térmica, hidro, renovables).</li>
                            <li>Complete las hojas en el orden indicado.</li>
                            <li>Para datos históricos, use resolución horaria cuando sea posible.</li>
                            <li>Asegúrese de incluir las unidades correctas según se indica.</li>
                            <li>Proporcione datos de al menos 12 meses para análisis estacionales.</li>
                            <li>Verifique la consistencia de las fechas y periodos temporales.</li>
                          </ol>
                        </CardContent>
                      </Card>
                    </div>
                    
                    <Card className="bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-900/50">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-blue-600"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
                          Importante
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-blue-900 dark:text-blue-300">
                          Para instalaciones con múltiples fuentes de generación, utilice la plantilla "Mix energético". 
                          Todos los datos serán tratados con confidencialidad según nuestra política de privacidad.
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <div className="flex justify-between">
                    <Button variant="outline" onClick={handleBack}>
                      Atrás
                    </Button>
                    <Button onClick={handleNext}>
                      Continuar <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
              
              {activeStep === 2 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-semibold mb-4">Carga de datos</h2>
                    <p className="text-muted-foreground mb-6">
                      Suba el archivo de Excel completado con sus datos energéticos para comenzar el análisis.
                    </p>
                    
                    <div className="space-y-6">
                      <Card className="border-2 border-dashed bg-muted/50">
                        <CardContent className="p-10 flex flex-col items-center justify-center">
                          <Upload className="h-10 w-10 text-muted-foreground mb-4" />
                          <h3 className="text-lg font-medium mb-1">Arrastre su archivo aquí</h3>
                          <p className="text-muted-foreground mb-4 text-center">o</p>
                          <Button>Seleccionar archivo</Button>
                          <p className="text-xs text-muted-foreground mt-4">
                            Formatos aceptados: XLS, XLSX, CSV. Tamaño máximo: 15MB
                          </p>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">Seguridad de datos</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div className="flex items-start gap-3">
                              <div className="rounded-full bg-green-100 dark:bg-green-900/50 p-1.5 mt-0.5">
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/></svg>
                              </div>
                              <div>
                                <h4 className="font-medium text-sm">Datos cifrados</h4>
                                <p className="text-sm text-muted-foreground">Sus datos se transfieren y almacenan con cifrado de extremo a extremo.</p>
                              </div>
                            </div>
                            
                            <div className="flex items-start gap-3">
                              <div className="rounded-full bg-green-100 dark:bg-green-900/50 p-1.5 mt-0.5">
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600"><circle cx="12" cy="12" r="10"/><path d="M5.3 5.3 12 12"/><path d="m12 12 6.7 6.7"/><path d="M12 7v5"/><path d="M7 12h5"/></svg>
                              </div>
                              <div>
                                <h4 className="font-medium text-sm">Privacidad garantizada</h4>
                                <p className="text-sm text-muted-foreground">Cumplimos con las regulaciones de protección de datos más estrictas.</p>
                              </div>
                            </div>
                            
                            <div className="flex items-start gap-3">
                              <div className="rounded-full bg-green-100 dark:bg-green-900/50 p-1.5 mt-0.5">
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/><path d="m9 12 2 2 4-4"/></svg>
                              </div>
                              <div>
                                <h4 className="font-medium text-sm">Certificaciones de seguridad</h4>
                                <p className="text-sm text-muted-foreground">Infraestructura certificada ISO 27001 y cumplimiento GDPR.</p>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                  
                  <div className="flex justify-between">
                    <Button variant="outline" onClick={handleBack}>
                      Atrás
                    </Button>
                    <Button onClick={handleNext}>
                      Iniciar procesamiento <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
              
              {activeStep === 3 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-semibold mb-4">Procesamiento y análisis</h2>
                    <p className="text-muted-foreground mb-6">
                      Nuestros algoritmos están procesando sus datos para generar modelos predictivos y optimizaciones.
                    </p>
                    
                    <div className="space-y-6">
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">Estado del procesamiento</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                          <div className="flex flex-col items-center py-6">
                            <div className="relative h-24 w-24 mb-4">
                              <div className="absolute inset-0 border-4 border-muted rounded-full"></div>
                              <div className="absolute inset-0 border-4 border-primary rounded-full border-t-transparent animate-spin"></div>
                              <div className="absolute inset-0 flex items-center justify-center">
                                <Clock className="h-8 w-8 text-primary" />
                              </div>
                            </div>
                            <h3 className="text-lg font-medium mb-1">Procesando datos</h3>
                            <p className="text-sm text-muted-foreground mb-3">Tiempo estimado: 25-30 minutos</p>
                            <div className="w-full max-w-md bg-muted rounded-full h-2.5">
                              <div className="bg-primary h-2.5 rounded-full animate-pulse" style={{ width: '45%' }}></div>
                            </div>
                            <p className="text-xs text-muted-foreground mt-2">45% completado</p>
                          </div>
                          
                          <div className="bg-muted/30 rounded-lg p-4">
                            <h4 className="font-medium mb-3">Pasos del proceso</h4>
                            <div className="space-y-3">
                              <div className="flex items-center">
                                <div className="flex-shrink-0 h-5 w-5 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                                  <Check className="h-3 w-3 text-green-600" />
                                </div>
                                <div className="ml-3">
                                  <p className="text-sm">Validación de datos</p>
                                </div>
                              </div>
                              <div className="flex items-center">
                                <div className="flex-shrink-0 h-5 w-5 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                                  <Check className="h-3 w-3 text-green-600" />
                                </div>
                                <div className="ml-3">
                                  <p className="text-sm">Normalización y preprocesamiento</p>
                                </div>
                              </div>
                              <div className="flex items-center">
                                <div className="flex-shrink-0 h-5 w-5 rounded-full bg-primary flex items-center justify-center animate-pulse">
                                  <span className="text-xs text-white">●</span>
                                </div>
                                <div className="ml-3">
                                  <p className="text-sm font-medium">Modelado de series temporales</p>
                                </div>
                              </div>
                              <div className="flex items-center opacity-50">
                                <div className="flex-shrink-0 h-5 w-5 rounded-full bg-muted border flex items-center justify-center">
                                  <span className="text-xs">4</span>
                                </div>
                                <div className="ml-3">
                                  <p className="text-sm">Optimización de parámetros</p>
                                </div>
                              </div>
                              <div className="flex items-center opacity-50">
                                <div className="flex-shrink-0 h-5 w-5 rounded-full bg-muted border flex items-center justify-center">
                                  <span className="text-xs">5</span>
                                </div>
                                <div className="ml-3">
                                  <p className="text-sm">Generación de escenarios y visualizaciones</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">Modelos aplicados</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            <div className="bg-muted/30 p-3 rounded-lg">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                  <BrainCog className="h-5 w-5 text-primary mr-2" />
                                  <h4 className="font-medium text-sm">ARIMA</h4>
                                </div>
                                <Badge variant="outline">Predicción de demanda</Badge>
                              </div>
                            </div>
                            <div className="bg-muted/30 p-3 rounded-lg">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                  <BrainCog className="h-5 w-5 text-primary mr-2" />
                                  <h4 className="font-medium text-sm">Regresión Polinómica</h4>
                                </div>
                                <Badge variant="outline">Modelado climático</Badge>
                              </div>
                            </div>
                            <div className="bg-muted/30 p-3 rounded-lg">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                  <BrainCog className="h-5 w-5 text-primary mr-2" />
                                  <h4 className="font-medium text-sm">Ridge Regression</h4>
                                </div>
                                <Badge variant="outline">Mantenimiento predictivo</Badge>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                  
                  <div className="flex justify-between">
                    <Button variant="outline" onClick={handleBack}>
                      Atrás
                    </Button>
                    <Button onClick={handleNext}>
                      Ver resultados <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
              
              {activeStep === 4 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-semibold mb-4">Resultados y recomendaciones</h2>
                    <p className="text-muted-foreground mb-6">
                      Hemos completado el análisis de sus datos energéticos y generado recomendaciones para optimizar su operación.
                    </p>
                    
                    <Tabs defaultValue="insights" className="mb-6">
                      <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="insights">Insights</TabsTrigger>
                        <TabsTrigger value="predictions">Predicciones</TabsTrigger>
                        <TabsTrigger value="recommendations">Optimización</TabsTrigger>
                      </TabsList>
                      <TabsContent value="insights" className="space-y-4 pt-4">
                        <Card>
                          <CardHeader>
                            <CardTitle className="text-lg">Análisis operativo</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-4">
                              <div className="p-3 bg-green-50 dark:bg-green-950/30 border border-green-100 dark:border-green-900/50 rounded-lg">
                                <h4 className="font-medium mb-1 flex items-center">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-green-600"><path d="M21.21 15.89A10 10 0 1 1 8 2.83"/><path d="M22 12A10 10 0 0 0 12 2v10z"/></svg>
                                  Hallazgo principal
                                </h4>
                                <p className="text-sm">
                                  Las variaciones de eficiencia muestran una correlación del 82% con los ciclos de mantenimiento.
                                </p>
                              </div>
                              
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="p-3 bg-muted/30 rounded-lg">
                                  <h4 className="font-medium mb-2">Patrones de eficiencia</h4>
                                  <p className="text-sm text-muted-foreground mb-2">
                                    El análisis identificó 3 periodos distintos de eficiencia:
                                  </p>
                                  <ul className="text-sm space-y-1">
                                    <li className="flex items-center">
                                      <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                                      <span>Periodo A: Eficiencia alta (>91%)</span>
                                    </li>
                                    <li className="flex items-center">
                                      <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                                      <span>Periodo B: Eficiencia media (86-91%)</span>
                                    </li>
                                    <li className="flex items-center">
                                      <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                                      <span>Periodo C: Eficiencia baja (<86%)</span>
                                    </li>
                                  </ul>
                                </div>
                                
                                <div className="p-3 bg-muted/30 rounded-lg">
                                  <h4 className="font-medium mb-2">Factores críticos</h4>
                                  <p className="text-sm text-muted-foreground mb-2">
                                    Principales factores que afectan la eficiencia:
                                  </p>
                                  <ul className="text-sm space-y-1">
                                    <li className="flex items-center">
                                      <Check className="h-4 w-4 text-primary mr-2" />
                                      <span>Ciclos de carga parcial (impacto del 34%)</span>
                                    </li>
                                    <li className="flex items-center">
                                      <Check className="h-4 w-4 text-primary mr-2" />
                                      <span>Variables ambientales (impacto del 28%)</span>
                                    </li>
                                    <li className="flex items-center">
                                      <Check className="h-4 w-4 text-primary mr-2" />
                                      <span>Tiempo desde último mantenimiento (impacto del 22%)</span>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </TabsContent>
                      
                      <TabsContent value="predictions" className="space-y-4 pt-4">
                        <Card>
                          <CardHeader>
                            <CardTitle className="text-lg">Predicciones de demanda y generación</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-4">
                              <div className="p-4 bg-muted/30 rounded-lg">
                                <div className="flex items-center justify-between mb-2">
                                  <h4 className="font-medium">Demanda proyectada (próximo trimestre)</h4>
                                  <Badge>Confianza: 91%</Badge>
                                </div>
                                <div className="text-3xl font-bold mb-2 flex items-baseline">
                                  254.6 <span className="text-base font-normal text-muted-foreground ml-1">GWh</span>
                                </div>
                                <p className="text-sm text-muted-foreground">
                                  Incremento del 8.3% respecto al trimestre anterior
                                </p>
                              </div>
                              
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="p-3 bg-muted/30 rounded-lg">
                                  <h4 className="font-medium mb-2">Factores estacionales</h4>
                                  <p className="text-sm text-muted-foreground mb-2">
                                    Previsiones para el próximo periodo:
                                  </p>
                                  <ul className="text-sm space-y-2">
                                    <li className="flex items-start">
                                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 mt-0.5 text-blue-500"><path d="M12 9a4 4 0 1 0 0 8 4 4 0 0 0 0-8z"/><path d="M12 3v2"/><path d="M12 19v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M3 12h2"/><path d="M19 12h2"/><path d="m4.93 19.07 1.41-1.41"/><path d="m17.66 6.34 1.41-1.41"/></svg>
                                      <span>Picos de demanda en horas punta un 12% superiores al promedio anual</span>
                                    </li>
                                    <li className="flex items-start">
                                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 mt-0.5 text-orange-500"><path d="M9 18h6"/><path d="M10 22h4"/><path d="m12 6 4 4"/><path d="m8 10 4-4"/><path d="M3 14h3"/><path d="M21 14h-3"/><path d="m6 18 3.5-6"/><path d="M11 18h.01"/><path d="m18 18-3.5-6"/><path d="m2 14 10-10 10 10Z"/></svg>
                                      <span>Generación renovable proyectada: incremento del 15% (solar) y 7% (eólica)</span>
                                    </li>
                                    <li className="flex items-start">
                                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 mt-0.5 text-red-500"><path d="m8 2 4 10 4-10"/><path d="M12 12v6"/><path d="M4 22h16"/></svg>
                                      <span>Reducción esperada de costos operativos del 9% con las optimizaciones propuestas</span>
                                    </li>
                                  </ul>
                                </div>
                                
                                <div className="p-3 bg-muted/30 rounded-lg">
                                  <h4 className="font-medium mb-2">Predicción de riesgos</h4>
                                  <p className="text-sm text-muted-foreground mb-2">
                                    Posibles riesgos identificados:
                                  </p>
                                  <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                      <div className="flex items-center">
                                        <Badge variant="outline" className="bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300">Alto</Badge>
                                        <span className="text-sm ml-2">Fallo en turbina #4</span>
                                      </div>
                                      <span className="text-sm">72%</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                      <div className="flex items-center">
                                        <Badge variant="outline" className="bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-300">Medio</Badge>
                                        <span className="text-sm ml-2">Insuficiencia en horas pico</span>
                                      </div>
                                      <span className="text-sm">48%</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                      <div className="flex items-center">
                                        <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300">Bajo</Badge>
                                        <span className="text-sm ml-2">Problemas de suministro</span>
                                      </div>
                                      <span className="text-sm">18%</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </TabsContent>
                      
                      <TabsContent value="recommendations" className="space-y-4 pt-4">
                        <Card>
                          <CardHeader>
                            <CardTitle className="text-lg">Recomendaciones de optimización</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-4">
                              <div className="p-3 bg-green-50 dark:bg-green-950/30 border border-green-100 dark:border-green-900/50 rounded-lg">
                                <h4 className="font-medium mb-1">Potencial de mejora</h4>
                                <p className="text-sm">
                                  Implementando estas recomendaciones, la eficiencia operativa podría aumentar hasta un <span className="font-semibold">14.8%</span> y reducir costos un <span className="font-semibold">17.2%</span>.
                                </p>
                              </div>
                              
                              <div className="space-y-4">
                                <div className="p-3 bg-muted/30 rounded-lg">
                                  <h4 className="font-medium mb-2 flex items-center">
                                    <Zap className="h-4 w-4 mr-2 text-primary" />
                                    Optimización operativa
                                  </h4>
                                  <ul className="text-sm space-y-2">
                                    <li className="flex items-start">
                                      <Check className="h-4 w-4 text-primary mr-2 mt-0.5" />
                                      <span>Redistribuir carga entre unidades generadoras según perfil de eficiencia</span>
                                    </li>
                                    <li className="flex items-start">
                                      <Check className="h-4 w-4 text-primary mr-2 mt-0.5" />
                                      <span>Adelantar mantenimiento preventivo de turbina #4 (urgente)</span>
                                    </li>
                                    <li className="flex items-start">
                                      <Check className="h-4 w-4 text-primary mr-2 mt-0.5" />
                                      <span>Optimizar arranques y paradas para minimizar desgaste</span>
                                    </li>
                                  </ul>
                                </div>
                                
                                <div className="p-3 bg-muted/30 rounded-lg">
                                  <h4 className="font-medium mb-2 flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-blue-500"><path d="M3 12a9 9 0 1 0 18 0 9 9 0 0 0-18 0Z"/><path d="m12 8-2.2 2.2c-.2.2-.3.4-.3.8 0 .4.1.6.3.8.2.2.5.4.8.4.3 0 .6-.1.8-.4l.2-.2c.2-.2.3-.4.3-.8 0-.4.1-.6.3-.8.2-.2.5-.4.8-.4.3 0 .6.1.8.4.2.2.3.4.3.8 0 .4-.1.6-.3.8L12 16"/></svg>
                                    Gestión económica
                                  </h4>
                                  <ul className="text-sm space-y-2">
                                    <li className="flex items-start">
                                      <Check className="h-4 w-4 text-primary mr-2 mt-0.5" />
                                      <span>Implementar compra/venta inteligente según análisis de precios de mercado</span>
                                    </li>
                                    <li className="flex items-start">
                                      <Check className="h-4 w-4 text-primary mr-2 mt-0.5" />
                                      <span>Ajustar contratos de suministro según nueva curva de demanda</span>
                                    </li>
                                    <li className="flex items-start">
                                      <Check className="h-4 w-4 text-primary mr-2 mt-0.5" />
                                      <span>Evaluar viabilidad de almacenamiento energético para arbitraje de precios</span>
                                    </li>
                                  </ul>
                                </div>
                                
                                <div className="p-3 bg-muted/30 rounded-lg">
                                  <h4 className="font-medium mb-2 flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-green-500"><path d="M21 12a9 9 0 0 1-9 9m9-9a9 9 0 0 0-9-9m9 9H3m9 9a9 9 0 0 1-9-9m9 9c-4.97 0-9-4.03-9-9m9-9a9 9 0 0 0-9 9m9-9v18"/></svg>
                                    Sostenibilidad
                                  </h4>
                                  <ul className="text-sm space-y-2">
                                    <li className="flex items-start">
                                      <Check className="h-4 w-4 text-primary mr-2 mt-0.5" />
                                      <span>Incrementar generación renovable en un 22% en próximos 12 meses</span>
                                    </li>
                                    <li className="flex items-start">
                                      <Check className="h-4 w-4 text-primary mr-2 mt-0.5" />
                                      <span>Instalar sistema de monitorización de emisiones en tiempo real</span>
                                    </li>
                                    <li className="flex items-start">
                                      <Check className="h-4 w-4 text-primary mr-2 mt-0.5" />
                                      <span>Implementar programa de compensación de carbono para emisiones residuales</span>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </TabsContent>
                    </Tabs>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">Impacto económico</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div className="flex justify-between items-baseline">
                              <div>
                                <h4 className="font-medium">Ahorro estimado anual</h4>
                                <p className="text-muted-foreground text-sm">Con implementación completa</p>
                              </div>
                              <div className="text-3xl font-bold text-green-600">€238,500</div>
                            </div>
                            
                            <Separator />
                            
                            <div className="space-y-2">
                              <div className="flex justify-between text-sm">
                                <span>Optimización operativa</span>
                                <span>€92,300</span>
                              </div>
                              <div className="flex justify-between text-sm">
                                <span>Mantenimiento predictivo</span>
                                <span>€76,800</span>
                              </div>
                              <div className="flex justify-between text-sm">
                                <span>Gestión de picos de demanda</span>
                                <span>€45,200</span>
                              </div>
                              <div className="flex justify-between text-sm">
                                <span>Arbitraje de mercado</span>
                                <span>€24,200</span>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">Próximos pasos</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="space-y-2">
                            <p className="text-sm">Para implementar estas optimizaciones y obtener asistencia personalizada:</p>
                            <ul className="text-sm space-y-2">
                              <li className="flex items-start">
                                <div className="flex-shrink-0 h-5 w-5 rounded-full bg-primary flex items-center justify-center text-white">
                                  <span className="text-xs">1</span>
                                </div>
                                <span className="ml-3">Descargue el informe detallado con análisis técnico completo</span>
                              </li>
                              <li className="flex items-start">
                                <div className="flex-shrink-0 h-5 w-5 rounded-full bg-primary flex items-center justify-center text-white">
                                  <span className="text-xs">2</span>
                                </div>
                                <span className="ml-3">Solicite una consulta con nuestros especialistas en energía</span>
                              </li>
                              <li className="flex items-start">
                                <div className="flex-shrink-0 h-5 w-5 rounded-full bg-primary flex items-center justify-center text-white">
                                  <span className="text-xs">3</span>
                                </div>
                                <span className="ml-3">Desarrolle un plan de implementación priorizado según impacto</span>
                              </li>
                            </ul>
                          </div>
                          
                          <div className="flex space-x-3">
                            <Button className="flex-1">
                              Descargar informe
                            </Button>
                            <Button variant="outline" className="flex-1" asChild>
                              <Link to="/contact/energia">
                                Solicitar consulta
                              </Link>
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                  
                  <div className="flex justify-between">
                    <Button variant="outline" onClick={handleBack}>
                      Atrás
                    </Button>
                    <Button asChild>
                      <Link to="/dashboard/energia">
                        Ir al dashboard <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default EnergyImplementation;
