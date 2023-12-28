import { ModalState } from './types';

export const deleteModal = (items: Array<ModalState>, id: string): Array<ModalState> => {
    return items.filter(item => item.id !== id);
};

export const addModal = (items: Array<ModalState>, modal: ModalState): Array<ModalState> => {
    const items_ = deleteModal(items, modal.id);
    return [...items_, modal];
};

export const getCurrentModal = (items: Array<ModalState>): ModalState | undefined => {
    return items.find(item => item.current);
};

export const getHiddenModal = (items: Array<ModalState>): ModalState | undefined => {
    const currentIndex = items.findIndex(item => item.current);
    return items[currentIndex - 1];
};

export const getModal = (items: Array<ModalState>, id: string): ModalState | undefined => {
    return items.find(item => item.id === id);
};

export const getModalIndex = (items: Array<ModalState>, id: string): number => {
    return items.findIndex(item => item.id === id);
};

export const isModalCurrent = (items: Array<ModalState>, id: string): boolean => {
    return getCurrentModal(items)?.id === id;
};

export const updateModal = (items: Array<ModalState>, modal: ModalState): Array<ModalState> => {
    return items.map(item => {
        if (item.id === modal.id) {
            return modal;
        }
        return item;
    });
};
