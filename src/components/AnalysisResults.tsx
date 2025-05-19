
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, FileBarChart, Loader2 } from "lucide-react";
import { mlService } from '@/services/mlService';
import { toast } from "sonner";

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
  
  // Display result if available
  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle className="text-lg flex items-center">
          <FileBarChart className="h-5 w-5 mr-2 text-primary" />
          Resultados del Análisis
        </CardTitle>
      </CardHeader>
      <CardContent>
        {result.status === 'completed' ? (
          <div className="space-y-4">
            <div className="bg-green-50 border border-green-200 rounded-md p-3">
              <p className="text-green-700 font-medium">El análisis se ha completado con éxito</p>
            </div>
            
            {/* Display metrics if available */}
            {result.metrics && Object.keys(result.metrics).length > 0 && (
              <div className="space-y-2">
                <h3 className="font-medium">Métricas</h3>
                <div className="grid grid-cols-2 gap-2">
                  {Object.entries(result.metrics).map(([key, value]) => (
                    <div key={key} className="bg-gray-50 p-2 rounded">
                      <p className="text-xs text-gray-500">{key}</p>
                      <p className="font-medium">{value?.toString()}</p>
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
            
            <Button 
              onClick={handleDownload}
              variant="outline"
              disabled={isDownloading}
              className="w-full"
            >
              {isDownloading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Descargando...
                </>
              ) : (
                <>
                  <Download className="h-4 w-4 mr-2" />
                  Descargar resultados completos
                </>
              )}
            </Button>
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
