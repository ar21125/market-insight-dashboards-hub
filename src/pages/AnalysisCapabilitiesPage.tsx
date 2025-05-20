
import React, { useState } from 'react';
import DefaultLayout from '../layouts/DefaultLayout';
import { AnalysisCapabilities } from '@/components/AnalysisCapabilities';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Sparkles, ChevronRight, ArrowRight, Check, AlertCircle, BarChart, Brain, Search } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import PersonalizedSolutionForm from '@/components/PersonalizedSolutionForm';
import { Link } from 'react-router-dom';

const AnalysisCapabilitiesPage = () => {
  const [showMore, setShowMore] = useState(false);
  
  const additionalAnalyses = [
    {
      title: "Análisis de Sentimiento",
      industry: "salud",
      description: "Evalúe la percepción de pacientes y mejore la experiencia mediante análisis de texto avanzado.",
      uses: [
        "Análisis de encuestas de satisfacción",
        "Monitoreo de comentarios en redes sociales",
        "Identificación de áreas de mejora en servicios"
      ],
      metrics: ["Puntuación de sentimiento", "Temas emergentes", "Evolución de satisfacción"]
    },
    {
      title: "Segmentación Avanzada de Clientes",
      industry: "retail",
      description: "Identifique grupos de clientes con comportamientos similares para estrategias personalizadas.",
      uses: [
        "Marketing personalizado",
        "Desarrollo de productos",
        "Optimización de precios por segmento"
      ],
      metrics: ["Valor vitalicio del cliente", "Tasa de conversión", "Frecuencia de compra"]
    },
    {
      title: "Detección de Fraude",
      industry: "finanzas",
      description: "Identifique patrones anómalos y prevenga actividades fraudulentas con modelos predictivos.",
      uses: [
        "Validación de transacciones en tiempo real",
        "Prevención de lavado de dinero",
        "Seguridad de cuentas"
      ],
      metrics: ["Tasa de detección", "Falsos positivos", "Ahorro por prevención"]
    }
  ];

  return (
    <DefaultLayout>
      <div className="container mx-auto py-8">
        <div className="mb-12 text-center">
          <h1 className="text-3xl font-bold mb-4">Capacidades de Análisis</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Nuestras soluciones de análisis avanzado te permiten tomar decisiones 
            informadas basadas en datos precisos y procesamiento inteligente.
          </p>
        </div>
        
        {/* Main capabilities section */}
        <AnalysisCapabilities />
        
        {/* "Ver más soluciones" button */}
        <div className="text-center mt-12 mb-16">
          <Button 
            variant="outline" 
            size="lg" 
            onClick={() => setShowMore(!showMore)}
            className="min-w-[250px]"
          >
            {showMore ? 'Ver menos soluciones' : 'Ver más soluciones'}
            <ChevronRight className={`ml-2 h-4 w-4 transition-transform duration-200 ${showMore ? 'rotate-90' : ''}`} />
          </Button>
        </div>
        
        {/* Additional analyses section */}
        {showMore && (
          <div className="mb-16 animate-fade-in">
            <h2 className="text-2xl font-bold mb-6 text-center">Análisis Especializados</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {additionalAnalyses.map((analysis, idx) => (
                <Card key={idx} className="overflow-hidden">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">{analysis.title}</CardTitle>
                      <Badge variant="outline">{analysis.industry}</Badge>
                    </div>
                    <CardDescription>{analysis.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-medium mb-2">Aplicaciones:</h4>
                        <ul className="text-sm space-y-1">
                          {analysis.uses.map((use, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <Check className="h-4 w-4 text-primary mt-0.5" />
                              <span>{use}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium mb-2">Métricas clave:</h4>
                        <div className="flex flex-wrap gap-2">
                          {analysis.metrics.map((metric, i) => (
                            <Badge key={i} variant="secondary" className="text-xs">
                              {metric}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" size="sm" asChild>
                      <Link to={`/industries`}>
                        Ver detalles
                      </Link>
                    </Button>
                    <Button size="sm" asChild>
                      <Link to={`/implementation/${analysis.industry}`}>
                        Implementar <ArrowRight className="ml-1 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        )}
        
        {/* Industry focus section */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6 text-center">Especialización por Industria</h2>
          <Tabs defaultValue="health">
            <div className="flex justify-center mb-6">
              <TabsList>
                <TabsTrigger value="health" className="px-6">Salud</TabsTrigger>
                <TabsTrigger value="retail" className="px-6">Retail</TabsTrigger>
                <TabsTrigger value="energy" className="px-6">Energía</TabsTrigger>
                <TabsTrigger value="agriculture" className="px-6">Agricultura</TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="health" className="animate-fade-in">
              <Card>
                <div className="md:grid md:grid-cols-2">
                  <div className="p-6 md:p-8">
                    <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                      <Search className="h-5 w-5 text-primary" />
                      Analítica para Sector Salud
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      Mejore resultados clínicos, optimice recursos y personalice la atención al paciente
                      mediante el análisis avanzado de datos médicos.
                    </p>
                    
                    <div className="space-y-4 mb-6">
                      <div className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-primary mt-0.5" />
                        <div>
                          <p className="font-medium">Predicción de readmisiones</p>
                          <p className="text-sm text-muted-foreground">
                            Reducción del 32% en readmisiones hospitalarias
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-primary mt-0.5" />
                        <div>
                          <p className="font-medium">Optimización de recursos</p>
                          <p className="text-sm text-muted-foreground">
                            Mejora del 28% en utilización de personal y equipos
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-primary mt-0.5" />
                        <div>
                          <p className="font-medium">Segmentación de pacientes por riesgo</p>
                          <p className="text-sm text-muted-foreground">
                            Intervención temprana en pacientes de alto riesgo
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <Button asChild>
                        <Link to="/industries">
                          Ver soluciones <ChevronRight className="ml-1 h-4 w-4" />
                        </Link>
                      </Button>
                      <Button variant="outline" asChild>
                        <Link to="/contact/salud">
                          Solicitar demo
                        </Link>
                      </Button>
                    </div>
                  </div>
                  
                  <div className="bg-muted border-t md:border-t-0 md:border-l p-6 md:p-8">
                    <h4 className="font-medium mb-4">Casos de éxito</h4>
                    
                    <div className="space-y-4">
                      <div className="bg-background p-4 rounded-lg border">
                        <h5 className="font-medium mb-1">Hospital Regional Centro</h5>
                        <p className="text-sm text-muted-foreground mb-3">
                          Implementación de análisis predictivo para gestión de capacidad y reducción de tiempos de espera.
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="text-sm">
                            <span className="font-medium">Resultado:</span> Reducción del 42% en tiempos de espera
                          </div>
                          <Badge variant="outline">Salud</Badge>
                        </div>
                      </div>
                      
                      <div className="bg-background p-4 rounded-lg border">
                        <h5 className="font-medium mb-1">Red de Clínicas Norte</h5>
                        <p className="text-sm text-muted-foreground mb-3">
                          Sistema de análisis de datos clínicos para mejora de diagnósticos y tratamientos personalizados.
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="text-sm">
                            <span className="font-medium">Resultado:</span> Mejora del 23% en efectividad de tratamientos
                          </div>
                          <Badge variant="outline">Salud</Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </TabsContent>
            
            <TabsContent value="retail">
              <Card>
                <div className="md:grid md:grid-cols-2">
                  <div className="p-6 md:p-8">
                    <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                      <BarChart className="h-5 w-5 text-primary" />
                      Analítica para Retail
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      Optimice inventarios, personalice la experiencia del cliente y maximice ventas 
                      con soluciones analíticas específicas para retail.
                    </p>
                    
                    <div className="space-y-4 mb-6">
                      <div className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-primary mt-0.5" />
                        <div>
                          <p className="font-medium">Optimización de precios</p>
                          <p className="text-sm text-muted-foreground">
                            Incremento del 18% en márgenes mediante precios dinámicos
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-primary mt-0.5" />
                        <div>
                          <p className="font-medium">Previsión de demanda</p>
                          <p className="text-sm text-muted-foreground">
                            Reducción del 35% en stockouts y excedentes
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-primary mt-0.5" />
                        <div>
                          <p className="font-medium">Recomendaciones personalizadas</p>
                          <p className="text-sm text-muted-foreground">
                            Aumento del 27% en valor de carrito promedio
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <Button asChild>
                        <Link to="/industries">
                          Ver soluciones <ChevronRight className="ml-1 h-4 w-4" />
                        </Link>
                      </Button>
                      <Button variant="outline" asChild>
                        <Link to="/contact/retail">
                          Solicitar demo
                        </Link>
                      </Button>
                    </div>
                  </div>
                  
                  <div className="bg-muted border-t md:border-t-0 md:border-l p-6 md:p-8">
                    <h4 className="font-medium mb-4">Casos de éxito</h4>
                    
                    <div className="space-y-4">
                      <div className="bg-background p-4 rounded-lg border">
                        <h5 className="font-medium mb-1">MegaMarket Express</h5>
                        <p className="text-sm text-muted-foreground mb-3">
                          Sistema de optimización de inventario basado en patrones de compra y estacionalidad.
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="text-sm">
                            <span className="font-medium">Resultado:</span> Reducción del 32% en costos de inventario
                          </div>
                          <Badge variant="outline">Retail</Badge>
                        </div>
                      </div>
                      
                      <div className="bg-background p-4 rounded-lg border">
                        <h5 className="font-medium mb-1">Moda Elegante</h5>
                        <p className="text-sm text-muted-foreground mb-3">
                          Implementación de sistema de recomendación personalizada e-commerce.
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="text-sm">
                            <span className="font-medium">Resultado:</span> Incremento del 47% en conversión
                          </div>
                          <Badge variant="outline">Retail</Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </TabsContent>
            
            <TabsContent value="energy">
              <Card>
                <div className="md:grid md:grid-cols-2">
                  <div className="p-6 md:p-8">
                    <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                      <AlertCircle className="h-5 w-5 text-primary" />
                      Analítica para Energía
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      Optimice la producción, distribución y consumo energético con análisis predictivo 
                      y detección temprana de anomalías.
                    </p>
                    
                    <div className="space-y-4 mb-6">
                      <div className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-primary mt-0.5" />
                        <div>
                          <p className="font-medium">Mantenimiento predictivo</p>
                          <p className="text-sm text-muted-foreground">
                            Reducción del 63% en tiempo de inactividad no programado
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-primary mt-0.5" />
                        <div>
                          <p className="font-medium">Optimización de consumo</p>
                          <p className="text-sm text-muted-foreground">
                            Ahorro del 28% en costos energéticos operativos
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-primary mt-0.5" />
                        <div>
                          <p className="font-medium">Predicción de demanda</p>
                          <p className="text-sm text-muted-foreground">
                            Mejora del 45% en planificación de recursos
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <Button asChild>
                        <Link to="/implementation/energia">
                          Ver soluciones <ChevronRight className="ml-1 h-4 w-4" />
                        </Link>
                      </Button>
                      <Button variant="outline" asChild>
                        <Link to="/contact/energia">
                          Solicitar demo
                        </Link>
                      </Button>
                    </div>
                  </div>
                  
                  <div className="bg-muted border-t md:border-t-0 md:border-l p-6 md:p-8">
                    <h4 className="font-medium mb-4">Casos de éxito</h4>
                    
                    <div className="space-y-4">
                      <div className="bg-background p-4 rounded-lg border">
                        <h5 className="font-medium mb-1">EnergíaSur Distribución</h5>
                        <p className="text-sm text-muted-foreground mb-3">
                          Sistema de detección temprana de fallos en red de distribución eléctrica.
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="text-sm">
                            <span className="font-medium">Resultado:</span> Reducción del 78% en tiempo de respuesta a fallos
                          </div>
                          <Badge variant="outline">Energía</Badge>
                        </div>
                      </div>
                      
                      <div className="bg-background p-4 rounded-lg border">
                        <h5 className="font-medium mb-1">Industrias EcoEnergy</h5>
                        <p className="text-sm text-muted-foreground mb-3">
                          Optimización de consumo energético en plantas de manufactura.
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="text-sm">
                            <span className="font-medium">Resultado:</span> Ahorro anual de €2.3M en costos energéticos
                          </div>
                          <Badge variant="outline">Energía</Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </TabsContent>
            
            <TabsContent value="agriculture">
              <Card>
                <div className="md:grid md:grid-cols-2">
                  <div className="p-6 md:p-8">
                    <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                      <Brain className="h-5 w-5 text-primary" />
                      Analítica para Agricultura
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      Maximice rendimientos de cultivos, optimice recursos y anticipe riesgos con 
                      soluciones analíticas adaptadas al sector agrícola.
                    </p>
                    
                    <div className="space-y-4 mb-6">
                      <div className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-primary mt-0.5" />
                        <div>
                          <p className="font-medium">Optimización de cultivos</p>
                          <p className="text-sm text-muted-foreground">
                            Incremento del 23% en rendimiento por hectárea
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-primary mt-0.5" />
                        <div>
                          <p className="font-medium">Gestión de recursos hídricos</p>
                          <p className="text-sm text-muted-foreground">
                            Reducción del 35% en consumo de agua y fertilizantes
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-primary mt-0.5" />
                        <div>
                          <p className="font-medium">Detección temprana de plagas</p>
                          <p className="text-sm text-muted-foreground">
                            Prevención de pérdidas en más del 40% de casos
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <Button asChild>
                        <Link to="/implementation/agricultura">
                          Ver soluciones <ChevronRight className="ml-1 h-4 w-4" />
                        </Link>
                      </Button>
                      <Button variant="outline" asChild>
                        <Link to="/contact/agricultura">
                          Solicitar demo
                        </Link>
                      </Button>
                    </div>
                  </div>
                  
                  <div className="bg-muted border-t md:border-t-0 md:border-l p-6 md:p-8">
                    <h4 className="font-medium mb-4">Casos de éxito</h4>
                    
                    <div className="space-y-4">
                      <div className="bg-background p-4 rounded-lg border">
                        <h5 className="font-medium mb-1">Cooperativa AgroFresh</h5>
                        <p className="text-sm text-muted-foreground mb-3">
                          Implementación de sistema de análisis predictivo para optimización de recursos.
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="text-sm">
                            <span className="font-medium">Resultado:</span> Incremento del 27% en rendimiento por hectárea
                          </div>
                          <Badge variant="outline">Agricultura</Badge>
                        </div>
                      </div>
                      
                      <div className="bg-background p-4 rounded-lg border">
                        <h5 className="font-medium mb-1">GranjasTech</h5>
                        <p className="text-sm text-muted-foreground mb-3">
                          Sistema integrado de monitoreo y análisis para agricultura de precisión.
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="text-sm">
                            <span className="font-medium">Resultado:</span> Ahorro del 42% en insumos agrícolas
                          </div>
                          <Badge variant="outline">Agricultura</Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        
        {/* Solicitar solución personalizada section */}
        <div className="mt-16">
          <div className="bg-muted rounded-xl overflow-hidden border">
            <div className="p-8 md:p-12">
              <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">¿No encuentras lo que buscas?</h2>
                <p className="text-muted-foreground mb-8">
                  Nuestro equipo de expertos puede crear una solución personalizada para tus necesidades específicas.
                </p>
                
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <PersonalizedSolutionForm 
                    trigger={
                      <Button size="lg" className="gap-2">
                        <Sparkles className="h-5 w-5" />
                        Solicitar solución personalizada
                      </Button>
                    }
                  />
                  
                  <Button 
                    variant="outline"
                    size="lg"
                    asChild
                    className="gap-2"
                  >
                    <a href="https://wa.me/+123456789" target="_blank" rel="noopener noreferrer">
                      <MessageSquare className="h-5 w-5" />
                      Hablar con un asesor
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default AnalysisCapabilitiesPage;
