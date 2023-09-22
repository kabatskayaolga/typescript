class Utils {
  static isPreHiredEmployee(employee: unknown): employee is PreHiredEmployee {
    return employee instanceof PreHiredEmployee;
  }

  static isEmployee(employee: unknown): employee is Employee {
    return employee instanceof Employee;
  }

  static isDepartment(department: unknown): department is Department {
    return department instanceof Department;
  }
}

interface ICompany {
  departmens: Department[];
  preHiredEmployees: PreHiredEmployee[];
  accountant?: Accounting;
  staff: (PreHiredEmployee | Employee)[];
}

// interface IAccouning {
//   employeesOnTheBalance: (Employee | PreHiredEmployee)[];

//   addToBalance(entity: Department | Employee): void;
//   removeFromBalance(entity: Department | Employee): void;
//   salaryPayment(): void;
//   internalPayment(employee: Employee): void;
//   externalPayment(preHire: PreHiredEmployee): void;
// }

interface IEmployeeBasicInfo {
  readonly firstName: string;
  readonly lastName: string;
  salary: number;
}

interface IBudget {
  debit: number;
  credit: number;
}

enum Status {
  Active = 'active',
  InActive = 'inactive',
  OnUnpaidLeave = 'on unpaid leave',
}

abstract class Department {
  employees: Employee[] = [];
  budget: IBudget = {
    debit: 0,
    credit: 0,
  };

  get balance(): number {
    return this.budget.debit - this.budget.credit;
  }

  constructor(
    public name: string,
    public domainArea: string
  ) { }

  addEmployee(employee: Employee | PreHiredEmployee): void {
    if (Utils.isPreHiredEmployee(employee)) {
      const newEmployee = new Employee(
        employee.firstName,
        employee.lastName,
        employee.bankAccountNumber,
        employee.salary
      );
      this.employees.push(newEmployee);
    } else {
      this.budget.credit -= employee.salary;
      employee.departmant = this;
      this.employees.push(employee);
    }
  }

  removeEmployee(lastName: string): void {
    this.employees = this.employees.filter(employee => {
      return lastName !== employee.lastName;
    });
  }
}

class Company implements ICompany {
  departmens: Department[] = [];
  preHiredEmployees: PreHiredEmployee[] = [];
  accountant?: Accounting;

  get staff(): (PreHiredEmployee | Employee)[] {
    return [...this.departmens.flatMap(x => x.employees), ...this.preHiredEmployees];
  }

  constructor(public name: string) { }
}

class PreHiredEmployee implements IEmployeeBasicInfo {
  constructor(
    public readonly firstName: string,
    public readonly lastName: string,
    public bankAccountNumber: string,
    public salary: number
  ) { }
}

class Employee implements IEmployeeBasicInfo {
  status: Status = Status.OnUnpaidLeave;
  departmant?: Department;

  constructor(
    public readonly firstName: string,
    public readonly lastName: string,
    public paymentInformation: string,
    public salary: number
  ) { }
}

class Accounting extends Department {
  name: string = 'Accouning';
  domainArea: string = 'Accouning';
  private employeesOnTheBalance: (Employee | PreHiredEmployee)[] = [];

  addToBalance(entity: Department | Employee | PreHiredEmployee): void {
    if (Utils.isDepartment(entity)) {
      this.employeesOnTheBalance.push(...entity.employees);
    } else {
      this.employeesOnTheBalance.push(entity);
    }
  }

  removeFromBalance(entity: Department | Employee | PreHiredEmployee): void {
    if (Utils.isDepartment(entity)) {
      this.employeesOnTheBalance = this.employeesOnTheBalance.filter(
        x => Utils.isPreHiredEmployee(x) || (Utils.isEmployee(x) && x.departmant?.name !== entity.name)
      );
    } else {
      this.employeesOnTheBalance = this.employeesOnTheBalance.filter(x => x.firstName !== entity.firstName);
    }
  }

  private salaryPayment(): void {
    for (const entity of this.employeesOnTheBalance) {
      if (Utils.isPreHiredEmployee(entity)) {
        this.externalPayment(entity);
      } else {
        if (entity.status !== Status.Active) continue;
        this.internalPayment(entity);
      }
    }
  }

  private internalPayment(employee: Employee): void {
    if (employee.departmant) {
      employee.departmant.budget.credit -= employee.salary;
    }
  }

  private externalPayment(preHire: PreHiredEmployee): void {
    this.budget.credit -= preHire.salary;
  }
}
