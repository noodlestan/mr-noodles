import { DEFAULT_TRANSITION_MS, TRANSITION_ACTIVE, TRANSITION_END } from '../../constants';
import { transitionGroupsStore } from '../../private/stores/TransitionGroupsStore';
import type { TransitionOptions, TransitionState } from '../../types';

interface TransitionGroupsServiceInterface {
    getTransition: (group: string, id: string) => TransitionState | undefined;
    createTransition: (group: string, id: string, name: string, options: TransitionOptions) => void;
    resetTransitionGroup: (group: string) => void;
}

const { addTransition, updateTransition, deleteTransition, getTransition, resetTransitionGroup } =
    transitionGroupsStore;

const endTransition = (group: string, id: string) => {
    const timeout = setTimeout(() => {
        deleteTransition(group, id);
    });
    updateTransition(group, id, TRANSITION_END, timeout);
};

const activateTransition = (group: string, id: string, options: TransitionOptions) => {
    const duration = options.transitionTime || DEFAULT_TRANSITION_MS;
    const timeout = setTimeout(() => {
        endTransition(group, id);
    }, duration);
    updateTransition(group, id, TRANSITION_ACTIVE, timeout);
};

export const createTransitionGroupsService = (): TransitionGroupsServiceInterface => {
    return {
        getTransition,
        createTransition: (group: string, id: string, name: string, options: TransitionOptions) => {
            const timeout = setTimeout(() => {
                activateTransition(group, id, options);
            });
            addTransition(group, id, name, {}, timeout);
        },
        resetTransitionGroup,
    };
};
