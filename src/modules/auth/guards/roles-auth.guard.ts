import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/modules/users/user.entity';
import { UserService } from 'src/modules/users/user.service';
import { userRoles } from 'src/utils/constants';
import { ROLES_KEY } from 'src/utils/roles.decorator';
import { Connection, Repository } from 'typeorm';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext) {
    try {
      const requiredRoles = this.reflector.getAllAndOverride<userRoles[]>(
        ROLES_KEY,
        [context.getHandler(), context.getClass()],
      );
      if (!requiredRoles) {
        return true;
      }
      const req = context.switchToHttp().getRequest();

      return requiredRoles.some((roles) => req.user.role.role?.includes(roles));
    } catch (error) {
      console.log(error);
    }
  }
}
