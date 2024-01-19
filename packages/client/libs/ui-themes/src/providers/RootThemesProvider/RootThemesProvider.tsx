import { GlobalStyleProvider } from '@noodlestan/ui-styles';
import { Component, JSX } from 'solid-js';

import { ThemesStylesProvider } from '../../private/providers/ThemesStylesProvider/ThemesStylesProvider';
import { ColourSchemeName } from '../../types';

export type RootThemesProviderProps = {
    themes: Component[];
    colourScheme?: ColourSchemeName;
    theme: string;
    surface: string;
    children?: JSX.Element;
};

export const RootThemesProvider: Component<RootThemesProviderProps> = props => {
    // console.info('RootProvider - instance'); TODO profile

    return (
        <>
            <GlobalStyleProvider />
            {props.themes.map(ThemeComponent => (
                <ThemeComponent />
            ))}
            <ThemesStylesProvider
                colourScheme={props.colourScheme}
                theme={props.theme}
                surface={props.surface}
            >
                {props.children}
            </ThemesStylesProvider>
        </>
    );
};
