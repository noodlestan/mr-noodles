import { themeClassNames } from './themeClassNames';

export const themeClassList = (): { [key: string]: boolean } =>
    themeClassNames().reduce(
        (acc, item) => {
            acc[item] = true;
            return acc;
        },
        {} as { [key: string]: boolean },
    );
