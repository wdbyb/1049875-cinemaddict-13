import {NavigationNames} from "../constants.js";
import Abstract from "./abstract.js";

const createMainNavigationItem = (filter, currentFilterType) => {
  const {type, name, count} = filter;

  return (`<a id="${type}" href="#${name}" class="main-navigation__item${type === currentFilterType ? `--active` : ``}">${name} <span class="main-navigation__item-count">${count}</span></a>`);
};

const createMainNavigationTemplate = (filterItems, currentFilterType) => {
  // <a href="#all" class="main-navigation__item main-navigation__item${type === currentFilterType ? `--active` : ``}">All movies</a>
  const {type, name, count} = filterItems;
  const createMainNavigationItems = filterItems
    .map((filter, index) => createMainNavigationItem(filter, currentFilterType))
    .join(``);

  return `<nav class="main-navigation">
    <div class="main-navigation__items">
      ${createMainNavigationItems}
    </div>
    <a href="#stats" class="main-navigation__additional">Stats</a>
  </nav>`;
};

export default class MainNavigation extends Abstract {
  constructor(filters, currentFilterType) {
    super();
    this._filters = filters;
    this._currentFilter = currentFilterType;

    this._filterTypeChangeHandler = this._filterTypeChangeHandler.bind(this);
  }

  getTemplate() {
    return createMainNavigationTemplate(this._filters, this._currentFilter);
  }

  _filterTypeChangeHandler(evt) {
    evt.preventDefault();
    this._callback.filterTypeChange(evt.target.id);
  }

  setFilterTypeChangeHandler(callback) {
    this._callback.filterTypeChange = callback;
    this.getElement().addEventListener(`click`, this._filterTypeChangeHandler);
  }
}
