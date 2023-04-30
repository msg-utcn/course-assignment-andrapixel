import { UserRole } from '../model/user-role';
import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty({
    description: 'The id(uuid) of the user',
    required: true,
  })
  id?: string;

  @ApiProperty({
    description: 'The name of the user',
    example: 'Andra Ilovan',
    required: true,
  })
  name: string;

  @ApiProperty({
    description: 'The email of the user',
    example: 'andrailo02@gmail.com',
    required: true,
  })
  email: string;

  @ApiProperty({
    description: 'The roles of the user',
    enum: UserRole,
    required: true,
    isArray: true,
  })
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
