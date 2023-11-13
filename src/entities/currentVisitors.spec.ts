import Visitor from './visitor';
import CurrentVisitors from './currentVisitors';

const FIRST_NAME = 'Olja';
const LAST_NAME = 'Kabatska';
const PHONE = '232143423';
const EMAIL = 'jnj@jj.kk';

jest.mock('./visitor');

describe('CurrentVisitors', () => {
  let currentVisitors: CurrentVisitors;

  beforeEach(() => {
    currentVisitors = new CurrentVisitors();
  });

  it('should create instans of CurrentVisitors', () => {
    expect(currentVisitors).toBeInstanceOf(CurrentVisitors);
  });

  it('should remove vistor', () => {
    currentVisitors.addVisitor({ firstName: FIRST_NAME, lastName: LAST_NAME, phone: PHONE, email: EMAIL });
    expect(Visitor).toHaveBeenCalled();
  });
});
