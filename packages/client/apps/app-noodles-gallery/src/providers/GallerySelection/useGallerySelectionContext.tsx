import { useContext } from 'solid-js';

import { GallerySelectionContext } from './private/GallerySelectionContext';
import { GallerySelectionContextState } from './private/GallerySelectionContextState';

export const useGallerySelectionContext = (): GallerySelectionContextState =>
    useContext(GallerySelectionContext);
