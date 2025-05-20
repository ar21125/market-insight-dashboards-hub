
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

// Sample models data
const SAMPLE_MODELS: AIModelInfo[] = [
  {
    id: 'kmeans',
    name: 'K-Means Clustering',
    type: 'clustering',
    industry: 'cross-industry',
    applicableIndustries: ['retail', 'finanzas', 'salud', 'educacion', 'tecnologia'],
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
    applicableIndustries: ['retail', 'finanzas', 'salud', 'manufactura'],
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
    applicableIndustries: ['retail', 'finanzas', 'salud', 'educacion', 'tecnologia'],
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
    applicableIndustries: ['retail', 'finanzas', 'salud', 'educacion', 'manufactura'],
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
    <Sheet>
      <SheetTrigger asChild>
        <Button size="sm">
          Implementar <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </SheetTrigger>
      <SheetContent className="md:max-w-lg overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Implementar {model.name}</SheetTitle>
          <SheetDescription>
            Guía paso a paso para implementar este modelo en su organización
          </SheetDescription>
        </SheetHeader>
        
        <div className="mt-6 space-y-6">
          <div className="space-y-3">
            <h3 className="font-medium flex items-center">
              <FileSpreadsheet className="h-4 w-4 mr-2 text-primary" /> 
              Preparación de datos
            </h3>
            <div className="bg-muted/50 rounded-md p-3 space-y-2">
              <p className="text-sm">Para implementar {model.name}, necesitará:</p>
              <ul className="space-y-1 text-sm">
                {model.data_requirements.map((req, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-primary mt-1" />
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="space-y-3">
            <h3 className="font-medium flex items-center">
              <Settings className="h-4 w-4 mr-2 text-primary" /> 
              Configuración del modelo
            </h3>
            <div className="bg-muted/50 rounded-md p-3">
              {model.parameters ? (
                <div className="space-y-3">
                  <p className="text-sm">Parámetros clave a considerar:</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {model.parameters.slice(0, 4).map((param, i) => (
                      <div key={i} className="text-sm border rounded-md p-2">
                        <p className="font-medium">{param.name}</p>
                        <p className="text-xs text-muted-foreground">Valor por defecto: {String(param.default)}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <p className="text-sm">No requiere configuración especial de parámetros.</p>
              )}
            </div>
          </div>
          
          <div className="space-y-3">
            <h3 className="font-medium flex items-center">
              <BarChart className="h-4 w-4 mr-2 text-primary" /> 
              Evaluación
            </h3>
            <div className="bg-muted/50 rounded-md p-3 space-y-2">
              <p className="text-sm">Métricas para evaluar el rendimiento:</p>
              <ul className="space-y-1 text-sm">
                {model.typical_metrics.map((metric, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-primary mt-1" />
                    <span><span className="font-medium">{metric.name}</span>: {metric.description}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="space-y-3">
            <h3 className="font-medium flex items-center">
              <Code className="h-4 w-4 mr-2 text-primary" /> 
              Implementación técnica
            </h3>
            <div className="bg-muted/50 rounded-md p-3">
              <p className="text-sm">Nuestra plataforma le permite implementar este modelo de dos maneras:</p>
              <div className="mt-3 space-y-2">
                <div className="flex items-center p-2 border rounded-md bg-background">
                  <BookOpen className="h-4 w-4 mr-2 text-primary" />
                  <span className="text-sm">Interfaz guiada sin código</span>
                </div>
                <div className="flex items-center p-2 border rounded-md bg-background">
                  <Code className="h-4 w-4 mr-2 text-primary" />
                  <span className="text-sm">API programática con ejemplos de código</span>
                </div>
              </div>
            </div>
          </div>
          
          <Button className="w-full" asChild>
            <Link to="/analysis-capabilities">
              Comenzar implementación
            </Link>
          </Button>
        </div>
      </SheetContent>
    </Sheet>
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
            <TabsTrigger key={category.id} value={category.id}>
              {category.name}
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
