import { RegisterUserDto } from '../dto/register-user.dto';
import { UserModel } from '../model/user.model';
import { UserDto } from '../dto/user.dto';
import { UserRole } from '../model/user-role';

export class UsersMapper {
  static mapCreateUserDtoToModel(dto: RegisterUserDto): UserModel {
    const roles = [UserRole.USER];
    if (dto.isAdmin === true) {
      roles.push(UserRole.ADMIN);
    }

    return new UserModel({
      id: undefined,
      name: dto.name,
      email: dto.email,
      password: dto.password,
      roles: roles,
    });
  }

  static mapToDto(model: UserModel): UserDto {
    return new UserDto({
      id: model.id,
      name: model.name,
      email: model.email,
      roles: model.roles,
    });
  }
}
