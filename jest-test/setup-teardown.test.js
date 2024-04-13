const initializeCityDatabase = () => {
  console.log('initializeCityDatabase');
};

const clearCityDatabase = () => {
  console.log('clearCityDatabase');
};

const isCity = (city) => {
  return city === 'Vienna' || city === 'San Juan';
}

describe('isCity', () => {
  beforeEach(() => {
    initializeCityDatabase();
  });

  afterEach(() => {
    clearCityDatabase();
  });

  test('city database has Vienna', () => {
    expect(isCity('Vienna')).toBeTruthy();
  });

  test('city database has San Juan', () => {
    expect(isCity('San Juan')).toBeTruthy();
  });
});
