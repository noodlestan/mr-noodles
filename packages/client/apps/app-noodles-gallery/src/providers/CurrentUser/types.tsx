import { UserModel } from '@noodlestan/shared-types';
import { EventBus } from '@solid-primitives/event-bus';
import { Accessor } from 'solid-js';

export type CurrentUserEventType = 'selectUser' | 'unselectUser';

export type CurrentUserEvent = {
    name: CurrentUserEventType;
    value?: UserModel;
};

export type CurrentUserContextState = {
    bus: EventBus<CurrentUserEvent>;
    currentUser: Accessor<UserModel | undefined>;
};
