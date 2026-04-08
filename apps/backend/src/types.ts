// Inline types to avoid monorepo build issues
export type SeverityLevel = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';

export interface SecurityFinding {
  severity: SeverityLevel;
  title: string;
  description: string;
  line?: number;
  suggestion?: string;
}

export interface SecurityReview {
  level: SeverityLevel;
  findings: SecurityFinding[];
}

export interface PerformanceSuggestion {
  title: string;
  description: string;
  impact: 'HIGH' | 'MEDIUM' | 'LOW';
  suggestion: string;
}

export interface MaintainabilityIssue {
  title: string;
  description: string;
  cognitiveComplexity?: number;
  suggestion: string;
}

export interface Improvement {
  title: string;
  description: string;
  originalCode: string;
  suggestedCode: string;
  reason: string;
}

export interface ReviewResult {
  success: boolean;
  timestamp: string;
  code?: {
    language: string;
    lines: number;
  };
  security: SecurityReview;
  performance: {
    suggestions: PerformanceSuggestion[];
  };
  maintainability: {
    cognitiveComplexity: number;
    issues: MaintainabilityIssue[];
  };
  improvements: Improvement[];
  praiseNotes: string[];
}

export interface ReviewCodeRequest {
  code: string;
  language: string;
  context?: string;
}

export interface ReviewCodeResponse {
  success: boolean;
  data?: ReviewResult;
  error?: string;
  message?: string;
}
