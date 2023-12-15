/* eslint-disable import/no-extraneous-dependencies */
import { resolve } from 'path';

import typescript from '@rollup/plugin-typescript';
import type { UserConfig } from 'vite';
import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';
import SolidSVG from 'vite-plugin-solid-svg';

export const makeViteConfig = (dir: string, libName: string): UserConfig => {
    return defineConfig({
        plugins: [
            typescript({
                target: 'es2020',
                rootDir: resolve(dir, 'src'),
                declaration: true,
                declarationDir: resolve(dir, 'dist'),
                exclude: resolve(dir, 'node_modules/**'),
                allowSyntheticDefaultImports: true,
            }),
            solidPlugin(),
            SolidSVG(),
        ],
        resolve: {
            alias: [{ find: '@', replacement: resolve(dir, 'src') }],
        },
        server: {
            port: 3000,
        },
        build: {
            target: 'esnext',
            lib: {
                entry: resolve(dir, 'src/index.ts'),
                name: libName,
                fileName: 'index',
            },
            rollupOptions: {
                external: ['tone'],
                output: {
                    globals: {
                        tone: 'Tone',
                    },
                },
            },
        },
    });
};
