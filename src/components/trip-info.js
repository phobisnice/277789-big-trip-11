import {createCalendarDate} from '../utils.js';

export const createTripInfoElement = (sortedPointsByDate) => {
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
