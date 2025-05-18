import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { BarChart, PieChart, AreaChart, ArrowLeft, Download } from "lucide-react";
import { toast } from "sonner";

import { getIndustryData, getExcelTemplate, IndustryData } from '@/lib/api';
import {
  SimpleBarChart,
  GroupedBarChart,
  SimpleLineChart,
  SimplePieChart,
  SimpleAreaChart,
  MultiLineChart
} from '@/components/ChartComponents';
import { StatCard, ChartContainer, MlModelInfo } from '@/components/DashboardComponents';

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

  const handleDownloadTemplate = () => {
    if (!industry) return;
    
    const templateName = getExcelTemplate(industry);
    
    // En un entorno real, aquí se generaría una descarga real
    // Para este demo, solo mostramos una notificación
    toast.success(`Plantilla "${templateName}" lista para descargar`, {
      description: "En una implementación real, esto iniciaría la descarga del archivo Excel",
      duration: 5000,
    });
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
            <Button size="sm" onClick={handleDownloadTemplate} className="flex items-center gap-2">
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
                <TabsList className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-5">
                  <TabsTrigger value="overview">Visión general</TabsTrigger>
                  <TabsTrigger value="trends">Tendencias</TabsTrigger>
                  <TabsTrigger value="detail">Detalle</TabsTrigger>
                  <TabsTrigger value="comparison">Comparativa</TabsTrigger>
                  <TabsTrigger value="ml">Modelos ML</TabsTrigger>
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
                    <MlModelInfo industry={industry || "retail"} />
                    <div className="bg-blue-50 p-6 border border-blue-200 rounded-lg">
                      <h3 className="text-lg font-medium text-blue-800 mb-4">Plantillas de Excel para análisis avanzado</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <Card>
                          <CardContent className="pt-6">
                            <h4 className="font-medium mb-2">Plantilla SARIMA</h4>
                            <p className="text-sm text-muted-foreground mb-4">
                              Para análisis de series temporales con componentes estacionales.
                            </p>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="w-full" 
                              onClick={() => {
                                toast.success(`Descargando plantilla SARIMA para ${industryName}`, {
                                  description: "Incluye columnas para datos históricos, factores estacionales y variables externas."
                                });
                              }}
                            >
                              <Download className="h-4 w-4 mr-2" />
                              Descargar SARIMA
                            </Button>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardContent className="pt-6">
                            <h4 className="font-medium mb-2">Plantilla Prophet</h4>
                            <p className="text-sm text-muted-foreground mb-4">
                              Para pronósticos avanzados con múltiples factores estacionales.
                            </p>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="w-full" 
                              onClick={() => {
                                toast.success(`Descargando plantilla Prophet para ${industryName}`, {
                                  description: "Incluye columnas para fechas, valores, eventos y factores externos."
                                });
                              }}
                            >
                              <Download className="h-4 w-4 mr-2" />
                              Descargar Prophet
                            </Button>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardContent className="pt-6">
                            <h4 className="font-medium mb-2">Plantilla K-means</h4>
                            <p className="text-sm text-muted-foreground mb-4">
                              Para segmentación de datos y análisis de clusters.
                            </p>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="w-full" 
                              onClick={() => {
                                toast.success(`Descargando plantilla K-means para ${industryName}`, {
                                  description: "Incluye columnas para características de segmentación y parámetros de clusters."
                                });
                              }}
                            >
                              <Download className="h-4 w-4 mr-2" />
                              Descargar K-means
                            </Button>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  </>
                )}
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
