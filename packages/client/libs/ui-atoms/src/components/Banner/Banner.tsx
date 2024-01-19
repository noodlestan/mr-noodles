import { Surface } from '@noodlestan/ui-surfaces';
import { AlertTriangleIcon, InfoIcon, ThumbsUpIcon, XCircleIcon } from 'lucide-solid';
import { Component, JSX } from 'solid-js';

import { Icon } from '../Icon';

import './Banner.css';

type BannerVariant = 'passive' | 'info' | 'warning' | 'danger' | 'success';
export type BannerSize = 's' | 'm';
type BannerLength = 'compact' | 'full';

const VARIANT_ICON_MAP: Record<BannerVariant, Component> = {
    passive: InfoIcon,
    info: InfoIcon,
    warning: AlertTriangleIcon,
    danger: XCircleIcon,
    success: ThumbsUpIcon,
};

export type BannerProps = {
    variant?: BannerVariant;
    size?: BannerSize;
    length?: BannerLength;
    classList?: { [key: string]: boolean };
    children?: JSX.Element;
};

const defaultProps: Pick<BannerProps, 'variant' | 'size' | 'length'> = {
    size: 'm',
    length: 'full',
    variant: 'passive',
};

export const Banner: Component<BannerProps> = props => {
    const variant = () => props.variant || defaultProps.variant;
    const size = () => props.size || defaultProps.size;
    const length = () => props.length || defaultProps.length;
    const svg = () => VARIANT_ICON_MAP[(variant && variant()) || 'passive'];

    const classList = () => ({
        ...props.classList,
        Banner: true,
        [`Banner-variant-${variant()}`]: true,
        [`Banner-size-${size()}`]: true,
        [`Banner-length-${length()}`]: true,
    });

    return (
        <Surface variant="banner" classList={classList()}>
            <div class="Banner--contents">
                <Icon size={size()} icon={svg()} />
                {props.children}
            </div>
        </Surface>
    );
};
