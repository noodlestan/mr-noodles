import { Component, JSX } from 'solid-js';

import './Screen.css';

export type ScreenProps = {
    classList?: { [key: string]: boolean };
    children?: JSX.Element;
};

export const Screen: Component<ScreenProps> = props => {
    const classList = () => ({
        ...props.classList,
        Screen: true,
    });

    return <div classList={classList()}>{props.children}</div>;
};
