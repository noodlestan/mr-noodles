import { Component, JSX, createEffect, createUniqueId } from 'solid-js';

import './FocusTrap.css';

export type FocusTrapProps = {
    show: boolean;
    autoFocus?: boolean;
    children?: JSX.Element;
};

const focusableElementsQuery =
    'a, button:not(:disabled), input, textarea, select, details, [tabindex]:not([tabindex="-1"])';

export const getFocusableElements = (element?: HTMLElement): HTMLElement[] =>
    element ? Array.from(element.querySelectorAll(focusableElementsQuery)) : [];

export const FocusTrap: Component<FocusTrapProps> = props => {
    let inputRef: HTMLInputElement | undefined;
    let containerRef: HTMLDivElement | undefined;

    const id = createUniqueId();

    const focusFirst = () =>
        setTimeout(() => {
            const focusableChildren = getFocusableElements(containerRef);
            focusableChildren[0]?.focus();
        });

    const focusLast = () =>
        setTimeout(() => {
            const focusableChildren = getFocusableElements(containerRef);
            focusableChildren[focusableChildren.length - 1]?.focus();
        });

    const handleBeforeFocus = (ev: FocusEvent) => {
        ev.preventDefault();
        focusLast();
    };
    const handleAfterocus = (ev: FocusEvent) => {
        ev.preventDefault();
        focusFirst();
    };

    const handleKeyDown = (ev: KeyboardEvent) => {
        if (ev.code === 'Tab') {
            ev.preventDefault();
            ev.shiftKey ? focusLast() : focusFirst();
        }
    };

    createEffect(() => {
        if (props.show && props.autoFocus) {
            focusFirst();
        }
    });

    return (
        <>
            <input
                ref={inputRef}
                type="text"
                class="FocusTrap--input"
                id={`before-${id}`}
                onFocus={handleBeforeFocus}
                onKeyDown={handleKeyDown}
                value="ouch"
            />
            <div ref={containerRef}>{props.children}</div>
            <input
                type="text"
                class="FocusTrap--input"
                id={`after-${id}`}
                onFocus={handleAfterocus}
                onKeyDown={handleKeyDown}
                value="ouch"
            />
        </>
    );
};
