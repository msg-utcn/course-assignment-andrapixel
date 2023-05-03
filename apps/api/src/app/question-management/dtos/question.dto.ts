import { QuestionTopic } from '../model/question-topic';
import {ApiProperty} from "@nestjs/swagger";
import {IsEnum, IsInt, IsString, IsUUID, Max, Min} from "class-validator";

export class QuestionDto {
  @ApiProperty({
    description: 'The UUID of the question',
    example: '5b5b7bc8-e91d-11ed-a05b-0242ac120003',
    required: false,
  })
  @IsUUID()
  id?: string;

  @ApiProperty({
    description: 'The title of the question',
    example: '404 This page could not be found',
    required: true,
  })
  @IsString()
  title: string;

  @ApiProperty({
    description: 'The author of the question',
    required: true,
  })
  @IsString()
  postedBy: string;

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

  @ApiProperty({
    description: 'The rating of the question',
    required: false,
  })
  @IsInt()
  @Min(0)
  @Max(10)
  rating: number;

  @ApiProperty({
    description: 'The ISO question creation date in UTC',
    required: false,
  })
  @IsString()
  creationDate: string;

  constructor(values: Partial<QuestionDto>) {
    if (values) {
      this.id = values.id;
      this.title = values.title;
      this.postedBy = values.postedBy;
      this.content = values.content;
      this.topic = values.topic;
      this.rating = values.rating;
      this.creationDate = values.creationDate;
    }
  }
}
