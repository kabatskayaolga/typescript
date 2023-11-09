import { TicketTypeEnum, IClient } from '../types';

import AdvertisingDepartment from './advertisingDepartment';
import CurrentVisitors from './currentVisitors';

export default class CashRegister {
  tickets: Ticket[] = [];
  private ticketsPrice: { [key: string]: TicketPrice } = {};
  private _dayRevenue: number = 0;

  get dayRevenue(): number {
    return this._dayRevenue;
  }

  constructor(
    private advertisingDepartment: AdvertisingDepartment,
    private currentVisitors: CurrentVisitors
  ) {}

  public transferToAccounting(): number {
    const balance = this._dayRevenue;
    this._dayRevenue = 0;
    return balance;
  }

  public addTicketPrice(ticketType: TicketTypeEnum, price: number): void {
    if (ticketType in this.tickets) throw new Error('this ticket has benn already created');

    const ticketPrice = new TicketPrice(ticketType, price);

    this.ticketsPrice[ticketType] = ticketPrice;
  }

  private addClient(client: IClient): void {
    this.currentVisitors.addVisitor(client);
    this.advertisingDepartment.addClient(client);
  }

  public selling(ticketType: TicketTypeEnum, client: Ticket['client']): void {
    const ticketPrice = this.ticketsPrice[ticketType];
    if (!ticketPrice) throw new Error('This ticket has not been created');

    const ticket = new Ticket(ticketPrice, client);
    this.tickets.push(ticket);
    if (client) client instanceof Array ? client.forEach(client => this.addClient(client)) : this.addClient(client);

    this._dayRevenue += ticketPrice.price;
  }
}

class Ticket {
  constructor(
    public ticketPrice: TicketPrice,
    public client: IClient | IClient[] | undefined
  ) {}
}

export class TicketPrice {
  constructor(
    public type: TicketTypeEnum,
    public price: number
  ) {}
}
