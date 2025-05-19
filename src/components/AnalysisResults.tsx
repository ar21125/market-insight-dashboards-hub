import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRight, FileSearch, Activity, Download, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from "@/components/ui/button";
import { API_URL } from '@/config';
import { MCPRecommendations } from '@/components/MCPRecommendations';

interface AnalysisStep {
  id: string;
  name: string;
  description: string;
  modelType: string;
  prerequisiteSteps: string[];
  inputFields: { name: string; description: string; example: string; required: boolean; type: string }[];
  outputInsights: { name: string; description: string; businessValue: string; visualizationType: string }[];
  estimatedProcessingTime: string;
  difficulty: string;
}

interface MethodologyFlow {
  id: string;
  name: string;
  description: string;
  industry: string;
  businessGoal: string;
  steps: AnalysisStep[];
  totalEstimatedTime: string;
  recommendedTools: string[];
}

// Mock function to simulate fetching methodology by type
const getMethodologyByType = (modelType: string): MethodologyFlow => {
  // Replace this with actual data fetching logic
  return {
    id: 'mock-methodology',
    name: 'Metodología de ejemplo',
    description: 'Esta es una metodología de ejemplo para el tipo de modelo ' + modelType,
    industry: 'varios',
    businessGoal: 'Demostrar una metodología completa',
    steps: [
      {
        id: 'step1',
        name: 'Preparación de datos',
        description: 'Recopila y prepara los datos necesarios',
        modelType: 'dataPreparation',
        prerequisiteSteps: [],
        inputFields: [
          { name: 'Datos crudos', description: 'Datos sin procesar', example: 'CSV, JSON', required: true, type: 'file' }
        ],
        outputInsights: [
          { name: 'Datos limpios', description: 'Datos listos para análisis', businessValue: 'Mejora la precisión', visualizationType: 'table' }
        ],
        estimatedProcessingTime: '10 minutos',
        difficulty: 'básico'
      },
      {
        id: 'step2',
        name: 'Análisis del modelo',
        description: 'Aplica el modelo ' + modelType + ' a los datos',
        modelType: modelType,
        prerequisiteSteps: ['step1'],
        inputFields: [
          { name: 'Datos preparados', description: 'Datos del paso anterior', example: 'Tabla de datos', required: true, type: 'table' }
        ],
        outputInsights: [
          { name: 'Resultados del modelo', description: 'Predicciones y insights', businessValue: 'Información clave', visualizationType: 'chart' }
        ],
        estimatedProcessingTime: '20 minutos',
        difficulty: 'intermedio'
      }
    ],
    totalEstimatedTime: '30 minutos',
    recommendedTools: ['Python', 'R']
  };
};

interface AnalysisResultsProps {
  fileId: string;
  modelType: string;
}

export const AnalysisResults: React.FC<AnalysisResultsProps> = ({ fileId, modelType }) => {
  const [results, setResults] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedTab, setSelectedTab] = useState<string>('resultados');

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`${API_URL}/api/files/${fileId}/results`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setResults(data);
      } catch (e: any) {
        setError(`Error fetching results: ${e.message}`);
        toast.error(`Error al obtener resultados: ${e.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [fileId]);

  const handleDownloadResults = () => {
    toast.success('Descargando resultados', {
      description: 'Se está preparando el archivo con los resultados del análisis.',
      duration: 3000,
    });
    
    // In a real app, this would trigger an actual download
    setTimeout(() => {
      toast.info('Resultados descargados', {
        description: 'Puede abrir el archivo con su herramienta de análisis preferida.',
        duration: 4000,
      });
    }, 1500);
  };

  if (loading) {
    return <Card className="bg-muted/50"><CardContent className="pt-6 text-center">Cargando resultados...</CardContent></Card>;
  }

  if (error) {
    return <Card className="bg-muted/50"><CardContent className="pt-6 text-center text-red-500">Error: {error}</CardContent></Card>;
  }

  if (!results) {
    return <Card className="bg-muted/50"><CardContent className="pt-6 text-center">No hay resultados disponibles.</CardContent></Card>;
  }

  const methodology = getMethodologyByType(modelType);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex flex-wrap items-start justify-between gap-2">
            <div>
              <CardTitle>Resultados del análisis</CardTitle>
              <CardDescription className="mt-1">
                Visualice los resultados y descubra insights clave generados por el modelo.
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Button 
                size="sm" 
                onClick={handleDownloadResults}
                className="flex items-center gap-1"
              >
                <Download className="h-4 w-4" />
                Descargar resultados
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="resultados" className="space-y-4" onValueChange={setSelectedTab}>
            <TabsList>
              <TabsTrigger value="resultados">Resultados</TabsTrigger>
              {methodology.steps && methodology.steps.length > 0 ? (
                <TabsTrigger value="metodologia">Metodología</TabsTrigger>
              ) : null}
              <TabsTrigger value="complementario">Análisis complementarios</TabsTrigger>
              <TabsTrigger value="implementacion">Implementación</TabsTrigger>
            </TabsList>

            <TabsContent value="resultados" className="space-y-4">
              <div className="space-y-4">
                <div className="bg-muted/50 p-4 rounded-lg flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                  <div>
                    <h4 className="font-medium">Modelo utilizado</h4>
                    <p className="text-sm text-muted-foreground">
                      Se utilizó el modelo <strong>{modelType}</strong> para generar estos resultados.
                    </p>
                  </div>
                </div>

                <div className="mt-6">
                  <h4 className="font-medium mb-3 flex items-center gap-1">
                    <FileSearch className="h-4 w-4 text-primary" />
                    Insights principales
                  </h4>
                  
                  <Accordion type="single" collapsible className="w-full">
                    {methodology.steps && methodology.steps.map((step, index) => (
                      <AccordionItem key={step.id} value={step.id}>
                        <AccordionTrigger className="hover:bg-muted/50 px-3 rounded-md">
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="h-6 w-6 rounded-full flex items-center justify-center p-0">
                              {index + 1}
                            </Badge>
                            <span>{step.name}</span>
                            <Badge className="ml-auto" variant={
                              step.difficulty === 'básico' ? 'outline' : 
                              step.difficulty === 'intermedio' ? 'secondary' : 
                              'default'
                            }>
                              {step.difficulty}
                            </Badge>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="px-3">
                          <div className="space-y-4">
                            <p className="text-sm">{step.description}</p>
                            
                            {/* Outputs */}
                            <div className="bg-muted/30 p-3 rounded-md">
                              <h5 className="text-sm font-medium mb-2">Resultados obtenidos:</h5>
                              <ul className="space-y-3">
                                {step.outputInsights.map((insight, i) => (
                                  <li key={i} className="text-sm">
                                    <div className="flex items-center gap-1">
                                      <ArrowRight className="h-3 w-3 text-primary" />
                                      <span className="font-medium">{insight.name}</span>
                                      <Badge variant="outline" className="ml-auto">
                                        {insight.visualizationType}
                                      </Badge>
                                    </div>
                                    <p className="text-muted-foreground text-xs ml-4">{insight.description}</p>
                                    <p className="text-primary text-xs ml-4 mt-1">Valor de negocio: {insight.businessValue}</p>
                                  </li>
                                ))}
                              </ul>
                            </div>
                            
                            <div className="flex items-center justify-between text-xs text-muted-foreground">
                              <span>Tiempo estimado: {step.estimatedProcessingTime}</span>
                              <span>Modelo: {step.modelType}</span>
                            </div>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="metodologia">
              <div className="space-y-4">
                <div className="bg-muted/50 p-4 rounded-lg flex items-center gap-3">
                  <Activity className="h-5 w-5 text-primary flex-shrink-0" />
                  <div>
                    <h4 className="font-medium">Metodología utilizada</h4>
                    <p className="text-sm text-muted-foreground">
                      Se siguió la metodología <strong>{methodology.name}</strong> para el análisis.
                    </p>
                  </div>
                </div>
                
                <div className="mt-6">
                  <h4 className="font-medium mb-3 flex items-center gap-1">
                    <FileSearch className="h-4 w-4 text-primary" />
                    Pasos de la metodología
                  </h4>
                  
                  <Accordion type="single" collapsible className="w-full">
                    {methodology.steps.map((step, index) => (
                      <AccordionItem key={step.id} value={step.id}>
                        <AccordionTrigger className="hover:bg-muted/50 px-3 rounded-md">
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="h-6 w-6 rounded-full flex items-center justify-center p-0">
                              {index + 1}
                            </Badge>
                            <span>{step.name}</span>
                            <Badge className="ml-auto" variant={
                              step.difficulty === 'básico' ? 'outline' : 
                              step.difficulty === 'intermedio' ? 'secondary' : 
                              'default'
                            }>
                              {step.difficulty}
                            </Badge>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="px-3">
                          <div className="space-y-4">
                            <p className="text-sm">{step.description}</p>
                            
                            {/* Inputs needed */}
                            <div className="bg-muted/30 p-3 rounded-md">
                              <h5 className="text-sm font-medium mb-2">Datos necesarios:</h5>
                              <ul className="space-y-2">
                                {step.inputFields.map((field, i) => (
                                  <li key={i} className="text-sm flex items-start gap-2">
                                    <Badge variant={field.required ? "default" : "outline"} className="mt-0.5">
                                      {field.required ? "Requerido" : "Opcional"}
                                    </Badge>
                                    <div>
                                      <span className="font-medium">{field.name}</span>
                                      <p className="text-muted-foreground text-xs">{field.description}</p>
                                      <p className="text-xs italic mt-0.5">Ejemplo: {field.example}</p>
                                    </div>
                                  </li>
                                ))}
                              </ul>
                            </div>
                            
                            {/* Outputs */}
                            <div className="bg-muted/30 p-3 rounded-md">
                              <h5 className="text-sm font-medium mb-2">Resultados obtenidos:</h5>
                              <ul className="space-y-3">
                                {step.outputInsights.map((insight, i) => (
                                  <li key={i} className="text-sm">
                                    <div className="flex items-center gap-1">
                                      <ArrowRight className="h-3 w-3 text-primary" />
                                      <span className="font-medium">{insight.name}</span>
                                      <Badge variant="outline" className="ml-auto">
                                        {insight.visualizationType}
                                      </Badge>
                                    </div>
                                    <p className="text-muted-foreground text-xs ml-4">{insight.description}</p>
                                    <p className="text-primary text-xs ml-4 mt-1">Valor de negocio: {insight.businessValue}</p>
                                  </li>
                                ))}
                              </ul>
                            </div>
                            
                            <div className="flex items-center justify-between text-xs text-muted-foreground">
                              <span>Tiempo estimado: {step.estimatedProcessingTime}</span>
                              <span>Modelo: {step.modelType}</span>
                            </div>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="complementario">
              <Card className="bg-muted/50">
                <CardContent className="pt-6 text-center">
                  <p className="text-muted-foreground">
                    No hay análisis complementarios disponibles para este modelo.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="implementacion">
              <MCPRecommendations modelType={modelType} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};
