import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Controller, Delete, Get, Param, UseGuards } from '@nestjs/common';
import { UsersConfig } from './users.config';
import { UsersService } from './users.service';
import { UserDto } from './dto/user.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags(UsersConfig.SWAGGER_FEATURE)
@Controller(UsersConfig.API_ROUTE)
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  async getUsers(): Promise<UserDto[]> {
    return this.usersService.getUsers();
  }

  @Get(':id')
  async getUserById(@Param('id') id: string): Promise<UserDto> {
    return this.usersService.getUserById(id);
  }

  @Get(':email')
  async getUserByEmail(@Param('email') email: string): Promise<UserDto> {
    return this.usersService.getUserByEmail(email);
  }

  @Delete(':id')
  async deleteUserById(@Param('id') id: string): Promise<boolean> {
    return this.usersService.deleteAll(id);
  }
}
