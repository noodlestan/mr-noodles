import { classListFromClassNames } from './classListFromClassNames';
import { themeClassNames } from './themeClassNames';
import { ClassList } from './types';

export const themeClassList = (): ClassList => classListFromClassNames(themeClassNames());
