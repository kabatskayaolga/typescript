import CurrentVisitors from './currentVisitors';

describe('CurrentVisitors', () => {
  let currentVisitors: CurrentVisitors;

  beforeEach(() => {
    currentVisitors = new CurrentVisitors();
  });

  it('should create instans of CurrentVisitors', () => {
    expect(currentVisitors).toBeInstanceOf(CurrentVisitors);
  });
});
