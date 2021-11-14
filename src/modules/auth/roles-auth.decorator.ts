import { SetMetadata } from '@nestjs/common';
import { Role } from 'src/utils/constants';

export const ROLES_KEY = 'role';
export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);