import { IClient } from '../types';
import TicketPrice from './ticketPrice';

export default class Ticket {
  constructor(
    public ticketPrice: TicketPrice,
    public client?: IClient | [IClient, IClient]
  ) {}
}
