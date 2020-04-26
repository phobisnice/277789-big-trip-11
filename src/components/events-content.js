import {createElement} from '../utils.js';

const createEventsContentElement = () => {
  return (
    `<section class="trip-events">
      <h2 class="visually-hidden">Trip events</h2>
    </section>`
  );
};

export default class EventsContent {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createEventsContentElement();
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
