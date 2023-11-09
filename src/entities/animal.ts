import { AnimalKindEnum, HealthEnum } from '../types';

export default class Animal {
  constructor(
    public name: string,
    public age: number,
    public kind: AnimalKindEnum,
    public health: HealthEnum,
    public feedingCostsPerMonth: number
  ) {}
}
