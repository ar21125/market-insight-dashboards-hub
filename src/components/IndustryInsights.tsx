
import React from 'react';
import { IndustryInsight } from '@/types/analysis';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LineChart, BarChart, BarChart3, TrendingUp, AlertTriangle, CheckCircle, Activity } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface IndustryInsightsProps {
  industry: string;
  insights?: IndustryInsight;
}

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
        title: "Diagnóstico Asistido por IA",
        description: "Apoyo a profesionales médicos en el diagnóstico preciso",
        solution: "Algoritmos de deep learning entrenados con millones de casos clínicos"
      }
    ],
    trending_analytics: [
      "Medicina personalizada basada en datos genómicos",
      "Optimización de flujos de pacientes mediante simulación",
      "Monitoreo remoto con IoT médico",
      "Detección temprana de epidemias mediante análisis de patrones"
    ],
    roi_stats: [
      {
        metric: "Reducción de readmisiones",
        value: "15-25%",
        description: "Disminución en readmisiones hospitalarias mediante intervenciones preventivas basadas en análisis predictivo"
      },
      {
        metric: "Optimización de recursos",
        value: "20-35%",
        description: "Mejora en la asignación de recursos hospitalarios mediante predicción de demanda y flujos de pacientes"
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
                      <CheckCircle className="h-4 w-4 mr-2 text-primary" /> Solución Recomendada
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
              <p className="text-muted-foreground">Descubra cómo nuestras soluciones analíticas pueden impulsar su negocio</p>
            </div>
            <Button size="lg" asChild>
              <Link to="/analysis-capabilities">Explorar soluciones</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default IndustryInsights;
