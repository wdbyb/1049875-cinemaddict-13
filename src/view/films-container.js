import Abstract from "./abstract.js";

const createFilmsContainerTemplate = () => {
  return `<section class="films">
    <section class="films-list films-list--main">
      <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>

      <div class="films-list__container">

      </div>
    </section>
  </section>`;
};

export default class FilmsMainContainer extends Abstract {
  getTemplate() {
    return createFilmsContainerTemplate();
  }
}
