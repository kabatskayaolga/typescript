import { AnimalKindEnum, HealthEnum } from '../types';
import Animal from './animal';

const NAME = 'Animal';
const AGE = 3;
const KIND = AnimalKindEnum.FOX;
const HEALTH = HealthEnum.EXCELENT;
const FEEDING_COSTS_PER_MONTH = 22;

describe('Animal', () => {
  let animal: Animal;

  beforeEach(() => {
    animal = new Animal(NAME, AGE, KIND, HEALTH, FEEDING_COSTS_PER_MONTH);
  });

  it('should create instans of Animal', () => {
    expect(animal).toBeInstanceOf(Animal);
  });

  it('should have correct properties', () => {
    expect(animal.name).toBe(NAME);
    expect(animal.age).toBe(AGE);
    expect(animal.kind).toBe(KIND);
    expect(animal.health).toBe(HEALTH);
    expect(animal.feedingCostsPerMonth).toBe(FEEDING_COSTS_PER_MONTH);
  });
});
