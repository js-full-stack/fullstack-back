import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Role } from 'src/utils/constants';
import { ROLES_KEY } from '../roles-auth.decorator';
ROLES_KEY;
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    try {
      const requiredRoles = this.reflector.getAllAndOverride<string[]>(
        ROLES_KEY,
        [context.getHandler(), context.getClass()],
      );
      if (!requiredRoles) {
        return true;
      }
      const req = context.switchToHttp().getRequest();
      // const authHeader = req.headers.authorization;
      // const bearer = authHeader.split(' ')[0];
      // const token = authHeader.split()[1];

      console.log(req.body);
      // return requiredRoles.some((userRole) =>
      // req.role.role?.includes(userRole),
      // );
    } catch (error) {
      console.log(error);
    }
  }
}