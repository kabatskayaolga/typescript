import Client from './client';
import AdvertisingDepartment from './advertisingDepartment';

const FIRST_NAME = 'Olja';
const LAST_NAME = 'Kabatska';
const PHONE = '232143423';
const EMAIL = 'jnj@jj.kk';

jest.mock('./advertisingDepartment', () => {
  return jest.fn().mockImplementation(() => {
    return { actualMessage: 'message' };
  });
});

describe('Client', () => {
  let client: Client;
  const observer = new AdvertisingDepartment();

  beforeEach(() => {
    client = new Client(FIRST_NAME, LAST_NAME, PHONE, EMAIL);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should create instans of Client', () => {
    expect(client).toBeInstanceOf(Client);
  });

  it('should have correct properties', () => {
    expect(client.firstName).toBe(FIRST_NAME);
    expect(client.lastName).toBe(LAST_NAME);
    expect(client.phone).toBe(PHONE);
    expect(client.email).toBe(EMAIL);
  });

  it('should send email', () => {
    expect(client.update(observer)).toBe('message');
  });
});
