import { IClient, IObserver, NoticeTypeEnum } from '../types';
import CurrentVisitors from './currentVisitors';

export default class Visitor implements IClient, IObserver {
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
