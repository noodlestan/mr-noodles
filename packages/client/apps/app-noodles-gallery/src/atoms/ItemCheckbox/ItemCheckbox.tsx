/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Flex } from '@noodlestan/ui-layouts';
import { Component, createSignal } from 'solid-js';

import { useGallerySelectionContext } from '@/providers/GallerySelection';

import './ItemCheckbox.css';

export type ItemCheckboxProps = {
    id: string;
    onFocus: () => void;
    onKeyDown: (ev: KeyboardEvent) => void;
};
export const ItemCheckbox: Component<ItemCheckboxProps> = props => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { bus, selection } = useGallerySelectionContext();

    const [isFocused, setIsFocused] = createSignal<boolean>(false);

    const checked = () => selection().has(props.id);

    const classList = () => ({
        ItemCheckbox: true,
        'ItemCheckbox-is-checked': checked(),
        'ItemCheckbox-is-focused': isFocused(),
        'ItemCheckbox-is-selecting': !!selection()?.size,
    });

    let inputRef: HTMLInputElement | undefined;

    const emitSelect = () => {
        bus?.emit({ name: 'onSelect', value: props.id });
    };

    const handleClick = (ev: MouseEvent) => {
        ev.stopPropagation();
    };

    const handleMouseDown = () => {
        emitSelect();
    };

    const handleOnChange = () => {
        emitSelect();
    };

    const handleFocus = () => {
        setIsFocused(true);
        props.onFocus();
    };
    const handleBlur = () => setIsFocused(false);

    const label = () => (checked() ? 'unselect item' : 'select item');

    const handleKeyDown = (ev: KeyboardEvent) => {
        if (ev.code !== 'Space') {
            props.onKeyDown(ev);
        }
    };

    return (
        <Flex gap="m" classList={classList()}>
            <div
                class="ItemCheckbox--control"
                onClick={handleClick}
                onMouseDown={handleMouseDown}
                onTouchStart={handleMouseDown}
            >
                <input
                    ref={inputRef}
                    tabindex="0"
                    type="checkbox"
                    onChange={handleOnChange}
                    checked={checked()}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    onKeyDown={handleKeyDown}
                    aria-label={label()}
                />
            </div>
        </Flex>
    );
};
