// This file would contain query hooks for ML analysis
import { useState } from 'react';
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export function useMLAnalysis(fileId: string | null) {
  const [resultId, setResultId] = useState<string | null>(null);

  // Query to get file status
  const fileQuery = useQuery({
    queryKey: ['file', fileId],
    queryFn: async () => {
      if (!fileId) return null;
      
      const { data, error } = await supabase
        .from('uploaded_files')
        .select('*')
        .eq('id', fileId)
        .single();
      
      if (error) throw error;
      
      if (data?.result_id && data.result_id !== resultId) {
        setResultId(data.result_id);
      }
      
      return data;
    },
    enabled: !!fileId,
    refetchInterval: (data) => {
      // Keep polling while file is processing
      return (data && (data.status === 'processing' || data.status === 'uploaded')) ? 3000 : false;
    }
  });

  // Query to get analysis results
  const resultsQuery = useQuery({
    queryKey: ['results', resultId],
    queryFn: async () => {
      if (!resultId) return null;
      
      const { data, error } = await supabase
        .from('analysis_results')
        .select('*')
        .eq('id', resultId)
        .single();
      
      if (error) throw error;
      return data;
    },
    enabled: !!resultId,
    refetchInterval: (data) => {
      // Keep polling while processing
      return (data && data.status === 'processing') ? 3000 : false;
    },
    meta: {
      onSuccess: (data) => {
        if (data?.status === 'completed') {
          toast.success("Análisis completado");
        } else if (data?.status === 'failed') {
          toast.error("Error en el análisis");
        }
      }
    }
  });

  // Combine data from both queries to determine overall status
  const isLoading = fileQuery.isLoading || resultsQuery.isLoading || 
                    (fileQuery.data && fileQuery.data.status === 'processing') || 
                    (fileQuery.data && fileQuery.data.status === 'uploaded') ||
                    (resultsQuery.data && resultsQuery.data.status === 'processing');

  return {
    fileId,
    resultId,
    isLoading,
    fileStatus: fileQuery.data?.status,
    result: resultsQuery.data,
    fileError: fileQuery.error,
    resultError: resultsQuery.error
  };
}

export function useAnalysisResult(analysisId: string | undefined) {
  return useQuery({
    queryKey: ["analysis_result", analysisId],
    queryFn: async () => {
      if (!analysisId) {
        throw new Error("No analysis ID provided");
      }
      
      const { data, error } = await supabase
        .from("analysis_results")
        .select("*")
        .eq("id", analysisId)
        .single();
        
      if (error) {
        throw error;
      }
      
      return data;
    },
    enabled: !!analysisId,
    refetchInterval: (data) => {
      // If the data is undefined or the status is "processing", refetch every 5 seconds
      // Otherwise, stop refetching
      if (!data || data.status === "processing") {
        return 5000; // 5 seconds
      }
      return false; // Stop refetching
    }
  });
}

export function useAnalysisStatus(fileId: string | undefined) {
  return useQuery({
    queryKey: ["analysis_status", fileId],
    queryFn: async () => {
      if (!fileId) {
        throw new Error("No file ID provided");
      }
      
      const { data, error } = await supabase
        .from("uploaded_files")
        .select("*")
        .eq("id", fileId)
        .single();
        
      if (error) {
        throw error;
      }
      
      return data;
    },
    enabled: !!fileId,
    refetchInterval: (data) => {
      // Refetch until status is "completed" or "failed"
      if (!data || (data.status !== "completed" && data.status !== "failed")) {
        return 5000; // 5 seconds
      }
      return false;
    }
  });
}

export function useAvailableModels(industry: string | undefined) {
  return useQuery({
    queryKey: ["available_models", industry],
    queryFn: async () => {
      if (!industry) {
        throw new Error("No industry provided");
      }
      
      const { data, error } = await supabase
        .from("ml_models")
        .select("*")
        .eq("industry", industry)
        .eq("is_active", true);
        
      if (error) {
        throw error;
      }
      
      return data || [];
    },
    enabled: !!industry
  });
}

export function useModelParameters(modelType: string | undefined) {
  return useQuery({
    queryKey: ["model_parameters", modelType],
    queryFn: async () => {
      if (!modelType) {
        throw new Error("No model type provided");
      }
      
      // This would need to be replaced with an actual API call to your FastAPI backend
      const response = await fetch(`http://localhost:8000/analyze/models/${modelType}/parameters`);
      
      if (!response.ok) {
        throw new Error("Failed to fetch model parameters");
      }
      
      return response.json();
    },
    enabled: !!modelType
  });
}
