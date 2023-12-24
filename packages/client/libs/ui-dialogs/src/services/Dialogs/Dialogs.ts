import { dialogsStore } from '../../private/stores/dialogs';

interface DialogsServiceInterface {
    addDialog: (id: string) => void;
    removeDialog: (id: string) => void;
    isDialogActive: (id: string) => boolean;
}

export const createDialogsService = (): DialogsServiceInterface => {
    const { addDialog, removeDialog, isDialogActive } = dialogsStore;

    return {
        addDialog,
        removeDialog,
        isDialogActive,
    };
};
