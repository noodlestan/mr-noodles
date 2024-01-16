export type FoldersNavigationEventType =
    | 'onFocus'
    | 'onClick'
    | 'setFocus'
    | 'goToPreviousItem'
    | 'goToNextItem'
    | 'onEnd'
    | 'closeModal';

export type FoldersNavigationEvent = {
    name: FoldersNavigationEventType;
    target?: string;
};
