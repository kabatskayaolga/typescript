/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/explicit-function-return-type */

// import 'reflect-metadata';

// Візьміть декоратор DeprecatedMethod і навчіть його працювати з об'єктом, який вміє приймати причину, через яку його не варто використовувати, і назву методу, яким його можна замінити, якщо це можливо.

// Створіть декоратори MinLength, MaxLength та Email

function Compose(lengthMin: number, lengthMax: number) {
  const minLegth = MinLength(lengthMin);
  const maxLength = MaxLength(lengthMax);
  const email = Email;

  return function (target: any, key: string) {
    maxLength(target, key);
    minLegth(target, key);
    email(target, key);
  };
}

function MinLength(length: number) {
  return function <T extends {}>(target: T, propertyKey: string): void | any {
    const originalSetter = Object.getOwnPropertyDescriptor(target, propertyKey)?.set;
    let value: string;
    Object.defineProperty(target, propertyKey, {
      get() {
        return value;
      },
      set(val: string) {
        console.log('MinLength');
        if (val.length < length) throw new Error(`Number of symbols can't be less than ${length}`);
        originalSetter?.call(target, val);
      },
      configurable: true,
    });
  };
}

function MaxLength(length: number) {
  return function <T extends {}>(target: T, propertyKey: string): void | any {
    const originalSetter = Object.getOwnPropertyDescriptor(target, propertyKey)?.set;
    let value: string;

    Object.defineProperty(target, propertyKey, {
      get() {
        return value;
      },
      set(val: string) {
        console.log('MaxLength');
        if (val.length > length) throw new Error(`Number of symbols can't be more than ${length}`);
        originalSetter?.call(target, val);
      },
      configurable: true,
    });
  };
}

function Email<T extends {}>(target: T, propertyKey: string | symbol): void | any {
  const originalSetter = Object.getOwnPropertyDescriptor(target, propertyKey)?.set;
  let value: string;
  Object.defineProperty(target, propertyKey, {
    get() {
      return value;
    },
    set(val: string) {

      console.log('Email');
      if (!/^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/.test(val)) throw new Error('Email is not valid');
      originalSetter?.call(target, val);
    },
    configurable: true,
  });
}

function DeprecatedMethod(reason: string, replacedMethod?: string) {
  return function <T, A extends any[], R>(target: any, propertyKey: string | symbol, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    descriptor.value = function (this: T, ...args: A): R {
      console.log(`Don't use this method because ${reason}${replacedMethod ? ', use ' + replacedMethod : ''}`);
      return originalMethod.apply(this, args);
    };
  };
}

class Validation {
  // @Email
  // @MinLength(1)
  // @MaxLength(5)
  @Compose(1, 5)
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

const form = new Validation('mail@mail.com');
form.email;
