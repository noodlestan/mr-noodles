import type { UserNoodle } from '@noodlestan/shared-types';
import { EventBus } from '@solid-primitives/event-bus';
import { Accessor } from 'solid-js';

export type CurrentUserEventType = 'setCurrentUserId' | 'clearCurrentUserId';

export type CurrentUserEvent = {
    name: CurrentUserEventType;
    value?: string;
};

export type CurrentUserContextState = {
    bus: EventBus<CurrentUserEvent>;
    currentUser: Accessor<UserNoodle | undefined>;
    currentUserId: Accessor<string | undefined>;
};
