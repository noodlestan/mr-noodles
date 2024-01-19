// import type { queryToParams } from '@noodlestan/shared-types';
import { NextFunction, Request, Response } from 'express';

export const notFoundHandler = (req: Request, res: Response, next: NextFunction): void => {
    try {
        // console.log(queryToParams(req.query));
        const error = {
            reason: 'Resource not found ;-)',
        };
        res.status(404).json(error);
    } catch (error) {
        next(error);
    }
};

export const unprocessableHandler = (
    req: Request,
    res: Response,
    next: NextFunction,
    reason?: string,
): void => {
    try {
        const error = {
            reason: reason || 'Unprocessable :-(',
        };
        res.status(422).json(error);
    } catch (error) {
        next(error);
    }
};

export const exceptionHandler = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction,
): void => {
    res.locals.logger.error('http:error', { ...err, reason: err.message, stack: err.stack });

    const error = {
        id: res.locals.id,
        reason: 'Unhandled error. Sorry :-/',
    };

    if (res.headersSent) {
        return next(error);
    }

    res.status(500).send(error);
};
