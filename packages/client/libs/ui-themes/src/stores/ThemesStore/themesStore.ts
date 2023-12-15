import { themesStore as privateStore } from '../../private/stores/themesStore';
import { Theme } from '../../types';

type ThemesStore = {
    registerTheme: (theme: Theme) => void;
};

const { registerTheme } = privateStore;

export const themesStore: ThemesStore = {
    registerTheme,
};
