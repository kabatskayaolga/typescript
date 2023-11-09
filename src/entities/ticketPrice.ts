import { TicketTypeEnum } from '../types';

export default class TicketPrice {
  constructor(
    public type: TicketTypeEnum,
    public price: number
  ) {}
}
