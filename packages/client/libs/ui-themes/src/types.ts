import { TokenMap } from '@noodlestan/ui-tokens';

type SurfaceTokenMap = {
    [key: string]: TokenMap;
};

export type ThemeDarkMode = 'light' | 'dark';

export type Theme = {
    name: string;
    extends: string[];
    mode: ThemeDarkMode;
    tokens: {
        base: {
            global: TokenMap;
            surfaces: SurfaceTokenMap;
        };
        invert: {
            global: TokenMap;
            surfaces: SurfaceTokenMap;
        };
    };
};

export type Surface = {
    name: string;
    extends: string[];
};
