import { BaseMediatorComponent } from '../mediators/cashRegisterMediator';
import { IClient, TicketTypeEnum } from '../types';
import Ticket from './ticket';
import TicketPrice from './ticketPrice';

export default class CashRegister extends BaseMediatorComponent {
  public tickets: Ticket[] = [];
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

  private selling(ticketType: TicketTypeEnum, client?: IClient | [IClient, IClient]): void {
    const ticketPrice = this.ticketsPrice[ticketType];
    if (!ticketPrice) throw new Error('This ticket has not been created');

    const ticket = new Ticket(ticketPrice, client);
    this.tickets.push(ticket);

    if (client) this.mediator.notify(this, 'create visitor', client);
    this._dayRevenue += ticketPrice.price;
  }

  public sellChildTicket(): void {
    this.selling(TicketTypeEnum.CHILD);
  }

  public sellEdultTicket(client: IClient): void {
    this.selling(TicketTypeEnum.EDULT, client);
  }

  public sellFamilyTicket(client: IClient | [IClient, IClient]): void {
    this.selling(TicketTypeEnum.FAMILY, client);
  }
}
