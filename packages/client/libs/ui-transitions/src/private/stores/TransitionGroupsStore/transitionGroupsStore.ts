import { createSignal } from 'solid-js';

import { TRANSITION_START } from '../../../constants';
import type { TransitionOptions, TransitionState, TransitionStatus } from '../../../types';

import type { TransitionGroupState } from './types';

type TransitionsStore = {
    addTransition: (
        groupId: string,
        id: string,
        name: string,
        options: TransitionOptions,
        timeout: number,
    ) => void;
    updateTransition: (
        groupId: string,
        id: string,
        status: TransitionStatus,
        timeout: number,
    ) => void;
    deleteTransition: (groupId: string, id: string) => void;
    getTransition: (groupId: string, id: string) => TransitionState | undefined;
    resetTransitionGroup: (groupId: string) => void;
};

const [transitionGroups, setTransitionGroups] = createSignal<TransitionGroupState>({});

export const transitionGroupsStore: TransitionsStore = {
    addTransition: (
        groupId: string,
        id: string,
        name: string,
        options: TransitionOptions,
        timeout: number,
    ) => {
        setTransitionGroups(groups => {
            const { [groupId]: group } = groups;
            const { [id]: overrideTransition, ...transitions } = group || {};
            if (overrideTransition) {
                window.clearTimeout(overrideTransition.timeout);
            }
            const newTransition = { name, options, status: TRANSITION_START, timeout };
            const updatedGroup = { ...transitions, [id]: newTransition };
            return { ...groups, [groupId]: updatedGroup };
        });
    },
    updateTransition: (groupId: string, id: string, status: TransitionStatus, timeout: number) => {
        setTransitionGroups(prev => {
            const { [groupId]: group, ...groups } = prev;
            const { [id]: transition, ...transitions } = group || {};
            const { name, options, timeout: overrideTimeout } = transition || {};
            window.clearTimeout(overrideTimeout);
            const updatedTransition = { id, name, options, status, timeout };
            const updatedGroup = { ...transitions, [id]: updatedTransition };
            return { ...groups, [groupId]: updatedGroup };
        });
    },
    deleteTransition: (groupId: string, id: string) => {
        setTransitionGroups(prev => {
            const { [groupId]: group, ...groups } = prev;
            if (!group) {
                return groups;
            }
            const { [id]: transition, ...transitions } = group;
            if (transition) {
                const { timeout } = transition;
                window.clearTimeout(timeout);
            }
            const updatedGroup = { ...transitions };
            return { ...groups, [groupId]: updatedGroup };
        });
    },
    getTransition: (group: string, id: string) => {
        const groups = transitionGroups();
        const g = groups[group];
        return g && g[id];
    },
    resetTransitionGroup: (groupId: string) => {
        setTransitionGroups(prev => {
            const { [groupId]: group, ...groups } = prev;
            if (!group) {
                return groups;
            }
            Object.values(group).forEach(transition => {
                const { timeout } = transition;
                window.clearTimeout(timeout);
            });
            return groups;
        });
    },
};
