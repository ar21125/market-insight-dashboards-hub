
import React, { useState, useEffect, useRef } from 'react';
import { SimpleBarChart, GroupedBarChart, SimpleLineChart, MultiLineChart, SimplePieChart, SimpleAreaChart, SimpleScatterChart, SimpleRadarChart, MultiRadarChart, BoxPlot, HeatMap } from './ChartComponents';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ArrowRight, BarChart, Download, Info, LineChart, PieChart, ScatterChart, ArrowUpRight as ArrowUpRightIcon } from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { MCPRecommendations } from './MCPRecommendations';
import { methodologyService } from '@/services/methodologyService';

interface AnalysisResultsProps {
  analysisResult: any;
  metrics: any;
  loading: boolean;
  modelType: string;
  industry: string;
}

interface Visualization {
  type: string;
  title: string;
  description: string;
}

interface ActionRecommendation {
  type: string;
  title: string;
  description: string;
  priority: string;
}

interface ImportantVariable {
  name: string;
  importance: number;
}

const renderChart = (type: string, data: any[], id: string) => {
  switch (type) {
    case 'bar':
      return <SimpleBarChart data={data} id={id} />;
    case 'groupedBar':
      return <GroupedBarChart data={data} id={id} />;
    case 'line':
      return <SimpleLineChart data={data} id={id} />;
    case 'multiLine':
      return <MultiLineChart data={data} id={id} />;
    case 'pie':
      return <SimplePieChart data={data} id={id} />;
    case 'area':
      return <SimpleAreaChart data={data} id={id} />;
    case 'scatter':
      return <SimpleScatterChart data={data} id={id} />;
    case 'radar':
      return <SimpleRadarChart data={data} id={id} />;
    case 'multiRadar':
      return <MultiRadarChart data={data} id={id} />;
    case 'boxplot':
      return <BoxPlot data={data} id={id} />;
    case 'heatmap':
      return <HeatMap data={data} id={id} />;
    default:
      return <Alert variant="destructive">
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          Unsupported chart type: {type}
        </AlertDescription>
      </Alert>;
  }
};

const exportChartAsPDF = async (chartId: string, chartTitle: string) => {
  const element = document.getElementById(chartId);
  if (!element) {
    console.error(`Element with id ${chartId} not found`);
    return;
  }

  try {
    const canvas = await html2canvas(element, { scale: 2 });
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    const margin = 10;

    pdf.addImage(imgData, 'PNG', margin, margin, pdfWidth - 2 * margin, pdfHeight - 2 * margin);
    pdf.save(`${chartTitle}.pdf`);
  } catch (error) {
    console.error('Error exporting chart to PDF:', error);
  }
};

export const AnalysisResults: React.FC<AnalysisResultsProps> = ({ 
  analysisResult, 
  metrics, 
  loading, 
  modelType,
  industry
}) => {
  const [activeTab, setActiveTab] = useState("results");
  const [showAllRecommendations, setShowAllRecommendations] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = 0;
    }
  }, [activeTab]);

  if (loading) {
    return <p>Cargando resultados...</p>;
  }

  if (!analysisResult) {
    return <p>No hay resultados para mostrar.</p>;
  }

  const visualizations: Visualization[] = analysisResult.visualizations || [];
  const actionRecommendations: ActionRecommendation[] = analysisResult.action_recommendations || [];
  const importantVariables: ImportantVariable[] = analysisResult.important_variables || [];
  const complementaryAnalyses: string[] = analysisResult.complementary_analyses || [];

  const toggleRecommendations = () => {
    setShowAllRecommendations(!showAllRecommendations);
  };

  const displayedRecommendations = showAllRecommendations
    ? actionRecommendations
    : actionRecommendations.slice(0, 3);

  const renderVisualization = (visualization: Visualization, index: number) => {
    const chartId = `chart-${modelType}-${index}`;
    return (
      <Card key={index} className="overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">{visualization.title}</CardTitle>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Download className="h-4 w-4 cursor-pointer text-muted-foreground hover:text-foreground" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Descargar como PDF</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <Download className="h-4 w-4 cursor-pointer text-muted-foreground hover:text-foreground" onClick={() => exportChartAsPDF(chartId, visualization.title)} />
        </CardHeader>
        <CardContent>
          {renderChart(visualization.type, analysisResult[visualization.type + 'Data'], chartId)}
        </CardContent>
        <CardFooter className="text-xs text-muted-foreground">
          {visualization.description}
        </CardFooter>
      </Card>
    );
  };

  const renderMethodologyContent = () => {
    const methodologyData = methodologyService.getMethodologyForModel(modelType, industry);
    
    if (!methodologyData || methodologyData.length === 0) {
      return (
        <div className="text-center py-10">
          <p className="text-muted-foreground">No se encontró metodología para este tipo de análisis</p>
        </div>
      );
    }

    return (
      <div className="space-y-8">
        <div className="grid gap-6">
          {methodologyData.map((block, blockIndex) => (
            <Card key={blockIndex} className="overflow-hidden">
              <CardHeader className="bg-muted/50">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-medium">{block.name}</CardTitle>
                  <Badge variant={block.recommended ? "default" : "outline"}>
                    {block.recommended ? "Recomendado" : "Opcional"}
                  </Badge>
                </div>
                <CardDescription>{block.description}</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium mb-2 flex items-center">
                      <Info className="h-4 w-4 mr-1 text-muted-foreground" /> 
                      ¿Qué necesito para comenzar?
                    </h4>
                    <div className="bg-muted p-4 rounded-md">
                      <ul className="list-disc list-inside space-y-2 text-sm">
                        {block.inputs.map((input, i) => (
                          <li key={i} className="text-muted-foreground">
                            <span className="font-medium text-foreground">{input.name}</span>: {input.description}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-2 flex items-center">
                      <BarChart className="h-4 w-4 mr-1 text-muted-foreground" /> 
                      Visualizaciones Recomendadas
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {block.visualizations.map((viz, i) => (
                        <div key={i} className="flex items-center space-x-2 bg-muted/50 p-2 rounded-md">
                          {viz.type === 'bar' && <BarChart className="h-4 w-4 text-primary" />}
                          {viz.type === 'line' && <LineChart className="h-4 w-4 text-primary" />}
                          {viz.type === 'pie' && <PieChart className="h-4 w-4 text-primary" />}
                          {viz.type === 'scatter' && <ScatterChart className="h-4 w-4 text-primary" />}
                          <span className="text-sm">{viz.name} - {viz.description}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium mb-2 flex items-center">
                      <ArrowRight className="h-4 w-4 mr-1 text-muted-foreground" /> 
                      Resultados que obtendrá
                    </h4>
                    <div className="bg-muted p-4 rounded-md">
                      <ul className="list-disc list-inside space-y-2 text-sm">
                        {block.outputs.map((output, i) => (
                          <li key={i} className="text-muted-foreground">
                            <span className="font-medium text-foreground">{output.name}</span>: {output.description}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="bg-muted/30 flex justify-between">
                <div className="text-sm text-muted-foreground">
                  Tiempo estimado: {block.estimatedTime}
                </div>
                <Button variant="outline" size="sm" className="gap-1">
                  Ver más detalles
                  <ArrowUpRightIcon className="h-3 w-3" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    );
  };
  
  return (
    <ScrollArea ref={containerRef} className="h-[650px] w-full">
      <div className="p-4 space-y-4">
        <Tabs defaultValue="results" className="w-full" onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="results">Resultados</TabsTrigger>
            <TabsTrigger value="recommendations">Recomendaciones</TabsTrigger>
            <TabsTrigger value="variables">Variables Importantes</TabsTrigger>
             {/* Conditionally render the methodology tab */}
             {methodologyService.hasMethodologyForModel(modelType, industry) && (
              <TabsTrigger value="methodology">Metodología</TabsTrigger>
            )}
            {complementaryAnalyses.length > 0 && (
              <TabsTrigger value="complementary">Análisis Complementarios</TabsTrigger>
            )}
          </TabsList>
          <TabsContent value="results" className="space-y-4 pt-4">
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {visualizations.map((visualization, index) => (
                renderVisualization(visualization, index)
              ))}
            </div>
          </TabsContent>
          <TabsContent value="recommendations" className="space-y-4 pt-4">
            <div className="space-y-2">
              {displayedRecommendations.map((recommendation, index) => (
                <Alert key={index} variant="default">
                  <AlertTitle>{recommendation.title}</AlertTitle>
                  <AlertDescription>{recommendation.description}</AlertDescription>
                </Alert>
              ))}
              {actionRecommendations.length > 3 && (
                <Button variant="link" onClick={toggleRecommendations}>
                  {showAllRecommendations ? "Ver menos" : `Ver todas (${actionRecommendations.length})`}
                </Button>
              )}
            </div>
          </TabsContent>
          <TabsContent value="variables" className="space-y-4 pt-4">
            {importantVariables.length > 0 ? (
              <div className="space-y-2">
                {importantVariables.map((variable, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle>{variable.name}</CardTitle>
                      <CardDescription>Importancia: {variable.importance.toFixed(2)}</CardDescription>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-4">
                <p className="text-muted-foreground">No hay variables importantes para mostrar.</p>
              </div>
            )}
          </TabsContent>
          <TabsContent value="methodology" className="space-y-4 pt-4">
            {renderMethodologyContent()}
          </TabsContent>
          <TabsContent value="complementary" className="space-y-4 pt-4">
            <MCPRecommendations modelTypes={complementaryAnalyses} />
          </TabsContent>
        </Tabs>
      </div>
    </ScrollArea>
  );
}
