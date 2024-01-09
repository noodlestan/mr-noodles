export type AlbumsNavigationEventType =
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
