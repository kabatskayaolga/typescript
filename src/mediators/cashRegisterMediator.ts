import AdvertisingDepartment from '../entities/advertisingDepartment';
import CashRegister from '../entities/cashRegister';
import CurrentVisitors from '../entities/currentVisitors';
import { IClient, IMediator } from '../types';

export default class CashRegisterMediator implements IMediator {
  private cashRegister: CashRegister;
  private currentVisitors: CurrentVisitors;
  private advertisingDepartment: AdvertisingDepartment;

  constructor(
    cashRegister: CashRegister,
    currentVisitors: CurrentVisitors,
    advertisingDepartment: AdvertisingDepartment
  ) {
    this.cashRegister = cashRegister;
    this.cashRegister.setMediator(this);

    this.currentVisitors = currentVisitors;
    this.currentVisitors.setMediator(this);

    this.advertisingDepartment = advertisingDepartment;
    this.advertisingDepartment.setMediator(this);
  }

  private addClient(client: IClient): void {
    this.currentVisitors.addVisitor(client);
    this.advertisingDepartment.addClient(client);
  }

  notify(_sender: object, event: string, data: IClient | IClient[]): void {
    if (event === 'create visitor') {
      if (data instanceof Array) {
        data.forEach(client => {
          this.addClient(client);
        });
      } else {
        this.addClient(data);
      }
    }
  }
}

export class BaseMediatorComponent {
  protected mediator: IMediator;

  constructor(mediator?: IMediator) {
    this.mediator = mediator!;
  }

  public setMediator(mediator: IMediator): void {
    this.mediator = mediator;
  }
}
