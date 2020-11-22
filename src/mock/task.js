import dayjs from "dayjs";

const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

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
  `made-for-each-other.png`,
  `popeye-meets-sinbad.png`,
  `sagebrush-trail.jpg`,
  `santa-claus-conquers-the-martians.jpg`,
  `the-dance-of-life.jpg`,
  `the-great-flamarion.jpg`,
  `the-man-with-the-golden-arm.jpg`
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

const getArrayElement = (arr) => {
  const randomInteger = getRandomInteger(0, arr.length -1);
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

const generateComment = () => {
  return {
    author: generateCommentAuthor(),
    text: generateCommentText(),
    emoji: generateCommentEmoji(),
    date: generateCommentDate()
  };
};

const generateCommentText = () => {
  return getArrayElement(COMMENTS);
};

const generateCommentDate = () => {
  return generateDate();
};

const generateCommentAuthor = () => {
  return getArrayElement(AUTHORS);
};

const generateCommentEmoji = () => {
  return getArrayElement(EMOJIS);
};

console.log(generateTask());

export function generateTask() {
  return {
    title: generateTitle(),
    poster: generatePoster(),
    description: generateDescription(DESCRIPTIONS),
    comments: {
      id_1: generateComment(),
      id_2: generateComment()
    }
  };
}
