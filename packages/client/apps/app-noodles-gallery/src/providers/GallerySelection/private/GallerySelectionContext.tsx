import { createContext } from 'solid-js';

import { GallerySelectionContextState } from '../types';

export const GallerySelectionContext = createContext<GallerySelectionContextState>(
    {} as GallerySelectionContextState,
);
