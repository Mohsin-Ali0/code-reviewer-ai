import { Controller, Post, Body, HttpCode, HttpStatus, Logger } from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';
import { ReviewsService } from './reviews.service';
import { ReviewCodeDto } from './dtos/review-code.dto';
import { ReviewCodeResponse } from '../../types';

@Controller('api/reviews')
export class ReviewsController {
  private readonly logger = new Logger(ReviewsController.name);

  constructor(private readonly reviewsService: ReviewsService) {}

  /**
   * POST /api/reviews
   * Analyzes code and returns structured review
   * Rate limited to 60 requests per hour
   */
  @Post()
  @HttpCode(HttpStatus.OK)
  @Throttle({ default: { limit: 60, ttl: 3600 } }) // 60 req/hour
  async reviewCode(@Body() dto: ReviewCodeDto): Promise<ReviewCodeResponse> {
    try {
      this.logger.log(
        `Analyzing ${dto.language} code (${dto.code.length} chars, ${dto.code.split('\n').length} lines)`,
      );

      const result = await this.reviewsService.analyzeCode(dto);

      return {
        success: true,
        data: result,
      };
    } catch (error) {
      this.logger.error('Review endpoint error', error);
      return {
        success: false,
        error: error.message,
        message: 'Failed to generate code review',
      };
    }
  }
}
