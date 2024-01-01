import { Component, JSX } from 'solid-js';

import { Button, ButtonProps } from '../Button';

import './IconButton.css';

type IconComponent = (props: object) => JSX.Element;

export type IconButtonProps = Omit<ButtonProps, 'length' | 'children'> & {
    icon: IconComponent | JSX.Element;
};

const defaultProps: Pick<IconButtonProps, 'size'> = {
    size: 'm',
};

export const IconButton: Component<IconButtonProps> = props => {
    const size = () => props.size || defaultProps.size;
    const icon = () => (typeof props.icon === 'function' ? props.icon({}) : props.icon);

    const classList = () => ({
        ...props.classList,
        IconButton: true,
        [`IconButton-size-${size()}`]: true,
    });

    return (
        <Button {...props} classList={classList()}>
            {icon()}
        </Button>
    );
};
