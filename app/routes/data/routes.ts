import { unprotectedRouteFactory } from '@/config/routes.js';
import { dataInputDto, dataOutputDto } from './dto.js';
import {
    getWeatherService,
    getCryptoPriceService
} from '@/app/services/data.js';

export const getData = unprotectedRouteFactory.build({
    method: 'get',
    input: dataInputDto,
    output: dataOutputDto,
    handler: async ({ input: { city, currency, refresh = false } }) => {
        const weatherData = await getWeatherService(city, refresh);
        const cryptoData = await getCryptoPriceService(currency, refresh);
        return {
            ...weatherData,
            crypto: cryptoData
        };
    }
});

export default getData;
