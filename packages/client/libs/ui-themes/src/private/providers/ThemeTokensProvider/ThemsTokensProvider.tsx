import { DarkModeService } from '@noodlestan/ui-dark-mode';
import { inject } from '@noodlestan/ui-services';
import { TokensProvider } from '@noodlestan/ui-tokens';
import { Component, JSX, createMemo } from 'solid-js';

import { useSurfacesContext } from '../../../providers/SurfaceProvider';
import { useThemeContext } from '../../../providers/ThemeProvider';
import { surfaceTokens } from '../../functions/surfaceTokens';
import { themeTokens } from '../../functions/themeTokens';

type ThemeTokensProviderProps = {
    children?: JSX.Element;
};

export const ThemeTokensProvider: Component<ThemeTokensProviderProps> = props => {
    const { darkMode } = inject(DarkModeService);
    const { theme } = useThemeContext();
    const { surface } = useSurfacesContext();

    const themeDarkMode = () => (darkMode() ? 'dark' : 'light');

    const tokens = createMemo(() => {
        const mode = themeDarkMode();
        return {
            ...themeTokens(theme(), mode),
            ...surfaceTokens(theme(), surface(), mode),
        };
    });

    return <TokensProvider tokens={tokens()}>{props.children}</TokensProvider>;
};
