import http from 'http';

import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import lusca from 'lusca';

import { API_PORT, PUBLIC_ASSETS_DIR } from '../env';
import { logger, middleware as loggerMiddleware } from '../logger';

import { albumsRouter } from './routes/albums';
import { photosRouter } from './routes/photos';
import { exceptionHandler, notFoundHandler } from './routes/responses';

const app = express();
app.set('port', API_PORT);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(lusca.xframe('SAMEORIGIN'));
app.use(lusca.xssProtection(true));
app.use('/assets', express.static(PUBLIC_ASSETS_DIR, { maxAge: 31557600000 }));
app.use(loggerMiddleware);
app.use(cors());

app.use('/photos', photosRouter);
app.use('/albums', albumsRouter);

app.use(notFoundHandler);
app.use(exceptionHandler);

const server = http.createServer(app);

const start = async (): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
        server.listen(app.get('port'), () => {
            logger.info('server', { port: app.get('port'), env: app.get('env') });
            resolve();
        });

        server.on('error', reject);
    });
};

export { start };
