const sum = require('./sum');

describe('sum', () => {
  it('adds 1 + 2 to equal 3', () => {
    expect(sum(1, 2)).toBe(3);
  });

  it('adds -1 + 2 to equal 1', () => {
    expect(sum(-1, 2)).toBe(1);
  });

  it('does not return null', () => {
    expect(sum(1, 2)).not.toBeNull();
  });
});
