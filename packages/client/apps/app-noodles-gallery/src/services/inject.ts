import { Service, ServiceInitializer, useService } from 'solid-services';

export function inject<T extends Service>(factory: ServiceInitializer<T>): T {
    return useService(factory)();
}
