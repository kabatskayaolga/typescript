import AdvertisingDepartment from './advertisingDepartment';

describe('AdvertisingDepartment', () => {
  let advertisingDepartment: AdvertisingDepartment;

  beforeEach(() => {
    advertisingDepartment = new AdvertisingDepartment();
  });

  it('should create instans of AdvertisingDepartment', () => {
    expect(advertisingDepartment).toBeInstanceOf(AdvertisingDepartment);
  });
});
