import { EventHandler, EventPayload, EventType } from "./types"; 

export class EventBus<EventMap extends Record<EventType, EventPayload> = Record<EventType, EventPayload>> {
    private subscribers: Map<EventType, EventHandler[]> = new Map();

    // Emit an event to all subscribers, often synonymous with emit()
    publish<K extends EventType>(event: K, payload: EventMap[K]): void {
        const handlers = this.subscribers.get(event) || [];

        for (const handler of handlers) {
            try {
                handler(payload);
            } catch (error) {
                console.error(`Error occurred while handling event '${event}':`, error);
            }
        }
    };

    // Register a listener (sometimes returns a function to unsubscribe)
    subscribe<K extends EventType>(event: K, handler: EventHandler): void {
        const handlers = this.subscribers.get(event) || [];

        handlers.push(handler);
        this.subscribers.set(event, handlers);
    };

    // Remove a specific handler for an event
    unsubscribe<K extends EventType>(event: K, handler: EventHandler): void {
        const handlers = this.subscribers.get(event) || [];

        this.subscribers.set(
            event,
            handlers.filter(h => h !== handler)
        );
    };

    // Alias of subscribe, or can be used to add a listener
    on(event: EventType, handler: EventHandler): void {
        
    };

    // Listen only the first time the event is emitted
    once<K extends EventType>(event: K, handler: EventHandler): void {
        const onceHandler = (payload: EventPayload) => {
            handler(payload);
            this.unsubscribe(event, onceHandler);
        };

        this.subscribe(event, onceHandler);
    };

    // Alias of unsubscribe, or can be used to remove a listener
    off<K extends EventType>(event: K, handler: EventHandler): void {
        this.unsubscribe(event, handler);
    };

    // Remove all listeners (optionally for a specific event)
    clear<K extends EventType>(event?: K): void {
        if (event) {
            this.subscribers.delete(event);
        } else {
            this.subscribers.clear();
        }
    };

    // Returns true if any listeners are registered for the event
    hasSubscribers<K extends EventType>(event: K): boolean {
        return (this.subscribers.get(event) || []).length > 0;
    };
};
