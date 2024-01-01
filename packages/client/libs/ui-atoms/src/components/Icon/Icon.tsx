import { Component, JSX } from 'solid-js';

import './Icon.css';

type IconSize = 's' | 'm' | 'l';
type IconComponent = (props: object) => JSX.Element;

export type IconProps = {
    icon: IconComponent | JSX.Element;
    size?: IconSize;
    classList?: { [key: string]: boolean };
};

const defaultProps: Pick<IconProps, 'size'> = {
    size: 'm',
};
export const Icon: Component<IconProps> = props => {
    const size = () => props.size || defaultProps.size;
    const icon = () => (typeof props.icon === 'function' ? props.icon({}) : props.icon);

    const classList = () => ({
        ...props.classList,
        Icon: true,
        [`Icon-size-${size()}`]: true,
    });

    return <span classList={classList()}>{icon()}</span>;
};
