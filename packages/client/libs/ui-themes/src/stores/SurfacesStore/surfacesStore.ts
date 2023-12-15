import { surfacesStore as privateStore } from '../../private/stores/surfacesStore';
import { Surface } from '../../types';

type surfacesStore = {
    registerSurface: (surface: Surface) => void;
};

const { registerSurface } = privateStore;

export const surfacesStore: surfacesStore = {
    registerSurface,
};
