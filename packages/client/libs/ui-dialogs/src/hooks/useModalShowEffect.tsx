import { inject } from '@noodlestan/ui-services';
import { Accessor, createEffect, on, onCleanup } from 'solid-js';

import { ModalsService } from '../services';
import { ModalOptions } from '../types';

export const useModalShowEffect = (
    show: Accessor<boolean>,
    id: string,
    options: ModalOptions,
): void => {
    const { addModal, deleteModal } = inject(ModalsService);

    onCleanup(() => {
        if (show()) {
            deleteModal(id);
        }
    });

    createEffect(
        on(show, (value, previous) => {
            if (value && !previous) {
                addModal(id, options);
            } else if (!value && previous) {
                deleteModal(id);
            }
        }),
    );
};
