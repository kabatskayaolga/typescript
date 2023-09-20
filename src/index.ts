/* eslint-disable @typescript-eslint/no-unused-vars */
abstract class Figure {
  constructor(
    public readonly name: string,
    public readonly color: string
  ) { }
  abstract calculateArea(): number;
}

interface IFormula {
  print(): string;
}

class Circle extends Figure {
  constructor(
    name: string,
    color: string,
    public radius: number
  ) {
    super(name, color);
  }

  calculateArea(): number {
    return Math.PI * Math.pow(this.radius, 2);
  }
}

class Rectangle extends Figure implements IFormula {
  constructor(
    name: string,
    color: string,
    public length: number,
    public width: number
  ) {
    super(name, color);
  }

  print(): string {
    return 'Area = length * width';
  }

  calculateArea(): number {
    return this.length * this.width;
  }
}

class Square extends Figure implements IFormula {
  constructor(
    name: string,
    color: string,
    public width: number
  ) {
    super(name, color);
  }

  print(): string {
    return 'Area = width * width';
  }

  calculateArea(): number {
    return Math.pow(this.width, 2);
  }
}

class Triangle extends Figure {
  constructor(
    name: string,
    color: string,
    public side1: number,
    public side2: number,
    public side3: number
  ) {
    super(name, color);
  }

  calculateArea(): number {
    const semiPerimeter = (this.side1 + this.side2 + this.side3) / 2;

    return Math.sqrt(
      semiPerimeter * (semiPerimeter - this.side1) * (semiPerimeter - this.side2) * (semiPerimeter - this.side3)
    );
  }
}
