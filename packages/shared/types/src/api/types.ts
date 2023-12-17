export type APIMeta = string | number | boolean;

export type APIResponseMeta = { [key: string]: APIMeta };

export type APIResponse<T> = {
    data: T;
    meta: APIResponseMeta;
};

export type Query = {
    [key: string]: string | number | boolean | undefined;
};
