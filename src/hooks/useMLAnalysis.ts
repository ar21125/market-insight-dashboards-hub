// This file would contain query hooks for ML analysis
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

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
