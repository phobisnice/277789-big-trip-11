import {createElement} from '../utils.js';

const createTripCostElement = (sum = 0) => {
  return (
    `<p class="trip-info__cost">
      Total: &euro;&nbsp;<span class="trip-info__cost-value">${sum}</span>
    </p>`
  );
};

export default class TripCost {
  constructor(sum) {
    this._sum = sum;
    this._element = null;
  }

  getTemplate() {
    return createTripCostElement(this._sum);
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
