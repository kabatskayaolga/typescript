import { NoticeTypeEnum } from '../types';
import CurrentVisitors from './currentVisitors';
import Visitor from './visitor';

const FIRST_NAME = 'Olja';
const LAST_NAME = 'Kabatska';
const PHONE = '232143423';
const EMAIL = 'jnj@jj.kk';

describe('Visitor', () => {
  let visitor: Visitor;
  const observer = new CurrentVisitors();
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

  it('should send notify', () => {
    observer.actualNotifyType = NoticeTypeEnum.Closed;
    expect(visitor.update(observer)).toBe(`Dear ${FIRST_NAME} ${LAST_NAME}, thank you for coming. See you next time`);
  });
});
