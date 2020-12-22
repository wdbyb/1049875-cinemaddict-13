import ProfileRating from "./view/profile-rating.js";
import MainNavigation from "./view/main-navigation.js";
// import Filter from "./view/site-filter.js";
import Statistics from "./view/statistics.js";
import {generateTask} from "./mock/task.js";
import {generateFilter} from "./mock/filter.js";
import {TASKS_COUNT} from "./constants.js";
import {render, RenderPosition} from "./utils/render.js";
import MovieListPresenter from "./presenter/movie-list.js";
import MoviesModel from "./model/movies.js";

const siteBodyElement = document.querySelector(`body`);
const siteHeaderElement = siteBodyElement.querySelector(`.header`);
const siteMainElement = siteBodyElement.querySelector(`.main`);
const siteFooterElement = siteBodyElement.querySelector(`.footer`);
const siteFooterStatisticsElement = siteFooterElement.querySelector(`.footer__statistics`);

const movies = new Array(TASKS_COUNT).fill().map(generateTask);
const filters = generateFilter(movies);
const moviesModel = new MoviesModel();
moviesModel.setMovies(movies);

const profileRating = new ProfileRating();
const statistics = new Statistics();
const mainNavigation = new MainNavigation(filters);
// const filterNavigation = new Filter();

render(siteHeaderElement, profileRating, RenderPosition.BEFOREEND);
render(siteFooterStatisticsElement, statistics, RenderPosition.BEFOREEND);
render(siteMainElement, mainNavigation, RenderPosition.BEFOREEND);
// render(siteMainElement, filterNavigation, RenderPosition.BEFOREEND);

const movieList = new MovieListPresenter(siteMainElement, moviesModel);

movieList.init();
