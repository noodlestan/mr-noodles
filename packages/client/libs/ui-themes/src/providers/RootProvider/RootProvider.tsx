import { GlobalStyleProvider } from '@noodlestan/ui-styles';
import { Component, JSX } from 'solid-js';

import { RootStyleProvider } from '../../private/providers/RootStyleProvider';

export type RootProviderProps = {
    themes: Component[];
    theme: string;
    surface: string;
    children?: JSX.Element;
};

export const RootProvider: Component<RootProviderProps> = props => {
    // console.info('RootProvider - instance'); TODO profile

    return (
        <>
            <GlobalStyleProvider />
            {props.themes.map(ThemeComponent => (
                <ThemeComponent />
            ))}
            <RootStyleProvider theme={props.theme} surface={props.surface}>
                {props.children}
            </RootStyleProvider>
        </>
    );
};
