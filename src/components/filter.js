import {createElement} from '../utils.js';

const createFilterMarkup = (filter, isActive = false, disabledFilter) => {
  const isDisabled = filter === disabledFilter ? `disabled` : ``;
  const lowerCaseFilter = filter.toLowerCase();

  return `<div class="trip-filters__filter">
    <input id="filter-${lowerCaseFilter}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${lowerCaseFilter}" ${isActive ? `checked` : ``} ${isDisabled}>
    <label class="trip-filters__filter-label" for="filter-${lowerCaseFilter}">${filter}</label>
  </div>`;
};

const createFilterElement = (filters, dates) => {
  const currentDate = Date.now();
  let disabled = ``;

  if (dates.every((date) => date < currentDate)) {
    disabled = `Future`;
  }

  if (dates.every((date) => date > currentDate)) {
    disabled = `Past`;
  }

  const filtersMarkup = filters.map((it, i) => createFilterMarkup(it, i === 0, disabled)).join(``);

  return (
    `<form class="trip-filters" action="#" method="get">
      ${filtersMarkup}
      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>`
  );
};

export default class Filter {
  constructor(filters, dates) {
    this._filters = filters;
    this._dates = dates;
    this._element = null;
  }

  getTemplate() {
    return createFilterElement(this._filters, this._dates);
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
