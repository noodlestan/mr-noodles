import { Accessor, batch, createSignal } from 'solid-js';

type Act<T extends unknown[], R> = (...args: T) => Promise<R>;

export type Op<T extends unknown[], R> = {
    act: Act<T, R>;
    acting: Accessor<boolean>;
    error: Accessor<boolean>;
};

export function useAction<T extends unknown[], R>(action: Act<T, R>): Op<T, R> {
    const [promise, setPromise] = createSignal<Promise<R>>();
    const [acting, setActing] = createSignal<boolean>(false);
    const [error, setError] = createSignal<boolean>(false);

    const act = async (...args: T) => {
        if (acting()) {
            return promise() as Promise<R>;
        }

        let p;
        try {
            setActing(true);
            setError(false);
            p = action(...args);
            setPromise(p);
            const r = await p;
            setActing(false);
            return r;
        } catch (err) {
            batch(() => {
                setActing(false);
                setError(true);
            });
            throw err;
        }
    };

    return { act, acting, error };
}
