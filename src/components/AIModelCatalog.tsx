
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MODEL_CATEGORIES, AIModelInfo, getCategoryForModel } from '@/types/aiModels';
import ModelSelectionFlow from './ModelSelectionFlow';
import { ChartBar, Check, ChevronDown, ChevronRight, Search } from 'lucide-react';
import { Input } from './ui/input';
import { useToast } from '@/hooks/use-toast';

// Sample AI model data for visualization
const AI_MODELS: AIModelInfo[] = [
  {
    id: 'randomForest',
    name: 'Random Forest',
    type: 'classification',
    industry: 'tecnologia',
    applicableIndustries: ['retail', 'finanzas', 'tecnologia', 'manufactura'],
    description: 'Modelo de ensamble que combina múltiples árboles de decisión para clasificación y regresión.',
    use_cases: ['Predicción de churn', 'Detección de fraude', 'Segmentación de clientes'],
    benefits: ['Alta precisión', 'Manejo de datos complejos', 'Resistente al sobreajuste'],
    implementation_difficulty: 'intermedio',
    data_requirements: ['Datos estructurados', 'Variables categóricas y numéricas', 'Mínimo 1000 observaciones recomendadas'],
    typical_metrics: [
      { name: 'Precisión', description: 'Mide la proporción de predicciones positivas correctas' },
      { name: 'Recall', description: 'Mide la proporción de casos positivos reales que fueron identificados correctamente' },
      { name: 'F1-Score', description: 'Media armónica de precisión y recall' }
    ]
  },
  {
    id: 'kmeans',
    name: 'K-Means',
    type: 'clustering',
    industry: 'retail',
    applicableIndustries: ['retail', 'finanzas', 'tecnologia'],
    description: 'Algoritmo de agrupamiento que divide los datos en k clusters asignando cada punto al centroide más cercano.',
    use_cases: ['Segmentación de clientes', 'Análisis de comportamiento de compra', 'Detección de anomalías'],
    benefits: ['Fácil interpretación', 'Escalable', 'Eficiente computacionalmente'],
    implementation_difficulty: 'básico',
    data_requirements: ['Datos numéricos', 'Variables a escala similar', 'Sin valores atípicos extremos'],
    typical_metrics: [
      { name: 'Inercia', description: 'Suma de distancias al cuadrado de cada punto a su centroide más cercano' },
      { name: 'Silhouette Score', description: 'Mide qué tan similar es un objeto a su propio cluster en comparación con otros clusters' }
    ]
  },
  {
    id: 'sarima',
    name: 'SARIMA',
    type: 'time_series',
    industry: 'finanzas',
    applicableIndustries: ['retail', 'finanzas', 'energia', 'agricultura'],
    description: 'Modelo estadístico que captura dependencias temporales, tendencias y estacionalidad en series temporales.',
    use_cases: ['Pronóstico de ventas', 'Predicción de demanda energética', 'Análisis de tendencias financieras'],
    benefits: ['Captura estacionalidad', 'Manejo de tendencias', 'Intervalos de confianza'],
    implementation_difficulty: 'avanzado',
    data_requirements: ['Series temporales con frecuencia constante', 'Historia suficiente para identificar patrones estacionales', 'Estacionariedad'],
    typical_metrics: [
      { name: 'RMSE', description: 'Raíz del error cuadrático medio' },
      { name: 'MAPE', description: 'Error porcentual absoluto medio' },
      { name: 'AIC/BIC', description: 'Criterios de información para selección de modelos' }
    ]
  },
  {
    id: 'sentiment_analysis',
    name: 'Análisis de Sentimiento',
    type: 'nlp',
    industry: 'retail',
    applicableIndustries: ['retail', 'tecnologia', 'servicios'],
    description: 'Técnica de procesamiento de lenguaje natural que identifica y extrae opiniones subjetivas de textos.',
    use_cases: ['Análisis de comentarios de clientes', 'Monitoreo de redes sociales', 'Estudio de satisfacción'],
    benefits: ['Comprensión de la percepción del cliente', 'Identificación de problemas emergentes', 'Medición de impacto de campañas'],
    implementation_difficulty: 'avanzado',
    data_requirements: ['Textos en lenguaje natural', 'Corpus suficientemente grande', 'Preferiblemente con etiquetas de sentimiento'],
    typical_metrics: [
      { name: 'Precisión', description: 'Porcentaje de predicciones de sentimiento correctas' },
      { name: 'F1-Score', description: 'Balance entre precisión y exhaustividad' }
    ]
  },
  {
    id: 'topic_modeling',
    name: 'Modelado de Tópicos',
    type: 'nlp',
    industry: 'educacion',
    applicableIndustries: ['educacion', 'tecnologia', 'medios'],
    description: 'Técnica estadística que descubre temas abstractos presentes en una colección de documentos.',
    use_cases: ['Análisis de contenido educativo', 'Organización de documentos', 'Descubrimiento de tendencias'],
    benefits: ['Descubrimiento no supervisado de temas', 'Reducción de dimensionalidad', 'Organización automática de información'],
    implementation_difficulty: 'avanzado',
    data_requirements: ['Colección de documentos de texto', 'Preprocesamiento de texto', 'Vocabulario definido'],
    typical_metrics: [
      { name: 'Coherencia de tópicos', description: 'Mide la interpretabilidad de los temas descubiertos' },
      { name: 'Perplejidad', description: 'Evalúa qué tan bien el modelo predice una muestra' }
    ]
  },
  {
    id: 'linear_regression',
    name: 'Regresión Lineal',
    type: 'regression',
    industry: 'finanzas',
    applicableIndustries: ['finanzas', 'retail', 'manufactura', 'agricultura', 'energia', 'salud'],
    description: 'Modelo estadístico que examina la relación lineal entre una variable dependiente y una o más variables independientes.',
    use_cases: ['Predicción de ventas', 'Análisis de factores de precio', 'Estimación de rendimiento de cultivos', 'Predicción de consumo energético'],
    benefits: ['Fácil interpretación', 'Implementación simple', 'Resultados rápidos'],
    implementation_difficulty: 'básico',
    data_requirements: ['Variables numéricas relacionadas linealmente', 'Independencia de observaciones', 'Distribución normal de residuos'],
    typical_metrics: [
      { name: 'R²', description: 'Coeficiente de determinación que mide la bondad del ajuste' },
      { name: 'RMSE', description: 'Raíz del error cuadrático medio' }
    ]
  },
  {
    id: 'prophet',
    name: 'Prophet (Facebook)',
    type: 'time_series',
    industry: 'energia',
    applicableIndustries: ['energia', 'retail', 'finanzas', 'agricultura'],
    description: 'Modelo de forecasting para series temporales desarrollado por Facebook que maneja estacionalidades múltiples y datos faltantes.',
    use_cases: ['Predicción de demanda energética', 'Estimación de producción de energías renovables', 'Pronóstico de cosechas'],
    benefits: ['Manejo robusto de datos faltantes', 'Captura múltiples estacionalidades', 'Detección automática de cambios de tendencia'],
    implementation_difficulty: 'intermedio',
    data_requirements: ['Series temporales con frecuencia definida', 'Datos de fecha/hora y valor', 'Preferiblemente sin demasiados ceros'],
    typical_metrics: [
      { name: 'MAPE', description: 'Error porcentual absoluto medio' },
      { name: 'RMSE', description: 'Raíz del error cuadrático medio' }
    ]
  },
  {
    id: 'anova',
    name: 'ANOVA',
    type: 'statistical',
    industry: 'agricultura',
    applicableIndustries: ['agricultura', 'salud', 'educacion'],
    description: 'Análisis de varianza para comparar medias entre múltiples grupos y determinar si existen diferencias significativas.',
    use_cases: ['Comparación de rendimiento entre cultivos', 'Evaluación de métodos de riego', 'Análisis de efectividad de fertilizantes'],
    benefits: ['Comparaciones múltiples', 'Base estadística sólida', 'Fácil interpretación'],
    implementation_difficulty: 'básico',
    data_requirements: ['Variable dependiente continua', 'Una o más variables independientes categóricas', 'Distribución normal'],
    typical_metrics: [
      { name: 'Valor F', description: 'Estadístico que compara la varianza entre grupos con la varianza dentro de grupos' },
      { name: 'Valor p', description: 'Probabilidad de obtener un resultado igual o más extremo asumiendo que la hipótesis nula es cierta' }
    ]
  },
  {
    id: 'xgboost',
    name: 'XGBoost',
    type: 'classification',
    industry: 'agricultura',
    applicableIndustries: ['agricultura', 'finanzas', 'manufactura', 'salud'],
    description: 'Algoritmo de gradient boosting optimizado para rendimiento y eficiencia, efectivo para clasificación y regresión.',
    use_cases: ['Predicción de rendimiento de cultivos', 'Detección de plagas', 'Optimización de procesos agrícolas'],
    benefits: ['Alta precisión', 'Manejo de datos desbalanceados', 'Regularización integrada'],
    implementation_difficulty: 'intermedio',
    data_requirements: ['Datos estructurados', 'Variables numéricas y categóricas', 'Preferiblemente sin valores faltantes'],
    typical_metrics: [
      { name: 'Precisión', description: 'Porcentaje de predicciones correctas' },
      { name: 'AUC-ROC', description: 'Área bajo la curva ROC' },
      { name: 'Importancia de características', description: 'Ranking de las variables más predictivas' }
    ]
  },
  {
    id: 'chi_square',
    name: 'Chi Cuadrado',
    type: 'statistical',
    industry: 'salud',
    applicableIndustries: ['salud', 'educacion', 'retail'],
    description: 'Test estadístico utilizado para determinar si existe una asociación significativa entre variables categóricas.',
    use_cases: ['Análisis de asociación entre tratamientos y resultados', 'Estudio de factores de riesgo', 'Perfiles de consumidor'],
    benefits: ['Simple de implementar', 'Interpretación directa', 'Adecuado para datos categóricos'],
    implementation_difficulty: 'básico',
    data_requirements: ['Datos categóricos', 'Tamaño de muestra suficiente', 'Observaciones independientes'],
    typical_metrics: [
      { name: 'Estadístico Chi²', description: 'Medida de discrepancia entre frecuencias observadas y esperadas' },
      { name: 'Valor p', description: 'Probabilidad de obtener un resultado igual o más extremo asumiendo independencia' }
    ]
  }
];

const AIModelCatalog: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedModels, setExpandedModels] = useState<string[]>([]);
  const [models, setModels] = useState<AIModelInfo[]>(AI_MODELS);
  const { toast } = useToast();

  // Filtrar modelos basados en categoría y término de búsqueda
  useEffect(() => {
    let filtered = [...AI_MODELS];
    
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(model => {
        const category = getCategoryForModel(model.id);
        return category && category.id === selectedCategory;
      });
    }
    
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(model => 
        model.name.toLowerCase().includes(term) || 
        model.description.toLowerCase().includes(term) ||
        model.industry.toLowerCase().includes(term) ||
        (model.applicableIndustries && model.applicableIndustries.some(ind => ind.toLowerCase().includes(term)))
      );
    }
    
    setModels(filtered);
  }, [selectedCategory, searchTerm]);

  const toggleModelExpanded = (modelId: string) => {
    setExpandedModels(prev => 
      prev.includes(modelId) 
        ? prev.filter(id => id !== modelId) 
        : [...prev, modelId]
    );
  };

  const getDifficultyColor = (difficulty: string) => {
    switch(difficulty) {
      case 'básico': return 'bg-green-100 text-green-800';
      case 'intermedio': return 'bg-yellow-100 text-yellow-800';
      case 'avanzado': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="container mx-auto p-4 pb-20">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Modelos de Inteligencia Artificial</h1>
        <p className="text-muted-foreground">
          Explora nuestra biblioteca de modelos de IA y aprendizaje automático para distintas industrias y casos de uso.
        </p>
      </div>
      
      <div className="mb-8 flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-2/3">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar modelos por nombre, descripción o industria..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Categorías de Modelos</h2>
        <Tabs 
          defaultValue="all" 
          value={selectedCategory}
          onValueChange={setSelectedCategory}
          className="w-full"
        >
          <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-9 mb-4 w-full overflow-x-auto">
            <TabsTrigger value="all">Todos los Modelos</TabsTrigger>
            {MODEL_CATEGORIES.map(category => (
              <TabsTrigger key={category.id} value={category.id}>
                {category.name}
              </TabsTrigger>
            ))}
          </TabsList>
          
          <TabsContent value={selectedCategory}>
            {models.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
                {models.map(model => (
                  <Card key={model.id} className="overflow-hidden">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="flex items-center">
                            {model.name}
                          </CardTitle>
                          <CardDescription className="mt-1">
                            {model.description}
                          </CardDescription>
                        </div>
                        {model.implementation_difficulty && (
                          <Badge className={`${getDifficultyColor(model.implementation_difficulty)} ml-2`}>
                            {model.implementation_difficulty}
                          </Badge>
                        )}
                      </div>
                    </CardHeader>
                    
                    <CardContent>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {model.applicableIndustries && model.applicableIndustries.map((industry, idx) => (
                          <Badge key={idx} variant="outline">
                            {industry}
                          </Badge>
                        ))}
                        {model.type && (
                          <Badge variant="secondary">
                            {model.type}
                          </Badge>
                        )}
                      </div>

                      {expandedModels.includes(model.id) && (
                        <div className="mt-4 space-y-4">
                          {model.use_cases && model.use_cases.length > 0 && (
                            <div>
                              <h4 className="font-medium text-sm mb-1">Casos de uso:</h4>
                              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                                {model.use_cases.map((useCase, idx) => (
                                  <li key={idx}>{useCase}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                          
                          {model.benefits && model.benefits.length > 0 && (
                            <div>
                              <h4 className="font-medium text-sm mb-1">Beneficios:</h4>
                              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                                {model.benefits.map((benefit, idx) => (
                                  <li key={idx}>{benefit}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                          
                          {model.data_requirements && model.data_requirements.length > 0 && (
                            <div>
                              <h4 className="font-medium text-sm mb-1">Requisitos de datos:</h4>
                              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                                {model.data_requirements.map((req, idx) => (
                                  <li key={idx}>{req}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      )}
                      
                      <Button 
                        variant="ghost" 
                        className="p-0 h-auto mt-2"
                        onClick={() => toggleModelExpanded(model.id)}
                      >
                        {expandedModels.includes(model.id) ? (
                          <span className="flex items-center text-sm text-primary">
                            Menos detalles <ChevronDown className="ml-1 h-4 w-4" />
                          </span>
                        ) : (
                          <span className="flex items-center text-sm text-primary">
                            Más detalles <ChevronRight className="ml-1 h-4 w-4" />
                          </span>
                        )}
                      </Button>
                    </CardContent>
                    
                    <CardFooter>
                      <ModelSelectionFlow 
                        model={model}
                        trigger={
                          <Button className="w-full">
                            Seleccionar modelo
                          </Button>
                        }
                        onComplete={() => {
                          toast({
                            title: "Modelo seleccionado",
                            description: `Has seleccionado el modelo ${model.name} para tu análisis.`,
                          });
                        }}
                      />
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 border rounded-lg">
                <ChartBar className="h-12 w-12 mx-auto text-muted-foreground/50 mb-3" />
                <h3 className="text-xl font-medium mb-1">No se encontraron modelos</h3>
                <p className="text-muted-foreground">
                  No se encontraron modelos que coincidan con tus criterios. Intenta ajustar tu búsqueda.
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>

      <div className="mt-8 border-t pt-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">¿No encuentras lo que buscas?</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Nuestro equipo puede ayudarte a implementar soluciones personalizadas para tus necesidades específicas.
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Button asChild size="lg">
              <a href="/contact/general">Contactar a un experto</a>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <a href="https://wa.me/123456789?text=Me%20interesa%20saber%20más%20sobre%20sus%20modelos%20de%20analítica" target="_blank" rel="noopener noreferrer">
                <div className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-2"
                  >
                    <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
                    <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1Z" />
                    <path d="M14 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1Z" />
                    <path d="M9.5 13.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 0-1h-4a.5.5 0 0 0-.5.5Z" />
                  </svg>
                  Consultar por WhatsApp
                </div>
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIModelCatalog;
