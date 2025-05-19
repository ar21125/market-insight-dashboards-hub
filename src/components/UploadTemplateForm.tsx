
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Upload, FileSpreadsheet, Filter } from "lucide-react";
import { mlService } from '@/services/mlService';
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

interface ModelInfo {
  name: string;
  description: string;
  category: string;
  parameters: string[];
}

interface ModelParameter {
  description: string;
  required: boolean;
  type: string;
}

interface UploadTemplateFormProps {
  industry: string;
  onUpload: (file: File, modelType: string) => void;
}

export const UploadTemplateForm: React.FC<UploadTemplateFormProps> = ({ industry, onUpload }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [modelType, setModelType] = useState<string>('sarima');
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [models, setModels] = useState<Record<string, ModelInfo>>({});
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [parameters, setParameters] = useState<Record<string, any>>({});
  const [modelParameters, setModelParameters] = useState<string[]>([]);
  const [parametersMetadata, setParametersMetadata] = useState<Record<string, ModelParameter>>({});

  // Create form schema based on dynamic parameters
  const createFormSchema = () => {
    const schemaFields: Record<string, any> = {};
    
    modelParameters.forEach(param => {
      const metadata = parametersMetadata[param] || { type: 'string', required: false, description: '' };
      
      if (metadata.type === 'number') {
        schemaFields[param] = metadata.required 
          ? z.number().min(-999999).max(999999)
          : z.number().min(-999999).max(999999).optional();
      } else {
        schemaFields[param] = metadata.required 
          ? z.string().min(1, `${param} is required`)
          : z.string().optional();
      }
    });
    
    return z.object({
      ...schemaFields,
    });
  };

  const form = useForm({
    resolver: zodResolver(createFormSchema()),
    defaultValues: parameters,
    values: parameters,
  });

  // Load available models for the selected industry
  useEffect(() => {
    async function loadModels() {
      try {
        const modelsData = await mlService.getAvailableModels(industry);
        
        // Ensure modelsData is an object with string keys (Record<string, ModelInfo>)
        if (Array.isArray(modelsData)) {
          const modelRecord: Record<string, ModelInfo> = {};
          modelsData.forEach((model: any) => {
            if (model && typeof model === 'object' && 'name' in model) {
              modelRecord[model.name] = {
                name: model.name,
                description: model.description || '',
                category: model.category || 'general',
                parameters: model.parameters || []
              };
            }
          });
          setModels(modelRecord);
        } else if (typeof modelsData === 'object' && modelsData !== null) {
          // If it's already an object, cast it to the correct type
          setModels(modelsData as Record<string, ModelInfo>);
        } else {
          // Default to empty object if the data is invalid
          setModels({});
        }
        
        // Get unique categories from the models
        const allCategories = Object.values(models).map(model => model.category);
        const uniqueCategories = Array.from(new Set(allCategories));
        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Error loading models:", error);
      }
    }
    
    if (industry) {
      loadModels();
    }
  }, [industry, models]);

  // Load parameters for the selected model
  useEffect(() => {
    async function loadModelParameters() {
      try {
        if (!modelType) return;
        
        const paramData = await mlService.getModelParameters(modelType);
        setModelParameters(paramData.parameters || []);
        
        // Ensure metadata has proper type information
        const typedMetadata: Record<string, ModelParameter> = {};
        Object.entries(paramData.metadata || {}).forEach(([key, value]) => {
          const paramMeta = value as any;
          typedMetadata[key] = {
            description: paramMeta?.description || '',
            required: paramMeta?.required || false,
            type: paramMeta?.type || 'string'
          };
        });
        
        setParametersMetadata(typedMetadata);
        
        // Initialize parameter values
        const initialParams: Record<string, any> = {};
        paramData.parameters.forEach(param => {
          const metadata = typedMetadata[param] || { type: 'string', required: false, description: '' };
          if (metadata.type === 'number') {
            initialParams[param] = 0;
          } else {
            initialParams[param] = '';
          }
        });
        
        setParameters(initialParams);
      } catch (error) {
        console.error("Error loading model parameters:", error);
      }
    }
    
    if (modelType) {
      loadModelParameters();
    }
  }, [modelType]);

  // Filter models by category
  const filteredModels = () => {
    if (selectedCategory === 'all') {
      return models;
    }
    
    return Object.entries(models)
      .filter(([_, model]) => model.category === selectedCategory)
      .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setSelectedFile(e.dataTransfer.files[0]);
    }
  };

  const onSubmit = async (formData: any) => {
    if (selectedFile && modelType) {
      setIsUploading(true);
      
      try {
        await mlService.uploadForAnalysis({
          file: selectedFile,
          industry,
          modelType,
          parameters: formData
        });
        
        // Call the parent callback
        onUpload(selectedFile, modelType);
        
      } catch (error) {
        toast.error("Error uploading file for analysis");
        console.error("Upload error:", error);
      } finally {
        setIsUploading(false);
      }
    } else {
      toast.error("Por favor seleccione un archivo y un modelo");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <Tabs defaultValue="models" className="w-full">
          <TabsList className="grid grid-cols-2">
            <TabsTrigger value="models">Seleccionar modelo</TabsTrigger>
            <TabsTrigger value="parameters">Parámetros</TabsTrigger>
          </TabsList>
          
          <TabsContent value="models" className="space-y-4 pt-4">
            {categories.length > 0 && (
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <Filter className="h-4 w-4 text-muted-foreground" />
                  <Label>Filtrar por categoría</Label>
                </div>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Todas las categorías" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas las categorías</SelectItem>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="model-type">Seleccione el tipo de modelo</Label>
              <Select value={modelType} onValueChange={setModelType}>
                <SelectTrigger id="model-type" className="w-full">
                  <SelectValue placeholder="Seleccionar modelo" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(filteredModels()).map(([key, model]) => {
                    // Type-safe access to model properties with fallbacks
                    const modelName = typeof model.name === 'string' ? model.name : key;
                    const modelDesc = typeof model.description === 'string' ? model.description : '';
                    
                    return (
                      <SelectItem key={key} value={key}>
                        {modelName}: {modelDesc}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">
                Seleccione el tipo de análisis que desea realizar con sus datos.
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="file-upload">Archivo Excel con datos</Label>
              
              <div 
                className={`border-2 border-dashed p-4 rounded-lg cursor-pointer text-center ${
                  isDragging ? 'border-primary bg-primary/5' : 'border-muted-foreground/30'
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => document.getElementById('file-upload')?.click()}
              >
                <div className="flex flex-col items-center justify-center py-4">
                  <FileSpreadsheet className="h-8 w-8 text-muted-foreground mb-2" />
                  <p className="text-sm font-medium">
                    {selectedFile ? selectedFile.name : 'Arrastre su archivo Excel aquí o haga clic para seleccionar'}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Formato: .xlsx, .xls (Max: 10MB)
                  </p>
                </div>
                <input
                  type="file"
                  id="file-upload"
                  accept=".xlsx,.xls,.csv"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </div>
              
              {selectedFile && (
                <p className="text-xs text-green-600">
                  Archivo seleccionado: {selectedFile.name} ({Math.round(selectedFile.size / 1024)} KB)
                </p>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="parameters" className="space-y-4 pt-4">
            {modelParameters.length > 0 ? (
              <div className="space-y-4">
                <h3 className="text-sm font-medium">Parámetros del modelo</h3>
                
                {modelParameters.map((param) => {
                  const metadata = parametersMetadata[param] || { type: 'string', required: false, description: '' };
                  
                  return (
                    <FormField
                      key={param}
                      control={form.control}
                      name={param}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{param}</FormLabel>
                          <FormControl>
                            <Input 
                              type={metadata.type === 'number' ? 'number' : 'text'} 
                              {...field}
                              value={field.value || (metadata.type === 'number' ? 0 : '')}
                              onChange={(e) => {
                                const value = metadata.type === 'number' 
                                  ? Number(e.target.value) 
                                  : e.target.value;
                                field.onChange(value);
                              }}
                            />
                          </FormControl>
                          <FormDescription>
                            {metadata.description || `Parámetro: ${param}`}
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <p>Este modelo no tiene parámetros configurables</p>
              </div>
            )}
          </TabsContent>
        </Tabs>

        <Button 
          type="submit" 
          className="w-full"
          disabled={!selectedFile || isUploading}
        >
          <Upload className="h-4 w-4 mr-2" />
          {isUploading ? 'Procesando...' : 'Procesar datos'}
        </Button>
      </form>
    </Form>
  );
};
