import { ClientBase, IClient, IObserver } from '../types';
import AdvertisingDepartment from './advertisingDepartment';

export default class Client extends ClientBase implements IClient, IObserver {
  public update(observer: AdvertisingDepartment): string {
    console.log(` mailto: ${this.email}; 
                  body: Dear ${this.firstName} ${this.lastName}, ${observer.actualMessage}`);
    return observer.actualMessage;
  }
}
