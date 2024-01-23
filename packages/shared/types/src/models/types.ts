export type Root = {
    date: Date;
    id: string;
    path: string;
    name: string;
    owner?: string;
    system?: boolean;
};

export type Roots = Map<string, Root>;

export type Noodle = {
    id: string;
    type: 'user' | 'folder' | 'file' | string;
    filename: string;
    root: string;
    owner: string;
};

export type Noodles = Map<string, Noodle>;

export type Matcher = (data: unknown) => boolean;
export type Factory = (data: unknown, root: Root, filename?: string) => Noodle;
export type Importer = (data: unknown) => Noodle;
export type Exporter = (noodle: Noodle) => unknown;

export type Mapper = {
    name: string;
    match: Matcher;
    factory: Factory;
    import: Importer;
    export: Exporter;
};

export type FilterFn = (noodle: Noodle) => boolean;
export type LatLong = { lat: number; long: number };
