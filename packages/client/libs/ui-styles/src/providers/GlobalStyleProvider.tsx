import { Component, JSX } from 'solid-js';

import '../styles/reset.css';
import '../styles/global.css';

type GlobalStyleProviderProps = {
    children?: JSX.Element;
};

export const GlobalStyleProvider: Component<GlobalStyleProviderProps> = props => {
    return <>{props.children}</>;
};
