import { Observable } from '../observable';
import { IClient } from '../types';
import Client from './client';

export default class AdvertisingDepartment extends Observable {
  private clients: Client[] = [];
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
