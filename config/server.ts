import { createConfig } from 'express-zod-api';
// @ts-expect-error Bug
import ui from 'swagger-ui-express';
import { getSwaggerDocumentation } from './swagger.js';
import { limiter } from './rate-limiter.js';

export const config = createConfig({
    http: {
        listen: 8090 // port, UNIX socket or options
    },
    cors: true,
    compression: true,
    beforeRouting: ({ app, getLogger }) => {
        const logger = getLogger();
        logger.info(
            'Serving the API documentation at https://example.com/docs'
        );
        app.use('/docs', ui.serve, ui.setup(getSwaggerDocumentation()));
        app.use(limiter);
    }
});
