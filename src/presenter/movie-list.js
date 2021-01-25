import FilmsMainContainer from "../view/films-container.js";
import ShowMoreButton from "../view/show-more-button.js";
import FilmsTopRatedContainer from "../view/films-top-rated-container.js";
import FilmsMostCommentedContainer from "../view/films-most-commented-container.js";
import CardView from "../view/film-card.js";
import PopupView from "../view/film-details.js";
import Sort from "../view/site-filter.js";
import {MAX_EXTRA_CARD_COUNT, TASKS_COUNT_PER_STEP, UserAction, UpdateType, SortType} from "../constants.js";
import {render, remove, RenderPosition} from "../utils/render.js";
import {filter} from "../utils/common.js";

export default class MovieListPresenter {
  constructor(movieContainer, moviesModel, filterModel, api) {
    this._movieContainer = movieContainer;
    this._moviesModel = moviesModel;
    this._filterModel = filterModel;
    this._api = api;
    this._filmPresenter = {};
    this._popup = null;
    this._currentSortType = SortType.DEFAULT;

    this._renderedFilmsCount = TASKS_COUNT_PER_STEP;

    this._movieListComponent = new FilmsMainContainer();
    this._showMoreButtonComponent = new ShowMoreButton();
    this._ratedFilmsComponent = new FilmsTopRatedContainer();
    this._commentedFilmsComponent = new FilmsMostCommentedContainer();
    this._sortMoviesComponent = new Sort(this._currentSortType);

    this._handleShowMoreButtonClick = this._handleShowMoreButtonClick.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
    this._handlePopupWatchlistClick = this._handlePopupWatchlistClick.bind(this);
    this._handlePopupFavoriteClick = this._handlePopupFavoriteClick.bind(this);
    this._handlePopupWatchedClick = this._handlePopupWatchedClick.bind(this);
    this._handlePopupCommentPost = this._handlePopupCommentPost.bind(this);
    this._handlePopupCommentDelete = this._handlePopupCommentDelete.bind(this);

    this._moviesModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);
  }

  init() {
    this._bodyElement = document.querySelector(`body`);
    this._renderMoviesList();
    this._clearMoviesList();
    this._renderMoviesList();
  }

  _handleModelEvent(updateType, data) {
    const filmsContainerElement = this._movieListComponent.getElement().querySelector(`.films-list__container`);

    switch (updateType) {
      case UpdateType.PATCH:
        this._renderCard(filmsContainerElement, data);
        break;
      case UpdateType.MINOR:
        this._clearMoviesList();
        this._renderMoviesList();
        if (this._popup !== null) {
          this._popup.updateElement();
        }
        break;
      case UpdateType.COMMENTS:
        this._clearMoviesList();
        this._renderMoviesList();
        this._popup.updateData({
          comments: data.comments,
          inputText: ``
        });
        break;
      case UpdateType.MAJOR:
        this._clearMoviesList({something: true});
        this._renderMoviesList();
        break;
      case UpdateType.INIT:
        this._clearMoviesList({something: true});
        this._renderMoviesList();
        break;
    }
  }

  _handleViewAction(actionType, updateType, update) {
    switch (actionType) {
      case UserAction.UPDATE_MOVIE:
        this._api.updateMovie(updateType, update).then((response) => {
          this._moviesModel.updateMovie(updateType, response);
        });
        break;
      case UserAction.ADD_COMMENT:
        this._api.addComment(updateType, update).then((response) => {
          this._moviesModel.updateMovie(updateType, response);
        });
        break;
      case UserAction.DELETE_COMMENT:
        this._api.deleteComment(updateType, update);
        break;
    }
  }

  _getMovies() {
    const filterType = this._filterModel.getFilter();
    const movies = this._moviesModel.getMovies();
    const filtredTasks = filter[filterType](movies);

    switch (this._currentSortType) {
      case SortType.DEFAULT:
        return filtredTasks;
      case SortType.DATE:
        return filtredTasks.sort((a, b) => b.year - a.year);
      case SortType.RATING:
        return filtredTasks.sort((a, b) => b.rating - a.rating);
    }

    return filtredTasks;
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._currentSortType = sortType;
    this._clearMoviesList();
    this._renderMoviesList();
  }

  _renderSort() {
    render(this._movieContainer, this._sortMoviesComponent, RenderPosition.BEFOREEND);
    this._sortMoviesComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
  }

  _handleShowMoreButtonClick() {
    const filmsContainerElement = this._movieListComponent.getElement().querySelector(`.films-list__container`);
    const moviesCount = this._getMovies().length;
    const newRenderedMovieCount = Math.min(moviesCount, this._renderedFilmsCount + TASKS_COUNT_PER_STEP);
    const movies = this._getMovies().slice(this._renderedFilmsCount, newRenderedMovieCount);

    this._renderCards(filmsContainerElement, movies);
    this._renderedFilmsCount = newRenderedMovieCount;

    if (this._renderedFilmsCount >= moviesCount) {
      remove(this._showMoreButtonComponent);
    }
  }

  _renderShowMoreButton() {
    const filmsMainContainerElement = this._movieListComponent.getElement().querySelector(`.films-list--main`);

    render(filmsMainContainerElement, this._showMoreButtonComponent, RenderPosition.BEFOREEND);

    this._showMoreButtonComponent.setClickHandler(this._handleShowMoreButtonClick);
  }

  _renderPopup(film) {
    this._api.getComments(film)
      .then((comments) => {
        film.comments = comments;

        const popup = new PopupView(film);

        this._popup = popup;

        render(this._bodyElement, popup, RenderPosition.BEFOREEND);

        this._bodyElement.classList.add(`hide-overflow`);

        popup.setClickHandlerOnWatched(this._handlePopupWatchedClick);

        popup.setClickHandlerOnWatchlist(this._handlePopupWatchlistClick);

        popup.setClickHandlerOnFavorite(this._handlePopupFavoriteClick);

        popup.setClickHandlerOnComment(this._handlePopupCommentPost);

        popup.setClickHandlerDeleteComment(this._handlePopupCommentDelete);

        popup.setClickHandlerCloseBtn(() => {
          remove(popup);

          this._bodyElement.classList.remove(`hide-overflow`);
        });
      });
  }

  _renderCard(container, film) {
    const cardView = new CardView(film);

    cardView.setClickHandlerOnFilm(() => {
      this._renderPopup(film);
    });

    cardView.setClickHandlerOnWatched(() => {
      this._handleCardWatchedClick(film);
    });

    cardView.setClickHandlerOnWatchlist(() => {
      this._handleCardWatchlistClick(film);
    });

    cardView.setClickHandlerOnFavorite(() => {
      this._handleCardFavoriteClick(film);
    });

    this._filmPresenter[film.id] = cardView;

    render(container, cardView, RenderPosition.BEFOREEND);
  }

  _renderCards(container, movies) {
    movies.forEach((movie) => this._renderCard(container, movie));
  }

  _renderMainFilmsContainer() {
    const movies = this._getMovies();
    const movieCount = movies.length;

    render(this._movieContainer, this._movieListComponent, RenderPosition.BEFOREEND);

    const filmsContainerElement = this._movieListComponent.getElement().querySelector(`.films-list__container`);
    const mainMovies = movies.slice(0, Math.min(movieCount, this._renderedFilmsCount));

    this._renderCards(filmsContainerElement, mainMovies);
  }

  _renderRatedFilmsContainer() {
    render(this._movieListComponent, this._ratedFilmsComponent, RenderPosition.BEFOREEND);

    const filmsTopRatedContainerElement = this._ratedFilmsComponent.getElement().querySelector(`.films-list--top-rated .films-list__container`);
    const sortMovies = this._getMovies().sort((a, b) => b.rating - a.rating).slice(0, MAX_EXTRA_CARD_COUNT);

    this._renderCards(filmsTopRatedContainerElement, sortMovies);
  }

  _renderCommentedFilmsContainer() {
    render(this._movieListComponent, this._commentedFilmsComponent, RenderPosition.BEFOREEND);

    const filmsMostCommentedContainerElement = this._commentedFilmsComponent.getElement().querySelector(`.films-list--most-commented .films-list__container`);
    const sortMovies = this._getMovies().sort((a, b) => b.comments.length - a.comments.length).slice(0, MAX_EXTRA_CARD_COUNT);

    this._renderCards(filmsMostCommentedContainerElement, sortMovies);
  }

  _clearMoviesList() {
    const filmsContainerElement = this._movieListComponent.getElement().querySelector(`.films-list__container`);
    const filmsTopRatedContainerElement = this._ratedFilmsComponent.getElement().querySelector(`.films-list--top-rated .films-list__container`);
    const filmsMostCommentedContainerElement = this._commentedFilmsComponent.getElement().querySelector(`.films-list--most-commented .films-list__container`);

    filmsContainerElement.innerText = ``;
    filmsTopRatedContainerElement.innerText = ``;
    filmsMostCommentedContainerElement.innerText = ``;
  }

  _renderMoviesList() {
    this._renderSort();

    this._renderMainFilmsContainer();

    this._filmsElement = document.querySelector(`.films`);

    this._renderRatedFilmsContainer();
    this._renderCommentedFilmsContainer();
    this._renderShowMoreButton();
  }

  _handlePopupCommentPost(film) {
    this._handleViewAction(
        UserAction.ADD_COMMENT,
        UpdateType.COMMENTS,
        film
    );
  }

  _handlePopupCommentDelete(comId) {
    this._handleViewAction(
        UserAction.DELETE_COMMENT,
        UpdateType.MINOR,
        comId
    );
  }

  _handlePopupWatchlistClick(film) {
    this._handleViewAction(
        UserAction.UPDATE_MOVIE,
        UpdateType.MINOR,
        film
    );
  }

  _handlePopupWatchedClick(film) {
    this._handleViewAction(
        UserAction.UPDATE_MOVIE,
        UpdateType.MINOR,
        film
    );
  }

  _handlePopupFavoriteClick(film) {
    this._handleViewAction(
        UserAction.UPDATE_MOVIE,
        UpdateType.MINOR,
        film
    );
  }

  _handleCardWatchlistClick(film) {
    this._handleViewAction(
        UserAction.UPDATE_MOVIE,
        UpdateType.MINOR,
        Object.assign(
            {},
            film,
            {
              isWatchlist: !film.isWatchlist
            }
        )
    );
  }

  _handleCardWatchedClick(film) {
    this._handleViewAction(
        UserAction.UPDATE_MOVIE,
        UpdateType.MINOR,
        Object.assign(
            {},
            film,
            {
              isWatched: !film.isWatched
            }
        )
    );
  }

  _handleCardFavoriteClick(film) {
    this._handleViewAction(
        UserAction.UPDATE_MOVIE,
        UpdateType.MINOR,
        Object.assign(
            {},
            film,
            {
              isFavorite: !film.isFavorite
            }
        )
    );
  }
}
