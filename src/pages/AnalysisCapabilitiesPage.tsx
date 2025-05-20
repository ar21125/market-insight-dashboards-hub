
import React, { useState } from 'react';
import DefaultLayout from '@/layouts/DefaultLayout';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Sparkles, ChevronRight, ArrowRight, Check, AlertCircle, BarChart, Brain, Search, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';
import PersonalizedSolutionForm from '@/components/PersonalizedSolutionForm';
import ROICalculator from '@/components/ROICalculator';

const AnalysisCapabilitiesPage = () => {
  const [showMoreSolutions, setShowMoreSolutions] = useState(false);
  const [showDemoForm, setShowDemoForm] = useState(false);

  return (
    <DefaultLayout>
      <div className="container mx-auto p-4 pb-16">
        {/* Hero Section */}
        <div className="py-8 md:py-12">
          <div className="mx-auto max-w-4xl text-center">
            <Badge className="mb-4" variant="outline">
              Tecnología Avanzada de Análisis
            </Badge>
            <h1 className="text-3xl md:text-5xl font-bold mb-6">
              Descubre el poder de los datos para tu negocio
            </h1>
            <p className="text-muted-foreground mb-8 text-lg">
              Nuestras capacidades analíticas avanzadas transforman datos en conocimientos accionables, 
              impulsando decisiones estratégicas y resultados medibles.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button size="lg" asChild>
                <Link to="/ai-models">
                  Explorar Modelos de IA
                </Link>
              </Button>
              <ROICalculator trigger={
                <Button variant="outline" size="lg">
                  Calcular ROI Potencial
                </Button>
              } />
            </div>
          </div>
        </div>

        {/* Main Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 my-12">
          <Card>
            <CardHeader>
              <div className="bg-primary/10 w-12 h-12 flex items-center justify-center rounded-full mb-4">
                <BarChart className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Análisis Predictivo</CardTitle>
              <CardDescription>
                Anticipe tendencias y comportamientos futuros con nuestros modelos predictivos avanzados.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-start gap-3">
                <div className="mt-1">
                  <Check className="h-5 w-5 text-green-500" />
                </div>
                <p>Modelos de series temporales para pronósticos precisos</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="mt-1">
                  <Check className="h-5 w-5 text-green-500" />
                </div>
                <p>Identificación de patrones y estacionalidades</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="mt-1">
                  <Check className="h-5 w-5 text-green-500" />
                </div>
                <p>Algoritmos de aprendizaje automático para múltiples escenarios</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <div className="bg-primary/10 w-12 h-12 flex items-center justify-center rounded-full mb-4">
                <Brain className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Segmentación Avanzada</CardTitle>
              <CardDescription>
                Descubra grupos naturales en sus datos para estrategias personalizadas.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-start gap-3">
                <div className="mt-1">
                  <Check className="h-5 w-5 text-green-500" />
                </div>
                <p>Técnicas de clustering para segmentación de clientes</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="mt-1">
                  <Check className="h-5 w-5 text-green-500" />
                </div>
                <p>Perfilado automático de segmentos</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="mt-1">
                  <Check className="h-5 w-5 text-green-500" />
                </div>
                <p>Visualización interactiva de grupos y comportamientos</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <div className="bg-primary/10 w-12 h-12 flex items-center justify-center rounded-full mb-4">
                <Search className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Detección de Anomalías</CardTitle>
              <CardDescription>
                Identifique valores atípicos y comportamientos inusuales en tiempo real.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-start gap-3">
                <div className="mt-1">
                  <Check className="h-5 w-5 text-green-500" />
                </div>
                <p>Algoritmos de detección en tiempo real</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="mt-1">
                  <Check className="h-5 w-5 text-green-500" />
                </div>
                <p>Análisis de causas raíz automatizado</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="mt-1">
                  <Check className="h-5 w-5 text-green-500" />
                </div>
                <p>Alertas configurables y monitoreo continuo</p>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Industry Specific Solutions */}
        <div className="py-8 my-12">
          <div className="text-center mb-10">
            <Badge className="mb-2">Soluciones Específicas</Badge>
            <h2 className="text-3xl font-bold mb-4">
              Capacidades analíticas por industria
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Nuestras soluciones están adaptadas a las necesidades específicas de cada sector, 
              ofreciendo análisis relevantes y accionables.
            </p>
          </div>
          
          <Tabs defaultValue="retail" className="w-full">
            <div className="flex justify-center mb-6">
              <TabsList>
                <TabsTrigger value="retail">Retail</TabsTrigger>
                <TabsTrigger value="finance">Finanzas</TabsTrigger>
                <TabsTrigger value="agriculture">Agricultura</TabsTrigger>
                <TabsTrigger value="energy">Energía</TabsTrigger>
                <TabsTrigger value="health">Salud</TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="retail" className="animate-in fade-in-50">
              <Card>
                <CardHeader>
                  <CardTitle>Soluciones para Retail</CardTitle>
                  <CardDescription>Optimice inventario, prediga ventas y entienda a sus clientes en profundidad</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h3 className="font-semibold text-lg">Capacidades clave</h3>
                      <div className="space-y-2">
                        <div className="flex items-start gap-3">
                          <div className="bg-primary/10 p-1 rounded mt-1">
                            <Check className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium">Pronóstico de demanda</p>
                            <p className="text-sm text-muted-foreground">Predicción precisa de ventas por producto y ubicación</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="bg-primary/10 p-1 rounded mt-1">
                            <Check className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium">Segmentación de clientes</p>
                            <p className="text-sm text-muted-foreground">Agrupación automática basada en comportamiento de compra</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="bg-primary/10 p-1 rounded mt-1">
                            <Check className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium">Análisis de canasta de compra</p>
                            <p className="text-sm text-muted-foreground">Descubra qué productos se compran juntos</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="border rounded-lg overflow-hidden">
                      <div className="bg-muted p-4">
                        <h3 className="font-semibold mb-1">Caso de éxito</h3>
                        <p className="text-sm text-muted-foreground">Cadena minorista nacional</p>
                      </div>
                      <div className="p-4">
                        <div className="flex items-start mb-4">
                          <Badge className="mt-1">+22% ROI</Badge>
                          <div className="ml-auto flex">
                            <div className="bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded">Optimización de inventario</div>
                          </div>
                        </div>
                        <p className="mb-4">
                          "La implementación del sistema de predicción de demanda nos permitió reducir el exceso de inventario en un 32% mientras manteníamos altos niveles de disponibilidad de producto."
                        </p>
                        <div className="text-sm text-muted-foreground italic">
                          - Director de Operaciones
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end border-t pt-4">
                  <Button asChild>
                    <Link to="/ai-models">
                      Ver modelos para Retail
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="finance" className="animate-in fade-in-50">
              <Card>
                <CardHeader>
                  <CardTitle>Soluciones para Finanzas</CardTitle>
                  <CardDescription>Detecte fraude, evalúe riesgos y optimice decisiones de inversión</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h3 className="font-semibold text-lg">Capacidades clave</h3>
                      <div className="space-y-2">
                        <div className="flex items-start gap-3">
                          <div className="bg-primary/10 p-1 rounded mt-1">
                            <Check className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium">Detección de fraude</p>
                            <p className="text-sm text-muted-foreground">Identificación en tiempo real de transacciones sospechosas</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="bg-primary/10 p-1 rounded mt-1">
                            <Check className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium">Credit scoring avanzado</p>
                            <p className="text-sm text-muted-foreground">Modelos de evaluación de riesgo crediticio más precisos</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="bg-primary/10 p-1 rounded mt-1">
                            <Check className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium">Previsión de flujo de caja</p>
                            <p className="text-sm text-muted-foreground">Predicción de flujos de efectivo futuros</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="border rounded-lg overflow-hidden">
                      <div className="bg-muted p-4">
                        <h3 className="font-semibold mb-1">Caso de éxito</h3>
                        <p className="text-sm text-muted-foreground">Institución financiera regional</p>
                      </div>
                      <div className="p-4">
                        <div className="flex items-start mb-4">
                          <Badge className="mt-1">+38% ROI</Badge>
                          <div className="ml-auto flex">
                            <div className="bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded">Detección de fraude</div>
                          </div>
                        </div>
                        <p className="mb-4">
                          "Nuestro sistema de detección de fraude mejorado logró reducir las pérdidas en un 42% en el primer año, mientras disminuimos los falsos positivos en un 28%."
                        </p>
                        <div className="text-sm text-muted-foreground italic">
                          - Director de Riesgo
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end border-t pt-4">
                  <Button asChild>
                    <Link to="/ai-models">
                      Ver modelos para Finanzas
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="agriculture" className="animate-in fade-in-50">
              <Card>
                <CardHeader>
                  <CardTitle>Soluciones para Agricultura</CardTitle>
                  <CardDescription>Optimice rendimiento de cultivos, anticipe condiciones climáticas y mejore la eficiencia operativa</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h3 className="font-semibold text-lg">Capacidades clave</h3>
                      <div className="space-y-2">
                        <div className="flex items-start gap-3">
                          <div className="bg-primary/10 p-1 rounded mt-1">
                            <Check className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium">Predicción de rendimiento</p>
                            <p className="text-sm text-muted-foreground">Estimación precisa de cosechas por tipo de cultivo</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="bg-primary/10 p-1 rounded mt-1">
                            <Check className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium">Optimización de recursos</p>
                            <p className="text-sm text-muted-foreground">Uso eficiente de agua, fertilizantes y pesticidas</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="bg-primary/10 p-1 rounded mt-1">
                            <Check className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium">Detección temprana de plagas</p>
                            <p className="text-sm text-muted-foreground">Identificación y predicción de riesgos fitosanitarios</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="border rounded-lg overflow-hidden">
                      <div className="bg-muted p-4">
                        <h3 className="font-semibold mb-1">Caso de éxito</h3>
                        <p className="text-sm text-muted-foreground">Cooperativa agrícola</p>
                      </div>
                      <div className="p-4">
                        <div className="flex items-start mb-4">
                          <Badge className="mt-1">+27% ROI</Badge>
                          <div className="ml-auto flex">
                            <div className="bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded">Optimización de recursos</div>
                          </div>
                        </div>
                        <p className="mb-4">
                          "Conseguimos reducir el consumo de agua en un 23% mientras aumentamos el rendimiento promedio de los cultivos en un 18% gracias a las recomendaciones del sistema."
                        </p>
                        <div className="text-sm text-muted-foreground italic">
                          - Gerente de Producción
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end border-t pt-4">
                  <Button asChild>
                    <Link to="/dashboard/agricultura">
                      Ver dashboard de Agricultura
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="energy" className="animate-in fade-in-50">
              <Card>
                <CardHeader>
                  <CardTitle>Soluciones para Energía</CardTitle>
                  <CardDescription>Optimice la producción, prediga demanda y gestione energías renovables</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h3 className="font-semibold text-lg">Capacidades clave</h3>
                      <div className="space-y-2">
                        <div className="flex items-start gap-3">
                          <div className="bg-primary/10 p-1 rounded mt-1">
                            <Check className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium">Previsión de demanda energética</p>
                            <p className="text-sm text-muted-foreground">Predicción precisa a corto y largo plazo</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="bg-primary/10 p-1 rounded mt-1">
                            <Check className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium">Optimización de producción renovable</p>
                            <p className="text-sm text-muted-foreground">Maximización de producción solar y eólica</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="bg-primary/10 p-1 rounded mt-1">
                            <Check className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium">Mantenimiento predictivo</p>
                            <p className="text-sm text-muted-foreground">Anticipación de fallos en equipos críticos</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="border rounded-lg overflow-hidden">
                      <div className="bg-muted p-4">
                        <h3 className="font-semibold mb-1">Caso de éxito</h3>
                        <p className="text-sm text-muted-foreground">Compañía energética</p>
                      </div>
                      <div className="p-4">
                        <div className="flex items-start mb-4">
                          <Badge className="mt-1">+31% ROI</Badge>
                          <div className="ml-auto flex">
                            <div className="bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded">Mantenimiento predictivo</div>
                          </div>
                        </div>
                        <p className="mb-4">
                          "Redujimos los tiempos de inactividad no planificados en un 78% implementando el mantenimiento predictivo en nuestras instalaciones críticas."
                        </p>
                        <div className="text-sm text-muted-foreground italic">
                          - Jefe de Mantenimiento
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end border-t pt-4">
                  <Button asChild>
                    <Link to="/dashboard/energia">
                      Ver dashboard de Energía
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="health" className="animate-in fade-in-50">
              <Card>
                <CardHeader>
                  <CardTitle>Soluciones para Salud</CardTitle>
                  <CardDescription>Optimice operaciones hospitalarias, prediga admisiones y mejore resultados clínicos</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h3 className="font-semibold text-lg">Capacidades clave</h3>
                      <div className="space-y-2">
                        <div className="flex items-start gap-3">
                          <div className="bg-primary/10 p-1 rounded mt-1">
                            <Check className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium">Previsión de admisiones</p>
                            <p className="text-sm text-muted-foreground">Anticipación de volumen de pacientes</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="bg-primary/10 p-1 rounded mt-1">
                            <Check className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium">Optimización de recursos médicos</p>
                            <p className="text-sm text-muted-foreground">Planificación eficiente de personal y equipamiento</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="bg-primary/10 p-1 rounded mt-1">
                            <Check className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium">Análisis de resultados clínicos</p>
                            <p className="text-sm text-muted-foreground">Evaluación estadística de tratamientos y protocolos</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="border rounded-lg overflow-hidden">
                      <div className="bg-muted p-4">
                        <h3 className="font-semibold mb-1">Caso de éxito</h3>
                        <p className="text-sm text-muted-foreground">Centro médico regional</p>
                      </div>
                      <div className="p-4">
                        <div className="flex items-start mb-4">
                          <Badge className="mt-1">+19% ROI</Badge>
                          <div className="ml-auto flex">
                            <div className="bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded">Optimización de recursos</div>
                          </div>
                        </div>
                        <p className="mb-4">
                          "Mejoramos la satisfacción de pacientes en un 32% y redujimos tiempos de espera en un 24% gracias a la planificación predictiva de personal."
                        </p>
                        <div className="text-sm text-muted-foreground italic">
                          - Director de Operaciones
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end border-t pt-4">
                  <Button asChild>
                    <Link to="/ai-models">
                      Ver modelos para Salud
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        
        {/* Analysis Process */}
        <div className="my-12 py-8">
          <div className="text-center mb-10">
            <Badge className="mb-2">Nuestro Proceso</Badge>
            <h2 className="text-3xl font-bold mb-4">
              Cómo implementamos soluciones analíticas
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Un proceso estructurado y comprobado para convertir sus datos en resultados tangibles.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="relative">
              <div className="z-10 relative">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                  <span className="text-2xl font-bold text-primary">1</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Diagnóstico</h3>
                <p className="text-muted-foreground mb-4">
                  Evaluamos su situación actual, objetivos de negocio y datos disponibles para identificar oportunidades de valor.
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary" />
                    <span>Auditoría de datos existentes</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary" />
                    <span>Definición de KPIs</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary" />
                    <span>Identificación de casos de uso</span>
                  </li>
                </ul>
              </div>
              <div className="hidden md:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2">
                <ChevronRight className="h-8 w-8 text-muted-foreground" />
              </div>
            </div>
            
            <div className="relative">
              <div className="z-10 relative">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                  <span className="text-2xl font-bold text-primary">2</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Implementación</h3>
                <p className="text-muted-foreground mb-4">
                  Desarrollamos y desplegamos modelos analíticos personalizados para resolver sus desafíos específicos.
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary" />
                    <span>Selección de modelos adecuados</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary" />
                    <span>Entrenamiento con datos históricos</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary" />
                    <span>Validación y ajuste fino</span>
                  </li>
                </ul>
              </div>
              <div className="hidden md:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2">
                <ChevronRight className="h-8 w-8 text-muted-foreground" />
              </div>
            </div>
            
            <div>
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl font-bold text-primary">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Optimización</h3>
              <p className="text-muted-foreground mb-4">
                Evaluamos continuamente el rendimiento y refinamos los modelos para maximizar el valor a lo largo del tiempo.
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary" />
                  <span>Monitoreo de precisión</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary" />
                  <span>Actualización periódica</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary" />
                  <span>Expansión a nuevos casos de uso</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        {/* Additional Solutions */}
        <div className="my-12 py-8">
          <div className="text-center mb-10">
            <Badge className="mb-2">Soluciones Especializadas</Badge>
            <h2 className="text-3xl font-bold mb-4">
              Análisis avanzado para casos específicos
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Nuestro portafolio incluye soluciones analíticas para resolver desafíos empresariales específicos.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Análisis de Sentimiento</CardTitle>
                <CardDescription>Comprenda la percepción de su marca y productos</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4">Algoritmos de procesamiento de lenguaje natural que analizan comentarios, reseñas y menciones en redes sociales para determinar el sentimiento y temas emergentes.</p>
                <div className="flex items-center gap-2 text-sm text-primary">
                  <Badge variant="outline">NLP</Badge>
                  <Badge variant="outline">Clasificación</Badge>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" className="w-full">
                  Ver detalles
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Optimización de Precios</CardTitle>
                <CardDescription>Maximice ingresos con precios dinámicos</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4">Algoritmos que determinan el precio óptimo en tiempo real basados en demanda, competencia, elasticidad y otros factores para maximizar ingresos y rentabilidad.</p>
                <div className="flex items-center gap-2 text-sm text-primary">
                  <Badge variant="outline">Regresión</Badge>
                  <Badge variant="outline">Series Temporales</Badge>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" className="w-full">
                  Ver detalles
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Mantenimiento Predictivo</CardTitle>
                <CardDescription>Anticipe fallos antes de que ocurran</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4">Modelos que predicen fallos de equipamiento basado en patrones históricos y datos de sensores, permitiendo intervenciones antes de que ocurran paradas no planificadas.</p>
                <div className="flex items-center gap-2 text-sm text-primary">
                  <Badge variant="outline">Clasificación</Badge>
                  <Badge variant="outline">Anomalías</Badge>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" className="w-full">
                  Ver detalles
                </Button>
              </CardFooter>
            </Card>
            
            {showMoreSolutions && (
              <>
                <Card>
                  <CardHeader>
                    <CardTitle>Análisis de Atribución</CardTitle>
                    <CardDescription>Entienda el verdadero impacto de sus campañas</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-4">Modelos estadísticos que asignan el valor correcto a cada punto de contacto en el recorrido del cliente, permitiendo optimizar la estrategia de marketing y el ROI.</p>
                    <div className="flex items-center gap-2 text-sm text-primary">
                      <Badge variant="outline">Estadístico</Badge>
                      <Badge variant="outline">Multifactor</Badge>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" size="sm" className="w-full">
                      Ver detalles
                    </Button>
                  </CardFooter>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Detección de Anomalías</CardTitle>
                    <CardDescription>Identifique comportamientos inusuales</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-4">Algoritmos que detectan patrones anómalos en datos transaccionales, operacionales o de red, alertando sobre posibles fraudes, fallos o comportamientos atípicos.</p>
                    <div className="flex items-center gap-2 text-sm text-primary">
                      <Badge variant="outline">Clustering</Badge>
                      <Badge variant="outline">Machine Learning</Badge>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" size="sm" className="w-full">
                      Ver detalles
                    </Button>
                  </CardFooter>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Análisis de Causas Raíz</CardTitle>
                    <CardDescription>Descubra por qué ocurren los eventos clave</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-4">Técnicas estadísticas y de machine learning para identificar los factores causales detrás de eventos específicos, permitiendo intervenciones estratégicas y preventivas.</p>
                    <div className="flex items-center gap-2 text-sm text-primary">
                      <Badge variant="outline">Inferencia Causal</Badge>
                      <Badge variant="outline">Estadístico</Badge>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" size="sm" className="w-full">
                      Ver detalles
                    </Button>
                  </CardFooter>
                </Card>
              </>
            )}
          </div>
          
          {!showMoreSolutions && (
            <div className="flex justify-center mt-6">
              <Button 
                variant="ghost" 
                onClick={() => setShowMoreSolutions(true)}
                className="gap-2"
              >
                Ver más soluciones 
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
        
        {/* Contact Section */}
        <div className="my-12 py-8">
          {!showDemoForm ? (
            <div className="bg-muted/50 rounded-lg p-8 text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                ¿Listo para transformar tus datos en resultados?
              </h2>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Nuestros expertos pueden ayudarte a identificar las soluciones analíticas ideales para tus necesidades específicas.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" onClick={() => setShowDemoForm(true)}>
                  Solicitar demostración
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <a href="https://wa.me/123456789?text=Me%20interesa%20saber%20más%20sobre%20sus%20soluciones%20analíticas" target="_blank" rel="noopener noreferrer" className="flex items-center">
                    <MessageSquare className="mr-2 h-5 w-5" />
                    Consultar por WhatsApp
                  </a>
                </Button>
              </div>
            </div>
          ) : (
            <>
              <div className="text-center mb-10">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">
                  Solicitar una demostración personalizada
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Complete el siguiente formulario y nos pondremos en contacto con usted para coordinar una demostración adaptada a sus necesidades.
                </p>
              </div>
              
              <PersonalizedSolutionForm />
              
              <div className="mt-6 text-center">
                <Button variant="link" onClick={() => setShowDemoForm(false)}>
                  Volver
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </DefaultLayout>
  );
};

export default AnalysisCapabilitiesPage;
