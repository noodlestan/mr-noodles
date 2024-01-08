import { Accessor, createSignal } from 'solid-js';

const [selection, setSelection] = createSignal<string[]>([]);

type PhotosStore = {
    selection: Accessor<string[]>;
    setSelection: (selection: string[]) => void;
};

export const gallerySelectionStore: PhotosStore = {
    selection,
    setSelection,
};
