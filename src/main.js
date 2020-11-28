import {createProfileRatingTemplate} from "./view/profile-rating.js";
import {createMainNavigationTemplate} from "./view/main-navigation.js";
import {createSiteFilterTemplate} from "./view/site-filter.js";
import {createFilmsContainerTemplate} from "./view/films-container.js";
import {createFilmCardTemplate} from "./view/film-card.js";
import {createFilmsTopRatedContainerTemplate} from "./view/films-top-rated-container.js";
import {createFilmsMostCommentedContainerTemplate} from "./view/films-most-commented-container.js";
import {createFilmDetailsTemplate} from "./view/film-details.js";
import {createStatisticsTemplate} from "./view/statistics.js";
import {createShowMoreButtonTemplate} from "./view/show-more-button.js";
import {generateTask} from "./mock/task.js";
import {generateFilter} from "./mock/filter.js";
import {MAX_EXTRA_CARD_COUNT, TASKS_COUNT, TASKS_COUNT_PER_STEP, INDEX_FIRST_ELEMENT} from "./constants.js";

const siteBodyElement = document.querySelector(`body`);
const siteHeaderElement = siteBodyElement.querySelector(`.header`);
const siteMainElement = siteBodyElement.querySelector(`.main`);
const siteFooterElement = siteBodyElement.querySelector(`.footer`);
const siteFooterStatisticsElement = siteFooterElement.querySelector(`.footer__statistics`);

const tasks = new Array(TASKS_COUNT).fill().map(generateTask);
const filters = generateFilter(tasks);

function render(container, template, place) {
  container.insertAdjacentHTML(place, template);
}

render(siteHeaderElement, createProfileRatingTemplate(), `beforeend`);
render(siteFooterStatisticsElement, createStatisticsTemplate(), `beforeend`);
render(siteMainElement, createMainNavigationTemplate(filters), `beforeend`);
render(siteMainElement, createSiteFilterTemplate(), `beforeend`);
render(siteMainElement, createFilmsContainerTemplate(), `beforeend`);

const siteFilmsSectionElement = document.querySelector(`.films`);
const filmsContainerElement = siteFilmsSectionElement.querySelector(`.films-list__container`);

tasks.slice(0, Math.min(tasks.length, TASKS_COUNT_PER_STEP)).forEach((task) => {
  render(filmsContainerElement, createFilmCardTemplate(task), `beforeend`);
});

render(siteFilmsSectionElement, createFilmsTopRatedContainerTemplate(), `beforeend`);
render(siteFilmsSectionElement, createFilmsMostCommentedContainerTemplate(), `beforeend`);

const filmsTopRatedContainerElement = siteFilmsSectionElement.querySelector(`.films-list--top-rated .films-list__container`);
const filmsMostCommentedContainerElement = siteFilmsSectionElement.querySelector(`.films-list--most-commented .films-list__container`);

tasks.sort((a, b) => b.comments.length - a.comments.length).slice(0, MAX_EXTRA_CARD_COUNT).forEach((task) => {
  render(filmsTopRatedContainerElement, createFilmCardTemplate(task), `beforeend`);
});

tasks.sort((a, b) => b.rating - a.rating).slice(0, MAX_EXTRA_CARD_COUNT).forEach((task) => {
  render(filmsMostCommentedContainerElement, createFilmCardTemplate(task), `beforeend`);
});

render(siteBodyElement, createFilmDetailsTemplate(tasks[INDEX_FIRST_ELEMENT]), `beforeend`);

const siteFilmDetailsElement = document.querySelector(`.film-details`);
const detailsCloseButtonElement = siteFilmDetailsElement.querySelector(`.film-details__close-btn`);

if (tasks.length > TASKS_COUNT_PER_STEP) {
  let renderedTaskCount = TASKS_COUNT_PER_STEP;

  render(filmsContainerElement, createShowMoreButtonTemplate(), `afterend`);

  const showMoreButtonElement = siteFilmsSectionElement.querySelector(`.films-list__show-more`);

  showMoreButtonElement.addEventListener(`click`, function () {
    tasks
      .slice(renderedTaskCount, renderedTaskCount + TASKS_COUNT_PER_STEP)
      .forEach((task) => render(filmsContainerElement, createFilmCardTemplate(task), `beforeend`));

    renderedTaskCount += TASKS_COUNT_PER_STEP;

    if (renderedTaskCount >= tasks.length) {
      showMoreButtonElement.remove();
    }
  });
}

detailsCloseButtonElement.addEventListener(`click`, function () {
  siteFilmDetailsElement.classList.add(`visually-hidden`);
});
