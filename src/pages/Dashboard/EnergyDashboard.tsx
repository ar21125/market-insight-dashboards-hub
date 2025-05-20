
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRight, LineChart, Zap, Thermometer, BarChart3, Activity, Wind, Lightbulb } from 'lucide-react';
import DefaultLayout from '@/layouts/DefaultLayout';

const EnergyDashboard = () => {
  return (
    <DefaultLayout>
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard de Energía</h1>
            <p className="text-muted-foreground">Análisis avanzado para optimizar generación, consumo y sostenibilidad energética</p>
          </div>
          <Button asChild>
            <Link to="/contact/energia" className="flex items-center gap-2">
              Solicitar demostración <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Producción Total</CardTitle>
              <CardDescription>MWh generados</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">168,423</div>
              <p className="text-xs text-muted-foreground">+8.2% vs período anterior</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Eficiencia</CardTitle>
              <CardDescription>Aprovechamiento</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">92.4%</div>
              <p className="text-xs text-muted-foreground">+3.1% vs período anterior</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Huella de Carbono</CardTitle>
              <CardDescription>Ton CO₂ equivalente</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">42,105</div>
              <p className="text-xs text-muted-foreground">-12.6% vs período anterior</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Incidentes</CardTitle>
              <CardDescription>Alertas activas</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5</div>
              <p className="text-xs text-muted-foreground">-2 vs período anterior</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="produccion" className="space-y-4">
          <TabsList>
            <TabsTrigger value="produccion">Producción</TabsTrigger>
            <TabsTrigger value="consumo">Consumo</TabsTrigger>
            <TabsTrigger value="mantenimiento">Mantenimiento</TabsTrigger>
            <TabsTrigger value="renovables">Renovables</TabsTrigger>
          </TabsList>
          <TabsContent value="produccion" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>Producción Energética</CardTitle>
                  <CardDescription>Generación por tipo de fuente</CardDescription>
                </CardHeader>
                <CardContent className="h-[300px] flex items-center justify-center bg-muted/30">
                  <BarChart3 className="h-16 w-16 text-muted-foreground/50" />
                </CardContent>
                <CardFooter>
                  <Button variant="outline" asChild>
                    <Link to="/implementation/energia" className="w-full">
                      Ver análisis detallado
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Distribución de Fuentes</CardTitle>
                  <CardDescription>Mix energético actual</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium">Hidroeléctrica</span>
                        <span className="text-sm">42%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2.5">
                        <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: '42%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium">Solar</span>
                        <span className="text-sm">28%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2.5">
                        <div className="bg-yellow-500 h-2.5 rounded-full" style={{ width: '28%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium">Eólica</span>
                        <span className="text-sm">18%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2.5">
                        <div className="bg-green-500 h-2.5 rounded-full" style={{ width: '18%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium">Gas Natural</span>
                        <span className="text-sm">12%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2.5">
                        <div className="bg-orange-500 h-2.5 rounded-full" style={{ width: '12%' }}></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="consumo">
            <Card>
              <CardHeader>
                <CardTitle>Análisis de Consumo</CardTitle>
                <CardDescription>Patrones y predicciones de demanda energética</CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-muted/30 rounded-lg p-4 flex flex-col">
                  <div className="flex items-center mb-4">
                    <Activity className="h-5 w-5 mr-2 text-blue-500" />
                    <h4 className="font-medium">Consumo Horario</h4>
                  </div>
                  <div className="h-[200px] flex items-center justify-center">
                    <LineChart className="h-16 w-16 text-muted-foreground/50" />
                  </div>
                </div>
                <div className="bg-muted/30 rounded-lg p-4 flex flex-col">
                  <div className="flex items-center mb-4">
                    <Thermometer className="h-5 w-5 mr-2 text-orange-500" />
                    <h4 className="font-medium">Impacto Climático</h4>
                  </div>
                  <div className="h-[200px] flex items-center justify-center">
                    <LineChart className="h-16 w-16 text-muted-foreground/50" />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" asChild>
                  <Link to="/implementation/energia" className="w-full">
                    Ver análisis detallado
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="mantenimiento">
            <Card>
              <CardHeader>
                <CardTitle>Mantenimiento Predictivo</CardTitle>
                <CardDescription>Análisis de estado de equipos y predicción de fallos</CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-muted/30 rounded-lg p-4 flex flex-col">
                  <div className="flex items-center mb-4">
                    <Zap className="h-5 w-5 mr-2 text-blue-500" />
                    <h4 className="font-medium">Estado de Equipos</h4>
                  </div>
                  <div className="h-[200px] flex items-center justify-center">
                    <LineChart className="h-16 w-16 text-muted-foreground/50" />
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-4">Alertas de Mantenimiento</h4>
                  <div className="space-y-3">
                    <div className="bg-red-50 dark:bg-red-950/30 p-3 rounded-lg border border-red-100 dark:border-red-900/50">
                      <div className="flex items-center">
                        <Badge variant="outline" className="bg-red-100 dark:bg-red-900">Crítico</Badge>
                        <span className="ml-2 text-sm font-medium">Turbina #4 - Vibraciones anómalas</span>
                      </div>
                    </div>
                    <div className="bg-amber-50 dark:bg-amber-950/30 p-3 rounded-lg border border-amber-100 dark:border-amber-900/50">
                      <div className="flex items-center">
                        <Badge variant="outline" className="bg-amber-100 dark:bg-amber-900">Medio</Badge>
                        <span className="ml-2 text-sm font-medium">Transformador S12 - Temperatura elevada</span>
                      </div>
                    </div>
                    <div className="bg-blue-50 dark:bg-blue-950/30 p-3 rounded-lg border border-blue-100 dark:border-blue-900/50">
                      <div className="flex items-center">
                        <Badge variant="outline" className="bg-blue-100 dark:bg-blue-900">Programado</Badge>
                        <span className="ml-2 text-sm font-medium">Subestación Norte - Revisión periódica</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" asChild>
                  <Link to="/implementation/energia" className="w-full">
                    Ver análisis detallado
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="renovables">
            <Card>
              <CardHeader>
                <CardTitle>Energías Renovables</CardTitle>
                <CardDescription>Rendimiento y optimización de fuentes renovables</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-muted/30 p-4 rounded-lg">
                      <h4 className="font-medium mb-2 flex items-center">
                        <Wind className="h-4 w-4 mr-2 text-green-500" />
                        Eficiencia Eólica
                      </h4>
                      <div className="text-2xl font-bold">86%</div>
                      <p className="text-sm text-muted-foreground">+4% vs trimestre anterior</p>
                    </div>
                    <div className="bg-muted/30 p-4 rounded-lg">
                      <h4 className="font-medium mb-2 flex items-center">
                        <Lightbulb className="h-4 w-4 mr-2 text-yellow-500" />
                        Eficiencia Solar
                      </h4>
                      <div className="text-2xl font-bold">92%</div>
                      <p className="text-sm text-muted-foreground">+2% vs trimestre anterior</p>
                    </div>
                    <div className="bg-muted/30 p-4 rounded-lg">
                      <h4 className="font-medium mb-2">ROI Renovables</h4>
                      <div className="text-2xl font-bold">215%</div>
                      <p className="text-sm text-muted-foreground">A 5 años</p>
                    </div>
                  </div>
                  
                  <div className="bg-muted/20 p-4 rounded-lg border">
                    <h4 className="font-medium mb-3">Predicciones de Generación</h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between p-2 bg-green-50 dark:bg-green-950/30 rounded border border-green-100 dark:border-green-900/50">
                        <div className="flex items-center">
                          <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 border-0">+12%</Badge>
                          <span className="ml-2 font-medium text-sm">Capacidad eólica proyectada (próximo trimestre)</span>
                        </div>
                        <Button size="sm" variant="outline">Detalles</Button>
                      </div>
                      <div className="flex items-center justify-between p-2 bg-yellow-50 dark:bg-yellow-950/30 rounded border border-yellow-100 dark:border-yellow-900/50">
                        <div className="flex items-center">
                          <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200 border-0">+8%</Badge>
                          <span className="ml-2 font-medium text-sm">Capacidad solar proyectada (próximo trimestre)</span>
                        </div>
                        <Button size="sm" variant="outline">Detalles</Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" asChild>
                  <Link to="/implementation/energia" className="w-full">
                    Ver análisis detallado
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Modelos recomendados</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">ARIMA</CardTitle>
                <CardDescription>Análisis de series temporales</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <h4 className="text-sm font-medium">Uso principal:</h4>
                  <p className="text-sm text-muted-foreground">Predicción de demanda energética y patrones de consumo</p>
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-medium">Precisión:</h4>
                  <p className="text-sm text-muted-foreground">93% en previsiones a 24h</p>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" asChild className="w-full">
                  <Link to="/ai-models">Explorar modelo</Link>
                </Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Regresión Polinómica</CardTitle>
                <CardDescription>Predicción de variables no lineales</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <h4 className="text-sm font-medium">Uso principal:</h4>
                  <p className="text-sm text-muted-foreground">Modelado de producción energética según factores climáticos</p>
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-medium">Precisión:</h4>
                  <p className="text-sm text-muted-foreground">89% en predicciones de generación</p>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" asChild className="w-full">
                  <Link to="/ai-models">Explorar modelo</Link>
                </Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Ridge Regression</CardTitle>
                <CardDescription>Regresión regularizada</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <h4 className="text-sm font-medium">Uso principal:</h4>
                  <p className="text-sm text-muted-foreground">Predicción de fallos y mantenimiento predictivo</p>
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-medium">Efectividad:</h4>
                  <p className="text-sm text-muted-foreground">Reducción de 67% en tiempo de inactividad</p>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" asChild className="w-full">
                  <Link to="/ai-models">Explorar modelo</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default EnergyDashboard;
