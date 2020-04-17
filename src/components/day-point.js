import {createCalendarDate, formatTimeToISO} from '../utils.js';

export const createDayPointElement = (day, points, count) => {
  const formatedDay = createCalendarDate(day);
  const formatedDayISO = formatTimeToISO(day);

  return (
    `<ul class="trip-days">
      <li class="trip-days__item  day">
        <div class="day__info">
          <span class="day__counter">${count}</span>
          <time class="day__date" datetime="${formatedDayISO}">${formatedDay}</time>
        </div>

        <ul class="trip-events__list">
          ${points}
        </ul>
      </li>
    </ul>`
  );
};
