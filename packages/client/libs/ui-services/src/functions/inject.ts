import { Service, ServiceInitializer, useService } from 'solid-services';

import { getMock } from '../private/registry';

export function inject<T extends Service>(factory: ServiceInitializer<T>): T {
    const mocked = getMock(factory);
    return mocked ?? useService(factory)();
}
