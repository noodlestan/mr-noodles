import { subscribe } from '../../events';
import { EVENT_SCAN_ERROR, EventScanError } from '../../events/scan';
import { log } from '../../logger';

import { scanNow } from './functions/scanNow';

const unsubscribeTo: Array<() => void> = [];

const subscribeToErrors = () => {
    const errorUnsub = subscribe(EVENT_SCAN_ERROR, (event: EventScanError) => {
        const error = {
            filename: event.filename,
            reason: event.error.message,
            stack: event.error.stack,
        };
        log().error('agent:scanner:error', error);
    });
    unsubscribeTo.push(errorUnsub);
};

const stopScanAgent = (): void => {
    unsubscribeTo.forEach(unsub => unsub());
};

const startScanAgent = (): void => {
    subscribeToErrors();
};

export { startScanAgent, scanNow, stopScanAgent };
