import { IClient, IObserver, Observable } from '../types';

export default class AdvertisingDepartment extends Observable {
  clients: Client[] = [];
  public actualMessage: string;

  public addClient({ firstName, lastName, phone, email }: IClient): void {
    const client = new Client(firstName, lastName, phone, email);
    this.clients.push(client);

    this.attach(client);
  }

  public createEMailing(message: string): void {
    this.actualMessage = message;
    this.notify();
  }
}

class Client implements IClient, IObserver {
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
