
import React, { useState } from 'react';
import DefaultLayout from '@/layouts/DefaultLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BarChart, LineChart, PieChart, ResponsiveContainer, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Line, Pie, Cell } from 'recharts';
import { Separator } from '@/components/ui/separator';
import { Link } from 'react-router-dom';
import { ChevronRight, Download, ExternalLink, FileSpreadsheet } from 'lucide-react';

// Datos de ejemplo para agricultura
const cropYieldData = [
  { name: 'Ene', maiz: 83, trigo: 65, soja: 91 },
  { name: 'Feb', maiz: 85, trigo: 68, soja: 88 },
  { name: 'Mar', maiz: 101, trigo: 71, soja: 90 },
  { name: 'Abr', maiz: 99, trigo: 65, soja: 93 },
  { name: 'May', maiz: 87, trigo: 72, soja: 95 },
  { name: 'Jun', maiz: 92, trigo: 75, soja: 97 },
  { name: 'Jul', maiz: 89, trigo: 80, soja: 94 },
  { name: 'Ago', maiz: 95, trigo: 74, soja: 99 },
  { name: 'Sep', maiz: 102, trigo: 78, soja: 96 },
  { name: 'Oct', maiz: 110, trigo: 82, soja: 98 },
  { name: 'Nov', maiz: 98, trigo: 84, soja: 102 },
  { name: 'Dic', maiz: 94, trigo: 81, soja: 105 },
];

const soilMoistureData = [
  { name: 'Zona A', value: 22 },
  { name: 'Zona B', value: 28 },
  { name: 'Zona C', value: 35 },
  { name: 'Zona D', value: 15 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const weatherImpactData = [
  { name: 'Semana 1', temperatura: 29, precipitacion: 10, rendimiento: 81 },
  { name: 'Semana 2', temperatura: 32, precipitacion: 5, rendimiento: 78 },
  { name: 'Semana 3', temperatura: 34, precipitacion: 0, rendimiento: 74 },
  { name: 'Semana 4', temperatura: 33, precipitacion: 15, rendimiento: 79 },
  { name: 'Semana 5', temperatura: 30, precipitacion: 25, rendimiento: 85 },
  { name: 'Semana 6', temperatura: 28, precipitacion: 20, rendimiento: 89 },
  { name: 'Semana 7', temperatura: 26, precipitacion: 18, rendimiento: 91 },
  { name: 'Semana 8', temperatura: 27, precipitacion: 12, rendimiento: 87 },
];

const resourceUsageData = [
  { name: 'Agua', optimo: 75, actual: 82 },
  { name: 'Fertilizante', optimo: 55, actual: 49 },
  { name: 'Pesticidas', optimo: 40, actual: 38 },
  { name: 'Combustible', optimo: 65, actual: 58 },
  { name: 'Electricidad', optimo: 60, actual: 65 },
];

const AgricultureDashboard = () => {
  const [cropType, setCropType] = useState('maiz');

  return (
    <DefaultLayout>
      <div className="container mx-auto p-4 pb-16">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-1">Dashboard de Agricultura</h1>
            <p className="text-muted-foreground">
              Monitoreo de rendimiento de cultivos, condiciones del suelo y recursos
            </p>
          </div>
          
          <div className="flex gap-2">
            <Select defaultValue={cropType} onValueChange={setCropType}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Tipo de Cultivo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="maiz">Maíz</SelectItem>
                <SelectItem value="trigo">Trigo</SelectItem>
                <SelectItem value="soja">Soja</SelectItem>
              </SelectContent>
            </Select>
            
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Exportar
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Rendimiento Promedio</CardTitle>
              <CardDescription>Por hectárea, último año</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {cropType === 'maiz' ? '8.7' : cropType === 'trigo' ? '7.2' : '9.1'} toneladas/ha
              </div>
              <p className="text-xs text-muted-foreground">
                <span className="text-emerald-500">↑ 12%</span> vs. año anterior
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Coste de Producción</CardTitle>
              <CardDescription>Por hectárea, último año</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {cropType === 'maiz' ? '1,250€' : cropType === 'trigo' ? '980€' : '1,320€'}
              </div>
              <p className="text-xs text-muted-foreground">
                <span className="text-red-500">↑ 5%</span> vs. año anterior
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Eficiencia de Recursos</CardTitle>
              <CardDescription>Uso óptimo de recursos</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {cropType === 'maiz' ? '83%' : cropType === 'trigo' ? '78%' : '89%'}
              </div>
              <p className="text-xs text-muted-foreground">
                <span className="text-emerald-500">↑ 7%</span> vs. año anterior
              </p>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <Card>
            <CardHeader>
              <CardTitle>Rendimiento Histórico de Cultivos</CardTitle>
              <CardDescription>Toneladas por hectárea, último año</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={cropYieldData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="maiz" 
                      name="Maíz"
                      stroke="#8884d8" 
                      activeDot={{ r: 8 }}
                      strokeWidth={cropType === 'maiz' ? 3 : 1}
                      opacity={cropType === 'maiz' ? 1 : 0.4}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="trigo" 
                      name="Trigo"
                      stroke="#82ca9d" 
                      strokeWidth={cropType === 'trigo' ? 3 : 1}
                      opacity={cropType === 'trigo' ? 1 : 0.4}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="soja" 
                      name="Soja"
                      stroke="#ffc658" 
                      strokeWidth={cropType === 'soja' ? 3 : 1}
                      opacity={cropType === 'soja' ? 1 : 0.4}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Distribución de Humedad del Suelo</CardTitle>
              <CardDescription>Por zona de cultivo</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={soilMoistureData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={110}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {soilMoistureData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <Card>
            <CardHeader>
              <CardTitle>Impacto del Clima en el Rendimiento</CardTitle>
              <CardDescription>Relación entre temperatura, precipitación y rendimiento</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={weatherImpactData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="temperatura" 
                      name="Temperatura (°C)"
                      stroke="#ff7300" 
                      yAxisId="left"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="precipitacion" 
                      name="Precipitación (mm)"
                      stroke="#387908" 
                      yAxisId="right"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="rendimiento" 
                      name="Rendimiento (%)"
                      stroke="#3366cc" 
                      yAxisId="right"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Utilización de Recursos</CardTitle>
              <CardDescription>Comparación con niveles óptimos</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={resourceUsageData}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="optimo" name="Nivel Óptimo" fill="#8884d8" />
                    <Bar dataKey="actual" name="Uso Actual" fill="#82ca9d" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Análisis Predictivo</CardTitle>
              <CardDescription>Resultados del modelo XGBoost para predicción de rendimiento</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="resultados">
                <TabsList className="mb-4">
                  <TabsTrigger value="resultados">Resultados</TabsTrigger>
                  <TabsTrigger value="variables">Variables Importantes</TabsTrigger>
                  <TabsTrigger value="metricas">Métricas del Modelo</TabsTrigger>
                </TabsList>
                
                <TabsContent value="resultados" className="space-y-4">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="bg-muted/50 rounded-lg p-4 md:w-1/3 flex flex-col justify-between">
                      <div>
                        <h3 className="font-semibold">Predicción para próxima temporada</h3>
                        <div className="mt-2">
                          <p className="text-3xl font-bold text-primary">
                            {cropType === 'maiz' ? '9.2' : cropType === 'trigo' ? '7.8' : '9.7'} ton/ha
                          </p>
                          <p className="text-sm text-muted-foreground">
                            <span className="text-emerald-500">↑ {cropType === 'maiz' ? '5.7%' : cropType === 'trigo' ? '8.3%' : '6.6%'}</span> vs. temporada actual
                          </p>
                        </div>
                      </div>
                      <div className="mt-4">
                        <Badge variant="outline">Confianza: Alta</Badge>
                        <p className="text-xs text-muted-foreground mt-1">Basado en datos históricos de 5 años</p>
                      </div>
                    </div>
                    
                    <div className="bg-muted/50 rounded-lg p-4 md:w-2/3">
                      <h3 className="font-semibold">Recomendaciones</h3>
                      <ul className="mt-2 space-y-2">
                        <li className="flex items-start gap-2">
                          <div className="mt-1 h-4 w-4 rounded-full bg-green-500"></div>
                          <div>
                            <p className="font-medium">Optimizar sistema de riego</p>
                            <p className="text-sm text-muted-foreground">Implementar riego por goteo para reducir consumo de agua en un 23%</p>
                          </div>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="mt-1 h-4 w-4 rounded-full bg-blue-500"></div>
                          <div>
                            <p className="font-medium">Ajustar densidad de siembra</p>
                            <p className="text-sm text-muted-foreground">Aumentar densidad de siembra en zonas A y C para maximizar rendimiento</p>
                          </div>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="mt-1 h-4 w-4 rounded-full bg-yellow-500"></div>
                          <div>
                            <p className="font-medium">Plan de fertilización personalizado</p>
                            <p className="text-sm text-muted-foreground">Aplicar fertilizante rico en nitrógeno en etapas tempranas de crecimiento</p>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="variables" className="space-y-4">
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-2">Variable</th>
                          <th className="text-left p-2">Importancia (%)</th>
                          <th className="text-left p-2">Relación</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b hover:bg-muted/50">
                          <td className="p-2">Humedad del suelo</td>
                          <td className="p-2">28.4%</td>
                          <td className="p-2">Positiva</td>
                        </tr>
                        <tr className="border-b hover:bg-muted/50">
                          <td className="p-2">Precipitación acumulada</td>
                          <td className="p-2">21.7%</td>
                          <td className="p-2">Curvilínea</td>
                        </tr>
                        <tr className="border-b hover:bg-muted/50">
                          <td className="p-2">Temperatura media</td>
                          <td className="p-2">17.3%</td>
                          <td className="p-2">Curvilínea</td>
                        </tr>
                        <tr className="border-b hover:bg-muted/50">
                          <td className="p-2">Aplicación de nitrógeno</td>
                          <td className="p-2">14.8%</td>
                          <td className="p-2">Positiva</td>
                        </tr>
                        <tr className="border-b hover:bg-muted/50">
                          <td className="p-2">Densidad de siembra</td>
                          <td className="p-2">10.2%</td>
                          <td className="p-2">Curvilínea</td>
                        </tr>
                        <tr className="hover:bg-muted/50">
                          <td className="p-2">Otros factores</td>
                          <td className="p-2">7.6%</td>
                          <td className="p-2">Varios</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </TabsContent>
                
                <TabsContent value="metricas" className="space-y-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <p className="text-sm text-muted-foreground">RMSE</p>
                      <p className="text-2xl font-bold">0.41 ton/ha</p>
                    </div>
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <p className="text-sm text-muted-foreground">R²</p>
                      <p className="text-2xl font-bold">0.87</p>
                    </div>
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <p className="text-sm text-muted-foreground">MAE</p>
                      <p className="text-2xl font-bold">0.32 ton/ha</p>
                    </div>
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <p className="text-sm text-muted-foreground">Desviación</p>
                      <p className="text-2xl font-bold">±5.2%</p>
                    </div>
                  </div>
                  
                  <div className="bg-muted/30 p-4 rounded-lg mt-4">
                    <div className="flex justify-between items-center">
                      <h3 className="font-medium">Rendimiento del modelo</h3>
                      <Badge variant="outline">XGBoost</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">
                      El modelo muestra un alto rendimiento predictivo con un R² de 0.87, indicando que explica el 87% de la variabilidad en los datos de rendimiento de cultivos. El error cuadrático medio (RMSE) de 0.41 ton/ha es considerablemente bajo para este tipo de predicción.
                    </p>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter className="border-t pt-4 flex justify-between">
              <Button variant="outline" asChild>
                <a href="#">
                  <FileSpreadsheet className="h-4 w-4 mr-2" />
                  Descargar datos completos
                </a>
              </Button>
              <Button asChild>
                <Link to="/ai-models">
                  Ver todos los modelos
                  <ChevronRight className="h-4 w-4 ml-2" />
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
