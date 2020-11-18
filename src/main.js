import {createProfileRatingTemplate} from "./view/profile-rating.js";

const siteHeaderElement = document.querySelector(`.header`);

function render(container, template, place) {
  container.insertAdjacentHTML(place, template);
}

render(siteHeaderElement, createProfileRatingTemplate(), `beforeend`);
