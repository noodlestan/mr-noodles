export type ColorSource = {
    name: string;
    value: string;
    hs?: [name: string, value: string, resolved: string];
    h?: [name: string, value: string, resolved: string];
    s?: [name: string, value: string, resolved: string];
    l?: [name: string, value: string, resolved: string];
    la?: [name: string, value: string, resolved: string];
    a?: [name: string, value: string, resolved: string];
};

export type TokenSource = {
    name: string;
    token: [name: string, value: string, resolved: string];
};

export type FontFamilySource = {
    name: string;
    token: string;
    value: string;
};

export type FontFamilyVariant = {
    name: string;
    height: [name: string, value: string, resolved: string];
    size: [name: string, value: string, resolved: string];
    weight: [name: string, value: string, resolved: string];
};
