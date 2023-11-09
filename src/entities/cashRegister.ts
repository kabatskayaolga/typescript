import { BaseMediatorComponent } from '../mediators/cashRegisterMediator';
import { TicketTypeEnum, IClient } from '../types';

export default class CashRegister extends BaseMediatorComponent {
  tickets: Ticket[] = [];
  private ticketsPrice: { [key: string]: TicketPrice } = {};
  private _dayRevenue: number = 0;

  get dayRevenue(): number {
    return this._dayRevenue;
  }

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

  public selling(ticketType: TicketTypeEnum, client: Ticket['client']): void {
    const ticketPrice = this.ticketsPrice[ticketType];
    if (!ticketPrice) throw new Error('This ticket has not been created');

    const ticket = new Ticket(ticketPrice, client);
    this.tickets.push(ticket);

    if (client) this.mediator.notify(this, 'create visitor', client);
    this._dayRevenue += ticketPrice.price;
  }
}

class Ticket {
  constructor(
    public ticketPrice: TicketPrice,
    public client?: IClient | IClient[]
  ) {}
}

export class TicketPrice {
  constructor(
    public type: TicketTypeEnum,
    public price: number
  ) {}
}
