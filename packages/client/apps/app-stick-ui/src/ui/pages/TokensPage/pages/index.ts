import { Component } from 'solid-js';

import { ColorPage } from './ColorPage';
import { SpacePage } from './SpacePage';
import { TypePage } from './TypePage';

export const TOKEN_PAGE_MAP: Record<string, Component> = {
    Color: ColorPage,
    Space: SpacePage,
    Type: TypePage,
};
