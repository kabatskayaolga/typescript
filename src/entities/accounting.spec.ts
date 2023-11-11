import Accounting from './accounting';

describe('Accounting', () => {
  let accounting: Accounting;

  const employeesMock = jest.fn();
  const employees = new employeesMock();

  const animalsMock = jest.fn();
  const animals = new animalsMock();

  beforeEach(() => {
    accounting = new Accounting(employees, animals);
  });

  it('should create instans of Accounting', () => {
    expect(accounting).toBeInstanceOf(Accounting);
  });
});
