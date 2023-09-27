/* eslint-disable @typescript-eslint/no-unused-vars */
// Фільтрація масиву

// Напишіть узагальнену функцію filterArray(array, condition), яка фільтрує масив елементів на основі наданої умови.

function filterArray<T>(array: T[], condition: (args: T) => boolean): T[] {
  return array.filter(condition);
}

// Узагальнений стек

// Створіть узагальнений клас Stack, який являє собою стек елементів з методами push, pop і peek.

class Stack<T> {
  elements: T[] = [];
  push(element: T): void {
    this.elements.push(element);
  }

  pop(): void {
    this.elements.pop();
  }

  peek(): T {
    return this.elements[this.elements.length - 1];
  }
}

// Узагальнений словник

// Створіть узагальнений клас Dictionary, який являє собою словник(асоціативний масив) з методами set, get і has.Обмежте ключі тільки валідними типами для об'єкта

class Dictionary<T = string> {
  words: Map<string, T> = new Map();

  set<K extends string>(key: K, value: T): void {
    this.words.set(key, value);
  }

  get<K extends string>(key: K): T | undefined {
    return this.words.get(key);
  }

  has<K extends string>(key: K): boolean {
    return this.words.has(key);
  }
}

type Key = string;

class DictionaryWithObject<T = string> {
  words: { [key: Key]: T } = {};

  set(key: Key, value: T): void {
    this.words[key] = value;
  }

  get(key: Key): T | undefined {
    return this.words[key];
  }

  has(key: Key): boolean {
    return Object.prototype.hasOwnProperty.call(this.words, key);
  }
}
