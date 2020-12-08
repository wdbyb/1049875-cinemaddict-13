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
import {renderElement, RenderPosition} from "./utils.js";

const siteBodyElement = document.querySelector(`body`);
const siteHeaderElement = siteBodyElement.querySelector(`.header`);
const siteMainElement = siteBodyElement.querySelector(`.main`);
const siteFooterElement = siteBodyElement.querySelector(`.footer`);
const siteFooterStatisticsElement = siteFooterElement.querySelector(`.footer__statistics`);
const tasks = new Array(TASKS_COUNT).fill().map(generateTask);
const filters = generateFilter(tasks);

const renderCard = (container, task) => {
  const card = new Card(task);

  const renderPopup = (cardData) => {
    const popup = new Popup(cardData);

    renderElement(siteBodyElement, popup.getElement(), RenderPosition.BEFOREEND);

    siteBodyElement.classList.add(`hide-overflow`);

    popup.getElement().querySelector(`.film-details__close-btn`).addEventListener(`click`, function () {
      popup.getElement().remove();

      siteBodyElement.classList.remove(`hide-overflow`);
    });
  };

  card.getElement().querySelector(`.film-card__title`).addEventListener(`click`, () => {
    renderPopup(task);
  });

  card.getElement().querySelector(`.film-card__poster`).addEventListener(`click`, () => {
    renderPopup(task);
  });

  card.getElement().querySelector(`.film-card__comments`).addEventListener(`click`, () => {
    renderPopup(task);
  });

  renderElement(container, card.getElement(), RenderPosition.BEFOREEND);
};

renderElement(siteHeaderElement, new ProfileRating().getElement(), RenderPosition.BEFOREEND);
renderElement(siteFooterStatisticsElement, new Statistics().getElement(), RenderPosition.BEFOREEND);
renderElement(siteMainElement, new MainNavigation(filters).getElement(), RenderPosition.BEFOREEND);
renderElement(siteMainElement, new Filter().getElement(), RenderPosition.BEFOREEND);
renderElement(siteMainElement, new FilmsMainContainer().getElement(), RenderPosition.BEFOREEND);

const siteFilmsSectionElement = document.querySelector(`.films`);
const filmsContainerElement = siteFilmsSectionElement.querySelector(`.films-list__container`);

tasks.slice(0, Math.min(tasks.length, TASKS_COUNT_PER_STEP)).forEach((task) => {
  renderCard(filmsContainerElement, task);
});

renderElement(siteFilmsSectionElement, new FilmsTopRatedContainer().getElement(), RenderPosition.BEFOREEND);
renderElement(siteFilmsSectionElement, new FilmsMostCommentedContainer().getElement(), RenderPosition.BEFOREEND);

const filmsTopRatedContainerElement = siteFilmsSectionElement.querySelector(`.films-list--top-rated .films-list__container`);
const filmsMostCommentedContainerElement = siteFilmsSectionElement.querySelector(`.films-list--most-commented .films-list__container`);

tasks.sort((a, b) => b.comments.length - a.comments.length).slice(0, MAX_EXTRA_CARD_COUNT).forEach((task) => {
  renderCard(filmsTopRatedContainerElement, task);
});

tasks.sort((a, b) => b.rating - a.rating).slice(0, MAX_EXTRA_CARD_COUNT).forEach((task) => {
  renderCard(filmsMostCommentedContainerElement, task);
});


const filmsMainContainerElement = siteFilmsSectionElement.querySelector(`.films-list--main`);

if (tasks.length > TASKS_COUNT_PER_STEP) {
  let renderedTaskCount = TASKS_COUNT_PER_STEP;

  renderElement(filmsMainContainerElement, new ShowMoreButton().getElement(), RenderPosition.BEFOREEND);

  const showMoreButtonElement = siteFilmsSectionElement.querySelector(`.films-list__show-more`);

  showMoreButtonElement.addEventListener(`click`, function () {
    tasks
      .slice(renderedTaskCount, renderedTaskCount + TASKS_COUNT_PER_STEP)
      .forEach((task) => renderCard(filmsContainerElement, task));

    renderedTaskCount += TASKS_COUNT_PER_STEP;

    if (renderedTaskCount >= tasks.length) {
      showMoreButtonElement.remove();
    }
  });
}
