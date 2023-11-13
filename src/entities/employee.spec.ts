import { EmployeePositionsEnum } from '../types';
import Employee from './employee';

const FIRST_NAME = 'Olja';
const LAST_NAME = 'Kabatska';
const POSITION = EmployeePositionsEnum.ACCOUNTANT;
const SALARY = 6666;
const DUTIES = undefined;

describe('Employee', () => {
  let employee: Employee;

  beforeEach(() => {
    employee = new Employee(FIRST_NAME, LAST_NAME, POSITION, SALARY, DUTIES);
  });

  it('should create instans of Employee', () => {
    expect(employee).toBeInstanceOf(Employee);
  });

  it('should have correct properties', () => {
    expect(employee.firstname).toBe(FIRST_NAME);
    expect(employee.lastname).toBe(LAST_NAME);
    expect(employee.position).toBe(POSITION);
    expect(employee.salary).toBe(SALARY);
  });

  it('should set duties', () => {
    expect(employee.duties).toStrictEqual(['generate financial reports']);
  });
});
