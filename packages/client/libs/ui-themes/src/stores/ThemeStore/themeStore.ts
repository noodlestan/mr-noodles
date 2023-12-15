import { Accessor } from 'solid-js';

import { themesStore } from '../../private/stores/themesStore';
import { Theme } from '../../types';

type ThemeStore = {
    theme: Accessor<Theme>;
    setTheme: (name: string) => void;
};

const { theme, setTheme } = themesStore;

export const themeStore: ThemeStore = {
    theme,
    setTheme,
};
