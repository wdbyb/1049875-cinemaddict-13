import FilmsMainContainer from "../view/films-container.js";
import ShowMoreButton from "../view/show-more-button.js";
import FilmsTopRatedContainer from "../view/films-top-rated-container.js";
import FilmsMostCommentedContainer from "../view/films-most-commented-container.js";
import CardView from "../view/film-card.js";
import PopupView from "../view/film-details.js";
import {MAX_EXTRA_CARD_COUNT, TASKS_COUNT_PER_STEP} from "../constants.js";
import {render, remove, RenderPosition} from "../utils/render.js";

const siteMainElement = document.querySelector(`.main`);

export default class BoardPresenter {
  constructor(boardContainer) {
    this._boardContainer = boardContainer;
    this._renderedFilmsCount = TASKS_COUNT_PER_STEP;
    this._renderedExtraFilmsCount = MAX_EXTRA_CARD_COUNT;

    this._boardComponent = new FilmsMainContainer();
    this._showMoreButtonComponent = new ShowMoreButton();
    this._filmsTopRatedComponent = new FilmsTopRatedContainer();
    this._filmsMostCommentedComponent = new FilmsMostCommentedContainer();
  }

  init(films) {
    this._bodyElement = document.querySelector(`body`);
    this._films = films.slice();
    // this._container = container

    this._renderFilmsMainContainer();

    this._filmsElement = document.querySelector(`.films`);

    this._renderFilmsTopRatedContainer();
    this._renderFilmsMostCommentedContainer();
    this._renderShowMoreButton();
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
    const card = new CardView(film);

    card.setClickHandlerOnTitle(() => {
      this._renderPopup(film);
    });

    card.setClickHandlerOnPoster(() => {
      this._renderPopup(film);
    });

    card.setClickHandlerOnComments(() => {
      this._renderPopup(film);
    });

    render(container, card, RenderPosition.BEFOREEND);
  }

  _renderFilmsMainContainer() {
    render(this._boardContainer, this._boardComponent, RenderPosition.BEFOREEND);

    const filmsContainerElement = this._boardComponent.getElement().querySelector(`.films-list__container`);

    this._films.slice(0, Math.min(this._films.length, this._renderedFilmsCount)).forEach((film) => {
      this._renderCard(filmsContainerElement, film);
    });
  }

  _renderFilmsTopRatedContainer() {
    render(this._filmsElement, this._filmsTopRatedComponent, RenderPosition.BEFOREEND);

    const filmsTopRatedContainerElement = document.querySelector(`.films-list--top-rated .films-list__container`);

    this._films.sort((a, b) => b.rating - a.rating).slice(0, this._renderedExtraFilmsCount).forEach((film) => {
      this._renderCard(filmsTopRatedContainerElement, film);
    });
  }

  _renderFilmsMostCommentedContainer() {
    render(this._filmsElement, this._filmsMostCommentedComponent, RenderPosition.BEFOREEND);

    const filmsMostCommentedContainerElement = document.querySelector(`.films-list--most-commented .films-list__container`);

    this._films.sort((a, b) => b.comments.length - a.comments.length).slice(0, this._renderedExtraFilmsCount).forEach((film) => {
      this._renderCard(filmsMostCommentedContainerElement, film);
    });
  }

  _renderShowMoreButton() {
    const filmsMainContainerElement = this._filmsElement.querySelector(`.films-list--main`);
    const filmsContainerElement = this._boardComponent.getElement().querySelector(`.films-list__container`);

    if (this._films.length > this._renderedFilmsCount) {
      let renderedTaskCount = this._renderedFilmsCount;

      render(filmsMainContainerElement, this._showMoreButtonComponent, RenderPosition.BEFOREEND);

      this._showMoreButtonComponent.setClickHandler(() => {
        this._films
          .slice(renderedTaskCount, renderedTaskCount + this._renderedFilmsCount)
          .forEach((film) => this._renderCard(filmsContainerElement, film));

        renderedTaskCount += this._renderedFilmsCount;

        if (renderedTaskCount >= this._films.length) {
          remove(this._showMoreButtonComponent);
        }
      });
    }
  }
}
