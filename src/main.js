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
import {MAX_EXTRA_CARD_COUNT, TASKS_COUNT, TASKS_COUNT_PER_STEP, INDEX_FIRST_ELEMENT} from "./constants.js";
import {renderElement, RenderPosition} from "./utils.js";

const siteBodyElement = document.querySelector(`body`);
const siteHeaderElement = siteBodyElement.querySelector(`.header`);
const siteMainElement = siteBodyElement.querySelector(`.main`);
const siteFooterElement = siteBodyElement.querySelector(`.footer`);
const siteFooterStatisticsElement = siteFooterElement.querySelector(`.footer__statistics`);
const tasks = new Array(TASKS_COUNT).fill().map(generateTask);
const filters = generateFilter(tasks);

renderElement(siteHeaderElement, new ProfileRating().getElement(), RenderPosition.BEFOREEND);
renderElement(siteFooterStatisticsElement, new Statistics().getElement(), RenderPosition.BEFOREEND);
renderElement(siteMainElement, new MainNavigation().getElement(filters), RenderPosition.BEFOREEND);
renderElement(siteMainElement, new Filter().getElement(), RenderPosition.BEFOREEND);
renderElement(siteMainElement, new FilmsMainContainer().getElement(), RenderPosition.BEFOREEND);

const siteFilmsSectionElement = document.querySelector(`.films`);
const filmsContainerElement = siteFilmsSectionElement.querySelector(`.films-list__container`);

tasks.slice(0, Math.min(tasks.length, TASKS_COUNT_PER_STEP)).forEach((task) => {
  renderElement(filmsContainerElement, new Card().getElement(task), RenderPosition.BEFOREEND);
});

renderElement(siteFilmsSectionElement, new FilmsTopRatedContainer().getElement(), RenderPosition.BEFOREEND);
renderElement(siteFilmsSectionElement, new FilmsMostCommentedContainer().getElement(), RenderPosition.BEFOREEND);

const filmsTopRatedContainerElement = siteFilmsSectionElement.querySelector(`.films-list--top-rated .films-list__container`);
const filmsMostCommentedContainerElement = siteFilmsSectionElement.querySelector(`.films-list--most-commented .films-list__container`);

tasks.sort((a, b) => b.comments.length - a.comments.length).slice(0, MAX_EXTRA_CARD_COUNT).forEach((task) => {
  renderElement(filmsTopRatedContainerElement, new Card().getElement(task), RenderPosition.BEFOREEND);
});

tasks.sort((a, b) => b.rating - a.rating).slice(0, MAX_EXTRA_CARD_COUNT).forEach((task) => {
  renderElement(filmsMostCommentedContainerElement, new Card().getElement(task), RenderPosition.BEFOREEND);
});

renderElement(siteBodyElement, new Popup().getElement(tasks[INDEX_FIRST_ELEMENT]), RenderPosition.BEFOREEND);

const siteFilmDetailsElement = document.querySelector(`.film-details`);
const detailsCloseButtonElement = siteFilmDetailsElement.querySelector(`.film-details__close-btn`);
const filmsMainContainerElement = siteFilmsSectionElement.querySelector(`.films-list--main`);

if (tasks.length > TASKS_COUNT_PER_STEP) {
  let renderedTaskCount = TASKS_COUNT_PER_STEP;

  renderElement(filmsMainContainerElement, new ShowMoreButton().getElement(), RenderPosition.BEFOREEND);

  const showMoreButtonElement = siteFilmsSectionElement.querySelector(`.films-list__show-more`);

  showMoreButtonElement.addEventListener(`click`, function () {
    tasks
      .slice(renderedTaskCount, renderedTaskCount + TASKS_COUNT_PER_STEP)
      .forEach((task) => renderElement(filmsContainerElement, new Card().getElement(task), RenderPosition.BEFOREEND));

    renderedTaskCount += TASKS_COUNT_PER_STEP;

    if (renderedTaskCount >= tasks.length) {
      showMoreButtonElement.remove();
    }
  });
}

detailsCloseButtonElement.addEventListener(`click`, function () {
  siteFilmDetailsElement.classList.add(`visually-hidden`);
});
