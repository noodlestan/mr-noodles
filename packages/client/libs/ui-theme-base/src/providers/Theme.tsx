import { surfacesStore, themesStore } from '@noodlestan/ui-themes';
import { Component, JSX } from 'solid-js';

import { surfaces, theme } from '../constants';

import '../styles/base/color.css';
import '../styles/base/outline.css';
import '../styles/base/radius.css';
import '../styles/base/space.css';
import '../styles/base/type.css';
import '../styles/base/surfaces.css';

import '../styles/invert/color.css';
import '../styles/invert/surfaces.css';

import '../styles/patterns/actions.css';
import '../styles/patterns/dividers.css';
import '../styles/patterns/data.css';
import '../styles/patterns/transitions.css';

type ThemeProps = {
    children?: JSX.Element;
};

export const BaseTheme: Component<ThemeProps> = props => {
    const { registerTheme } = themesStore;
    const { registerSurface } = surfacesStore;

    registerTheme(theme);
    surfaces.forEach(registerSurface);
    return <>{props.children}</>;
};
