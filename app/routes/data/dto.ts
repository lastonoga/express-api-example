import { z } from 'zod';

export const dataInputDto = z.object({
    city: z.string().example('London'),
    currency: z.string().example('bitcoin'),
    refresh: z
        .enum(['true', 'false'])
        .optional()
        .transform((value) => Boolean(value))
});

export const dataOutputDto = z.object({
    city: z.string().example('London'),
    temperature: z.string().example('15C'),
    weather: z.string().example('Cloudy'),
    crypto: z.object({
        name: z.string().example('name'),
        price_usd: z.number().example(1234)
    })
});
