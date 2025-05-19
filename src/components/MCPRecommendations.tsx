
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowUpRight, CheckCircle, AlertCircle, Info, Lightbulb, Settings, FileBarChart2 } from "lucide-react";
import { mcpIntegrationService, Recommendation, MCPTool } from '@/services/mcpIntegrationService';

interface MCPRecommendationsProps {
  modelType: string;
  industry: string;
  metrics?: Record<string, any>;
  result?: any;
}

// Define different analysis flows and their complementary blocks
interface AnalysisFlow {
  id: string;
  name: string;
  description: string;
  tags: string[];
  requiredInputs: string[];
  outputs: string[];
  recommendedVisualizations: string[];
  modelTypes: string[];
}

export const MCPRecommendations: React.FC<MCPRecommendationsProps> = ({
  modelType,
  industry,
  metrics,
  result
}) => {
  const [isLoading, setIsLoading] = useState<Record<string, boolean>>({});
  const [expandedRecommendation, setExpandedRecommendation] = useState<string | null>(null);
  const [selectedFlowTab, setSelectedFlowTab] = useState<string>("insights");
  
  // Get recommendations based on model type and metrics
  const recommendations = mcpIntegrationService.getRecommendations(modelType, metrics);
  
  // Get complementary analyses
  const complementaryAnalyses = mcpIntegrationService.getComplementaryAnalyses(modelType, industry);
  
  // Get compatible MCP tools
  const compatibleTools = mcpIntegrationService.getCompatibleMCPTools(modelType);

  // Analysis flow methodologies that complement each other
  const analysisFlows: AnalysisFlow[] = [
    {
      id: "descriptive",
      name: "Análisis Descriptivo",
      description: "Comprende qué ha ocurrido en el pasado a través del análisis de datos históricos",
      tags: ["Histórico", "Tendencias", "Patrones"],
      requiredInputs: ["Datos históricos", "Variables categóricas y numéricas", "Series temporales"],
      outputs: ["Tendencias identificadas", "Patrones estacionales", "Segmentación básica"],
      recommendedVisualizations: ["Series temporales", "Distribuciones", "Heatmaps", "Gráficos de barras"],
      modelTypes: ["statistical", "clustering"]
    },
    {
      id: "diagnostic",
      name: "Análisis Diagnóstico",
      description: "Identifica por qué ocurrieron ciertos eventos analizando relaciones causales",
      tags: ["Causalidad", "Correlación", "Anomalías"],
      requiredInputs: ["Datos procesados", "Variables dependientes e independientes", "Eventos"],
      outputs: ["Factores causales", "Correlaciones significativas", "Detección de anomalías"],
      recommendedVisualizations: ["Gráficos de dispersión", "Correlaciones", "Diagramas de caja"],
      modelTypes: ["regression", "classification"]
    },
    {
      id: "predictive",
      name: "Análisis Predictivo",
      description: "Anticipa qué podría ocurrir en el futuro mediante modelos predictivos",
      tags: ["Forecast", "Predicción", "Escenarios"],
      requiredInputs: ["Datos históricos limpios", "Variables predictoras", "Parámetros temporales"],
      outputs: ["Predicciones", "Intervalos de confianza", "Escenarios futuros"],
      recommendedVisualizations: ["Proyecciones", "Bandas de confianza", "Comparativas actual vs predicción"],
      modelTypes: ["time_series", "regression", "deep_learning"]
    },
    {
      id: "prescriptive",
      name: "Análisis Prescriptivo",
      description: "Recomienda acciones a tomar basadas en los resultados predictivos",
      tags: ["Optimización", "Decisiones", "Estrategia"],
      requiredInputs: ["Resultados predictivos", "Objetivos del negocio", "Restricciones operativas"],
      outputs: ["Recomendaciones accionables", "Plan de implementación", "Impacto esperado"],
      recommendedVisualizations: ["Diagramas de impacto", "Gráficos de decisión", "Dashboards interactivos"],
      modelTypes: ["optimization", "reinforcement_learning"]
    },
    {
      id: "exploratory",
      name: "Análisis Exploratorio",
      description: "Descubre patrones ocultos y relaciones no evidentes en los datos",
      tags: ["Descubrimiento", "Inspección", "Visualización"],
      requiredInputs: ["Datos crudos", "Múltiples fuentes", "Variables sin filtrar"],
      outputs: ["Insights preliminares", "Hipótesis", "Direcciones de investigación"],
      recommendedVisualizations: ["Matrices de correlación", "Clustering visual", "PCA/t-SNE"],
      modelTypes: ["clustering", "dimensionality_reduction"]
    }
  ];
  
  const handleExecuteTool = async (toolId: string) => {
    setIsLoading({...isLoading, [toolId]: true});
    
    try {
      // Execute MCP tool with sample parameters
      await mcpIntegrationService.executeMCPTool(toolId, {
        data: 'sample_data',
        horizon: 10,
        frequency: 'D',
        n_clusters: 5,
        target: 'target_column',
        features: ['feature1', 'feature2'],
        sensitivity: 0.8,
        text: 'sample text',
        task: 'classification',
        test_type: 'anova',
        n_components: 2
      });
    } catch (error) {
      console.error('Error executing tool:', error);
    } finally {
      setIsLoading({...isLoading, [toolId]: false});
    }
  };

  const getIconForType = (type: string) => {
    switch (type) {
      case 'action':
        return <CheckCircle className="h-4 w-4 text-blue-500" />;
      case 'insight':
        return <Lightbulb className="h-4 w-4 text-amber-500" />;
      case 'tool':
        return <Settings className="h-4 w-4 text-purple-500" />;
      case 'analysis':
        return <Info className="h-4 w-4 text-green-500" />;
      default:
        return <Info className="h-4 w-4 text-gray-500" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'high':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'low':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  if (!modelType) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-center py-8 text-muted-foreground">
            <AlertCircle className="h-5 w-5 mr-2" />
            <p>Seleccione un modelo y procese datos para ver recomendaciones</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Find flows compatible with the current model type
  const compatibleFlows = analysisFlows.filter(flow => 
    flow.modelTypes.some(type => modelType.includes(type))
  );

  return (
    <div className="space-y-6">
      {/* Methodology Flows */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center">
            <FileBarChart2 className="h-5 w-5 mr-2 text-indigo-500" />
            Flujos de Análisis Metodológico
          </CardTitle>
          <CardDescription>
            Bloques de metodología que se complementan para obtener una visión integral
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue={selectedFlowTab} onValueChange={setSelectedFlowTab}>
            <TabsList className="grid grid-cols-5 mb-4">
              {analysisFlows.map(flow => (
                <TabsTrigger 
                  key={flow.id} 
                  value={flow.id}
                  className={compatibleFlows.some(cf => cf.id === flow.id) ? "font-medium" : "opacity-70"}
                >
                  {flow.name}
                </TabsTrigger>
              ))}
            </TabsList>
            
            {analysisFlows.map(flow => (
              <TabsContent key={flow.id} value={flow.id} className="space-y-4">
                <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                  <h3 className="font-medium text-lg">{flow.name}</h3>
                  <p className="text-muted-foreground">{flow.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mt-2">
                    {flow.tags.map(tag => (
                      <Badge key={tag} variant="outline">{tag}</Badge>
                    ))}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="border rounded-lg p-4">
                    <h4 className="font-medium mb-2">Datos de entrada requeridos</h4>
                    <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                      {flow.requiredInputs.map(input => (
                        <li key={input}>{input}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="border rounded-lg p-4">
                    <h4 className="font-medium mb-2">Resultados esperados</h4>
                    <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                      {flow.outputs.map(output => (
                        <li key={output}>{output}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="border rounded-lg p-4">
                    <h4 className="font-medium mb-2">Visualizaciones recomendadas</h4>
                    <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                      {flow.recommendedVisualizations.map(viz => (
                        <li key={viz}>{viz}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <div className="mt-2">
                  <h4 className="font-medium">Flujos complementarios recomendados:</h4>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {analysisFlows
                      .filter(otherFlow => otherFlow.id !== flow.id)
                      .map(otherFlow => (
                        <Button 
                          key={otherFlow.id}
                          variant="outline" 
                          size="sm"
                          onClick={() => setSelectedFlowTab(otherFlow.id)}
                        >
                          {otherFlow.name}
                          <ArrowUpRight className="h-3 w-3 ml-1" />
                        </Button>
                      ))}
                  </div>
                </div>
                
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 mt-4">
                  <h4 className="font-medium flex items-center">
                    <Info className="h-4 w-4 mr-2" />
                    Aplicabilidad al modelo actual
                  </h4>
                  <p className="text-sm mt-1">
                    {compatibleFlows.some(cf => cf.id === flow.id) 
                      ? `Este flujo es compatible con el modelo ${modelType} seleccionado actualmente.`
                      : `Este flujo no es óptimo para el modelo ${modelType} actual. Considere cambiar de modelo o ajustar su enfoque.`
                    }
                  </p>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>
      
      {/* Main Recommendations */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center">
            <Lightbulb className="h-5 w-5 mr-2 text-amber-500" />
            Recomendaciones basadas en análisis
          </CardTitle>
          <CardDescription>
            Acciones y sugerencias generadas por análisis de MCP de sus datos
          </CardDescription>
        </CardHeader>
        <CardContent>
          {recommendations.length > 0 ? (
            <div className="space-y-3">
              {recommendations.map((rec) => (
                <div 
                  key={rec.id}
                  className="border rounded-lg p-3 hover:bg-slate-50 transition-colors cursor-pointer"
                  onClick={() => setExpandedRecommendation(
                    expandedRecommendation === rec.id ? null : rec.id
                  )}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      {getIconForType(rec.type)}
                      <span className="font-medium ml-2">{rec.title}</span>
                      <Badge className={`ml-3 ${getPriorityColor(rec.priority)}`} variant="outline">
                        {rec.priority}
                      </Badge>
                    </div>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <span className="text-xs text-muted-foreground">
                            Fuente: {rec.source}
                          </span>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Recomendación proporcionada por una herramienta MCP</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  
                  {expandedRecommendation === rec.id && (
                    <div className="mt-2 pl-6">
                      <p className="text-sm text-muted-foreground mb-2">{rec.description}</p>
                      {rec.actionable && (
                        <Button 
                          size="sm" 
                          variant="outline"
                          className="mt-1 text-sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleExecuteTool(rec.source);
                          }}
                          disabled={isLoading[rec.source]}
                        >
                          {isLoading[rec.source] ? 'Procesando...' : `Aplicar recomendación`}
                          {!isLoading[rec.source] && <ArrowUpRight className="h-4 w-4 ml-1" />}
                        </Button>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="py-8 text-center text-muted-foreground">
              <p>No hay recomendaciones disponibles</p>
            </div>
          )}
        </CardContent>
      </Card>
      
      {/* Complementary Analyses */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center">
            <Info className="h-5 w-5 mr-2 text-blue-500" />
            Análisis complementarios recomendados
          </CardTitle>
          <CardDescription>
            Análisis adicionales que pueden aumentar el valor de los resultados actuales
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {complementaryAnalyses.map((analysis) => (
              <div 
                key={analysis.id}
                className="border rounded-lg p-3 hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-center">
                  {getIconForType(analysis.type)}
                  <span className="font-medium ml-2">{analysis.title}</span>
                </div>
                <p className="text-sm text-muted-foreground mt-1">{analysis.description}</p>
                <Button 
                  size="sm" 
                  variant="outline"
                  className="mt-2 text-sm"
                  onClick={() => handleExecuteTool(analysis.source)}
                  disabled={isLoading[analysis.source]}
                >
                  {isLoading[analysis.source] ? 'Procesando...' : `Ejecutar análisis`}
                  {!isLoading[analysis.source] && <ArrowUpRight className="h-4 w-4 ml-1" />}
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      {/* Available MCP Tools */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center">
            <Settings className="h-5 w-5 mr-2 text-purple-500" />
            Herramientas MCP compatibles
          </CardTitle>
          <CardDescription>
            Herramientas de código abierto que se pueden integrar con este tipo de análisis
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {compatibleTools.map((tool: MCPTool) => (
              <div 
                key={tool.id}
                className="border rounded-lg p-3 hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium">{tool.name}</span>
                  <Badge variant="secondary">{tool.category}</Badge>
                </div>
                <p className="text-xs text-muted-foreground mt-1">{tool.description}</p>
                <div className="mt-2 flex items-center justify-between">
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => window.open(tool.sourceUrl, '_blank')}
                    className="text-xs"
                  >
                    Ver código fuente
                  </Button>
                  {tool.apiEndpoint && (
                    <Button 
                      size="sm" 
                      variant="secondary"
                      onClick={() => handleExecuteTool(tool.id)}
                      disabled={isLoading[tool.id]}
                      className="text-xs"
                    >
                      {isLoading[tool.id] ? 'Conectando...' : 'Conectar API'}
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
