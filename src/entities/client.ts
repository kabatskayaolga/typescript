import { IClient, IObserver } from '../types';
import AdvertisingDepartment from './advertisingDepartment';

export default class Client implements IClient, IObserver {
  constructor(
    public firstName: string,
    public lastName: string,
    public phone: string,
    public email: string
  ) {}

  public update(observer: AdvertisingDepartment): void {
    console.log(` mailto: ${this.email}; 
                  body: Dear ${this.firstName} ${this.lastName}, ${observer.actualMessage}`);
  }
}
