import { Component, JSX, createContext, splitProps, useContext } from 'solid-js';
import { Dynamic } from 'solid-js/web';

import { ThemesError } from '../../errors';
import { colourSchemeClassList } from '../../private/functions/colourSchemeClassList';
import { surfaceClassList } from '../../private/functions/surfaceClassList';
import { themeClassList } from '../../private/functions/themeClassList';
import { ThemeTokensProvider } from '../../private/providers/ThemeTokensProvider';
import { surfacesStore } from '../../private/stores/surfacesStore';
import { Surface } from '../../types';

type SurfaceContextState = { surface: () => Surface };

export const SurfaceContext = createContext<SurfaceContextState>();

export const useSurfacesContext = (): SurfaceContextState => {
    const context = useContext(SurfaceContext);
    if (!context) {
        throw new ThemesError(`No SurfaceContext found`);
    }
    return context;
};

type SurfaceProviderProps = JSX.HTMLAttributes<HTMLDivElement> & {
    surface: string;
    tag?: string;
    shallow?: boolean;
    classList?: { [key: string]: boolean };
    children?: JSX.Element;
};

const defaultProps: Pick<SurfaceProviderProps, 'tag'> = {
    tag: 'div',
};

const SurfaceProviderBase: Component<Omit<SurfaceProviderProps, 'surface'>> = props => {
    const [local, rest] = splitProps(props, ['children', 'classList', 'tag']);

    const tag = () => local.tag || defaultProps.tag;

    const classList = () => ({
        ...local.classList,
        ...colourSchemeClassList(),
        ...themeClassList(),
        ...surfaceClassList(),
    });

    return (
        <Dynamic {...rest} component={tag()} classList={classList()}>
            <ThemeTokensProvider>{local.children}</ThemeTokensProvider>
        </Dynamic>
    );
};

export const SurfaceProvider: Component<SurfaceProviderProps> = props => {
    const [local, rest] = splitProps(props, ['surface']);

    const { findSurface } = surfacesStore;

    const value = () => ({ surface: () => findSurface(local.surface) });

    return (
        <SurfaceContext.Provider value={value()}>
            {props.shallow ? props.children : <SurfaceProviderBase {...rest} />}
        </SurfaceContext.Provider>
    );
};
