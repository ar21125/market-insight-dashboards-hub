
export interface InputField {
  name: string;
  description: string;
  example: string | number;
  required: boolean;
  type: 'text' | 'numeric' | 'date' | 'categorical';
}

export interface OutputInsight {
  name: string;
  description: string;
  visualizationType: string;
  businessValue: string;
}

export interface AnalysisStep {
  id: string;
  name: string;
  description: string;
  prerequisiteSteps: string[];
  estimatedProcessingTime: string;
  difficulty: 'básico' | 'intermedio' | 'avanzado';
  modelType: string;
  howItWorks?: string;
  benefits?: string[];
  inputFields: InputField[];
  outputInsights: OutputInsight[];
}

export interface RecommendedFor {
  title: string;
  reason: string;
}

export interface AnalysisFlow {
  id: string;
  name: string;
  description: string;
  industry: string;
  applicableIndustries?: string[];
  businessGoal: string;
  totalEstimatedTime: string;
  recommendedTools: string[];
  recommendedFor?: RecommendedFor[];
  steps: AnalysisStep[];
}
