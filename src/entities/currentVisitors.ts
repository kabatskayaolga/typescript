import { Observable } from '../observable';
import { IClient, NoticeTypeEnum } from '../types';
import Visitor from './visitor';

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
