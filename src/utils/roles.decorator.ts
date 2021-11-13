import { SetMetadata } from '@nestjs/common';
import { userRoles } from './constants';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: userRoles[]) => SetMetadata(ROLES_KEY, roles);
