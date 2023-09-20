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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var Utils = /** @class */ (function () {
    function Utils() {
    }
    Utils.isPreHiredEmployee = function (employee) {
        return employee instanceof PreHiredEmployee;
    };
    Utils.isEmployee = function (employee) {
        return employee instanceof Employee;
    };
    Utils.isDepartment = function (employee) {
        return employee instanceof Department;
    };
    return Utils;
}());
var Status;
(function (Status) {
    Status["Active"] = "active";
    Status["InActive"] = "inactive";
    Status["OnUnpaidLeave"] = "on unpaid leave";
})(Status || (Status = {}));
var Department = /** @class */ (function () {
    function Department(name, domainArea) {
        this.name = name;
        this.domainArea = domainArea;
        this.employees = [];
        this.budget = {
            debit: 0,
            credit: 0,
        };
    }
    Object.defineProperty(Department.prototype, "balance", {
        get: function () {
            return this.budget.debit - this.budget.credit;
        },
        enumerable: false,
        configurable: true
    });
    Department.prototype.addEmployee = function (employee) {
        if (Utils.isPreHiredEmployee(employee)) {
            var newEmployee = new Employee(employee.firstName, employee.lastName, employee.bankAccountNumber, employee.salary);
            this.employees.push(newEmployee);
        }
        else {
            this.budget.credit -= employee.salary;
            employee.departmant = this;
            this.employees.push(employee);
        }
    };
    Department.prototype.removeEmployee = function (lastName) {
        this.employees = this.employees.filter(function (employee) {
            return lastName !== employee.lastName;
        });
    };
    return Department;
}());
var Company = /** @class */ (function () {
    function Company(name) {
        this.name = name;
        this.departmens = [];
        this.preHiredEmployees = [];
    }
    Object.defineProperty(Company.prototype, "staff", {
        get: function () {
            return __spreadArray(__spreadArray([], this.departmens.flatMap(function (x) { return x.employees; }), true), this.preHiredEmployees, true);
        },
        enumerable: false,
        configurable: true
    });
    return Company;
}());
var PreHiredEmployee = /** @class */ (function () {
    function PreHiredEmployee(firstName, lastName, bankAccountNumber, salary) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.bankAccountNumber = bankAccountNumber;
        this.salary = salary;
    }
    return PreHiredEmployee;
}());
var Employee = /** @class */ (function () {
    function Employee(firstName, lastName, paymentInformation, salary) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.paymentInformation = paymentInformation;
        this.salary = salary;
        this.status = Status.OnUnpaidLeave;
    }
    return Employee;
}());
var Accounting = /** @class */ (function (_super) {
    __extends(Accounting, _super);
    function Accounting() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.name = 'Accouning';
        _this.domainArea = 'Accouning';
        _this.employeesOnTheBalance = [];
        return _this;
    }
    Accounting.prototype.addToBalance = function (entity) {
        var _a;
        if (Utils.isDepartment(entity)) {
            (_a = this.employeesOnTheBalance).push.apply(_a, entity.employees);
        }
        else {
            this.employeesOnTheBalance.push(entity);
        }
    };
    Accounting.prototype.removeFromBalance = function (entity) {
        if (Utils.isDepartment(entity)) {
            this.employeesOnTheBalance = this.employeesOnTheBalance.filter(function (x) { var _a; return Utils.isPreHiredEmployee(x) || (Utils.isEmployee(x) && ((_a = x.departmant) === null || _a === void 0 ? void 0 : _a.name) !== entity.name); });
        }
        else {
            this.employeesOnTheBalance = this.employeesOnTheBalance.filter(function (x) { return x.firstName !== entity.firstName; });
        }
    };
    Accounting.prototype.salaryPayment = function () {
        for (var _i = 0, _a = this.employeesOnTheBalance; _i < _a.length; _i++) {
            var entity = _a[_i];
            if (Utils.isPreHiredEmployee(entity)) {
                this.externalPayment(entity);
            }
            else {
                if (entity.status !== Status.Active)
                    continue;
                this.internalPayment(entity);
            }
        }
    };
    Accounting.prototype.internalPayment = function (employee) {
        if (employee.departmant) {
            employee.departmant.budget.credit -= employee.salary;
        }
    };
    Accounting.prototype.externalPayment = function (preHire) {
        this.budget.credit -= preHire.salary;
    };
    return Accounting;
}(Department));
