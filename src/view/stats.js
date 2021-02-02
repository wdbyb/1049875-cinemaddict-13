import Smart from "./smart.js";
import Chart from "chart.js";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {StatsColorPalitre, StatsOptions, StatsFilter} from "../constants.js";

const createStatsTemplate = (watchedMovies, totalDuration, mostWatchedGenre, labelChecked) => {

  return `<section class="statistic">
    <p class="statistic__rank">
      Your rank
      <img class="statistic__img" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
      <span class="statistic__rank-label">Sci-Fighter</span>
    </p>

    <form action="https://echo.htmlacademy.ru/" method="get" class="statistic__filters">
      <p class="statistic__filters-description">Show stats:</p>

      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-all-time" value="all-time" ${StatsFilter.ALL === labelChecked ? `checked` : ``}>
      <label for="statistic-all-time" class="statistic__filters-label">All time</label>

      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-today" value="today" ${StatsFilter.TODAY === labelChecked ? `checked` : ``}>
      <label for="statistic-today" class="statistic__filters-label">Today</label>

      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-week" value="week" ${StatsFilter.WEEK === labelChecked ? `checked` : ``}>
      <label for="statistic-week" class="statistic__filters-label">Week</label>

      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-month" value="month" ${StatsFilter.MONTH === labelChecked ? `checked` : ``}>
      <label for="statistic-month" class="statistic__filters-label">Month</label>

      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-year" value="year" ${StatsFilter.YEAR === labelChecked ? `checked` : ``}>
      <label for="statistic-year" class="statistic__filters-label">Year</label>
    </form>

    <ul class="statistic__text-list">
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">You watched</h4>
        <p class="statistic__item-text">${watchedMovies ? watchedMovies.length : `0`} <span class="statistic__item-description">movies</span></p>
      </li>
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">Total duration</h4>
        <p class="statistic__item-text">${totalDuration ? totalDuration.HOURS : `0`} <span class="statistic__item-description">h</span> ${totalDuration ? totalDuration.MINUTES : `0`} <span class="statistic__item-description">m</span></p>
      </li>
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">Top genre</h4>
        <p class="statistic__item-text">${mostWatchedGenre ? mostWatchedGenre : `Вы что тютю?!`}</p>
      </li>
    </ul>

    <div class="statistic__chart-wrap">
      <canvas class="statistic__chart" width="1000"></canvas>
    </div>

  </section>`;
};

export default class Stats extends Smart {
  constructor(watchedMovies, totalDuration, mostWatchedGenre) {
    super();

    this._watchedMovies = watchedMovies;
    this._totalDuration = totalDuration;
    this._mostWatchedGenre = mostWatchedGenre;
    this._filterLabelChecked = StatsFilter.ALL;

    this._clickHandlerStatisticFilter = this._clickHandlerStatisticFilter.bind(this);
  }

  _clickHandlerStatisticFilter(evt) {
    evt.preventDefault();
    this._callback.filterClick(evt.target.id);
  }

  setStatisticFilterClickHandler(callback) {
    this._callback.filterClick = callback;
    this.getElement().querySelectorAll(`.statistic__filters-input`).forEach((input) => input.addEventListener(`click`, this._clickHandlerStatisticFilter));
  }

  changeInfo(watchedMovies, totalDuration, mostWatchedGenre, labelChecked) {
    this._watchedMovies = watchedMovies;
    this._totalDuration = totalDuration;
    this._mostWatchedGenre = mostWatchedGenre;
    this._filterLabelChecked = labelChecked;
  }

  restoreHandlers() {
    this.setStatisticFilterClickHandler(this._callback.filterClick);
  }

  getTemplate() {
    return createStatsTemplate(this._watchedMovies, this._totalDuration, this._mostWatchedGenre, this._filterLabelChecked);
  }

  renderChart(uniqGenres, movieByGenreCounts) {
    const statisticCtx = this.getElement().querySelector(`.statistic__chart`);

    statisticCtx.height = StatsOptions.BAR_HEIGHT * uniqGenres.length;

    return new Chart(statisticCtx, {
      plugins: [ChartDataLabels],
      type: `horizontalBar`,
      data: {
        labels: uniqGenres,
        datasets: [{
          data: movieByGenreCounts,
          backgroundColor: StatsColorPalitre.HORIZONTAL_BAR,
          hoverBackgroundColor: StatsColorPalitre.HORIZONTAL_BAR_HOVER,
          anchor: `start`,
          barThickness: StatsOptions.BAR_THICKNESS
        }]
      },
      options: {
        plugins: {
          datalabels: {
            font: {
              size: StatsOptions.FONT_SIZE
            },
            color: StatsColorPalitre.TEXT_COLOR,
            anchor: `start`,
            align: `start`,
            offset: StatsOptions.OFFSET,
          }
        },
        scales: {
          yAxes: [{
            ticks: {
              fontColor: StatsColorPalitre.TEXT_COLOR,
              padding: StatsOptions.PADDING,
              fontSize: StatsOptions.FONT_SIZE
            },
            gridLines: {
              display: false,
              drawBorder: false
            },
          }],
          xAxes: [{
            ticks: {
              display: false,
              beginAtZero: true
            },
            gridLines: {
              display: false,
              drawBorder: false
            },
          }],
        },
        legend: {
          display: false
        },
        tooltips: {
          enabled: false
        }
      }
    });
  }

  removeElement() {
    super.removeElement();
  }
}
