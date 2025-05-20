
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
  technicalImplementation?: TechnicalImplementation;
  success_stories?: SuccessStory[];
}

export interface SuccessStory {
  company: string;
  industry: string;
  challenge: string;
  solution: string;
  results: string[];
  testimonial?: {
    quote: string;
    author: string;
    position: string;
  };
}

export interface TechnicalImplementation {
  approach: string;
  technologies: string[];
  openSourceAlternatives?: OpenSourceAlternative[];
  implementationSteps: ImplementationStep[];
  challenges?: string[];
}

export interface OpenSourceAlternative {
  name: string;
  description: string;
  url?: string;
}

export interface ImplementationStep {
  name: string;
  description: string;
  resources?: string[];
}

export interface AnalysisCapability {
  id: string;
  title: string;
  description: string;
  industry: string;
  applicableIndustries?: string[];
  capabilities: string[];
  benefits: string[];
  useCases: string[];
  technical_details?: {
    modelTypes: string[];
    dataRequirements: string[];
    integrations: string[];
  };
}

export interface AIModelInfo {
  id: string;
  name: string;
  type: string;
  industry: string;
  applicableIndustries?: string[];
  description: string;
  use_cases: string[];
  benefits: string[];
  implementation_difficulty: 'básico' | 'intermedio' | 'avanzado';
  data_requirements: string[];
  typical_metrics: { name: string; description: string }[];
}

export interface IndustryInsight {
  industry: string;
  key_metrics: { name: string; description: string; benefit: string }[];
  common_challenges: { title: string; description: string; solution: string }[];
  trending_analytics: string[];
  roi_stats: { metric: string; value: string; description: string }[];
}
