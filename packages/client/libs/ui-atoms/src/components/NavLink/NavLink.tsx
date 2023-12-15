import { Component, splitProps } from 'solid-js';

import { Link, LinkProps } from '../Link';

import './NavLink.css';

type NavLinkSize = 's' | 'm' | 'l';

export type NavLinkProps = LinkProps & {
    size?: NavLinkSize;
    active: boolean;
};

const defaultProps: Pick<NavLinkProps, 'size'> = {
    size: 's',
};

export const NavLink: Component<NavLinkProps> = props => {
    const [localProps, linkProps] = splitProps(props, ['active', 'classList']);

    const size = () => props.size || defaultProps.size;

    const classList = () => ({
        ...localProps.classList,
        NavLink: true,
        [`NavLink-size-${size()}`]: true,
        'NavLink-is-active': localProps.active,
    });

    return <Link classList={classList()} {...linkProps} />;
};
