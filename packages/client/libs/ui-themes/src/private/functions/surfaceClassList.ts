import { surfaceClassNames } from './surfaceClassNames';

export const surfaceClassList = (): { [key: string]: boolean } =>
    surfaceClassNames().reduce(
        (acc, item) => {
            acc[item] = true;
            return acc;
        },
        {} as { [key: string]: boolean },
    );
