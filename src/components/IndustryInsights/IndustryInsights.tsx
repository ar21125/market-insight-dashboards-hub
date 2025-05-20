
import React, { useState } from 'react';
import { IndustryInsight } from '@/types/analysis';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LineChart, BarChart, BarChart3, TrendingUp, AlertTriangle, Check, Activity } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface IndustryInsightsProps {
  industry: string;
  insights?: IndustryInsight;
}

// Information modal that provides detailed implementation information
const ImplementationInfoModal = ({ industry }: { industry: string }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          Ver proceso de implementación
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Proceso de análisis para {industry}</DialogTitle>
          <DialogDescription>
            Conozca el proceso detallado paso a paso y los requisitos para implementar análisis avanzados
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue="process" className="mt-4">
          <TabsList>
            <TabsTrigger value="process">Proceso</TabsTrigger>
            <TabsTrigger value="data">Datos necesarios</TabsTrigger>
            <TabsTrigger value="methods">Métodos analíticos</TabsTrigger>
            <TabsTrigger value="value">Valor de negocio</TabsTrigger>
          </TabsList>
          
          <TabsContent value="process" className="space-y-4 mt-4">
            <h3 className="text-lg font-medium">Proceso de implementación</h3>
            <ol className="space-y-4 mt-2">
              <li className="p-3 bg-muted/50 rounded-md">
                <h4 className="font-medium flex items-center gap-2">
                  <Badge>1</Badge>
                  Recopilación y validación de datos
                </h4>
                <p className="mt-1 text-sm text-muted-foreground">
                  Identificamos las fuentes de datos relevantes para el análisis y realizamos un proceso de validación para garantizar su calidad e integridad.
                </p>
                <p className="mt-2 text-sm flex items-center text-primary">
                  <Check className="h-4 w-4 mr-1" />
                  Tiempo estimado: 3-5 días
                </p>
              </li>
              
              <li className="p-3 bg-muted/50 rounded-md">
                <h4 className="font-medium flex items-center gap-2">
                  <Badge>2</Badge>
                  Preparación y transformación
                </h4>
                <p className="mt-1 text-sm text-muted-foreground">
                  Limpiamos, normalizamos y transformamos los datos según los requerimientos del modelo analítico seleccionado.
                </p>
                <p className="mt-2 text-sm flex items-center text-primary">
                  <Check className="h-4 w-4 mr-1" />
                  Tiempo estimado: 2-4 días
                </p>
              </li>
              
              <li className="p-3 bg-muted/50 rounded-md">
                <h4 className="font-medium flex items-center gap-2">
                  <Badge>3</Badge>
                  Modelado y entrenamiento
                </h4>
                <p className="mt-1 text-sm text-muted-foreground">
                  Aplicamos los algoritmos seleccionados a los datos preparados, optimizando los parámetros para obtener los mejores resultados.
                </p>
                <p className="mt-2 text-sm flex items-center text-primary">
                  <Check className="h-4 w-4 mr-1" />
                  Tiempo estimado: 1-2 semanas
                </p>
              </li>
              
              <li className="p-3 bg-muted/50 rounded-md">
                <h4 className="font-medium flex items-center gap-2">
                  <Badge>4</Badge>
                  Evaluación y ajuste
                </h4>
                <p className="mt-1 text-sm text-muted-foreground">
                  Validamos los resultados del modelo contra métricas de rendimiento establecidas y realizamos ajustes según sea necesario.
                </p>
                <p className="mt-2 text-sm flex items-center text-primary">
                  <Check className="h-4 w-4 mr-1" />
                  Tiempo estimado: 3-5 días
                </p>
              </li>
              
              <li className="p-3 bg-muted/50 rounded-md">
                <h4 className="font-medium flex items-center gap-2">
                  <Badge>5</Badge>
                  Implementación y monitoreo
                </h4>
                <p className="mt-1 text-sm text-muted-foreground">
                  Integramos el modelo en su entorno operativo y establecemos un proceso de monitoreo continuo para garantizar resultados óptimos.
                </p>
                <p className="mt-2 text-sm flex items-center text-primary">
                  <Check className="h-4 w-4 mr-1" />
                  Tiempo estimado: 1 semana
                </p>
              </li>
            </ol>
          </TabsContent>
          
          <TabsContent value="data" className="space-y-4 mt-4">
            <h3 className="text-lg font-medium">Datos necesarios para el análisis</h3>
            
            <div className="space-y-3 mt-2">
              <div className="p-3 border rounded-md">
                <h4 className="font-medium">Datos transaccionales</h4>
                <p className="mt-1 text-sm text-muted-foreground">
                  Registros históricos de transacciones, incluyendo fecha, monto, producto/servicio, cliente, ubicación, etc.
                </p>
                <p className="mt-1 text-sm">
                  <span className="font-medium">Formato:</span> CSV, Excel, Base de datos SQL
                </p>
                <p className="mt-1 text-sm">
                  <span className="font-medium">Período mínimo:</span> 12 meses
                </p>
              </div>
              
              <div className="p-3 border rounded-md">
                <h4 className="font-medium">Datos de clientes/usuarios</h4>
                <p className="mt-1 text-sm text-muted-foreground">
                  Información demográfica, historial de interacciones, preferencias, segmentación existente.
                </p>
                <p className="mt-1 text-sm">
                  <span className="font-medium">Formato:</span> CSV, Excel, CRM export
                </p>
              </div>
              
              <div className="p-3 border rounded-md">
                <h4 className="font-medium">Métricas operativas</h4>
                <p className="mt-1 text-sm text-muted-foreground">
                  KPIs relevantes para su industria, como tasas de conversión, tiempos de entrega, métricas de calidad.
                </p>
                <p className="mt-1 text-sm">
                  <span className="font-medium">Formato:</span> CSV, Excel, API
                </p>
              </div>
              
              <div className="p-3 border rounded-md">
                <h4 className="font-medium">Variables externas (opcional)</h4>
                <p className="mt-1 text-sm text-muted-foreground">
                  Datos del mercado, indicadores económicos, estacionalidad, eventos especiales que pueden influir en los resultados.
                </p>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="methods" className="space-y-4 mt-4">
            <h3 className="text-lg font-medium">Métodos analíticos utilizados</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
              <div className="p-3 border rounded-md">
                <h4 className="font-medium">Estadística descriptiva</h4>
                <p className="mt-1 text-sm text-muted-foreground">
                  Análisis exploratorio de datos para identificar patrones, tendencias, valores atípicos y distribuciones.
                </p>
                <div className="mt-2 flex flex-wrap gap-1">
                  <Badge variant="outline">Media/Mediana</Badge>
                  <Badge variant="outline">Desviación estándar</Badge>
                  <Badge variant="outline">Percentiles</Badge>
                </div>
              </div>
              
              <div className="p-3 border rounded-md">
                <h4 className="font-medium">Modelos de clustering</h4>
                <p className="mt-1 text-sm text-muted-foreground">
                  Segmentación automática para identificar grupos naturales en los datos.
                </p>
                <div className="mt-2 flex flex-wrap gap-1">
                  <Badge variant="outline">K-means</Badge>
                  <Badge variant="outline">DBSCAN</Badge>
                  <Badge variant="outline">Hierarchical</Badge>
                </div>
              </div>
              
              <div className="p-3 border rounded-md">
                <h4 className="font-medium">Series temporales</h4>
                <p className="mt-1 text-sm text-muted-foreground">
                  Análisis y predicción de datos secuenciales ordenados en el tiempo.
                </p>
                <div className="mt-2 flex flex-wrap gap-1">
                  <Badge variant="outline">ARIMA</Badge>
                  <Badge variant="outline">Prophet</Badge>
                  <Badge variant="outline">Exponential Smoothing</Badge>
                </div>
              </div>
              
              <div className="p-3 border rounded-md">
                <h4 className="font-medium">Machine Learning</h4>
                <p className="mt-1 text-sm text-muted-foreground">
                  Algoritmos avanzados para clasificación, regresión y análisis predictivo.
                </p>
                <div className="mt-2 flex flex-wrap gap-1">
                  <Badge variant="outline">Random Forest</Badge>
                  <Badge variant="outline">XGBoost</Badge>
                  <Badge variant="outline">Regresión Logística</Badge>
                </div>
              </div>
            </div>
            
            <div className="mt-4 p-3 bg-muted/50 rounded-md">
              <h4 className="font-medium">Implementaciones Open Source</h4>
              <p className="mt-1 text-sm text-muted-foreground">
                Utilizamos bibliotecas open source ampliamente validadas para garantizar la transparencia y calidad de los modelos:
              </p>
              <ul className="mt-2 space-y-1 text-sm">
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary" />
                  <span><strong>scikit-learn:</strong> Para modelos de clustering y clasificación</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary" />
                  <span><strong>statsmodels:</strong> Para análisis estadístico y series temporales</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary" />
                  <span><strong>Prophet:</strong> Para forecasting robusto de series temporales</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary" />
                  <span><strong>XGBoost:</strong> Para modelos de boosting de alta precisión</span>
                </li>
              </ul>
            </div>
          </TabsContent>
          
          <TabsContent value="value" className="space-y-4 mt-4">
            <h3 className="text-lg font-medium">Valor de negocio</h3>
            
            <div className="space-y-4 mt-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Beneficios tangibles</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-primary mt-1" />
                      <div>
                        <p className="font-medium">Optimización de ingresos</p>
                        <p className="text-sm text-muted-foreground">
                          Incremento promedio de 15-25% en conversión mediante personalización basada en análisis de comportamiento.
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-primary mt-1" />
                      <div>
                        <p className="font-medium">Reducción de costos operativos</p>
                        <p className="text-sm text-muted-foreground">
                          Disminución del 10-20% en costos mediante optimización de procesos basada en datos.
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-primary mt-1" />
                      <div>
                        <p className="font-medium">Mejora en retención de clientes</p>
                        <p className="text-sm text-muted-foreground">
                          Aumento promedio de 20-30% en tasas de retención mediante detección temprana de clientes en riesgo.
                        </p>
                      </div>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Ventaja competitiva</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-primary mt-1" />
                      <div>
                        <p className="font-medium">Toma de decisiones basadas en datos</p>
                        <p className="text-sm text-muted-foreground">
                          Reemplace la intuición con insights cuantitativos para decisiones estratégicas más precisas.
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-primary mt-1" />
                      <div>
                        <p className="font-medium">Personalización a escala</p>
                        <p className="text-sm text-muted-foreground">
                          Ofrezca experiencias personalizadas a cada cliente sin aumentar los costos operativos.
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-primary mt-1" />
                      <div>
                        <p className="font-medium">Anticipación de tendencias</p>
                        <p className="text-sm text-muted-foreground">
                          Identifique cambios en el mercado antes que sus competidores y adapte su estrategia proactivamente.
                        </p>
                      </div>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">ROI esperado</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-2 border-b">
                      <span className="font-medium">Corto plazo (3-6 meses)</span>
                      <Badge className="bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300">
                        150-200% ROI
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center p-2 border-b">
                      <span className="font-medium">Medio plazo (6-12 meses)</span>
                      <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                        300-400% ROI
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center p-2">
                      <span className="font-medium">Largo plazo (12+ meses)</span>
                      <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                        500%+ ROI
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="mt-6">
          <Button className="w-full" asChild>
            <Link to="/analysis-capabilities">
              Ver soluciones de análisis
            </Link>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

// Mock data for insights by industry
const mockInsights: Record<string, IndustryInsight> = {
  retail: {
    industry: "retail",
    key_metrics: [
      { 
        name: "Customer Lifetime Value (CLV)", 
        description: "Valor total que un cliente genera durante su relación con la empresa", 
        benefit: "Optimización de estrategias de retención y adquisición"
      },
      { 
        name: "Conversion Rate", 
        description: "Porcentaje de visitantes que realizan una compra", 
        benefit: "Medición de efectividad de marketing y UX" 
      },
      { 
        name: "Average Order Value (AOV)", 
        description: "Valor promedio de cada transacción", 
        benefit: "Evaluación de estrategias de cross-selling y pricing"
      }
    ],
    common_challenges: [
      {
        title: "Predicción de Demanda",
        description: "Dificultad para anticipar fluctuaciones en la demanda de productos",
        solution: "Modelos de forecasting que incorporan estacionalidad y factores externos"
      },
      {
        title: "Personalización a Escala",
        description: "Crear experiencias personalizadas para millones de usuarios",
        solution: "Sistemas de recomendación basados en collaborative filtering e historical behavior"
      }
    ],
    trending_analytics: [
      "Análisis de comportamiento omnicanal",
      "Optimización de inventario en tiempo real",
      "Detección de patrones de abandono de carrito",
      "Pricing dinámico basado en demanda"
    ],
    roi_stats: [
      {
        metric: "Incremento en conversión",
        value: "15-25%",
        description: "Mejora en tasa de conversión mediante personalización basada en análisis de comportamiento"
      },
      {
        metric: "Reducción de inventario",
        value: "20-30%",
        description: "Optimización de niveles de stock mediante predicción avanzada de demanda"
      }
    ]
  },
  finanzas: {
    industry: "finanzas",
    key_metrics: [
      { 
        name: "Risk-Adjusted Return", 
        description: "Rendimiento ajustado por el riesgo asumido", 
        benefit: "Evaluación integral del desempeño de inversiones" 
      },
      { 
        name: "Customer Churn Rate", 
        description: "Tasa de abandono de clientes", 
        benefit: "Identificación temprana de clientes en riesgo de abandono" 
      },
      { 
        name: "Loan Default Probability", 
        description: "Probabilidad de impago en préstamos", 
        benefit: "Optimización de políticas de crédito y provisiones" 
      }
    ],
    common_challenges: [
      {
        title: "Detección de Fraude",
        description: "Identificación de transacciones fraudulentas en tiempo real",
        solution: "Algoritmos de anomaly detection con aprendizaje continuo"
      },
      {
        title: "Evaluación de Riesgo Crediticio",
        description: "Análisis preciso del riesgo de impago en solicitantes",
        solution: "Modelos de scoring que incorporan datos alternativos y comportamentales"
      }
    ],
    trending_analytics: [
      "Modelos de credit scoring con datos alternativos",
      "Detección de fraude en tiempo real mediante IA",
      "Gestión algorítmica de portfolios",
      "Análisis predictivo de mercados financieros"
    ],
    roi_stats: [
      {
        metric: "Reducción de fraude",
        value: "60-80%",
        description: "Disminución en pérdidas por fraude mediante detección avanzada en tiempo real"
      },
      {
        metric: "Mejora en precisión crediticia",
        value: "25-40%",
        description: "Incremento en la precisión de modelos de riesgo mediante técnicas avanzadas de ML"
      }
    ]
  },
  salud: {
    industry: "salud",
    key_metrics: [
      { 
        name: "Readmission Rate", 
        description: "Porcentaje de pacientes readmitidos tras el alta", 
        benefit: "Evaluación de efectividad de tratamientos y protocolos de alta" 
      },
      { 
        name: "Diagnostic Accuracy", 
        description: "Precisión en diagnósticos médicos asistidos", 
        benefit: "Mejora en resultados clínicos y optimización de recursos" 
      },
      { 
        name: "Treatment Efficacy Index", 
        description: "Índice de eficacia de tratamientos por condición", 
        benefit: "Selección óptima de protocolos terapéuticos" 
      }
    ],
    common_challenges: [
      {
        title: "Predicción de Readmisiones",
        description: "Identificación de pacientes con alto riesgo de reingreso",
        solution: "Modelos predictivos que combinan datos clínicos, sociales y comportamentales"
      },
      {
        title: "Optimización de Recursos",
        description: "Asignación eficiente de personal y equipamiento médico",
        solution: "Algoritmos de programación y predicción de demanda adaptados al entorno hospitalario"
      }
    ],
    trending_analytics: [
      "Análisis predictivo de ocupación hospitalaria",
      "Optimización de flujos de pacientes",
      "Detección temprana de complicaciones",
      "Segmentación de pacientes por riesgo"
    ],
    roi_stats: [
      {
        metric: "Reducción de readmisiones",
        value: "15-25%",
        description: "Disminución en readmisiones hospitalarias mediante intervenciones preventivas"
      },
      {
        metric: "Optimización de recursos",
        value: "20-30%",
        description: "Mejora en la asignación de personal y equipamiento según demanda real"
      }
    ]
  },
  educacion: {
    industry: "educacion",
    key_metrics: [
      { 
        name: "Student Engagement Score", 
        description: "Medida de participación activa en el proceso educativo", 
        benefit: "Identificación temprana de estudiantes en riesgo de abandono" 
      },
      { 
        name: "Learning Progress Rate", 
        description: "Velocidad de adquisición de competencias", 
        benefit: "Personalización del ritmo y contenido educativo" 
      },
      { 
        name: "Knowledge Retention Index", 
        description: "Medida de retención de conocimientos a largo plazo", 
        benefit: "Evaluación de efectividad de métodos pedagógicos" 
      }
    ],
    common_challenges: [
      {
        title: "Personalización del Aprendizaje",
        description: "Adaptación de contenidos al ritmo y estilo de cada estudiante",
        solution: "Sistemas adaptativos que ajustan contenido y método según desempeño"
      },
      {
        title: "Predicción de Abandono Escolar",
        description: "Identificación temprana de estudiantes en riesgo",
        solution: "Modelos predictivos que combinan factores académicos, sociales y comportamentales"
      }
    ],
    trending_analytics: [
      "Learning analytics para personalización de contenidos",
      "Sistemas de recomendación de recursos educativos",
      "Análisis de patrones de aprendizaje efectivo",
      "Predicción temprana de dificultades académicas"
    ],
    roi_stats: [
      {
        metric: "Reducción de abandono",
        value: "30-50%",
        description: "Disminución en tasas de deserción mediante intervenciones tempranas basadas en análisis predictivo"
      },
      {
        metric: "Mejora en resultados",
        value: "15-25%",
        description: "Incremento en logros académicos mediante personalización basada en datos"
      }
    ]
  },
  tecnologia: {
    industry: "tecnologia",
    key_metrics: [
      { 
        name: "User Retention Rate", 
        description: "Porcentaje de usuarios que continúan utilizando el producto", 
        benefit: "Evaluación de engagement y valor percibido" 
      },
      { 
        name: "Feature Adoption Rate", 
        description: "Velocidad y alcance de adopción de nuevas funcionalidades", 
        benefit: "Optimización de roadmap de producto" 
      },
      { 
        name: "Time to Value", 
        description: "Tiempo requerido para que un usuario obtenga valor del producto", 
        benefit: "Mejora de procesos de onboarding y activación" 
      }
    ],
    common_challenges: [
      {
        title: "Optimización de Experiencia de Usuario",
        description: "Mejora continua de UX basada en comportamiento real",
        solution: "Análisis avanzado de interacción y testing multivariante"
      },
      {
        title: "Predicción de Churn",
        description: "Anticipación de abandonos para intervención preventiva",
        solution: "Modelos predictivos basados en patrones de uso y engagement"
      }
    ],
    trending_analytics: [
      "Product analytics basado en behavioral patterns",
      "Optimización de conversión mediante ML",
      "Detección de anomalías en comportamiento de usuarios",
      "Segmentación avanzada para personalización"
    ],
    roi_stats: [
      {
        metric: "Incremento en retención",
        value: "25-40%",
        description: "Aumento en retención de usuarios mediante experiencias personalizadas basadas en análisis de comportamiento"
      },
      {
        metric: "Optimización de conversión",
        value: "15-30%",
        description: "Mejora en tasas de conversión mediante testing multivariante y optimización algorítmica"
      }
    ]
  }
};

const IndustryInsights: React.FC<IndustryInsightsProps> = ({ industry, insights }) => {
  const industryData = insights || mockInsights[industry] || mockInsights.retail;
  
  // Map industry names to more readable format
  const industryNames: Record<string, string> = {
    retail: "Retail",
    finanzas: "Finanzas",
    salud: "Salud",
    educacion: "Educación",
    tecnologia: "Tecnología",
    manufactura: "Manufactura",
    agricultura: "Agricultura",
    energia: "Energía"
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            Insights para {industryNames[industry] || industry}
          </h2>
          <p className="text-muted-foreground">
            Estadísticas, tendencias y métricas clave para impulsar decisiones basadas en datos
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" size="sm" asChild>
            <Link to={`/dashboard/${industry}`}>
              <BarChart3 className="h-4 w-4 mr-2" /> Dashboard
            </Link>
          </Button>
          <Button variant="outline" size="sm" asChild>
            <Link to={`/analysis-capabilities`}>
              <Activity className="h-4 w-4 mr-2" /> Análisis
            </Link>
          </Button>
        </div>
      </div>

      {/* Key Metrics Section */}
      <div>
        <h3 className="text-lg font-semibold mb-3 flex items-center">
          <TrendingUp className="h-5 w-5 mr-2 text-primary" /> Métricas Clave
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {industryData.key_metrics.map((metric, index) => (
            <Card key={index} className="overflow-hidden border-l-4 border-l-primary">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">{metric.name}</CardTitle>
              </CardHeader>
              <CardContent className="pb-2">
                <p className="text-sm text-muted-foreground">{metric.description}</p>
              </CardContent>
              <CardFooter className="pt-0 text-sm">
                <Badge variant="secondary">Beneficio: {metric.benefit}</Badge>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

      {/* Common Challenges Section */}
      <div>
        <h3 className="text-lg font-semibold mb-3 flex items-center">
          <AlertTriangle className="h-5 w-5 mr-2 text-amber-500" /> Desafíos Comunes
        </h3>
        <Accordion type="single" collapsible className="w-full">
          {industryData.common_challenges.map((challenge, index) => (
            <AccordionItem key={index} value={`challenge-${index}`}>
              <AccordionTrigger className="text-base font-medium">
                {challenge.title}
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-3">
                  <p className="text-muted-foreground">{challenge.description}</p>
                  <div className="pl-4 border-l-2 border-primary">
                    <h4 className="text-sm font-medium flex items-center mb-1">
                      <Check className="h-4 w-4 mr-2 text-primary" /> Solución Recomendada
                    </h4>
                    <p className="text-sm">{challenge.solution}</p>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      {/* Trending Analytics Section */}
      <div>
        <h3 className="text-lg font-semibold mb-3 flex items-center">
          <LineChart className="h-5 w-5 mr-2 text-blue-500" /> Tendencias Analíticas
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {industryData.trending_analytics.map((trend, index) => (
            <div key={index} className="flex items-center p-3 rounded-md bg-muted/50">
              <span className="flex h-8 w-8 rounded-full bg-primary/10 items-center justify-center mr-3">
                <Badge variant="default" className="h-6 w-6 flex items-center justify-center rounded-full p-0">
                  {index + 1}
                </Badge>
              </span>
              <span className="text-sm">{trend}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ROI Statistics Section */}
      <div>
        <h3 className="text-lg font-semibold mb-3 flex items-center">
          <BarChart className="h-5 w-5 mr-2 text-green-500" /> Estadísticas de ROI
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {industryData.roi_stats.map((stat, index) => (
            <Card key={index} className="overflow-hidden">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-base">{stat.metric}</CardTitle>
                  <Badge className="text-lg font-bold bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                    {stat.value}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-sm text-muted-foreground">{stat.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      
      <div className="pt-4">
        <Card className="bg-gradient-to-r from-primary/10 to-transparent border-0">
          <CardContent className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6">
            <div>
              <h3 className="text-lg font-medium mb-2">¿Listo para transformar sus datos en valor?</h3>
              <p className="text-muted-foreground">Conozca el proceso de implementación paso a paso</p>
            </div>
            <ImplementationInfoModal industry={industryNames[industry] || industry} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default IndustryInsights;
