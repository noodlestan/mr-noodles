import { FolderModel } from '@noodlestan/shared-types';
import { EventBus } from '@solid-primitives/event-bus';
import { Accessor } from 'solid-js';

export type FoldersNavigationEventType =
    | 'showAllItems'
    | 'showSubFolders'
    | 'onFocus'
    | 'onClick'
    | 'setFocus'
    | 'goToPreviousItem'
    | 'goToNextItem'
    | 'onEnd'
    | 'closeModal';

export type FoldersNavigationEvent = {
    name: FoldersNavigationEventType;
    value?: string;
};

export type FoldersNavigationContextState = {
    bus: EventBus<FoldersNavigationEvent>;
    showAllItems: Accessor<boolean>;
    isModal: Accessor<boolean>;
    previous: Accessor<FolderModel | undefined>;
    current: Accessor<FolderModel | undefined>;
    next: Accessor<FolderModel | undefined>;
};
