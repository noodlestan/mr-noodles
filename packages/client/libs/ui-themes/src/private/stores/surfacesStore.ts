import { Accessor, createSignal } from 'solid-js';

import { ThemesError } from '../../errors/ThemesError';
import { Surface } from '../../types';

const [surfaces, setSurfaces] = createSignal<Surface[]>([]);
const [surface, setSurface] = createSignal<string>('stage');

type SurfaceStore = {
    surfaces: Accessor<Surface[]>;
    registerSurface: (theme: Surface) => void;
    findSurface: (name: string) => Surface;
    surface: Accessor<Surface>;
    setSurface: (name: string) => void;
};

const surfaceByName = (name: string): Surface | undefined => surfaces().find(s => s.name === name);

const findSurface = (name: string): Surface => {
    const found = surfaceByName(name);
    if (!found) {
        throw new ThemesError(`Unknown surface "${name}".`);
    }
    return found;
};

const registerSurface = (surface: Surface): void => {
    if (!surfaceByName(surface.name)) {
        setSurfaces(s => [...s, surface]);
    }
};

export const surfacesStore: SurfaceStore = {
    surfaces,
    findSurface,
    registerSurface,
    surface: () => findSurface(surface()),
    setSurface: (name: string) => {
        findSurface(name);
        setSurface(name);
    },
};
