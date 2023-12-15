import { Component, JSX } from 'solid-js';

import './DataValue.css';

type DataValueSize = 's' | 'm' | 'l';
export type DataValueLength = 's' | 'm' | 'l' | 'full' | 'auto';

export type DataValueProps = {
    id?: string;
    size?: DataValueSize;
    length?: number | DataValueLength;
    onClick?: () => void;
    classList?: { [key: string]: boolean };
    children?: JSX.Element;
};

const defaultProps: Pick<DataValueProps, 'size' | 'length'> = {
    size: 'm',
    length: 'auto',
};

const makeLength = (length: number | DataValueLength): string => {
    if (typeof length === 'number') {
        return `${length * 0.63 + 0.5}em`;
    }
    if (length === 'auto') {
        return `min-content`;
    }
    if (length === 'full') {
        return '100%';
    }
    return `var(--data-value-length-${length})`;
};

const makeStyle = (length?: DataValueLength | number) =>
    length ? { '--data-value-length': makeLength(length) } : {};

export const DataValue: Component<DataValueProps> = props => {
    const size = () => props.size || defaultProps.size;
    const length = () => props.length || defaultProps.length;

    const handleClick = () => props.onClick?.();

    const handleKeyDown = (ev: KeyboardEvent) => {
        if (ev.key === 'Enter') {
            props.onClick?.();
        }
    };

    const tabindex = () => (props.onClick ? 0 : undefined);

    const classList = () => ({
        ...props.classList,
        DataValue: true,
        [`DataValue-is-interactive`]: !!props.onClick,
        [`DataValue-size-${size()}`]: true,
    });

    const style = () => makeStyle(length());

    return (
        <span
            role="button"
            onClick={handleClick}
            onKeyDown={handleKeyDown}
            tabindex={tabindex()}
            classList={classList()}
            style={style()}
        >
            {props.children}
        </span>
    );
};
