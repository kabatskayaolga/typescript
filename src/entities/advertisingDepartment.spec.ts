import AdvertisingDepartment from './advertisingDepartment';
import Client from './client';

const FIRST_NAME = 'Olja';
const LAST_NAME = 'Kabatska';
const PHONE = '232143423';
const EMAIL = 'jnj@jj.kk';

jest.mock('./client');

describe('AdvertisingDepartment', () => {
  let advertisingDepartment: AdvertisingDepartment;

  beforeEach(() => {
    advertisingDepartment = new AdvertisingDepartment();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should create instans of AdvertisingDepartment', () => {
    expect(advertisingDepartment).toBeInstanceOf(AdvertisingDepartment);
  });

  it('should create client', () => {
    advertisingDepartment.addClient({ firstName: FIRST_NAME, lastName: LAST_NAME, phone: PHONE, email: EMAIL });
    expect(Client).toHaveBeenCalled();
  });
});
