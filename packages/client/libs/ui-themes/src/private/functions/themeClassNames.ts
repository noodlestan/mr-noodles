import { useThemeContext } from '../../providers/ThemeProvider';
import type { Theme } from '../../types';
import { themesStore } from '../stores/themesStore';

const themeNames = (theme: Theme): string[] => {
    const { findTheme } = themesStore;

    return [theme.name, ...theme.extends.flatMap(t => themeNames(findTheme(t)))];
};

export const themeClassNames = (): string[] => {
    const { theme } = useThemeContext();

    return ['Theme', ...themeNames(theme()).map(t => `Theme--${t}`)];
};
