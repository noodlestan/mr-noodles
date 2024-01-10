import { useContext } from 'solid-js';

import {
    AlbumsNavigationContext,
    AlbumsNavigationContextState,
} from './private/AlbumsNavigationContext';

export const useAlbumsNavigationContext = (): AlbumsNavigationContextState =>
    useContext(AlbumsNavigationContext);
