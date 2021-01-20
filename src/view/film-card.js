import {SHORT_DESCRIPTION_LENGTH} from "../constants.js";
import Abstract from "./abstract.js";
import dayjs from "dayjs";

const createFilmCardTemplate = (data) => {
  const {title, poster, rating, duration, genres, year, description, comments, isFavorite, isWatched, isWatchlist} = data;

  return `<article class="film-card">
    <h3 class="film-card__title">${title}</h3>
    <p class="film-card__rating">${rating}</p>
    <p class="film-card__info">
      <span class="film-card__year">${dayjs(year).format(`YYYY`)}</span>
      <span class="film-card__duration">${duration}</span>
      <span class="film-card__genre">${genres[0]}</span>
    </p>
    <img src="${poster}" alt="" class="film-card__poster">
    <p class="film-card__description">${description.length > SHORT_DESCRIPTION_LENGTH ? description.slice(0, SHORT_DESCRIPTION_LENGTH) + `...` : description}</p>
    <a class="film-card__comments">${comments.length} comments</a>
    <div class="film-card__controls">
      <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${isWatchlist ? `film-card__controls-item--active` : ``}" type="button">Add to watchlist</button>
      <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${isWatched ? `film-card__controls-item--active` : ``}" type="button">Mark as watched</button>
      <button class="film-card__controls-item button film-card__controls-item--favorite ${isFavorite ? `film-card__controls-item--active` : ``}" type="button">Mark as favorite</button>
    </div>
  </article>`;
};

export default class Card extends Abstract {
  constructor(task) {
    super();
    this._task = task;
    this._clickHandler = this._clickHandler.bind(this);
    this._clickHandlerOnWatchlist = this._clickHandlerOnWatchlist.bind(this);
    this._clickHandlerOnFavorite = this._clickHandlerOnFavorite.bind(this);
    this._clickHandlerOnWatched = this._clickHandlerOnWatched.bind(this);
  }

  getTemplate() {
    return createFilmCardTemplate(this._task);
  }

  _clickHandlerOnWatchlist(evt) {
    evt.preventDefault();
    this._callback.clickOnWatchlist();
  }

  _clickHandlerOnWatched(evt) {
    evt.preventDefault();
    this._callback.clickOnWatched();
  }

  _clickHandlerOnFavorite(evt) {
    evt.preventDefault();
    this._callback.clickOnFavorite();

  }

  setClickHandlerOnWatchlist(callback) {
    this._callback.clickOnWatchlist = callback;
    this.getElement().querySelector(`.film-card__controls-item--add-to-watchlist`).addEventListener(`click`, this._clickHandlerOnWatchlist);
  }

  setClickHandlerOnWatched(callback) {
    this._callback.clickOnWatched = callback;
    this.getElement().querySelector(`.film-card__controls-item--mark-as-watched`).addEventListener(`click`, this._clickHandlerOnWatched);
  }

  setClickHandlerOnFavorite(callback) {
    this._callback.clickOnFavorite = callback;
    this.getElement().querySelector(`.film-card__controls-item--favorite`).addEventListener(`click`, this._clickHandlerOnFavorite);
  }

  _clickHandler(evt) {
    evt.preventDefault();
    this._callback.click();
  }

  setClickHandlerOnFilm(callback) {
    this._callback.click = callback;
    this.getElement().querySelector(`.film-card__title`).addEventListener(`click`, this._clickHandler);
    this.getElement().querySelector(`.film-card__poster`).addEventListener(`click`, this._clickHandler);
    this.getElement().querySelector(`.film-card__comments`).addEventListener(`click`, this._clickHandler);
  }
}
