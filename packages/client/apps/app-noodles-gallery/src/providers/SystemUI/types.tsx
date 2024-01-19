import { ColourSchemeName } from '@noodlestan/ui-themes';
import { Accessor, Setter } from 'solid-js';

export type SystemUIContextState = {
    setColourScheme: Setter<ColourSchemeName>;
    colourScheme: Accessor<ColourSchemeName>;
};
