import { createContext } from 'solid-js';

import { GalleryNavigationContextState } from '../types';

export const GalleryNavigationContext = createContext<GalleryNavigationContextState>(
    {} as GalleryNavigationContextState,
);
