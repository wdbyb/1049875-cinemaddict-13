import dayjs from "dayjs";
import {DESCRIPTIONS, COMMENTS, TITLES, POSTERS, AUTHORS, EMOJIS, DIRECTORS, WRITERS, ACTORS, GENRES, COUNTRIES, AGE_RATING, MAX_DAYS_BACK, StringCount, CommentCount} from "../constants.js";
import {getRandomInteger, getArrayElement, getArrayElements} from "../utils/common.js";

const generateWriters = () => {
  return getArrayElements(WRITERS).join(`, `);
};

const generateActors = () => {
  return getArrayElements(ACTORS).join(`, `);
};

const generateGenres = () => {
  return getArrayElements(GENRES);
};

const generateDescription = () => {
  const strCount = getRandomInteger(StringCount.MIN, StringCount.MAX);

  let description = ``;

  for (let i = 0; i < strCount; i++) {
    const randomInteger = getRandomInteger(0, DESCRIPTIONS.length - 1);

    description += DESCRIPTIONS[randomInteger] + ` `;
  }

  return description.trim();
};

const generateTitle = () => {
  return getArrayElement(TITLES);
};

const generateCountry = () => {
  return getArrayElement(COUNTRIES);
};

const generateAgeRating = () => {
  return getArrayElement(AGE_RATING);
};

const generateDirector = () => {
  return getArrayElement(DIRECTORS);
};

const generatePoster = () => {
  return getArrayElement(POSTERS);
};

const generateDate = () => {
  const daysGap = getRandomInteger(-MAX_DAYS_BACK, 0);

  return dayjs().add(daysGap, `day`).format(`YYYY/MM/DD HH:mm`);
};

const generateYear = () => {
  const yearsGap = getRandomInteger(-50, 0);

  return dayjs().add(yearsGap, `year`).format(`YYYY`);
};

const generateCommentText = () => {
  return getArrayElement(COMMENTS);
};

const generateCommentDate = () => {
  return generateDate();
};

const generateRating = () => {
  return getRandomInteger(1, 9) + `.` + getRandomInteger(0, 9);
};

const generateDuration = () => {
  const hours = getRandomInteger(1, 3);
  const minutes = getRandomInteger(0, 60);

  return hours + `h ` + minutes + `m`;
};

const generateCommentAuthor = () => {
  return getArrayElement(AUTHORS);
};

const generateCommentEmoji = () => {
  return getArrayElement(EMOJIS);
};

const generateComments = () => {
  const commentsCount = getRandomInteger(CommentCount.MIN, CommentCount.MAX);
  let comments = [];

  for (let i = 0; i < commentsCount; i++) {
    comments.push({
      author: generateCommentAuthor(),
      text: generateCommentText(),
      emoji: generateCommentEmoji(),
      date: generateCommentDate()
    });
  }

  return comments;
};

export function generateTask() {
  const comments = generateComments();

  return {
    title: generateTitle(),
    poster: generatePoster(),
    rating: generateRating(),
    duration: generateDuration(),
    year: generateYear(),
    description: generateDescription(),
    director: generateDirector(),
    writers: generateWriters(),
    actors: generateActors(),
    genres: generateGenres(),
    country: generateCountry(),
    age: generateAgeRating(),
    comments,
    isWatched: Boolean(getRandomInteger(0, 1)),
    isHistory: Boolean(getRandomInteger(0, 1)),
    isFavorite: Boolean(getRandomInteger(0, 1))
  };
}
