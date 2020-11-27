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
const DIRECTORS = [
  `Kevin Feige`,
  `Kathleen Kennedy`,
  `David Heyman`,
  `Jerry Bruckheimer`,
  `Neal H. Moritz`,
  `Frank Marshall`
];
const WRITERS = [
  `Billy Wilder`,
  `Ethan Coen and Joel Coen`,
  `Robert Towne`,
  `Quentin Tarantino`,
  `Francis Ford Coppola`,
  `William Goldman`,
  `Charlie Kaufman`
];
const ACTORS = [
  `Jack Nicholson`,
  `Marlon Brando`,
  `Robert De Niro`,
  `Al Pacino`,
  `Daniel Day-Lewis`,
  `Dustin Hoffman`,
  `Tom Hanks`
];
const GENRES = [
  `Action`,
  `Comedy`,
  `Drama`,
  `Fantasy`
];
const COUNTRIES = [
  `Switzerland`,
  `Canada`,
  `Japan`,
  `Germany`,
  `Australia`,
  `United Kingdom`,
  `United States`,
  `Sweden`
];
const AGE_RATING = [
  `6+`,
  `12+`,
  `16+`,
  `18+`
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

const getArrayElements = (arr) => {
  const randomLength = getRandomInteger(1, arr.length);
  let elements = [];

  for (let i = 0; i < randomLength; i++) {
    const randomInteger = getRandomInteger(0, arr.length - 1);

    elements.push(arr[randomInteger]);
  }

  return elements;
};

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
}

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
