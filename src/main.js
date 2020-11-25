import {createProfileRatingTemplate} from "./view/profile-rating.js";
import {createMainNavigationTemplate} from "./view/main-navigation.js";
import {createSiteFilterTemplate} from "./view/site-filter.js";
import {createFilmsContainerTemplate} from "./view/films-container.js";
import {createFilmCardTemplate} from "./view/film-card.js";
import {createFilmsExtraContainerTemplate} from "./view/films-extra-container.js";
import {createFilmDetailsTemplate} from "./view/film-details.js";
import {createStatisticsTemplate} from "./view/statistics.js";
import {generateTask} from "./mock/task.js";

const MAX_CARD_COUNT = 5;
const MAX_EXTRA_CARD_COUNT = 2;
const EXTRA_LIST_COUNT = 2;
const TASKS_COUNT = 20;
const siteBodyElement = document.querySelector(`body`);
const siteHeaderElement = siteBodyElement.querySelector(`.header`);
const siteMainElement = siteBodyElement.querySelector(`.main`);
const siteFooterElement = siteBodyElement.querySelector(`.footer`);
const siteFooterStatisticsElement = siteFooterElement.querySelector(`.footer__statistics`);
const tasks = new Array(TASKS_COUNT).fill().map(generateTask);

function render(container, template, place) {
  container.insertAdjacentHTML(place, template);
}

render(siteHeaderElement, createProfileRatingTemplate(), `beforeend`);
render(siteFooterStatisticsElement, createStatisticsTemplate(), `beforeend`);
render(siteMainElement, createMainNavigationTemplate(), `beforeend`);
render(siteMainElement, createSiteFilterTemplate(), `beforeend`);
render(siteMainElement, createFilmsContainerTemplate(), `beforeend`);

const siteFilmsSectionElement = document.querySelector(`.films`);
const filmsContainerElement = siteFilmsSectionElement.querySelector(`.films-list__container`);

for (let i = 0; i < MAX_CARD_COUNT; i++) {
  render(filmsContainerElement, createFilmCardTemplate(tasks[i]), `beforeend`);
}

for (let i = 0; i < EXTRA_LIST_COUNT; i++) {
  render(siteFilmsSectionElement, createFilmsExtraContainerTemplate(), `beforeend`);
}

const filmsExtraContainerElements = siteFilmsSectionElement.querySelectorAll(`.films-list--extra`);

for (let i = 0; i < MAX_EXTRA_CARD_COUNT; i++) {
  let theContainer = filmsExtraContainerElements[i];
  for (let k = 0; k < MAX_EXTRA_CARD_COUNT; k++) {
    render(theContainer.querySelector(`.films-list__container`), createFilmCardTemplate(tasks[k]), `beforeend`);
  }
}

render(siteBodyElement, createFilmDetailsTemplate(tasks[0]), `beforeend`);

const siteFilmDetailsElement = document.querySelector(`.film-details`);
const detailsCloseButtonElement = siteFilmDetailsElement.querySelector(`.film-details__close-btn`);

detailsCloseButtonElement.addEventListener(`click`, function () {
  siteFilmDetailsElement.classList.add(`visually-hidden`);
});
