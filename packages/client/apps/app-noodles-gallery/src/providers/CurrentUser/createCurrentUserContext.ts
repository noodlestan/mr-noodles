import { inject } from '@noodlestan/ui-services';
import { createEventBus } from '@solid-primitives/event-bus';
import { makePersisted } from '@solid-primitives/storage';
import { createSignal } from 'solid-js';

import { makeEventListener } from '../makeEventListener';

import { CurrentUserContextState, CurrentUserEvent } from './types';

import { UsersService } from '@/services/Users';

export const createCurrentUserContext = (): CurrentUserContextState => {
    const bus = createEventBus<CurrentUserEvent>();

    const { getUserByid } = inject(UsersService);

    const [currentUserId, setCurrentUserId] = makePersisted(createSignal<string | undefined>());

    const context: CurrentUserContextState = {
        bus,
        currentUser: () => {
            const id = currentUserId();
            return id ? getUserByid(id) : undefined;
        },
        currentUserId,
    };

    bus.listen(
        makeEventListener<CurrentUserEvent>({
            setCurrentUserId: ev => setCurrentUserId(ev.value as string),
            clearCurrentUserId: () => setCurrentUserId(undefined),
        }),
    );

    return context;
};
