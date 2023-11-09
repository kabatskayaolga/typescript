import Animal from './animal';
import CashRegister from './cashRegister';
import Employee from './employee';

export default class Accounting {
  private budget: number = 0;

  constructor(
    private employees: Employee[],
    private animals: Animal[]
  ) {}

  public getDayRevenue(cashRegister: CashRegister): void {
    const dayRevenue = cashRegister.transferToAccounting();
    this.budget += dayRevenue;
  }

  public createFinancialReport(): void {
    console.log(`there is ${this.budget} UAH on the balance sheet`);
  }

  public createSalariesReport(): void {
    let salaries = 0;
    this.employees.forEach(employee => (salaries += employee.salary));
    console.log(`there is ${salaries} UAH per month for salaries`);
  }

  public createCostsForFeedingReport(): void {
    let costs = 0;
    this.animals.forEach(animal => (costs += animal.feedingCostsPerMonth));
    console.log(`there is ${costs} UAH per month for feeding costs`);
  }

  public paySalaries(): void {
    this.employees.forEach(employee => {
      employee.paySalary();
      this.budget -= employee.salary;
    });
  }

  public buyAnimalFood(): void {
    this.animals.forEach(animal => {
      this.budget -= animal.feedingCostsPerMonth;
    });
  }
}
