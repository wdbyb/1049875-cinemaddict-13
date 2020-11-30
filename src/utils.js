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

export const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`
};

export const renderElement = (container, element, place) => {
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case RenderPosition.BEFOREEND:
      container.append(element);
      break;
  }
};

export const renderTemplate = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};
