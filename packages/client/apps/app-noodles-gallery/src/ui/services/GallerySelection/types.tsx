export type GallerySelectionEventType =
    | 'onFocus'
    | 'onClick'
    | 'onSelect'
    | 'setFocus'
    | 'goToPreviousItem'
    | 'goToNextItem'
    | 'onEnd'
    | 'closeModal'
    | 'clearSelection';

export type GallerySelectionEvent = {
    name: GallerySelectionEventType;
    target?: string;
};
