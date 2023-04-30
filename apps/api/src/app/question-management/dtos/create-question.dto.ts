import { ApiProperty } from '@nestjs/swagger';
import { QuestionTopic } from '../model/question-topic';

export class CreateQuestionDto {
  @ApiProperty({
    description: 'The title of the question',
    example: 'Why am I here?',
    required: true,
  })
  title: string;

  @ApiProperty({
    description: 'The content of the question',
    example: 'Idk',
    required: true,
  })
  content: string;

  @ApiProperty({
    description: 'The topic of the question',
    enum: QuestionTopic,
    example: QuestionTopic.JavaScript,
    required: true,
  })
  topic: QuestionTopic;
}
