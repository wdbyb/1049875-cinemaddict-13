import ProfileRating from "./view/profile-rating.js";
import MainNavigation from "./view/main-navigation.js";
import Filter from "./view/site-filter.js";
import FilmsMainContainer from "./view/films-container.js";
import Card from "./view/film-card.js";
import FilmsTopRatedContainer from "./view/films-top-rated-container.js";
import FilmsMostCommentedContainer from "./view/films-most-commented-container.js";
import Popup from "./view/film-details.js";
import Statistics from "./view/statistics.js";
import ShowMoreButton from "./view/show-more-button.js";
import {generateTask} from "./mock/task.js";
import {generateFilter} from "./mock/filter.js";
import {MAX_EXTRA_CARD_COUNT, TASKS_COUNT, TASKS_COUNT_PER_STEP} from "./constants.js";
import {render, remove, RenderPosition} from "./utils/render.js";
import BoardPresenter from "./presenter/board.js";

const siteBodyElement = document.querySelector(`body`);
const siteHeaderElement = siteBodyElement.querySelector(`.header`);
const siteMainElement = siteBodyElement.querySelector(`.main`);
const siteFooterElement = siteBodyElement.querySelector(`.footer`);
const siteFooterStatisticsElement = siteFooterElement.querySelector(`.footer__statistics`);
const tasks = new Array(TASKS_COUNT).fill().map(generateTask);
const filters = generateFilter(tasks);
const profileRating = new ProfileRating();
const statistics = new Statistics();
const mainNavigation = new MainNavigation(filters);
const filterNavigation = new Filter();
const filmsMainContainer = new FilmsMainContainer();
const topRatedFilmsContainer = new FilmsTopRatedContainer();
const mostCommentedFilmsContainer = new FilmsMostCommentedContainer();
const showMoreButton = new ShowMoreButton();

render(siteHeaderElement, profileRating, RenderPosition.BEFOREEND);
render(siteFooterStatisticsElement, statistics, RenderPosition.BEFOREEND);
render(siteMainElement, mainNavigation, RenderPosition.BEFOREEND);
render(siteMainElement, filterNavigation, RenderPosition.BEFOREEND);


const boo = new BoardPresenter(siteMainElement);

boo.init(tasks);
