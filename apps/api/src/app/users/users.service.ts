import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserModel } from './model/user.model';
import { UserDto } from './dto/user.dto';
import { UsersMapper } from './mappers/users.mapper';
import { RegisterUserDto } from './dto/register-user.dto';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserModel)
    private userModelRepository: Repository<UserModel>
  ) {}

  async getUsers(): Promise<UserDto[]> {
    const foundModels = await this.userModelRepository.find();

    if (!foundModels) {
      return [];
    }

    return foundModels.map((model) => UsersMapper.mapToDto(model));
  }

  async getUserById(id: string): Promise<UserDto> {
    const foundModel = await this.userModelRepository.findOne({
      where: { id },
    });

    if (!foundModel) {
      throw new NotFoundException();
    }

    return UsersMapper.mapToDto(foundModel);
  }

  async getUserByEmail(email: string): Promise<UserDto> {
    const foundModel = await this.userModelRepository.findOne({
      where: { email: String(email) },
    });

    if (!foundModel) {
      throw new NotFoundException();
    }

    return UsersMapper.mapToDto(foundModel);
  }

  async registerUser(dto: RegisterUserDto): Promise<UserDto> {
    let hashedPassword = await bcrypt.hash(dto.password, 10);
    const dtoWithHashedPassword = {
      ...dto,
      password: hashedPassword,
    };
    const model = UsersMapper.mapCreateUserDtoToModel(dtoWithHashedPassword);

    try {
      const savedModel = await this.userModelRepository.save(model);
      return UsersMapper.mapToDto(savedModel);
    } catch (error) {
      Logger.log(error, 'UsersService.registerUser');
      throw new BadRequestException();
    }
  }

  async checkCredentials(loginUserDto: LoginUserDto): Promise<boolean> {
    const foundModel = await this.userModelRepository.findOneBy({
      email: loginUserDto.email,
    });

    if (!foundModel) {
      return false;
    }

    return bcrypt.compare(loginUserDto.password, foundModel.password);
  }

  async delete(id: string): Promise<boolean> {
    const deleteResult = await this.userModelRepository.delete({ id });

    if (deleteResult.affected === 0) {
      throw new BadRequestException();
    }

    return true;
  }
}
