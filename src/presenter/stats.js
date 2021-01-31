import Stats from "../view/stats.js";
import {render, RenderPosition} from "../utils/render.js";
import {countTasksByGenre, makeItemsUniq, openBox} from "../utils/common.js";
import dayjs from "dayjs";

// const heyHo = (yuu, dateFrom, dateTo) => {
//   console.log(yuu[0].watchingDate);
//   const i = dayjs(dateFrom).format(`D MMMM YYYY`);
//   const o = dayjs(dateTo).format(`D MMMM YYYY`);
//   const e = yuu[0].watchingDate;
//   const u = dayjs(e).format(`D MMMM YYYY`);
//   if (dayjs(u).isBetween(i, o)) {
//     console.log(1);
//   }
// };

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
    this._watchedForSomePeriod = null;

    this._statsComponent = new Stats();

    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._ffo = this._ffo.bind(this);

    this._moviesModel.addObserver(this._handleModelEvent);
  }

  init() {
    render(this._statsContainer, this._statsComponent, RenderPosition.BEFOREEND);
    this._statsComponent.setStatisticFilterClickHandler(this._ffo);
  }

  _ffo(statsFilter) {
    switch (statsFilter) {
      case StatsFilter.ALL:
        this.renderChart();
        break;
      case StatsFilter.TODAY:
        this.renderChart();
        break;
      case StatsFilter.WEEK:
        this.renderChart();
        break;
      case StatsFilter.MONTH:
        this.renderChart();
        break;
      case StatsFilter.YEAR:
        this.renderChart();
        break;
    }
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
