import Abstract from "./abstract.js";

const SHAKE_ANIMATION_TIMEOUT = 600;

export default class Smart extends Abstract {
  constructor() {
    super();
    this._task = {};
    this._comments = {};
  }

  shake(callback) {
    this.getElement().style.animation = `shake ${SHAKE_ANIMATION_TIMEOUT / 1000}s`;
    setTimeout(() => {
      this.getElement().style.animation = ``;
      callback();
    }, SHAKE_ANIMATION_TIMEOUT);
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

    this._comments = this._task.comments;

    if (justDataUpdating) {
      return;
    }

    this.updateElement();
  }

  updateElement() {
    const prevElement = this.getElement();
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
