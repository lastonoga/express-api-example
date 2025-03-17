import { createServer } from 'express-zod-api';
import { routing } from '@/app/routes/index.js';
import { config } from '@/config/server.js';

createServer(config, routing);
