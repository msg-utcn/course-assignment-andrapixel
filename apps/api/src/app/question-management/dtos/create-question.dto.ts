import { ApiProperty } from '@nestjs/swagger';
import { QuestionTopic } from '../model/question-topic';
import {IsEnum, IsString} from "class-validator";

export class CreateQuestionDto {
  @ApiProperty({
    description: 'The title of the question',
    example: '404 This page could not be found',
    required: true,
  })
  @IsString()
  title: string;

  @ApiProperty({
    description: 'The content of the question',
    example: 'I am learning javascript and I got this error when trying to...',
    required: true,
  })
  @IsString()
  content: string;

  @ApiProperty({
    description: 'The topic of the question',
    enum: QuestionTopic,
    example: QuestionTopic.JavaScript,
    required: true,
  })
  @IsEnum(QuestionTopic)
  topic: QuestionTopic;
}
