import Administration from './administration';

describe('Administration', () => {
  let administration: Administration;

  const cashRegisterMock = jest.fn();
  const cashRegister = new cashRegisterMock();

  const advertisingDepartmentMock = jest.fn();
  const advertisingDepartment = new advertisingDepartmentMock();

  beforeEach(() => {
    administration = new Administration(cashRegister, advertisingDepartment);
  });

  it('should create instans of Administration', () => {
    expect(administration).toBeInstanceOf(Administration);
  });
});
