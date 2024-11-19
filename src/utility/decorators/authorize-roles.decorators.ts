import { SetMetadata } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

export const AuthorizeRoles = (...roles: string[]) => SetMetadata('allowed', roles);