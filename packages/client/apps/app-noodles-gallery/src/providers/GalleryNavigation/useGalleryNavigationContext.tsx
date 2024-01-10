import { useContext } from 'solid-js';

import {
    GalleryNavigationContext,
    GalleryNavigationContextState,
} from './private/GalleryNavigationContext';

export const useGalleryNavigationContext = (): GalleryNavigationContextState =>
    useContext(GalleryNavigationContext);
