import { BaseMediatorComponent } from '../mediators/cashRegisterMediator';
import { IObservable, IObserver } from '../types';

export abstract class Observable extends BaseMediatorComponent implements IObservable {
  private readonly observers: IObserver[] = [];

  public attach(observer: IObserver): void {
    const isExist = this.observers.includes(observer);
    if (!isExist) this.observers.push(observer);
  }

  public dettach(observer: IObserver): void {
    const observerIndex = this.observers.indexOf(observer);
    if (!~observerIndex) this.observers.splice(observerIndex, 1);
  }

  public notify(): void {
    for (const observer of this.observers) {
      observer.update(this);
    }
  }
}
