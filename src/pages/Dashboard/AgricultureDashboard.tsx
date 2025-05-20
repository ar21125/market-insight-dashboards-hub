
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRight, LineChart, Sprout, Cloud, Droplets, CalendarDays } from 'lucide-react';
import DefaultLayout from '@/layouts/DefaultLayout';

const AgricultureDashboard = () => {
  return (
    <DefaultLayout>
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard de Agricultura</h1>
            <p className="text-muted-foreground">Análisis avanzado para optimizar producción y sostenibilidad agrícola</p>
          </div>
          <Button asChild>
            <Link to="/contact/agricultura" className="flex items-center gap-2">
              Solicitar demostración <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Área de Cultivo Analizada</CardTitle>
              <CardDescription>Hectáreas procesadas</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">128,540</div>
              <p className="text-xs text-muted-foreground">+12.3% vs período anterior</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Rendimiento Promedio</CardTitle>
              <CardDescription>Ton/hectárea</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4.8</div>
              <p className="text-xs text-muted-foreground">+8.7% vs período anterior</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Eficiencia Hídrica</CardTitle>
              <CardDescription>Litros/kg producido</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">342</div>
              <p className="text-xs text-muted-foreground">-15.2% vs período anterior</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Anomalías Detectadas</CardTitle>
              <CardDescription>Alertas activas</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">7</div>
              <p className="text-xs text-muted-foreground">-3 vs período anterior</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="rendimiento" className="space-y-4">
          <TabsList>
            <TabsTrigger value="rendimiento">Rendimiento</TabsTrigger>
            <TabsTrigger value="clima">Clima</TabsTrigger>
            <TabsTrigger value="riego">Riego</TabsTrigger>
            <TabsTrigger value="plagas">Plagas</TabsTrigger>
          </TabsList>
          <TabsContent value="rendimiento" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>Análisis de Rendimiento por Parcela</CardTitle>
                  <CardDescription>Rendimiento histórico comparativo</CardDescription>
                </CardHeader>
                <CardContent className="h-[300px] flex items-center justify-center bg-muted/30">
                  <LineChart className="h-16 w-16 text-muted-foreground/50" />
                </CardContent>
                <CardFooter>
                  <Button variant="outline" asChild>
                    <Link to="/implementation/agricultura" className="w-full">
                      Ver análisis detallado
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Factores de Influencia</CardTitle>
                  <CardDescription>Impacto en rendimiento</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium">Suelo</span>
                        <span className="text-sm">38%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2.5">
                        <div className="bg-primary h-2.5 rounded-full" style={{ width: '38%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium">Riego</span>
                        <span className="text-sm">27%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2.5">
                        <div className="bg-primary h-2.5 rounded-full" style={{ width: '27%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium">Fertilización</span>
                        <span className="text-sm">22%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2.5">
                        <div className="bg-primary h-2.5 rounded-full" style={{ width: '22%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium">Clima</span>
                        <span className="text-sm">13%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2.5">
                        <div className="bg-primary h-2.5 rounded-full" style={{ width: '13%' }}></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="clima">
            <Card>
              <CardHeader>
                <CardTitle>Análisis Climático</CardTitle>
                <CardDescription>Impacto de variables climáticas en cultivos</CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-muted/30 rounded-lg p-4 flex flex-col">
                  <div className="flex items-center mb-4">
                    <Cloud className="h-5 w-5 mr-2 text-blue-500" />
                    <h4 className="font-medium">Precipitación vs. Rendimiento</h4>
                  </div>
                  <div className="h-[200px] flex items-center justify-center">
                    <LineChart className="h-16 w-16 text-muted-foreground/50" />
                  </div>
                </div>
                <div className="bg-muted/30 rounded-lg p-4 flex flex-col">
                  <div className="flex items-center mb-4">
                    <CalendarDays className="h-5 w-5 mr-2 text-orange-500" />
                    <h4 className="font-medium">Proyección Estacional</h4>
                  </div>
                  <div className="h-[200px] flex items-center justify-center">
                    <LineChart className="h-16 w-16 text-muted-foreground/50" />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" asChild>
                  <Link to="/implementation/agricultura" className="w-full">
                    Ver análisis detallado
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="riego">
            <Card>
              <CardHeader>
                <CardTitle>Gestión de Riego</CardTitle>
                <CardDescription>Optimización de recursos hídricos</CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-muted/30 rounded-lg p-4 flex flex-col">
                  <div className="flex items-center mb-4">
                    <Droplets className="h-5 w-5 mr-2 text-blue-500" />
                    <h4 className="font-medium">Eficiencia de Riego por Zonas</h4>
                  </div>
                  <div className="h-[200px] flex items-center justify-center">
                    <LineChart className="h-16 w-16 text-muted-foreground/50" />
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-4">Recomendaciones de Riego</h4>
                  <div className="space-y-3">
                    <div className="bg-green-50 dark:bg-green-950/30 p-3 rounded-lg border border-green-100 dark:border-green-900/50">
                      <div className="flex items-center">
                        <Badge variant="outline" className="bg-green-100 dark:bg-green-900">Zona A</Badge>
                        <span className="ml-2 text-sm font-medium">Reducir 15% para optimización</span>
                      </div>
                    </div>
                    <div className="bg-yellow-50 dark:bg-yellow-950/30 p-3 rounded-lg border border-yellow-100 dark:border-yellow-900/50">
                      <div className="flex items-center">
                        <Badge variant="outline" className="bg-yellow-100 dark:bg-yellow-900">Zona C</Badge>
                        <span className="ml-2 text-sm font-medium">Incrementar 10% para evitar estrés</span>
                      </div>
                    </div>
                    <div className="bg-blue-50 dark:bg-blue-950/30 p-3 rounded-lg border border-blue-100 dark:border-blue-900/50">
                      <div className="flex items-center">
                        <Badge variant="outline" className="bg-blue-100 dark:bg-blue-900">General</Badge>
                        <span className="ml-2 text-sm font-medium">Ajustar horarios a madrugada</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" asChild>
                  <Link to="/implementation/agricultura" className="w-full">
                    Ver análisis detallado
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="plagas">
            <Card>
              <CardHeader>
                <CardTitle>Monitoreo de Plagas</CardTitle>
                <CardDescription>Detección temprana y manejo integrado</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-muted/30 p-4 rounded-lg">
                      <h4 className="font-medium mb-2 flex items-center">
                        <Sprout className="h-4 w-4 mr-2 text-green-500" />
                        Riesgo Actual
                      </h4>
                      <div className="text-2xl font-bold text-amber-500">Moderado</div>
                      <p className="text-sm text-muted-foreground">3 zonas en observación</p>
                    </div>
                    <div className="bg-muted/30 p-4 rounded-lg">
                      <h4 className="font-medium mb-2">Detección Temprana</h4>
                      <div className="text-2xl font-bold text-green-500">95%</div>
                      <p className="text-sm text-muted-foreground">Precisión del modelo</p>
                    </div>
                    <div className="bg-muted/30 p-4 rounded-lg">
                      <h4 className="font-medium mb-2">Ahorro Estimado</h4>
                      <div className="text-2xl font-bold">$28,450</div>
                      <p className="text-sm text-muted-foreground">Último trimestre</p>
                    </div>
                  </div>
                  
                  <div className="bg-muted/20 p-4 rounded-lg border">
                    <h4 className="font-medium mb-3">Alertas Activas</h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between p-2 bg-red-50 dark:bg-red-950/30 rounded border border-red-100 dark:border-red-900/50">
                        <div className="flex items-center">
                          <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 border-0">Alta</Badge>
                          <span className="ml-2 font-medium text-sm">Roya en sector norte</span>
                        </div>
                        <Button size="sm" variant="outline">Ver detalles</Button>
                      </div>
                      <div className="flex items-center justify-between p-2 bg-amber-50 dark:bg-amber-950/30 rounded border border-amber-100 dark:border-amber-900/50">
                        <div className="flex items-center">
                          <Badge className="bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200 border-0">Media</Badge>
                          <span className="ml-2 font-medium text-sm">Trips en sector este</span>
                        </div>
                        <Button size="sm" variant="outline">Ver detalles</Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" asChild>
                  <Link to="/implementation/agricultura" className="w-full">
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
                <CardTitle className="text-lg">Random Forest</CardTitle>
                <CardDescription>Algoritmo para predicción de rendimiento</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <h4 className="text-sm font-medium">Uso principal:</h4>
                  <p className="text-sm text-muted-foreground">Predicción de rendimientos agrícolas basados en múltiples variables</p>
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-medium">Precisión:</h4>
                  <p className="text-sm text-muted-foreground">92% en parcelas de prueba</p>
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
                <CardTitle className="text-lg">ARIMA</CardTitle>
                <CardDescription>Series temporales para análisis de tendencias</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <h4 className="text-sm font-medium">Uso principal:</h4>
                  <p className="text-sm text-muted-foreground">Previsión de condiciones climáticas y rendimientos futuros</p>
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-medium">Precisión:</h4>
                  <p className="text-sm text-muted-foreground">87% en previsiones a 3 meses</p>
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
                <CardTitle className="text-lg">K-Means</CardTitle>
                <CardDescription>Algoritmo de clustering para segmentación</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <h4 className="text-sm font-medium">Uso principal:</h4>
                  <p className="text-sm text-muted-foreground">Zonificación de terrenos según características de suelo y clima</p>
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-medium">Efectividad:</h4>
                  <p className="text-sm text-muted-foreground">Incremento de 23% en eficiencia de recursos</p>
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

export default AgricultureDashboard;
