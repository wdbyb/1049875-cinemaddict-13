import Smart from "./smart.js";
import dayjs from "dayjs";
import {generateCommentDate} from "../mock/task.js";
import he from "he";

export const State = {
  SAVING: `SAVING`,
  DELETING: `DELETING`,
  ABORTING: `ABORTING`,
  SUCCESS: `SUCCESS`
};

const createGenresList = (arr) => {
  return arr.map((genre) => {
    return `<span class="film-details__genre">${genre}</span>`;
  }).join(``);
};

const createComments = (arr) => {
  return arr.map((comment) => {
    return foo(comment);
  }).join(``);
};

const foo = (data) => {
  const {author, comment, date, emotion, id} = data;

  return `<li class="film-details__comment">
    <span class="film-details__comment-emoji">
      <img src="./images/emoji/${emotion}.png" width="55" height="55" alt="emoji-${emotion}">
    </span>
    <div>
      <p class="film-details__comment-text">${he.encode(comment)}</p>
      <p class="film-details__comment-info">
        <span class="film-details__comment-author">${author}</span>
        <span class="film-details__comment-day">${date}</span>
        <button class="film-details__comment-delete" id="${id}">Delete</button>
      </p>
    </div>
  </li>`;
};

const createFilmDetailsTemplate = (data) => {
  const {title, poster, rating, duration, year, description, inputText, director, writers, actors, emojiPick, emojiName, genres, age, country, isWatched, isFavorite, isWatchlist, emotion, isDisabled, isSaving, isDeleting} = data;

  return `<section class="film-details">
    <form class="film-details__inner" action="" method="get">
      <div class="film-details__top-container">
        <div class="film-details__close">
          <button class="film-details__close-btn" type="button">close</button>
        </div>
        <div class="film-details__info-wrap">
          <div class="film-details__poster">
            <img class="film-details__poster-img" src="${poster}" alt="">

            <p class="film-details__age">${age}</p>
          </div>

          <div class="film-details__info">
            <div class="film-details__info-head">
              <div class="film-details__title-wrap">
                <h3 class="film-details__title">${title}</h3>
                <p class="film-details__title-original">Original: ${title}</p>
              </div>

              <div class="film-details__rating">
                <p class="film-details__total-rating">${rating}</p>
              </div>
            </div>

            <table class="film-details__table">
              <tr class="film-details__row">
                <td class="film-details__term">Director</td>
                <td class="film-details__cell">${director}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Writers</td>
                <td class="film-details__cell">${writers}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Actors</td>
                <td class="film-details__cell">${actors}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Release Date</td>
                <td class="film-details__cell">${dayjs(year).format(`D MMMM YYYY`)}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Runtime</td>
                <td class="film-details__cell">${duration}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Country</td>
                <td class="film-details__cell">${country}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">${genres.length === 1 ? `Genre` : `Genres`}</td>
                <td class="film-details__cell">
                  ${createGenresList(genres)}
              </tr>
            </table>

            <p class="film-details__film-description">
              ${description}
            </p>
          </div>
        </div>

        <section class="film-details__controls">
          <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist-btn" name="watchlist" ${isWatchlist ? `checked` : ``} ${isDisabled ? `disabled` : ``}>
          <label for="watchlist-btn" class="film-details__control-label">Add to watchlist</label>

          <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched" ${isWatched ? `checked` : ``} ${isDisabled ? `disabled` : ``}>
          <label for="watched" class="film-details__control-label">Already watched</label>

          <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite" ${isFavorite ? `checked` : ``} ${isDisabled ? `disabled` : ``}>
          <label for="favorite" class="film-details__control-label">Add to favorites</label>
        </section>
      </div>

      <div class="film-details__bottom-container">
        <section class="film-details__comments-wrap">
          <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${data.comments.length}</span></h3>

          <ul class="film-details__comments-list">
            ${createComments(data.comments)}
          </ul>

          <div class="film-details__new-comment">
            <div class="film-details__add-emoji-label">
              ${emojiPick ? `<img src="./images/emoji/${emojiName}.png" width="80" height="80" alt="emoji">` : ``}
            </div>

            <label class="film-details__comment-label">
              <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment">${!inputText ? `` : inputText}</textarea>
            </label>

            <div class="film-details__emoji-list">
              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile" ${emojiName === `smile` ? `checked` : ``}>
              <label class="film-details__emoji-label" for="emoji-smile">
                <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
              </label>

              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping" ${emojiName === `sleeping` ? `checked` : ``}>
              <label class="film-details__emoji-label" for="emoji-sleeping">
                <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
              </label>

              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke" ${emojiName === `puke` ? `checked` : ``}>
              <label class="film-details__emoji-label" for="emoji-puke">
                <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
              </label>

              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry" ${emojiName === `angry` ? `checked` : ``}>
              <label class="film-details__emoji-label" for="emoji-angry">
                <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
              </label>
            </div>
          </div>
        </section>
      </div>
    </form>
  </section>`;
};

export default class Popup extends Smart {
  constructor(task) {
    super();
    this._task = task;
    this._comments = task.comments;
    this._deleteComId = null;

    this._clickHandlerOnWatchlist = this._clickHandlerOnWatchlist.bind(this);
    this._clickHandlerOnWatched = this._clickHandlerOnWatched.bind(this);
    this._clickHandlerOnFavorite = this._clickHandlerOnFavorite.bind(this);

    this._clickHandlerCloseBtn = this._clickHandlerCloseBtn.bind(this);

    this._descriptionInputHandler = this._descriptionInputHandler.bind(this);
    this._emojiToggleHandler = this._emojiToggleHandler.bind(this);
    this._scrollTopHandler = this._scrollTopHandler.bind(this);
    this._commentDeleteHandler = this._commentDeleteHandler.bind(this);
    this._commentAddHandler = this._commentAddHandler.bind(this);

    this._setInnerHandlers();
  }

  getTemplate() {
    return createFilmDetailsTemplate(this._task);
  }

  restoreHandlers() {
    this._setInnerHandlers();
    this.setClickHandlerCloseBtn(this._callback.clickCloseBtn);
    this.setClickHandlerOnWatchlist(this._callback.clickOnWatchlist);
    this.setClickHandlerOnWatched(this._callback.clickOnWatched);
    this.setClickHandlerOnFavorite(this._callback.clickOnFavorite);
    this.setClickHandlerOnComment(this._callback.clickOnComment);
    this.setClickHandlerDeleteComment(this._callback.clickDeleteComment);
    this.getElement().scrollTop = this._task.pageY;
  }

  _setInnerHandlers() {
    this.getElement().querySelector(`.film-details__comment-input`).addEventListener(`input`, this._descriptionInputHandler);
    this.getElement().addEventListener(`scroll`, this._scrollTopHandler);
    this.getElement().querySelector(`#emoji-smile`).addEventListener(`click`, this._emojiToggleHandler);
    this.getElement().querySelector(`#emoji-puke`).addEventListener(`click`, this._emojiToggleHandler);
    this.getElement().querySelector(`#emoji-angry`).addEventListener(`click`, this._emojiToggleHandler);
    this.getElement().querySelector(`#emoji-sleeping`).addEventListener(`click`, this._emojiToggleHandler);
    // this.getElement().querySelectorAll(`.film-details__emoji-item`).addEventListener(`click`, this._emojiToggleHandler);
  }

  _scrollTopHandler(evt) {
    evt.preventDefault();
    this.updateData({
      pageY: this.getElement().scrollTop
    }, true);
  }

  _descriptionInputHandler(evt) {
    evt.preventDefault();
    this.updateData({
      inputText: evt.target.value
    }, true);
  }

  _emojiToggleHandler(evt) {
    evt.preventDefault();
    this.updateData({
      emojiPick: true,
      emojiName: evt.target.value
    });
  }

  _clickHandlerCloseBtn(evt) {
    evt.preventDefault();
    this._callback.clickCloseBtn();
  }

  setClickHandlerCloseBtn(callback) {
    this._callback.clickCloseBtn = callback;
    this.getElement().querySelector(`.film-details__close-btn`).addEventListener(`click`, this._clickHandlerCloseBtn);
  }

  _clickHandlerOnWatchlist(evt) {
    evt.preventDefault();
    const data = Object.assign(
      {},
      this._task,
      {
        isWatchlist: !this._task.isWatchlist
      }
    );

    this._callback.clickOnWatchlist(data);
  }

  _clickHandlerOnWatched(evt) {
    evt.preventDefault();
    const data = Object.assign(
        {},
        this._task,
        {
          isWatched: !this._task.isWatched
        }
    );

    this._callback.clickOnWatched(data);
  }

  _clickHandlerOnFavorite(evt) {
    evt.preventDefault();
    const data = Object.assign(
      {},
      this._task,
      {
        isFavorite: !this._task.isFavorite
      }
    );

    this._callback.clickOnFavorite(data);
  }

  _commentAddHandler(evt) {
    evt.preventDefault();
    if (evt.ctrlKey && evt.key === `Enter`) {
      const newComment = {
        comment: this._task.inputText,
        emotion: this._task.emojiName,
        date: generateCommentDate()
      };

      this._callback.clickOnComment(newComment, this._task.id);
    }
  }

  _deleteTheComment() {
    const changedComments = this._comments.filter((item) => item.id !== this._deleteComId);

    this._comments = changedComments;

    this.updateData({
      comments: changedComments
    });
  }

  _commentDeleteHandler(evt) {
    evt.preventDefault();

    this._deleteComId = evt.target.id;

    this._callback.clickDeleteComment(this._deleteComId);
  }

  setPopupState(state) {
    const resetPopupState = () => {
      this.updateData({
        isDisabled: false,
        isDeleting: false,
        isSaving: false
      });
    };

    switch (state) {
      case State.DELETING:
        this.updateData({
          isDisabled: true,
          isDeleting: true
        });
        break;
      case State.SAVING:
        this.updateData({
          isDisabled: true,
          isSaving: true
        });
        break;
      case State.SUCCESS:
        resetPopupState();
        break;
      case State.ABORTING:
        this.shake(resetPopupState);
        break;
    }
  }

  setClickHandlerDeleteComment(callback) {
    this._callback.clickDeleteComment = callback;
    const deleteButtons = this.getElement().querySelectorAll(`.film-details__comment-delete`);
    deleteButtons.forEach((element) => element.addEventListener(`click`, this._commentDeleteHandler));
  }

  setClickHandlerOnComment(callback) {
    this._callback.clickOnComment = callback;
    this.getElement().querySelector(`.film-details__inner`).addEventListener(`keyup`, this._commentAddHandler);
  }

  setClickHandlerOnWatchlist(callback) {
    this._callback.clickOnWatchlist = callback;
    this.getElement().querySelector(`#watchlist-btn`).addEventListener(`click`, this._clickHandlerOnWatchlist);
  }

  setClickHandlerOnWatched(callback) {
    this._callback.clickOnWatched = callback;
    this.getElement().querySelector(`#watched`).addEventListener(`click`, this._clickHandlerOnWatched);
  }

  setClickHandlerOnFavorite(callback) {
    this._callback.clickOnFavorite = callback;
    this.getElement().querySelector(`#favorite`).addEventListener(`click`, this._clickHandlerOnFavorite);
  }
}
