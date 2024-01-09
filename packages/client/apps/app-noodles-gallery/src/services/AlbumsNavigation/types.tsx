export type AlbumsNavigationEventType =
    | 'showAllItems'
    | 'showSubFolders'
    | 'onFocus'
    | 'onClick'
    | 'setFocus'
    | 'goToPreviousItem'
    | 'goToNextItem'
    | 'onEnd'
    | 'closeModal';

export type AlbumsNavigationEvent = {
    name: AlbumsNavigationEventType;
    target?: string;
};
