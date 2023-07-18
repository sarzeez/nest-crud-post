import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorator/roles.decorator';
import { Role } from '@/features/user/entity/user.entity';
import { JwtPayload } from '@/features/user/type/user.type';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }
    const req = await context.switchToHttp().getRequest();
    const user: undefined | JwtPayload = req.user;
    if (!user) {
      return false;
    }
    return requiredRoles.includes(user.role);
  }
}
