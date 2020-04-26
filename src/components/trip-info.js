import {createElement, createCalendarDate} from '../utils.js';

const createTripInfoElement = (sortedPointsByDate) => {
  let cities = ``;
  let pointsLength = sortedPointsByDate.length;
  let dates = pointsLength ? createCalendarDate(sortedPointsByDate[0].startDate, sortedPointsByDate[sortedPointsByDate.length - 1].endDate) : ``;

  if (pointsLength > 0 && pointsLength <= 3) {
    cities = sortedPointsByDate.map((point) => {
      return point.city;
    }).join(` &mdash; `);
  } else if (pointsLength > 3) {
    cities = `${sortedPointsByDate[0].city} &mdash; ... &mdash; ${sortedPointsByDate[sortedPointsByDate.length - 1].city}`;
  }

  return (
    `<section class="trip-main__trip-info  trip-info">
      ${pointsLength ? `<div class="trip-info__main">
      <h1 class="trip-info__title">${cities}</h1>

      <p class="trip-info__dates">${dates}</p>
    </div>` : ``}
    </section>`
  );
};

export default class TripInfo {
  constructor(points) {
    this._points = points;
    this._element = null;
  }

  getTemplate() {
    return createTripInfoElement(this._points);
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
