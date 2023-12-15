import { ServiceInitializer } from 'solid-services';
import { beforeEach, describe, expect, it } from 'vitest';

import { getMock, resetMocks } from '../private/registry';

import { mock } from './mock';

type Service = {
    foo: () => string;
};

const Factory: ServiceInitializer<Service> = () => ({
    foo: () => 'original',
});

const mockInstance: Service = { foo: () => 'mocked' };

describe('mock', () => {
    beforeEach(() => {
        resetMocks();
    });

    describe('mock', () => {
        it('should store the mock', () => {
            mock(Factory, mockInstance);
            const actual = getMock(Factory);
            expect(actual).toBe(mockInstance);
        });
    });
});
