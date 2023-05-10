import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateAnswerDto {
  @ApiProperty({
    description: 'The content of the answer',
    example: 'You can solve this by...',
    required: true,
  })
  @IsString()
  content: string;

  @ApiProperty({
    description: 'The UUID of the question corresponding to the current answer',
    required: true,
  })
  parentId: string;

  @ApiProperty({
    description: 'The UUID of the author(user) of the answer',
    required: true,
  })
  postedBy: string;
}
