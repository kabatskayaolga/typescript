import Client from './client';

const FIRST_NAME = 'Olja';
const LAST_NAME = 'Kabatska';
const PHONE = '232143423';
const EMAIL = 'jnj@jj.kk';

describe('Client', () => {
  let client: Client;

  beforeEach(() => {
    client = new Client(FIRST_NAME, LAST_NAME, PHONE, EMAIL);
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
});
