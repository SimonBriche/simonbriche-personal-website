const arrayUtil = require('./array-util');

test('randomized is a new array of the same length', () => {
  const array = [1, 2, 3, 4, 5];
  const randomizedArray = arrayUtil.shuffle(array);
  expect(randomizedArray).not.toBe(array);
  expect(randomizedArray).toHaveLength(array.length);
});