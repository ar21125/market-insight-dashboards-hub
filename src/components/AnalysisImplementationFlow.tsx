import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FileUp, Clock, Database, ChartPie, CheckCircle, Download, Upload, FileText, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";

interface ImplementationStep {
  id: number;
  title: string;
  description: string;
  icon: React.ElementType;
  time: string;
}

interface DataRequirement {
  name: string;
  description: string;
  format: string;
  example: string;
}

interface MethodDetail {
  name: string;
  description: string;
  useCases: string[];
  benefits: string[];
}

interface ImplementationFlowProps {
  industry: string;
  analysisName: string;
  description: string;
  totalTime: string;
  steps: ImplementationStep[];
  dataRequirements: DataRequirement[];
  methods: MethodDetail[];
  benefits: string[];
  templateUrl?: string;
}

const AnalysisImplementationFlow: React.FC<ImplementationFlowProps> = ({
  industry,
  analysisName,
  description,
  totalTime,
  steps,
  dataRequirements,
  methods,
  benefits,
  templateUrl
}) => {
  // Format industry name for display
  const formatIndustryName = (industry: string) => {
    return industry.charAt(0).toUpperCase() + industry.slice(1);
  };

  const handleTemplateDownload = () => {
    toast.success("La plantilla se está descargando...", {
      description: "Recibirá una plantilla Excel para completar con sus datos."
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            {analysisName} - {formatIndustryName(industry)}
          </h2>
          <p className="text-muted-foreground mt-1">{description}</p>
          <div className="flex items-center mt-2">
            <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Tiempo estimado: {totalTime}</span>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" asChild>
            <Link to={`/contact/${industry}`}>
              <Phone className="h-4 w-4 mr-2" />
              Contactar experto
            </Link>
          </Button>
        </div>
      </div>

      <Tabs defaultValue="steps" className="w-full">
        <TabsList>
          <TabsTrigger value="steps">Proceso de implementación</TabsTrigger>
          <TabsTrigger value="data">Datos necesarios</TabsTrigger>
          <TabsTrigger value="methods">Métodos analíticos</TabsTrigger>
          <TabsTrigger value="benefits">Beneficios</TabsTrigger>
        </TabsList>

        {/* Implementation Steps Tab */}
        <TabsContent value="steps" className="space-y-4 mt-4">
          <div className="flex flex-col md:flex-row justify-between gap-4 mb-4">
            <div>
              <h3 className="text-lg font-medium">Proceso paso a paso</h3>
              <p className="text-sm text-muted-foreground">Siga estos pasos para implementar el análisis</p>
            </div>
            {templateUrl && (
              <Button variant="outline" size="sm" className="flex items-center gap-2" onClick={handleTemplateDownload}>
                <Download className="h-4 w-4" />
                <span>Descargar plantilla</span>
              </Button>
            )}
          </div>

          <div className="relative">
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-muted" />
            <div className="space-y-8">
              {steps.map((step, index) => (
                <div key={step.id} className="relative pl-10">
                  <div className="absolute left-0 top-2 flex h-8 w-8 items-center justify-center rounded-full border bg-background shadow">
                    <Badge className="h-6 w-6 rounded-full p-0 flex items-center justify-center">
                      {index + 1}
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <step.icon className="h-4 w-4 text-primary" />
                      <h4 className="font-semibold">{step.title}</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>{step.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Card className="mt-8 bg-gradient-to-r from-primary/10 to-transparent border-0">
            <CardContent className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6">
              <div>
                <h3 className="text-lg font-medium mb-1">¿Listo para comenzar?</h3>
                <p className="text-sm text-muted-foreground">Inicie el proceso de análisis ahora</p>
              </div>
              <div className="flex gap-3 flex-wrap">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="default">
                      <Upload className="h-4 w-4 mr-2" />
                      Subir datos
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Subir datos para análisis</DialogTitle>
                      <DialogDescription>
                        Suba sus datos para comenzar el proceso de {analysisName}.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="py-4 space-y-4">
                      <div className="border-2 border-dashed rounded-lg p-8 text-center">
                        <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                        <p className="text-sm text-muted-foreground">
                          Arrastre y suelte sus archivos aquí o haga clic para seleccionarlos
                        </p>
                        <p className="text-xs text-muted-foreground mt-2">
                          Formatos aceptados: .xlsx, .csv, .json
                        </p>
                        <Button size="sm" className="mt-4" onClick={() => toast.info("Función en desarrollo")}>
                          Seleccionar archivos
                        </Button>
                      </div>
                      <div className="flex justify-between">
                        <Button variant="outline" onClick={() => toast.info("Función en desarrollo")}>
                          <Download className="h-4 w-4 mr-2" />
                          Descargar plantilla
                        </Button>
                        <Button onClick={() => toast.info("Función en desarrollo")}>
                          Continuar
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
                <Button variant="outline" asChild>
                  <Link to={`/contact/${industry}`}>
                    Solicitar demostración
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Data Requirements Tab */}
        <TabsContent value="data" className="space-y-4 mt-4">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="text-lg font-medium">Datos necesarios para el análisis</h3>
              <p className="text-sm text-muted-foreground">Prepare estos datos para obtener los mejores resultados</p>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  <span>Ver ejemplo</span>
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Ejemplo de datos para {analysisName}</DialogTitle>
                  <DialogDescription>
                    Así es como debería estructurar sus datos para este análisis.
                  </DialogDescription>
                </DialogHeader>
                <div className="py-4">
                  <ScrollArea className="h-[400px]">
                    <div className="space-y-4">
                      {dataRequirements.map((req, index) => (
                        <div key={index} className="space-y-2 border-b pb-4 last:border-0 last:pb-0">
                          <h4 className="font-medium">{req.name}</h4>
                          <p className="text-sm text-muted-foreground">{req.description}</p>
                          <div>
                            <h5 className="text-sm font-medium">Formato ejemplo:</h5>
                            <div className="bg-muted/50 p-2 rounded-md font-mono text-xs whitespace-pre-wrap mt-1">
                              {req.example}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                  <div className="mt-4 flex justify-between">
                    <Button variant="outline" onClick={handleTemplateDownload}>
                      <Download className="h-4 w-4 mr-2" />
                      Descargar plantilla
                    </Button>
                    <Button asChild>
                      <Link to={`/contact/${industry}`}>
                        Contactar a un experto
                      </Link>
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <ScrollArea className="h-[450px] pr-4">
            <div className="space-y-4">
              {dataRequirements.map((req, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="text-base">{req.name}</CardTitle>
                    <CardDescription>{req.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <span className="text-sm font-semibold w-20">Formato:</span>
                        <span className="text-sm">{req.format}</span>
                      </div>
                      <div>
                        <span className="text-sm font-semibold block mb-1">Ejemplo:</span>
                        <div className="text-sm bg-muted/50 p-2 rounded-md font-mono whitespace-pre-wrap">
                          {req.example}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </TabsContent>

        {/* Methods Tab */}
        <TabsContent value="methods" className="space-y-4 mt-4">
          <h3 className="text-lg font-medium mb-4">Métodos analíticos utilizados</h3>
          
          <ScrollArea className="h-[450px] pr-4">
            <div className="space-y-6">
              {methods.map((method, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="text-lg">{method.name}</CardTitle>
                    <CardDescription className="text-base">{method.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Casos de uso</h4>
                      <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                        {method.useCases.map((useCase, idx) => (
                          <li key={idx}>{useCase}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Beneficios</h4>
                      <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                        {method.benefits.map((benefit, idx) => (
                          <li key={idx}>{benefit}</li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </TabsContent>

        {/* Benefits Tab */}
        <TabsContent value="benefits" className="space-y-4 mt-4">
          <h3 className="text-lg font-medium mb-4">Valor de negocio</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {benefits.map((benefit, index) => (
              <Card key={index} className="overflow-hidden">
                <div className="p-6 flex gap-3 items-start">
                  <div className="shrink-0">
                    <CheckCircle className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm">{benefit}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <Card className="mt-8 bg-gradient-to-r from-primary/10 to-transparent border-0">
            <CardContent className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6">
              <div>
                <h3 className="text-lg font-medium mb-1">Maximice el retorno de su inversión</h3>
                <p className="text-sm text-muted-foreground">Implemente este análisis para obtener resultados tangibles</p>
              </div>
              <div className="flex gap-3 flex-wrap">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="default">
                      <Upload className="h-4 w-4 mr-2" />
                      Comenzar análisis
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Comenzar análisis</DialogTitle>
                      <DialogDescription>
                        Inicie el proceso de {analysisName} para su negocio.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="py-4 space-y-4">
                      <div className="border-2 border-dashed rounded-lg p-8 text-center">
                        <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                        <p className="text-sm text-muted-foreground">
                          Arrastre y suelte sus archivos aquí o haga clic para seleccionarlos
                        </p>
                        <p className="text-xs text-muted-foreground mt-2">
                          Formatos aceptados: .xlsx, .csv, .json
                        </p>
                        <Button size="sm" className="mt-4" onClick={() => toast.info("Función en desarrollo")}>
                          Seleccionar archivos
                        </Button>
                      </div>
                      <div className="flex justify-between">
                        <Button variant="outline" onClick={handleTemplateDownload}>
                          <Download className="h-4 w-4 mr-2" />
                          Descargar plantilla
                        </Button>
                        <Button onClick={() => toast.info("Función en desarrollo")}>
                          Continuar
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
                <Button variant="outline" asChild>
                  <Link to={`/contact/${industry}`}>
                    Hablar con un experto
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AnalysisImplementationFlow;
