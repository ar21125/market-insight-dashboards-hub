
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BarChart, LineChart, PieChart, AreaChart, Radar,
  Download, FileText, Image, FileBarChart2, FileImage, FilePieChart,
  AlertCircle, Lightbulb, HelpCircle, Info
} from "lucide-react";
import {
  SimpleBarChart,
  GroupedBarChart,
  SimpleLineChart,
  SimplePieChart,
  SimpleAreaChart,
  MultiLineChart
} from '@/components/ChartComponents';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { toast } from "sonner";
import { MCPRecommendations } from './MCPRecommendations';
import { methodologyService, VisualizationType, MethodologyFlow } from '@/services/methodologyService';

type Visualization = {
  type: string;
  title: string;
  description: string;
  data?: any[];
};

interface AnalysisResultsProps {
  result?: any;
  resultMetrics?: any;
  modelType: string;
  industry: string;
  isLoading: boolean;
  visualizations?: Visualization[];
  complementaryAnalyses?: any[];
  onDownloadResults?: () => Promise<string | null>;
}

export const AnalysisResults: React.FC<AnalysisResultsProps> = ({
  result,
  resultMetrics,
  modelType,
  industry,
  isLoading,
  visualizations = [],
  complementaryAnalyses = [],
  onDownloadResults
}) => {
  const [activeTab, setActiveTab] = useState('visualizations');
  const [exportLoading, setExportLoading] = useState(false);
  const [methodologyTab, setMethodologyTab] = useState<string>("descriptive_analytics");
  
  // Get recommended methodology flows
  const compatibleFlows = modelType ? methodologyService.getCompatibleMethodologyFlows(modelType) : [];
  
  // Get recommended visualizations based on model type and metrics
  const recommendedVisualizations = modelType ? 
    methodologyService.getRecommendedVisualizations(modelType, resultMetrics) : [];
  
  // Function to download the chart as an image
  const downloadChartAsImage = async (chartId: string, filename: string) => {
    setExportLoading(true);
    try {
      const chartElement = document.getElementById(chartId);
      if (!chartElement) {
        throw new Error(`Chart element with id ${chartId} not found`);
      }
      
      const canvas = await html2canvas(chartElement, { 
        scale: 2, // Higher quality
        backgroundColor: '#ffffff'
      });
      
      const dataUrl = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = `${filename}.png`;
      link.href = dataUrl;
      link.click();
      
      toast.success(`Imagen guardada: ${filename}.png`);
    } catch (error) {
      console.error('Error downloading chart as image:', error);
      toast.error('Error al descargar la imagen');
    } finally {
      setExportLoading(false);
    }
  };
  
  // Function to export the entire dashboard to PDF
  const exportToPDF = async () => {
    setExportLoading(true);
    try {
      const dashboardElement = document.getElementById('analysis-results-dashboard');
      if (!dashboardElement) {
        throw new Error('Dashboard element not found');
      }
      
      const canvas = await html2canvas(dashboardElement, {
        scale: 1.5,
        backgroundColor: '#ffffff',
        logging: false,
        windowWidth: dashboardElement.scrollWidth,
        windowHeight: dashboardElement.scrollHeight
      });
      
      const imgData = canvas.toDataURL('image/jpeg', 0.95);
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: 'a4'
      });
      
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      
      pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`dashboard_${modelType}_${new Date().toISOString().slice(0, 10)}.pdf`);
      
      toast.success('Dashboard exportado como PDF');
    } catch (error) {
      console.error('Error exporting to PDF:', error);
      toast.error('Error al exportar el dashboard como PDF');
    } finally {
      setExportLoading(false);
    }
  };
  
  // Get the appropriate chart component for the visualization type
  const getChartComponent = (visualization: Visualization, index: number) => {
    const chartId = `chart-${visualization.type}-${index}`;
    const chartData = visualization.data || result?.data || generateDemoData(visualization.type);
    
    switch (visualization.type.toLowerCase()) {
      case 'bar':
        return (
          <SimpleBarChart
            data={chartData}
            height={250}
            id={chartId}
          />
        );
      case 'line':
        return (
          <SimpleLineChart
            data={chartData}
            height={250}
            id={chartId}
          />
        );
      case 'pie':
        return (
          <SimplePieChart
            data={chartData}
            id={chartId}
          />
        );
      case 'area':
        return (
          <SimpleAreaChart
            data={chartData}
            height={250}
            id={chartId}
          />
        );
      case 'multiline':
        return (
          <MultiLineChart
            data={chartData}
            height={250}
            id={chartId}
          />
        );
      case 'groupedbar':
        return (
          <GroupedBarChart
            data={chartData}
            height={250}
            id={chartId}
          />
        );
      default:
        return (
          <SimpleBarChart
            data={chartData}
            height={250}
            id={chartId}
          />
        );
    }
  };
  
  // Generate demo data if no data is provided
  const generateDemoData = (type: string) => {
    switch (type.toLowerCase()) {
      case 'bar':
      case 'line':
        return Array.from({ length: 12 }, (_, i) => ({
          name: `Período ${i + 1}`,
          value: Math.floor(Math.random() * 100) + 50
        }));
      case 'pie':
        return Array.from({ length: 5 }, (_, i) => ({
          name: `Categoría ${i + 1}`,
          value: Math.floor(Math.random() * 100) + 20
        }));
      case 'area':
        return Array.from({ length: 12 }, (_, i) => ({
          name: `Período ${i + 1}`,
          value: Math.floor(Math.random() * 100) + 50,
          prediction: Math.floor(Math.random() * 100) + 50
        }));
      case 'multiline':
        return Array.from({ length: 12 }, (_, i) => ({
          name: `Período ${i + 1}`,
          actual: Math.floor(Math.random() * 100) + 50,
          predicted: Math.floor(Math.random() * 100) + 50,
          lower: Math.floor(Math.random() * 40) + 30,
          upper: Math.floor(Math.random() * 40) + 110
        }));
      default:
        return Array.from({ length: 8 }, (_, i) => ({
          name: `Item ${i + 1}`,
          value: Math.floor(Math.random() * 100) + 50
        }));
    }
  };
  
  // Get the appropriate icon for the visualization type
  const getChartIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'bar':
        return <BarChart className="h-5 w-5" />;
      case 'line':
        return <LineChart className="h-5 w-5" />;
      case 'pie':
        return <PieChart className="h-5 w-5" />;
      case 'area':
        return <AreaChart className="h-5 w-5" />;
      case 'radar':
        return <Radar className="h-5 w-5" />;
      default:
        return <BarChart className="h-5 w-5" />;
    }
  };

  if (isLoading) {
    return (
      <Card className="h-full">
        <CardContent className="pt-6">
          <div className="flex flex-col items-center justify-center h-full py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mb-4"></div>
            <p className="text-lg font-medium">Cargando resultados...</p>
            <p className="text-sm text-muted-foreground mt-2">
              Estamos preparando las visualizaciones y análisis para el modelo seleccionado
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!result && !modelType) {
    return (
      <Card className="h-full">
        <CardContent className="pt-6">
          <div className="flex flex-col items-center justify-center h-full py-12">
            <AlertCircle className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-lg font-medium">No hay resultados disponibles</p>
            <p className="text-sm text-muted-foreground mt-2 text-center">
              Procese sus datos con un modelo de ML para ver los resultados y visualizaciones
            </p>
            <Button variant="outline" className="mt-6">
              Ir a la sección de Modelos ML
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4" id="analysis-results-dashboard">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
        <div>
          <h2 className="text-2xl font-bold">Resultados del Análisis</h2>
          <p className="text-muted-foreground">
            Modelo: {modelType || 'No especificado'} | Industria: {industry || 'General'}
          </p>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={exportToPDF}
            disabled={exportLoading}
            className="flex items-center gap-2"
          >
            <FileText className="h-4 w-4" />
            Exportar a PDF
          </Button>
          
          <Button 
            variant="outline" 
            size="sm"
            onClick={onDownloadResults}
            disabled={!onDownloadResults || exportLoading}
            className="flex items-center gap-2"
          >
            <FileBarChart2 className="h-4 w-4" />
            Descargar Excel
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-4 mb-4">
          <TabsTrigger value="visualizations" className="flex items-center gap-1">
            <Image className="h-4 w-4" />
            Visualizaciones
          </TabsTrigger>
          <TabsTrigger value="metrics" className="flex items-center gap-1">
            <FileBarChart2 className="h-4 w-4" />
            Métricas
          </TabsTrigger>
          <TabsTrigger value="recommendations" className="flex items-center gap-1">
            <Lightbulb className="h-4 w-4" />
            Recomendaciones
          </TabsTrigger>
          <TabsTrigger value="methodology" className="flex items-center gap-1">
            <Info className="h-4 w-4" />
            Metodología
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="visualizations">
          {visualizations && visualizations.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {visualizations.map((viz, index) => (
                <Card key={`viz-${index}`}>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        {getChartIcon(viz.type)}
                        <CardTitle className="ml-2 text-lg">{viz.title}</CardTitle>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => downloadChartAsImage(`chart-${viz.type}-${index}`, `${viz.title.replace(/\s+/g, '_').toLowerCase()}`)}
                        disabled={exportLoading}
                      >
                        <FileImage className="h-4 w-4" />
                      </Button>
                    </div>
                    <CardDescription>{viz.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2">
                    {getChartComponent(viz, index)}
                  </CardContent>
                  <CardFooter className="pt-0 text-xs text-muted-foreground">
                    Datos {result ? 'reales' : 'demo'} | Tipo: {viz.type}
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="py-8 text-center">
                <AlertCircle className="h-8 w-8 text-muted-foreground mx-auto mb-4" />
                <p className="font-medium">No hay visualizaciones disponibles</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Este modelo no generó visualizaciones o aún está pendiente el procesamiento
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
        
        <TabsContent value="metrics">
          {resultMetrics && Object.keys(resultMetrics).length > 0 ? (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Métricas de rendimiento</CardTitle>
                  <CardDescription>
                    Indicadores clave del rendimiento del modelo
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {Object.entries(resultMetrics)
                      .filter(([key, value]) => typeof value === 'number' && !Array.isArray(value) && !key.includes('_raw'))
                      .map(([key, value]) => (
                        <div key={key} className="bg-slate-50 p-3 rounded-md">
                          <p className="text-sm font-medium capitalize">
                            {key.replace(/_/g, ' ')}
                          </p>
                          <p className="text-2xl font-semibold">
                            {typeof value === 'number' ? 
                              (value > 0.01 && value < 100 ? value.toFixed(4) : value.toLocaleString()) : 
                              String(value)
                            }
                          </p>
                        </div>
                      ))
                    }
                  </div>
                </CardContent>
              </Card>
              
              {/* Show additional metric sections based on model type */}
              {['random_forest', 'xgboost', 'svm', 'logistic_regression'].includes(modelType) && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Matriz de confusión</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {resultMetrics.confusion_matrix ? (
                      <div className="overflow-auto">
                        <table className="w-full border-collapse">
                          <thead>
                            <tr>
                              <th className="border p-2 bg-slate-100"></th>
                              <th className="border p-2 bg-slate-100">Pred. Positivo</th>
                              <th className="border p-2 bg-slate-100">Pred. Negativo</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="border p-2 bg-slate-100 font-medium">Real Positivo</td>
                              <td className="border p-2 text-center bg-green-50">
                                {resultMetrics.confusion_matrix[0][0]}
                              </td>
                              <td className="border p-2 text-center bg-red-50">
                                {resultMetrics.confusion_matrix[0][1]}
                              </td>
                            </tr>
                            <tr>
                              <td className="border p-2 bg-slate-100 font-medium">Real Negativo</td>
                              <td className="border p-2 text-center bg-red-50">
                                {resultMetrics.confusion_matrix[1][0]}
                              </td>
                              <td className="border p-2 text-center bg-green-50">
                                {resultMetrics.confusion_matrix[1][1]}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      <p className="text-muted-foreground">No hay datos de matriz de confusión disponibles</p>
                    )}
                  </CardContent>
                </Card>
              )}
              
              {/* Time Series Model Metrics */}
              {['sarima', 'arima', 'prophet', 'exponential_smoothing'].includes(modelType) && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Métricas de serie temporal</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-slate-50 p-4 rounded-md">
                        <h3 className="font-medium mb-2">Errores de predicción</h3>
                        <div className="space-y-2">
                          {['mape', 'rmse', 'mae', 'mse'].map(metric => (
                            resultMetrics[metric] !== undefined && (
                              <div key={metric} className="flex justify-between">
                                <span className="text-sm uppercase">{metric}:</span>
                                <span className="font-medium">
                                  {typeof resultMetrics[metric] === 'number' 
                                    ? resultMetrics[metric].toFixed(4)
                                    : 'N/A'}
                                </span>
                              </div>
                            )
                          ))}
                        </div>
                      </div>
                      <div className="bg-slate-50 p-4 rounded-md">
                        <h3 className="font-medium mb-2">Estadísticas del modelo</h3>
                        <div className="space-y-2">
                          {['aic', 'bic', 'log_likelihood'].map(metric => (
                            resultMetrics[metric] !== undefined && (
                              <div key={metric} className="flex justify-between">
                                <span className="text-sm uppercase">{metric}:</span>
                                <span className="font-medium">
                                  {typeof resultMetrics[metric] === 'number' 
                                    ? resultMetrics[metric].toFixed(4)
                                    : 'N/A'}
                                </span>
                              </div>
                            )
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
              
              {/* Clustering Model Metrics */}
              {['kmeans', 'hierarchical', 'dbscan'].includes(modelType) && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Métricas de agrupamiento</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-slate-50 p-4 rounded-md">
                        <h3 className="font-medium mb-2">Calidad de clusters</h3>
                        <div className="space-y-2">
                          {['silhouette_score', 'davies_bouldin_score', 'calinski_harabasz_score'].map(metric => (
                            resultMetrics[metric] !== undefined && (
                              <div key={metric} className="flex justify-between">
                                <span className="text-sm capitalize">{metric.replace(/_/g, ' ')}:</span>
                                <span className="font-medium">
                                  {typeof resultMetrics[metric] === 'number' 
                                    ? resultMetrics[metric].toFixed(4)
                                    : 'N/A'}
                                </span>
                              </div>
                            )
                          ))}
                        </div>
                      </div>
                      <div className="bg-slate-50 p-4 rounded-md">
                        <h3 className="font-medium mb-2">Distribución de clusters</h3>
                        {resultMetrics.cluster_sizes ? (
                          <div className="space-y-2">
                            {Object.entries(resultMetrics.cluster_sizes).map(([cluster, count]) => (
                              <div key={cluster} className="flex justify-between">
                                <span className="text-sm">Cluster {cluster}:</span>
                                <span className="font-medium">{String(count)} elementos</span>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-muted-foreground">No hay datos de distribución disponibles</p>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          ) : (
            <Card>
              <CardContent className="py-8 text-center">
                <AlertCircle className="h-8 w-8 text-muted-foreground mx-auto mb-4" />
                <p className="font-medium">No hay métricas disponibles</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Este modelo no generó métricas o aún está pendiente el procesamiento
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
        
        <TabsContent value="recommendations">
          <MCPRecommendations 
            modelType={modelType}
            industry={industry}
            metrics={resultMetrics}
            result={result}
          />
        </TabsContent>
        
        <TabsContent value="methodology">
          {compatibleFlows.length > 0 ? (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Metodologías de análisis recomendadas</CardTitle>
                  <CardDescription>
                    Flujos metodológicos que se complementan para maximizar el valor de sus datos
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs 
                    value={methodologyTab} 
                    onValueChange={setMethodologyTab}
                    className="w-full"
                  >
                    <TabsList className="mb-4 w-full flex flex-wrap h-auto">
                      {compatibleFlows.map((flow: MethodologyFlow) => (
                        <TabsTrigger 
                          key={flow.id}
                          value={flow.id} 
                          className="flex-1 h-auto py-2 whitespace-normal"
                        >
                          {flow.name}
                        </TabsTrigger>
                      ))}
                    </TabsList>
                    
                    {compatibleFlows.map((flow: MethodologyFlow) => (
                      <TabsContent key={flow.id} value={flow.id} className="space-y-4">
                        <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                          <h3 className="font-medium text-lg">{flow.name}</h3>
                          <p className="text-blue-700 mt-1">{flow.description}</p>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                          <Card>
                            <CardHeader className="py-3 px-4">
                              <CardTitle className="text-base">Datos de entrada requeridos</CardTitle>
                            </CardHeader>
                            <CardContent className="py-2 px-4">
                              <ul className="list-disc list-inside space-y-1">
                                {flow.requiredInputs.map((input, idx) => (
                                  <li key={idx} className="text-sm">{input}</li>
                                ))}
                              </ul>
                            </CardContent>
                          </Card>
                          
                          <Card>
                            <CardHeader className="py-3 px-4">
                              <CardTitle className="text-base">Resultados esperados</CardTitle>
                            </CardHeader>
                            <CardContent className="py-2 px-4">
                              <ul className="list-disc list-inside space-y-1">
                                {flow.outputs.map((output, idx) => (
                                  <li key={idx} className="text-sm">{output}</li>
                                ))}
                              </ul>
                            </CardContent>
                          </Card>
                          
                          <Card>
                            <CardHeader className="py-3 px-4">
                              <CardTitle className="text-base">Visualizaciones recomendadas</CardTitle>
                            </CardHeader>
                            <CardContent className="py-2 px-4">
                              <ul className="list-disc list-inside space-y-1">
                                {flow.visualizations.map((viz, idx) => (
                                  <li key={idx} className="text-sm">{viz.name}</li>
                                ))}
                              </ul>
                            </CardContent>
                          </Card>
                        </div>
                        
                        <Card>
                          <CardHeader className="py-3 px-4">
                            <CardTitle className="text-base">Flujos complementarios</CardTitle>
                            <CardDescription>
                              Estos flujos aumentan el valor cuando se combinan con {flow.name}
                            </CardDescription>
                          </CardHeader>
                          <CardContent className="py-2 px-4">
                            <div className="flex flex-wrap gap-2">
                              {flow.complementaryFlows.map(compFlowId => {
                                const compFlow = compatibleFlows.find(f => f.id === compFlowId);
                                return compFlow ? (
                                  <Button 
                                    key={compFlowId}
                                    variant="outline" 
                                    size="sm"
                                    onClick={() => setMethodologyTab(compFlowId)}
                                    className="flex items-center gap-1"
                                  >
                                    {compFlow.name}
                                    <ArrowUpRight className="h-3 w-3" />
                                  </Button>
                                ) : null;
                              })}
                            </div>
                          </CardContent>
                        </Card>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                          <div className="bg-slate-50 p-4 rounded-lg border">
                            <h4 className="font-medium">Valor para el negocio</h4>
                            <p className="text-sm text-slate-700 mt-1">{flow.businessValue}</p>
                          </div>
                          <div className="bg-slate-50 p-4 rounded-lg border">
                            <h4 className="font-medium">Expertise requerido</h4>
                            <p className="text-sm text-slate-700 mt-1">{flow.expertise}</p>
                            <div className="mt-2 flex items-center gap-1">
                              <span className="text-xs">Tiempo de implementación:</span>
                              <span className="text-xs font-medium px-2 py-0.5 bg-blue-100 rounded-full text-blue-800">
                                {flow.implementationTime === 'short' ? 'Corto' : 
                                 flow.implementationTime === 'medium' ? 'Medio' : 'Largo'}
                              </span>
                              <span className="text-xs ml-2">ROI esperado:</span>
                              <span className="text-xs font-medium px-2 py-0.5 bg-green-100 rounded-full text-green-800">
                                {flow.roi === 'low' ? 'Bajo' : 
                                 flow.roi === 'medium' ? 'Medio' : 'Alto'}
                              </span>
                            </div>
                          </div>
                        </div>
                      </TabsContent>
                    ))}
                  </Tabs>
                </CardContent>
              </Card>
              
              {/* Visualization Recommendations */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Visualizaciones Recomendadas</CardTitle>
                  <CardDescription>
                    Tipos de visualizaciones óptimas para los datos analizados
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {recommendedVisualizations.slice(0, 6).map((viz: VisualizationType) => (
                      <div key={viz.id} className="border rounded-lg p-4 hover:bg-slate-50 transition-colors">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium">{viz.name}</h4>
                          {getChartIcon(viz.chartType)}
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">{viz.description}</p>
                        <div>
                          <h5 className="text-xs font-medium text-slate-500 mb-1">Requisitos de datos:</h5>
                          <div className="flex flex-wrap gap-1">
                            {viz.dataRequirements.map((req, idx) => (
                              <span key={idx} className="text-xs bg-slate-100 px-2 py-0.5 rounded">
                                {req}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              {/* Implementation Guide */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Guía de implementación</CardTitle>
                  <CardDescription>
                    Pasos recomendados para aplicar las metodologías seleccionadas
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ol className="space-y-4">
                    <li className="flex">
                      <span className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-800 font-medium mr-3">1</span>
                      <div>
                        <h4 className="font-medium">Preparación y validación de datos</h4>
                        <p className="text-sm text-muted-foreground">
                          Limpie y prepare sus datos según los requisitos de entrada de la metodología seleccionada.
                          Verifique la calidad de los datos y asegúrese de que sean representativos del problema.
                        </p>
                      </div>
                    </li>
                    <li className="flex">
                      <span className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-800 font-medium mr-3">2</span>
                      <div>
                        <h4 className="font-medium">Aplicación secuencial de metodologías</h4>
                        <p className="text-sm text-muted-foreground">
                          Comience con análisis descriptivo y exploratorio, luego avance hacia
                          diagnóstico, predictivo y finalmente prescriptivo. Cada etapa aprovecha
                          los resultados de la anterior.
                        </p>
                      </div>
                    </li>
                    <li className="flex">
                      <span className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-800 font-medium mr-3">3</span>
                      <div>
                        <h4 className="font-medium">Validación cruzada de resultados</h4>
                        <p className="text-sm text-muted-foreground">
                          Compare los resultados de diferentes metodologías para validar hallazgos
                          y obtener una imagen más completa. Busque patrones o insights que se confirmen
                          a través de múltiples enfoques.
                        </p>
                      </div>
                    </li>
                    <li className="flex">
                      <span className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-800 font-medium mr-3">4</span>
                      <div>
                        <h4 className="font-medium">Implementación de recomendaciones</h4>
                        <p className="text-sm text-muted-foreground">
                          Traduzca los insights analíticos en acciones concretas. Priorice basándose
                          en impacto estimado y facilidad de implementación. Establezca métricas
                          para medir el éxito.
                        </p>
                      </div>
                    </li>
                    <li className="flex">
                      <span className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-800 font-medium mr-3">5</span>
                      <div>
                        <h4 className="font-medium">Monitoreo y mejora continua</h4>
                        <p className="text-sm text-muted-foreground">
                          Establezca un ciclo de retroalimentación para monitorear resultados y
                          refinar continuamente el análisis. Actualice datos y modelos periódicamente.
                        </p>
                      </div>
                    </li>
                  </ol>
                </CardContent>
              </Card>
            </div>
          ) : (
            <Card>
              <CardContent className="py-8 text-center">
                <AlertCircle className="h-8 w-8 text-muted-foreground mx-auto mb-4" />
                <p className="font-medium">No hay metodologías disponibles</p>
                <p className="text-sm text-muted-foreground mt-1">
                  No se encontraron flujos metodológicos compatibles con el modelo actual
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
      
      {/* Help section */}
      <div className="mt-6 bg-slate-50 p-4 rounded-lg border border-slate-200">
        <div className="flex items-start">
          <HelpCircle className="h-5 w-5 text-slate-500 mr-2 mt-0.5" />
          <div>
            <h3 className="font-medium">¿Cómo interpretar estos resultados?</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Los resultados se basan en el procesamiento de sus datos con el modelo {modelType || 'seleccionado'}.
              Las visualizaciones, métricas y recomendaciones son generadas automáticamente para ayudarle a 
              entender los patrones y tendencias en sus datos. Utilice las herramientas de exportación para guardar
              estos análisis y compartirlos con su equipo.
            </p>
            <div className="mt-2 text-sm">
              <span className="font-medium mr-1">Consejo:</span>
              <span className="text-muted-foreground">
                Revise las recomendaciones de MCP para obtener sugerencias sobre cómo mejorar sus análisis
                o qué acciones tomar basadas en los resultados.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
