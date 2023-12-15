import ErrorSvg from '@noodlestan/ui-icons/src/assets/icons/error.svg';
import InfoSvg from '@noodlestan/ui-icons/src/assets/icons/info.svg';
import SuccessSvg from '@noodlestan/ui-icons/src/assets/icons/success.svg';
import WarningSvg from '@noodlestan/ui-icons/src/assets/icons/warning.svg';
import { Surface } from '@noodlestan/ui-surfaces';
import { Component, JSX } from 'solid-js';

import { Icon } from '../Icon';

import './Banner.css';

type BannerVariant = 'passive' | 'info' | 'warning' | 'danger' | 'success';
export type BannerSize = 's' | 'm';
type BannerLength = 'compact' | 'full';

const VARIANT_ICON_MAP: Record<BannerVariant, JSX.Element> = {
    passive: InfoSvg,
    info: InfoSvg,
    warning: WarningSvg,
    danger: ErrorSvg,
    success: SuccessSvg,
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
                <Icon size={size()} svg={svg()} />
                {props.children}
            </div>
        </Surface>
    );
};
