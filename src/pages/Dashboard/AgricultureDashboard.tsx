
import React from 'react';
import DefaultLayout from '../../layouts/DefaultLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Link } from 'react-router-dom';
import { ArrowDown, ArrowUp, Download, FileBarChart, MoreHorizontal, BarChart, BarChart3, LineChart, ChevronRight, Thermometer, Droplets, Wind, ArrowRight } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Mock data for charts
const mockChartUrl = "data:image/svg+xml,%3Csvg width='500' height='300' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='100%25' height='100%25' fill='%23f5f5f5'/%3E%3Cpath d='M0,150 C100,100 150,200 200,100 C250,0 300,200 400,150 L400,300 L0,300 Z' fill='rgba(99, 102, 241, 0.2)' stroke='rgb(99, 102, 241)' stroke-width='2'/%3E%3C/svg%3E";

const AgricultureDashboard = () => {
  const [timeRange, setTimeRange] = React.useState("30d");
  
  return (
    <DefaultLayout>
      <div className="container mx-auto py-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-1">Dashboard de Agricultura</h1>
            <p className="text-muted-foreground">
              Análisis y optimización de cultivos basado en datos
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
        
        <div className="grid gap-6 md:grid-cols-3 mb-6">
          {/* KPI Cards */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Rendimiento promedio
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline justify-between">
                <div className="text-2xl font-bold">7.4 ton/ha</div>
                <div className="flex items-center text-green-600">
                  <ArrowUp className="h-4 w-4 mr-1" />
                  <span className="text-sm font-medium">12.8%</span>
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Comparado con temporada anterior
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Eficiencia hídrica
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline justify-between">
                <div className="text-2xl font-bold">65.8%</div>
                <div className="flex items-center text-green-600">
                  <ArrowUp className="h-4 w-4 mr-1" />
                  <span className="text-sm font-medium">8.3%</span>
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Reducción en consumo de agua vs. referencias
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Salud de cultivo
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline justify-between">
                <div className="text-2xl font-bold">Buena</div>
                <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                  Óptimo
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Basado en índices NDVI y análisis de suelo
              </p>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 mb-6">
          {/* Main charts */}
          <Card className="md:col-span-1">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div>
                <CardTitle>Rendimiento por parcela</CardTitle>
                <CardDescription>
                  Comparación de rendimiento actual vs proyección
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
                  <DropdownMenuItem>Descargar CSV</DropdownMenuItem>
                  <DropdownMenuItem>Ver detalles</DropdownMenuItem>
                  <DropdownMenuItem>Compartir reporte</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </CardHeader>
            <CardContent className="pl-2">
              <img 
                src={mockChartUrl} 
                alt="Gráfico de rendimiento por parcela" 
                className="w-full h-[300px] object-cover"
              />
            </CardContent>
          </Card>
          
          <Card className="md:col-span-1">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div>
                <CardTitle>Uso de recursos</CardTitle>
                <CardDescription>
                  Consumo de agua y fertilizantes
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
                  <DropdownMenuItem>Descargar CSV</DropdownMenuItem>
                  <DropdownMenuItem>Ver detalles</DropdownMenuItem>
                  <DropdownMenuItem>Compartir reporte</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </CardHeader>
            <CardContent className="pl-2">
              <img 
                src={mockChartUrl} 
                alt="Gráfico de uso de recursos" 
                className="w-full h-[300px] object-cover"
              />
            </CardContent>
          </Card>
        </div>
        
        <div className="grid gap-6 md:grid-cols-3 mb-6">
          <div className="md:col-span-2">
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Condiciones ambientales</CardTitle>
                <CardDescription>
                  Variables meteorológicas que afectan el rendimiento del cultivo
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-muted/50 rounded-lg flex flex-col items-center">
                    <Thermometer className="h-8 w-8 text-amber-500 mb-2" />
                    <h3 className="font-medium">Temperatura</h3>
                    <div className="mt-1 text-2xl font-bold">24.3°C</div>
                    <p className="text-xs text-muted-foreground">Promedio semanal</p>
                  </div>
                  
                  <div className="p-4 bg-muted/50 rounded-lg flex flex-col items-center">
                    <Droplets className="h-8 w-8 text-blue-500 mb-2" />
                    <h3 className="font-medium">Precipitación</h3>
                    <div className="mt-1 text-2xl font-bold">42 mm</div>
                    <p className="text-xs text-muted-foreground">Acumulado semanal</p>
                  </div>
                  
                  <div className="p-4 bg-muted/50 rounded-lg flex flex-col items-center">
                    <Wind className="h-8 w-8 text-gray-500 mb-2" />
                    <h3 className="font-medium">Humedad</h3>
                    <div className="mt-1 text-2xl font-bold">68%</div>
                    <p className="text-xs text-muted-foreground">Promedio semanal</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="ghost" size="sm" className="ml-auto">
                  Ver historial completo
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Alertas y Notificaciones</CardTitle>
              <CardDescription>
                Eventos recientes que requieren atención
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <ScrollArea className="h-[220px]">
                <div className="px-4">
                  <div className="py-3 border-b">
                    <div className="flex items-start justify-between">
                      <Badge variant="outline" className="bg-yellow-100 text-yellow-800 mb-1">
                        Media
                      </Badge>
                      <span className="text-xs text-muted-foreground">Hoy</span>
                    </div>
                    <p className="font-medium text-sm">Humedad de suelo por debajo del umbral</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Parcela #3 requiere riego adicional
                    </p>
                  </div>
                  
                  <div className="py-3 border-b">
                    <div className="flex items-start justify-between">
                      <Badge variant="outline" className="bg-red-100 text-red-800 mb-1">
                        Alta
                      </Badge>
                      <span className="text-xs text-muted-foreground">Ayer</span>
                    </div>
                    <p className="font-medium text-sm">Posible plaga detectada</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Signos de infestación en sector norte
                    </p>
                  </div>
                  
                  <div className="py-3">
                    <div className="flex items-start justify-between">
                      <Badge variant="outline" className="bg-green-100 text-green-800 mb-1">
                        Baja
                      </Badge>
                      <span className="text-xs text-muted-foreground">3 días atrás</span>
                    </div>
                    <p className="font-medium text-sm">Recordatorio de mantenimiento</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Sistema de irrigación requiere revisión mensual
                    </p>
                  </div>
                </div>
              </ScrollArea>
            </CardContent>
            <CardFooter className="border-t px-4 py-2">
              <Button variant="ghost" size="sm" className="w-full">
                Ver todas las alertas
              </Button>
            </CardFooter>
          </Card>
        </div>
        
        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Recomendaciones</CardTitle>
              <CardDescription>
                Sugerencias basadas en análisis de datos para optimizar rendimiento
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 border rounded-lg bg-blue-50 dark:bg-blue-950/30">
                <h3 className="font-medium mb-2 flex items-center gap-2">
                  <Droplets className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  Optimización de riego
                </h3>
                <p className="text-sm mb-2">
                  Según las condiciones meteorológicas previstas y la humedad actual del suelo,
                  se recomienda reducir el riego en un 15% en las parcelas #2 y #5.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">
                    Ahorro potencial: 2.500 litros de agua/semana
                  </span>
                  <Button size="sm" variant="ghost">Aplicar</Button>
                </div>
              </div>
              
              <div className="p-4 border rounded-lg bg-emerald-50 dark:bg-emerald-950/30">
                <h3 className="font-medium mb-2 flex items-center gap-2">
                  <BarChart className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                  Rotación de cultivos
                </h3>
                <p className="text-sm mb-2">
                  Para la próxima temporada, considere rotar leguminosas en las parcelas #1 y #4
                  para mejorar la fijación de nitrógeno y la salud del suelo.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">
                    Mejora potencial: +18% en rendimiento futuro
                  </span>
                  <Button size="sm" variant="ghost">Detalles</Button>
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t">
              <Button variant="outline" className="ml-auto" asChild>
                <Link to="/implementation/agricultura">
                  Ver plan de implementación
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default AgricultureDashboard;
