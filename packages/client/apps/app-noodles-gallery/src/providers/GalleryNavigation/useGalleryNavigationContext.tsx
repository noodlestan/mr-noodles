import { useContext } from 'solid-js';

import { GalleryNavigationContext } from './private/GalleryNavigationContext';
import { GalleryNavigationContextState } from './types';

export const useGalleryNavigationContext = (): GalleryNavigationContextState =>
    useContext(GalleryNavigationContext);
