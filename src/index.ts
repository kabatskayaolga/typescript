/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
// 1. Напишіть функцію isString, яка буде перевіряти, чи передано значення рядком. Потім використовуйте її для звуження типу змінної.

function isString(value: unknown): value is string {
  return typeof value === 'string';
}
function testIsString(value: string | number): string {
  if (isString(value)) {
    return 'hohohoho';
  }
  return 'brrrr';
}

// 2. У вас є масив з елементами різних типів. Напишіть функцію, яка приймає цей масив і фільтрує його так, щоб у підсумку в ньому залишилися лише рядки. Використовуйте захисника типу для цього завдання.

function arrayFilterAsString(arr: unknown[]): string[] {
  return arr.filter(isString);
}

// 3. У вас є об'єкт, який може містити довільні властивості. Напишіть функцію, яка приймає цей об'єкт і повертає значення однієї з властивостей, якщо вона існує і має певний тип.
type ParamType = string | number | boolean | Function | symbol | undefined | object | bigint;

function getValue(obj: { [key: string]: ParamType }, property: string, type: ParamType): ParamType | void {
  if (property in obj && typeof obj[property] === type) return obj[property];
}

// 4. Створіть кілька захисників типу, кожен з яких перевіряє певний аспект об'єкта (наприклад, наявність певної властивості або її тип). Потім напишіть функцію, яка використовує цих захисників у комбінації для звуження типу об'єкта до більш конкретного типу.

function isStringV(value: unknown): value is String {
  return typeof value === 'string';
}

function isNumber(value: unknown): value is Number {
  return typeof value === 'number';
}

function filterObject(obj: { [key: string]: unknown }): void {
  if (isStringV(obj['name']) && isNumber(obj['age'])) {
    // Object is valid
  }
}

// 5. У вас є змінна, яка може бути одного з декількох типів (наприклад, рядок чи число). Напишіть функцію, яка приймає цю змінну і виконує довільні операції, специфічні для кожного з типів.

function doSomeOperations(value: number | string): void {
  if (typeof value === 'number') {
    value += 1;
  } else {
    value.toLocaleLowerCase();
  }
}

// 6. Створіть захисник типу, який буде перевіряти, чи передано значення функцією. Потім напишіть функцію, яка використовує цей гард для звуження типу змінної і викликає передану функцію, якщо вона існує.

function isFunction(property: unknown): property is Function {
  return property instanceof Function;
}

function handleFunction(property: () => void): void {
  if (isFunction(property)) {
    property();
  }
}

// 7. Створіть класи з ієрархією успадкування і потім напишіть функцію, яка використовує захисник типу для звуження типу об'єктів, що базуються на цій ієрархії.

class Person {
  name: string = 'Olha';
  age: number = 30;
}

class Women extends Person {
  doMakeUp(): void {}
}

class TransgenderWomen extends Women {
  toHaveASexChangeOperation(): void {}
}

function f(person: Person | Women | TransgenderWomen): void {
  if (person instanceof TransgenderWomen) {
    person.toHaveASexChangeOperation;
  } else if (person instanceof Women) {
    person.doMakeUp;
  } else {
    person.age;
  }
}
