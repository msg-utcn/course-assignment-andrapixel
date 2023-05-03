import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginUserDto {
  @ApiProperty({
    description: 'The email address of the user',
    example: 'andrailo02@gmail.com',
    required: true,
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'The password of the user',
    example: 'pass_w0rd123',
    required: true,
  })
  @IsNotEmpty()
  password: string;

  constructor(values: Partial<LoginUserDto>) {
    if (values) {
      this.email = values.email;
      this.password = values.password;
    }
  }
}
