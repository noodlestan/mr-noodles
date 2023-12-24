import { Component, JSX, createContext, splitProps, useContext } from 'solid-js';
import { Dynamic } from 'solid-js/web';

import { ThemesError } from '../../errors';
import { surfaceClassList } from '../../private/functions/surfaceClassList';
import { themeClassList } from '../../private/functions/themeClassList';
import { ThemeTokensProvider } from '../../private/providers/ThemeTokensProvider';
import { themesStore } from '../../private/stores/themesStore';
import { Theme } from '../../types';

type ThemeContextState = { theme: () => Theme };

export const ThemeContext = createContext<ThemeContextState>();

export const useThemeContext = (): ThemeContextState => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new ThemesError(`No ThemeContext found`);
    }
    return context;
};

type ThemeProviderProps = {
    theme: string;
    tag?: string;
    shallow?: boolean;
    classList?: { [key: string]: boolean };
    children?: JSX.Element;
};

const defaultProps: Pick<ThemeProviderProps, 'tag'> = {
    tag: 'div',
};

const ThemeProviderBase: Component<Omit<ThemeProviderProps, 'theme'>> = props => {
    const [local, rest] = splitProps(props, ['children', 'classList', 'tag']);

    const tag = () => props.tag || defaultProps.tag;

    const classList = () => ({
        ...local.classList,
        ...themeClassList(),
        ...surfaceClassList(),
    });

    return (
        <Dynamic {...rest} component={tag()} classList={classList()}>
            <ThemeTokensProvider>{props.children}</ThemeTokensProvider>
        </Dynamic>
    );
};

export const ThemeProvider: Component<ThemeProviderProps> = props => {
    const [local, rest] = splitProps(props, ['theme']);

    const { findTheme } = themesStore;

    const value = () => ({ theme: () => findTheme(local.theme) });

    return (
        <ThemeContext.Provider value={value()}>
            {props.shallow ? props.children : <ThemeProviderBase {...rest} />}
        </ThemeContext.Provider>
    );
};
