// 1

interface ICalculator {
  addition(a: number, b: number): number;
  subtraction(a: number, b: number): number;
  multiplication(a: number, b: number): number;
  division(a: number, b: number): number;
}

enum CalculatorOperationEnum {
  ADDITION = 'addition',
  SUBSTRACTION = 'subtraction',
  MULTIPLICATION = 'multiplication',
  DIVISION = 'division',
}

class Calculator implements ICalculator {
  addition(a: number, b: number): number {
    return a + b;
  }

  subtraction(a: number, b: number): number {
    return a - b;
  }

  multiplication(a: number, b: number): number {
    return a * b;
  }

  division(a: number, b: number): number {
    return a / b;
  }
}

const calculator = new Calculator();

function calculate(calculator: ICalculator, a: number, b: number, operation: CalculatorOperationEnum): number {
  return calculator[operation](a, b);
}

calculate(calculator, 1, 2, CalculatorOperationEnum.ADDITION);

// 2

interface IBook {
  id: string;
  name: string;
  sites: number;
}
interface IAuthor {
  id: string;
  name: string;
}

interface IBookService {
  books: IBook[];
  authors: IAuthor[];
  getAutorInfo(author: string): IAuthor | undefined;
  getBookInfo(book: string): IBook | undefined;
}

class bookService implements IBookService {
  books!: IBook[];
  authors!: IAuthor[];

  getBookInfo(book: string): IBook | undefined {
    return this.books.find(item => item.id === book);
  }

  getAutorInfo(autor: string): IAuthor | undefined {
    return this.authors.find(item => item.id === autor);
  }
};


// const bookService: IBookService = {
//   books: <IBook[]>[],
//   authors:  <IBook[]>[],

//   getBookInfo(book: string): IBook | undefined {
//     return this.books.find(item => item.id === book); // нужно типизовать this
//   },

//   getAutorInfo(autor: string): IAuthor | undefined {
//     return this.authors.find(item => item.id === autor);
//   }
// };
