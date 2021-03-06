import {createElement} from "../utils/render.js";

export default class Abstract {
  constructor() {
    if (new.target === Abstract) {
      throw new Error(`ЧТО ТЫ НАДЕЛАЛ!!!`);
    }

    this._element = null;
    this._callback = {};
  }

  getTemplate() {
    throw new Error(`Имплементируй.`);
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
