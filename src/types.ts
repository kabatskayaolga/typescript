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

export interface IBuilder<T> {
  build(): T;
  reset(): void;
}
