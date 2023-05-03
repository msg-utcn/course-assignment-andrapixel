import { UserRole } from '../model/user-role';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsString, IsUUID } from 'class-validator';

export class UserDto {
  @ApiProperty({
    description: 'The UUID of the user',
    required: true,
  })
  @IsUUID()
  id?: string;

  @ApiProperty({
    description: 'The full name of the user',
    example: 'Andra Ilovan',
    required: true,
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'The email address of the user',
    example: 'andrailo02@gmail.com',
    required: true,
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'The roles of the user',
    enum: UserRole,
    required: true,
    isArray: true,
  })
  @IsEnum(UserRole)
  roles: UserRole[];

  constructor(values: Partial<UserDto>) {
    if (values) {
      this.id = values.id;
      this.name = values.name;
      this.email = values.email;
      this.roles = values.roles;
    }
  }
}
