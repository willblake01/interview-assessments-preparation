import { Order, User } from './';

export type EventType = 'userSignedUp' | 'orderPlaced';
export type EventPayload = Record<string, unknown>;
export type EventHandler = (payload: EventPayload) => void;

export type EventMap = {
  userSignedUp: User;
  orderPlaced: Order;
};
