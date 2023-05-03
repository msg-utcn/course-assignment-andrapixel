import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post, Put,
  UseGuards,
} from '@nestjs/common';
import { QuestionService } from './question.service';
import { CreateQuestionDto } from './dtos/create-question.dto';
import { UpdateQuestionDto } from './dtos/update-question.dto';
import { QuestionManagementConfig } from './question-management.config';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { QuestionDto } from './dtos/question.dto';
import {AnswerService} from "./answer.service";
import {AnswerDto} from "./dtos/answer.dto";
import {UpdateAnswerDto} from "./dtos/update-answer.dto";
import {CreateAnswerDto} from "./dtos/create-answer.dto";

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags(QuestionManagementConfig.SWAGGER_FEATURE)
@Controller(QuestionManagementConfig.API_ROUTE)
export class QuestionManagementController {
  constructor(
    private questionService: QuestionService,
    private answerService: AnswerService
  ) {}

  // Questions CRUD region
  @Get()
  async getAllQuestions(): Promise<QuestionDto[]> {
    return this.questionService.readAll();
  }

  @Get(':id')
  async getQuestionById(@Param('id') id: string): Promise<QuestionDto> {
    return this.questionService.readById(id);
  }

  @Post()
  async createQuestion(@Body() dto: CreateQuestionDto): Promise<QuestionDto> {
    return this.questionService.create(dto);
  }

  @Patch(':id')
  async updateQuestion(
    @Param('id') id: string,
    @Body() dto: UpdateQuestionDto
  ): Promise<QuestionDto> {
    return this.questionService.update(id, dto);
  }

  @Delete(':id')
  async deleteQuestion(@Param('id') id: string): Promise<void> {
    return this.questionService.delete(id);
  }


  // Answers CRUD region
  /*@Get('/answers')
  async getAllAnswers(): Promise<AnswerDto[]> {
    return this.answerService.readAll();
  }*/

  @Post('/answers')
  async createAnswer(@Body() dto: CreateAnswerDto): Promise<AnswerDto> {
    return this.answerService.create(dto);
  }

  @Put('/answers/:id')
  async updateAnswer(
    @Param('id') id: string,
    @Body() dto: UpdateAnswerDto
  ): Promise<AnswerDto> {
    return this.answerService.update(id, dto);
  }

  @Delete('/answers/:id')
  async deleteAnswer(@Param('id') id: string): Promise<void> {
    return this.answerService.delete(id);
  }
}
