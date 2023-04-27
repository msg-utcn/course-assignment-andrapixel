import {Body, Controller, Delete, Get, Param, Patch, Post, UseGuards} from '@nestjs/common';
import { QuestionDto } from './dtos/question.dto';
import {QuestionService} from "./question.service";
import {CreateQuestionDto} from "./dtos/create-question.dto";
import {UpdateQuestionDto} from "./dtos/update-question.dto";
import {QuestionManagementConfig} from "./question-management.config";
import {ApiBearerAuth, ApiTags} from "@nestjs/swagger";
import {JwtAuthGuard} from "../auth/guards/jwt-auth.guard";

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags(QuestionManagementConfig.SWAGGER_FEATURE)
@Controller(QuestionManagementConfig.API_ROUTE)
export class QuestionManagementController {
  constructor(
    private questionService: QuestionService
  ) {}

  @UseGuards(JwtAuthGuard)
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
    @Body() dto: UpdateQuestionDto): Promise<QuestionDto> {
    return this.questionService.update(id, dto);
  }

  @Delete(':id')
  async deleteQuestion(
    @Param('id') id: string,
    @Body() dto: UpdateQuestionDto): Promise<void> {
    return this.questionService.delete(id);
  }
}
