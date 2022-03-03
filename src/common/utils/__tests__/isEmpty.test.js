import { isEmpty } from '../isEmpty';

describe('Render isEmpty util', () => {
  it.each([[''], [null], [undefined], [[]], [{}]])('with value %p should return true', (value) => {
    const result = isEmpty(value);

    expect(result).toBeTruthy();
  });

  it.each([['string'], [123], [1, 2, 3], [true], [false], [{ key: 'value' }], [new Date()], [Symbol('symbol')]])(
    'with value %p should return false',
    (value) => {
      const result = isEmpty(value);

      expect(result).toBeFalsy();
    },
  );
});
