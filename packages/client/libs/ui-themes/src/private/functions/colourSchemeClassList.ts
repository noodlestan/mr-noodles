import { classListFromClassNames } from './classListFromClassNames';
import { colourSchemeClassNames } from './colourSchemeClassNames';
import { ClassList } from './types';

export const colourSchemeClassList = (): ClassList =>
    classListFromClassNames(colourSchemeClassNames());
