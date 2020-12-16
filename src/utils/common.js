export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const getArrayElement = (arr) => {
  const randomInteger = getRandomInteger(0, arr.length - 1);
  return arr[randomInteger];
};

export const getArrayElements = (arr) => {
  const randomLength = getRandomInteger(1, arr.length);
  let elements = [];

  for (let i = 0; i < randomLength; i++) {
    const randomInteger = getRandomInteger(0, arr.length - 1);

    elements.push(arr[randomInteger]);
  }

  return elements;
};

export const generateId = () => Date.now() + parseInt(Math.random() * 10000, 10);

export const updateItem = (items, update) => {
  const index = items.findIndex((item) => item.id === update.id);

  if (index === -1) {
    return items;
  }

  return [
    ...items.slice(0, index),
    update,
    ...items.slice(index + 1)
  ];
};