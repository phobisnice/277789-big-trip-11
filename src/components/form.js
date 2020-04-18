import {formatTime, getPointTypeGroup, formatDateToUSLocale} from '../utils.js';
import {POINT_TYPES, CITIES, ADDITIONAL_OPTIONS} from '../const.js';

const createEventTypesMarkup = (types, activeType) => {
  return types.map((type, index) => {
    const isActive = type === activeType;
    const lowerCaseType = type.toLowerCase();
    return `<div class="event__type-item">
    <input id="event-type-${lowerCaseType}-${index}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}" ${isActive ? `checked` : ``}>
    <label class="event__type-label  event__type-label--${lowerCaseType}" for="event-type-${lowerCaseType}-${index}">${type}</label>
  </div>`;
  }).join(``);
};

const createAdditionalOptionsMarkup = (options, type, activeOptions) => {
  return options.filter((it) => it.type === type).map((option, index) => {
    const {cost, title} = option;
    const lowerCaseTitle = title.toLowerCase();
    const isActive = activeOptions && activeOptions.map((it) => it.title).includes(title) ? `checked` : ``;
    return `<div class="event__offer-selector">
    <input class="event__offer-checkbox  visually-hidden" id="event-offer-${lowerCaseTitle}-${index}" type="checkbox" name="event-offer-${lowerCaseTitle}" ${isActive}>
    <label class="event__offer-label" for="event-offer-${lowerCaseTitle}-${index}">
      <span class="event__offer-title">Add ${lowerCaseTitle}</span>
      &plus;
      &euro;&nbsp;<span class="event__offer-price">${cost}</span>
    </label>
  </div>`;
  }).join(``);
};

const createCityOptionsMarkup = (cities) => {
  return cities.map((city) => {
    return `<option value="${city}"></option>`;
  }).join(``);
};

const createDestinationPhotosMarkup = (photos) => {
  return photos.map((photo) => {
    return `<img class="event__photo" src="${photo}" alt="Event photo">`;
  }).join(``);
};

export const createFormElement = (wayPoint) => {
  const {type, city, price, destination, photos, startDate, endDate, options} = wayPoint;
  const pretext = getPointTypeGroup(type) === `activity` ? `in` : `to`;
  const activityEvents = POINT_TYPES.filter((it) => getPointTypeGroup(it) === `activity`);
  const transferEvents = POINT_TYPES.filter((it) => getPointTypeGroup(it) === `transfer`);
  const activityEventTypesMarkup = createEventTypesMarkup(activityEvents, type);
  const transferEventTypesMarkup = createEventTypesMarkup(transferEvents, type);
  const cityOptions = createCityOptionsMarkup(CITIES);
  const photosMarkup = photos ? createDestinationPhotosMarkup(photos) : ``;
  const startDateWithSlashes = formatDateToUSLocale(startDate);
  const endDateWithSlashes = formatDateToUSLocale(endDate);
  const startFormatTime = formatTime(startDate);
  const endFormatTime = formatTime(endDate);
  const additionalOptions = createAdditionalOptionsMarkup(ADDITIONAL_OPTIONS, type, options);

  return (
    `<form class="trip-events__item  event  event--edit" action="#" method="post">
      <header class="event__header">
        <div class="event__type-wrapper">
          <label class="event__type  event__type-btn" for="event-type-toggle-1">
            <span class="visually-hidden">Choose event type</span>
            <img class="event__type-icon" width="17" height="17" src="img/icons/${type.toLowerCase()}.png" alt="Event ${type} type icon">
          </label>
          <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

          <div class="event__type-list">
            <fieldset class="event__type-group">
              <legend class="visually-hidden">Transfer</legend>
              ${transferEventTypesMarkup}
            </fieldset>

            <fieldset class="event__type-group">
              <legend class="visually-hidden">Activity</legend>
              ${activityEventTypesMarkup}
            </fieldset>
          </div>
        </div>

        <div class="event__field-group  event__field-group--destination">
          <label class="event__label  event__type-output" for="event-destination-1">
            ${type} ${pretext}
          </label>
          <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${city}" list="destination-list-1">
          <datalist id="destination-list-1">
            ${cityOptions}
          </datalist>
        </div>

        <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time-1">
            From
          </label>
          <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${startDateWithSlashes} ${startFormatTime}">
          &mdash;
          <label class="visually-hidden" for="event-end-time-1">
            To
          </label>
          <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${endDateWithSlashes} ${endFormatTime}">
        </div>

        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-1">
            <span class="visually-hidden">Price</span>
            &euro;
          </label>
          <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${price}">
        </div>

        <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
        <button class="event__reset-btn" type="reset">Cancel</button>
      </header>

      ${additionalOptions || destination ? `<section class="event__details">
      ${additionalOptions ? `<section class="event__section  event__section--offers">
      <h3 class="event__section-title  event__section-title--offers">Offers</h3>

      <div class="event__available-offers">
        ${additionalOptions}
      </div>
    </section>` : ``}

      ${destination ? `<section class="event__section  event__section--destination">
      <h3 class="event__section-title  event__section-title--destination">Destination</h3>
      <p class="event__destination-description">${destination}</p>

      ${photos ? `<div class="event__photos-container">
      <div class="event__photos-tape">
        ${photosMarkup}
      </div>
    </div>` : ``}
    </section>` : ``}
    </section>` : ``}

    </form>`
  );
};
