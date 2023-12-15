/* eslint-disable jsx-a11y/interactive-supports-focus */
import { Component, JSX, Show } from 'solid-js';

import { DataValue, DataValueLength } from '../DataValue';
import { Label } from '../Label';

import './DataItem.css';

type DataItemSize = 's' | 'm' | 'l';

export type DataItemProps = {
    id?: string;
    size?: DataItemSize;
    length?: number | DataValueLength;
    label?: string;
    onClick?: () => void;
    classList?: { [key: string]: boolean };
    children?: JSX.Element;
};

const defaultProps: Pick<DataItemProps, 'size'> = {
    size: 'm',
};

export const DataItem: Component<DataItemProps> = props => {
    const size = () => props.size || defaultProps.size;

    const handleKeyDown = (ev: KeyboardEvent) => {
        if (ev.key === 'Enter') {
            props.onClick?.();
        }
    };

    const classList = () => ({
        ...props.classList,
        DataItem: true,
        [`DataItem-size-${size()}`]: true,
    });

    return (
        <span role="button" onKeyDown={handleKeyDown} classList={classList()}>
            <Show when={props.label}>
                <Label size={props.size}>{props.label}</Label>
            </Show>
            <DataValue size={props.size} length={props.length} onClick={props.onClick}>
                {props.children}
            </DataValue>
        </span>
    );
};
