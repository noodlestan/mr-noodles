import { closeSync, openSync, utimesSync } from 'fs';

import { NextFunction, Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import winston, { format } from 'winston';
import * as Transport from 'winston-transport';

import { LOG_FILE, NODE_ENV } from '../env';

type LogData = Record<string, number | string | boolean>;

type LogSeverity = 'debug' | 'info' | 'warn' | 'error';
const Severities: LogSeverity[] = ['debug', 'info', 'warn', 'error'];
const severityMap: Record<number, LogSeverity> = {
    200: 'info',
    201: 'info',
    204: 'info',
    300: 'info',
    400: 'warn',
    401: 'warn',
    403: 'warn',
    404: 'warn',
    500: 'error',
};

const mapSeverity = (res: Response) => {
    return severityMap[res.statusCode];
};

const level: LogSeverity = NODE_ENV === 'production' ? 'info' : 'debug';
const transports: Transport[] = [];
const formatting = winston.format.combine(format.timestamp(), format.json());

if (NODE_ENV === 'production') {
    if (!LOG_FILE) {
        throw new Error('process.env.LOG_FILE is not set');
    }
    try {
        utimesSync(LOG_FILE, new Date(), new Date());
    } catch (err) {
        closeSync(openSync(LOG_FILE, 'w'));
    }
    transports.push(new winston.transports.File({ filename: LOG_FILE, level }));
} else {
    transports.push(new winston.transports.Console({ level }));
}
const logger = winston.createLogger({ format: formatting, transports });
logger.info('logger', { level });

const middleware = (req: Request, res: Response, next: NextFunction): void => {
    res.locals.id = uuidv4();
    res.locals.logger = {};
    for (const severity of Severities) {
        res.locals.logger[severity] = (message: string, data: LogData = {}) => {
            const logData = { id: res.locals.id, ...data };
            logger[severity](message, logData);
        };
    }

    res.locals.timing = Date.now();
    const reqData = { id: res.locals.id, method: req.method, path: req.path };
    res.locals.logger.debug('http:request', reqData);

    const handleResponse = () => {
        const severity = mapSeverity(res) || 'error';
        const elapsed = Date.now() - res.locals.timing;
        const resData = { ...reqData, elapsed, code: res.statusCode };
        res.locals.logger[severity]('http:response', resData);
    };

    res.on('finish', handleResponse);
    next();
};

export { logger, middleware };
