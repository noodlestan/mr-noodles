/* eslint-disable import/no-extraneous-dependencies */
/// <reference types="vitest" />
/// <reference types="vite/client" />

import { resolve } from 'path';

import type { UserConfig } from 'vite';
import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';

export const makeVitestConfig = (dir: string): UserConfig => {
    return defineConfig({
        plugins: [solidPlugin()],
        server: {
            port: 3000,
        },
        build: {
            target: 'esnext',
        },
        test: {
            environment: 'jsdom',
            globals: true,
            transformMode: { web: [/\.[jt]sx?$/] },
            root: resolve(dir, '../../'),
        },
    });
};
