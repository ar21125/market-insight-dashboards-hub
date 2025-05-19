
import React, { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Download, 
  FileBarChart, 
  Loader2, 
  FileText, 
  LineChart, 
  BarChart, 
  PieChart,
  Map,
  Table,
  FileImage
} from "lucide-react";
import { mlService } from '@/services/mlService';
import { toast } from "sonner";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import {
  SimpleBarChart,
  GroupedBarChart,
  SimpleLineChart,
  SimplePieChart,
  SimpleAreaChart,
  MultiLineChart
} from '@/components/ChartComponents';

interface AnalysisResultsProps {
  resultId: string | null;
  isLoading: boolean;
  result: any;
}

export const AnalysisResults: React.FC<AnalysisResultsProps> = ({
  resultId,
  isLoading,
  result
}) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [isPdfDownloading, setIsPdfDownloading] = useState(false);
  const chartsRef = useRef<HTMLDivElement>(null);
  
  const handleDownload = async () => {
    if (!resultId) return;
    
    setIsDownloading(true);
    try {
      const downloadUrl = await mlService.downloadResults(resultId);
      
      if (downloadUrl) {
        // Create a temporary link and trigger download
        const a = document.createElement('a');
        a.href = downloadUrl;
        a.download = `analysis_result_${resultId}.xlsx`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        toast.success("Descarga iniciada");
      } else {
        toast.error("Error al generar la descarga");
      }
    } catch (error) {
      console.error("Download error:", error);
      toast.error("No se pudo descargar el archivo");
    } finally {
      setIsDownloading(false);
    }
  };
  
  const handlePdfDownload = async () => {
    if (!chartsRef.current) return;
    
    setIsPdfDownloading(true);
    try {
      const canvas = await html2canvas(chartsRef.current);
      const imgData = canvas.toDataURL('image/png');
      
      const pdf = new jsPDF('l', 'mm', 'a4');
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`analysis_dashboard_${resultId}.pdf`);
      
      toast.success("PDF generado correctamente");
    } catch (error) {
      console.error("PDF generation error:", error);
      toast.error("Error al generar el PDF");
    } finally {
      setIsPdfDownloading(false);
    }
  };
  
  const handleImageDownload = async () => {
    if (!chartsRef.current) return;
    
    try {
      const canvas = await html2canvas(chartsRef.current);
      const imgData = canvas.toDataURL('image/png');
      
      const a = document.createElement('a');
      a.href = imgData;
      a.download = `analysis_dashboard_${resultId}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      
      toast.success("Imagen descargada correctamente");
    } catch (error) {
      console.error("Image download error:", error);
      toast.error("Error al descargar la imagen");
    }
  };
  
  // Helper function to render dynamic charts based on visualization type
  const renderChart = (visualization: any, data: any) => {
    switch (visualization.type) {
      case 'bar':
        return <SimpleBarChart data={data || []} />;
      case 'line':
        return <SimpleLineChart data={data || []} />;
      case 'pie':
        return <SimplePieChart data={data || []} />;
      case 'area':
        return <SimpleAreaChart data={data || []} />;
      case 'grouped_bar':
        return <GroupedBarChart data={data || []} />;
      case 'multi_line':
        return <MultiLineChart data={data || []} />;
      default:
        return <div className="h-48 flex items-center justify-center bg-gray-100 rounded-md">
          <p className="text-gray-500">Visualización no disponible</p>
        </div>;
    }
  };
  
  const getModelIcon = (type: string) => {
    // Return appropriate icon based on chart type
    switch (type) {
      case 'line':
      case 'area':
      case 'multi_line':
        return <LineChart className="h-5 w-5 text-blue-500" />;
      case 'bar':
      case 'grouped_bar':
        return <BarChart className="h-5 w-5 text-green-500" />;
      case 'pie':
        return <PieChart className="h-5 w-5 text-purple-500" />;
      case 'scatter':
        return <Map className="h-5 w-5 text-amber-500" />;
      case 'heatmap':
      case 'table':
        return <Table className="h-5 w-5 text-red-500" />;
      default:
        return <FileBarChart className="h-5 w-5 text-gray-500" />;
    }
  };
  
  if (!resultId) {
    return null;
  }
  
  if (isLoading) {
    return (
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="text-lg flex items-center">
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            Procesando análisis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Estamos procesando su archivo. Esto puede tomar unos minutos dependiendo del tamaño del archivo y la complejidad del análisis.
          </p>
          <div className="mt-4 h-2.5 w-full bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-primary rounded-full animate-pulse" style={{ width: '70%' }}></div>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  if (!result) {
    return (
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="text-lg text-red-500">
            Error al obtener resultados
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            No se pudieron obtener los resultados del análisis. Por favor, inténtelo de nuevo más tarde o contacte con soporte.
          </p>
        </CardContent>
      </Card>
    );
  }
  
  // Extract visualization recommendations if available
  const visualizations = result?.result?.visualizations || [];
  // Extract complementary analyses if available
  const complementaryAnalyses = result?.result?.complementary_analyses || [];
  
  // Generate sample data for visualizations if real data is not available
  const generateSampleData = (type: string) => {
    switch (type) {
      case 'bar':
      case 'line':
        return Array(5).fill(0).map((_, i) => ({
          name: `Item ${i + 1}`,
          value: Math.floor(Math.random() * 100) + 20
        }));
      case 'pie':
        return Array(4).fill(0).map((_, i) => ({
          name: `Categoría ${i + 1}`,
          value: Math.floor(Math.random() * 100) + 10
        }));
      case 'area':
        return Array(7).fill(0).map((_, i) => ({
          name: `Día ${i + 1}`,
          value: Math.floor(Math.random() * 100) + 50
        }));
      case 'grouped_bar':
      case 'multi_line':
        return Array(5).fill(0).map((_, i) => ({
          name: `Grupo ${i + 1}`,
          serie1: Math.floor(Math.random() * 100) + 20,
          serie2: Math.floor(Math.random() * 100) + 20,
          serie3: Math.floor(Math.random() * 100) + 20
        }));
      default:
        return Array(5).fill(0).map((_, i) => ({
          name: `Item ${i + 1}`,
          value: Math.floor(Math.random() * 100) + 20
        }));
    }
  };
  
  // Display result if available
  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle className="text-lg flex items-center justify-between">
          <div className="flex items-center">
            <FileBarChart className="h-5 w-5 mr-2 text-primary" />
            Resultados del Análisis
          </div>
          <div className="flex space-x-2">
            <Button 
              onClick={handleImageDownload}
              variant="outline"
              size="sm"
              className="flex items-center text-xs"
            >
              <FileImage className="h-3 w-3 mr-1" />
              PNG
            </Button>
            <Button 
              onClick={handlePdfDownload}
              variant="outline"
              size="sm"
              className="flex items-center text-xs"
              disabled={isPdfDownloading}
            >
              {isPdfDownloading ? (
                <Loader2 className="h-3 w-3 mr-1 animate-spin" />
              ) : (
                <FileText className="h-3 w-3 mr-1" />
              )}
              PDF
            </Button>
            <Button 
              onClick={handleDownload}
              variant="outline"
              size="sm"
              className="flex items-center text-xs"
              disabled={isDownloading}
            >
              {isDownloading ? (
                <Loader2 className="h-3 w-3 mr-1 animate-spin" />
              ) : (
                <Download className="h-3 w-3 mr-1" />
              )}
              Excel
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {result.status === 'completed' ? (
          <div className="space-y-4" ref={chartsRef}>
            <div className="bg-green-50 border border-green-200 rounded-md p-3">
              <p className="text-green-700 font-medium">El análisis se ha completado con éxito</p>
            </div>
            
            {/* Display metrics if available */}
            {result.metrics && Object.keys(result.metrics).length > 0 && (
              <div className="space-y-2">
                <h3 className="font-medium">Métricas</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {Object.entries(result.metrics).map(([key, value]) => (
                    <div key={key} className="bg-gray-50 p-2 rounded">
                      <p className="text-xs text-gray-500">{key}</p>
                      <p className="font-medium">{String(value)}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Show summary if available */}
            {result.result?.summary && (
              <div className="space-y-2">
                <h3 className="font-medium">Resumen</h3>
                <p className="text-sm">{result.result.summary}</p>
              </div>
            )}
            
            {/* Dynamic visualizations based on model type */}
            {visualizations.length > 0 && (
              <div className="space-y-4">
                <h3 className="font-medium">Visualizaciones del Análisis</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {visualizations.map((viz, index) => (
                    <Card key={index} className="overflow-hidden">
                      <CardHeader className="py-2 px-4 bg-gray-50 flex flex-row items-center justify-between">
                        <div className="flex items-center">
                          {getModelIcon(viz.type)}
                          <CardTitle className="text-sm ml-2">{viz.title}</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent className="p-4">
                        <p className="text-xs text-gray-500 mb-3">{viz.description}</p>
                        <div className="h-64">
                          {renderChart(viz, result.result?.chartData?.[index] || generateSampleData(viz.type))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
            
            {/* Complementary analyses recommendations */}
            {complementaryAnalyses.length > 0 && (
              <div className="space-y-4 mt-6">
                <h3 className="font-medium">Análisis Complementarios Recomendados</h3>
                <div className="bg-blue-50 border border-blue-100 rounded-md p-4">
                  <p className="text-sm text-blue-800 mb-3">
                    Basado en su análisis actual, recomendamos los siguientes análisis complementarios para obtener insights más completos:
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {complementaryAnalyses.map((analysis, index) => (
                      <div key={index} className="bg-white p-3 rounded-md border border-blue-100 flex items-start">
                        <div className="p-2 bg-blue-100 rounded-md mr-3">
                          <FileBarChart className="h-4 w-4 text-blue-700" />
                        </div>
                        <div>
                          <h4 className="font-medium text-sm">{analysis.name}</h4>
                          <p className="text-xs text-gray-600 mt-1">{analysis.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
            
            {/* Download buttons */}
            <div className="flex flex-wrap gap-2 mt-4">
              <Button 
                onClick={handleDownload}
                variant="outline"
                disabled={isDownloading}
              >
                {isDownloading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Descargando...
                  </>
                ) : (
                  <>
                    <Download className="h-4 w-4 mr-2" />
                    Descargar resultados en Excel
                  </>
                )}
              </Button>
              
              <Button 
                onClick={handlePdfDownload}
                variant="outline"
                disabled={isPdfDownloading}
              >
                {isPdfDownloading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Generando PDF...
                  </>
                ) : (
                  <>
                    <FileText className="h-4 w-4 mr-2" />
                    Descargar dashboard en PDF
                  </>
                )}
              </Button>
              
              <Button 
                onClick={handleImageDownload}
                variant="outline"
              >
                <FileImage className="h-4 w-4 mr-2" />
                Descargar como imagen PNG
              </Button>
            </div>
          </div>
        ) : result.status === 'failed' ? (
          <div className="bg-red-50 border border-red-200 rounded-md p-3">
            <p className="text-red-700 font-medium">El análisis no se pudo completar</p>
            {result.error && (
              <p className="text-sm text-red-600 mt-2">{result.error}</p>
            )}
          </div>
        ) : (
          <div className="flex items-center">
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            <p>Procesando... ({result.status})</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
