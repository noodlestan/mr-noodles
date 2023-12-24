import { GlobalStyleProvider } from '@noodlestan/ui-styles';
import { Component, JSX } from 'solid-js';

import { ThemsStylesProvider } from '../../private/providers/ThemsStylesProvider/StylesProvider';

export type RootThemesProviderProps = {
    themes: Component[];
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
            <ThemsStylesProvider theme={props.theme} surface={props.surface}>
                {props.children}
            </ThemsStylesProvider>
        </>
    );
};
