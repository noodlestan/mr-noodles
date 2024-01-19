import { ColourSchemeName } from '@noodlestan/ui-themes';
import { makePersisted } from '@solid-primitives/storage';
import { createSignal } from 'solid-js';

import { SystemUIContextState } from './types';

const initialColourScheme = window.matchMedia('(prefers-color-scheme: dark)') ? 'dark' : 'light';

export const createSystemUIContext = (): SystemUIContextState => {
    const [colourScheme, setColourScheme] = makePersisted(
        createSignal<ColourSchemeName>(initialColourScheme),
    );

    const context: SystemUIContextState = {
        colourScheme,
        setColourScheme,
    };

    return context;
};
