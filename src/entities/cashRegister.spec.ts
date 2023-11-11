import CashRegister from './cashRegister';

describe('CashRegister', () => {
  let cashRegister: CashRegister;

  beforeEach(() => {
    cashRegister = new CashRegister();
  });

  it('should create instans of CashRegister', () => {
    expect(cashRegister).toBeInstanceOf(CashRegister);
  });
});
