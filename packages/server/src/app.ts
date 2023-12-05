import path from 'path';

import bodyParser from 'body-parser';
import express from 'express';
import lusca from 'lusca';
import mongoose from 'mongoose';

import * as photosController from './controllers/photos';
import { MONGODB_URI, PORT } from './env';
import { logger, middleware } from './logger';

mongoose
    .connect(MONGODB_URI, {})
    .then(() => {
        logger.info('db');
    })
    .catch(err => {
        logger.error('db', err);
        process.exit();
    });

const app = express();
app.set('port', PORT);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(lusca.xframe('SAMEORIGIN'));
app.use(lusca.xssProtection(true));
const publicPath = path.join(__dirname, 'public');
app.use(express.static(publicPath, { maxAge: 31557600000 }));
app.use(middleware);

app.get('/photos', photosController.getPhotos);

export default app;
