type EventType = 'userSignedUp' | 'orderPlaced';
type EventPayload = Record<string, unknown>;
type EventHandler = (payload: EventPayload) => void;

export class EventBus {
    private subscribers: Map<EventType, EventHandler[]> = new Map();

    // Emit an event to all subscribers, often synonymous with emit()
    publish(event: EventType, payload: EventPayload): void {
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
    subscribe(event: EventType, handler: EventHandler): void {
        const handlers = this.subscribers.get(event) || [];

        handlers.push(handler);
        this.subscribers.set(event, handlers);
    };

    // Remove a specific handler for an event
    unsubscribe(event: EventType, handler: EventHandler):void {
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
    once(event: EventType, handler: EventHandler): void {
        const onceHandler = (payload: EventPayload) => {
            handler(payload);
            this.unsubscribe(event, onceHandler);
        };

        this.subscribe(event, onceHandler);
    };

    // Alias of unsubscribe, or can be used to remove a listener
    off(event: EventType, handler: EventHandler): void {
        this.unsubscribe(event, handler);
    };

    // Remove all listeners (optionally for a specific event)
    clear(event?: EventType): void {
        if (event) {
            this.subscribers.delete(event);
        } else {
            this.subscribers.clear();
        }
    };

    // Returns true if any listeners are registered for the event 
    hasSubscribers(event: EventType): boolean {
        return (this.subscribers.get(event) || []).length > 0;
    };
};
