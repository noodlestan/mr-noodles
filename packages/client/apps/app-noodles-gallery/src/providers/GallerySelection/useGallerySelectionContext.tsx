import { useContext } from 'solid-js';

import {
    GallerySelectionContext,
    GallerySelectionContextState,
} from './private/GallerySelectionContext';

export const useGallerySelectionContext = (): GallerySelectionContextState =>
    useContext(GallerySelectionContext);
