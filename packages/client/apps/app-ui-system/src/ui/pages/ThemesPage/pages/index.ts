import { Component } from 'solid-js';

import { ThemeBasePage } from './ThemeBasePage';
import { ThemeStickingPage } from './ThemeStickingPage';
import { ThemeStudioPage } from './ThemeStudioPage';

export const THEME_PAGE_MAP: Record<string, Component> = {
    base: ThemeBasePage,
    sticking: ThemeStickingPage,
    studio: ThemeStudioPage,
};
