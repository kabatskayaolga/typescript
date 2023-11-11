import { TicketTypeEnum } from '../types';
import Client from './client';
import Ticket from './ticket';
import TicketPrice from './ticketPrice';

describe('Ticket', () => {
  let ticketPrice: TicketPrice;

  describe('Ticket for child', () => {
    let ticket: Ticket;
    beforeEach(() => {
      ticketPrice = new TicketPrice(TicketTypeEnum.CHILD, 2);
      ticket = new Ticket(ticketPrice, undefined);
    });

    it('should create instans of Ticket', () => {
      expect(ticket).toBeInstanceOf(Ticket);
    });

    it('should have correct properties', () => {
      expect(ticket.ticketPrice).toBe(ticketPrice);
      expect(ticket.client).toBeUndefined();
    });
  });

  describe('Ticket for Edult', () => {
    let ticket: Ticket;
    beforeEach(() => {
      ticketPrice = new TicketPrice(TicketTypeEnum.EDULT, 2);
      ticket = new Ticket(ticketPrice, new Client('FIRS', 'd', 'd', 'd'));
    });

    it('should create instans of Ticket', () => {
      expect(ticket).toBeInstanceOf(Ticket);
    });

    it('should have correct properties', () => {
      expect(ticket.ticketPrice).toBe(ticketPrice);
      expect(ticket.client).not.toBeUndefined();
    });
  });
});
