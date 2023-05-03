import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdateQuestionDto {
  @ApiProperty({
    description: 'The title of the question',
    example: '404 This page could not be found',
    required: true,
  })
  @IsString()
  title: string;

  @ApiProperty({
    description: 'The content of the question',
    example: 'I encountered this problem when...',
    required: true,
  })
  @IsString()
  content: string;
}
