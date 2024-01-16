type Event = {
    name: string;
};

type EventMap<T> = Record<string, (ev: T) => void>;

export function makeEventListener<T extends Event>(map: EventMap<T>) {
    return (ev: T): void => {
        const { name } = ev;
        const handler = map[name];
        handler(ev);
    };
}
