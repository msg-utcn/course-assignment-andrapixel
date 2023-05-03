import { ApiProperty } from '@nestjs/swagger';

export class RegisterUserDto {
  @ApiProperty({
    description: 'The name of the user',
    example: 'Andra Ilovan',
    required: true,
  })
  name: string;

  @ApiProperty({
    description: 'The email address of the user',
    example: 'andrailovan@gmail.com',
    required: true,
  })
  email: string;

  @ApiProperty({
    description: 'The password of the user',
    example: 'pass_w0rd123',
    required: true,
  })
  password: string;

  @ApiProperty({
    description: 'A property that states whether the user is an admin or not',
    example: 'true/false',
    required: true,
  })
  isAdmin: boolean;

  constructor(values: Partial<RegisterUserDto>) {
    if (values) {
      this.name = values.name;
      this.email = values.email;
      this.password = values.password;
      this.isAdmin = values.isAdmin;
    }
  }
}
