type EventCallback = (...args: unknown[]) => void;
type Subscription = {
    unsubscribe: () => void;
};

export class EventEmitter {
    map = new Map<string, EventCallback[]>();

    /**
     * @param {string} eventName
     * @param {Function} callback
     * @return {Object}
     */
    subscribe(eventName: string, callback: EventCallback): Subscription {
        if (!this.map.has(eventName)) {
            this.map.set(eventName, []);
        }
        
        const arr = this.map.get(eventName)!;
        arr.push(callback);

        return {
            unsubscribe: () => arr.splice(arr.indexOf(callback), 1)
        };
    }
    
    /**
     * @param {string} eventName
     * @param {Array} args
     * @return {Array}
     */
    emit(eventName: string, args: unknown[]): unknown[] {
        const handlers = this.map.get(eventName);

        if (!handlers) {
            return [];
        }
        return handlers.map(handler => handler(...args));
    }
}
