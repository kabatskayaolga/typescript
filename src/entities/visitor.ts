import { ClientBase, IClient, IObserver, NoticeTypeEnum } from '../types';
import CurrentVisitors from './currentVisitors';

export default class Visitor extends ClientBase implements IClient, IObserver {
  public update(observer: CurrentVisitors): string {
    let message: string;

    if (observer.actualNotifyType === NoticeTypeEnum.ClosingIn15Minutes) {
      message = `Dear ${this.firstName} ${this.lastName} we will be closed at 15 minutes`;
      console.log(`Dear ${this.firstName} ${this.lastName} we will be closed at 15 minutes`);
    } else {
      message = `Dear ${this.firstName} ${this.lastName}, thank you for coming. See you next time`;
      console.log(`Dear ${this.firstName} ${this.lastName}, thank you for coming. See you next time`);
    }

    return message;
  }
}
