import events from 'events';

const eventsEmitter = new events.EventEmitter();

type EventData = void | Record<string, string | number | boolean | Error | unknown>;

type ListenerFn<T extends EventData | undefined> = (data: T) => void;
type UnsubscribeFn = () => void;

function publish<T extends EventData>(name: string, data?: T): void {
    eventsEmitter.emit(name, data);
}

function subscribe<T extends EventData>(name: string, listener: ListenerFn<T>): UnsubscribeFn {
    eventsEmitter.on(name, listener);
    return () => eventsEmitter.off(name, listener);
}

function unsubscribe(name: string, listener: () => void): void {
    eventsEmitter.off(name, listener);
}

export { publish, subscribe, unsubscribe };
