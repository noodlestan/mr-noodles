import app from './app';
import { logger } from './logger';

const server = app.listen(app.get('port'), () => {
    logger.info('server', { port: app.get('port'), env: app.get('env') });
});

export default server;
