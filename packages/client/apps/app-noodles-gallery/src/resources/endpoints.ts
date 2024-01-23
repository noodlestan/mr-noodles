import { API_BASE_URL } from '@/env';

const url = (path: string) => API_BASE_URL + path;

export const API_ENDPOINTS = {
    files: (): string => url(`/files`),
    fileImage: (id: string, profile: string): string => url(`/files/${id}/img?p=${profile}`),
    folders: (): string => url(`/folders`),
    folderImage: (id: string, profile: string): string => url(`/folders/${id}/img?p=${profile}`),
    users: (): string => url(`/users`),
    userImage: (id: string, profile: string): string => url(`/users/${id}/img?p=${profile}`),
    userRoots: (id: string): string => url(`/users/${id}/roots`),
    userRoot: (id: string, root: string): string => url(`/users/${id}/roots/${root}`),
};
