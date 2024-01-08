export type GallerySelectionEventType = 'onSelect' | 'clearSelection';

export type GallerySelectionEvent = {
    name: GallerySelectionEventType;
    target?: string;
};
export type GalleryNavigationEventType =
    | 'onFocus'
    | 'onClick'
    | 'setFocus'
    | 'goToPreviousItem'
    | 'goToNextItem'
    | 'onEnd'
    | 'closeModal';

export type GalleryNavigationEvent = {
    name: GalleryNavigationEventType;
    target?: string;
};
