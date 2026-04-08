import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { ReviewCodeDto } from './dtos/review-code.dto';
import {
  ReviewResult,
  SeverityLevel,
  SecurityFinding,
  PerformanceSuggestion,
  MaintainabilityIssue,
  Improvement,
} from '../../types';

@Injectable()
export class ReviewsService {
  private readonly logger = new Logger(ReviewsService.name);
  private genAI: GoogleGenerativeAI;
  private model : any;

  constructor() {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      this.logger.error('GEMINI_API_KEY environment variable not set');
      throw new Error('GEMINI_API_KEY is required');
    }
    this.genAI = new GoogleGenerativeAI(apiKey);
    // this.model = this.genAI.getGenerativeModel({ model: 'gemini-3-flash-preview' });
    this.model = this.genAI.getGenerativeModel({ model: 'gemini-3.1-flash-lite-preview' });
  }

  /**
   * Analyzes code using Google Gemini API
   * Returns structured review with security, performance, maintainability insights
   */
  async analyzeCode(dto: ReviewCodeDto): Promise<ReviewResult> {
    try {
      // Truncate code if too large (save tokens)
      const truncatedCode = this.truncateCode(dto.code, 8000);
      const lineCount = dto.code.split('\n').length;

      // Build analysis prompt
      const prompt = this.buildAnalysisPrompt(truncatedCode, dto.language, dto.context);

      // Get AI review (with timeout)
      const review = await this.callGeminiWithTimeout(prompt, 30000);

      // Parse response
      const parsed = this.parseReviewResponse(review);

      return {
        success: true,
        timestamp: new Date().toISOString(),
        code: {
          language: dto.language,
          lines: lineCount,
        },
        security: parsed.security,
        performance: parsed.performance,
        maintainability: parsed.maintainability,
        improvements: parsed.improvements,
        praiseNotes: parsed.praiseNotes,
      };
    } catch (error) {
      this.logger.error('Code analysis failed', error);

      if (error instanceof HttpException) {
        throw error;
      }

      throw new HttpException(
        {
          success: false,
          error: 'Failed to analyze code',
          message: error instanceof Error ? error.message : 'Unknown error',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * Builds the analysis prompt for Gemini
   */
  private buildAnalysisPrompt(code: string, language: string, context?: string): string {
    return `You are an expert code reviewer. Analyze the following ${language} code and provide a detailed review in JSON format.

${context ? `Context: ${context}\n` : ''}

Code to review:
\`\`\`${language}
${code}
\`\`\`

Provide your review as valid JSON (no markdown, just raw JSON) with this exact structure:
{
  "security": {
    "level": "CRITICAL|HIGH|MEDIUM|LOW",
    "findings": [
      {
        "severity": "CRITICAL|HIGH|MEDIUM|LOW",
        "title": "Finding title",
        "description": "Detailed description",
        "line": 0,
        "suggestion": "How to fix"
      }
    ]
  },
  "performance": {
    "suggestions": [
      {
        "title": "Optimization title",
        "description": "Why this matters",
        "impact": "HIGH|MEDIUM|LOW",
        "suggestion": "Specific optimization"
      }
    ]
  },
  "maintainability": {
    "cognitiveComplexity": 45,
    "issues": [
      {
        "title": "Maintainability issue",
        "description": "Why it's an issue",
        "cognitiveComplexity": 12,
        "suggestion": "How to improve"
      }
    ]
  },
  "improvements": [
    {
      "title": "Code improvement",
      "description": "What could be better",
      "originalCode": "current code snippet",
      "suggestedCode": "improved code snippet",
      "reason": "Why this is better"
    }
  ],
  "praiseNotes": [
    "Positive observation 1",
    "Positive observation 2"
  ]
}

Be thorough but concise. Focus on actionable insights.`;
  }

  /**
   * Calls Gemini API with timeout protection
   */
  private async callGeminiWithTimeout(prompt: string, timeoutMs: number): Promise<string> {
    return Promise.race([
      this.model.generateContent(prompt).then((result) => result.response.text()),
      new Promise<string>((_, reject) =>
        setTimeout(() => reject(new Error('Gemini API timeout')), timeoutMs),
      ),
    ]);
  }

  /**
   * Parses Gemini response and extracts review data
   */
  private parseReviewResponse(response: string) {
    try {
      // Extract JSON from response (handle markdown code blocks)
      let jsonStr = response;
      const jsonMatch = response.match(/```(?:json)?\s*([\s\S]*?)```/);
      if (jsonMatch) {
        jsonStr = jsonMatch[1];
      }

      const parsed = JSON.parse(jsonStr.trim());

      return {
        security: {
          level: (parsed.security?.level || 'MEDIUM') as SeverityLevel,
          findings: (parsed.security?.findings || []) as SecurityFinding[],
        },
        performance: {
          suggestions: (parsed.performance?.suggestions || []) as PerformanceSuggestion[],
        },
        maintainability: {
          cognitiveComplexity: Math.min(100, parsed.maintainability?.cognitiveComplexity || 50),
          issues: (parsed.maintainability?.issues || []) as MaintainabilityIssue[],
        },
        improvements: (parsed.improvements || []) as Improvement[],
        praiseNotes: (parsed.praiseNotes || []) as string[],
      };
    } catch (error) {
      this.logger.warn('Failed to parse Gemini response, using defaults', error);
      return {
        security: { level: 'MEDIUM' as SeverityLevel, findings: [] },
        performance: { suggestions: [] },
        maintainability: { cognitiveComplexity: 50, issues: [] },
        improvements: [],
        praiseNotes: ['Review could not be fully analyzed, but keep improving!'],
      };
    }
  }

  /**
   * Truncates code to reduce token usage
   */
  private truncateCode(code: string, maxLines: number): string {
    const lines = code.split('\n');
    if (lines.length <= maxLines) {
      return code;
    }

    // Keep first and last portions
    const keepFromStart = Math.floor(maxLines * 0.7);
    const keepFromEnd = maxLines - keepFromStart;

    const truncated = [
      ...lines.slice(0, keepFromStart),
      `\n... (${lines.length - maxLines} lines omitted) ...\n`,
      ...lines.slice(-keepFromEnd),
    ].join('\n');

    return truncated;
  }
}
