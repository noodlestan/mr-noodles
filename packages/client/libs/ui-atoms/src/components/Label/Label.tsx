import { Component, JSX } from 'solid-js';

import './Label.css';

type LabelSize = 's' | 'm' | 'l';

export type LabelProps = {
    size?: LabelSize;
    for?: string;
    classList?: { [key: string]: boolean };
    children?: JSX.Element;
};

const defaultProps: Pick<LabelProps, 'size'> = {
    size: 'm',
};

export const Label: Component<LabelProps> = props => {
    const size = () => props.size || defaultProps.size;

    const classList = () => ({
        ...props.classList,
        Label: true,
        [`Label-size-${size()}`]: true,
    });

    return (
        <label for={props.for} classList={classList()}>
            {props.children}
        </label>
    );
};
