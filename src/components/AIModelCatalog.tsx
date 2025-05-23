
import React, { useState } from 'react';
import { AIModelInfo, MODEL_CATEGORIES, getCategoryForModel } from '@/types/aiModels';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { CheckCircle, ChevronDown, ChevronRight, BarChart3, Brain, FlaskConical, Database, ChartPie, Search } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

// Sample AI models data
const aiModels: AIModelInfo[] = [
  {
    id: "randomForest",
    name: "Random Forest",
    type: "classification",
    industry: "tecnologia",
    applicableIndustries: ["tecnologia", "retail", "finanzas", "salud"],
    description: "Modelo de ensamble que combina múltiples árboles de decisión para clasificación y regresión.",
    use_cases: [
      "Predicción de comportamiento de usuarios",
      "Detección de fraude financiero",
      "Segmentación de clientes",
      "Diagnóstico médico asistido"
    ],
    benefits: [
      "Alta precisión en problemas complejos",
      "Robustez ante outliers y ruido",
      "Manejo nativo de datos categóricos y numéricos",
      "Cálculo de importancia de variables"
    ],
    implementation_difficulty: "intermedio",
    data_requirements: [
      "Conjunto de datos etiquetados",
      "Variables predictoras estructuradas",
      "Preferiblemente balanceado entre clases"
    ],
    typical_metrics: [
      { name: "Precisión", description: "Porcentaje de predicciones correctas" },
      { name: "Recall", description: "Capacidad para encontrar todos los casos positivos" },
      { name: "F1-Score", description: "Media armónica entre precisión y recall" },
      { name: "Área ROC", description: "Calidad de la separación entre clases" }
    ]
  },
  {
    id: "kmeans",
    name: "K-Means",
    type: "clustering",
    industry: "retail",
    applicableIndustries: ["retail", "tecnologia", "finanzas", "manufactura"],
    description: "Algoritmo de agrupamiento que divide los datos en k clusters asignando cada punto al centroide más cercano.",
    use_cases: [
      "Segmentación de clientes",
      "Detección de anomalías",
      "Análisis de patrones de comportamiento",
      "Compresión de imágenes"
    ],
    benefits: [
      "Algoritmo simple e intuitivo",
      "Escalable a grandes conjuntos de datos",
      "Fácil interpretación de resultados",
      "Rápida convergencia en la mayoría de casos"
    ],
    implementation_difficulty: "básico",
    data_requirements: [
      "Datos numéricos",
      "Preferiblemente normalizados",
      "Sin valores atípicos extremos"
    ],
    typical_metrics: [
      { name: "Inercia", description: "Suma de distancias al cuadrado a centroides" },
      { name: "Silueta", description: "Medida de cohesión interna vs separación externa" },
      { name: "Davies-Bouldin", description: "Ratio de dispersión intra-cluster vs inter-cluster" }
    ]
  },
  {
    id: "sarima",
    name: "SARIMA",
    type: "time_series",
    industry: "finanzas",
    applicableIndustries: ["finanzas", "retail", "energia", "manufactura"],
    description: "Modelo estadístico que captura dependencias temporales, tendencias y estacionalidad en series de tiempo.",
    use_cases: [
      "Pronóstico de ventas",
      "Predicción de demanda energética",
      "Análisis de indicadores financieros",
      "Planificación de inventario"
    ],
    benefits: [
      "Captura patrones estacionales complejos",
      "Manejo efectivo de tendencias",
      "Intervalos de confianza para predicciones",
      "Interpretabilidad de componentes"
    ],
    implementation_difficulty: "avanzado",
    data_requirements: [
      "Serie temporal estacionaria (o transformable)",
      "Sin cambios estructurales significativos",
      "Datos a intervalos regulares",
      "Suficiente historia para capturar estacionalidad"
    ],
    typical_metrics: [
      { name: "RMSE", description: "Error cuadrático medio de predicciones" },
      { name: "MAPE", description: "Error porcentual absoluto medio" },
      { name: "AIC/BIC", description: "Criterios de información para selección de modelo" }
    ]
  },
  {
    id: "nlp_sentiment",
    name: "Análisis de Sentimiento",
    type: "nlp",
    industry: "tecnologia",
    applicableIndustries: ["tecnologia", "retail", "servicios", "turismo", "educacion"],
    description: "Técnica de procesamiento de lenguaje natural que identifica y extrae opiniones subjetivas de textos.",
    use_cases: [
      "Análisis de feedback de clientes",
      "Monitoreo de reputación de marca",
      "Análisis de tendencias en redes sociales",
      "Categorización de reseñas de productos"
    ],
    benefits: [
      "Procesamiento automático de grandes volúmenes de texto",
      "Identificación de tendencias en opiniones",
      "Detección de problemas emergentes",
      "Medición de impacto de campañas"
    ],
    implementation_difficulty: "avanzado",
    data_requirements: [
      "Corpus de textos en el idioma objetivo",
      "Idealmente con etiquetas de sentimiento para entrenamiento",
      "Textos representativos del dominio a analizar"
    ],
    typical_metrics: [
      { name: "Precisión", description: "Exactitud en la clasificación de sentimientos" },
      { name: "Recall", description: "Capacidad para detectar todos los sentimientos relevantes" },
      { name: "F1-Score", description: "Balance entre precisión y recall" }
    ]
  },
  {
    id: "topic_modeling",
    name: "Modelado de Tópicos",
    type: "nlp",
    industry: "educacion",
    applicableIndustries: ["educacion", "tecnologia", "medios", "investigacion"],
    description: "Técnica estadística que descubre temas abstractos presentes en una colección de documentos.",
    use_cases: [
      "Análisis de contenidos educativos",
      "Descubrimiento de tendencias en investigación",
      "Categorización automática de documentos",
      "Análisis de feedback de estudiantes"
    ],
    benefits: [
      "Descubrimiento de estructura temática no evidente",
      "Procesamiento de grandes volúmenes de texto",
      "Organización automática de información",
      "Identificación de relaciones entre conceptos"
    ],
    implementation_difficulty: "avanzado",
    data_requirements: [
      "Corpus de documentos de texto",
      "Preprocesamiento de texto (tokenización, eliminación de stopwords)",
      "Cantidad suficiente de documentos para identificar patrones"
    ],
    typical_metrics: [
      { name: "Coherencia", description: "Medida de interpretabilidad de los tópicos" },
      { name: "Perplejidad", description: "Evaluación de capacidad predictiva del modelo" }
    ]
  }
];

interface AIModelCatalogProps {
  industry?: string;
  onModelSelect?: (model: AIModelInfo) => void;
}

const AIModelCatalog: React.FC<AIModelCatalogProps> = ({ 
  industry, 
  onModelSelect 
}) => {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [expandedModel, setExpandedModel] = useState<string | null>(null);
  
  const filteredModels = industry 
    ? aiModels.filter(model => 
        model.industry === industry || 
        model.applicableIndustries?.includes(industry)
      )
    : aiModels;
    
  const categoryModels = activeCategory === 'all' 
    ? filteredModels 
    : filteredModels.filter(model => getCategoryForModel(model.id)?.id === activeCategory);

  const getCategoryIcon = (categoryId: string) => {
    switch(categoryId) {
      case 'time-series': return <ChartPie className="h-4 w-4" />;
      case 'classification': return <CheckCircle className="h-4 w-4" />;
      case 'clustering': return <Database className="h-4 w-4" />;
      case 'deep-learning': return <Brain className="h-4 w-4" />;
      case 'nlp': return <Search className="h-4 w-4" />;
      default: return <BarChart3 className="h-4 w-4" />;
    }
  };
  
  const getDifficultyColor = (difficulty: string) => {
    switch(difficulty) {
      case 'básico': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'intermedio': return 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300';
      case 'avanzado': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
    }
  };

  return (
    <div className="w-full">
      <Tabs defaultValue="all" onValueChange={setActiveCategory} className="w-full">
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-2">Categorías de Modelos</h3>
          <ScrollArea className="w-full whitespace-nowrap pb-3">
            <TabsList className="h-9 grid-cols-auto">
              <TabsTrigger value="all" className="h-8">
                Todos los Modelos
              </TabsTrigger>
              {MODEL_CATEGORIES.map(category => (
                <TabsTrigger key={category.id} value={category.id} className="h-8">
                  <span className="flex items-center gap-2">
                    {getCategoryIcon(category.id)}
                    {category.name}
                  </span>
                </TabsTrigger>
              ))}
            </TabsList>
          </ScrollArea>
        </div>
        
        <TabsContent value={activeCategory} className="mt-0">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {categoryModels.map((model) => (
              <Card key={model.id} className="overflow-hidden hover:border-primary/50 transition-colors">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {getCategoryIcon(getCategoryForModel(model.id)?.id || '')}
                      <CardTitle className="text-lg">{model.name}</CardTitle>
                    </div>
                    <Badge className={`${getDifficultyColor(model.implementation_difficulty)}`}>
                      {model.implementation_difficulty}
                    </Badge>
                  </div>
                  <CardDescription className="mt-2 line-clamp-2">{model.description}</CardDescription>
                </CardHeader>
                
                <CardContent className="pb-2">
                  <div className="flex flex-wrap gap-1 mb-3">
                    {model.applicableIndustries?.slice(0, 3).map(ind => (
                      <Badge key={ind} variant="outline" className="text-xs">
                        {ind}
                      </Badge>
                    ))}
                    {model.applicableIndustries && model.applicableIndustries.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{model.applicableIndustries.length - 3}
                      </Badge>
                    )}
                  </div>
                  
                  <Accordion
                    type="single"
                    collapsible
                    value={expandedModel === model.id ? 'details' : undefined}
                    onValueChange={(value) => setExpandedModel(value === 'details' ? model.id : null)}
                  >
                    <AccordionItem value="details" className="border-0">
                      <AccordionTrigger className="py-1 text-sm font-medium text-primary">
                        {expandedModel === model.id ? 'Menos detalles' : 'Más detalles'}
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-3 text-sm">
                          <div>
                            <h4 className="font-medium mb-1">Casos de uso:</h4>
                            <ul className="list-disc list-inside">
                              {model.use_cases.slice(0, 3).map((useCase, idx) => (
                                <li key={idx}>{useCase}</li>
                              ))}
                            </ul>
                          </div>
                          
                          <div>
                            <h4 className="font-medium mb-1">Beneficios:</h4>
                            <ul className="list-disc list-inside">
                              {model.benefits.slice(0, 3).map((benefit, idx) => (
                                <li key={idx}>{benefit}</li>
                              ))}
                            </ul>
                          </div>
                          
                          <div>
                            <h4 className="font-medium mb-1">Métricas típicas:</h4>
                            <ul className="list-disc list-inside">
                              {model.typical_metrics.slice(0, 2).map((metric, idx) => (
                                <li key={idx}><span className="font-medium">{metric.name}:</span> {metric.description}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
                
                <CardFooter className="pt-0">
                  <Button 
                    variant="default" 
                    size="sm" 
                    className="w-full mt-2"
                    onClick={() => onModelSelect && onModelSelect(model)}
                  >
                    Seleccionar modelo
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          
          {categoryModels.length === 0 && (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No se encontraron modelos para esta categoría.</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AIModelCatalog;
