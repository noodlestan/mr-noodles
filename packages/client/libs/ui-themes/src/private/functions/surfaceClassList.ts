import { classListFromClassNames } from './classListFromClassNames';
import { surfaceClassNames } from './surfaceClassNames';
import { ClassList } from './types';

export const surfaceClassList = (): ClassList => classListFromClassNames(surfaceClassNames());
