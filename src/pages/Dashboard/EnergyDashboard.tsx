
import React, { useState } from 'react';
import DefaultLayout from '@/layouts/DefaultLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AreaChart, BarChart, LineChart, PieChart, ResponsiveContainer, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Line, Pie, Cell, Area } from 'recharts';
import { Separator } from '@/components/ui/separator';
import { Link } from 'react-router-dom';
import { AlertCircle, ArrowDown, ArrowUp, CalendarDays, ChevronRight, Clock, Download, ExternalLink, FileSpreadsheet, Leaf, Zap } from 'lucide-react';

// Datos de ejemplo para energía
const energyConsumptionData = [
  { name: 'Ene', consumo: 420, prediccion: 410 },
  { name: 'Feb', consumo: 390, prediccion: 400 },
  { name: 'Mar', consumo: 370, prediccion: 380 },
  { name: 'Abr', consumo: 345, prediccion: 350 },
  { name: 'May', consumo: 320, prediccion: 330 },
  { name: 'Jun', consumo: 310, prediccion: 300 },
  { name: 'Jul', consumo: 305, prediccion: 290 },
  { name: 'Ago', consumo: 310, prediccion: 305 },
  { name: 'Sep', consumo: 335, prediccion: 340 },
  { name: 'Oct', consumo: 365, prediccion: 370 },
  { name: 'Nov', consumo: 390, prediccion: 395 },
  { name: 'Dic', consumo: 415, prediccion: 420 }
];

const energySourceData = [
  { name: 'Solar', value: 35 },
  { name: 'Eólica', value: 25 },
  { name: 'Hidroeléctrica', value: 15 },
  { name: 'Gas Natural', value: 20 },
  { name: 'Otra', value: 5 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const peakDemandData = [
  { hour: '00:00', demanda: 240 },
  { hour: '02:00', demanda: 210 },
  { hour: '04:00', demanda: 190 },
  { hour: '06:00', demanda: 280 },
  { hour: '08:00', demanda: 420 },
  { hour: '10:00', demanda: 390 },
  { hour: '12:00', demanda: 410 },
  { hour: '14:00', demanda: 430 },
  { hour: '16:00', demanda: 440 },
  { hour: '18:00', demanda: 460 },
  { hour: '20:00', demanda: 480 },
  { hour: '22:00', demanda: 350 },
];

const solarPanelData = [
  { month: 'Ene', produccion: 95, capacidad: 120, irradiancia: 80 },
  { month: 'Feb', produccion: 110, capacidad: 120, irradiancia: 90 },
  { month: 'Mar', produccion: 125, capacidad: 120, irradiancia: 105 },
  { month: 'Abr', produccion: 130, capacidad: 120, irradiancia: 110 },
  { month: 'May', produccion: 140, capacidad: 120, irradiancia: 115 },
  { month: 'Jun', produccion: 150, capacidad: 120, irradiancia: 125 },
  { month: 'Jul', produccion: 155, capacidad: 120, irradiancia: 130 },
  { month: 'Ago', produccion: 145, capacidad: 120, irradiancia: 120 },
  { month: 'Sep', produccion: 130, capacidad: 120, irradiancia: 110 },
  { month: 'Oct', produccion: 115, capacidad: 120, irradiancia: 95 },
  { month: 'Nov', produccion: 100, capacidad: 120, irradiancia: 85 },
  { month: 'Dic', produccion: 90, capacidad: 120, irradiancia: 75 }
];

const EnergyDashboard = () => {
  const [energyType, setEnergyType] = useState('todas');
  const [timeFrame, setTimeFrame] = useState('year');

  return (
    <DefaultLayout>
      <div className="container mx-auto p-4 pb-16">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-1">Dashboard de Energía</h1>
            <p className="text-muted-foreground">
              Monitoreo de consumo, producción y eficiencia energética
            </p>
          </div>
          
          <div className="flex gap-2">
            <Select defaultValue={energyType} onValueChange={setEnergyType}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Fuente de Energía" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todas">Todas las fuentes</SelectItem>
                <SelectItem value="solar">Solar</SelectItem>
                <SelectItem value="eolica">Eólica</SelectItem>
                <SelectItem value="hidro">Hidroeléctrica</SelectItem>
                <SelectItem value="gas">Gas Natural</SelectItem>
              </SelectContent>
            </Select>
            
            <Button variant="outline">
              <CalendarDays className="h-4 w-4 mr-2" />
              <span>Último año</span>
            </Button>
            
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Exportar
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Consumo Total</CardTitle>
              <CardDescription>Último año</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4,320 MWh</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-emerald-500">↓ 8%</span> vs. año anterior
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Producción Renovable</CardTitle>
              <CardDescription>Último año</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3,250 MWh</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-emerald-500">↑ 15%</span> vs. año anterior
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Coste Energético</CardTitle>
              <CardDescription>Promedio por MWh</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">85.40€</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-emerald-500">↓ 3.2%</span> vs. año anterior
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Eficiencia Energética</CardTitle>
              <CardDescription>MWh por unidad de producción</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">92.7%</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-emerald-500">↑ 4.5%</span> vs. año anterior
              </p>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <Card>
            <CardHeader>
              <CardTitle>Consumo Energético vs. Predicción</CardTitle>
              <CardDescription>Últimos 12 meses (MWh)</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={energyConsumptionData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="consumo" 
                      name="Consumo Real"
                      stroke="#8884d8" 
                      strokeWidth={2}
                      activeDot={{ r: 8 }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="prediccion" 
                      name="Predicción"
                      stroke="#82ca9d" 
                      strokeWidth={2}
                      strokeDasharray="5 5"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Distribución por Fuente Energética</CardTitle>
              <CardDescription>Porcentaje del total de energía utilizada</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={energySourceData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={110}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {energySourceData.map((entry, index) => (
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
              <CardTitle>Demanda Energética Diaria</CardTitle>
              <CardDescription>Patrón de consumo por horas (kW)</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={peakDemandData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="hour" />
                    <YAxis />
                    <Tooltip />
                    <Area 
                      type="monotone" 
                      dataKey="demanda" 
                      name="Demanda (kW)"
                      stroke="#8884d8"
                      fill="#8884d8"
                      fillOpacity={0.3} 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between border-t pt-4">
              <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Hora Pico: 20:00</Badge>
              <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Hora Valle: 04:00</Badge>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div>
                <CardTitle>Rendimiento de Paneles Solares</CardTitle>
                <CardDescription>Producción vs. Capacidad Teórica (MWh)</CardDescription>
              </div>
              <Leaf className="h-5 w-5 text-emerald-500" />
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={solarPanelData}
                    margin={{
                      top: 20,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="produccion" name="Producción Real" fill="#82ca9d" />
                    <Bar dataKey="capacidad" name="Capacidad Teórica" fill="#8884d8" />
                    <Line 
                      type="monotone" 
                      dataKey="irradiancia" 
                      name="Irradiancia Solar" 
                      stroke="#ff7300" 
                      yAxisId={1}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
            <CardFooter className="border-t pt-4">
              <div className="w-full space-y-1">
                <div className="flex items-center justify-between text-sm">
                  <span>Eficiencia Media Anual</span>
                  <Badge variant="outline">89.4%</Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>Mayor Eficiencia</span>
                  <span className="text-green-600 flex items-center">
                    Julio
                    <ArrowUp className="h-3 w-3 ml-1" />
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>Menor Eficiencia</span>
                  <span className="text-red-600 flex items-center">
                    Diciembre
                    <ArrowDown className="h-3 w-3 ml-1" />
                  </span>
                </div>
              </div>
            </CardFooter>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Análisis Predictivo</CardTitle>
              <CardDescription>Resultados del modelo Prophet para predicción de consumo energético</CardDescription>
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
                        <h3 className="font-semibold">Predicción para próximo trimestre</h3>
                        <div className="mt-2">
                          <p className="text-3xl font-bold text-primary">1,058 MWh</p>
                          <p className="text-sm text-muted-foreground">
                            <span className="text-emerald-500">↓ 4.2%</span> vs. mismo periodo año anterior
                          </p>
                        </div>
                      </div>
                      <div className="mt-4">
                        <Badge variant="outline">Confianza: Alta</Badge>
                        <p className="text-xs text-muted-foreground mt-1">Basado en datos históricos de 3 años</p>
                      </div>
                    </div>
                    
                    <div className="bg-muted/50 rounded-lg p-4 md:w-2/3">
                      <h3 className="font-semibold">Recomendaciones</h3>
                      <ul className="mt-2 space-y-2">
                        <li className="flex items-start gap-2">
                          <div className="mt-1 h-4 w-4 rounded-full bg-green-500"></div>
                          <div>
                            <p className="font-medium">Aumentar capacidad solar</p>
                            <p className="text-sm text-muted-foreground">Añadir 15% de capacidad en paneles solares para optimizar producción en meses de verano</p>
                          </div>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="mt-1 h-4 w-4 rounded-full bg-blue-500"></div>
                          <div>
                            <p className="font-medium">Optimizar consumo en horas pico</p>
                            <p className="text-sm text-muted-foreground">Redistribuir operaciones intensivas en energía fuera del horario de 18:00 a 21:00</p>
                          </div>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="mt-1 h-4 w-4 rounded-full bg-yellow-500"></div>
                          <div>
                            <p className="font-medium">Implementar sistema de almacenamiento</p>
                            <p className="text-sm text-muted-foreground">Añadir baterías de 50kWh para almacenar excedente de producción solar</p>
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
                          <td className="p-2">Temperatura ambiente</td>
                          <td className="p-2">32.7%</td>
                          <td className="p-2">Positiva en verano, negativa en invierno</td>
                        </tr>
                        <tr className="border-b hover:bg-muted/50">
                          <td className="p-2">Hora del día</td>
                          <td className="p-2">24.3%</td>
                          <td className="p-2">Estacional</td>
                        </tr>
                        <tr className="border-b hover:bg-muted/50">
                          <td className="p-2">Día de la semana</td>
                          <td className="p-2">18.6%</td>
                          <td className="p-2">Mayor consumo días laborables</td>
                        </tr>
                        <tr className="border-b hover:bg-muted/50">
                          <td className="p-2">Irradiancia solar</td>
                          <td className="p-2">14.2%</td>
                          <td className="p-2">Positiva</td>
                        </tr>
                        <tr className="border-b hover:bg-muted/50">
                          <td className="p-2">Eventos especiales</td>
                          <td className="p-2">6.8%</td>
                          <td className="p-2">Variable</td>
                        </tr>
                        <tr className="hover:bg-muted/50">
                          <td className="p-2">Otros factores</td>
                          <td className="p-2">3.4%</td>
                          <td className="p-2">Varios</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </TabsContent>
                
                <TabsContent value="metricas" className="space-y-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <p className="text-sm text-muted-foreground">MAPE</p>
                      <p className="text-2xl font-bold">3.8%</p>
                    </div>
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <p className="text-sm text-muted-foreground">RMSE</p>
                      <p className="text-2xl font-bold">14.2 MWh</p>
                    </div>
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <p className="text-sm text-muted-foreground">MAE</p>
                      <p className="text-2xl font-bold">10.7 MWh</p>
                    </div>
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <p className="text-sm text-muted-foreground">R²</p>
                      <p className="text-2xl font-bold">0.92</p>
                    </div>
                  </div>
                  
                  <div className="bg-muted/30 p-4 rounded-lg mt-4">
                    <div className="flex justify-between items-center">
                      <h3 className="font-medium">Rendimiento del modelo</h3>
                      <Badge variant="outline">Prophet</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">
                      El modelo muestra un excelente rendimiento predictivo con un error porcentual absoluto medio (MAPE) de solo 3.8%, lo que indica predicciones muy precisas. El R² de 0.92 confirma que el modelo explica el 92% de la variabilidad en los datos de consumo energético.
                    </p>
                    <div className="mt-2 flex items-center gap-2 text-sm">
                      <AlertCircle className="h-4 w-4 text-amber-500" />
                      <span className="text-amber-500">
                        Los eventos climatológicos extremos pueden afectar la precisión del modelo.
                      </span>
                    </div>
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

export default EnergyDashboard;
