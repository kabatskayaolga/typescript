/* eslint-disable @typescript-eslint/no-unused-vars */
// Визначте інтерфейс, який використовує сигнатуру індексу з типами об'єднання. Наприклад, тип значення для кожного ключа може бути число | рядок.
type A = string | number;

interface ITest1 {
  [key: string]: A;
  [key: number]: A;
}

// Створіть інтерфейс, у якому типи значень у сигнатурі індексу є функціями.Ключами можуть бути рядки, а значеннями — функції, які приймають будь - які аргументи.

// eslint-disable-next-line @typescript-eslint/ban-types
type ValueType = string | number | boolean | symbol | Function | undefined | object | bigint;
type FunctionType = (args: { [key: string]: ValueType }) => ValueType;

interface ITest2 {
  [key: string]: FunctionType;
}

// Опишіть інтерфейс, який використовує сигнатуру індексу для опису об'єкта, подібного до масиву. Ключі повинні бути числами, а значення - певного типу.
interface IObjectLikeArray {
  [key: number]: string;
}

// Створіть інтерфейс з певними властивостями та індексною сигнатурою.Наприклад, ви можете мати властивості типу name: string та індексну сигнатуру для додаткових динамічних властивостей.

interface ITest5 {
  name: string;

  [key: string]: string | number | boolean;
  [key: number]: string | number | boolean;
  [key: symbol]: string | number | boolean;
}

// Створіть два інтерфейси, один з індексною сигнатурою, а інший розширює перший, додаючи специфічні властивості.

interface ITest6 {
  [key: string]: string | number | boolean;
}

interface ITest7 extends ITest6 {
  name: string;
  age: number;
}

// Напишіть функцію, яка отримує об'єкт з індексною сигнатурою і перевіряє, чи відповідають значення певних ключів певним критеріям (наприклад, чи всі значення є числами).

interface CheckKeysAreStrings {
  [key: number]: string | number | boolean;
}

function checkValues(obj: CheckKeysAreStrings, valueType: string): string {
  for (const key in obj) {
    if (typeof obj[key] !== valueType) {
      return `Not all keys are ${valueType}s`;
    }
  }
  return `All keys are ${valueType}s`;
}
