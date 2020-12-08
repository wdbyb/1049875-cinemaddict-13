import {createElement} from "../utils.js";

const createFilmsContainerTemplate = () => {
  return `<section class="films">
    <section class="films-list films-list--main">
      <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>

      <div class="films-list__container">

      </div>
    </section>
  </section>`;
};

export default class FilmsMainContainer {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createFilmsContainerTemplate();
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
