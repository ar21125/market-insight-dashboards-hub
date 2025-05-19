
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Upload, FileSpreadsheet } from "lucide-react";

interface UploadTemplateFormProps {
  industry: string;
  onUpload: (file: File, modelType: string) => void;
}

export const UploadTemplateForm: React.FC<UploadTemplateFormProps> = ({ industry, onUpload }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [modelType, setModelType] = useState<string>('sarima');
  const [isDragging, setIsDragging] = useState(false);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedFile && modelType) {
      onUpload(selectedFile, modelType);
    }
  };

  const availableModels = [
    { value: 'sarima', label: 'SARIMA (Series temporales estacionales)' },
    { value: 'arima', label: 'ARIMA (Series temporales no estacionales)' },
    { value: 'prophet', label: 'Prophet (Pronósticos múltiples estacionalidades)' },
    { value: 'kmeans', label: 'K-means (Segmentación)' },
    { value: 'randomForest', label: 'Random Forest (Clasificación/Regresión)' },
    { value: 'xgboost', label: 'XGBoost (Gradient boosting)' },
    { value: 'lstm', label: 'LSTM (Redes neuronales recurrentes)' },
    { value: 'svm', label: 'SVM (Support Vector Machines)' },
    { value: 'anova', label: 'Análisis ANOVA' },
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="model-type">Seleccione el tipo de modelo</Label>
        <Select value={modelType} onValueChange={setModelType}>
          <SelectTrigger id="model-type" className="w-full">
            <SelectValue placeholder="Seleccionar modelo" />
          </SelectTrigger>
          <SelectContent>
            {availableModels.map((model) => (
              <SelectItem key={model.value} value={model.value}>
                {model.label}
              </SelectItem>
            ))}
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

      <Button 
        type="submit" 
        className="w-full"
        disabled={!selectedFile}
      >
        <Upload className="h-4 w-4 mr-2" />
        Procesar datos
      </Button>
    </form>
  );
};
