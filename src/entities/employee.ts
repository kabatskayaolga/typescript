import { EmployeePositionsEnum } from '../types';

const defaultDuties = {
  [EmployeePositionsEnum.ACCOUNTANT]: ['generate financial reports'],
  [EmployeePositionsEnum.ANIMAL_FEEDING_WORKER]: ['generate financial reports'],
  [EmployeePositionsEnum.SELLER]: ['sell tickets', 'add client to visitors', 'notice visitors'],
};

export default class Employee {
  constructor(
    public firstname: string,
    public lastname: string,
    public position: EmployeePositionsEnum,
    public salary: number,
    public duties?: string[]
  ) {
    if (!duties) this.setDuties();
  }

  private setDuties(duties?: string[]): void {
    this.duties = duties?.length ? duties : defaultDuties[this.position] || ['unknown'];
  }

  public paySalary(): void {
    console.log('Salary has been paid');
  }
}
