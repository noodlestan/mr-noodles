import { Component, JSX } from 'solid-js';

import { SystemUIContext } from './private/SystemUIContext';
import { SystemUIContextState } from './types';

type SystemUIProviderProps = SystemUIContextState & {
    children?: JSX.Element;
};

export const SystemUIProvider: Component<SystemUIProviderProps> = props => {
    return <SystemUIContext.Provider value={props}>{props.children}</SystemUIContext.Provider>;
};
