import type { TransitionState } from '@noodlestan/ui-transitions';
import { Accessor } from 'solid-js';

type ClassList = {
    [k: string]: boolean | undefined;
};

export const useTransitionClassList =
    (prefix: string, getTransition: Accessor<TransitionState | undefined>) => (): ClassList => {
        const transition = getTransition();
        const classname = `${prefix}-transition`;
        const nameClassname = `${classname}-${transition?.name || ''}`;
        const stateClassname = `${nameClassname}-${transition?.status || ''}`;
        return {
            [classname]: true,
            [nameClassname]: !!transition,
            [stateClassname]: !!transition,
        };
    };
