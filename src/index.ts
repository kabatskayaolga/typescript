/* eslint-disable @typescript-eslint/no-unused-vars */

// Вам потрібно створити умовний тип, що служить для встановлення типу, що повертається з функції.Як параметр типу повинен обов'язково виступати функціональний тип.

type FunctionReturnType<T> = T extends (param: () => string) => infer U ? U : undefined;

function funcA(param: () => string): string {
  return param();
}

const foundetType: FunctionReturnType<typeof funcA> = funcA(() => 'string');

// Вам потрібно створити умовний тип, який приймає функціональний тип з одним параметром(або задовільним) та повертає кортеж, де перше значення - це тип, що функція повертає, а другий - тип її параметру

type getTuples<T> = T extends (param: infer V) => infer U ? [U, V] : undefined;

function funcB(param: number): string {
  return String(param);
}

let foundetTypeB: getTuples<typeof funcB>; // [string, number]
