export type GallerySelectionEventType =
    | 'onFocus'
    | 'onClick'
    | 'onSelect'
    | 'setFocus'
    | 'goToPreviousItem'
    | 'goToNextItem'
    | 'onEnd';

export type GallerySelectionEvent = {
    name: GallerySelectionEventType;
    target?: string;
};
