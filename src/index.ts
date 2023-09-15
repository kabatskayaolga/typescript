// 1

interface ICalculator {
  a: number;
  b: number;

  addition(): number;
  subtraction(): number;
  multiplication(): number;
  division(): number;
}

class Calculator implements ICalculator {
  a: number;
  b: number;

  constructor(a: number, b: number) {
    this.a = a;
    this.b = b;
  }

  addition(): number {
    return this.a + this.b;
  }

  subtraction(): number {
    return this.a - this.b;
  }

  multiplication(): number {
    return this.a * this.b;
  }

  division(): number {
    return this.a / this.b;
  }
}

const calculator = new Calculator(1, 2);

function calculation(obj: Calculator): number {
  return obj.division();
}

calculation(calculator);

// 2

interface IBook extends IBookService {
  name: string;
  autor: IAuthor;
}
interface IAuthor {
  name: string;
}
interface IBookService {
  getAutorInfo(): string;
  getBookInfo(): string;
}

class Book implements IBook {
  name: string;
  autor: IAuthor;

  constructor(name: string, autor: IAuthor) {
    this.name = name;
    this.autor = autor;
  }

  getBookInfo(): string {
    return this.name;
  }

  getAutorInfo(): string {
    return this.autor.name;
  }
}

const book = new Book('book', { name: 'autor' });
book.getAutorInfo;
