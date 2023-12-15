import { Component, JSX, createEffect } from 'solid-js';

import { SurfaceProvider } from '../../providers/SurfaceProvider';
import { ThemeProvider } from '../../providers/ThemeProvider';
import { ThemeTokensProvider } from '../../providers/ThemeTokensProvider';
import { surfaceClassNames } from '../functions/surfaceClassNames';
import { themeClassNames } from '../functions/themeClassNames';
import { surfacesStore } from '../stores/surfacesStore';
import { themesStore } from '../stores/themesStore';

const isStickClassName = (className: string): boolean =>
    className.startsWith('Theme--') || className.startsWith('Surface--');

type BaseProviderProps = {
    children?: JSX.Element;
};

const BaseProvider: Component<BaseProviderProps> = props => {
    const updateClassList = () => {
        const classNames = ['StickRoot', ...themeClassNames(), ...surfaceClassNames()];
        const currentClasses = Array(...document.body.classList);
        const toRemove = currentClasses.filter(isStickClassName);
        document.body.classList.remove(...toRemove);
        document.body.classList.add(...classNames);
    };

    createEffect(updateClassList);

    return <ThemeTokensProvider>{props.children}</ThemeTokensProvider>;
};

export type RootStyleProviderProps = {
    theme: string;
    surface: string;
    children?: JSX.Element;
};

export const RootStyleProvider: Component<RootStyleProviderProps> = props => {
    const { theme, setTheme } = themesStore;
    const { surface, setSurface } = surfacesStore;

    createEffect(() => {
        setTheme(props.theme);
        setSurface(props.surface);
    }, props);

    return (
        <ThemeProvider theme={theme().name} shallow>
            <SurfaceProvider surface={surface().name} shallow>
                <BaseProvider>{props.children}</BaseProvider>
            </SurfaceProvider>
        </ThemeProvider>
    );
};
