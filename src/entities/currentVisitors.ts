import { IClient, IObserver, NoticeTypeEnum, Observable } from '../types';

export default class CurrentVisitors extends Observable {
  public visitors: Visitor[] = [];
  public actualNotifyType: NoticeTypeEnum;

  public addVisitor({ firstName, lastName, phone, email }: IClient): void {
    const visitor = new Visitor(firstName, lastName, phone, email);
    this.visitors.push(visitor);
    this.attach(visitor);
  }

  public removeVisitors(): void {
    this.visitors = [];
  }

  public noticeClients(type: NoticeTypeEnum): void {
    this.actualNotifyType = type;
    this.notify();
  }
}

class Visitor implements IClient, IObserver {
  constructor(
    public firstName: string,
    public lastName: string,
    public phone: string,
    public email: string
  ) {}

  public update(observer: CurrentVisitors): void {
    if (observer.actualNotifyType === NoticeTypeEnum.ClosingIn15Minutes) {
      console.log(`Dear ${this.firstName} ${this.lastName} we will be closed at 15 minutes`);
    } else {
      console.log(`Dear ${this.firstName} ${this.lastName}, thank you for coming. See you next time`);
    }
  }
}
