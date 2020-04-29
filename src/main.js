import DayPointComponent from './components/day-point.js';
import EmptyComponent from './components/empty.js';
import EventsContentComponent from './components/events-content.js';
import FilterComponent from './components/filter.js';
import FormComponent from './components/form.js';
import MenuComponent from './components/menu.js';
import SortComponent from './components/sort.js';
import TripCostComponent from './components/trip-cost.js';
import TripInfoComponent from './components/trip-info.js';
import WayPointComponent from './components/way-point.js';

import {POINTS_COUNT, FILTERS} from './const.js';
import {renderElement, formatTimeToISO} from './utils.js';
import {generateWayPoints} from './mock/way-point.js';

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

const renderWayPoint = (pointsListElement, wayPoint) => {
  const replaceWayPointToForm = () => {
    pointsListElement.replaceChild(formComponent.getElement(), wayPointComponent.getElement());
  };

  const replaceFormToWayPoint = () => {
    pointsListElement.replaceChild(wayPointComponent.getElement(), formComponent.getElement());
  };

  const onEscKeyDown = (evt) => {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      replaceFormToWayPoint();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  const wayPointComponent = new WayPointComponent(wayPoint);
  const editButton = wayPointComponent.getElement().querySelector(`.event__rollup-btn`);

  editButton.addEventListener(`click`, () => {
    replaceWayPointToForm();
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  const formComponent = new FormComponent(wayPoint);
  const editForm = formComponent.getElement();
  editForm.addEventListener(`submit`, (evt) => {
    evt.preventDefault();
    replaceFormToWayPoint();
    document.removeEventListener(`keydown`, onEscKeyDown);
  });

  renderElement(pointsListElement, wayPointComponent.getElement());
};

const renderEventsContent = (eventsContentComponent, sortedPoints) => {
  if (!sortedPoints.length) {
    renderElement(eventsContentComponent.getElement(), new EmptyComponent().getElement());
    return;
  }

  renderElement(eventsContentComponent.getElement(), new SortComponent().getElement());

  const dayPoints = getMapOfPointsByDays(sortedPoints);
  let dayCount = 1;

  dayPoints.forEach((points, day) => {
    const dayPointElement = new DayPointComponent(day, dayCount++).getElement();
    renderElement(eventsContentComponent.getElement(), dayPointElement);
    const wayPointsListElement = dayPointElement.querySelector(`.trip-events__list`);
    points.forEach((point) => renderWayPoint(wayPointsListElement, point));
  });
};

const wayPoints = generateWayPoints(POINTS_COUNT);
const totalWayPointsCost = wayPoints.reduce((sum, it) => {
  return sum + it.price;
}, 0);

const sortedPointsByDate = wayPoints.slice().sort((a, b) => a.startDate - b.startDate);

const startDates = wayPoints.map((it) => it.startDate);

const headerContentElement = document.querySelector(`.trip-main`);
const headerControlsElement = headerContentElement.querySelector(`.trip-controls`);
const tripInfoComponent = new TripInfoComponent(sortedPointsByDate);

renderElement(headerContentElement, tripInfoComponent.getElement(), `afterbegin`);
renderElement(tripInfoComponent.getElement(), new TripCostComponent(totalWayPointsCost).getElement());
renderElement(headerControlsElement, new MenuComponent().getElement());
renderElement(headerControlsElement, new FilterComponent(FILTERS, startDates).getElement());

const pageContentElement = document.querySelector(`.page-main .page-body__container`);
const eventsContentComponent = new EventsContentComponent();

renderElement(pageContentElement, eventsContentComponent.getElement());

renderEventsContent(eventsContentComponent, sortedPointsByDate);
