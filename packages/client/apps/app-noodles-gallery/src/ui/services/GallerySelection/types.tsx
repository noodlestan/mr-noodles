export type GallerySelectionEventType = 'onSelect' | 'clearSelection';

export type GallerySelectionEvent = {
    name: GallerySelectionEventType;
    target?: string;
};
