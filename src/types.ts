export enum TicketTypeEnum {
  EDULT = 'edult',
  CHILD = 'child',
  FAMILY = 'family',
}

export enum NoticeTypeEnum {
  ClosingIn15Minutes = 'Closing in 15 minutes',
  Closed = 'Closing notice',
}

export interface IClient {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
}

export enum EmployeePositionsEnum {
  SELLER = 'seller',
  ADMINISTRATOR = 'administrator',
  ACCOUNTANT = 'accountant',
  VET = 'vet',
  ZOOLOGIST = 'zoologist',
  ZOOPSYCHOLOGIST = 'zoopsychologist',
  ORNITHOLOGIST = 'ornithologist',
  ANIMAL_FEEDING_WORKER = 'animal feeding worker',
  GUARD = 'guard',
}

export enum AnimalKindEnum {
  FOX = 'fox',
  LION = 'lion',
  RABBIT = 'rabbit',
}

export enum HealthEnum {
  GOOD = 'good',
  EXCELENT = 'excelent',
  HAS_SOME_PROBLEMS = 'has some problems',
}

export interface IObserver {
  update(account: IObservable): void;
}

interface IObservable {
  attach(observer: IObserver): void;
  dettach(observer: IObserver): void;
  notify(): void;
}

export abstract class Observable implements IObservable {
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
