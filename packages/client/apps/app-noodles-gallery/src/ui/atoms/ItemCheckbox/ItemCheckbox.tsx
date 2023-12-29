/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Flex } from '@noodlestan/ui-layouts';
import { Component } from 'solid-js';

import { useGallerySelectionContext } from '@/ui/providers/GallerySelection/GallerySelection';

import './ItemCheckbox.css';

export type ItemCheckboxProps = {
    id: string;
};
export const ItemCheckbox: Component<ItemCheckboxProps> = props => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { bus, selection } = useGallerySelectionContext();

    const checked = () => selection().has(props.id);

    const classList = () => ({
        ItemCheckbox: true,
        'ItemCheckbox-is-checked': checked(),
    });

    let inputRef: HTMLInputElement | undefined;

    const handleClick = (ev: MouseEvent) => {
        ev.stopPropagation();
        bus?.emit({ name: 'onSelect', target: props.id });
    };

    const handleOnChange = () => {
        bus?.emit({ name: 'onSelect', target: props.id });
    };

    return (
        <Flex gap="m" classList={classList()}>
            <div class="ItemCheckbox--control" onClick={handleClick}>
                <input
                    ref={inputRef}
                    type="checkbox"
                    onChange={handleOnChange}
                    checked={checked()}
                    tabindex="-1"
                />
            </div>
        </Flex>
    );
};
