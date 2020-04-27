import {createElement, createCalendarDate, formatTimeToISO} from '../utils.js';

const createDayPointElement = (day, count) => {
  const formatedDay = createCalendarDate(day);
  const formatedDayISO = formatTimeToISO(day);

  return (
    `<ul class="trip-days">
      <li class="trip-days__item  day">
        <div class="day__info">
          <span class="day__counter">${count}</span>
          <time class="day__date" datetime="${formatedDayISO}">${formatedDay}</time>
        </div>

        <ul class="trip-events__list"></ul>
      </li>
    </ul>`
  );
};

export default class DayPoint {
  constructor(day, count) {
    this._day = day;
    this._count = count;
    this._element = null;
  }

  getTemplate() {
    return createDayPointElement(this._day, this._count);
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
