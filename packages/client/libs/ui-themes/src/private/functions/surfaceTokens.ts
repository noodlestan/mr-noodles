import type { TokenMap } from '@noodlestan/ui-tokens/src/types';

import type { ColourSchemeName, Surface, Theme } from '../../types';
import { surfacesStore } from '../stores/surfacesStore';
import { themesStore } from '../stores/themesStore';

export const surfaceTokens = (theme: Theme, surface: Surface, mode: ColourSchemeName): TokenMap => {
    const { findTheme } = themesStore;
    const { findSurface } = surfacesStore;

    const extendedThemes = theme.extends.reduce((acc, themeName) => {
        return {
            ...acc,
            ...surfaceTokens(findTheme(themeName), surface, mode),
        };
    }, {});

    const extendedSurfaces = surface.extends.reduce((acc, surfaceName) => {
        return {
            ...acc,
            ...surfaceTokens(theme, findSurface(surfaceName), mode),
        };
    }, {});

    const baseTokens = theme.tokens.base.surfaces[surface.name];
    const invertTokens = theme.mode !== mode ? theme.tokens.invert.surfaces[surface.name] : {};

    return {
        ...extendedThemes,
        ...extendedSurfaces,
        ...baseTokens,
        ...invertTokens,
    };
};
