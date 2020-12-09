import Abstract from "./abstract.js";

const createStatisticsTemplate = () => {
  return `<p>130 291 movies inside</p>`;
};

export default class Statistics extends Abstract {
  getTemplate() {
    return createStatisticsTemplate();
  }
}
