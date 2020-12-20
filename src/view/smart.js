import Abstract from "./abstract.js";

export default class Smart extends Abstract {
  constructor() {
    super();
    this._task = {};
  }

  updateData(update, justDataUpdating) {
    if (!update) {
      return;
    }

    this._task = Object.assign(
        {},
        this._task,
        update
    );

    if (justDataUpdating) {
      return;
    }

    this.updateElement();
  }

  updateElement() {
    let prevElement = this.getElement();
    const parent = prevElement.parentElement;
    this.removeElement();

    const newElement = this.getElement();

    parent.replaceChild(newElement, prevElement);

    this.restoreHandlers();
  }

  restoreHandlers() {
    throw new Error(`Абстрактный метод не имплементирует: restoreHandlers`);
  }
}
