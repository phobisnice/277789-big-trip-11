import {createTripInfoElement} from './components/trip-info.js';
import {createTripCostElement} from './components/trip-cost.js';
import {createMenuElement} from './components/menu.js';
import {createFilterElement} from './components/filter.js';
import {createSortElement} from './components/sort.js';
import {createFormElement} from './components/form.js';
import {createDayPointElement} from './components/day-point.js';
import {createWayPointElement} from './components/way-point.js';
import {POINTS_COUNT, FILTERS} from './const.js';
import {formatTimeToISO} from './utils.js';
import {generateWayPoints} from './mock/way-point.js';

const renderElement = (container, template, position = `beforeend`) => {
  container.insertAdjacentHTML(position, template);
};

const wayPoints = generateWayPoints(POINTS_COUNT);
const totalWayPointsCost = wayPoints.reduce((sum, it) => {
  return sum + it.price;
}, 0);

const sortedPointsByDate = wayPoints.slice().sort((a, b) => a.startDate - b.startDate);

const startDates = wayPoints.map((it) => it.startDate);

const headerContent = document.querySelector(`.trip-main`);

renderElement(headerContent, createTripInfoElement(sortedPointsByDate), `afterbegin`);

const headerInformation = headerContent.querySelector(`.trip-info`);

renderElement(headerInformation, createTripCostElement(totalWayPointsCost));

const headerControls = headerContent.querySelector(`.trip-controls`);
const headerMenuTitle = headerControls.querySelector(`h2`);

renderElement(headerControls, createFilterElement(FILTERS, startDates));
renderElement(headerMenuTitle, createMenuElement(), `afterend`);

const eventsContent = document.querySelector(`.trip-events`);

renderElement(eventsContent, createSortElement());
renderElement(eventsContent, createFormElement(sortedPointsByDate[0]));

const getMapOfPointsByDays = (points) => {
  const pointsMap = new Map();

  points.forEach((point) => {
    const pointDateISO = formatTimeToISO(point.startDate, 10);
    if (pointsMap.get(pointDateISO)) {
      pointsMap.get(pointDateISO).push(point);
    } else {
      pointsMap.set(pointDateISO, [point]);
    }
  });

  return pointsMap;
};

const dayPoints = getMapOfPointsByDays(sortedPointsByDate.slice(1));
let dayCount = 1;

dayPoints.forEach((points, day) => {
  const pointsByDay = points.map((point) => {
    return createWayPointElement(point);
  }).join(``);
  renderElement(eventsContent, createDayPointElement(day, pointsByDay, dayCount++));
});
