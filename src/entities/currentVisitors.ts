import { IClient, NoticeTypeEnum } from '../types';

export default class CurrentVisitors {
  public visitors: Visitor[] = [];

  public addVisitor({ firstName, lastName, phone, email }: IClient): void {
    const visitor = new Visitor(firstName, lastName, phone, email);
    this.visitors.push(visitor);
  }

  public removeVisitors(): void {
    this.visitors = [];
  }

  public noticeClients(type: NoticeTypeEnum): void {
    for (let index = 0; index < this.visitors.length; index++) {
      const visitor = this.visitors[index];
      if (type === NoticeTypeEnum.ClosingIn15Minutes) {
        visitor?.noticeClosing();
      } else {
        visitor?.noticeThankForVisiting();
      }
    }

    if (type === NoticeTypeEnum.Closed) this.removeVisitors();
  }
}

class Visitor implements IClient {
  constructor(
    public firstName: string,
    public lastName: string,
    public phone: string,
    public email: string
  ) {}

  public noticeClosing(): void {
    console.log(`Dear ${this.firstName} ${this.lastName} we will be closed at 15 minutes`);
  }

  public noticeThankForVisiting(): void {
    console.log(`Dear ${this.firstName} ${this.lastName}, thank you for coming. See you next time`);
  }
}
