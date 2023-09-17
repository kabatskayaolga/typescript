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
  name: string;
  sites: number;
}
interface IAuthor {
  name: string;
}

type NoValueErrorMessage = string;
const ErrorMessage: NoValueErrorMessage = 'There is no item with this name';

interface IBookService {
  getAutorInfo(author: string, authors: IAuthor[]): IAuthor | NoValueErrorMessage;
  getBookInfo(book: string, books: IBook[]): IBook | NoValueErrorMessage;
}

const bookService: IBookService = {
  getBookInfo(book: string, books: IBook[]): IBook | NoValueErrorMessage {
    return books.find(item => item.name === book) ?? ErrorMessage;
  },

  getAutorInfo(autor: string, authors: IAuthor[]): IAuthor | NoValueErrorMessage {
    return authors.find(item => item.name === autor) ?? ErrorMessage;
  },
};
