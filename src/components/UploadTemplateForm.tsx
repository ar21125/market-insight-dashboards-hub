import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import { Info as InfoIcon, Upload as UploadIcon } from "lucide-react";
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { API_URL } from '@/config';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const formSchema = z.object({
  modelType: z.string().min(2, {
    message: "Model type must be at least 2 characters.",
  }),
  file: z.any(),
  parameters: z.record(z.any()).optional(),
});

interface UploadTemplateFormProps {
  onUploadComplete: (modelType: string, results: any) => void;
}

export const UploadTemplateForm: React.FC<UploadTemplateFormProps> = ({ onUploadComplete }) => {
  const [file, setFile] = useState<File | null>(null);
  const [metadata, setMetadata] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      modelType: "",
      file: null,
      parameters: {},
    },
  });

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    setFile(file);

    // Read metadata from the file (assuming it's a JSON or CSV)
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const contents = reader.result as string;
        const parsedData = JSON.parse(contents);
        setMetadata(parsedData.metadata);
        console.log("Metadata:", parsedData.metadata);
      } catch (error) {
        console.error("Error parsing file:", error);
        toast.error("Error al parsear el archivo. Asegúrese de que sea un archivo JSON válido.");
      }
    };
    reader.readAsText(file);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept: { 'text/csv': ['.csv'], 'application/json': ['.json'] } })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);
    console.log("Form values:", values);

    if (!file) {
      toast.error("Por favor, suba un archivo.");
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("model_type", values.modelType);
    formData.append("file", file);
    
    // Append parameters to the formData
    if (values.parameters) {
      for (const key in values.parameters) {
        formData.append(key, values.parameters[key]);
      }
    }

    try {
      const response = await fetch(`${API_URL}/analyze`, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const results = await response.json();
        console.log("Analysis results:", results);
        toast.success("Análisis completado con éxito!");
        onUploadComplete(values.modelType, results);
      } else {
        const errorData = await response.json();
        console.error("Error during analysis:", errorData);
        toast.error(`Error durante el análisis: ${errorData.detail || 'Error desconocido'}`);
      }
    } catch (error) {
      console.error("Error during the request:", error);
      toast.error("Error al enviar la solicitud al servidor.");
    } finally {
      setLoading(false);
    }
  };

  const renderParameterFields = () => {
    if (!metadata || !metadata.parameters) {
      return <p className="text-muted-foreground">No se encontraron parámetros.</p>;
    }

    const parameters = Object.keys(metadata.parameters);

    return (
      <Accordion type="multiple" collapsible>
        {parameters.map(param => (
          <AccordionItem value={param} key={param}>
            <AccordionTrigger className="data-[state=closed]:hover:bg-muted/50 px-3 rounded-md">
              {renderParameterField(param, metadata.parameters)}
            </AccordionTrigger>
            <AccordionContent className="pt-2">
              {/* Additional content if needed */}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    );
  };

  // Fix the type issues with parameter fields
  // Around line 290, add type guards before accessing properties
  const renderParameterField = (param: string, metadata: any) => {
    // Add type guard to check if metadata[param] is an object with name and description properties
    const paramMeta = metadata[param] as { name?: string; description?: string; type?: string; required?: boolean };
    
    return (
      <div key={param} className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor={param} className="text-sm font-medium">
            {paramMeta?.name || param}
            {paramMeta?.required && <span className="text-red-500 ml-1">*</span>}
          </Label>
          <HoverCard>
            <HoverCardTrigger asChild>
              <InfoIcon className="h-4 w-4 text-muted-foreground cursor-help" />
            </HoverCardTrigger>
            <HoverCardContent className="w-80">
              <p className="text-sm">{paramMeta?.description || `Parámetro: ${param}`}</p>
            </HoverCardContent>
          </HoverCard>
        </div>
        
        <FormField
          control={form.control}
          name={`parameters.${param}`}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  id={param}
                  placeholder={paramMeta?.example || "Ingrese el valor"}
                  type="text"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    );
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="modelType"
          render={({ field }) => (
            <FormItem>
              <Label htmlFor="modelType">Tipo de modelo</Label>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccione un tipo de modelo" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="kmeans">K-Means</SelectItem>
                  <SelectItem value="randomForest">Random Forest</SelectItem>
                  <SelectItem value="xgboost">XGBoost</SelectItem>
                  <SelectItem value="regression">Regresión</SelectItem>
                  {/* Add more model types here */}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <div {...getRootProps()} className="rounded-md border-2 border-dashed border-muted-foreground/50 p-4 text-center">
          <input {...getInputProps()} id="file" />
          {
            isDragActive ?
              <p className="text-muted-foreground">Suelta el archivo aquí...</p> :
              <p className="text-muted-foreground">
                Arrastra y suelta un archivo aquí, o haz clic para seleccionar un archivo
              </p>
          }
          {file && <p className="mt-2 text-sm text-muted-foreground">Archivo seleccionado: {file.name}</p>}
        </div>

        {metadata && metadata.description && (
          <div className="rounded-md bg-muted/50 p-4">
            <h3 className="text-sm font-medium">Descripción del archivo</h3>
            <p className="text-sm text-muted-foreground">{metadata.description}</p>
          </div>
        )}

        {metadata && metadata.parameters && (
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Parámetros adicionales</h3>
            {renderParameterFields()}
          </div>
        )}

        <Button type="submit" disabled={loading} className="w-full">
          {loading ? (
            <>
              <UploadIcon className="mr-2 h-4 w-4 animate-spin" />
              Analizando...
            </>
          ) : (
            <>
              <UploadIcon className="mr-2 h-4 w-4" />
              Analizar
            </>
          )}
        </Button>
      </form>
    </Form>
  );
};
