import ProfileRating from "./view/profile-rating.js";
import Statistics from "./view/statistics.js";
import {generateTask} from "./mock/task.js";
import {TASKS_COUNT} from "./constants.js";
import {render, RenderPosition} from "./utils/render.js";
import MovieListPresenter from "./presenter/movie-list.js";
import MoviesModel from "./model/movies.js";
import FilterModel from "./model/filter.js";
import FilterPresenter from "./presenter/filter.js";
import Api from "./api.js";

const siteBodyElement = document.querySelector(`body`);
const siteHeaderElement = siteBodyElement.querySelector(`.header`);
const siteMainElement = siteBodyElement.querySelector(`.main`);
const siteFooterElement = siteBodyElement.querySelector(`.footer`);
const siteFooterStatisticsElement = siteFooterElement.querySelector(`.footer__statistics`);

const movies = new Array(TASKS_COUNT).fill().map(generateTask);
const AUTHORIZATION = `Basic wl638djdf654yzde`;
const END_POINT = `https://13.ecmascript.pages.academy/cinemaddict`;

const api = new Api(END_POINT, AUTHORIZATION);

api.getMovies().then((noo) => {
  console.log(noo);
});

const moviesModel = new MoviesModel();
moviesModel.setMovies(movies);

const filterModel = new FilterModel();
const profileRating = new ProfileRating();
const statistics = new Statistics();

render(siteHeaderElement, profileRating, RenderPosition.BEFOREEND);
render(siteFooterStatisticsElement, statistics, RenderPosition.BEFOREEND);

const movieList = new MovieListPresenter(siteMainElement, moviesModel, filterModel);
const filterPresenter = new FilterPresenter(siteMainElement, filterModel, moviesModel);

filterPresenter.init();

movieList.init();
