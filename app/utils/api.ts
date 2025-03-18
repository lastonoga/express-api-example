/* eslint-disable  @typescript-eslint/no-explicit-any */
import { BuiltinLogger } from "express-zod-api";

import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import NodeCache from 'node-cache';
import createHttpError from 'http-errors';

// console.log(BuiltinLogger)
// Initialize cache with 5-minute TTL
const cache = new NodeCache({ stdTTL: 300 });

/**
 * Generic function to make API calls with error handling, retries, and caching.
 *
 * @param url - API endpoint
 * @param config - Axios request config (optional)
 * @param retries - Number of retries (default: 3)
 * @param forceRefresh - If true, bypass cache (default: false)
 * @returns API response data
 */
export async function fetchWithRetry<T>(
    url: string,
    config: AxiosRequestConfig = {},
    retries: number = 3,
    forceRefresh: boolean = false
): Promise<T> {
    const cacheKey = JSON.stringify({ url, config });

    // Return cached response unless forceRefresh is true
    if (!forceRefresh) {
        const cachedData = cache.get<T>(cacheKey);
        if (cachedData) {
            return cachedData;
        }
    }

    let attempt = 0;
    while (attempt < retries) {
        try {
            const response: AxiosResponse<T> = await axios(url, config);
            // Check for valid API response
            if (response.status >= 200 && response.status < 300) {
                cache.set(cacheKey, response.data); // Cache the response
                return response.data;
            }

            throw createHttpError(
                response.status,
                `Message: ${JSON.stringify(response.data)}`
            );
        } catch (error: any) {
            attempt++;
            if (error.response?.status === 429 && attempt < retries) {
                const retryAfter = error.response.headers['retry-after']
                    ? parseInt(error.response.headers['retry-after'], 10) * 1000
                    : 1000;
                await new Promise((resolve) => setTimeout(resolve, retryAfter));
            } else if (error.response?.status == 404) {
                throw createHttpError(404, 'There is no such entity');
            } else if (attempt >= retries) {
                throw createHttpError(429, 'Too Many Requests');
            }
        }
    }

    throw createHttpError(500, 'Unexpected API failure'); // Should never reach here
}
