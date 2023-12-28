import { useContext } from 'solid-js';

import { ModalContext, ModalContextState } from '../../private/providers/ModalProvider';

export const useModalsContext = (): ModalContextState => useContext(ModalContext);
