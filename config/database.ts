import { Prisma, PrismaClient, Role } from '@prisma/client'

export const prisma = new PrismaClient()

export const role = Role
