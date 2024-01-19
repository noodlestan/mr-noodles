import { Component, JSX, batch, createEffect } from 'solid-js';

import { colourSchemeClassNames } from '../../../private/functions/colourSchemeClassNames';
import { colourSchemeStore } from '../../../private/stores/colourSchemeStore';
import { ColourSchemeProvider } from '../../../providers/ColourSchemeProvider';
import { SurfaceProvider } from '../../../providers/SurfaceProvider';
import { ThemeProvider } from '../../../providers/ThemeProvider';
import { ColourSchemeName } from '../../../types';
import { surfaceClassNames } from '../../functions/surfaceClassNames';
import { themeClassNames } from '../../functions/themeClassNames';
import { surfacesStore } from '../../stores/surfacesStore';
import { themesStore } from '../../stores/themesStore';
import { ThemeTokensProvider } from '../ThemeTokensProvider';

const isStickClassName = (className: string): boolean =>
    className.startsWith('Theme--') || className.startsWith('Surface--');

type BaseProviderProps = {
    children?: JSX.Element;
};

const BaseProvider: Component<BaseProviderProps> = props => {
    const updateClassList = () => {
        const classNames = [
            'StickRoot',
            ...colourSchemeClassNames(),
            ...themeClassNames(),
            ...surfaceClassNames(),
        ];
        const currentClasses = Array(...document.body.classList);
        const toRemove = currentClasses.filter(isStickClassName);
        document.body.classList.remove(...toRemove);
        document.body.classList.add(...classNames);
    };

    createEffect(updateClassList);

    return <ThemeTokensProvider>{props.children}</ThemeTokensProvider>;
};

export type ThemesStylesProviderProps = {
    colourScheme?: ColourSchemeName;
    theme: string;
    surface: string;
    children?: JSX.Element;
};

export const ThemesStylesProvider: Component<ThemesStylesProviderProps> = props => {
    const { setColourScheme } = colourSchemeStore;
    const { theme, setTheme } = themesStore;
    const { surface, setSurface } = surfacesStore;

    createEffect(() => {
        batch(() => {
            if (props.colourScheme) {
                setColourScheme(props.colourScheme);
            }
            setTheme(props.theme);
            setSurface(props.surface);
        });
    }, props);

    return (
        <ColourSchemeProvider>
            <ThemeProvider theme={theme().name} shallow>
                <SurfaceProvider surface={surface().name} shallow>
                    <BaseProvider>{props.children}</BaseProvider>
                </SurfaceProvider>
            </ThemeProvider>
        </ColourSchemeProvider>
    );
};
