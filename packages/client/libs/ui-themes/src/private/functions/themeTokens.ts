import type { TokenMap } from '@noodlestan/ui-tokens/src/types';

import type { Theme, ThemeDarkMode } from '../../types';
import { themesStore } from '../stores/themesStore';

export const themeTokens = (theme: Theme, mode: ThemeDarkMode): TokenMap => {
    const { findTheme } = themesStore;

    const extendedThemes = theme.extends.reduce((acc, themeName) => {
        return { ...acc, ...themeTokens(findTheme(themeName), mode) };
    }, {});

    const baseTokens = theme.tokens.base.global;
    const invertTokens = theme.mode !== mode ? theme.tokens.invert.global : {};

    return { ...extendedThemes, ...baseTokens, ...invertTokens };
};
