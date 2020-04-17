import {MONTHS} from './const.js';

const DAY_TO_MILLISECONDS = 86400000;
const HOUR_TO_MILLISECONDS = 3600000;
const MINUTE_TO_MILLISECONDS = 60000;

const getRandomIntegerNumber = (min, max) => {
  return min + Math.floor(Math.random() * (max - min));
};

const getRandomArrayItem = (array) => {
  const randomIndex = getRandomIntegerNumber(0, array.length);

  return array[randomIndex];
};

const getRandomDate = () => {
  const targetDate = new Date();
  const sign = Math.random() > 0.5 ? 1 : -1;
  const diffValue = sign * getRandomIntegerNumber(0, DAY_TO_MILLISECONDS * 7);

  targetDate.setTime(targetDate.getTime() + diffValue);

  return targetDate;
};

const castTimeFormat = (value) => {
  return value < 10 ? `0${value}` : String(value);
};

const formatTime = (date) => {
  const hours = castTimeFormat(new Date(date).getHours());
  const minutes = castTimeFormat(new Date(date).getMinutes());

  return `${hours}:${minutes}`;
};

const formatTimeToISO = (date, accuracy = 16) => {
  return new Date(date).toISOString().slice(0, accuracy);
};

const getTimeDuration = (start, end) => {
  const diff = end - start;
  const days = Math.floor(diff / DAY_TO_MILLISECONDS);
  const hours = Math.floor((diff - days * DAY_TO_MILLISECONDS) / HOUR_TO_MILLISECONDS);
  const minutes = Math.ceil((diff - days * DAY_TO_MILLISECONDS - hours * HOUR_TO_MILLISECONDS) / MINUTE_TO_MILLISECONDS);

  const formatDays = days > 0 ? `${castTimeFormat(days)}D ` : ``;
  const formatHours = hours > 0 ? `${castTimeFormat(hours)}H ` : ``;
  const formatMinutes = minutes > 0 ? `${castTimeFormat(minutes)}M` : ``;
  return `${formatDays}${formatHours}${formatMinutes}`;
};

const createCalendarDate = (startDate, endDate) => {
  const dateObject = new Date(startDate);
  const day = dateObject.getDate();
  const month = MONTHS[dateObject.getMonth()];

  let calendarDate = `${month} ${day}`;

  if (endDate && startDate !== endDate) {
    const endDateObject = new Date(endDate);
    const endDay = endDateObject.getDate();
    const endMonth = MONTHS[dateObject.getMonth()];
    calendarDate += ` — ${endMonth} ${endDay}`;

  }

  return calendarDate;
};

const getPointTypeGroup = (type) => {
  let group = ``;

  switch (type) {
    case `Check-in`:
      group = `activity`;
      break;
    case `Sightseeing`:
      group = `activity`;
      break;
    case `Restaurant`:
      group = `activity`;
      break;
    default:
      group = `transfer`;
  }

  return group;
};

export {getRandomIntegerNumber, getRandomArrayItem, getRandomDate, formatTime, formatTimeToISO, getTimeDuration, createCalendarDate, getPointTypeGroup};