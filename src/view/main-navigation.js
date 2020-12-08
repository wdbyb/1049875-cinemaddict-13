import {NavigationNames} from "../constants.js";
import {createElement} from "../utils.js";

const createMainNavigationItem = (filter) => {
  const {name, count} = filter;

  return (`<a href="#${name}" class="main-navigation__item">${NavigationNames[name]} <span class="main-navigation__item-count">${count}</span></a>`);
};

const createMainNavigationTemplate = (filterItems) => {
  const createMainNavigationItems = filterItems
    .map((filter, index) => createMainNavigationItem(filter, index === 0))
    .join(``);

  return `<nav class="main-navigation">
    <div class="main-navigation__items">
      <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
      ${createMainNavigationItems}
    </div>
    <a href="#stats" class="main-navigation__additional">Stats</a>
  </nav>`;
};

export default class MainNavigation {
  constructor(task) {
    this._task = task;

    this._element = null;
  }

  getTemplate() {
    return createMainNavigationTemplate(this._task);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
