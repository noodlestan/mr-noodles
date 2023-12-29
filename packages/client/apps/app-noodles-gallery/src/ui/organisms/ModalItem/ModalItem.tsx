import { Component } from 'solid-js';

import './ModalItem.css';

export type ModalItemProps = {
    id: string;
};

export const ModalItem: Component<ModalItemProps> = props => {
    const classList = () => ({
        ModalItem: true,
    });

    const url = () => {
        const id = props.id;
        const a = id.substring(0, 2);
        const b = id.substring(2, 4);
        const c = id.substring(4, 6);
        const r = id.substring(6);
        return `http://localhost:8008/assets/${a}/${b}/${c}/${r}.thumb.200.jpg`;
    };

    return (
        <div classList={classList()}>
            <img alt="" src={url()} />
        </div>
    );
};
