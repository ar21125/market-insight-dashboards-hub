import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription,
  CardFooter
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  BookOpen, 
  Code, 
  FileSpreadsheet, 
  Settings, 
  ChevronRight, 
  BarChart, 
  BrainCog,
  ArrowRight,
  Check
} from 'lucide-react';
import { AIModelInfo, MODEL_CATEGORIES, getCategoryForModel } from '@/types/aiModels';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Link } from 'react-router-dom';
import ModelSelectionFlow from '../ModelSelectionFlow';

// Sample models data
const SAMPLE_MODELS: AIModelInfo[] = [
  {
    id: 'kmeans',
    name: 'K-Means Clustering',
    type: 'clustering',
    industry: 'cross-industry',
    applicableIndustries: ['retail', 'finanzas', 'salud', 'educacion', 'tecnologia', 'agricultura', 'energia'],
    description: 'Algoritmo de clustering que agrupa datos según su similitud en un número específico de clusters.',
    use_cases: [
      'Segmentación de clientes',
      'Detección de anomalías',
      'Compresión de imágenes',
      'Análisis de mercado'
    ],
    benefits: [
      'Identificación de patrones ocultos en datos',
      'Segmentación automática sin supervisión',
      'Base para personalización y recomendaciones'
    ],
    implementation_difficulty: 'intermedio',
    data_requirements: [
      'Datos numéricos para todas las variables',
      'Preferiblemente escalados y normalizados',
      'Sin valores atípicos extremos'
    ],
    typical_metrics: [
      { name: 'Inercia', description: 'Suma de distancias cuadradas dentro del clúster' },
      { name: 'Silueta', description: 'Medida de cohesión y separación de clústeres' }
    ],
    parameters: [
      {
        name: 'n_clusters',
        description: 'Número de clusters a formar',
        type: 'numeric',
        required: true,
        default: 3
      },
      {
        name: 'init',
        description: 'Método de inicialización',
        type: 'categorical',
        required: false,
        default: 'k-means++',
        options: ['k-means++', 'random']
      }
    ]
  },
  {
    id: 'arima',
    name: 'ARIMA',
    type: 'time-series',
    industry: 'cross-industry',
    applicableIndustries: ['retail', 'finanzas', 'salud', 'manufactura', 'agricultura', 'energia'],
    description: 'Modelo estadístico para análisis y predicción de series temporales.',
    use_cases: [
      'Predicción de ventas',
      'Forecasting financiero',
      'Análisis de tendencias temporales',
      'Planificación de inventario'
    ],
    benefits: [
      'Captura patrones estacionales y tendencias',
      'Maneja datos con dependencia temporal',
      'Proporciona intervalos de confianza'
    ],
    implementation_difficulty: 'avanzado',
    data_requirements: [
      'Serie temporal con intervalos regulares',
      'Preferiblemente estacionaria o transformable',
      'Suficientes datos históricos (mínimo 50 puntos)'
    ],
    typical_metrics: [
      { name: 'MAE', description: 'Error Absoluto Medio' },
      { name: 'RMSE', description: 'Raíz del Error Cuadrático Medio' },
      { name: 'AIC/BIC', description: 'Criterios de información para selección de modelos' }
    ],
    parameters: [
      {
        name: 'p',
        description: 'Orden del componente autorregresivo',
        type: 'numeric',
        required: true,
        default: 1
      },
      {
        name: 'd',
        description: 'Orden de diferenciación',
        type: 'numeric',
        required: true,
        default: 1
      },
      {
        name: 'q',
        description: 'Orden del componente de media móvil',
        type: 'numeric',
        required: true,
        default: 1
      }
    ]
  },
  {
    id: 'randomForest',
    name: 'Random Forest',
    type: 'classification',
    industry: 'cross-industry',
    applicableIndustries: ['retail', 'finanzas', 'salud', 'educacion', 'tecnologia', 'agricultura', 'energia'],
    description: 'Algoritmo de ensemble learning que combina múltiples árboles de decisión para clasificación robusta.',
    use_cases: [
      'Detección de fraude',
      'Diagnóstico médico',
      'Predicción de churn',
      'Análisis de riesgo crediticio'
    ],
    benefits: [
      'Alta precisión de clasificación',
      'Resistente al sobreajuste',
      'Maneja valores atípicos y datos faltantes',
      'Proporciona importancia de características'
    ],
    implementation_difficulty: 'intermedio',
    data_requirements: [
      'Datos con variables categóricas y numéricas',
      'Set de entrenamiento balanceado (idealmente)',
      'Variables predictoras independientes'
    ],
    typical_metrics: [
      { name: 'Precisión', description: 'Proporción de predicciones positivas correctas' },
      { name: 'Recall', description: 'Proporción de positivos reales identificados correctamente' },
      { name: 'F1-Score', description: 'Media armónica de precisión y recall' },
      { name: 'AUC-ROC', description: 'Área bajo la curva ROC' }
    ],
    parameters: [
      {
        name: 'n_estimators',
        description: 'Número de árboles en el bosque',
        type: 'numeric',
        required: true,
        default: 100
      },
      {
        name: 'max_depth',
        description: 'Profundidad máxima de cada árbol',
        type: 'numeric',
        required: false,
        default: 5
      },
      {
        name: 'criterion',
        description: 'Función para medir calidad de división',
        type: 'categorical',
        required: false,
        default: 'gini',
        options: ['gini', 'entropy']
      }
    ]
  },
  {
    id: 'linear_regression',
    name: 'Regresión Lineal',
    type: 'regression',
    industry: 'cross-industry',
    applicableIndustries: ['retail', 'finanzas', 'salud', 'educacion', 'manufactura', 'agricultura', 'energia'],
    description: 'Modelo estadístico que establece relación lineal entre variables dependientes e independientes.',
    use_cases: [
      'Predicción de ventas',
      'Análisis de factores de precio',
      'Estimación de métricas de rendimiento',
      'Identificación de drivers de negocio'
    ],
    benefits: [
      'Interpretabilidad clara de resultados',
      'Análisis de impacto de variables',
      'Implementación simple y eficiente',
      'Base para modelos más complejos'
    ],
    implementation_difficulty: 'básico',
    data_requirements: [
      'Variables independientes numéricas o categóricas codificadas',
      'Variable dependiente continua',
      'Relaciones aproximadamente lineales'
    ],
    typical_metrics: [
      { name: 'R²', description: 'Coeficiente de determinación' },
      { name: 'RMSE', description: 'Raíz del Error Cuadrático Medio' },
      { name: 'MAE', description: 'Error Absoluto Medio' },
      { name: 'p-values', description: 'Significancia estadística de coeficientes' }
    ],
    parameters: [
      {
        name: 'fit_intercept',
        description: 'Incluir término independiente en el modelo',
        type: 'boolean',
        required: false,
        default: true
      },
      {
        name: 'normalize',
        description: 'Normalizar variables antes del ajuste',
        type: 'boolean',
        required: false,
        default: false
      }
    ]
  },
  {
    id: 'anova',
    name: 'ANOVA',
    type: 'statistical',
    industry: 'cross-industry',
    applicableIndustries: ['salud', 'agricultura', 'manufactura', 'educacion'],
    description: 'Análisis de varianza para comparar medias entre grupos y evaluar diferencias estadísticamente significativas.',
    use_cases: [
      'Comparación de efectividad de tratamientos',
      'Análisis de factores influyentes en rendimientos',
      'Estudios experimentales con múltiples grupos',
      'Validación de hipótesis científicas'
    ],
    benefits: [
      'Identificación rigurosa de diferencias significativas',
      'Base para diseño experimental',
      'Cuantificación de efectos de variables categóricas',
      'Respaldo estadístico para toma de decisiones'
    ],
    implementation_difficulty: 'intermedio',
    data_requirements: [
      'Variable dependiente continua',
      'Variables independientes categóricas (factores)',
      'Normalidad aproximada de residuos',
      'Homogeneidad de varianzas'
    ],
    typical_metrics: [
      { name: 'F-statistic', description: 'Ratio entre varianza entre grupos y varianza dentro de grupos' },
      { name: 'p-value', description: 'Probabilidad de obtener resultados tan extremos bajo hipótesis nula' },
      { name: 'Eta-squared', description: 'Medida de tamaño del efecto' }
    ],
    parameters: [
      {
        name: 'tipo',
        description: 'Tipo de ANOVA a realizar',
        type: 'categorical',
        required: true,
        default: 'one-way',
        options: ['one-way', 'two-way', 'repeated-measures', 'mixed']
      },
      {
        name: 'post_hoc',
        description: 'Test post-hoc para comparaciones',
        type: 'categorical',
        required: false,
        default: 'tukey',
        options: ['tukey', 'bonferroni', 'scheffe', 'fisher-lsd']
      }
    ]
  },
  {
    id: 'chi_square',
    name: 'Test Chi-Cuadrado',
    type: 'statistical',
    industry: 'cross-industry',
    applicableIndustries: ['salud', 'retail', 'finanzas', 'educacion'],
    description: 'Análisis estadístico para evaluar la independencia entre variables categóricas.',
    use_cases: [
      'Análisis de asociación entre características',
      'Evaluación de distribuciones observadas vs esperadas',
      'Verificación de homogeneidad de proporciones',
      'Validación de hipótesis en estudios demográficos'
    ],
    benefits: [
      'Simple de implementar e interpretar',
      'No requiere supuestos de normalidad',
      'Aplicable a múltiples variables categóricas',
      'Medidas de tamaño de efecto asociadas'
    ],
    implementation_difficulty: 'básico',
    data_requirements: [
      'Datos categóricos',
      'Conteos o frecuencias suficientes en cada celda',
      'Muestras independientes'
    ],
    typical_metrics: [
      { name: 'Estadístico Chi-cuadrado', description: 'Suma de diferencias al cuadrado entre valores observados y esperados' },
      { name: 'p-value', description: 'Probabilidad de obtener el estadístico bajo independencia' },
      { name: 'V de Cramér', description: 'Medida de asociación normalizada' }
    ],
    parameters: [
      {
        name: 'correction',
        description: 'Corrección de continuidad para tablas 2x2',
        type: 'boolean',
        required: false,
        default: true
      }
    ]
  },
  {
    id: 'ridge_regression',
    name: 'Regresión Ridge',
    type: 'regression',
    industry: 'cross-industry',
    applicableIndustries: ['finanzas', 'energia', 'tecnologia', 'manufactura'],
    description: 'Método de regresión lineal regularizada que penaliza el tamaño de los coeficientes para reducir el sobreajuste.',
    use_cases: [
      'Predicción con muchas variables correlacionadas',
      'Modelado de precios en mercados energéticos',
      'Pronósticos financieros estables',
      'Análisis de factores con multicolinealidad'
    ],
    benefits: [
      'Reduce sobreajuste en datos con muchas dimensiones',
      'Maneja variables correlacionadas mejor que la regresión lineal',
      'Estabiliza coeficientes para interpretación más confiable',
      'Mejora generalización en nuevos datos'
    ],
    implementation_difficulty: 'intermedio',
    data_requirements: [
      'Variables predictoras preferiblemente escaladas',
      'Variable objetivo continua',
      'Datos con posible multicolinealidad'
    ],
    typical_metrics: [
      { name: 'MSE/RMSE', description: 'Error cuadrático medio (regularizado)' },
      { name: 'R² ajustado', description: 'Coeficiente de determinación que considera regularización' },
      { name: 'Lambda óptimo', description: 'Parámetro de regularización seleccionado' }
    ],
    parameters: [
      {
        name: 'alpha',
        description: 'Fuerza de regularización',
        type: 'numeric',
        required: true,
        default: 1.0
      },
      {
        name: 'fit_intercept',
        description: 'Incluir término independiente',
        type: 'boolean',
        required: false,
        default: true
      },
      {
        name: 'normalize',
        description: 'Normalizar datos antes del ajuste',
        type: 'boolean',
        required: false,
        default: false
      }
    ]
  },
  {
    id: 'polynomial_regression',
    name: 'Regresión Polinómica',
    type: 'regression',
    industry: 'cross-industry',
    applicableIndustries: ['agricultura', 'manufactura', 'energia', 'finanzas'],
    description: 'Extensión de la regresión lineal que modela relaciones no lineales mediante términos polinómicos.',
    use_cases: [
      'Modelado de rendimientos agrícolas en función de factores ambientales',
      'Predicción de consumo energético según variables estacionales',
      'Análisis de relaciones no lineales precio-demanda',
      'Modelado de curvas de crecimiento'
    ],
    benefits: [
      'Captura relaciones no lineales que los modelos lineales no pueden',
      'Mantiene la interpretabilidad de coeficientes',
      'Flexibilidad para modelar distintos niveles de complejidad',
      'Implementación sencilla basada en regresión lineal'
    ],
    implementation_difficulty: 'intermedio',
    data_requirements: [
      'Variables independientes continuas',
      'Variable dependiente continua',
      'Relaciones no lineales en los datos'
    ],
    typical_metrics: [
      { name: 'R²', description: 'Coeficiente de determinación' },
      { name: 'RMSE', description: 'Raíz del error cuadrático medio' },
      { name: 'AIC/BIC', description: 'Criterios de información para selección de grado óptimo' }
    ],
    parameters: [
      {
        name: 'degree',
        description: 'Grado del polinomio',
        type: 'numeric',
        required: true,
        default: 2
      },
      {
        name: 'interaction_only',
        description: 'Incluir solo términos de interacción',
        type: 'boolean',
        required: false,
        default: false
      }
    ]
  }
];

interface ModelDetailDialogProps {
  model: AIModelInfo;
}

const ModelDetailDialog: React.FC<ModelDetailDialogProps> = ({ model }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          Ver detalles <ChevronRight className="h-4 w-4 ml-1" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl flex items-center gap-2">
            <BrainCog className="h-5 w-5 text-primary" />
            {model.name}
            <Badge variant="outline" className="ml-2">{model.type}</Badge>
          </DialogTitle>
          <DialogDescription>
            {model.description}
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mt-4">
          <div className="col-span-3 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Casos de uso</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {model.use_cases.map((useCase, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-primary mt-1" />
                      <span>{useCase}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Beneficios</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {model.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-green-500 mt-1" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {model.parameters && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Parámetros configurables</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {model.parameters.map((param, i) => (
                      <div key={i} className="border-b pb-3 last:border-0 last:pb-0">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium">{param.name}</h4>
                            <p className="text-sm text-muted-foreground">{param.description}</p>
                          </div>
                          <Badge variant={param.required ? "default" : "outline"}>
                            {param.required ? "Requerido" : "Opcional"}
                          </Badge>
                        </div>
                        <div className="mt-1 text-sm">
                          <span className="text-muted-foreground">Tipo:</span> {param.type}
                          {param.default !== undefined && (
                            <span className="ml-3">
                              <span className="text-muted-foreground">Valor por defecto:</span> {String(param.default)}
                            </span>
                          )}
                        </div>
                        {param.options && (
                          <div className="mt-1 flex flex-wrap gap-1">
                            {param.options.map((option, j) => (
                              <Badge key={j} variant="secondary">{option}</Badge>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          <div className="col-span-2 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Información general</CardTitle>
              </CardHeader>
              <CardContent>
                <dl className="space-y-2 text-sm">
                  <div>
                    <dt className="text-muted-foreground">Dificultad de implementación</dt>
                    <dd>
                      <Badge variant={
                        model.implementation_difficulty === 'básico' ? "outline" :
                        model.implementation_difficulty === 'intermedio' ? "secondary" : 
                        "default"
                      }>
                        {model.implementation_difficulty}
                      </Badge>
                    </dd>
                  </div>
                  
                  <div>
                    <dt className="text-muted-foreground">Industrias aplicables</dt>
                    <dd className="flex flex-wrap gap-1 mt-1">
                      {model.applicableIndustries?.map((industry, i) => (
                        <Badge key={i} variant="outline">
                          {industry}
                        </Badge>
                      ))}
                    </dd>
                  </div>
                </dl>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Requisitos de datos</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-1 text-sm">
                  {model.data_requirements.map((req, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <ArrowRight className="h-4 w-4 text-primary mt-1" />
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Métricas típicas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {model.typical_metrics.map((metric, i) => (
                    <div key={i} className="border-b pb-2 last:border-0 last:pb-0">
                      <h4 className="font-medium">{metric.name}</h4>
                      <p className="text-sm text-muted-foreground">{metric.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <Button className="w-full" asChild>
                  <Link to="/analysis-capabilities">Implementar este modelo</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

interface ImplementationSheetProps {
  model: AIModelInfo;
}

const ImplementationSheet: React.FC<ImplementationSheetProps> = ({ model }) => {
  return (
    <ModelSelectionFlow 
      model={model} 
      trigger={
        <Button size="sm">
          Implementar <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      }
    />
  );
};

const AIModelCatalog: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  // Filter models based on selected category
  const filteredModels = selectedCategory === 'all' 
    ? SAMPLE_MODELS 
    : SAMPLE_MODELS.filter(model => {
        const modelCategory = getCategoryForModel(model.id);
        return modelCategory?.id === selectedCategory;
      });

  // Added function to display category description in popover
  const getCategoryDescription = (categoryId: string): string => {
    const category = MODEL_CATEGORIES.find(cat => cat.id === categoryId);
    return category ? category.description : '';
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            Catálogo de modelos de IA
          </h2>
          <p className="text-muted-foreground">
            Explore nuestra biblioteca de modelos predictivos y analíticos para implementación en su organización
          </p>
        </div>
      </div>
      
      <Tabs defaultValue="all" onValueChange={setSelectedCategory}>
        <TabsList className="mb-4 flex overflow-x-auto pb-1">
          <TabsTrigger value="all">Todos</TabsTrigger>
          {MODEL_CATEGORIES.map(category => (
            <TabsTrigger key={category.id} value={category.id} className="relative group">
              {category.name}
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-5 w-5 absolute -right-2 -top-2 opacity-0 group-hover:opacity-100 bg-background border rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/></svg>
                    <span className="sr-only">Info</span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                  <div className="space-y-2">
                    <h4 className="font-medium">{category.name}</h4>
                    <p className="text-sm text-muted-foreground">{category.description}</p>
                    <div className="text-sm">
                      <span className="font-medium">Aplicaciones principales:</span> 
                      <ul className="mt-1 list-disc list-inside">
                        {category.id === 'time-series' && (
                          <>
                            <li>Predicción de demanda y ventas</li>
                            <li>Análisis de tendencias económicas</li>
                            <li>Detección de anomalías temporales</li>
                          </>
                        )}
                        {category.id === 'classification' && (
                          <>
                            <li>Detección de fraudes</li>
                            <li>Diagnóstico médico</li>
                            <li>Segmentación de clientes</li>
                          </>
                        )}
                        {category.id === 'clustering' && (
                          <>
                            <li>Segmentación de mercados</li>
                            <li>Agrupación de documentos</li>
                            <li>Detección de anomalías</li>
                          </>
                        )}
                        {category.id === 'statistical' && (
                          <>
                            <li>Validación de hipótesis científicas</li>
                            <li>Análisis de resultados experimentales</li>
                            <li>Estudios comparativos entre grupos</li>
                          </>
                        )}
                        {category.id === 'regression' && (
                          <>
                            <li>Predicción de valores cuantitativos</li>
                            <li>Análisis de factores de influencia</li>
                            <li>Modelado de relaciones entre variables</li>
                          </>
                        )}
                      </ul>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </TabsTrigger>
          ))}
        </TabsList>
        
        <TabsContent value={selectedCategory} className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredModels.map((model) => (
              <Card key={model.id} className="overflow-hidden">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{model.name}</CardTitle>
                    <Badge variant="outline">{model.type}</Badge>
                  </div>
                  <CardDescription>{model.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium mb-2">Aplicaciones principales:</h4>
                      <ul className="text-sm space-y-1">
                        {model.use_cases.slice(0, 3).map((useCase, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <Check className="h-4 w-4 text-primary mt-0.5" />
                            <span>{useCase}</span>
                          </li>
                        ))}
                        {model.use_cases.length > 3 && (
                          <Popover>
                            <PopoverTrigger className="text-xs text-muted-foreground underline cursor-pointer ml-6">
                              +{model.use_cases.length - 3} más
                            </PopoverTrigger>
                            <PopoverContent>
                              <ul className="text-sm space-y-1">
                                {model.use_cases.slice(3).map((useCase, i) => (
                                  <li key={i} className="flex items-start gap-2">
                                    <Check className="h-4 w-4 text-primary mt-0.5" />
                                    <span>{useCase}</span>
                                  </li>
                                ))}
                              </ul>
                            </PopoverContent>
                          </Popover>
                        )}
                      </ul>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <Badge variant={
                        model.implementation_difficulty === 'básico' ? "outline" :
                        model.implementation_difficulty === 'intermedio' ? "secondary" : 
                        "default"
                      }>
                        {model.implementation_difficulty}
                      </Badge>
                      <span className="text-muted-foreground">
                        {model.applicableIndustries?.length} industrias aplicables
                      </span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <ModelDetailDialog model={model} />
                  <ImplementationSheet model={model} />
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AIModelCatalog;
