import Abstract from "./abstract.js";
import {MenuItem} from "../constants.js";

const createMainNavigationItem = (filter, currentFilterType) => {
  const {type, name, count} = filter;

  return (`<a id="${type}" href="#${name}" class="main-navigation__item main-navigation__item${type === currentFilterType ? `--active` : ``}">${name} <span class="main-navigation__item-count">${count}</span></a>`);
};

const createMainNavigationTemplate = (filterItems, currentFilterType) => {
  const createMainNavigationItems = filterItems
    .map((filter) => createMainNavigationItem(filter, currentFilterType))
    .join(``);

  return `<nav class="main-navigation">
    <div class="main-navigation__items">
      ${createMainNavigationItems}
    </div>
    <a href="#stats" id="stats" class="main-navigation__additional">Stats</a>
  </nav>`;
};

export default class MainNavigation extends Abstract {
  constructor(filters, currentFilterType) {
    super();
    this._filters = filters;
    this._currentFilter = currentFilterType;

    this._filterTypeChangeHandler = this._filterTypeChangeHandler.bind(this);
    this._menuClickHandler = this._menuClickHandler.bind(this);
  }

  getTemplate() {
    return createMainNavigationTemplate(this._filters, this._currentFilter);
  }

  _menuClickHandler(evt) {
    evt.preventDefault();
    this._callback.menuClick(evt.target.id);
    if (evt.target.id === MenuItem.STATS) {
      evt.target.classList.add(`main-navigation__additional--active`);
    }
  }

  setMenuClickHandler(callback) {
    this._callback.menuClick = callback;
    this.getElement().addEventListener(`click`, this._menuClickHandler);
  }

  _filterTypeChangeHandler(evt) {
    evt.preventDefault();
    this._callback.filterTypeChange(evt.target.id);
  }

  setFilterTypeChangeHandler(callback) {
    this._callback.filterTypeChange = callback;
    this.getElement().querySelectorAll(`.main-navigation__item`).forEach((item) => {
      item.addEventListener(`click`, this._filterTypeChangeHandler);
    });
  }
}
