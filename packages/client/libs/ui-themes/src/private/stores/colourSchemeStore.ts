import { Accessor, createSignal } from 'solid-js';

import { ColourSchemeName } from '../../types';

const initialColourScheme = window.matchMedia('(prefers-color-scheme: dark)') ? 'dark' : 'light';

const [colourScheme, setColourScheme] = createSignal<ColourSchemeName>(initialColourScheme);

type ColourSchemeStore = {
    colourScheme: Accessor<ColourSchemeName>;
    setColourScheme: (name: ColourSchemeName) => void;
};

export const colourSchemeStore: ColourSchemeStore = {
    colourScheme,
    setColourScheme,
};
