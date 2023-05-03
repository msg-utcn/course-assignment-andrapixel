import { ApiProperty } from '@nestjs/swagger';
import {IsBoolean, IsEmail, IsNotEmpty, IsString} from "class-validator";

export class RegisterUserDto {
  @ApiProperty({
    description: 'The full name of the user',
    example: 'Andra Ilovan',
    required: true,
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'The email address of the user',
    example: 'andrailovan@gmail.com',
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

  @ApiProperty({
    description: 'A property that states whether the user has the administrator role or not',
    example: 'true/false',
    required: true,
  })
  @IsBoolean()
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
