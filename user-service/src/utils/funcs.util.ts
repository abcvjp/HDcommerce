export const validateEmail = (email: string) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    );
};

export const isString = (s: string) => {
  return typeof s === 'string';
};

export const toSortObject = (sortString: string): Record<string, 1 | -1> => {
  const object = {};
  sortString.split(',').forEach((sortElement) => {
    if (sortElement.startsWith('-')) {
      object[sortElement.substring(1)] = -1;
    } else if (sortElement.startsWith('+')) {
      object[sortElement.substring(1)] = 1;
    } else {
      object[sortElement] = 1;
    }
  });
  return object;
};
