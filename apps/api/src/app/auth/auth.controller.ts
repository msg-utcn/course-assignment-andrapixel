import {AuthConfig} from "./auth.config";
import {Body, Controller, Post, Request, UseGuards} from "@nestjs/common";
import {ApiBody, ApiOkResponse, ApiTags} from "@nestjs/swagger";
import {AuthService} from "./auth.service";
import {LoginUserDto} from "../users/dto/login-user.dto";
import {JwtTokenDto} from "./dto/jwt-token.dto";
import {RegisterUserDto} from "../users/dto/register-user.dto";
import {UserDto} from "../users/dto/user.dto";
import {UsersService} from "../users/users.service";
import {LocalAuthGuard} from "./guards/local-auth.guard";


@ApiTags(AuthConfig.SWAGGER_FEATURE)
@Controller(AuthConfig.API_ROUTE)
export class AuthController {

  constructor(private authService: AuthService, private usersService: UsersService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiOkResponse({
    description: 'The Jwt Access Token',
    type: JwtTokenDto,
  })
  @ApiBody({
    description: 'The Jwt Access Token',
    type: LoginUserDto})
  async login(@Request() req): Promise<JwtTokenDto> {
    return this.authService.login(req.user);
  }

  @Post('register')
  async registerUser(@Body() dto: RegisterUserDto): Promise<UserDto> {
    return this.usersService.registerUser(dto);
  }
}
