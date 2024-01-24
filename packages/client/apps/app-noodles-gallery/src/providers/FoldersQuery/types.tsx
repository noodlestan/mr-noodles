import { Accessor } from 'solid-js';

export type FoldersQueryContextState = {
    root: Accessor<string | undefined>;
    setRoot: (root: string | undefined) => undefined;
    parent: Accessor<string | undefined>;
    setParent: (parent: string | undefined) => undefined;
    textSearch: Accessor<string | undefined>;
    setTextSearch: (text: string | undefined) => undefined;
};
