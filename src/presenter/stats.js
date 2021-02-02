import Stats from "../view/stats.js";
import {render, RenderPosition} from "../utils/render.js";
import {countTasksByGenre, makeItemsUniq, openBox} from "../utils/common.js";
import dayjs from "dayjs";
import {StatsFilter} from "../constants.js";

const filterByStartDate = (movies, startPoint) => {
  startPoint = startPoint.startOf(`day`);
  return movies.filter((movie) => dayjs(movie.watchingDate).isAfter(startPoint));
};

export default class StatsPresenter {
  constructor(statsContainer, moviesModel) {
    this._statsContainer = statsContainer;
    this._moviesModel = moviesModel;
    this._movies = null;
    this._uniqGenres = null;
    this._movieByGenreCounts = null;
    this._mostWatchedGenre = null;
    this._totalDuration = {
      HOURS: 0,
      MINUTES: 0
    };
    this._watchedMovies = null;

    this._statsComponent = new Stats();

    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._statsFilterHandler = this._statsFilterHandler.bind(this);

    this._moviesModel.addObserver(this._handleModelEvent);
  }

  init() {
    render(this._statsContainer, this._statsComponent, RenderPosition.BEFOREEND);
    this._statsComponent.setStatisticFilterClickHandler(this._statsFilterHandler);
  }

  _statsFilterHandler(statsFilter) {
    switch (statsFilter) {
      case StatsFilter.ALL:
        this._watchedMovies = this._movies.filter((movie) => movie.isWatched);
        break;
      case StatsFilter.TODAY:
        this._watchedMovies = filterByStartDate(this._movies, dayjs().subtract(1, `day`));
        break;
      case StatsFilter.WEEK:
        this._watchedMovies = filterByStartDate(this._movies, dayjs().subtract(1, `week`));
        break;
      case StatsFilter.MONTH:
        this._watchedMovies = filterByStartDate(this._movies, dayjs().subtract(1, `month`));
        break;
      case StatsFilter.YEAR:
        this._watchedMovies = filterByStartDate(this._movies, dayjs().subtract(1, `year`));
        break;
    }
    this._getGenres(this._watchedMovies);
    this._countHoursAndMinutes();
    this._statsComponent.changeInfo(this._watchedMovies, this._totalDuration, this._mostWatchedGenre, statsFilter);
    this._statsComponent.updateElement();
    this.renderChart();
  }

  _handleModelEvent() {
    this._getMovies();
    this._statsComponent = new Stats(this._watchedMovies, this._totalDuration, this._mostWatchedGenre);
    this.hide();
    this.renderChart();
    render(this._statsContainer, this._statsComponent, RenderPosition.BEFOREEND);
  }

  _getMovies() {
    this._movies = this._moviesModel.getMovies();
    this._watchedMovies = this._movies.filter((movie) => movie.isWatched);

    this._getGenres(this._watchedMovies);
    this._countHoursAndMinutes();
  }

  _countHoursAndMinutes() {
    let watchedMinutes = [];

    this._watchedMovies.forEach((item) => watchedMinutes.push(item.duration));

    watchedMinutes = watchedMinutes.reduce((a, b) => a + b, 0);

    this._totalDuration = {
      HOURS: (watchedMinutes - watchedMinutes % 60) / 60,
      MINUTES: watchedMinutes % 60
    };
  }

  _getGenres(watchedMovies) {
    const movieGenres = watchedMovies.map((movie) => movie.genres);
    const movieGenre = openBox(movieGenres);

    this._uniqGenres = makeItemsUniq(movieGenre);
    this._movieByGenreCounts = this._uniqGenres.map((genre) => countTasksByGenre(movieGenre, genre));

    const topWatchedNumber = this._movieByGenreCounts.slice().sort((a, b) => a - b).pop();
    this._mostWatchedGenre = this._uniqGenres[this._movieByGenreCounts.indexOf(topWatchedNumber)];
  }

  hide() {
    this._statsComponent.getElement().classList.add(`visually-hidden`);
    if (document.querySelector(`.main-navigation__additional`).classList.contains(`main-navigation__additional--active`)) {
      document.querySelector(`.main-navigation__additional`).classList.remove(`main-navigation__additional--active`);
    }
  }

  show() {
    this._statsComponent.getElement().classList.remove(`visually-hidden`);
  }

  renderChart() {
    this._statsComponent.renderChart(this._uniqGenres, this._movieByGenreCounts);
  }
}
