import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRole } from '../../users/model/user-role';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { UsersService } from '../../users/users.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private usersService: UsersService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()]
    );
    if (!requiredRoles) {
      return true;
    }

    const httpContext = context.switchToHttp();
    if (!httpContext) {
      throw new UnauthorizedException('HTTP context is not available');
    }

    const request = httpContext.getRequest();
    if (!request) {
      throw new UnauthorizedException('Request is not available');
    }

    const email = request.user.email;
    if (!email) {
      throw new UnauthorizedException('Email could not be found');
    }

    const user = await this.usersService.getUserByEmail(email);
    return requiredRoles.some((role) => user?.roles?.includes(role));
  }
}
