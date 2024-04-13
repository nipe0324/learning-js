test('the mock returns 10', () => {
  const myMock = jest.fn().mockReturnValue(10);
  expect(myMock()).toBe(10);
});

test('the mock returns 10, "x", false', () => {
  const myMock = jest.fn()
    .mockReturnValueOnce(10)
    .mockReturnValueOnce('x')
    .mockReturnValueOnce(false);

  expect(myMock()).toBe(10);
  expect(myMock()).toBe('x');
  expect(myMock()).toBe(false);
});

test('the mock adds a and b', () => {
  const myAddMock = jest.fn()
    .mockImplementation((a, b) => a + b);

  expect(myAddMock(1, 3)).toBe(4);
});
