import type { APIResponse } from '@noodlestan/shared-types';
import { Resource } from 'solid-js';

type APIResourceActions<T, R = unknown> = {
    mutate: (mutator: (data: T) => T) => void;
    refetch: (info?: R) => APIResponse<T> | Promise<APIResponse<T> | undefined> | undefined | null;
};

export type APIResourceReturn<T, R = unknown> = [
    Resource<APIResponse<T>>,
    APIResourceActions<T | undefined, R>,
];
