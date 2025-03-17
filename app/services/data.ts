import { fetchWithRetry } from '../utils/api.js';
import { OPENWEATHER_API_TOKEN } from '@/config/env.js';
import createHttpError from 'http-errors';

export async function getWeatherService(
    city: string,
    forceRefresh: boolean = false
) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${OPENWEATHER_API_TOKEN}&units=metric`;

    let data = await fetchWithRetry<{
        weather: { description: string }[];
        main: { temp: number };
    }>(url, {}, 3, forceRefresh);

    return {
        city,
        temperature: `${data.main.temp}°C`,
        weather: data.weather[0].description
    };
}

export async function getCryptoPriceService(
    currency: string,
    forceRefresh: boolean = false
) {
    const url = `https://api.coingecko.com/api/v3/simple/price?ids=${currency}&vs_currencies=usd`;

    const data = await fetchWithRetry<Record<string, { usd: number }>>(
        url,
        {},
        3,
        forceRefresh
    );

    if (!data[currency]) {
        throw createHttpError(404, 'There is no such currency');
    }

    return {
        name: currency.charAt(0).toUpperCase() + currency.slice(1),
        price_usd: data[currency]?.usd ?? 'Unknown'
    };
}
