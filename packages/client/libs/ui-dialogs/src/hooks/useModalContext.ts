import { useContext } from 'solid-js';

import { ModalContext, ModalContextState } from '../private/providers/ModalProvider';

export const useModalContext = (): ModalContextState => useContext(ModalContext);
