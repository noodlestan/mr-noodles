export type Root = {
    path: string;
    name: string;
    owner?: string;
    system?: boolean;
};

export type Roots = Map<string, Root>;

export type Noodle = {
    id: string;
    type: 'user' | 'folder' | string;
    filename: string;
};

export type Noodles = Map<string, Noodle>;

export type Matcher = (data: Noodle) => boolean;
export type Mapper = (data: unknown) => Noodle;

export type Mappers = Array<{ name: string; match: Matcher; map: Mapper }>;

export type FilterFn = (noodle: Noodle) => boolean;
