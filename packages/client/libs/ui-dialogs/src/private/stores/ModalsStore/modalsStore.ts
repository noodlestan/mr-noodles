import { Accessor, createSignal } from 'solid-js';

import type { ModalOptions } from '../../../types';

import { ModalState } from './types';
import {
    addModal,
    deleteModal,
    getCurrentModal,
    getHiddenModal,
    getModal,
    getModalIndex,
    isModalCurrent,
    updateModal,
} from './utils';

type ModalsStore = {
    modals: Accessor<Array<ModalState>>;
    addModal: (id: string, options: ModalOptions) => void;
    deleteModal: (id: string) => void;
    getCurrentModal: () => ModalState | undefined;
    getHiddenModal: () => ModalState | undefined;
    getModal: (id: string) => ModalState | undefined;
    getModalIndex: (id: string) => number;
    isModalCurrent: (id: string) => boolean;
    isModalDimmed: (id: string) => boolean;
    isModalVisible: (id: string) => boolean;
};

const [modals, setModals] = createSignal<Array<ModalState>>([]);

export const modalsStore: ModalsStore = {
    modals,
    addModal: (id: string, options: ModalOptions) => {
        const currentModal = getCurrentModal(modals());
        setModals(items => {
            const currentUpdate = currentModal && {
                id: currentModal.id,
                current: false,
                options: currentModal.options,
            };
            const items_ = currentUpdate ? updateModal(items, currentUpdate) : items;
            const newModal = {
                id,
                current: true,
                options,
            };
            return addModal(items_, newModal);
        });
    },
    deleteModal: (id: string) => {
        const items = modals();
        const modal = getModal(items, id);
        const hiddenModal = modal && modal.current ? getHiddenModal(items) : undefined;
        setModals(items => {
            const hiddenUpdate = hiddenModal && {
                id: hiddenModal.id,
                current: true,
                options: hiddenModal.options,
            };
            const items_ = hiddenUpdate ? updateModal(items, hiddenUpdate) : items;
            return deleteModal(items_, id);
        });
    },
    getCurrentModal: () => getCurrentModal(modals()),
    getHiddenModal: () => getHiddenModal(modals()),
    getModal: (id: string) => getModal(modals(), id),
    getModalIndex: (id: string) => getModalIndex(modals(), id),
    isModalCurrent: (id: string) => isModalCurrent(modals(), id),
    isModalDimmed: (id: string) => {
        const items = modals();
        const modal = getModal(items, id);
        if (!modal || !modal.options.sticky) {
            return false;
        }
        return !isModalCurrent(items, id);
    },
    isModalVisible: (id: string) => {
        const items = modals();
        const modal = getModal(items, id);
        return modal ? modal.options.sticky || modal.current : false;
    },
};
