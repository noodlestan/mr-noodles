import { useContext } from 'solid-js';

import { SystemUIContext } from './private/SystemUIContext';
import { SystemUIContextState } from './types';

export const useSystemUIContext = (): SystemUIContextState => useContext(SystemUIContext);
