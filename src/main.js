import ProfileRating from "./view/profile-rating.js";
import Statistics from "./view/statistics.js";
import {render, RenderPosition} from "./utils/render.js";
import MovieListPresenter from "./presenter/movie-list.js";
import MoviesModel from "./model/movies.js";
import FilterModel from "./model/filter.js";
import FilterPresenter from "./presenter/filter.js";
import Api from "./api.js";
import {UpdateType} from "./constants.js";

const AUTHORIZATION = `Basic wl638djdf654yzde`;
const END_POINT = `https://13.ecmascript.pages.academy/cinemaddict`;
const siteBodyElement = document.querySelector(`body`);
const siteHeaderElement = siteBodyElement.querySelector(`.header`);
const siteMainElement = siteBodyElement.querySelector(`.main`);
const siteFooterElement = siteBodyElement.querySelector(`.footer`);
const siteFooterStatisticsElement = siteFooterElement.querySelector(`.footer__statistics`);

const api = new Api(END_POINT, AUTHORIZATION);
const moviesModel = new MoviesModel();
const filterModel = new FilterModel();
const movieList = new MovieListPresenter(siteMainElement, moviesModel, filterModel, api);
const filterPresenter = new FilterPresenter(siteMainElement, filterModel, moviesModel);

filterPresenter.init();
movieList.init();

api.getMovies()
  .then((movies) => {
    moviesModel.setMovies(UpdateType.INIT, movies);

    const profileRating = new ProfileRating();
    const statistics = new Statistics();

    render(siteHeaderElement, profileRating, RenderPosition.BEFOREEND);
    render(siteFooterStatisticsElement, statistics, RenderPosition.BEFOREEND);
  })
  .catch(() => {
    moviesModel.setMovies(UpdateType.INIT, []);
    const profileRating = new ProfileRating();
    const statistics = new Statistics();

    render(siteHeaderElement, profileRating, RenderPosition.BEFOREEND);
    render(siteFooterStatisticsElement, statistics, RenderPosition.BEFOREEND);
  });
