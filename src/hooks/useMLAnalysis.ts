
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { mlService } from "@/services/mlService";

export const useMLAnalysis = (fileId: string | null) => {
  const queryClient = useQueryClient();

  const uploadFileMutation = useMutation({
    mutationFn: mlService.uploadForAnalysis,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['analysisResults', data.id] });
    }
  });

  const analysisResultsQuery = useQuery({
    queryKey: ['analysisResults', fileId],
    queryFn: () => mlService.getAnalysisResults(fileId!),
    enabled: !!fileId,
    refetchInterval: (data) => {
      // Check if analysis is still processing
      if (data && data.status === 'processing') {
        return 5000; // Poll every 5 seconds
      }
      return false; // Stop polling once complete or failed
    },
  });

  const downloadResultsMutation = useMutation({
    mutationFn: mlService.downloadResults
  });

  return {
    uploadFile: uploadFileMutation,
    analysisResults: analysisResultsQuery,
    downloadResults: downloadResultsMutation,
  };
};

export default useMLAnalysis;
