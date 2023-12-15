import { Component, JSX, createSignal } from 'solid-js';

import './TextInput.css';

type TextInputSize = 's' | 'm' | 'l';
type TextInputLength = 's' | 'm' | 'l' | 'full' | 'auto';

export type TextInputProps = {
    id?: string;
    value?: string;
    type?: string;
    placeholder?: string;
    size?: TextInputSize;
    length?: number | TextInputLength;
    maxLength?: number;
    min?: number;
    max?: number;
    autoConfirm?: boolean;
    disabled?: boolean;
    onValueChange?: (value: string) => void;
    onConfirmValue?: (value: string) => void;
    onCancelValue?: () => void;
    classList?: { [key: string]: boolean };
};

const defaultProps: Pick<TextInputProps, 'size' | 'length'> = {
    size: 'm',
    length: 'auto',
};

const makeLength = (length: number | TextInputLength, maxLength?: number): string => {
    if (typeof length === 'number') {
        return `${length}em`;
    }
    if (length === 'auto' && maxLength) {
        return `${maxLength * 0.63 + 0.5}em`;
    }
    if (length === 'full') {
        return '100%';
    }
    return `var(--input-length-${length})`;
};

const makeStyle = (length?: TextInputLength | number, maxLength?: number) =>
    length ? { '--input-length': makeLength(length, maxLength) } : {};

export const TextInput: Component<TextInputProps> = props => {
    const size = () => props.size || defaultProps.size;
    const length = () => props.length || defaultProps.length;

    const [currentValue, setCurrentValue] = createSignal<string | undefined>();

    const handleInput: JSX.EventHandlerUnion<HTMLInputElement, InputEvent> = event => {
        const target = event.target as HTMLInputElement;
        const v = target?.value || '';
        setCurrentValue(v);
        props.onValueChange?.(v);
    };

    const confirm = () => {
        props.onConfirmValue?.(currentValue() || props.value || '');
        setCurrentValue(undefined);
    };

    const cancel = () => {
        setCurrentValue(undefined);
        props.onCancelValue?.();
    };

    const handleFocus = () => {
        setCurrentValue(props.value);
    };

    const handleBlur = () => {
        if (props.autoConfirm) {
            confirm();
        } else {
            cancel();
        }
    };

    const handleKeyDown = (ev: KeyboardEvent) => {
        if (ev.key === 'Escape') {
            cancel();
        } else if (ev.key === 'Enter') {
            confirm();
        } else if (currentValue() === undefined) {
            setCurrentValue(props.value);
        }
    };

    const classList = () => ({
        ...props.classList,
        TextInput: true,
        'TextInput-is-disabled': props.disabled,
        'TextInput-is-modified': currentValue() !== undefined && currentValue() !== props.value,
        [`TextInput-size-${size()}`]: true,
    });

    const style = () => makeStyle(length(), props.maxLength);

    return (
        <input
            id={props.id}
            value={currentValue() ?? (props.value || '')}
            type={props.type}
            placeholder={props.placeholder}
            maxLength={props.maxLength}
            min={props.min}
            max={props.max}
            disabled={props.disabled}
            onInput={handleInput}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            classList={classList()}
            style={style()}
        />
    );
};
