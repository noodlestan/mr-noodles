import { UserModel } from '@noodlestan/shared-types';
import { createEventBus } from '@solid-primitives/event-bus';
import { makePersisted } from '@solid-primitives/storage';
import { createSignal } from 'solid-js';

import { makeEventListener } from '../makeEventListener';

import { CurrentUserContextState, CurrentUserEvent } from './types';

export const createCurrentUserContext = (): CurrentUserContextState => {
    const bus = createEventBus<CurrentUserEvent>();

    const [currentUser, setCurrentUser] = makePersisted(createSignal<UserModel | undefined>());

    const context: CurrentUserContextState = {
        bus,
        currentUser,
    };

    bus.listen(
        makeEventListener<CurrentUserEvent>({
            selectUser: ev => setCurrentUser(ev.value as UserModel),
            unselectUser: () => setCurrentUser(undefined),
        }),
    );

    return context;
};
