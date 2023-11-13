import { EmployeePositionsEnum } from '../types';
import Accounting from './accounting';

const FIRST_NAME = 'Olja';
const LAST_NAME = 'Kabatska';
const POSITION = EmployeePositionsEnum.ACCOUNTANT;
const SALARY = 6666;
const DUTIES = undefined;

describe('Accounting', () => {
  let accounting: Accounting;
  let employees;
  let animals;
  let cashRegister;

  beforeEach(() => {
    employees = [
      {
        firstname: FIRST_NAME,
        lastname: LAST_NAME,
        position: POSITION,
        salary: SALARY,
        duties: DUTIES,
      },
    ];
    animals = [];

    accounting = new Accounting(employees, animals);
    cashRegister = {};
  });
  it('should create instans of Accounting', () => {
    expect(accounting).toBeInstanceOf(Accounting);
  });

  it('should update budget with daily revenue from CashRegister', () => {
    cashRegister.transferToAccounting = jest.fn(() => 100);
    expect(accounting.getDayRevenue(cashRegister)).toBe(100);
  });
  it('should financian report', () => {
    Reflect.defineProperty(accounting, 'budget', { value: 50 });
    expect(accounting.createFinancialReport()).toBe(50);
  });

  it('should calculate and return the total monthly feeding costs', () => {
    expect(accounting.createCostsForFeedingReport()).toBe(0);
  });

  it('should create salaries report', () => {
    expect(accounting.createSalariesReport()).toBe(6666);
  });

  it('should pay salaries', () => {
    employees[0]['paySalary'] = jest.fn();
    expect(accounting.paySalaries()).toBe(-6666);
  });

  it('should buy animals food', () => {
    expect(accounting.buyAnimalFood()).toBe(0);
  });
});
