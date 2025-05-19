
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';

export interface AnalysisResult {
  id: string;
  file_id: string;
  model_type: string;
  industry: string;
  result: any;
  metrics: any;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface UploadedFile {
  id: string;
  file_name: string;
  file_path: string;
  industry: string;
  model_type: string;
  status: string;
  result_id: string | null;
  user_id: string | null;
  created_at: string;
}

export const useMLAnalysis = (fileId?: string, resultId?: string) => {
  const [isPolling, setIsPolling] = useState<boolean>(false);
  
  // Query for uploaded file
  const fileQuery = useQuery({
    queryKey: ['uploaded_file', fileId],
    queryFn: async () => {
      if (!fileId) return null;
      
      const { data, error } = await supabase
        .from('uploaded_files')
        .select('*')
        .eq('id', fileId)
        .single();
        
      if (error) throw error;
      return data as UploadedFile;
    },
    enabled: !!fileId,
    gcTime: 1000 * 60 * 5, // 5 minutes
    staleTime: 1000 * 30, // 30 seconds
  });
  
  // Get file status
  const fileStatus = fileQuery.data?.status || 'unknown';
  
  // Query for analysis result
  const analysisQuery = useQuery({
    queryKey: ['analysis_result', resultId || (fileQuery.data?.result_id || '')],
    queryFn: async () => {
      const id = resultId || fileQuery.data?.result_id;
      if (!id) return null;
      
      const { data, error } = await supabase
        .from('analysis_results')
        .select('*')
        .eq('id', id)
        .single();
        
      if (error) throw error;
      return data as AnalysisResult;
    },
    enabled: !!(resultId || fileQuery.data?.result_id),
    gcTime: 1000 * 60 * 5, // 5 minutes
    staleTime: 1000 * 30, // 30 seconds
    meta: {
      onSettled: (data, error) => {
        if (error) {
          toast.error("Error fetching analysis result");
        }
      }
    }
  });
  
  // Get result status
  const resultStatus = analysisQuery.data?.status || 'unknown';
  
  // Start polling if file is uploaded but processing is not complete
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    
    if ((fileStatus === 'uploaded' || fileStatus === 'processing') && 
        (resultStatus === 'processing' || resultStatus === 'unknown')) {
      setIsPolling(true);
      
      interval = setInterval(() => {
        fileQuery.refetch();
        if (fileQuery.data?.result_id) {
          analysisQuery.refetch();
        }
      }, 5000); // Poll every 5 seconds
    } else {
      setIsPolling(false);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [fileStatus, resultStatus, fileQuery, analysisQuery]);
  
  // Process visualization recommendations
  const visualizations = analysisQuery.data?.result?.visualizations || [];
  
  // Process complementary analysis recommendations
  const complementaryAnalyses = analysisQuery.data?.result?.complementary_analyses || [];
  
  // Download function for results
  const downloadResults = async () => {
    try {
      if (!analysisQuery.data?.id) {
        toast.error("No analysis result available for download");
        return null;
      }
      
      const url = await supabase
        .storage
        .from('analysis_results')
        .createSignedUrl(`${fileId}/${analysisQuery.data.id}.xlsx`, 60);
        
      if (!url.data?.signedUrl) {
        throw new Error("Could not generate download URL");
      }
      
      // Open URL in new tab
      window.open(url.data.signedUrl, '_blank');
      return url.data.signedUrl;
    } catch (error: any) {
      toast.error(`Error downloading results: ${error.message}`);
      return null;
    }
  };
  
  return {
    file: fileQuery.data,
    fileStatus,
    fileIsLoading: fileQuery.isLoading,
    fileError: fileQuery.error,
    
    result: analysisQuery.data,
    resultStatus,
    resultIsLoading: analysisQuery.isLoading,
    resultError: analysisQuery.error,
    
    isPolling,
    
    // Result data
    visualizations,
    complementaryAnalyses,
    predictions: analysisQuery.data?.result?.predictions || [],
    metrics: analysisQuery.data?.metrics || {},
    importantVariables: analysisQuery.data?.result?.important_variables || [],
    
    // Actions
    downloadResults,
    refetchResult: analysisQuery.refetch,
    refetchFile: fileQuery.refetch,
  };
};
