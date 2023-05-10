import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, IsUUID, Max, Min } from 'class-validator';

export class AnswerDto {
  @ApiProperty({
    description: 'The UUID of the answer',
    example: '5b5b7bc8-e91d-11ed-a05b-0242ac120003',
    required: false,
  })
  @IsUUID()
  id?: string;

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

  @ApiProperty({
    description: 'The content of the answer',
    example: 'You can solve this by...',
    required: true,
  })
  @IsString()
  content: string;

  @ApiProperty({
    description: 'The rating of the answer - based on an average of votes',
    required: false,
  })
  @IsInt()
  @Min(0)
  @Max(10)
  rating?: number;

  @ApiProperty({
    description: 'The ISO answer creation date in UTC',
    required: false,
  })
  @IsString()
  creationDate?: string;

  constructor(values: Partial<AnswerDto>) {
    if (values) {
      this.id = values.id;
      this.parentId = values.parentId;
      this.postedBy = values.postedBy;
      this.content = values.content;
      this.rating = values.rating;
      this.creationDate = values.creationDate;
    }
  }
}
