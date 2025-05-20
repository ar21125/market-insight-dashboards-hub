
import React, { useState } from 'react';
import DefaultLayout from '@/layouts/DefaultLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Step, Stepper } from "@/components/ui/stepper";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, ArrowRight, Clock, FileSpreadsheet, Upload, Check, FileText, BrainCog } from 'lucide-react';
import { Link } from 'react-router-dom';

const AgricultureImplementation = () => {
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
          <Link to="/dashboard/agricultura" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Volver al dashboard
          </Link>
        </Button>
        
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Implementación de Análisis - Agricultura</h1>
          <p className="text-muted-foreground">Proceso guiado para implementar análisis predictivo en su operación agrícola</p>
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
                      Para obtener el máximo valor del análisis predictivo agrícola, necesitamos los siguientes datos. 
                      Cuantos más datos proporcione, más precisos serán los resultados.
                    </p>
                    
                    <div className="space-y-4">
                      <Card>
                        <CardHeader className="pb-2">
                          <div className="flex justify-between">
                            <CardTitle className="text-lg">Datos de parcela</CardTitle>
                            <Badge variant="outline">Obligatorio</Badge>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <ul className="list-disc pl-5 space-y-1 text-sm">
                            <li>Ubicación geográfica (coordenadas GPS)</li>
                            <li>Superficie (hectáreas)</li>
                            <li>Tipo de suelo</li>
                            <li>Cultivos anteriores (últimos 3 años)</li>
                            <li>Rendimientos históricos (kg/ha)</li>
                          </ul>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardHeader className="pb-2">
                          <div className="flex justify-between">
                            <CardTitle className="text-lg">Datos de cultivo</CardTitle>
                            <Badge variant="outline">Obligatorio</Badge>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <ul className="list-disc pl-5 space-y-1 text-sm">
                            <li>Tipo de cultivo y variedad</li>
                            <li>Fecha de siembra/plantación</li>
                            <li>Densidad de siembra</li>
                            <li>Prácticas de manejo (labranza, rotación)</li>
                          </ul>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardHeader className="pb-2">
                          <div className="flex justify-between">
                            <CardTitle className="text-lg">Datos de insumos</CardTitle>
                            <Badge variant="secondary">Recomendado</Badge>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <ul className="list-disc pl-5 space-y-1 text-sm">
                            <li>Aplicación de fertilizantes (tipo, dosis, fechas)</li>
                            <li>Aplicación de fitosanitarios (tipo, dosis, fechas)</li>
                            <li>Riego (cantidad, frecuencia, sistema)</li>
                          </ul>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardHeader className="pb-2">
                          <div className="flex justify-between">
                            <CardTitle className="text-lg">Datos ambientales</CardTitle>
                            <Badge variant="secondary">Recomendado</Badge>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <ul className="list-disc pl-5 space-y-1 text-sm">
                            <li>Registros meteorológicos (temperatura, precipitación)</li>
                            <li>Humedad del suelo (si se dispone)</li>
                            <li>Incidencia de plagas y enfermedades</li>
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
                      La plantilla está diseñada para facilitar el procesamiento y análisis mediante nuestros modelos.
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <Card className="bg-muted/30">
                        <CardHeader>
                          <CardTitle className="text-lg">Plantilla Excel</CardTitle>
                          <CardDescription>Formato estructurado para datos agrícolas</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <img 
                            src="https://placehold.co/600x240" 
                            alt="Vista previa de plantilla Excel" 
                            className="rounded-md border" 
                          />
                          <div className="flex items-center text-sm text-muted-foreground">
                            <FileSpreadsheet className="h-4 w-4 mr-2" />
                            <span>agricultura_template.xlsx (42 KB)</span>
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
                            <li>Descargue la plantilla Excel.</li>
                            <li>Complete las pestañas en el orden indicado.</li>
                            <li>No modifique los encabezados ni el formato de las celdas.</li>
                            <li>Utilice los menús desplegables donde estén disponibles.</li>
                            <li>Complete todos los campos marcados como obligatorios.</li>
                            <li>Guarde el archivo manteniendo el formato Excel.</li>
                            <li>Verifique que no haya errores antes de subir el archivo.</li>
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
                          Los datos proporcionados serán procesados según nuestra política de privacidad y utilizados únicamente para el análisis solicitado. 
                          Si tiene datos de múltiples parcelas, utilice un archivo por parcela o siga las instrucciones para multicultivo.
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
                      Suba el archivo de Excel completado con sus datos agrícolas para comenzar el análisis.
                    </p>
                    
                    <div className="space-y-6">
                      <Card className="border-2 border-dashed bg-muted/50">
                        <CardContent className="p-10 flex flex-col items-center justify-center">
                          <Upload className="h-10 w-10 text-muted-foreground mb-4" />
                          <h3 className="text-lg font-medium mb-1">Arrastre su archivo aquí</h3>
                          <p className="text-muted-foreground mb-4 text-center">o</p>
                          <Button>Seleccionar archivo</Button>
                          <p className="text-xs text-muted-foreground mt-4">
                            Formatos aceptados: XLS, XLSX, CSV. Tamaño máximo: 10MB
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
                                <p className="text-sm text-muted-foreground">No compartimos sus datos con terceros ni los utilizamos para otros fines.</p>
                              </div>
                            </div>
                            
                            <div className="flex items-start gap-3">
                              <div className="rounded-full bg-green-100 dark:bg-green-900/50 p-1.5 mt-0.5">
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/><path d="m9 12 2 2 4-4"/></svg>
                              </div>
                              <div>
                                <h4 className="font-medium text-sm">Infraestructura segura</h4>
                                <p className="text-sm text-muted-foreground">Nuestros sistemas cumplen con los estándares de seguridad más exigentes.</p>
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
                      Nuestros algoritmos están analizando sus datos para generar predicciones y recomendaciones precisas.
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
                            <p className="text-sm text-muted-foreground mb-3">Tiempo estimado: 15-20 minutos</p>
                            <div className="w-full max-w-md bg-muted rounded-full h-2.5">
                              <div className="bg-primary h-2.5 rounded-full animate-pulse" style={{ width: '65%' }}></div>
                            </div>
                            <p className="text-xs text-muted-foreground mt-2">65% completado</p>
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
                                  <p className="text-sm">Preprocesamiento y limpieza</p>
                                </div>
                              </div>
                              <div className="flex items-center">
                                <div className="flex-shrink-0 h-5 w-5 rounded-full bg-primary flex items-center justify-center animate-pulse">
                                  <span className="text-xs text-white">●</span>
                                </div>
                                <div className="ml-3">
                                  <p className="text-sm font-medium">Análisis predictivo en curso</p>
                                </div>
                              </div>
                              <div className="flex items-center opacity-50">
                                <div className="flex-shrink-0 h-5 w-5 rounded-full bg-muted border flex items-center justify-center">
                                  <span className="text-xs">4</span>
                                </div>
                                <div className="ml-3">
                                  <p className="text-sm">Generación de recomendaciones</p>
                                </div>
                              </div>
                              <div className="flex items-center opacity-50">
                                <div className="flex-shrink-0 h-5 w-5 rounded-full bg-muted border flex items-center justify-center">
                                  <span className="text-xs">5</span>
                                </div>
                                <div className="ml-3">
                                  <p className="text-sm">Creación de visualizaciones</p>
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
                                  <h4 className="font-medium text-sm">Random Forest</h4>
                                </div>
                                <Badge variant="outline">Predicción de rendimiento</Badge>
                              </div>
                            </div>
                            <div className="bg-muted/30 p-3 rounded-lg">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                  <BrainCog className="h-5 w-5 text-primary mr-2" />
                                  <h4 className="font-medium text-sm">K-Means Clustering</h4>
                                </div>
                                <Badge variant="outline">Zonificación de terreno</Badge>
                              </div>
                            </div>
                            <div className="bg-muted/30 p-3 rounded-lg">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                  <BrainCog className="h-5 w-5 text-primary mr-2" />
                                  <h4 className="font-medium text-sm">ARIMA</h4>
                                </div>
                                <Badge variant="outline">Previsión meteorológica</Badge>
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
                      Hemos generado insights y recomendaciones personalizadas basadas en sus datos. 
                      A continuación presentamos un resumen de los resultados del análisis.
                    </p>
                    
                    <Tabs defaultValue="insights" className="mb-6">
                      <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="insights">Insights</TabsTrigger>
                        <TabsTrigger value="predictions">Predicciones</TabsTrigger>
                        <TabsTrigger value="recommendations">Recomendaciones</TabsTrigger>
                      </TabsList>
                      <TabsContent value="insights" className="space-y-4 pt-4">
                        <Card>
                          <CardHeader>
                            <CardTitle className="text-lg">Análisis de suelo y producción</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-4">
                              <div className="p-3 bg-green-50 dark:bg-green-950/30 border border-green-100 dark:border-green-900/50 rounded-lg">
                                <h4 className="font-medium mb-1 flex items-center">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-green-600"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 10v4"/><path d="M12 18h.01"/></svg>
                                  Hallazgo principal
                                </h4>
                                <p className="text-sm">
                                  Se identificó una correlación del 78% entre el nivel de materia orgánica en suelo y el rendimiento final del cultivo.
                                </p>
                              </div>
                              
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="p-3 bg-muted/30 rounded-lg">
                                  <h4 className="font-medium mb-2">Zonas de rendimiento</h4>
                                  <p className="text-sm text-muted-foreground mb-2">
                                    El análisis identificó 3 zonas distintas de rendimiento en su terreno:
                                  </p>
                                  <ul className="text-sm space-y-1">
                                    <li className="flex items-center">
                                      <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                                      <span>Zona A: Rendimiento alto (>6.2 ton/ha)</span>
                                    </li>
                                    <li className="flex items-center">
                                      <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                                      <span>Zona B: Rendimiento medio (4.8-6.2 ton/ha)</span>
                                    </li>
                                    <li className="flex items-center">
                                      <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                                      <span>Zona C: Rendimiento bajo (<4.8 ton/ha)</span>
                                    </li>
                                  </ul>
                                </div>
                                
                                <div className="p-3 bg-muted/30 rounded-lg">
                                  <h4 className="font-medium mb-2">Factores limitantes</h4>
                                  <p className="text-sm text-muted-foreground mb-2">
                                    Principales factores que limitan el rendimiento:
                                  </p>
                                  <ul className="text-sm space-y-1">
                                    <li className="flex items-center">
                                      <Check className="h-4 w-4 text-primary mr-2" />
                                      <span>Déficit de potasio en zona C</span>
                                    </li>
                                    <li className="flex items-center">
                                      <Check className="h-4 w-4 text-primary mr-2" />
                                      <span>Compactación de suelo en zona B</span>
                                    </li>
                                    <li className="flex items-center">
                                      <Check className="h-4 w-4 text-primary mr-2" />
                                      <span>Drenaje insuficiente en temporada lluviosa</span>
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
                            <CardTitle className="text-lg">Predicciones de rendimiento</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-4">
                              <div className="p-4 bg-muted/30 rounded-lg">
                                <div className="flex items-center justify-between mb-2">
                                  <h4 className="font-medium">Rendimiento proyectado</h4>
                                  <Badge>Confianza: 92%</Badge>
                                </div>
                                <div className="text-3xl font-bold mb-2 flex items-baseline">
                                  5.4 <span className="text-base font-normal text-muted-foreground ml-1">ton/ha</span>
                                </div>
                                <p className="text-sm text-muted-foreground">
                                  Incremento del 14% respecto al ciclo anterior
                                </p>
                              </div>
                              
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="p-3 bg-muted/30 rounded-lg">
                                  <h4 className="font-medium mb-2">Factores climáticos</h4>
                                  <p className="text-sm text-muted-foreground mb-2">
                                    Previsión para la temporada de cultivo:
                                  </p>
                                  <ul className="text-sm space-y-2">
                                    <li className="flex items-start">
                                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 mt-0.5 text-blue-500"><path d="M8 16a5 5 0 0 1 10 0"/><line x1="8" y1="16" x2="8" y2="16"/><line x1="16" y1="16" x2="16" y2="16"/><path d="M12.5 5a.5.5 0 1 0-1 0 .5.5 0 0 0 1 0Z"/><path d="M5 12a7 7 0 0 1 14 0"/></svg>
                                      <span>Precipitación proyectada: 320mm (5% sobre la media)</span>
                                    </li>
                                    <li className="flex items-start">
                                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 mt-0.5 text-orange-500"><path d="M12 9a4 4 0 1 0 0 8 4 4 0 0 0 0-8z"/><path d="M12 3v2"/><path d="M12 19v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M3 12h2"/><path d="M19 12h2"/><path d="m4.93 19.07 1.41-1.41"/><path d="m17.66 6.34 1.41-1.41"/></svg>
                                      <span>Temperatura media: 22.3°C (0.8°C sobre la media)</span>
                                    </li>
                                    <li className="flex items-start">
                                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 mt-0.5 text-red-500"><path d="M15 12.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"/><path d="M12 4v1.5"/><path d="M5 10h1.5"/><path d="M12 19v-1.5"/><path d="M19 10h-1.5"/><path d="m6.4 6.4.7.7"/><path d="m17.6 17.6-.7-.7"/><path d="m6.4 17.6.7-.7"/><path d="m17.6 6.4-.7.7"/></svg>
                                      <span>Radiación solar: Favorable para el desarrollo del cultivo</span>
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
                                        <span className="text-sm ml-2">Estrés hídrico en Zona C</span>
                                      </div>
                                      <span className="text-sm">68%</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                      <div className="flex items-center">
                                        <Badge variant="outline" className="bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-300">Medio</Badge>
                                        <span className="text-sm ml-2">Roya en cultivo</span>
                                      </div>
                                      <span className="text-sm">42%</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                      <div className="flex items-center">
                                        <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300">Bajo</Badge>
                                        <span className="text-sm ml-2">Deficiencia nutricional</span>
                                      </div>
                                      <span className="text-sm">15%</span>
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
                            <CardTitle className="text-lg">Recomendaciones de manejo</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-4">
                              <div className="p-3 bg-green-50 dark:bg-green-950/30 border border-green-100 dark:border-green-900/50 rounded-lg">
                                <h4 className="font-medium mb-1">Potencial de mejora</h4>
                                <p className="text-sm">
                                  Implementando estas recomendaciones, el rendimiento podría aumentar hasta un <span className="font-semibold">23%</span> en el próximo ciclo.
                                </p>
                              </div>
                              
                              <div className="space-y-4">
                                <div className="p-3 bg-muted/30 rounded-lg">
                                  <h4 className="font-medium mb-2 flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-primary"><path d="M12 22s8-4 8-10V7l-8-5-8 5v5c0 6 8 10 8 10"/><path d="M8 14a4 4 0 0 0 8 0"/></svg>
                                    Fertilización
                                  </h4>
                                  <ul className="text-sm space-y-2">
                                    <li className="flex items-start">
                                      <Check className="h-4 w-4 text-primary mr-2 mt-0.5" />
                                      <span>Aplicar 180-80-120 kg/ha de N-P-K en Zona A</span>
                                    </li>
                                    <li className="flex items-start">
                                      <Check className="h-4 w-4 text-primary mr-2 mt-0.5" />
                                      <span>Incrementar potasio a 150 kg/ha en Zona C</span>
                                    </li>
                                    <li className="flex items-start">
                                      <Check className="h-4 w-4 text-primary mr-2 mt-0.5" />
                                      <span>Fraccionar nitrógeno en 3 aplicaciones</span>
                                    </li>
                                  </ul>
                                </div>
                                
                                <div className="p-3 bg-muted/30 rounded-lg">
                                  <h4 className="font-medium mb-2 flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-blue-500"><path d="M20 10c0-4.4-3.6-8-8-8s-8 3.6-8 8 3.6 8 8 8h8"/><path d="M18 16v.4A1.6 1.6 0 0 1 16.4 18"/><path d="M18 20v.4A1.6 1.6 0 0 1 16.4 22"/><path d="M18 24v.4A1.6 1.6 0 0 1 16.4 26"/></svg>
                                    Riego
                                  </h4>
                                  <ul className="text-sm space-y-2">
                                    <li className="flex items-start">
                                      <Check className="h-4 w-4 text-primary mr-2 mt-0.5" />
                                      <span>Implementar sistema de riego por goteo en Zona C</span>
                                    </li>
                                    <li className="flex items-start">
                                      <Check className="h-4 w-4 text-primary mr-2 mt-0.5" />
                                      <span>Mantener humedad del suelo al 70-80% de capacidad de campo</span>
                                    </li>
                                    <li className="flex items-start">
                                      <Check className="h-4 w-4 text-primary mr-2 mt-0.5" />
                                      <span>Instalar sensores de humedad en 3 puntos estratégicos</span>
                                    </li>
                                  </ul>
                                </div>
                                
                                <div className="p-3 bg-muted/30 rounded-lg">
                                  <h4 className="font-medium mb-2 flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-green-500"><path d="M2 22c1.25-.987 2.27-1.975 3.9-2.2a5.56 5.56 0 0 1 3.8 1.5 6.9 6.9 0 0 0 4.6 2 5.56 5.56 0 0 0 3.8-1.5c1.63-.225 2.65.213 3.9 1.2"/><path d="M2 17c1.25-.987 2.27-1.975 3.9-2.2a5.56 5.56 0 0 1 3.8 1.5 6.9 6.9 0 0 0 4.6 2 5.56 5.56 0 0 0 3.8-1.5c1.63-.225 2.65.213 3.9 1.2"/><path d="M2 12c1.25-.987 2.27-1.975 3.9-2.2a5.56 5.56 0 0 1 3.8 1.5 6.9 6.9 0 0 0 4.6 2 5.56 5.56 0 0 0 3.8-1.5c1.63-.225 2.65.213 3.9 1.2"/><path d="M2 7c1.25-.987 2.27-1.975 3.9-2.2a5.56 5.56 0 0 1 3.8 1.5 6.9 6.9 0 0 0 4.6 2 5.56 5.56 0 0 0 3.8-1.5c1.63-.225 2.65.213 3.9 1.2"/></svg>
                                    Manejo de suelo
                                  </h4>
                                  <ul className="text-sm space-y-2">
                                    <li className="flex items-start">
                                      <Check className="h-4 w-4 text-primary mr-2 mt-0.5" />
                                      <span>Subsolado en Zona B para reducir compactación</span>
                                    </li>
                                    <li className="flex items-start">
                                      <Check className="h-4 w-4 text-primary mr-2 mt-0.5" />
                                      <span>Incorporar 5 ton/ha de compost en Zona C</span>
                                    </li>
                                    <li className="flex items-start">
                                      <Check className="h-4 w-4 text-primary mr-2 mt-0.5" />
                                      <span>Cultivos de cobertura en periodos de descanso</span>
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
                          <CardTitle className="text-lg">Retorno de inversión</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div className="flex justify-between items-baseline">
                              <div>
                                <h4 className="font-medium">ROI estimado</h4>
                                <p className="text-muted-foreground text-sm">Con implementación completa</p>
                              </div>
                              <div className="text-3xl font-bold text-green-600">312%</div>
                            </div>
                            
                            <Separator />
                            
                            <div className="space-y-2">
                              <div className="flex justify-between text-sm">
                                <span>Costo de implementación</span>
                                <span>$58,500</span>
                              </div>
                              <div className="flex justify-between text-sm">
                                <span>Incremento en rendimiento</span>
                                <span>+1.24 ton/ha</span>
                              </div>
                              <div className="flex justify-between text-sm">
                                <span>Beneficio económico proyectado</span>
                                <span className="font-medium">$182,500</span>
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
                            <p className="text-sm">Para recibir un análisis detallado y asistencia en la implementación:</p>
                            <ul className="text-sm space-y-2">
                              <li className="flex items-start">
                                <div className="flex-shrink-0 h-5 w-5 rounded-full bg-primary flex items-center justify-center text-white">
                                  <span className="text-xs">1</span>
                                </div>
                                <span className="ml-3">Descargue el informe completo</span>
                              </li>
                              <li className="flex items-start">
                                <div className="flex-shrink-0 h-5 w-5 rounded-full bg-primary flex items-center justify-center text-white">
                                  <span className="text-xs">2</span>
                                </div>
                                <span className="ml-3">Programe una consulta con nuestro equipo técnico</span>
                              </li>
                              <li className="flex items-start">
                                <div className="flex-shrink-0 h-5 w-5 rounded-full bg-primary flex items-center justify-center text-white">
                                  <span className="text-xs">3</span>
                                </div>
                                <span className="ml-3">Desarrolle un plan de implementación personalizado</span>
                              </li>
                            </ul>
                          </div>
                          
                          <div className="flex space-x-3">
                            <Button className="flex-1">
                              Descargar informe
                            </Button>
                            <Button variant="outline" className="flex-1" asChild>
                              <Link to="/contact/agricultura">
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
                      <Link to="/dashboard/agricultura">
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

export default AgricultureImplementation;
