
import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Lightbulb, Database, ChartBar, Brain, Sparkles, Clock } from "lucide-react";
import { AnalysisFlow } from '@/types/analysis';

interface AnalysisCapabilityProps {
  industries?: string[];
}

export function AnalysisCapabilities({ industries = [
  'retail', 
  'finanzas', 
  'salud', 
  'manufactura', 
  'turismo', 
  'tecnologia', 
  'educacion'
]}: AnalysisCapabilityProps) {
  const [selectedIndustry, setSelectedIndustry] = useState<string>(industries[0]);

  const industryLabels: Record<string, string> = {
    'retail': 'Retail',
    'finanzas': 'Finanzas',
    'salud': 'Salud',
    'manufactura': 'Manufactura',
    'turismo': 'Turismo',
    'tecnologia': 'Tecnología',
    'educacion': 'Educación'
  };

  const industryColors: Record<string, { light: string, dark: string, badge: string }> = {
    'retail': { light: 'from-blue-50 to-indigo-100', dark: 'from-blue-900/20 to-indigo-900/30', badge: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300' },
    'finanzas': { light: 'from-emerald-50 to-green-100', dark: 'from-emerald-900/20 to-green-900/30', badge: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' },
    'salud': { light: 'from-red-50 to-rose-100', dark: 'from-red-900/20 to-rose-900/30', badge: 'bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-300' },
    'manufactura': { light: 'from-amber-50 to-yellow-100', dark: 'from-amber-900/20 to-yellow-900/30', badge: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300' },
    'turismo': { light: 'from-cyan-50 to-sky-100', dark: 'from-cyan-900/20 to-sky-900/30', badge: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-300' },
    'tecnologia': { light: 'from-violet-50 to-purple-100', dark: 'from-violet-900/20 to-purple-900/30', badge: 'bg-violet-100 text-violet-800 dark:bg-violet-900/30 dark:text-violet-300' },
    'educacion': { light: 'from-pink-50 to-fuchsia-100', dark: 'from-pink-900/20 to-fuchsia-900/30', badge: 'bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-300' }
  };
  
  // Analysis capabilities by industry
  const capabilityData: Record<string, Array<{
    title: string;
    description: string;
    icon: React.ElementType;
    capabilities: string[];
    benefits: string[];
    useCase: string;
  }>> = {
    'retail': [
      {
        title: "Análisis de Comportamiento del Cliente",
        description: "Descubre patrones de compra y predice futuras tendencias mediante machine learning avanzado.",
        icon: ChartBar,
        capabilities: ["Segmentación de clientes", "Predicción de churn", "Propensión a la compra", "Análisis de canasta de compras"],
        benefits: ["Aumento del CLV en 25%", "Reducción del churn en 30%", "Mejora en campañas personalizadas"],
        useCase: "Una cadena nacional de supermercados aumentó sus ventas un 18% al implementar recomendaciones basadas en análisis de canasta de compras y segmentación avanzada."
      },
      {
        title: "Optimización de Inventario",
        description: "Automatiza la gestión de inventario con previsión de demanda y reabastecimiento inteligente.",
        icon: Database,
        capabilities: ["Previsión de demanda con ARIMA/SARIMA", "Optimización de niveles de stock", "Detección de anomalías", "Gestión de obsolescencia"],
        benefits: ["Reducción de 35% en exceso de inventario", "Mejora de 22% en disponibilidad de productos", "Disminución de costos de almacenamiento"],
        useCase: "Un retailer de moda redujo sus costos de inventario en $2.3M anuales mientras mejoró la disponibilidad de productos en temporada alta."
      },
      {
        title: "Análisis de Sentimiento y Opiniones",
        description: "Comprende lo que dicen tus clientes con análisis avanzado de sentimiento basado en IA.",
        icon: Brain,
        capabilities: ["Análisis NLP de reviews", "Clasificación automática de opiniones", "Detección de temas emergentes", "Análisis multilingüe"],
        benefits: ["Identificación temprana de problemas", "Mejora de satisfacción del cliente", "Optimización de productos"],
        useCase: "Una tienda online mejoró su puntuación de satisfacción en un 4.2/5 a 4.8/5 tras identificar y resolver problemas señalados en análisis de sentimiento."
      }
    ],
    'finanzas': [
      {
        title: "Detección de Fraude en Tiempo Real",
        description: "Identifica y previene actividades fraudulentas mediante algoritmos de machine learning avanzados.",
        icon: Sparkles,
        capabilities: ["Detección de anomalías en tiempo real", "Análisis de comportamiento", "Sistemas de puntuación de riesgo", "Autenticación multifactorial basada en patrones"],
        benefits: ["Reducción de fraude en 65%", "Disminución de falsos positivos", "Ahorro promedio de $3.2M anuales"],
        useCase: "Un banco redujo sus pérdidas por fraude en 78% en los primeros 6 meses de implementación, mejorando simultáneamente la experiencia de usuario."
      },
      {
        title: "Evaluación Crediticia Avanzada",
        description: "Evalúa la solvencia mediante modelos predictivos más precisos que los métodos tradicionales.",
        icon: ChartBar,
        capabilities: ["Scoring crediticio con XGBoost", "Incorporación de datos alternativos", "Explicabilidad de decisiones (SHAP)", "Monitoreo de riesgo continuo"],
        benefits: ["Mejora en precisión de 23%", "Inclusión financiera ampliada", "Reducción de morosidad"],
        useCase: "Una fintech incrementó su base de clientes en 40% manteniendo tasas de morosidad por debajo del mercado gracias a modelos crediticios innovadores."
      },
      {
        title: "Gestión de Cartera Automatizada",
        description: "Optimiza carteras de inversión con algoritmos predictivos y rebalanceo automatizado.",
        icon: Brain,
        capabilities: ["Optimización mediante aprendizaje por refuerzo", "Análisis de factores macroeconómicos", "Backtesting avanzado", "Recomendaciones personalizadas"],
        benefits: ["Reducción del riesgo sistemático", "Mejora en rentabilidad ajustada al riesgo", "Experiencia de inversión personalizada"],
        useCase: "Un gestor de patrimonio incrementó los rendimientos de sus clientes en un 3.5% anual mientras reducía la volatilidad de las carteras."
      }
    ],
    'salud': [
      {
        title: "Predicción de Eventos Clínicos",
        description: "Anticipa complicaciones y readmisiones mediante modelos predictivos avanzados.",
        icon: Lightbulb,
        capabilities: ["Predicción de readmisiones", "Detección temprana de sepsis", "Identificación de factores de riesgo", "Priorización de atención"],
        benefits: ["Reducción de readmisiones en 32%", "Intervenciones más tempranas", "Optimización de recursos hospitalarios"],
        useCase: "Un hospital redujo sus tasas de readmisión en un 28% y mejoró los resultados clínicos mediante intervenciones preventivas basadas en predicciones."
      },
      {
        title: "Análisis de Imágenes Médicas",
        description: "Obtén diagnósticos preliminares asistidos por IA y detecta anomalías con mayor precisión.",
        icon: Brain,
        capabilities: ["Detección de tumores", "Clasificación de lesiones", "Segmentación de órganos", "Comparación con casos históricos"],
        benefits: ["Reducción de 45% en errores diagnósticos", "Disminución en tiempo de interpretación", "Segundo nivel de verificación"],
        useCase: "Un centro de diagnóstico por imagen incrementó su precisión diagnóstica del 82% al 95% con asistencia de IA, reduciendo diagnósticos tardíos."
      },
      {
        title: "Gestión Predictiva de Pacientes",
        description: "Optimiza flujos de atención y predice necesidades de recursos con analítica avanzada.",
        icon: ChartBar,
        capabilities: ["Predicción de ingresos", "Optimización de agendamiento", "Segmentación de pacientes por riesgo", "Recomendaciones de tratamiento"],
        benefits: ["Mejora de 28% en capacidad operativa", "Reducción de tiempos de espera", "Asignación óptima de recursos"],
        useCase: "Una red de clínicas aumentó su capacidad de atención en un 23% sin incrementar personal, solo optimizando flujos y recursos mediante análisis predictivo."
      }
    ],
    'manufactura': [
      {
        title: "Mantenimiento Predictivo Industrial",
        description: "Predice fallos de equipos antes de que ocurran mediante análisis avanzado de sensores IoT.",
        icon: Clock,
        capabilities: ["Predicción de fallos con series temporales", "Detección de anomalías en tiempo real", "Análisis de causa raíz", "Optimización de mantenimiento"],
        benefits: ["Reducción de 72% en tiempo de inactividad", "Extensión de vida útil de equipos", "Ahorro en repuestos y mano de obra"],
        useCase: "Una planta automotriz redujo su tiempo de inactividad no planificado en 85% y extendió la vida útil de equipos críticos en un 35%."
      },
      {
        title: "Optimización de Procesos Productivos",
        description: "Maximiza la eficiencia operativa con optimización basada en machine learning.",
        icon: ChartBar,
        capabilities: ["Simulación de líneas de producción", "Optimización multiparamétrica", "Reducción de desperdicios", "Planificación dinámica"],
        benefits: ["Incremento de 15-25% en productividad", "Reducción de costos operativos", "Mejora en calidad de producto"],
        useCase: "Un fabricante de componentes electrónicos incrementó su rendimiento de producción en 32% y redujo defectos en 58% mediante optimización de parámetros."
      },
      {
        title: "Control de Calidad Automatizado",
        description: "Detecta defectos y desviaciones de calidad con visión artificial e IA avanzada.",
        icon: Brain,
        capabilities: ["Inspección visual automatizada", "Predicción de defectos", "Control estadístico avanzado", "Trazabilidad end-to-end"],
        benefits: ["Reducción de 85% en defectos no detectados", "Disminución de devoluciones", "Mejora en reputación de marca"],
        useCase: "Una empresa de alimentos procesados eliminó virtualmente las devoluciones por defectos de calidad, logrando ahorros anuales de $1.8M."
      }
    ],
    'turismo': [
      {
        title: "Previsión de Demanda Dinámica",
        description: "Optimiza precios y disponibilidad con predicciones precisas de demanda turística.",
        icon: ChartBar,
        capabilities: ["Forecasting multivariable", "Análisis de estacionalidad", "Impacto de eventos", "Optimización de precios"],
        benefits: ["Incremento de 18% en RevPAR", "Mejora en tasas de ocupación", "Maximización de ingresos"],
        useCase: "Una cadena hotelera aumentó sus ingresos en temporada baja un 24% gracias a estrategias de precios dinámicos basados en previsión de demanda."
      },
      {
        title: "Personalización de Experiencias",
        description: "Crea experiencias turísticas personalizadas con recomendaciones basadas en IA.",
        icon: Sparkles,
        capabilities: ["Sistemas de recomendación colaborativos", "Análisis de preferencias", "Segmentación psicográfica", "Personalización en tiempo real"],
        benefits: ["Aumento de 32% en ventas cruzadas", "Mejora en satisfacción del cliente", "Incremento en fidelización"],
        useCase: "Un operador turístico incrementó su tasa de conversión en 45% y el valor medio por reserva en 28% mediante ofertas hiperpersonalizadas."
      },
      {
        title: "Análisis de Sentimiento y Reputación",
        description: "Monitorea y mejora tu reputación online con análisis avanzado de opiniones.",
        icon: Brain,
        capabilities: ["Procesamiento de lenguaje natural multilingüe", "Análisis contextual", "Identificación de tendencias", "Alertas tempranas"],
        benefits: ["Mejora en puntuaciones online", "Respuesta proactiva a problemas", "Optimización de servicios"],
        useCase: "Un resort de lujo mejoró su posición en rankings de TripAdvisor del #8 al #2 en su categoría tras implementar mejoras basadas en análisis de sentimiento."
      }
    ],
    'tecnologia': [
      {
        title: "Optimización de Desarrollo de Software",
        description: "Mejora la eficiencia y calidad del desarrollo con análisis predictivo de código.",
        icon: Brain,
        capabilities: ["Detección predictiva de bugs", "Optimización de procesos de CI/CD", "Análisis de dependencias", "Recomendaciones de arquitectura"],
        benefits: ["Reducción de 38% en tiempo de desarrollo", "Disminución de deuda técnica", "Mejora en calidad de código"],
        useCase: "Una empresa SaaS redujo sus tiempos de desarrollo en 40% y sus incidentes post-despliegue en 65% mediante optimización basada en datos."
      },
      {
        title: "Análisis Predictivo de Infraestructura",
        description: "Anticipa necesidades de infraestructura y previene problemas con modelos predictivos.",
        icon: ChartBar,
        capabilities: ["Predicción de carga de servidores", "Detección de anomalías en sistemas", "Optimización de recursos cloud", "Alertas predictivas"],
        benefits: ["Reducción de 72% en tiempo de inactividad", "Optimización de costos cloud", "Mejora en experiencia de usuario"],
        useCase: "Una plataforma de streaming redujo sus costos de infraestructura en 35% mientras mejoró la disponibilidad del servicio al 99.99%."
      },
      {
        title: "Análisis de Comportamiento de Usuarios",
        description: "Comprende y optimiza la experiencia de usuario con analítica avanzada de comportamiento.",
        icon: Lightbulb,
        capabilities: ["Mapeo de journey del usuario", "Segmentación por comportamiento", "Predicción de acciones", "Optimización de flujos"],
        benefits: ["Mejora de 45% en conversión", "Reducción de abandono", "Incremento en engagement"],
        useCase: "Una app de productividad aumentó su retención en 60% y su tiempo de uso diario en 28% tras implementar mejoras basadas en análisis comportamental."
      }
    ],
    'educacion': [
      {
        title: "Aprendizaje Adaptativo",
        description: "Personaliza la experiencia educativa con sistemas que se adaptan a cada estudiante.",
        icon: Brain,
        capabilities: ["Evaluación dinámica de conocimientos", "Rutas de aprendizaje personalizadas", "Identificación de estilos de aprendizaje", "Recomendación de contenidos"],
        benefits: ["Mejora de 32% en resultados académicos", "Incremento en motivación", "Reducción de abandono"],
        useCase: "Una institución educativa aumentó sus tasas de aprobación en un 28% y redujo el abandono escolar en un 45% mediante plataformas de aprendizaje adaptativo."
      },
      {
        title: "Predicción de Rendimiento Académico",
        description: "Identifica estudiantes en riesgo y factores de éxito con modelos predictivos.",
        icon: ChartBar,
        capabilities: ["Detección temprana de abandono", "Predicción de rendimiento", "Identificación de factores de éxito", "Intervenciones personalizadas"],
        benefits: ["Reducción de 40% en tasas de fracaso", "Mejora en intervenciones", "Optimización de recursos educativos"],
        useCase: "Una universidad redujo su tasa de abandono en primer año del 24% al 9% mediante identificación temprana e intervenciones basadas en análisis predictivo."
      },
      {
        title: "Análisis de Contenido Educativo",
        description: "Optimiza materiales didácticos con análisis de engagement y efectividad.",
        icon: Lightbulb,
        capabilities: ["Evaluación de efectividad de contenidos", "Análisis de engagement", "Recomendación de mejoras", "A/B testing de materiales"],
        benefits: ["Incremento de 35% en compromiso estudiantil", "Mejora en retención de conocimientos", "Optimización de recursos didácticos"],
        useCase: "Una plataforma de e-learning aumentó su tasa de finalización de cursos del 23% al 68% tras rediseñar contenidos basándose en análisis de engagement."
      }
    ]
  };

  // Dialog content for detailed info
  const DetailedInfoDialog = ({ industry, capability }: { industry: string, capability: { 
    title: string; 
    description: string; 
    icon: React.ElementType; 
    capabilities: string[]; 
    benefits: string[]; 
    useCase: string; 
  }}) => {
    const Icon = capability.icon;
    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="link" className="text-primary">Ver detalles</Button>
        </DialogTrigger>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-xl">
              <Icon className="h-6 w-6" />
              {capability.title}
            </DialogTitle>
            <DialogDescription className="text-base">
              {capability.description}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6 pt-4">
            <div>
              <h4 className="font-medium mb-2">Capacidades técnicas</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {capability.capabilities.map((cap, i) => (
                  <div key={i} className="flex items-center gap-2 p-2 bg-muted/50 rounded-md">
                    <div className="h-2 w-2 rounded-full bg-primary" />
                    <span>{cap}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-medium mb-2">Beneficios clave</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {capability.benefits.map((benefit, i) => (
                  <div key={i} className="flex items-center gap-2 p-2 bg-muted/50 rounded-md">
                    <div className="h-2 w-2 rounded-full bg-green-500" />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="p-4 border border-blue-200 dark:border-blue-900/40 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <h4 className="font-medium mb-2 text-blue-700 dark:text-blue-300">Caso de éxito</h4>
              <p>{capability.useCase}</p>
            </div>
            <div className="pt-4">
              <Button size="lg" className="w-full">
                Implementar esta solución <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  };

  return (
    <div className="container mx-auto py-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold tracking-tight mb-2">Soluciones de Análisis Avanzado</h2>
        <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
          Descubre cómo nuestras soluciones analíticas de vanguardia pueden transformar tu negocio con insights procesables y automatización inteligente.
        </p>
      </div>
      
      <Tabs 
        defaultValue={selectedIndustry} 
        onValueChange={setSelectedIndustry} 
        className="w-full"
      >
        <div className="flex justify-center mb-8">
          <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-2">
            {industries.map(industry => (
              <TabsTrigger 
                key={industry} 
                value={industry}
                className="px-4 py-2"
              >
                {industryLabels[industry]}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>
        
        {industries.map(industry => (
          <TabsContent key={industry} value={industry} className="mt-0 pt-2">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {(capabilityData[industry] || []).map((capability, idx) => {
                const Icon = capability.icon;
                const gradientClass = `bg-gradient-to-br ${
                  industryColors[industry]?.light || 'from-gray-50 to-gray-100'
                } dark:${
                  industryColors[industry]?.dark || 'from-gray-900/20 to-gray-800/30'
                }`;
                
                return (
                  <Card key={idx} className={`overflow-hidden border-0 shadow-md transition-all duration-300 hover:shadow-lg ${gradientClass}`}>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div className={`p-2 rounded-lg ${industryColors[industry]?.badge || 'bg-primary/10'}`}>
                          <Icon className="h-5 w-5" />
                        </div>
                        <Badge variant="outline" className={industryColors[industry]?.badge || ''}>
                          {industryLabels[industry]}
                        </Badge>
                      </div>
                      <CardTitle className="mt-4">{capability.title}</CardTitle>
                      <CardDescription className="text-base">
                        {capability.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <h4 className="text-sm font-medium mb-2">Capacidades clave:</h4>
                      <ul className="space-y-1">
                        {capability.capabilities.slice(0, 3).map((cap, i) => (
                          <li key={i} className="text-sm flex items-center gap-2">
                            <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                            <span>{cap}</span>
                          </li>
                        ))}
                        {capability.capabilities.length > 3 && (
                          <li className="text-sm text-muted-foreground">
                            + {capability.capabilities.length - 3} más...
                          </li>
                        )}
                      </ul>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <DetailedInfoDialog industry={industry} capability={capability} />
                      <Button variant="ghost" size="sm" className="gap-1">
                        Implementar <ArrowRight className="h-3 w-3" />
                      </Button>
                    </CardFooter>
                  </Card>
                );
              })}
            </div>
            
            <div className="mt-12 text-center">
              <Button variant="outline" size="lg">
                Ver más soluciones para {industryLabels[industry]}
              </Button>
            </div>
          </TabsContent>
        ))}
      </Tabs>
      
      <div className="mt-16 p-6 bg-muted/40 rounded-lg">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold">¿No encuentras lo que buscas?</h3>
          <p className="text-muted-foreground">
            Nuestro equipo de expertos puede crear una solución personalizada para tus necesidades específicas.
          </p>
        </div>
        
        <div className="flex justify-center">
          <Button size="lg" className="gap-2">
            <Sparkles className="h-4 w-4" /> Solicitar solución personalizada
          </Button>
        </div>
      </div>
    </div>
  );
}
