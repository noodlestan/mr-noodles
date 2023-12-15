import { Component, JSX, Show } from 'solid-js';

import './Select.css';

type SelectSize = 's' | 'm' | 'l';
type SelectLength = 's' | 'm' | 'l' | 'full' | 'auto';

export type SelectProps = {
    id?: string;
    value?: string;
    placeholder?: string;
    size?: SelectSize;
    length?: number | SelectLength;
    disabled?: boolean;
    onValueChange?: (id: string) => void;
    classList?: { [key: string]: boolean };
    children?: JSX.Element;
};

const defaultProps: Pick<SelectProps, 'size' | 'length'> = {
    size: 'm',
    length: 'full',
};

const makeLength = (length: number | SelectLength): string => {
    if (typeof length === 'number') {
        return `${length}em`;
    }
    if (length === 'full') {
        return '100%';
    }
    if (length === 'auto') {
        return 'min-content';
    }
    return `var(--select-length-${length})`;
};

const makeStyle = (length?: number | SelectLength) =>
    length ? { '--select-length': makeLength(length) } : {};

export const Select: Component<SelectProps> = props => {
    const size = () => props.size || defaultProps.size;
    const length = () => props.length || defaultProps.length;

    const handleChange = (event: Event) => {
        const target = event.target as HTMLSelectElement;
        props.onValueChange?.(target?.value || '');
    };

    const classList = () => ({
        ...props.classList,
        Select: true,
        'Select-is-disabled': props.disabled,
        [`Select-size-${size()}`]: true,
    });

    const style = () => makeStyle(length());

    return (
        <select
            id={props.id}
            value={props.value || ''}
            disabled={props.disabled}
            onChange={handleChange}
            classList={classList()}
            style={style()}
        >
            <Show when={!!props.placeholder}>
                <option value="">{props.placeholder}</option>
            </Show>
            {props.children}
        </select>
    );
};
