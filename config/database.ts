import { Prisma, PrismaClient } from '@prisma/client';
import { Role } from '@prisma/client';
import type { User } from '@prisma/client';

export const prisma = new PrismaClient();

export { User, Role, Prisma };
