import { TicketTypeEnum } from '../types';
import AdvertisingDepartment from './advertisingDepartment';
import Animal from './animal';
import CashRegister from './cashRegister';
import Employee from './employee';

export default class Administration {
  public _employees: Employee[] = [];
  public _animals: Animal[] = [];

  get employees(): Employee[] {
    return this._employees;
  }

  get animals(): Animal[] {
    return this._animals;
  }

  constructor(
    private cashRegister: CashRegister,
    private advertisingDepartment: AdvertisingDepartment
  ) {}

  public addEmployee(employee: Employee): void {
    this._employees.push(employee);
  }

  public removeEmployee(firstname: Employee['firstname'], lastname: Employee['lastname']): void {
    this._employees.filter(employee => employee.firstname !== firstname && employee.lastname !== lastname);
  }

  public addAnimal(animal: Animal): void {
    this._animals.push(animal);
  }

  public removeAnimal(name: Animal['name']): void {
    this._animals.filter(animal => animal.name !== name);
  }

  public createPrice(ticketType: TicketTypeEnum, price: number): void {
    this.cashRegister.addTicketPrice(ticketType, price);
  }

  public createAdvertision(message: string): void {
    this.advertisingDepartment.createEMailing(message);
  }
}
