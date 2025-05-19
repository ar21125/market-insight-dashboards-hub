
import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { FileText, Upload, HelpCircle, Info } from "lucide-react";
import { getExcelFields } from '@/lib/api';
import { toast } from "sonner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export interface UploadTemplateFormProps {
  industry: string;
  onUpload: (file: File, modelType: string) => void;
}

export const UploadTemplateForm: React.FC<UploadTemplateFormProps> = ({ industry, onUpload }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedModel, setSelectedModel] = useState<string>('sarima');
  const [isUploading, setIsUploading] = useState<boolean>(false);
  
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'application/vnd.ms-excel': ['.xls'],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx']
    },
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        setSelectedFile(acceptedFiles[0]);
        toast.success(`Archivo seleccionado: ${acceptedFiles[0].name}`, {
          description: 'Haga clic en "Analizar datos" para continuar',
        });
      }
    }
  });

  const handleUpload = () => {
    if (!selectedFile) {
      toast.error('Por favor seleccione un archivo Excel');
      return;
    }
    
    if (!selectedModel) {
      toast.error('Por favor seleccione un tipo de modelo');
      return;
    }
    
    setIsUploading(true);
    
    // Simulating upload process
    setTimeout(() => {
      try {
        onUpload(selectedFile, selectedModel);
        setIsUploading(false);
      } catch (error) {
        console.error('Error during upload:', error);
        toast.error('Error al procesar el archivo');
        setIsUploading(false);
      }
    }, 1500);
  };

  const handleModelChange = (value: string) => {
    setSelectedModel(value);
  };

  // Get the fields for the selected model
  const templateFields = getExcelFields(industry, selectedModel);

  // Explanation modal content
  const renderModelExplanationContent = () => {
    const modelTypes: Record<string, {
      title: string;
      description: string;
      useCase: string;
      benefits: string[];
      limitations: string[];
      dataRequirements: string;
    }> = {
      'sarima': {
        title: 'Análisis SARIMA (Series Temporales Estacionales)',
        description: 'SARIMA (Seasonal AutoRegressive Integrated Moving Average) es una extensión del modelo ARIMA que incorpora componentes estacionales para modelar datos con patrones periódicos.',
        useCase: 'Es ideal para analizar series temporales con patrones estacionales claros, como ventas mensuales con variaciones por temporada, demanda energética con fluctuaciones diarias o semanales, o tráfico web con ciclos recurrentes.',
        benefits: [
          'Captura patrones estacionales y tendencias en datos temporales',
          'Alta precisión en pronósticos a corto y medio plazo',
          'Funciona bien con datos históricos limitados (1-2 años)'
        ],
        limitations: [
          'Requiere datos con frecuencia regular (diaria, semanal, mensual)',
          'No captura bien cambios estructurales abruptos',
          'Necesita identificación manual de parámetros óptimos'
        ],
        dataRequirements: 'Se requieren datos de series temporales con fechas ordenadas cronológicamente y valores numéricos para la variable a predecir. Idealmente, se deberían tener al menos 2-3 ciclos estacionales completos.'
      },
      'xgboost': {
        title: 'XGBoost (Extreme Gradient Boosting)',
        description: 'XGBoost es un algoritmo de aprendizaje automático de tipo "boosting" que combina múltiples árboles de decisión simples para crear un modelo predictivo potente.',
        useCase: 'Excelente para problemas de clasificación y regresión con variables múltiples, como predicción de rotación de clientes, análisis de riesgo crediticio, o detección de fraudes.',
        benefits: [
          'Alta precisión en problemas complejos con muchas variables',
          'Maneja naturalmente valores faltantes y diferentes tipos de datos',
          'Implementa regularización para evitar sobreajuste'
        ],
        limitations: [
          'Requiere ajuste cuidadoso de hiperparámetros',
          'Menos interpretable que modelos más simples',
          'Puede ser computacionalmente intensivo con grandes conjuntos de datos'
        ],
        dataRequirements: 'Admite datos tabulares con múltiples variables predictoras (numéricas y categóricas) y una variable objetivo. No requiere normalización previa de datos.'
      },
      'kmeans': {
        title: 'K-means (Agrupación por centroides)',
        description: 'K-means es un algoritmo de agrupamiento no supervisado que divide los datos en K grupos basándose en la similitud de características.',
        useCase: 'Perfecto para segmentación de clientes, agrupación de productos similares, o identificación de patrones en datos sin etiquetas previas.',
        benefits: [
          'Simple, rápido y fácil de implementar',
          'Escalable a grandes conjuntos de datos',
          'Encuentra grupos naturales en datos multidimensionales'
        ],
        limitations: [
          'Requiere especificar el número de grupos (K) de antemano',
          'Sensible a valores atípicos y a la inicialización',
          'Asume grupos esféricos de tamaño similar'
        ],
        dataRequirements: 'Necesita datos numéricos normalizados. Las variables categóricas deben codificarse adecuadamente. Es importante eliminar valores atípicos extremos.'
      },
      'prophet': {
        title: 'Prophet (Pronóstico de series temporales)',
        description: 'Prophet es un modelo de series temporales desarrollado por Facebook que descompone los datos en tendencia, estacionalidad y efectos de días festivos.',
        useCase: 'Ideal para pronóstico de ventas, tráfico web, métricas de negocio con patrones estacionales múltiples y eventos especiales.',
        benefits: [
          'Maneja automáticamente estacionalidades múltiples (diaria, semanal, anual)',
          'Incorpora fácilmente efectos de eventos especiales y días festivos',
          'Robusto ante datos faltantes y cambios en tendencias'
        ],
        limitations: [
          'Menos preciso para datos de alta volatilidad o muy irregulares',
          'No incorpora variables exógenas tan fácilmente como otros modelos',
          'Puede sobreajustar con conjuntos de datos pequeños'
        ],
        dataRequirements: 'Requiere una columna de fecha/hora (ds) y una columna de valor numérico (y). Opcionalmente, se pueden agregar columnas para eventos especiales o días festivos.'
      },
      'lstm': {
        title: 'Redes LSTM (Long Short-Term Memory)',
        description: 'Las redes LSTM son un tipo de red neuronal recurrente especialmente diseñada para analizar y predecir series temporales y secuencias complejas.',
        useCase: 'Excelente para predecir comportamientos complejos donde el contexto histórico es importante, como precios de acciones, consumo energético o análisis de sensores IoT.',
        benefits: [
          'Captura dependencias temporales a largo plazo',
          'Aprende patrones complejos no lineales',
          'Maneja naturalmente secuencias de longitud variable'
        ],
        limitations: [
          'Requiere grandes cantidades de datos para entrenar efectivamente',
          'Computacionalmente intensivo y más lento que otros métodos',
          'Modelo "caja negra" difícil de interpretar'
        ],
        dataRequirements: 'Necesita series temporales con muchos puntos de datos. Los datos deben estar normalizados y organizados en secuencias de longitud apropiada para el análisis.'
      },
      'anova': {
        title: 'Análisis Estadístico (ANOVA/PCA)',
        description: 'ANOVA (Análisis de Varianza) es una técnica estadística para comparar medias entre grupos, mientras que PCA (Análisis de Componentes Principales) reduce la dimensionalidad de los datos.',
        useCase: 'ANOVA se usa para evaluar el impacto de variables categóricas en resultados numéricos. PCA para visualización de datos y reducción de dimensiones en análisis exploratorios.',
        benefits: [
          'Base estadística sólida con pruebas de significancia',
          'Interpretabilidad clara de resultados',
          'Técnicas establecidas con amplio soporte teórico'
        ],
        limitations: [
          'Asume normalidad y homogeneidad de varianzas (ANOVA)',
          'No captura relaciones no lineales (PCA)',
          'Más enfocado en análisis que en predicción'
        ],
        dataRequirements: 'Para ANOVA: una variable dependiente numérica y una o más variables independientes categóricas. Para PCA: múltiples variables numéricas correlacionadas que se desean reducir.'
      }
    };
    
    const selectedModelInfo = modelTypes[selectedModel] || modelTypes['sarima'];
    
    return (
      <>
        <DialogHeader>
          <DialogTitle className="text-xl">{selectedModelInfo.title}</DialogTitle>
          <DialogDescription>
            Explicación simplificada para entender este tipo de análisis
          </DialogDescription>
        </DialogHeader>
        <div className="py-4 space-y-4">
          <div>
            <h3 className="font-medium text-lg">¿Qué es?</h3>
            <p className="mt-2 text-muted-foreground">
              {selectedModelInfo.description}
            </p>
          </div>
          
          <div className="border-t pt-4">
            <h3 className="font-medium text-lg">¿Cuándo usarlo?</h3>
            <p className="mt-2 text-muted-foreground">
              {selectedModelInfo.useCase}
            </p>
          </div>
          
          <div className="border-t pt-4">
            <h3 className="font-medium text-lg">Beneficios</h3>
            <ul className="mt-2 space-y-2">
              {selectedModelInfo.benefits.map((benefit, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">+</span>
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="border-t pt-4">
            <h3 className="font-medium text-lg">Limitaciones</h3>
            <ul className="mt-2 space-y-2">
              {selectedModelInfo.limitations.map((limitation, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-orange-500 font-bold">!</span>
                  <span>{limitation}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="border-t pt-4">
            <h3 className="font-medium text-lg">Datos necesarios</h3>
            <p className="mt-2 text-muted-foreground">
              {selectedModelInfo.dataRequirements}
            </p>
          </div>
          
          <div className="border-t pt-4 bg-slate-50 p-3 rounded-md">
            <h3 className="font-medium text-base">Ejemplo práctico</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              {selectedModel === 'sarima' && "Un supermercado usa SARIMA para predecir ventas de productos frescos, identificando patrones semanales y estacionales para optimizar pedidos y reducir desperdicios."}
              {selectedModel === 'xgboost' && "Un banco utiliza XGBoost para predecir qué clientes probablemente cancelarán sus tarjetas de crédito en los próximos 3 meses, permitiendo ofrecer incentivos personalizados para retenerlos."}
              {selectedModel === 'kmeans' && "Una tienda online agrupa a sus clientes en segmentos basados en comportamiento de compra, demografía y patrones de navegación para personalizar campañas de marketing."}
              {selectedModel === 'prophet' && "Una empresa de energía usa Prophet para predecir consumo eléctrico diario y semanal, considerando efectos de temperatura, días festivos y tendencias de largo plazo."}
              {selectedModel === 'lstm' && "Un fabricante utiliza redes LSTM para predecir fallos en equipos industriales analizando datos de sensores IoT, permitiendo mantenimiento preventivo antes de costosas averías."}
              {selectedModel === 'anova' && "Una universidad analiza con ANOVA si diferentes métodos de enseñanza producen diferencias estadísticamente significativas en el rendimiento de los estudiantes."}
            </p>
          </div>
        </div>
      </>
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl flex items-center justify-between">
          <span>Subir datos para análisis</span>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="ghost" size="sm" className="flex items-center gap-1">
                <HelpCircle className="h-4 w-4" />
                <span className="hidden sm:inline">¿Cómo funciona?</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Cómo procesar sus datos con modelos avanzados</DialogTitle>
                <DialogDescription>
                  Aprenda a utilizar nuestras herramientas de análisis de forma sencilla
                </DialogDescription>
              </DialogHeader>
              <div className="py-4 space-y-4">
                <div>
                  <h3 className="font-medium">Paso a paso para analizar sus datos</h3>
                  <ol className="mt-2 space-y-3">
                    <li className="flex items-start gap-2">
                      <span className="bg-primary/20 text-primary h-5 w-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">1</span>
                      <div>
                        <p className="font-medium">Seleccione el tipo de análisis</p>
                        <p className="text-sm text-muted-foreground">
                          Elija el modelo que mejor se adapte a su caso de uso (puede consultar la guía de cada modelo)
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="bg-primary/20 text-primary h-5 w-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">2</span>
                      <div>
                        <p className="font-medium">Prepare sus datos</p>
                        <p className="text-sm text-muted-foreground">
                          Descargue la plantilla correspondiente a su modelo y complete con sus datos
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="bg-primary/20 text-primary h-5 w-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">3</span>
                      <div>
                        <p className="font-medium">Suba su archivo</p>
                        <p className="text-sm text-muted-foreground">
                          Arrastre o seleccione el archivo Excel completado y pulse "Analizar datos"
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="bg-primary/20 text-primary h-5 w-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">4</span>
                      <div>
                        <p className="font-medium">Visualice resultados</p>
                        <p className="text-sm text-muted-foreground">
                          Explore las visualizaciones e insights generados automáticamente en la pestaña "Resultados ML"
                        </p>
                      </div>
                    </li>
                  </ol>
                </div>
                
                <div className="bg-blue-50 p-3 rounded-md border border-blue-100">
                  <h3 className="font-medium text-blue-800 flex items-center gap-1">
                    <Info className="h-4 w-4" />
                    Consejos para mejores resultados
                  </h3>
                  <ul className="mt-2 space-y-1 text-blue-800 text-sm">
                    <li>• Asegúrese de que sus datos no tengan valores faltantes</li>
                    <li>• Cuantos más datos históricos proporcione, mejores serán las predicciones</li>
                    <li>• Verifique las fechas y formatos antes de subir los archivos</li>
                    <li>• Si no está seguro del modelo a utilizar, consulte la guía de cada uno</li>
                  </ul>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Tipo de modelo</label>
            <div className="flex items-center gap-2">
              <Select value={selectedModel} onValueChange={handleModelChange}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Seleccione un modelo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sarima">SARIMA (Series temporales)</SelectItem>
                  <SelectItem value="xgboost">XGBoost (Clasificación/Regresión)</SelectItem>
                  <SelectItem value="kmeans">K-means (Segmentación)</SelectItem>
                  <SelectItem value="prophet">Prophet (Pronóstico)</SelectItem>
                  <SelectItem value="lstm">Redes LSTM (Series complejas)</SelectItem>
                  <SelectItem value="anova">Análisis Estadístico (ANOVA/PCA)</SelectItem>
                </SelectContent>
              </Select>
              
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm" className="flex-shrink-0">
                    <Info className="h-4 w-4" />
                    <span className="sr-only">Información del modelo</span>
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  {renderModelExplanationContent()}
                </DialogContent>
              </Dialog>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Archivo Excel</label>
            <div 
              {...getRootProps()} 
              className={`border-2 border-dashed rounded-md p-4 text-center cursor-pointer transition-colors
                ${isDragActive ? 'border-primary bg-primary/5' : 'border-muted-foreground/20 hover:border-primary/50'}`}
            >
              <input {...getInputProps()} />
              <div className="flex flex-col items-center justify-center gap-2">
                <FileText className="h-8 w-8 text-muted-foreground/70" />
                {selectedFile ? (
                  <div>
                    <p className="font-medium">{selectedFile.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {(selectedFile.size / 1024).toFixed(1)} KB
                    </p>
                  </div>
                ) : (
                  <div>
                    <p>Arrastre un archivo Excel o haga clic aquí</p>
                    <p className="text-xs text-muted-foreground">
                      Formatos soportados: .xls, .xlsx
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {templateFields && templateFields.length > 0 && (
          <Accordion type="single" collapsible>
            <AccordionItem value="fields">
              <AccordionTrigger>
                Campos requeridos para este modelo
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground mb-2">
                    Asegúrese de que su archivo incluya los siguientes campos en el formato correcto:
                  </p>
                  <div className="bg-slate-50 p-3 rounded-md">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-2 font-medium">Campo</th>
                          <th className="text-left py-2 font-medium">Descripción</th>
                          <th className="text-left py-2 font-medium">Requerido</th>
                          <th className="text-left py-2 font-medium">Ejemplo</th>
                        </tr>
                      </thead>
                      <tbody>
                        {templateFields.map((field, index) => (
                          <tr key={index} className="border-b border-slate-200">
                            <td className="py-2 font-medium">{field.name}</td>
                            <td className="py-2 text-muted-foreground">{field.description}</td>
                            <td className="py-2">{field.required ? "Sí" : "No"}</td>
                            <td className="py-2 italic text-muted-foreground">
                              {field.example || "N/A"}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        )}
      </CardContent>
      <CardFooter className="flex justify-between border-t pt-4">
        <Button variant="outline" type="button" disabled={isUploading}>
          Descargar plantilla ejemplo
        </Button>
        <Button 
          type="button" 
          disabled={!selectedFile || isUploading} 
          onClick={handleUpload}
          className="flex items-center gap-2"
        >
          {isUploading ? "Procesando..." : "Analizar datos"}
          <Upload className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};
