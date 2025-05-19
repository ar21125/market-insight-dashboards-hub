
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

// FastAPI backend URL - replace with your actual FastAPI server URL
const FASTAPI_URL = "http://localhost:8000";

// Type definitions
export interface AnalysisRequest {
  file: File;
  industry: string;
  modelType: string;
  parameters?: Record<string, any>;
}

export interface AnalysisResponse {
  id: string;
  status: string;
  result?: any;
}

export interface ModelParameter {
  description: string;
  required: boolean;
  type: string;
}

export interface ModelParametersResponse {
  model_id: string;
  parameters: string[];
  metadata: Record<string, ModelParameter>;
}

export const mlService = {
  /**
   * Upload a file for analysis
   */
  async uploadForAnalysis({ file, industry, modelType, parameters = {} }: AnalysisRequest): Promise<AnalysisResponse> {
    try {
      // Step 1: Upload file to Supabase Storage
      const fileExt = file.name.split('.').pop();
      const fileName = `${industry}_${modelType}_${Date.now()}.${fileExt}`;
      const filePath = `${industry}/${modelType}/${fileName}`;
      
      const { data: uploadData, error: uploadError } = await supabase
        .storage
        .from('excel_templates')
        .upload(filePath, file);
      
      if (uploadError) {
        console.error("Error uploading file:", uploadError);
        toast.error("Error uploading file");
        throw new Error(`Upload error: ${uploadError.message}`);
      }
      
      // Step 2: Create uploaded_files record
      const { data: fileRecord, error: fileError } = await supabase
        .from('uploaded_files')
        .insert({
          file_name: file.name,
          file_path: uploadData.path,
          industry,
          model_type: modelType,
          status: 'uploaded'
        })
        .select()
        .single();
      
      if (fileError) {
        console.error("Error creating file record:", fileError);
        toast.error("Error creating file record");
        throw new Error(`Database error: ${fileError.message}`);
      }
      
      // Step 3: Send to FastAPI for processing
      const formData = new FormData();
      formData.append('file', file);
      formData.append('file_id', fileRecord.id);
      formData.append('industry', industry);
      formData.append('model_type', modelType);
      
      // Add parameters as JSON string
      formData.append('parameters', JSON.stringify(parameters));
      
      const response = await fetch(`${FASTAPI_URL}/analyze`, {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error("FastAPI error:", errorText);
        toast.error("Error processing file");
        throw new Error(`API error: ${errorText}`);
      }
      
      const result = await response.json();
      
      // Step 4: Update file status
      await supabase
        .from('uploaded_files')
        .update({ status: 'processing', result_id: result.id })
        .eq('id', fileRecord.id);
      
      toast.success("File uploaded and sent for analysis");
      
      return {
        id: fileRecord.id,
        status: 'processing'
      };
    } catch (error) {
      console.error("Error in uploadForAnalysis:", error);
      toast.error("Error processing your request");
      throw error;
    }
  },
  
  /**
   * Get analysis results by file ID
   */
  async getAnalysisResults(fileId: string): Promise<any> {
    try {
      const { data, error } = await supabase
        .from('analysis_results')
        .select('*')
        .eq('file_id', fileId)
        .single();
        
      if (error) {
        console.error("Error fetching results:", error);
        return null;
      }
      
      return data;
    } catch (error) {
      console.error("Error in getAnalysisResults:", error);
      return null;
    }
  },
  
  /**
   * Get all available models for a specific industry
   */
  async getAvailableModels(industry: string): Promise<any[]> {
    try {
      // First try to get models from the FastAPI backend
      const response = await fetch(`${FASTAPI_URL}/analyze/models?industry=${industry}`);
      
      if (response.ok) {
        return await response.json();
      }
      
      // Fallback to Supabase if FastAPI fails
      console.warn("Falling back to Supabase for model data");
      const { data, error } = await supabase
        .from('ml_models')
        .select('*')
        .eq('industry', industry)
        .eq('is_active', true);
        
      if (error) {
        console.error("Error fetching models:", error);
        return [];
      }
      
      return data || [];
    } catch (error) {
      console.error("Error in getAvailableModels:", error);
      return [];
    }
  },
  
  /**
   * Get all model categories
   */
  async getModelCategories(): Promise<string[]> {
    try {
      const response = await fetch(`${FASTAPI_URL}/analyze/categories`);
      
      if (!response.ok) {
        throw new Error("Failed to fetch model categories");
      }
      
      const data = await response.json();
      return data.categories || [];
    } catch (error) {
      console.error("Error fetching model categories:", error);
      return [];
    }
  },
  
  /**
   * Get supported industries
   */
  async getSupportedIndustries(): Promise<string[]> {
    try {
      const response = await fetch(`${FASTAPI_URL}/analyze/industries`);
      
      if (!response.ok) {
        throw new Error("Failed to fetch supported industries");
      }
      
      const data = await response.json();
      return data.industries || [];
    } catch (error) {
      console.error("Error fetching supported industries:", error);
      return ["retail", "finanzas", "salud", "manufactura", "tecnologia", "educacion"];
    }
  },
  
  /**
   * Get parameters for a specific model
   */
  async getModelParameters(modelType: string): Promise<ModelParametersResponse> {
    try {
      const response = await fetch(`${FASTAPI_URL}/analyze/models/${modelType}/parameters`);
      
      if (!response.ok) {
        throw new Error("Failed to fetch model parameters");
      }
      
      return await response.json();
    } catch (error) {
      console.error("Error fetching model parameters:", error);
      return {
        model_id: modelType,
        parameters: [],
        metadata: {}
      };
    }
  },
  
  /**
   * Download analysis results
   */
  async downloadResults(resultId: string): Promise<string | null> {
    try {
      // First get the analysis result to get the file path
      const { data: result, error: resultError } = await supabase
        .from('analysis_results')
        .select('*')
        .eq('id', resultId)
        .single();
        
      if (resultError || !result) {
        console.error("Error fetching result:", resultError);
        return null;
      }
      
      // Get the download URL
      const { data, error } = await supabase
        .storage
        .from('analysis_results')
        .createSignedUrl(`${result.file_id}/${resultId}.xlsx`, 60);
        
      if (error) {
        console.error("Error creating download URL:", error);
        return null;
      }
      
      return data.signedUrl;
    } catch (error) {
      console.error("Error in downloadResults:", error);
      return null;
    }
  }
};
