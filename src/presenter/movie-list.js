import FilmsMainContainer from "../view/films-container.js";
import ShowMoreButton from "../view/show-more-button.js";
import FilmsTopRatedContainer from "../view/films-top-rated-container.js";
import FilmsMostCommentedContainer from "../view/films-most-commented-container.js";
import CardView from "../view/film-card.js";
import PopupView from "../view/film-details.js";
import {MAX_EXTRA_CARD_COUNT, TASKS_COUNT_PER_STEP} from "../constants.js";
import {render, remove, RenderPosition} from "../utils/render.js";
import {updateItem} from "../utils/common.js";

export default class MovieListPresenter {
  constructor(movieContainer) {
    this._movieContainer = movieContainer;
    this._filmPresenter = {};

    this._renderedFilmsCount = TASKS_COUNT_PER_STEP;
    this._renderedFilms = TASKS_COUNT_PER_STEP;

    this._movieListComponent = new FilmsMainContainer();
    this._showMoreButtonComponent = new ShowMoreButton();
    this._ratedFilmsComponent = new FilmsTopRatedContainer();
    this._commentedFilmsComponent = new FilmsMostCommentedContainer();

    this._handleShowMoreButtonClick = this._handleShowMoreButtonClick.bind(this);
    this._changeData = this._changeData.bind(this);
  }

  init(filmsData) {
    this._bodyElement = document.querySelector(`body`);
    this._films = filmsData.slice();

    this._renderMainFilmsContainer();

    this._filmsElement = document.querySelector(`.films`);

    this._renderRatedFilmsContainer();
    this._renderCommentedFilmsContainer();
    this._renderShowMoreButton();
  }

  _changeData(updatedFilm) {
    this._films = updateItem(this._films, updatedFilm);
    // this._filmPresenter[updatedFilm.id].init(updatedFilm);
    this.init(this._films);
  }

  _handleShowMoreButtonClick() {
    const filmsContainerElement = this._movieListComponent.getElement().querySelector(`.films-list__container`);

    this._films
      .slice(this._renderedFilms, this._renderedFilms + this._renderedFilmsCount)
      .forEach((film) => this._renderCard(filmsContainerElement, film));

    this._renderedFilms += this._renderedFilmsCount;

    if (this._renderedFilms >= this._films.length) {
      remove(this._showMoreButtonComponent);
    }
  }

  _renderShowMoreButton() {
    const filmsMainContainerElement = this._movieListComponent.getElement().querySelector(`.films-list--main`);

    render(filmsMainContainerElement, this._showMoreButtonComponent, RenderPosition.BEFOREEND);

    this._showMoreButtonComponent.setClickHandler(this._handleShowMoreButtonClick);
  }

  _renderPopup(film) {
    const popup = new PopupView(film);

    render(this._bodyElement, popup, RenderPosition.BEFOREEND);

    this._bodyElement.classList.add(`hide-overflow`);

    popup.setClickHandler(() => {
      remove(popup);

      this._bodyElement.classList.remove(`hide-overflow`);
    });
  }

  _renderCard(container, film) {
    const cardView = new CardView(film);

    cardView.setClickHandlerOnFilm(() => {
      this._renderPopup(film);
    });

    cardView.setClickHandlerOnWatched(() => {
      this._handleWatchedClick(film);
    });

    cardView.setClickHandlerOnWatchlist(() => {
      this._handleWatchlistClick(film);
    });

    cardView.setClickHandlerOnFavorite(() => {
      this._handleFavoriteClick(film);
    });

    this._filmPresenter[film.id] = cardView;

    render(container, cardView, RenderPosition.BEFOREEND);
  }

  _handleWatchlistClick(film) {
    this._changeData(
        Object.assign(
            {},
            film,
            {
              isWatchlist: !film.isWatchlist
            }
        )
    );
  }

  _handleWatchedClick(film) {
    this._changeData(
        Object.assign(
            {},
            film,
            {
              isWatched: !film.isWatched
            }
        )
    );
  }

  _handleFavoriteClick(film) {
    this._changeData(
        Object.assign(
            {},
            film,
            {
              isFavorite: !film.isFavorite
            }
        )
    );
  }

  _renderMainFilmsContainer() {
    render(this._movieContainer, this._movieListComponent, RenderPosition.BEFOREEND);

    const filmsContainerElement = this._movieListComponent.getElement().querySelector(`.films-list__container`);

    filmsContainerElement.innerText = ``;

    this._films.slice(0, Math.min(this._films.length, TASKS_COUNT_PER_STEP)).forEach((film) => {
      this._renderCard(filmsContainerElement, film);
    });
  }

  _renderRatedFilmsContainer() {
    render(this._movieListComponent, this._ratedFilmsComponent, RenderPosition.BEFOREEND);

    const filmsTopRatedContainerElement = this._ratedFilmsComponent.getElement().querySelector(`.films-list--top-rated .films-list__container`);

    filmsTopRatedContainerElement.innerText = ``;

    this._films.sort((a, b) => b.rating - a.rating).slice(0, MAX_EXTRA_CARD_COUNT).forEach((film) => {
      this._renderCard(filmsTopRatedContainerElement, film);
    });
  }

  _renderCommentedFilmsContainer() {
    render(this._movieListComponent, this._commentedFilmsComponent, RenderPosition.BEFOREEND);

    const filmsMostCommentedContainerElement = this._commentedFilmsComponent.getElement().querySelector(`.films-list--most-commented .films-list__container`);

    filmsMostCommentedContainerElement.innerText = ``;

    this._films.sort((a, b) => b.comments.length - a.comments.length).slice(0, MAX_EXTRA_CARD_COUNT).forEach((film) => {
      this._renderCard(filmsMostCommentedContainerElement, film);
    });
  }
}
