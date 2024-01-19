import { API_BASE_URL } from '@/env';

export const API_ENDPOINTS = {
    files: (): string => API_BASE_URL + `/files`,
    folders: (): string => API_BASE_URL + `/folders`,
    users: (): string => API_BASE_URL + `/users`,
    userRoots: (id: string): string => API_BASE_URL + `/users/${id}/roots`,
    userRoot: (id: string, root: string): string => API_BASE_URL + `/users/${id}/roots/${root}`,
};
