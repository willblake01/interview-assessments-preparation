import { EventBus } from './EventBus';

describe('EventBus', () => {
  describe('publish', () => {
    it('should call all handlers for the event', () => {
      const bus = new EventBus();
      const handler1 = jest.fn();
      const handler2 = jest.fn();

      bus.subscribe('userSignedUp', handler1);
      bus.subscribe('userSignedUp', handler2);

      bus.publish('userSignedUp', { data: 'test' });

      expect(handler1).toHaveBeenCalledWith({ data: 'test' });
      expect(handler2).toHaveBeenCalledWith({ data: 'test' });
    });

    it('should not call handlers for other events', () => {
      const bus = new EventBus();
      const handler1 = jest.fn();
      const handler2 = jest.fn();

      bus.subscribe('userSignedUp', handler1);
      bus.subscribe('orderPlaced', handler2);

      bus.publish('userSignedUp', { data: 'test1' });
      bus.publish('orderPlaced', { data: 'test2' });

      expect(handler1).toHaveBeenCalledWith({ data: 'test1' });
      expect(handler2).toHaveBeenCalledWith({ data: 'test2' });
    });

    it('should handle errors in handlers gracefully', () => {
      const bus = new EventBus();
      const handler1 = jest.fn(() => { throw new Error('Handler error'); });
      const handler2 = jest.fn();

      bus.subscribe('userSignedUp', handler1);
      bus.subscribe('userSignedUp', handler2);

      console.error = jest.fn(); // Mock console.error

      bus.publish('userSignedUp', { data: 'test' });

      expect(console.error).toHaveBeenCalledWith(expect.stringContaining("Error occurred while handling event 'userSignedUp':"), expect.any(Error));
      expect(handler2).toHaveBeenCalledWith({ data: 'test' });
    });
  });
  
  describe('subscribe', () => {
    it('should add a handler for an event', () => {
      const bus = new EventBus();
      const handler = jest.fn();

      bus.subscribe('userSignedUp', handler);
      bus.publish('userSignedUp', { data: 'test' });

      expect(handler).toHaveBeenCalledWith({ data: 'test' });
    });
  });

  describe('unsubscribe', () => {
    it('should remove a specific handler for an event', () => {
      const bus = new EventBus();
      const handler = jest.fn();

      bus.subscribe('userSignedUp', handler);
      bus.unsubscribe('userSignedUp', handler);
      bus.publish('userSignedUp', { data: 'test' });

      expect(handler).not.toHaveBeenCalled();
    });
  });
    
  describe('once', () => {
    it('should call the handler only once', () => {
        const bus = new EventBus();
        const handler = jest.fn();

        bus.once('userSignedUp', handler);
        bus.publish('userSignedUp', { data: 'test' });
        bus.publish('userSignedUp', { data: 'test2' });

        expect(handler).toHaveBeenCalledTimes(1);
        expect(handler).toHaveBeenCalledWith({ data: 'test' });
    });

    it('should remove the handler after it is called', () => {
        const bus = new EventBus();
        const handler = jest.fn();

        bus.once('userSignedUp', handler);
        bus.publish('userSignedUp', { data: 'test' });

        expect(handler).toHaveBeenCalledTimes(1);
        expect(handler).toHaveBeenCalledWith({ data: 'test' });

        bus.publish('userSignedUp', { data: 'test2' });
        expect(handler).toHaveBeenCalledTimes(1);
        expect(handler).not.toHaveBeenCalledWith({ data: 'test2' });
    });
  });

  describe('off', () => {
    it('should remove a specific handler for an event', () => {
      const bus = new EventBus();
      const handler = jest.fn();

      bus.subscribe('userSignedUp', handler);
      bus.off('userSignedUp', handler);
      bus.publish('userSignedUp', { data: 'test' });

      expect(handler).not.toHaveBeenCalled();
    });
  });

  describe('clear', () => {
    it('should remove all handlers for a specific event', () => {
      const bus = new EventBus();
      const handler = jest.fn();

      bus.subscribe('userSignedUp', handler);
      bus.clear('userSignedUp');
      bus.publish('userSignedUp', { data: 'test' });

      expect(handler).not.toHaveBeenCalled();
    });

    it('should remove all handlers if no event is specified', () => {
      const bus = new EventBus();
      const handler1 = jest.fn();
      const handler2 = jest.fn();

      bus.subscribe('userSignedUp', handler1);
      bus.subscribe('orderPlaced', handler2);
      bus.clear();

      bus.publish('userSignedUp', { data: 'test1' });
      bus.publish('orderPlaced', { data: 'test2' });

      expect(handler1).not.toHaveBeenCalled();
      expect(handler2).not.toHaveBeenCalled();
    });
  });

  describe('hasSubscribers', () => {
    it('should return true if there are subscribers for an event', () => {
      const bus = new EventBus();
      const handler = jest.fn();

      bus.subscribe('userSignedUp', handler);
      expect(bus.hasSubscribers('userSignedUp')).toBe(true);
    });

    it('should return false if there are no subscribers for an event', () => {
      const bus = new EventBus();
      expect(bus.hasSubscribers('userSignedUp')).toBe(false);
    });
  });
});
