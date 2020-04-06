import {createTripInfoElement} from './components/trip-info.js';
import {createTripCostElement} from './components/trip-cost.js';
import {createMenuElement} from './components/menu.js';
import {createFilterElement} from './components/filter.js';
import {createSortElement} from './components/sort.js';
import {createFormElement} from './components/form.js';
import {createDayPointElement} from './components/day-point.js';
import {createWayPointElement} from './components/way-point.js';

const POINTS_COUNT = 3;

const renderElement = (container, template, position = `beforeend`) => {
  container.insertAdjacentHTML(position, template);
};

const headerContent = document.querySelector(`.trip-main`);

renderElement(headerContent, createTripInfoElement(), `afterbegin`);

const headerInformation = headerContent.querySelector(`.trip-info`);

renderElement(headerInformation, createTripCostElement());

const headerControls = headerContent.querySelector(`.trip-controls`);
const headerMenuTitle = headerControls.querySelector(`h2`);

renderElement(headerControls, createFilterElement());
renderElement(headerMenuTitle, createMenuElement(), `afterend`);

const eventsContent = document.querySelector(`.trip-events`);

renderElement(eventsContent, createSortElement());
renderElement(eventsContent, createFormElement());
renderElement(eventsContent, createDayPointElement());

const dayPointList = eventsContent.querySelector(`.trip-events__list`);

for (let i = 0; i < POINTS_COUNT; i++) {
  renderElement(dayPointList, createWayPointElement());
}
