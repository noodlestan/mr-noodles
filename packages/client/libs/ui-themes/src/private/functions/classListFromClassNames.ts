import { ClassList } from './types';

export const classListFromClassNames = (classNames: string[]): ClassList =>
    classNames.reduce(
        (acc, item) => {
            acc[item] = true;
            return acc;
        },
        {} as { [key: string]: boolean },
    );
