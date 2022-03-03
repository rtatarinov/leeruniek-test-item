import { formatDate } from '../dateAndTime';

describe('Render formatDate util', () => {
  it('without date should return null', () => {
    const result = formatDate();

    expect(result).toBeNull();
  });

  it.each([
    ['1990-05-11', '11.05.1990'],
    ['2019-08-20T12:28:06.898Z', '20.08.2019'],
    ['Tue, 20 Aug 2019 12:34:01 GMT', '20.08.2019'],
  ])('with valid date %p should return corrected result %s', (date, expectedValue) => {
    const result = formatDate(date);

    expect(result).toBe(expectedValue);
  });

  it.each([['string'], ['3:36:21 PM']])('with invalid date %p should return "Invalid date" %s', (date) => {
    const result = formatDate(date);

    expect(result).toBe('Invalid date');
  });
});
