import { useContext } from 'solid-js';

import { FoldersNavigationContext } from './private/FoldersNavigationContext';
import { FoldersNavigationContextState } from './types';

export const useFoldersNavigationContext = (): FoldersNavigationContextState =>
    useContext(FoldersNavigationContext);
