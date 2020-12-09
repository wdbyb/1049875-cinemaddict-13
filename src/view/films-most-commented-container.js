import Abstract from "./abstract.js";

const createFilmsMostCommentedContainerTemplate = () => {
  return `<section class="films-list films-list--extra films-list--most-commented">
    <h2 class="films-list__title">Most commented</h2>

    <div class="films-list__container">

    </div>
  </section>`;
};

export default class FilmsMostCommentedContainer extends Abstract {
  getTemplate() {
    return createFilmsMostCommentedContainerTemplate();
  }
}
