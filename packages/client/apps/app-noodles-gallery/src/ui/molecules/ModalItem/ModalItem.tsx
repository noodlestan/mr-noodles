import { Component } from 'solid-js';

import './ModalItem.css';

export type ModalItemProps = {
    id: string;
    onClick: () => void;
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
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
        <div classList={classList()} onMouseDown={() => props.onClick()}>
            <img alt="" src={url()} width="100%" />
        </div>
    );
};
