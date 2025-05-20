
import React from 'react';
import DefaultLayout from '../../layouts/DefaultLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Link } from 'react-router-dom';
import { ArrowDown, ArrowUp, Download, MoreHorizontal, Zap, Bolt, AlertTriangle, Wrench, Activity, Clock, Calendar, ChevronRight, ArrowRight } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';

// Mock data for charts
const mockChartUrl = "data:image/svg+xml,%3Csvg width='500' height='300' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='100%25' height='100%25' fill='%23f5f5f5'/%3E%3Cpath d='M0,150 C100,100 150,200 200,100 C250,0 300,200 400,150 L400,300 L0,300 Z' fill='rgba(99, 102, 241, 0.2)' stroke='rgb(99, 102, 241)' stroke-width='2'/%3E%3C/svg%3E";

const EnergyDashboard = () => {
  const [timeRange, setTimeRange] = React.useState("30d");
  
  return (
    <DefaultLayout>
      <div className="container mx-auto py-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-1">Dashboard de Energía</h1>
            <p className="text-muted-foreground">
              Análisis y optimización de consumo energético
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            <Select
              defaultValue={timeRange}
              onValueChange={(value) => setTimeRange(value)}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Periodo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">Últimos 7 días</SelectItem>
                <SelectItem value="30d">Últimos 30 días</SelectItem>
                <SelectItem value="90d">Últimos 90 días</SelectItem>
                <SelectItem value="12m">Último año</SelectItem>
              </SelectContent>
            </Select>
            
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Exportar
            </Button>
          </div>
        </div>
        
        <div className="grid gap-6 md:grid-cols-4 mb-6">
          {/* KPI Cards */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Consumo total
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline justify-between">
                <div className="text-2xl font-bold">247.8 MWh</div>
                <div className="flex items-center text-green-600">
                  <ArrowDown className="h-4 w-4 mr-1" />
                  <span className="text-sm font-medium">12.4%</span>
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Comparado con periodo anterior
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Costo promedio
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline justify-between">
                <div className="text-2xl font-bold">€0.14/kWh</div>
                <div className="flex items-center text-red-600">
                  <ArrowUp className="h-4 w-4 mr-1" />
                  <span className="text-sm font-medium">3.2%</span>
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Precio de mercado vs. optimizado
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Eficiencia energética
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline justify-between">
                <div className="text-2xl font-bold">87%</div>
                <div className="flex items-center text-green-600">
                  <ArrowUp className="h-4 w-4 mr-1" />
                  <span className="text-sm font-medium">5.2%</span>
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Ratio de eficiencia operativa
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Estado del sistema
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline justify-between">
                <div className="text-2xl font-bold">Óptimo</div>
                <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                  Normal
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Todos los sistemas operando con normalidad
              </p>
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue="consumption" className="mb-6">
          <div className="flex justify-center mb-4">
            <TabsList>
              <TabsTrigger value="consumption" className="px-6">Consumo</TabsTrigger>
              <TabsTrigger value="production" className="px-6">Producción</TabsTrigger>
              <TabsTrigger value="distribution" className="px-6">Distribución</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="consumption">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div>
                  <CardTitle>Consumo energético por periodo</CardTitle>
                  <CardDescription>
                    Análisis de patrones de consumo y tendencias
                  </CardDescription>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Abrir menú</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Descargar datos</DropdownMenuItem>
                    <DropdownMenuItem>Ver análisis detallado</DropdownMenuItem>
                    <DropdownMenuItem>Establecer alertas</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </CardHeader>
              <CardContent>
                <img 
                  src={mockChartUrl} 
                  alt="Gráfico de consumo energético" 
                  className="w-full h-[350px] object-cover"
                />
              </CardContent>
              <CardFooter className="border-t p-4">
                <div className="grid grid-cols-1 md:grid-cols-3 w-full gap-6">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Horas pico</span>
                      <span className="font-medium">10:00 - 14:00</span>
                    </div>
                    <Progress value={72} className="h-2" />
                    <span className="text-xs text-muted-foreground">72% de consumo total</span>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Horas valle</span>
                      <span className="font-medium">00:00 - 06:00</span>
                    </div>
                    <Progress value={18} className="h-2" />
                    <span className="text-xs text-muted-foreground">18% de consumo total</span>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Resto del día</span>
                      <span className="font-medium">Otros periodos</span>
                    </div>
                    <Progress value={10} className="h-2" />
                    <span className="text-xs text-muted-foreground">10% de consumo total</span>
                  </div>
                </div>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="production">
            <Card>
              <CardHeader>
                <CardTitle>Producción energética</CardTitle>
                <CardDescription>
                  Datos de generación y eficiencia productiva
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="p-8 flex items-center justify-center bg-muted rounded-md">
                  <p className="text-muted-foreground">
                    Módulo de producción energética no disponible para este perfil
                  </p>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="ml-auto">
                  Solicitar acceso
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="distribution">
            <Card>
              <CardHeader>
                <CardTitle>Distribución energética</CardTitle>
                <CardDescription>
                  Análisis de distribución y balance de cargas
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="p-8 flex items-center justify-center bg-muted rounded-md">
                  <p className="text-muted-foreground">
                    Módulo de distribución energética no disponible para este perfil
                  </p>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="ml-auto">
                  Solicitar acceso
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
        
        <div className="grid gap-6 md:grid-cols-3 mb-6">
          <div className="md:col-span-2">
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Consumo por área</CardTitle>
                <CardDescription>
                  Distribución del consumo energético por zonas operativas
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium">Producción</h3>
                      <Badge variant="outline">Alta</Badge>
                    </div>
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl font-bold">142.5</span>
                      <span className="text-sm text-muted-foreground">MWh</span>
                    </div>
                    <Progress value={58} className="h-2 mt-2 mb-1" />
                    <p className="text-xs text-muted-foreground">
                      58% del consumo total
                    </p>
                  </div>
                  
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium">Oficinas</h3>
                      <Badge variant="outline">Media</Badge>
                    </div>
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl font-bold">63.4</span>
                      <span className="text-sm text-muted-foreground">MWh</span>
                    </div>
                    <Progress value={25} className="h-2 mt-2 mb-1" />
                    <p className="text-xs text-muted-foreground">
                      25% del consumo total
                    </p>
                  </div>
                  
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium">Almacenes</h3>
                      <Badge variant="outline">Baja</Badge>
                    </div>
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl font-bold">41.9</span>
                      <span className="text-sm text-muted-foreground">MWh</span>
                    </div>
                    <Progress value={17} className="h-2 mt-2 mb-1" />
                    <p className="text-xs text-muted-foreground">
                      17% del consumo total
                    </p>
                  </div>
                </div>
                
                <div className="mt-6 p-4 border rounded-lg">
                  <h3 className="font-medium mb-2">Oportunidades de ahorro identificadas</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2 text-sm">
                      <Bolt className="h-4 w-4 text-amber-500 mt-0.5" />
                      <span>
                        <span className="font-medium">Área de producción:</span> Optimizar ciclos de operación de equipos para reducir consumo en horas pico
                      </span>
                    </li>
                    <li className="flex items-start gap-2 text-sm">
                      <Bolt className="h-4 w-4 text-amber-500 mt-0.5" />
                      <span>
                        <span className="font-medium">Oficinas:</span> Implementar sistemas de iluminación inteligente y control de climatización
                      </span>
                    </li>
                    <li className="flex items-start gap-2 text-sm">
                      <Bolt className="h-4 w-4 text-amber-500 mt-0.5" />
                      <span>
                        <span className="font-medium">General:</span> Revisión de equipos con bajo rendimiento energético para posible reemplazo
                      </span>
                    </li>
                  </ul>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="ml-auto" asChild>
                  <Link to="/implementation/energia">
                    Ver plan de optimización
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
          
          <div>
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Mantenimiento predictivo</CardTitle>
                <CardDescription>
                  Predicciones de mantenimiento y alertas
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <ScrollArea className="h-[300px]">
                  <div className="px-4">
                    <div className="py-3 border-b">
                      <div className="flex items-start justify-between">
                        <Badge variant="outline" className="bg-amber-100 text-amber-800 mb-1">
                          <AlertTriangle className="h-3 w-3 mr-1" />
                          Atención
                        </Badge>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <Clock className="h-3 w-3 mr-1" />
                          <span>3 días</span>
                        </div>
                      </div>
                      <p className="font-medium text-sm">Transformador #2 - Sobrecarga</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Operando al 92% de capacidad. Considerar balance de carga.
                      </p>
                    </div>
                    
                    <div className="py-3 border-b">
                      <div className="flex items-start justify-between">
                        <Badge variant="outline" className="bg-red-100 text-red-800 mb-1">
                          <Wrench className="h-3 w-3 mr-1" />
                          Mantenimiento
                        </Badge>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <Calendar className="h-3 w-3 mr-1" />
                          <span>15/06/25</span>
                        </div>
                      </div>
                      <p className="font-medium text-sm">Generador auxiliar - Revisión</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Programar mantenimiento preventivo según calendario
                      </p>
                    </div>
                    
                    <div className="py-3">
                      <div className="flex items-start justify-between">
                        <Badge variant="outline" className="bg-green-100 text-green-800 mb-1">
                          <Activity className="h-3 w-3 mr-1" />
                          Monitoreo
                        </Badge>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <Clock className="h-3 w-3 mr-1" />
                          <span>Continuo</span>
                        </div>
                      </div>
                      <p className="font-medium text-sm">Sistema de refrigeración</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Eficiencia dentro de parámetros normales
                      </p>
                    </div>
                  </div>
                </ScrollArea>
              </CardContent>
              <CardFooter className="border-t p-4 flex flex-col gap-2">
                <Button variant="default" size="sm" className="w-full">
                  <Wrench className="h-4 w-4 mr-2" />
                  Solicitar mantenimiento
                </Button>
                <Button variant="outline" size="sm" className="w-full">
                  Ver historial completo
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Previsión de consumo</CardTitle>
            <CardDescription>
              Proyección de consumo energético para los próximos 30 días
            </CardDescription>
          </CardHeader>
          <CardContent>
            <img 
              src={mockChartUrl} 
              alt="Gráfico de previsión de consumo" 
              className="w-full h-[250px] object-cover"
            />
          </CardContent>
          <CardFooter className="border-t p-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
              <div className="p-3 bg-muted/50 rounded-lg">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-medium text-sm">Consumo previsto</h3>
                  <Zap className="h-4 w-4 text-amber-500" />
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-xl font-bold">238.4</span>
                  <span className="text-xs text-muted-foreground">MWh</span>
                </div>
                <div className="flex items-center mt-1 text-xs">
                  <ArrowDown className="h-3 w-3 text-green-600 mr-1" />
                  <span className="text-green-600">3.8% menor</span>
                  <span className="text-muted-foreground ml-1">que actual</span>
                </div>
              </div>
              
              <div className="p-3 bg-muted/50 rounded-lg">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-medium text-sm">Costo estimado</h3>
                  <Activity className="h-4 w-4 text-blue-500" />
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-xl font-bold">€31,284</span>
                </div>
                <div className="flex items-center mt-1 text-xs">
                  <ArrowDown className="h-3 w-3 text-green-600 mr-1" />
                  <span className="text-green-600">€1,570 ahorro</span>
                  <span className="text-muted-foreground ml-1">potencial</span>
                </div>
              </div>
              
              <div className="p-3 bg-muted/50 rounded-lg">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-medium text-sm">Oportunidad de ahorro</h3>
                  <Bolt className="h-4 w-4 text-primary" />
                </div>
                <div className="text-xl font-bold">Alta</div>
                <div className="text-xs text-muted-foreground mt-1">
                  Implementando recomendaciones de optimización
                </div>
              </div>
            </div>
          </CardFooter>
        </Card>
      </div>
    </DefaultLayout>
  );
};

export default EnergyDashboard;
