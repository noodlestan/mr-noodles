import { ModalOverlay } from '@noodlestan/ui-dialogs';
import { ServiceProvider } from '@noodlestan/ui-services';
import { ColourSchemeName, RootThemesProvider } from '@noodlestan/ui-themes';
import { Component, JSX } from 'solid-js';
import { Portal } from 'solid-js/web';

export type RootProviderProps = {
    themes: Component[];
    colourScheme?: ColourSchemeName;
    theme: string;
    surface: string;
    children?: JSX.Element;
};

export const RootProvider: Component<RootProviderProps> = props => {
    // console.info('RootProvider - instance'); TODO profile

    return (
        <ServiceProvider>
            <RootThemesProvider
                themes={props.themes}
                colourScheme={props.colourScheme}
                theme={props.theme}
                surface={props.surface}
            >
                {props.children}
            </RootThemesProvider>
            <Portal>
                <ModalOverlay />
            </Portal>
        </ServiceProvider>
    );
};
