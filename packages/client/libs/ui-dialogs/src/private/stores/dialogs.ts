import { Accessor, createSignal } from 'solid-js';

type DialogsStore = {
    dialogs: Accessor<Array<string>>;
    addDialog: (id: string) => void;
    removeDialog: (id: string) => void;
    isDialogOpen: (id: string) => boolean;
    isDialogActive: (id: string) => boolean;
};

const [dialogs, setDialogs] = createSignal<Array<string>>([]);

export const dialogsStore: DialogsStore = {
    dialogs,
    addDialog: (id: string) => {
        setDialogs(previous => [...previous, id]);
    },
    removeDialog: (id: string) => {
        setDialogs(previous => previous.filter(item => item !== id));
    },
    isDialogOpen: (id: string) => {
        const items = dialogs();
        return items.indexOf(id) !== -1;
    },
    isDialogActive: (id: string) => {
        const items = dialogs();
        return items[items.length - 1] === id;
    },
};
