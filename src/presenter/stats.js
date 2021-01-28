import Stats from "../view/stats.js";
import {render, RenderPosition} from "../utils/render.js";

export default class StatsPresenter {
  constructor(statsContainer, moviesModel) {
    this._statsContainer = statsContainer;
    this._moviesModel = moviesModel;
    this._movies = null;

    this._statsComponent = new Stats();

    this._handleModelEvent = this._handleModelEvent.bind(this);

    this._moviesModel.addObserver(this._handleModelEvent);
  }

  init() {
    render(this._statsContainer, this._statsComponent, RenderPosition.BEFOREEND);
  }

  _handleModelEvent() {
    this._statsComponent = null;
    this._statsComponent = new Stats();
    this.hide();
    render(this._statsContainer, this._statsComponent, RenderPosition.BEFOREEND);
    this._getMovies();
    this.renderChart();
  }

  _getMovies() {
    this._movies = this._moviesModel.getMovies();
  }

  hide() {
    this._statsComponent.getElement().classList.add(`visually-hidden`);
  }

  show() {
    this._statsComponent.getElement().classList.remove(`visually-hidden`);
  }
  renderChart() {
    this._statsComponent.renderChart(this._movies);
  }
}
