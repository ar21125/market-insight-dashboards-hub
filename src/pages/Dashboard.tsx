import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  BarChart, 
  PieChart, 
  AreaChart, 
  ArrowLeft, 
  Download, 
  Upload, 
  FileSpreadsheet,
  FileSearch,
  FileText
} from "lucide-react";
import { toast } from "sonner";

import { getIndustryData, getExcelTemplate, getExcelFields, IndustryData } from '@/lib/api';
import {
  SimpleBarChart,
  GroupedBarChart,
  SimpleLineChart,
  SimplePieChart,
  SimpleAreaChart,
  MultiLineChart
} from '@/components/ChartComponents';
import { StatCard, ChartContainer, MlModelInfo } from '@/components/DashboardComponents';
import { UploadTemplateForm } from '@/components/UploadTemplateForm';

// Mapeo de industrias a nombres en español
const industryNames: Record<string, string> = {
  retail: "Retail",
  finanzas: "Servicios Financieros",
  salud: "Salud",
  manufactura: "Manufactura",
  tecnologia: "Tecnología",
  educacion: "Educación"
};

// Descripciones específicas por industria
const industryDescriptions: Record<string, {
  overview: string;
  chartDescriptions: Record<string, string>;
}> = {
  retail: {
    overview: "Análisis completo de ventas, inventario, marketing y comportamiento del cliente en el sector retail.",
    chartDescriptions: {
      distribucion: "Muestra la distribución del volumen de ventas por categoría de producto.",
      tendencia: "Evolución de ventas a lo largo del tiempo, identificando patrones estacionales.",
      detalle: "Análisis detallado del rendimiento de productos y categorías.",
      comparativa: "Comparación de rendimiento actual vs período anterior."
    }
  },
  finanzas: {
    overview: "Métricas clave para entidades financieras: rentabilidad, gestión de riesgos, eficiencia operativa y satisfacción del cliente.",
    chartDescriptions: {
      distribucion: "Distribución de ingresos por línea de producto financiero.",
      tendencia: "Evolución de rendimiento de inversiones y captación de clientes.",
      detalle: "Análisis de riesgo y cumplimiento normativo.",
      comparativa: "Benchmarking contra competidores y períodos anteriores."
    }
  },
  salud: {
    overview: "Indicadores clave para centros sanitarios: calidad asistencial, eficiencia operativa, satisfacción del paciente y resultados clínicos.",
    chartDescriptions: {
      distribucion: "Distribución de pacientes por especialidad y tipo de consulta.",
      tendencia: "Evolución de tiempos de espera y ocupación hospitalaria.",
      detalle: "Análisis detallado de rendimiento por departamento y métricas clínicas.",
      comparativa: "Comparativa de indicadores clave con estándares del sector."
    }
  },
  manufactura: {
    overview: "Control integral de producción industrial: eficiencia, calidad, mantenimiento y cadena de suministro.",
    chartDescriptions: {
      distribucion: "Distribución de producción por línea de producto y planta.",
      tendencia: "Evolución de OEE, defectos y tiempos de ciclo.",
      detalle: "Análisis detallado de rendimiento por línea y turno.",
      comparativa: "Comparativa entre plantas y periodos productivos."
    }
  },
  tecnologia: {
    overview: "Métricas digitales clave: adquisición y retención de usuarios, rendimiento del producto y métricas de infraestructura.",
    chartDescriptions: {
      distribucion: "Distribución de usuarios por plataforma y segmento.",
      tendencia: "Evolución del crecimiento de usuarios y engagement.",
      detalle: "Análisis de funnel de conversión y comportamiento de usuario.",
      comparativa: "Benchmarking de KPIs con versiones anteriores."
    }
  },
  educacion: {
    overview: "Indicadores esenciales para instituciones educativas: rendimiento académico, satisfacción, empleabilidad y finanzas.",
    chartDescriptions: {
      distribucion: "Distribución de estudiantes por programa y nivel.",
      tendencia: "Evolución de matriculaciones y tasas de graduación.",
      detalle: "Análisis detallado de rendimiento académico e indicadores de calidad.",
      comparativa: "Comparativa con otras instituciones y periodos académicos."
    }
  }
};

// Componente para mostrar un estado de carga para los gráficos
const ChartSkeleton = () => (
  <div className="w-full space-y-3">
    <Skeleton className="h-8 w-40" />
    <Skeleton className="h-[250px] w-full" />
  </div>
);

const Dashboard = () => {
  const { industry } = useParams<{ industry: string }>();
  const [data, setData] = useState<IndustryData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<string>("overview");
  const [showUploadForm, setShowUploadForm] = useState<boolean>(false);

  // Nombre de la industria para mostrar
  const industryName = industry ? industryNames[industry] || "General" : "General";
  // Descripciones específicas de la industria
  const industryInfo = industry ? industryDescriptions[industry] || industryDescriptions.retail : industryDescriptions.retail;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        if (industry) {
          const industryData = await getIndustryData(industry);
          setData(industryData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Error al cargar los datos");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [industry]);

  const handleDownloadTemplate = (templateType = 'general') => {
    if (!industry) return;
    
    const templateName = getExcelTemplate(industry, templateType);
    const templateFields = getExcelFields(industry, templateType);
    
    // Simulación de descarga real con Blob
    setTimeout(() => {
      // Crear un string CSV básico con los campos obtenidos para el template
      let csvContent = "";
      
      // Si hay campos definidos para esta plantilla
      if (templateFields && templateFields.length > 0) {
        // Añadir encabezados
        csvContent = templateFields.map(field => field.name).join('\t') + '\n';
        
        // Añadir una fila de ejemplo
        csvContent += templateFields.map(field => field.example).join('\t') + '\n';
        
        // Añadir filas vacías para que el usuario complete
        for (let i = 0; i < 3; i++) {
          csvContent += templateFields.map(() => "").join('\t') + '\n';
        }
      } else {
        csvContent = "No hay campos definidos para esta plantilla";
      }
      
      const blob = new Blob([csvContent], { type: 'application/vnd.ms-excel' });
      const url = window.URL.createObjectURL(blob);
      
      // Crear un elemento de enlace invisible para la descarga
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = templateName;
      document.body.appendChild(a);
      a.click();
      
      // Limpiar después de la descarga
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      
      toast.success(`Descargando plantilla "${templateName}"`, {
        description: "La plantilla se ha descargado correctamente con los campos necesarios",
        duration: 5000,
      });
    }, 500);
  };

  const handleUploadTemplate = (file: File, modelType: string) => {
    // Simulación de proceso de carga y análisis
    toast.info(`Procesando archivo: ${file.name}`, {
      description: "Analizando datos y generando visualizaciones...",
      duration: 3000,
    });
    
    // Simulamos un procesamiento de archivo
    setTimeout(() => {
      toast.success("Análisis completado", {
        description: `Dashboard generado para modelo ${modelType}. Los resultados están disponibles en la pestaña de resultados.`,
        duration: 5000,
      });
      
      // Cambiar a la pestaña de resultados automáticamente
      setActiveTab("ml_results");
    }, 2500);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="w-full py-4 px-6 bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <BarChart className="h-6 w-6 text-primary" />
            <Link to="/" className="text-2xl font-bold text-primary">DataViz Pro</Link>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm" asChild>
              <Link to="/industries" className="flex items-center gap-1">
                <ArrowLeft className="h-4 w-4" />
                Volver a industrias
              </Link>
            </Button>
            <Button size="sm" onClick={() => handleDownloadTemplate()} className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Descargar plantilla Excel
            </Button>
          </div>
        </div>
      </header>

      {/* Dashboard Content */}
      <main className="flex-grow py-6 px-6">
        <div className="container mx-auto">
          <div className="mb-6">
            <h1 className="text-3xl font-bold">Dashboard: {industryName}</h1>
            <p className="text-muted-foreground mt-1">
              {industryInfo.overview}
            </p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <div className="border-b">
              <div className="container mx-auto">
                <TabsList className="grid grid-cols-2 md:grid-cols-6 lg:grid-cols-6">
                  <TabsTrigger value="overview">Visión general</TabsTrigger>
                  <TabsTrigger value="trends">Tendencias</TabsTrigger>
                  <TabsTrigger value="detail">Detalle</TabsTrigger>
                  <TabsTrigger value="comparison">Comparativa</TabsTrigger>
                  <TabsTrigger value="ml">Modelos ML</TabsTrigger>
                  <TabsTrigger value="ml_results">Resultados ML</TabsTrigger>
                </TabsList>
              </div>
            </div>

            {/* Visión general */}
            <TabsContent value="overview" className="space-y-6">
              {/* KPIs */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {loading ? (
                  <>
                    {[1, 2, 3, 4].map((i) => (
                      <Card key={i}>
                        <CardContent className="p-6">
                          <Skeleton className="h-4 w-[150px] mb-2" />
                          <Skeleton className="h-8 w-[100px]" />
                          <div className="flex items-center mt-1">
                            <Skeleton className="h-4 w-4 mr-1" />
                            <Skeleton className="h-4 w-[60px]" />
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </>
                ) : (
                  data && Object.entries(data.kpis).map(([key, kpi]) => (
                    <StatCard 
                      key={key}
                      title={kpi.label}
                      value={kpi.value}
                      change={kpi.change}
                    />
                  ))
                )}
              </div>

              {/* Charts Row 1 */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {loading ? (
                  <>
                    <ChartSkeleton />
                    <ChartSkeleton />
                  </>
                ) : (
                  data && (
                    <>
                      <ChartContainer 
                        title="Distribución de ventas" 
                        industry={industry || "retail"}
                        description={industryInfo.chartDescriptions.distribucion}
                      >
                        <SimplePieChart data={data.distributionData} />
                      </ChartContainer>
                      <ChartContainer 
                        title="Tendencia de ventas" 
                        industry={industry || "retail"}
                        description={industryInfo.chartDescriptions.tendencia}
                      >
                        <SimpleBarChart data={data.salesData} />
                      </ChartContainer>
                    </>
                  )
                )}
              </div>
            </TabsContent>

            {/* Tendencias */}
            <TabsContent value="trends" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {loading ? (
                  <>
                    <ChartSkeleton />
                    <ChartSkeleton />
                  </>
                ) : (
                  data && (
                    <>
                      <ChartContainer 
                        title="Evolución temporal" 
                        industry={industry || "retail"}
                        description="Analiza la evolución de los indicadores clave a lo largo del tiempo"
                      >
                        <SimpleAreaChart data={data.trendsData} />
                      </ChartContainer>
                      <ChartContainer 
                        title="Métricas principales" 
                        industry={industry || "retail"}
                        description="Comparativa de los principales indicadores de rendimiento"
                      >
                        <MultiLineChart data={data.performanceData} />
                      </ChartContainer>
                    </>
                  )
                )}
              </div>
            </TabsContent>

            {/* Detalle */}
            <TabsContent value="detail" className="space-y-6">
              <div className="grid grid-cols-1 gap-6">
                {loading ? (
                  <ChartSkeleton />
                ) : (
                  data && (
                    <ChartContainer 
                      title="Análisis detallado por periodo" 
                      industry={industry || "retail"}
                      description={industryInfo.chartDescriptions.detalle}
                    >
                      <SimpleLineChart data={data.salesData} height={400} />
                    </ChartContainer>
                  )
                )}
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {loading ? (
                  <>
                    <ChartSkeleton />
                    <ChartSkeleton />
                  </>
                ) : (
                  data && (
                    <>
                      <ChartContainer 
                        title="Distribución por categoría" 
                        industry={industry || "retail"}
                        description="Análisis detallado de la distribución por categoría de producto"
                      >
                        <SimplePieChart data={data.distributionData} />
                      </ChartContainer>
                      <ChartContainer 
                        title="Rendimiento individual" 
                        industry={industry || "retail"}
                        description="Rendimiento individual de cada elemento analizado"
                      >
                        <SimpleBarChart data={data.salesData} />
                      </ChartContainer>
                    </>
                  )
                )}
              </div>
            </TabsContent>

            {/* Comparativa */}
            <TabsContent value="comparison" className="space-y-6">
              <div className="grid grid-cols-1 gap-6">
                {loading ? (
                  <ChartSkeleton />
                ) : (
                  data && (
                    <ChartContainer 
                      title="Comparativa con periodo anterior" 
                      industry={industry || "retail"}
                      description={industryInfo.chartDescriptions.comparativa}
                    >
                      <GroupedBarChart data={data.salesData} height={400} />
                    </ChartContainer>
                  )
                )}
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {loading ? (
                  <>
                    <ChartSkeleton />
                    <ChartSkeleton />
                  </>
                ) : (
                  data && (
                    <>
                      <ChartContainer 
                        title="Rendimiento comparativo" 
                        industry={industry || "retail"}
                        description="Comparativa de diferentes métricas de rendimiento"
                      >
                        <MultiLineChart data={data.performanceData} />
                      </ChartContainer>
                      <ChartContainer 
                        title="Distribución comparativa" 
                        industry={industry || "retail"}
                        description="Análisis comparativo de la distribución de datos"
                      >
                        <SimpleBarChart data={data.distributionData} />
                      </ChartContainer>
                    </>
                  )
                )}
              </div>
            </TabsContent>

            {/* Nueva pestaña de Modelos ML */}
            <TabsContent value="ml" className="space-y-6">
              <div className="grid grid-cols-1 gap-6">
                {loading ? (
                  <Card><CardContent className="p-6"><Skeleton className="h-[400px]" /></CardContent></Card>
                ) : (
                  <>
                    <div className="bg-blue-50 p-6 border border-blue-200 rounded-lg mb-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-medium text-blue-800">Analizar sus datos con Machine Learning</h3>
                        <Button 
                          onClick={() => setShowUploadForm(prev => !prev)} 
                          variant="outline" 
                          className="bg-white"
                        >
                          {showUploadForm ? "Ocultar formulario" : "Subir datos para análisis"}
                        </Button>
                      </div>
                      
                      {showUploadForm && (
                        <div className="bg-white p-4 rounded-md border border-blue-100 mb-4">
                          <UploadTemplateForm 
                            industry={industry || "retail"} 
                            onUpload={handleUploadTemplate} 
                          />
                        </div>
                      )}
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-white p-4 rounded-md border border-slate-200">
                          <h4 className="font-medium mb-2 flex items-center">
                            <FileSpreadsheet className="h-5 w-5 mr-2 text-primary" />
                            Cómo funciona
                          </h4>
                          <ol className="list-decimal pl-5 space-y-1 text-sm">
                            <li>Descargue la plantilla Excel para el modelo que desea utilizar</li>
                            <li>Complete los datos requeridos según las instrucciones</li>
                            <li>Suba el archivo completo utilizando el formulario</li>
                            <li>Visualice los resultados en la pestaña "Resultados ML"</li>
                          </ol>
                        </div>
                        <div className="bg-white p-4 rounded-md border border-slate-200">
                          <h4 className="font-medium mb-2 flex items-center">
                            <FileSearch className="h-5 w-5 mr-2 text-primary" />
                            Beneficios
                          </h4>
                          <ul className="list-disc pl-5 space-y-1 text-sm">
                            <li>Análisis predictivo avanzado con sus propios datos</li>
                            <li>Visualizaciones personalizadas basadas en modelos estadísticos</li>
                            <li>Detección de patrones y tendencias ocultas</li>
                            <li>Informes exportables para presentaciones</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    
                    <MlModelInfo industry={industry || "retail"} />
                    
                    <div className="bg-blue-50 p-6 border border-blue-200 rounded-lg">
                      <h3 className="text-lg font-medium text-blue-800 mb-4">Plantillas de Excel para análisis avanzado</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Card>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-lg">Análisis Predictivo</CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            <div className="space-y-2">
                              <h4 className="font-medium">SARIMA</h4>
                              <p className="text-sm text-muted-foreground">
                                Series temporales estacionales con componentes autorregresivos.
                              </p>
                              <div className="bg-slate-50 p-2 rounded-md mb-2">
                                <p className="text-xs font-medium">Campos requeridos:</p>
                                <ul className="text-xs list-disc pl-4">
                                  <li>Fecha (YYYY-MM-DD)</li>
                                  <li>Valor (numérico)</li>
                                  <li>Estacionalidad (periodo)</li>
                                  <li>Variables externas (opcional)</li>
                                </ul>
                              </div>
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="w-full" 
                                onClick={() => handleDownloadTemplate('sarima')}
                              >
                                <Download className="h-4 w-4 mr-2" />
                                Descargar SARIMA
                              </Button>
                            </div>
                            
                            <div className="space-y-2">
                              <h4 className="font-medium">ARIMA</h4>
                              <p className="text-sm text-muted-foreground">
                                Series temporales no estacionales para predicciones a corto plazo.
                              </p>
                              <div className="bg-slate-50 p-2 rounded-md mb-2">
                                <p className="text-xs font-medium">Campos requeridos:</p>
                                <ul className="text-xs list-disc pl-4">
                                  <li>Fecha (YYYY-MM-DD)</li>
                                  <li>Valor (numérico)</li>
                                  <li>Diferenciación (orden)</li>
                                  <li>Autocorrelación (opcional)</li>
                                </ul>
                              </div>
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="w-full" 
                                onClick={() => handleDownloadTemplate('arima')}
                              >
                                <Download className="h-4 w-4 mr-2" />
                                Descargar ARIMA
                              </Button>
                            </div>
                            
                            <div className="space-y-2">
                              <h4 className="font-medium">Prophet</h4>
                              <p className="text-sm text-muted-foreground">
                                Pronósticos robustos con múltiples patrones estacionales.
                              </p>
                              <div className="bg-slate-50 p-2 rounded-md mb-2">
                                <p className="text-xs font-medium">Campos requeridos:</p>
                                <ul className="text-xs list-disc pl-4">
                                  <li>ds (fecha en YYYY-MM-DD)</li>
                                  <li>y (valor a predecir)</li>
                                  <li>eventos_especiales (opcional)</li>
                                  <li>variables_adicionales (opcional)</li>
                                </ul>
                              </div>
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="w-full" 
                                onClick={() => handleDownloadTemplate('prophet')}
                              >
                                <Download className="h-4 w-4 mr-2" />
                                Descargar Prophet
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                        
                        <Card>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-lg">Clasificación y Agrupación</CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            <div className="space-y-2">
                              <h4 className="font-medium">K-means</h4>
                              <p className="text-sm text-muted-foreground">
                                Segmentación de datos en grupos con características similares.
                              </p>
                              <div className="bg-slate-50 p-2 rounded-md mb-2">
                                <p className="text-xs font-medium">Campos requeridos:</p>
                                <ul className="text-xs list-disc pl-4">
                                  <li>ID (identificador)</li>
                                  <li>Variable_1, Variable_2, etc. (numéricas)</li>
                                  <li>Num_Clusters (sugerencia)</li>
                                  <li>Normalizar (Sí/No)</li>
                                </ul>
                              </div>
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="w-full" 
                                onClick={() => handleDownloadTemplate('kmeans')}
                              >
                                <Download className="h-4 w-4 mr-2" />
                                Descargar K-means
                              </Button>
                            </div>
                            
                            <div className="space-y-2">
                              <h4 className="font-medium">Random Forest</h4>
                              <p className="text-sm text-muted-foreground">
                                Árboles de decisión para clasificación y regresión.
                              </p>
                              <div className="bg-slate-50 p-2 rounded-md mb-2">
                                <p className="text-xs font-medium">Campos requeridos:</p>
                                <ul className="text-xs list-disc pl-4">
                                  <li>ID (identificador)</li>
                                  <li>Variables predictoras (múltiples)</li>
                                  <li>Variable objetivo (target)</li>
                                  <li>Tipo_Análisis (clasificación/regresión)</li>
                                </ul>
                              </div>
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="w-full" 
                                onClick={() => handleDownloadTemplate('randomForest')}
                              >
                                <Download className="h-4 w-4 mr-2" />
                                Descargar Random Forest
                              </Button>
                            </div>
                            
                            <div className="space-y-2">
                              <h4 className="font-medium">SVM</h4>
                              <p className="text-sm text-muted-foreground">
                                Clasificación con márgenes máximos para datos complejos.
                              </p>
                              <div className="bg-slate-50 p-2 rounded-md mb-2">
                                <p className="text-xs font-medium">Campos requeridos:</p>
                                <ul className="text-xs list-disc pl-4">
                                  <li>ID (identificador)</li>
                                  <li>Variables de entrada (numéricas)</li>
                                  <li>Clase (target categórico)</li>
                                  <li>Kernel (rbf, linear, poly)</li>
                                </ul>
                              </div>
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="w-full" 
                                onClick={() => handleDownloadTemplate('svm')}
                              >
                                <Download className="h-4 w-4 mr-2" />
                                Descargar SVM
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                        
                        <Card>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-lg">Modelos Avanzados</CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            <div className="space-y-2">
                              <h4 className="font-medium">XGBoost</h4>
                              <p className="text-sm text-muted-foreground">
                                Gradient boosting de alto rendimiento para problemas complejos.
                              </p>
                              <div className="bg-slate-50 p-2 rounded-md mb-2">
                                <p className="text-xs font-medium">Campos requeridos:</p>
                                <ul className="text-xs list-disc pl-4">
                                  <li>ID (identificador)</li>
                                  <li>Variables predictoras (múltiples)</li>
                                  <li>Variable objetivo</li>
                                  <li>Tipo_Objetivo (binario, multiclase, ranking)</li>
                                </ul>
                              </div>
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="w-full" 
                                onClick={() => handleDownloadTemplate('xgboost')}
                              >
                                <Download className="h-4 w-4 mr-2" />
                                Descargar XGBoost
                              </Button>
                            </div>
                            
                            <div className="space-y-2">
                              <h4 className="font-medium">Redes LSTM</h4>
                              <p className="text-sm text-muted-foreground">
                                Redes neuronales para secuencias y patrones complejos.
                              </p>
                              <div className="bg-slate-50 p-2 rounded-md mb-2">
                                <p className="text-xs font-medium">Campos requeridos:</p>
                                <ul className="text-xs list-disc pl-4">
                                  <li>Fecha (secuencial)</li>
                                  <li>Variables secuenciales (numéricas)</li>
                                  <li>Tamaño_Ventana (lookback)</li>
                                  <li>Horizonte_Predicción (pasos)</li>
                                </ul>
                              </div>
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="w-full" 
                                onClick={() => handleDownloadTemplate('lstm')}
                              >
                                <Download className="h-4 w-4 mr-2" />
                                Descargar LSTM
                              </Button>
                            </div>
                            
                            <div className="space-y-2">
                              <h4 className="font-medium">Análisis Estadísticos</h4>
                              <p className="text-sm text-muted-foreground">
                                ANOVA, PCA y otras técnicas estadísticas avanzadas.
                              </p>
                              <div className="bg-slate-50 p-2 rounded-md mb-2">
                                <p className="text-xs font-medium">Campos requeridos:</p>
                                <ul className="text-xs list-disc pl-4">
                                  <li>ID (observación)</li>
                                  <li>Variables de interés (numéricas)</li>
                                  <li>Grupos/Factores (categóricos)</li>
                                  <li>Tipo_Análisis (anova, pca, etc.)</li>
                                </ul>
                              </div>
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="w-full" 
                                onClick={() => handleDownloadTemplate('anova')}
                              >
                                <Download className="h-4 w-4 mr-2" />
                                Descargar Estadísticos
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </TabsContent>
            
            {/* Nueva pestaña de Resultados ML */}
            <TabsContent value="ml_results" className="space-y-6">
              <div className="grid grid-cols-1 gap-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-lg">Resultados de Análisis Machine Learning</CardTitle>
                    <FileText className="h-5 w-5 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    {loading ? (
                      <div className="space-y-3">
                        <Skeleton className="h-8 w-[250px]" />
                        <Skeleton className="h-[300px] w-full" />
                      </div>
                    ) : (
                      <div className="space-y-6">
                        <div className="rounded-lg border bg-slate-50 p-4">
                          <h3 className="text-md font-medium mb-2">
                            Este panel muestra resultados de modelos de machine learning
                          </h3>
                          <p className="text-sm text-muted-foreground mb-4">
                            Suba sus datos en la pestaña "Modelos ML" para ver aquí los resultados del análisis. 
                            Los resultados variarán según el tipo de modelo seleccionado.
                          </p>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                            <Card>
                              <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-medium">
                                  Rendimiento predictivo por modelo
                                </CardTitle>
                              </CardHeader>
                              <CardContent className="h-[200px] flex items-center justify-center">
                                <p className="text-sm text-muted-foreground text-center">
                                  Suba un archivo para ver métricas de rendimiento
                                </p>
                              </CardContent>
                            </Card>
                            <Card>
                              <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-medium">
                                  Visualización de resultados
                                </CardTitle>
                              </CardHeader>
                              <CardContent className="h-[200px] flex items-center justify-center">
                                <p className="text-sm text-muted-foreground text-center">
                                  Suba un archivo para ver visualizaciones de resultados
                                </p>
                              </CardContent>
                            </Card>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <Card>
                            <CardHeader className="pb-2">
                              <CardTitle className="text-sm font-medium">
                                Métricas de evaluación
                              </CardTitle>
                            </CardHeader>
                            <CardContent>
                              <p className="text-sm text-muted-foreground text-center">
                                Sin datos disponibles
                              </p>
                            </CardContent>
                          </Card>
                          <Card>
                            <CardHeader className="pb-2">
                              <CardTitle className="text-sm font-medium">
                                Variables importantes
                              </CardTitle>
                            </CardHeader>
                            <CardContent>
                              <p className="text-sm text-muted-foreground text-center">
                                Sin datos disponibles
                              </p>
                            </CardContent>
                          </Card>
                          <Card>
                            <CardHeader className="pb-2">
                              <CardTitle className="text-sm font-medium">
                                Predicciones futuras
                              </CardTitle>
                            </CardHeader>
                            <CardContent>
                              <p className="text-sm text-muted-foreground text-center">
                                Sin datos disponibles
                              </p>
                            </CardContent>
                          </Card>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>

          <div className="mt-8 rounded-lg bg-blue-50 p-4 border border-blue-200">
            <h3 className="text-lg font-medium text-blue-800 mb-2">Conexión con backend FastAPI</h3>
            <p className="text-blue-700 mb-4">
              En una implementación real, estos datos se obtendrían de una API en FastAPI que podría:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ul className="list-disc pl-5 space-y-1 text-blue-700">
                <li>Conectarse a bases de datos SQL o NoSQL (Supabase, MongoDB, etc.)</li>
                <li>Procesar datos en tiempo real</li>
                <li>Realizar análisis estadísticos avanzados</li>
                <li>Generar reportes personalizados en Excel, PDF, etc.</li>
              </ul>
              <ul className="list-disc pl-5 space-y-1 text-blue-700">
                <li>Aplicar modelos de machine learning como SARIMA para series temporales</li>
                <li>Implementar Prophet para predicciones de inventario</li>
                <li>Realizar segmentación de mercados con K-means</li>
                <li>Integración con servicios de ML abiertos mediante MCP</li>
              </ul>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white py-6 px-6 border-t">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <BarChart className="h-5 w-5 text-primary" />
              <span className="font-bold">DataViz Pro</span>
            </div>
            <div className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} DataViz Pro. Todos los derechos reservados.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
