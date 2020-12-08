import {SHORT_DESCRIPTION_LENGTH} from "../constants.js";
import {createElement} from "../utils.js";

const createFilmCardTemplate = (data) => {
  const {title, poster, rating, duration, genres, year, description, comments} = data;

  return `<article class="film-card">
    <h3 class="film-card__title">${title}</h3>
    <p class="film-card__rating">${rating}</p>
    <p class="film-card__info">
      <span class="film-card__year">${year}</span>
      <span class="film-card__duration">${duration}</span>
      <span class="film-card__genre">${genres[0]}</span>
    </p>
    <img src="${poster}" alt="" class="film-card__poster">
    <p class="film-card__description">${description.length > SHORT_DESCRIPTION_LENGTH ? description.slice(0, SHORT_DESCRIPTION_LENGTH) + `...` : description}</p>
    <a class="film-card__comments">${comments.length} comments</a>
    <div class="film-card__controls">
      <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist" type="button">Add to watchlist</button>
      <button class="film-card__controls-item button film-card__controls-item--mark-as-watched" type="button">Mark as watched</button>
      <button class="film-card__controls-item button film-card__controls-item--favorite" type="button">Mark as favorite</button>
    </div>
  </article>`;
};

export default class Card {
  constructor(task) {
    this._task = task;

    this._element = null;
  }

  getTemplate() {
    return createFilmCardTemplate(this._task);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
