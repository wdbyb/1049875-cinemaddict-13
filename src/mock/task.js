import dayjs from "dayjs";

const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const YEARS = [];
const DESCRIPTIONS = [
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget.`,
  `Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
  `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
  `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis.`,
  `Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`
];
const COMMENTS = [
  `Ухты-пухты`,
  `Килограмм эскиммо, пожалуйста`,
  `Какое это имеет отношение к фильму???`,
  `Ничего на свете лучше нету`
];
const TITLES = [
  `Made For Each Other`,
  `Popeye Meets Sindbad`,
  `Sagebrush Trail`,
  `Santa Claus Conquers The Martians`,
  `The Dance of Life`,
  `The Great Flamarion`,
  `The Man with The Golden Arm`
];
const POSTERS = [
  `/images/posters/made-for-each-other.png`,
  `/images/posters/popeye-meets-sinbad.png`,
  `/images/posters/sagebrush-trail.jpg`,
  `/images/posters/santa-claus-conquers-the-martians.jpg`,
  `/images/posters/the-dance-of-life.jpg`,
  `/images/posters/the-great-flamarion.jpg`,
  `/images/posters/the-man-with-the-golden-arm.jpg`
];
const AUTHORS = [
  `Johny`,
  `William`,
  `George`,
  `Bob`
];
const EMOJIS = [
  `smile`,
  `sleeping`,
  `angry`,
  `puke`
];
const MAX_DAYS_BACK = 365;
const StringCount = {
  MIN: 1,
  MAX: 5
};
const CommentCount = {
  MIN: 0,
  MAX: 5
};

const getArrayElement = (arr) => {
  const randomInteger = getRandomInteger(0, arr.length - 1);
  return arr[randomInteger];
};

const generateDescription = (arr) => {
  const strCount = getRandomInteger(StringCount.MIN, StringCount.MAX);

  let description = ``;

  for (let i = 0; i < strCount; i++) {
    const randomInteger = getRandomInteger(0, arr.length - 1);

    description += arr[randomInteger] + ` `;
  }

  return description.trim();
};

const generateTitle = () => {
  return getArrayElement(TITLES);
};

const generatePoster = () => {
  return getArrayElement(POSTERS);
};

const generateDate = () => {
  const daysGap = getRandomInteger(-MAX_DAYS_BACK, 0);

  return dayjs().add(daysGap, `day`).format(`YYYY/MM/DD HH:mm`);
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

const generateYear = () => {
  for (let i = 0; i < 20; i++) {
    YEARS.push(1970 + i);
  }

  return getArrayElement(YEARS);
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
    description: generateDescription(DESCRIPTIONS),
    comments,
  };
}
