/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/explicit-function-return-type */

import 'reflect-metadata';

// Візьміть декоратор DeprecatedMethod і навчіть його працювати з об'єктом, який вміє приймати причину, через яку його не варто використовувати, і назву методу, яким його можна замінити, якщо це можливо.

// Створіть декоратори MinLength, MaxLength та Email

function MinLength(length: number) {
  return function <T extends {}>(target: T, propertyKey: string): void | any {
    let value: string;
    Reflect.defineProperty(target, propertyKey, {
      get() {
        return value;
      },
      set(val: string) {
        if (val.length < length) throw new Error(`Number of symbols can't less than ${length}`);
        value = val;
      },
    });
  };
}

function MaxLength(length: number) {
  return function <T extends {}>(target: T, propertyKey: string): void | any {
    let value: string;

    Reflect.defineProperty(target, propertyKey, {
      get() {
        return value;
      },
      set(val: string) {
        if (val.length > length) throw new Error(`Number of symbols can't less than ${length}`);
        value = val;
      },
    });
  };
}

function Email<T extends {}>(target: T, propertyKey: string | symbol): void | any {
  let value: string;
  Reflect.defineProperty(target, propertyKey, {
    get() {
      return value;
      // return value;
    },
    set(val: string) {
      if (!/^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/.test(val)) throw new Error('Email is not valid');
      value = val;
    },
  });
}

function DeprecatedMethod(reason: string, replacedMethod?: string) {
  return function <T, A extends any[], R>(target: any, propertyKey: string | symbol, descriptor: PropertyDescriptor) {
    const originalMethod = target.setEmail;

    descriptor.value = function (this: T, ...args: A): R {
      console.log(`Don't use this method because ${reason}${replacedMethod ? ', use ' + replacedMethod : ''}`);
      return originalMethod.apply(this, args);
    };
  };
}

class Validation {
  @Email
  @MinLength(55)
  @MaxLength(30)
  email: string;

  constructor(email: string) {
    this.email = email;
  }

  @DeprecatedMethod('this Method is Old', 'setEmail')
  setEmailDeprecated(value: string): void {
    this.email = value;
  }

  setEmail(value: string): void {
    this.email = value;
  }
}

const form = new Validation('mailxzsadff.d');
form.email;
form.setEmailDeprecated('ddd');
// console.log(form.email);
