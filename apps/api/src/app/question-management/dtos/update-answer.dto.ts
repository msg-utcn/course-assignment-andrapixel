import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdateAnswerDto {
  @ApiProperty({
    description: 'The content of the answer',
    example: 'You can solve this by...',
    required: true,
  })
  @IsString()
  content: string;
}
