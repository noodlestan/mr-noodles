import { Accessor, createSignal } from 'solid-js';

const [selection, setSelection] = createSignal<string[]>([]);

type PhotosStore = {
    selection: Accessor<string[]>;
    setSelection: (loading: string[]) => void;
};

export const photosStore: PhotosStore = {
    selection,
    setSelection,
};
