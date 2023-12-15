import { Component, JSX } from 'solid-js';

import { Button, ButtonProps } from '../Button';

import './IconButton.css';

export type IconButtonProps = Omit<ButtonProps, 'length' | 'children'> & {
    svg: JSX.Element;
};

const defaultProps: Pick<IconButtonProps, 'size'> = {
    size: 'm',
};

export const IconButton: Component<IconButtonProps> = props => {
    const size = () => props.size || defaultProps.size;

    const classList = () => ({
        ...props.classList,
        IconButton: true,
        [`IconButton-size-${size()}`]: true,
    });

    return (
        <Button {...props} classList={classList()}>
            {props.svg}
        </Button>
    );
};
