var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
function isPreHiredEmployee(employee) {
    return employee instanceof PreHiredEmployee;
}
function isDepartmentAccounting(department) {
    return department instanceof Accounting;
}
var Company = /** @class */ (function () {
    function Company(name) {
        this.departmens = [];
        this.preHiredEmployees = [];
        this.allEmployees = []; //// ???????
        this.name = name;
    }
    Company.prototype.addDepartment = function (department) {
        this.departmens.push(department);
    };
    Company.prototype.removeDepartment = function (departmentName) {
        this.departmens.filter(function (department) { return department.name !== departmentName; });
    };
    Company.prototype.addPreHiredEmployees = function (employee) {
        this.preHiredEmployees.push(employee);
    };
    Company.prototype.addEmployee = function (employee, departmentName, status) {
        var department = this.departmens.find(function (department) { return departmentName === department.name; });
        if (department) {
            if (isPreHiredEmployee(employee)) {
                var firstName = employee.firstName, lastName = employee.lastName, bankAccountNumber = employee.bankAccountNumber, salary = employee.salary;
                this.allEmployees.push(new Employee(firstName, lastName, bankAccountNumber, salary, Status.Active, department));
                department.addEmployee(new Employee(firstName, lastName, bankAccountNumber, salary, Status.Active, department));
                // department.addEmployee({
                //   ...employee,
                //   paymentInformation: employee.bankAccountNumber,
                //   status: status,
                //   department: department,
                // } as Employee);
                this.preHiredEmployees.filter(function (preHiredEmployee) { return employee.lastName !== preHiredEmployee.lastName; });
            }
            else {
                if (employee.department.name !== department.name) {
                    department.addEmployee(employee);
                    var oldDepartment = this.departmens.find(function (department) { return employee.department.name === department.name; });
                    oldDepartment === null || oldDepartment === void 0 ? void 0 : oldDepartment.removeEmployee(employee.lastName);
                }
                else {
                    this.allEmployees.push(employee);
                }
            }
        }
    };
    Company.prototype.removeEmployee = function (employee) {
        if (isPreHiredEmployee(employee)) {
            this.allEmployees.filter(function (item) { return item.lastName !== employee.lastName; });
        }
        else {
            var department_1 = this.departmens.find(function (department) { return employee.department.name === department.name; });
            department_1 === null || department_1 === void 0 ? void 0 : department_1.removeEmployee(employee.lastName);
        }
    };
    Company.prototype.updateBalance = function () {
        this.departmens.some(function (department) { return 'paySalaries' in department; });
        console.log(this.departmens.some(function (department) { return 'paySalaries' in department; }));
    };
    return Company;
}());
var Department = /** @class */ (function () {
    function Department(name, domainArea, debit, credit) {
        this.employees = [];
        this.name = name;
        this.domainArea = domainArea;
        this.debit = debit;
        this.credit = credit;
    }
    Object.defineProperty(Department.prototype, "budget", {
        get: function () {
            return this.debit - this.credit;
        },
        enumerable: false,
        configurable: true
    });
    Department.prototype.updateCredit = function (value) {
        this.credit = value;
    };
    Department.prototype.addEmployee = function (employee) {
        this.employees.push(employee);
    };
    Department.prototype.removeEmployee = function (lastName) {
        this.employees = this.employees.filter(function (employee) {
            return lastName !== employee.lastName;
        });
    };
    return Department;
}());
var Accounting = /** @class */ (function (_super) {
    __extends(Accounting, _super);
    function Accounting() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.name = 'Accouning';
        _this.domainArea = 'Accouning';
        _this.employeesOnTheBalance = [];
        _this.departmentsOnTheBalance = [];
        return _this;
    }
    // set balance(departmens: Department[]) {
    //   let number = 0;
    //   departmens.map(item => {
    //     number += item.budget;
    //   });
    //   number;
    // }
    Accounting.prototype.takeOntheBalance = function (item) {
        if (item instanceof Employee) {
            this.employeesOnTheBalance.push(item);
            if (!this.departmentsOnTheBalance.some(function (department) { return department.name === item.department.name; })) {
                this.takeOntheBalance(item.department);
            }
        }
        else {
            this.departmentsOnTheBalance.push(item);
        }
    };
    Accounting.prototype.removeFromBalance = function (item) {
        if (item instanceof Employee) {
            this.employeesOnTheBalance = this.employeesOnTheBalance.filter(function (employee) { return employee.lastName !== item.lastName; });
            if (this.departmentsOnTheBalance.filter(function (department) { return department.name === item.department.name; }).length === 1) {
                this.removeFromBalance(item.department);
            }
        }
        else {
            this.departmentsOnTheBalance = this.departmentsOnTheBalance.filter(function (department) { return department.name !== item.name; });
        }
    };
    Accounting.prototype.paySalaries = function () {
        var _this = this;
        var balance = this.departmentsOnTheBalance.map(function (department) {
            var employeeSalaries = 0;
            _this.employeesOnTheBalance
                .filter(function (employee) { return employee.department.name === department.name; })
                .map(function (employee) { return (employeeSalaries += employee.salary); });
            return {
                department: department.name,
                balance: department.budget - employeeSalaries,
            };
        });
        return balance;
    };
    return Accounting;
}(Department));
var PreHiredEmployee = /** @class */ (function () {
    function PreHiredEmployee(firstName, lastName, bankAccountNumber, salary) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.bankAccountNumber = bankAccountNumber;
        this.salary = salary;
    }
    return PreHiredEmployee;
}());
var Status;
(function (Status) {
    Status["Active"] = "active";
    Status["InActive"] = "inactive";
    Status["OnUnpaidLeave"] = "on unpaid leave";
})(Status || (Status = {}));
var Employee = /** @class */ (function () {
    function Employee(firstName, lastName, paymentInformation, salary, status, department) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.paymentInformation = paymentInformation;
        this.salary = salary;
        this.status = status;
        this.department = department;
    }
    return Employee;
}());
//////////////////////////////////////////////////
var company = new Company('Test');
var department = new Department('string', 'string', 10000, 1000);
company.addDepartment(department);
department.budget;
var accountant = new Accounting('accounssss', 'dsds', 100000, 15555);
company.addDepartment(accountant);
var employee = new Employee('firstName1', 'lastname1', 'paymentInformation1', 2004, Status.Active, department);
company.addEmployee(employee, 'string', Status.Active);
var prehiredEmplo = new PreHiredEmployee('firstName2', 'lastname2', 'paymentInformation2', 2004);
company.addEmployee(prehiredEmplo, 'string', Status.InActive);
// console.log(company);
// console.log('------');
// console.log(company.departmens[1]);
// console.log('------');
// console.log(company.departmens[0]);
company.addEmployee(company.allEmployees[0], 'Accouning', Status.InActive);
// company.removeEmployee(employee);
// console.log(company);
// console.log('------');
// console.log(company.departmens[1]);
// console.log('------');
// console.log(company.departmens[0]);
accountant.takeOntheBalance(employee);
console.log(accountant);
console.log('------');
accountant.removeFromBalance(employee);
console.log(accountant);
// console.log(company.departmens);
