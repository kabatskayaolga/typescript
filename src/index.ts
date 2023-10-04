// Вам потрібно створити тип DeepReadonly який буде робити доступними тільки для читання навіть властивості вкладених обʼєктів.

type DeepReadonly<T> = {
  readonly [K in keyof T]: DeepReadonly<T[K]>
}

// Вам потрібно створити тип DeepRequireReadonly який буде робити доступними тільки для читання навіть властивості вкладених обʼєктів та ще й робити їх обовʼязковими.

type DeepRequireReadonly<T> = {
  readonly [K in keyof T]-?: DeepRequireReadonly<T[K]>
}

// Вам потрібно сворити тип UpperCaseKeys, який буде приводити всі ключи до верхнього регістру.

type ToUpperCaseKeys<T extends string> = Uppercase<T>

type UpperCaseKeys<T> = {
  [K in keyof T as ToUpperCaseKeys<K & string>]: T[K]
}

// І саме цікаве.Створіть тип ObjectToPropertyDescriptor, який перетворює звичайний обʼєкт на обʼєкт де кожне value є дескриптором.

interface IDescriptor<T> {
  value: T;
  writable: boolean;
  enumerable: boolean;
  configurable: boolean;
}

type ObjectToPropertyDescriptor<T> = {
  [K in keyof T]: IDescriptor<T[K]>
}
