/* eslint-disable @typescript-eslint/no-unused-vars */
class Film {
  constructor(
    public name: string,
    public year: number,
    public rate: number,
    public oscar: boolean
  ) { }
}

class Category {
  films: Film[] = [];
  constructor(public name: string) { }
}
