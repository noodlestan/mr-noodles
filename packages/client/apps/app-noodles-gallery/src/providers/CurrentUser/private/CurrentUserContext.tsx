import { createContext } from 'solid-js';

import { CurrentUserContextState } from '../types';

export const CurrentUserContext = createContext<CurrentUserContextState>(
    {} as CurrentUserContextState,
);
