import { inject } from '@noodlestan/ui-services';
import { Accessor, createEffect, on } from 'solid-js';

import { ModalsService } from '../services';
import { ModalOptions } from '../types';

export const useModalShowEffect = (
    show: Accessor<boolean>,
    id: string,
    options: ModalOptions,
): void => {
    const { addModal, deleteModal } = inject(ModalsService);

    createEffect(
        on(show, (value, previous) => {
            if (value) {
                addModal(id, options);
            } else if (previous !== undefined) {
                deleteModal(id);
            }
        }),
    );
};
