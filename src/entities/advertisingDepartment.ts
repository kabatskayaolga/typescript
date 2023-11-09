import { IClient } from '../types';

export default class AdvertisingDepartment {
  clients: Client[] = [];

  public addClient({ firstName, lastName, phone, email }: IClient): void {
    const client = new Client(firstName, lastName, phone, email);
    this.clients.push(client);
  }

  public createEMailing(message: string): void {
    for (let i = 0; i < this.clients.length; i++) {
      const client = this.clients[i];

      client?.sendEmail(message);
    }
  }
}

class Client implements IClient {
  constructor(
    public firstName: string,
    public lastName: string,
    public phone: string,
    public email: string
  ) {}

  public sendEmail(message: string): void {
    console.log(` mailto: ${this.email}; 
                  body: Dear ${this.firstName} ${this.lastName}, ${message}`);
  }
}
