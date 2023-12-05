import { Request, Response } from 'express';

export const getPhotos = (req: Request, res: Response): void => {
    res.locals.logger.info('hey there!');

    res.json({
        title: 'API Examples',
        fresh: res.locals.id,
    });
};
