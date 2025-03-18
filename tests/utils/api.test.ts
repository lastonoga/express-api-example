import AxiosMockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import { fetchWithRetry } from '@/app/utils/api.js';

let mockAxios: any;

describe('API Service Wrapper', () => {

    beforeEach(() => {
        mockAxios = new AxiosMockAdapter(axios as any);
    });

    afterEach(() => {
        mockAxios.restore();
    });

    const mockUrl = 'https://api.example.com/data';
    const mockResponseData = { message: 'Success' };

    it('should fetch data successfully on first attempt', async () => {
        mockAxios.onGet(mockUrl).reply(200, mockResponseData);
        const result = await fetchWithRetry(mockUrl, {}, 3, true);
        expect(result).toEqual(mockResponseData);
    });

    it('should retry on failure and eventually return a 404 error', async () => {
        mockAxios.onGet(mockUrl).reply(404);
        await expect(fetchWithRetry(mockUrl, {}, 2, true)).rejects.toThrow(
            expect.objectContaining({ message: 'There is no such entity', statusCode: 404 })
        );
    });

    it('should handle rate limiting (HTTP 429) and retry', async () => {
        mockAxios.onGet(mockUrl).replyOnce(429, {}, { 'retry-after': '1' });
        mockAxios.onGet(mockUrl).replyOnce(200, mockResponseData);
        const result = await fetchWithRetry(mockUrl, {}, 2, true);
        expect(result).toEqual(mockResponseData);
    });

    it('should throw a 429 error for unexpected failures', async () => {
        mockAxios.onGet(mockUrl).reply(500);
        await expect(fetchWithRetry(mockUrl, {}, 1, true)).rejects.toThrow(
            expect.objectContaining({ statusCode: 429 })
        );
    });
});
