import http from 'http';
import path from 'path';

import bodyParser from 'body-parser';
import express from 'express';
import lusca from 'lusca';

import { PORT } from './env';
import { logger, middleware } from './logger';
import { albumsRouter } from './routes/albums';
import { photosRouter } from './routes/photos';

const app = express();
app.set('port', PORT);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(lusca.xframe('SAMEORIGIN'));
app.use(lusca.xssProtection(true));
const publicPath = path.join(__dirname, 'public');
app.use(express.static(publicPath, { maxAge: 31557600000 }));
app.use(middleware);

app.use('/photos', photosRouter);
app.use('/albums', albumsRouter);

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
