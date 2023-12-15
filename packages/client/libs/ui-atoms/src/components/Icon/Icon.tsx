import { Component, JSX } from 'solid-js';

import './Icon.css';

type IconSize = 's' | 'm' | 'l';

export type IconProps = {
    svg: JSX.Element;
    size?: IconSize;
    classList?: { [key: string]: boolean };
};

const defaultProps: Pick<IconProps, 'size'> = {
    size: 'm',
};
export const Icon: Component<IconProps> = props => {
    const size = () => props.size || defaultProps.size;

    const classList = () => ({
        ...props.classList,
        Icon: true,
        [`Icon-size-${size()}`]: true,
    });

    return <span classList={classList()}>{props.svg}</span>;
};
