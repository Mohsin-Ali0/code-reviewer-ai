import axios, { AxiosInstance } from 'axios';

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

class ReviewAPI {
  private client: AxiosInstance;
  private baseUrl: string;

  constructor() {
    this.baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
    this.client = axios.create({
      baseURL: this.baseUrl,
      timeout: 45000, // 45 second timeout
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  async reviewCode(request: ReviewCodeRequest): Promise<ReviewCodeResponse> {
    try {
      const response = await this.client.post<ReviewCodeResponse>('/api/reviews', request);
      return response.data;
    } catch (error: any) {
      if (error.response?.status === 429) {
        return {
          success: false,
          error: 'Rate limited',
          message: 'Too many requests. Please wait 1 minute before trying again.',
        };
      }

      if (error.code === 'ECONNABORTED') {
        return {
          success: false,
          error: 'Timeout',
          message: 'Analysis took too long. Please try with a shorter code snippet.',
        };
      }

      return {
        success: false,
        error: error.message || 'Unknown error',
        message: 'Failed to analyze code. Please try again.',
      };
    }
  }
}

export const reviewAPI = new ReviewAPI();
