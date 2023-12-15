import { useSurfacesContext } from '../../providers/SurfaceProvider';
import type { Surface } from '../../types';
import { surfacesStore } from '../stores/surfacesStore';

const surfaceNames = (surface: Surface): string[] => {
    const { findSurface } = surfacesStore;

    return [surface.name, ...surface.extends.flatMap(s => surfaceNames(findSurface(s)))];
};

export const surfaceClassNames = (): string[] => {
    const { surface } = useSurfacesContext();

    return ['Surface', ...surfaceNames(surface()).map(s => `Surface--${s}`)];
};
