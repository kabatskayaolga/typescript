import { EmployeePositionsEnum, TicketTypeEnum } from '../types';
import Administration from './administration';
import Employee from './employee';

describe('Administration', () => {
  let administration: Administration;

  const cashRegisterMock = jest.fn().mockImplementation(() => {
    return { addTicketPrice: (): boolean => true };
  });
  const cashRegister = new cashRegisterMock();

  const advertisingDepartmentMock = jest.fn().mockImplementation(() => {
    return { createEMailing: (message: string): string => message };
  });
  const advertisingDepartment = new advertisingDepartmentMock();

  const employee = new Employee('firstname', 'lastname', EmployeePositionsEnum.ACCOUNTANT, 70);

  const animalMock = jest.fn();
  const animal = new animalMock();
  beforeEach(() => {
    administration = new Administration(cashRegister, advertisingDepartment);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should create instans of Administration', () => {
    expect(administration).toBeInstanceOf(Administration);
  });

  it('should add employee', () => {
    administration.addEmployee(employee);
    expect(administration.employees[administration.employees.length - 1]).toBe(employee);
  });

  it('should get employees', () => {
    expect(administration.employees).toStrictEqual([]);
  });

  it('should remove employee', () => {
    administration.removeEmployee(employee.firstname, employee.lastname);
    expect(administration.employees[administration.employees.length - 1]).not.toBe(employee);
  });

  it('should add animal', () => {
    administration.addAnimal(animal);
    expect(administration.animals[administration.animals.length - 1]).toBe(animal);
  });

  it('should get animals', () => {
    expect(administration.employees).toStrictEqual([]);
  });

  it('should remove animal', () => {
    administration.removeAnimal(animal.name);
    expect(administration.animals[administration.animals.length - 1]).not.toBe(animal);
  });

  it('should create new price', () => {
    const addTicketPrice = jest.spyOn(cashRegister, 'addTicketPrice');
    administration.createPrice(TicketTypeEnum.CHILD, 20);

    expect(addTicketPrice).toHaveBeenCalled();
  });

  it('should create advertisition', () => {
    const createEMailing = jest.spyOn(advertisingDepartment, 'createEMailing');
    administration.createAdvertision('message');

    expect(createEMailing).toHaveBeenCalled();
    expect(createEMailing).toHaveBeenCalledWith('message');
  });
});
