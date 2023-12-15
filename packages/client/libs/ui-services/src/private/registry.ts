import { Service, ServiceInitializer } from 'solid-services';

export type Mock<T extends Service> = [ServiceInitializer<T>, T];
export type CleanupFunction = VoidFunction;

const mocks: Mock<Service>[] = [];
const MOCK_INSTANCE = 1;

export function addMock<T extends Service>(
    factory: ServiceInitializer<T>,
    mock: T,
): CleanupFunction {
    const found = mocks.find(([fn]) => factory === fn);
    if (found) {
        found[MOCK_INSTANCE] = mock;
    } else {
        mocks.push([factory, mock]);
    }

    const cleanup = () => {
        const index = mocks.findIndex(([fn]) => factory === fn);
        mocks.splice(index, 1);
    };

    return cleanup;
}

export function getMock<T extends Service>(factory: ServiceInitializer<T>): T | undefined {
    const found = mocks.find(([fn]) => factory === fn);
    if (found) {
        return found[MOCK_INSTANCE] as T;
    }
    return undefined;
}

export function resetMocks(): void {
    mocks.splice(0, mocks.length);
}
