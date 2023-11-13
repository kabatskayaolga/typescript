import { TicketTypeEnum } from '../types';
import CashRegister from './cashRegister';

const FIRST_NAME = 'Olja';
const LAST_NAME = 'Kabatska';
const PHONE = '232143423';
const EMAIL = 'jnj@jj.kk';

describe('CashRegister', () => {
  let cashRegister: CashRegister;

  beforeEach(() => {
    cashRegister = new CashRegister();
    cashRegister['mediator'] = { notify: jest.fn() };
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should create instans of CashRegister', () => {
    expect(cashRegister).toBeInstanceOf(CashRegister);
  });

  it('should add child ticket ', () => {
    cashRegister.addTicketPrice(TicketTypeEnum.CHILD, 10);
    cashRegister.sellChildTicket();

    expect(cashRegister.tickets.length).toBe(1);
    expect(cashRegister.dayRevenue).toBe(10);
  });

  it('should add edult ticket ', () => {
    cashRegister.addTicketPrice(TicketTypeEnum.EDULT, 20);
    cashRegister.sellEdultTicket({
      firstName: FIRST_NAME,
      lastName: LAST_NAME,
      phone: PHONE,
      email: EMAIL,
    });

    expect(cashRegister.tickets.length).toBe(1);
    expect(cashRegister.dayRevenue).toBe(20);
  });

  it('should add family ticket ', () => {
    cashRegister.addTicketPrice(TicketTypeEnum.FAMILY, 40);
    cashRegister.sellFamilyTicket([
      {
        firstName: FIRST_NAME,
        lastName: LAST_NAME,
        phone: PHONE,
        email: EMAIL,
      },
      {
        firstName: FIRST_NAME,
        lastName: LAST_NAME,
        phone: PHONE,
        email: EMAIL,
      },
    ]);

    expect(cashRegister.tickets.length).toBe(1);
    expect(cashRegister.dayRevenue).toBe(40);
  });

  it('should transfer dayRevenue To Accounting', () => {
    cashRegister.addTicketPrice(TicketTypeEnum.CHILD, 10);
    cashRegister.sellChildTicket();

    expect(cashRegister.transferToAccounting()).toBe(10);
    expect(cashRegister.dayRevenue).toBe(0);
  });
});
