import { Component, JSX } from 'solid-js';

import './ModalItemRail.css';

export type ModalItemRailProps = {
    children: JSX.Element;
};

export const ModalItemRail: Component<ModalItemRailProps> = props => {
    const classList = () => ({
        ModalItemRail: true,
    });

    return <div classList={classList()}>{props.children}</div>;
};
