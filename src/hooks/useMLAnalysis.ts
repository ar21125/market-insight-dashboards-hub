
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const useMLAnalysis = (fileId: string | null) => {
  // Query to fetch analysis result
  const analysisQuery = useQuery({
    queryKey: ['analysis', fileId],
    queryFn: async () => {
      if (!fileId) return null;
      
      const { data, error } = await supabase
        .from('analysis_results')
        .select('*')
        .eq('file_id', fileId)
        .single();
        
      if (error) throw error;
      return data;
    },
    enabled: !!fileId,
    refetchInterval: (data) => {
      // Check if analysis is still processing
      if (data && data.status === 'processing') {
        return 5000; // Poll every 5 seconds
      }
      return false; // Stop polling once complete or failed
    }
  });
  
  return {
    analysisResult: analysisQuery.data,
    isLoading: analysisQuery.isLoading,
    error: analysisQuery.error
  };
};
