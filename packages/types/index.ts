// Severity levels for findings
export type SeverityLevel = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';

// Individual security finding
export interface SecurityFinding {
  severity: SeverityLevel;
  title: string;
  description: string;
  line?: number;
  suggestion?: string;
}

// Security review section
export interface SecurityReview {
  level: SeverityLevel;
  findings: SecurityFinding[];
}

// Performance suggestion
export interface PerformanceSuggestion {
  title: string;
  description: string;
  impact: 'HIGH' | 'MEDIUM' | 'LOW';
  suggestion: string;
}

// Maintainability issue
export interface MaintainabilityIssue {
  title: string;
  description: string;
  cognitiveComplexity?: number;
  suggestion: string;
}

// Code improvement suggestion
export interface Improvement {
  title: string;
  description: string;
  originalCode: string;
  suggestedCode: string;
  reason: string;
}

// The main review result
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
    cognitiveComplexity: number; // 1-100 score
    issues: MaintainabilityIssue[];
  };
  improvements: Improvement[];
  praiseNotes: string[];
}

// API request
export interface ReviewCodeRequest {
  code: string;
  language: string;
  context?: string;
}

// API response
export interface ReviewCodeResponse {
  success: boolean;
  data?: ReviewResult;
  error?: string;
  message?: string;
}
