import { Service, ServiceInitializer } from 'solid-services';

import { CleanupFunction, addMock } from '../private/registry';

export function mock<T extends Service>(factory: ServiceInitializer<T>, mock: T): CleanupFunction {
    return addMock(factory, mock);
}
