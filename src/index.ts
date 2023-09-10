/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
function isPreHiredEmployee(employee: unknown): employee is PreHiredEmployee {
  return employee instanceof PreHiredEmployee;
}

function isDepartmentAccounting(department: unknown): department is Accounting {
  return department instanceof Accounting;
}

class Company {
  name: string;
  departmens: Department[] & Accounting[] = [];
  preHiredEmployees: PreHiredEmployee[] = [];
  allEmployees: PreHiredEmployee[] & Employee[] = []; //// ???????
  accountant: Accounting | undefined;

  constructor(name: string) {
    this.name = name;
  }

  addDepartment(department: Department | Accounting): void {
    if (isDepartmentAccounting(department)) {
      this.departmens.push(department);
      this.accountant = department;
    } else {
      department;
      this.departmens.push(department);
    }
    this.updateBalance();
  }

  removeDepartment(departmentName: string): void {
    this.departmens.filter(department => department.name !== departmentName);
  }

  addPreHiredEmployees(employee: PreHiredEmployee): void {
    this.preHiredEmployees.push(employee);
  }

  addEmployee(employee: Employee | PreHiredEmployee, departmentName: string, status: Status): void {
    const department = this.departmens.find(department => departmentName === department.name);
    let employeeWithNewData;
    if (department) {
      if (isPreHiredEmployee(employee)) {
        const { firstName, lastName, bankAccountNumber, salary } = employee;

        employeeWithNewData = new Employee(firstName, lastName, bankAccountNumber, salary, status, department);

        this.allEmployees.push(employeeWithNewData);
        department.addEmployee(employeeWithNewData);

        this.preHiredEmployees.filter(preHiredEmployee => employee.lastName !== preHiredEmployee.lastName);
      } else {
        const { firstName, lastName, paymentInformation, salary } = employee;
        employeeWithNewData = new Employee(firstName, lastName, paymentInformation, salary, status, department);

        if (employee.department.name !== department.name) {
          department.addEmployee(employeeWithNewData);

          const oldDepartment = this.departmens.find(department => employee.department.name === department.name);
          oldDepartment?.removeEmployee(employee.lastName);
        } else {
          this.allEmployees.push(employeeWithNewData);
        }
      }
    }
    if (status === Status.Active && this.accountant && employeeWithNewData) {
      this.accountant.takeOntheBalance(employeeWithNewData);
    }
  }

  removeEmployee(employee: PreHiredEmployee | Employee): void {
    if (isPreHiredEmployee(employee)) {
      this.allEmployees.filter(item => item.lastName !== employee.lastName);
    } else {
      const department = this.departmens.find(department => employee.department.name === department.name);
      department?.removeEmployee(employee.lastName);
    }
  }

  paySalaries(): void {
    if (this.accountant) {
      const salaries = this.accountant.paySalaries();
      this.departmens.map(
        department => department.name in salaries && department.updateCredit(salaries[department.name])
      );
    }
    this.updateBalance();
  }

  updateBalance(): void {
    let balance = 0;
    this.departmens.map(department => (balance += department.budget));
    this.accountant?.updateBalanceValue(balance);
  }
}

class Department {
  name: string;
  domainArea: string;

  employees: Employee[] = [];

  debit: number;
  credit: number;

  get budget(): number {
    return this.debit - this.credit;
  }

  constructor(name: string, domainArea: string, debit: number, credit: number) {
    this.name = name;
    this.domainArea = domainArea;
    this.debit = debit;
    this.credit = credit;
  }

  updateCredit(value: number): void {
    this.credit += value;
  }

  addEmployee(employee: Employee): void {
    this.employees.push(employee);
  }

  removeEmployee(lastName: string): void {
    this.employees = this.employees.filter(employee => {
      return lastName !== employee.lastName;
    });
  }
}

class Accounting extends Department {
  name: string = 'Accouning';
  domainArea: string = 'Accouning';
  employeesOnTheBalance: Employee[] = [];
  departmentsOnTheBalance: Department[] = [];
  balance: number = 0;

  takeOntheBalance(item: Employee | Department): void {
    if (item instanceof Employee) {
      this.employeesOnTheBalance.push(item);
      if (!this.departmentsOnTheBalance.some(department => department.name === item.department.name)) {
        this.takeOntheBalance(item.department);
      }
    } else {
      this.departmentsOnTheBalance.push(item);
    }
  }

  removeFromBalance(item: Employee | Department): void {
    if (item instanceof Employee) {
      this.employeesOnTheBalance = this.employeesOnTheBalance.filter(employee => employee.lastName !== item.lastName);

      if (this.departmentsOnTheBalance.filter(department => department.name === item.department.name).length === 1) {
        this.removeFromBalance(item.department);
      }
    } else {
      this.departmentsOnTheBalance = this.departmentsOnTheBalance.filter(department => department.name !== item.name);
    }
  }

  paySalaries(): { [key: string]: number } {
    let balance = {};

    this.departmentsOnTheBalance.map(department => {
      let employeeSalaries = 0;

      this.employeesOnTheBalance
        .filter(employee => employee.department.name === department.name)
        .map(employee => (employeeSalaries += employee.salary));

      balance = { ...balance, [department.name]: employeeSalaries };
    });
    return balance;
  }

  updateBalanceValue(value: number): void {
    this.balance = value;
  }
}

class PreHiredEmployee {
  firstName: string;
  lastName: string;
  bankAccountNumber: string;
  salary: number;

  constructor(firstName: string, lastName: string, bankAccountNumber: string, salary: number) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.bankAccountNumber = bankAccountNumber;
    this.salary = salary;
  }
}

enum Status {
  Active = 'active',
  InActive = 'inactive',
  OnUnpaidLeave = 'on unpaid leave',
}

class Employee {
  firstName: string;
  lastName: string;
  paymentInformation: string;
  salary: number;
  status: Status;
  department: Department;

  constructor(
    firstName: string,
    lastName: string,
    paymentInformation: string,
    salary: number,
    status: Status,
    department: Department
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.paymentInformation = paymentInformation;
    this.salary = salary;
    this.status = status;
    this.department = department;
  }
}
