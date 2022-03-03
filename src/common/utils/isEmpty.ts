export const isEmpty = (value: any): boolean => {
  switch (typeof value) {
    case "undefined":
      return true;
    case "object":
      // eslint-disable-next-line no-nested-ternary
      return value === null
        ? true
        : Array.isArray(value)
        ? !value.length
        : Object.entries(value).length === 0 && value.constructor === Object;
    case "string":
      return !value.length;
    default:
      return false;
  }
};
