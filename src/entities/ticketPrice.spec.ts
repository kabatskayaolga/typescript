import { TicketTypeEnum } from '../types';
import TicketPrice from './ticketPrice';

const TYPE = TicketTypeEnum.CHILD;
const PRICE = 67;

describe('TicketPrice', () => {
  let ticketPrice: TicketPrice;

  beforeEach(() => {
    ticketPrice = new TicketPrice(TYPE, PRICE);
  });

  it('should create instans of TicketPrice', () => {
    expect(ticketPrice).toBeInstanceOf(TicketPrice);
  });

  it('should have correct properties', () => {
    expect(ticketPrice.type).toBe(TYPE);
    expect(ticketPrice.price).toBe(PRICE);
  });
});
