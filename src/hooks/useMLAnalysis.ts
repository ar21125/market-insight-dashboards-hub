import { useState } from 'react';
import { mlService, AnalysisRequest, AnalysisResponse } from '@/services/mlService';
import { useQuery, useMutation } from '@tanstack/react-query';

export function useMLAnalysis() {
  const [currentAnalysisId, setCurrentAnalysisId] = useState<string | null>(null);

  // Upload file for analysis
  const uploadMutation = useMutation({
    mutationFn: mlService.uploadForAnalysis,
    onSuccess: (data: AnalysisResponse) => {
      setCurrentAnalysisId(data.id);
    },
  });

  // Get analysis results
  const analysisResults = useQuery({
    queryKey: ['analysis', currentAnalysisId],
    queryFn: () => mlService.getAnalysisResults(currentAnalysisId as string),
    enabled: !!currentAnalysisId,
    refetchInterval: (data) => {
      // If status is 'completed' or 'failed', stop polling
      if (data?.status === 'completed' || data?.status === 'failed') {
        return false;
      }
      // Otherwise, poll every 5 seconds
      return 5000;
    },
  });

  // Download results
  const downloadMutation = useMutation({
    mutationFn: mlService.downloadResults,
  });

  // Get available models for an industry
  const getModels = (industry: string) => {
    return useQuery({
      queryKey: ['models', industry],
      queryFn: () => mlService.getAvailableModels(industry),
    });
  };

  return {
    uploadForAnalysis: uploadMutation.mutate,
    isUploading: uploadMutation.isPending,
    uploadError: uploadMutation.error,
    
    analysisResults: analysisResults.data,
    isLoadingResults: analysisResults.isLoading,
    
    downloadResults: downloadMutation.mutate,
    isDownloading: downloadMutation.isPending,
    
    getModels,
    setCurrentAnalysisId,
  };
}
