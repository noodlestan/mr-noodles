import { TokenMap } from '@noodlestan/ui-tokens';

type SurfaceTokenMap = {
    [key: string]: TokenMap;
};

export type ColourSchemeName = 'dark' | 'light';

export type Theme = {
    name: string;
    extends: string[];
    mode: ColourSchemeName;
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
