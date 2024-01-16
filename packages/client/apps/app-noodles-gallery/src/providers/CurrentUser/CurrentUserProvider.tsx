import { Component, JSX } from 'solid-js';

import { CurrentUserContext } from './private/CurrentUserContext';
import { CurrentUserContextState } from './types';

type CurrentUserProviderProps = CurrentUserContextState & {
    children?: JSX.Element;
};

export const CurrentUserProvider: Component<CurrentUserProviderProps> = props => {
    return (
        <CurrentUserContext.Provider value={props}>{props.children} </CurrentUserContext.Provider>
    );
};
