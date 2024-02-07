import { useLocation } from '@solidjs/router';
import { Component, splitProps } from 'solid-js';

import { Link, LinkProps } from '../Link';

import './NavLink.css';

type NavLinkSize = 's' | 'm' | 'l';

export type NavLinkProps = LinkProps & {
    href?: string;
    exact?: boolean;
    size?: NavLinkSize;
    active?: boolean;
    label: string;
    onClick?: () => void;
};

const defaultProps: Pick<NavLinkProps, 'exact' | 'size'> = {
    exact: false,
    size: 's',
};

export const NavLink: Component<NavLinkProps> = props => {
    const [localProps, linkProps] = splitProps(props, ['exact', 'active', 'classList']);

    const location = useLocation();

    const size = () => props.size || defaultProps.size;
    const exact = () => ('exact' in props ? props.exact : defaultProps.exact);

    const classList = () => {
        const isActive = exact()
            ? location.pathname === props.href
            : location.pathname.startsWith(props.href || '');
        return {
            ...localProps.classList,
            NavLink: true,
            [`NavLink-size-${size()}`]: true,
            'NavLink-is-active': isActive || !!localProps.active,
        };
    };

    return (
        <Link classList={classList()} {...linkProps}>
            <span>{props.label}</span>
        </Link>
    );
};
