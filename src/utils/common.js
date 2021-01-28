import dayjs from "dayjs";
import {FilterType} from "../constants.js";

export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const openBox = (items) => {
  const foo = [];
  items.forEach((item) => item.forEach((i) => foo.push(i)));
  return foo;
};

export const makeItemsUniq = (items) => {
  // const foo = [];
  // items.forEach((item) => item.forEach((i) => foo.push(i)));
  return [...new Set(items)]
};

export const countTasksByGenre = (movies, genre) => {
  return movies.filter((movie) => movie === genre).length;
};

export const filter = {
  [FilterType.ALL]: (tasks) => tasks.filter((task) => task.isAll),
  [FilterType.WATCHLIST]: (tasks) => tasks.filter((task) => task.isWatchlist),
  [FilterType.HISTORY]: (tasks) => tasks.filter((task) => task.isWatched),
  [FilterType.FAVORITES]: (tasks) => tasks.filter((task) => task.isFavorite)
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

const getWeightForNullDate = (dateA, dateB) => {
  if (dateA === null && dateB === null) {
    return 0;
  }

  if (dateA === null) {
    return 1;
  }

  if (dateB === null) {
    return -1;
  }

  return null;
};

export const sortMovieDate = (taskA, taskB) => {
  const weight = getWeightForNullDate(taskA.dueDate, taskB.dueDate);

  if (weight !== null) {
    return weight;
  }

  return dayjs(taskA.dueDate).diff(dayjs(taskB.dueDate));
};
