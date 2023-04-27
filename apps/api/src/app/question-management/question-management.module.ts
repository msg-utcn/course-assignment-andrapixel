import { Module } from '@nestjs/common';
import { QuestionManagementController } from './question-management.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionModel } from './model/question.model';
import {QuestionService} from "./question.service";

@Module({
  imports: [TypeOrmModule.forFeature([QuestionModel])],
  controllers: [QuestionManagementController],
  providers: [QuestionService],
})
export class QuestionManagementModule {}
