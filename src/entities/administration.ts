import { TicketTypeEnum } from '../types';
import AdvertisingDepartment from './advertisingDepartment';
import Animal from './animal';
import CashRegister from './cashRegister';
import Employee from './employee';

export default class Administration {
  employees: Employee[] = [];
  animals: Animal[] = [];

  constructor(
    private cashRegister: CashRegister,
    private advertisingDepartment: AdvertisingDepartment
  ) {}

  public setCashRegister(cashRegister: CashRegister): void {
    this.cashRegister = cashRegister;
  }

  public setAdvertisingDepartment(advertisingDepartment: AdvertisingDepartment): void {
    this.advertisingDepartment = advertisingDepartment;
  }

  public addEmployee(employee: Employee): void {
    this.employees.push(employee);
  }

  public removeEmployee(firstname: Employee['firstname'], lastname: Employee['lastname']): void {
    this.employees.filter(employee => employee.firstname !== firstname && employee.lastname !== lastname);
  }

  public addAnimal(animal: Animal): void {
    this.animals.push(animal);
  }

  public removeAnimal(name: Animal['name']): void {
    this.animals.filter(animal => animal.name !== name);
  }

  public createPrice(ticketType: TicketTypeEnum, price: number): void {
    this.cashRegister.addTicketPrice(ticketType, price);
  }

  public createAdvertision(message: string): void {
    this.advertisingDepartment.createEMailing(message);
  }
}
