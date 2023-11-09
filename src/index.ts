import Administration from './entities/administration';
import Accounting from './entities/accounting';
import AdvertisingDepartment from './entities/advertisingDepartment';
import CashRegister from './entities/cashRegister';
import CurrentVisitors from './entities/currentVisitors';
import Animal from './entities/animal';
import { AnimalKindEnum, EmployeePositionsEnum, HealthEnum, NoticeTypeEnum, TicketTypeEnum } from './types';
import Employee from './entities/employee';

const advertisingDepartment = new AdvertisingDepartment();
const currentVisitors = new CurrentVisitors();
const cashRegister = new CashRegister(advertisingDepartment, currentVisitors);
const administration = new Administration(cashRegister, advertisingDepartment);
const accounting = new Accounting(administration.employees, administration.animals);

const fox = new Animal('fox1', 12, AnimalKindEnum.FOX, HealthEnum.GOOD, 200);
const lion = new Animal('lion', 1, AnimalKindEnum.LION, HealthEnum.GOOD, 200);
administration.addAnimal(fox);
administration.addAnimal(lion);

const feedingWorker = new Employee('John', 'Loh', EmployeePositionsEnum.ANIMAL_FEEDING_WORKER, 200);
const accountant = new Employee('Loh', 'Ha', EmployeePositionsEnum.ACCOUNTANT, 300);
administration.addEmployee(feedingWorker);

administration.createPrice(TicketTypeEnum.EDULT, 10);
administration.createPrice(TicketTypeEnum.CHILD, 5);
administration.createPrice(TicketTypeEnum.FAMILY, 20);

cashRegister.selling(TicketTypeEnum.EDULT, {
  firstName: 'LAla',
  lastName: 'Alal',
  phone: '2323234234',
  email: 'ewewe',
});

cashRegister.selling(TicketTypeEnum.CHILD, undefined);
cashRegister.selling(TicketTypeEnum.CHILD, undefined);
cashRegister.selling(TicketTypeEnum.CHILD, undefined);
cashRegister.selling(TicketTypeEnum.CHILD, undefined);
cashRegister.selling(TicketTypeEnum.CHILD, undefined);
cashRegister.selling(TicketTypeEnum.CHILD, undefined);
cashRegister.selling(TicketTypeEnum.CHILD, undefined);
cashRegister.selling(TicketTypeEnum.CHILD, undefined);
cashRegister.selling(TicketTypeEnum.CHILD, undefined);

cashRegister.selling(TicketTypeEnum.FAMILY, [
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

advertisingDepartment.createEMailing('Wellcome, We are waiting for you');

accounting.paySalaries();

administration.addEmployee(accountant);

accounting.paySalaries();
accounting.createFinancialReport();

accounting.getDayRevenue(cashRegister);

currentVisitors.noticeClients(NoticeTypeEnum.ClosingIn15Minutes);

currentVisitors.noticeClients(NoticeTypeEnum.Closed);

accounting.createCostsForFeedingReport();
accounting.createSalariesReport();
administration.createAdvertision('Sale only Today');
