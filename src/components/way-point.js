import {createElement, formatTime, formatTimeToISO, getTimeDuration, getPointTypeGroup} from '../utils.js';

const createOffersMarkup = (offers) => {
  return offers.map(({title, cost}) => {
    return (
      `<li class="event__offer">
        <span class="event__offer-title">${title}</span>
        &plus;
        &euro;&nbsp;<span class="event__offer-price">${cost}</span>
      </li>`
    );
  }).slice(0, 3).join(``);
};

const createWayPointElement = (wayPoint) => {
  const {type, startDate, endDate, price, city, options} = wayPoint;

  const startDateISO = formatTimeToISO(startDate);
  const endtDateISO = formatTimeToISO(endDate);
  const formatStartDate = formatTime(startDate);
  const formatEndDate = formatTime(endDate);
  const pointDuration = getTimeDuration(startDate, endDate);
  const offersMakrup = options ? createOffersMarkup(options) : ``;
  let pretext = getPointTypeGroup(type) === `activity` ? `in` : `to`;

  return (
    `<li class="trip-events__item">
      <div class="event">
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${type.toLowerCase()}.png" alt="Event ${type} type icon">
        </div>
        <h3 class="event__title">${type} ${pretext} ${city}</h3>

        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="${startDateISO}">${formatStartDate}</time>
            &mdash;
            <time class="event__end-time" datetime="${endtDateISO}">${formatEndDate}</time>
          </p>
          <p class="event__duration">${pointDuration}</p>
        </div>

        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${price}</span>
        </p>

        ${offersMakrup ? `<h4 class="visually-hidden">Offers:</h4>
        <ul class="event__selected-offers">
          ${offersMakrup}
        </ul>` : ``}

        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>`
  );
};

export default class WayPoint {
  constructor(wayPoint) {
    this._wayPoint = wayPoint;
    this._element = null;
  }

  getTemplate() {
    return createWayPointElement(this._wayPoint);
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
