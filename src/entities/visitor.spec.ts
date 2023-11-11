import Visitor from './visitor';

const FIRST_NAME = 'Olja';
const LAST_NAME = 'Kabatska';
const PHONE = '232143423';
const EMAIL = 'jnj@jj.kk';

describe('Visitor', () => {
  let visitor: Visitor;

  beforeEach(() => {
    visitor = new Visitor(FIRST_NAME, LAST_NAME, PHONE, EMAIL);
  });

  it('should create instans of Visitor', () => {
    expect(visitor).toBeInstanceOf(Visitor);
  });

  it('should have correct properties', () => {
    expect(visitor.firstName).toBe(FIRST_NAME);
    expect(visitor.lastName).toBe(LAST_NAME);
    expect(visitor.phone).toBe(PHONE);
    expect(visitor.email).toBe(EMAIL);
  });
});
