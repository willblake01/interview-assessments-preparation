import { EventEmitter } from './EventEmitter';

describe('EventEmitter', () => {
  it('should emit events to subscribers', () => {
    const emitter = new EventEmitter();
    const callback = jest.fn();

    // Subscribe to an event
    const subscription = emitter.subscribe('testEvent', callback);

    // Emit the event
    emitter.emit('testEvent', ['arg1', 'arg2']);

    // Check if the callback was called with the correct arguments
    expect(callback).toHaveBeenCalledWith('arg1', 'arg2');

    // Unsubscribe from the event
    subscription.unsubscribe();

    // Emit the event again to ensure the callback is no longer called
    emitter.emit('testEvent', ['arg3']);
    expect(callback).toHaveBeenCalledTimes(1); // Should still be 1, as it was unsubscribed
    expect(callback).toHaveBeenCalledWith('arg1', 'arg2');
  });

  it('should handle multiple subscribers for the same event', () => {
    const emitter = new EventEmitter();
    const callback1 = jest.fn();
    const callback2 = jest.fn();

    // Subscribe two callbacks to the same event
    emitter.subscribe('testEvent', callback1);
    emitter.subscribe('testEvent', callback2);

    // Emit the event
    emitter.emit('testEvent', ['arg1']);

    // Check if both callbacks were called with the correct arguments
    expect(callback1).toHaveBeenCalledWith('arg1');
    expect(callback2).toHaveBeenCalledWith('arg1');
    expect(callback1).toHaveBeenCalledTimes(1);
    expect(callback2).toHaveBeenCalledTimes(1)});
  });

  it('should not call callbacks for events that have no subscribers', () => {
    const emitter = new EventEmitter();
    const callback = jest.fn();

    // Emit an event with no subscribers
    emitter.emit('nonExistentEvent', ['arg1']);

    // Check that the callback was not called
    expect(callback).not.toHaveBeenCalled();
  });

  it('should handle multiple events with different subscribers', () => {
    const emitter = new EventEmitter();
    const callback1 = jest.fn();
    const callback2 = jest.fn();

    // Subscribe to different events
    emitter.subscribe('event1', callback1);
    emitter.subscribe('event2', callback2);

    // Emit the first event
    emitter.emit('event1', ['arg1']);
    expect(callback1).toHaveBeenCalledWith('arg1');
    expect(callback2).not.toHaveBeenCalled();

    // Emit the second event
    emitter.emit('event2', ['arg2']);
    expect(callback1).toHaveBeenCalledTimes(1); // Should still be 1
    expect(callback2).toHaveBeenCalledWith('arg2');
  });
