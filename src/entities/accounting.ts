import Animal from './animal';
import CashRegister from './cashRegister';
import Employee from './employee';

export default class Accounting {
  private budget: number = 0;

  constructor(
    private employees: Employee[],
    private animals: Animal[]
  ) {}

  public getDayRevenue(cashRegister: CashRegister): number {
    const dayRevenue = cashRegister.transferToAccounting();
    this.budget += dayRevenue;
    return this.budget;
  }

  public createFinancialReport(): number {
    console.log(`there is ${this.budget} UAH on the balance sheet`);
    return this.budget;
  }

  public createSalariesReport(): number {
    let salaries = 0;
    this.employees.forEach(employee => (salaries += employee.salary));
    console.log(`there is ${salaries} UAH per month for salaries`);
    return salaries;
  }

  public createCostsForFeedingReport(): number {
    let costs = 0;
    this.animals.forEach(animal => (costs += animal.feedingCostsPerMonth));
    console.log(`there is ${costs} UAH per month for feeding costs`);
    return costs;
  }

  public paySalaries(): number {
    this.employees.forEach(employee => {
      employee.paySalary();
      this.budget -= employee.salary;
    });
    return this.budget;
  }

  public buyAnimalFood(): number {
    this.animals.forEach(animal => {
      this.budget -= animal.feedingCostsPerMonth;
    });
    return this.budget;
  }
}
