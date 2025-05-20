
import React from 'react';
import DefaultLayout from '@/layouts/DefaultLayout';
import AIModelCatalog from '@/components/AIModelCatalog';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MODEL_CATEGORIES } from '@/types/aiModels';

const AIModelsPage = () => {
  return (
    <DefaultLayout>
      <div className="container mx-auto p-4">
        <div className="mb-6 text-center md:text-left">
          <h1 className="text-3xl md:text-4xl font-extrabold mb-2">Modelos de Inteligencia Artificial</h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto md:mx-0">
            Nuestra plataforma ofrece una amplia variedad de modelos de IA y aprendizaje automático para diferentes industrias y casos de uso.
          </p>
        </div>

        <Card className="mb-10 bg-muted/30">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex flex-col items-center md:items-start text-center md:text-left">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-primary"
                  >
                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Personalizado para tu Industria</h3>
                <p className="text-muted-foreground">
                  Modelos específicamente adaptados para resolver problemas en agricultura, energía, retail, finanzas y más.
                </p>
              </div>
              
              <div className="flex flex-col items-center md:items-start text-center md:text-left">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-primary"
                  >
                    <path d="M12 20.94c1.5 0 2.75 1.06 4 1.06 3 0 6-8 6-12.22A4.91 4.91 0 0 0 17 5c-2.22 0-4 1.44-5 2-1-.56-2.78-2-5-2a4.9 4.9 0 0 0-5 4.78C2 14 5 22 8 22c1.25 0 2.5-1.06 4-1.06Z"></path>
                    <path d="M10 2c1 .5 2 2 2 5"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Implementación Simple</h3>
                <p className="text-muted-foreground">
                  Procesos guiados para implementar modelos de IA sin necesidad de experiencia técnica profunda.
                </p>
              </div>
              
              <div className="flex flex-col items-center md:items-start text-center md:text-left">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-primary"
                  >
                    <path d="m12 14 4-4"></path>
                    <path d="M3.34 19a10 10 0 1 1 17.32 0"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Resultados Medibles</h3>
                <p className="text-muted-foreground">
                  Métricas claras para evaluar el desempeño y ROI de cada solución implementada.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <div className="mb-10">
          <h2 className="text-2xl font-bold mb-4">Categorías de modelos de IA</h2>
          <Tabs defaultValue="overview">
            <TabsList className="w-full grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 mb-6">
              <TabsTrigger value="overview">Vista General</TabsTrigger>
              <TabsTrigger value="time-series">Series Temporales</TabsTrigger>
              <TabsTrigger value="classification">Clasificación</TabsTrigger>
              <TabsTrigger value="statistical">Estadísticos</TabsTrigger>
              <TabsTrigger value="regression">Regresión</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {MODEL_CATEGORIES.map(category => (
                <Card key={category.id} className="overflow-hidden">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{category.name}</h3>
                    <p className="text-muted-foreground mb-4">{category.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {category.models.slice(0, 3).map((model, idx) => (
                        <span key={idx} className="bg-muted px-2 py-1 rounded text-sm">
                          {model}
                        </span>
                      ))}
                      {category.models.length > 3 && (
                        <span className="bg-muted px-2 py-1 rounded text-sm">
                          +{category.models.length - 3} más
                        </span>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
            <TabsContent value="time-series" className="space-y-4">
              <div className="bg-muted/30 p-6 rounded-lg mb-6">
                <h3 className="text-xl font-bold mb-4">Series Temporales: Predicción a través del tiempo</h3>
                <p>Los modelos de series temporales permiten analizar y predecir datos secuenciales, identificando patrones, tendencias y estacionalidad para hacer pronósticos precisos.</p>
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded border">
                    <h4 className="font-semibold mb-2">Aplicaciones principales:</h4>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                      <li>Previsión de demanda eléctrica</li>
                      <li>Predicción de rendimiento de cultivos</li>
                      <li>Pronóstico de ventas estacionales</li>
                      <li>Análisis de tendencias financieras</li>
                    </ul>
                  </div>
                  <div className="bg-white p-4 rounded border">
                    <h4 className="font-semibold mb-2">Industrias beneficiadas:</h4>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                      <li>Agricultura</li>
                      <li>Energía</li>
                      <li>Retail</li>
                      <li>Finanzas</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-2">SARIMA</h3>
                    <p className="text-muted-foreground mb-4">Modelo estadístico ideal para datos con componentes estacionales.</p>
                    <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded">avanzado</span>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-2">Prophet</h3>
                    <p className="text-muted-foreground mb-4">Desarrollado por Facebook para pronósticos robustos con múltiples estacionalidades.</p>
                    <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">intermedio</span>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-2">ARIMA</h3>
                    <p className="text-muted-foreground mb-4">Modelo clásico para series temporales sin componentes estacionales.</p>
                    <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">intermedio</span>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-2">Exponential Smoothing</h3>
                    <p className="text-muted-foreground mb-4">Técnica simple y efectiva para pronósticos a corto plazo.</p>
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">básico</span>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="classification" className="space-y-4">
              <div className="bg-muted/30 p-6 rounded-lg mb-6">
                <h3 className="text-xl font-bold mb-4">Clasificación: Categorización inteligente</h3>
                <p>Los modelos de clasificación permiten asignar categorías o clases a observaciones, facilitando la toma de decisiones y segmentación automática.</p>
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded border">
                    <h4 className="font-semibold mb-2">Aplicaciones principales:</h4>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                      <li>Detección de fraude</li>
                      <li>Segmentación de clientes</li>
                      <li>Clasificación de productos</li>
                      <li>Diagnóstico médico</li>
                    </ul>
                  </div>
                  <div className="bg-white p-4 rounded border">
                    <h4 className="font-semibold mb-2">Industrias beneficiadas:</h4>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                      <li>Finanzas</li>
                      <li>Retail</li>
                      <li>Salud</li>
                      <li>Tecnología</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-2">Random Forest</h3>
                    <p className="text-muted-foreground mb-4">Combina múltiples árboles de decisión para resultados robustos.</p>
                    <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">intermedio</span>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-2">XGBoost</h3>
                    <p className="text-muted-foreground mb-4">Algoritmo de gradient boosting de alto rendimiento.</p>
                    <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">intermedio</span>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-2">Logistic Regression</h3>
                    <p className="text-muted-foreground mb-4">Modelo simple y eficiente para clasificación binaria.</p>
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">básico</span>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-2">SVM</h3>
                    <p className="text-muted-foreground mb-4">Potente para clasificación de datos de alta dimensionalidad.</p>
                    <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">intermedio</span>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="statistical" className="space-y-4">
              <div className="bg-muted/30 p-6 rounded-lg mb-6">
                <h3 className="text-xl font-bold mb-4">Análisis Estadístico: La base del descubrimiento</h3>
                <p>Los modelos estadísticos permiten extraer conocimiento significativo de los datos, evaluar hipótesis y descubrir relaciones entre variables.</p>
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded border">
                    <h4 className="font-semibold mb-2">Aplicaciones principales:</h4>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                      <li>Evaluación de experimentos agrícolas</li>
                      <li>Estudio de efectividad de tratamientos</li>
                      <li>Análisis de factores de riesgo</li>
                      <li>Investigación de mercado</li>
                    </ul>
                  </div>
                  <div className="bg-white p-4 rounded border">
                    <h4 className="font-semibold mb-2">Industrias beneficiadas:</h4>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                      <li>Agricultura</li>
                      <li>Salud</li>
                      <li>Educación</li>
                      <li>Retail</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-2">ANOVA</h3>
                    <p className="text-muted-foreground mb-4">Análisis de varianza para comparación de múltiples grupos.</p>
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">básico</span>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-2">Chi Cuadrado</h3>
                    <p className="text-muted-foreground mb-4">Test para variables categóricas y análisis de asociación.</p>
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">básico</span>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-2">T-test</h3>
                    <p className="text-muted-foreground mb-4">Comparación de medias entre dos grupos.</p>
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">básico</span>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-2">Regresión Múltiple</h3>
                    <p className="text-muted-foreground mb-4">Análisis de relaciones entre variables dependientes e independientes.</p>
                    <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">intermedio</span>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="regression" className="space-y-4">
              <div className="bg-muted/30 p-6 rounded-lg mb-6">
                <h3 className="text-xl font-bold mb-4">Regresión: Predicción de valores continuos</h3>
                <p>Los modelos de regresión permiten predecir valores numéricos y cuantificar relaciones entre variables, fundamentales para pronósticos y análisis predictivos.</p>
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded border">
                    <h4 className="font-semibold mb-2">Aplicaciones principales:</h4>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                      <li>Predicción de rendimiento de cultivos</li>
                      <li>Estimación de producción energética</li>
                      <li>Pronóstico de ventas</li>
                      <li>Valoración de activos</li>
                    </ul>
                  </div>
                  <div className="bg-white p-4 rounded border">
                    <h4 className="font-semibold mb-2">Industrias beneficiadas:</h4>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                      <li>Agricultura</li>
                      <li>Energía</li>
                      <li>Retail</li>
                      <li>Finanzas</li>
                      <li>Manufactura</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-2">Regresión Lineal</h3>
                    <p className="text-muted-foreground mb-4">Modelo fundamental para relaciones lineales entre variables.</p>
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">básico</span>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-2">Regresión Polinómica</h3>
                    <p className="text-muted-foreground mb-4">Para relaciones más complejas y no lineales entre variables.</p>
                    <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">intermedio</span>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-2">Ridge Regression</h3>
                    <p className="text-muted-foreground mb-4">Regresión con regularización para evitar sobreajuste.</p>
                    <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">intermedio</span>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-2">Gradient Boosting Regression</h3>
                    <p className="text-muted-foreground mb-4">Técnicas avanzadas para problemas de regresión complejos.</p>
                    <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded">avanzado</span>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <AIModelCatalog />
      </div>
    </DefaultLayout>
  );
};

export default AIModelsPage;
