import type { StringValue } from 'ms';
import type { BuiltinLogger } from 'express-zod-api'
import 'dotenv/config'

export const JWT_SECRET_TOKEN: string = process.env.JWT_SECRET_TOKEN ?? 'test';
export const JWT_TOKEN_EXPIRE: StringValue = (process.env.JWT_TOKEN_EXPIRE ??
    '24h') as StringValue;
export const OPENWEATHER_API_TOKEN: string =
    process.env.OPENWEATHER_API_TOKEN ?? 'fa2e0d88d9e097d1dd03c14b8bf02437';
export const API_URL: string = process.env.API_URL ?? 'http://localhost:8090';
export const API_PORT: string = process.env.API_PORT ?? '1234';
export const NODE_ENV: string = process.env.NODE_ENV ?? 'development';
export const LOG_LEVEL: string = process.env.LOG_LEVEL ?? (NODE_ENV == 'production' ? 'info' : 'debug')