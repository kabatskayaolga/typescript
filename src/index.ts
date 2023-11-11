import Administration from './entities/administration';
import Accounting from './entities/accounting';
import AdvertisingDepartment from './entities/advertisingDepartment';
import CashRegister from './entities/cashRegister';
import CurrentVisitors from './entities/currentVisitors';
import Animal from './entities/animal';
import { AnimalKindEnum, EmployeePositionsEnum, HealthEnum, NoticeTypeEnum, TicketTypeEnum } from './types';
import Employee from './entities/employee';
import CashRegisterMediator from './mediators/cashRegisterMediator';

class Zoo {
  public advertisingDepartment: AdvertisingDepartment;
  public currentVisitors: CurrentVisitors;
  public cashRegister: CashRegister;
  public administration: Administration;
  public accounting: Accounting;

  constructor() {
    this.advertisingDepartment = new AdvertisingDepartment();
    this.currentVisitors = new CurrentVisitors();
    this.cashRegister = new CashRegister();
    this.administration = new Administration(this.cashRegister, this.advertisingDepartment);
    this.accounting = new Accounting(this.administration.employees, this.administration.animals);
    new CashRegisterMediator(this.cashRegister, this.currentVisitors, this.advertisingDepartment);
  }
}

const zoo = new Zoo();
const fox = new Animal('fox1', 12, AnimalKindEnum.FOX, HealthEnum.GOOD, 200);
const lion = new Animal('lion', 1, AnimalKindEnum.LION, HealthEnum.GOOD, 200);

zoo.administration.addAnimal(fox);
zoo.administration.addAnimal(lion);

const feedingWorker = new Employee('John', 'Loh', EmployeePositionsEnum.ANIMAL_FEEDING_WORKER, 200);
const accountant = new Employee('Loh', 'Ha', EmployeePositionsEnum.ACCOUNTANT, 300);

zoo.administration.addEmployee(feedingWorker);
zoo.administration.addEmployee(accountant);

zoo.administration.createPrice(TicketTypeEnum.EDULT, 10);
zoo.administration.createPrice(TicketTypeEnum.CHILD, 5);
zoo.administration.createPrice(TicketTypeEnum.FAMILY, 20);

zoo.cashRegister.sellEdultTicket({
  firstName: 'LAla',
  lastName: 'Alal',
  phone: '2323234234',
  email: 'ewewe',
});

for (let index = 0; index < 100; index++) {
  zoo.cashRegister.sellChildTicket();
}
zoo.cashRegister.sellFamilyTicket([
  {
    firstName: 'mom',
    lastName: 'mom',
    phone: '2323234234',
    email: 'ewewe',
  },
  {
    firstName: 'dad',
    lastName: 'dad',
    phone: '2323234234',
    email: 'ewewe',
  },
]);

zoo.advertisingDepartment.createEMailing('Wellcome, We are waiting for you');

zoo.currentVisitors.noticeClients(NoticeTypeEnum.ClosingIn15Minutes);
zoo.currentVisitors.noticeClients(NoticeTypeEnum.Closed);

zoo.accounting.paySalaries();

zoo.accounting.getDayRevenue(zoo.cashRegister);

zoo.accounting.createFinancialReport();
zoo.accounting.createCostsForFeedingReport();
zoo.accounting.createSalariesReport();
zoo.administration.createAdvertision('Sale only Today');
