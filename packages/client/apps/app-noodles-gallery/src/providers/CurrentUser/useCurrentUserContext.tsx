import { useContext } from 'solid-js';

import { CurrentUserContext } from './private/CurrentUserContext';
import { CurrentUserContextState } from './types';

export const useCurrentUserContext = (): CurrentUserContextState => useContext(CurrentUserContext);
