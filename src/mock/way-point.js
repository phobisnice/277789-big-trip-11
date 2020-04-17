import {CITIES, POINT_TYPES, ADDITIONAL_OPTIONS, DESTINATION_TEXT} from '../const.js';
import {getRandomArrayItem, getRandomIntegerNumber, getRandomDate} from '../utils.js';

const generatePhotos = (min, max) => {
  return new Array(getRandomIntegerNumber(min, max)).fill(`http://picsum.photos/248/152?r=`).map((it) => `${it}${Math.random()}`);
};

const generateWayPoint = () => {
  const type = getRandomArrayItem(POINT_TYPES);
  const options = ADDITIONAL_OPTIONS.filter((it) => {
    return it.type === type;
  });
  const destination = Math.random() > 0.5 ? DESTINATION_TEXT.split(`. `).slice(0, getRandomIntegerNumber(1, 5)).join(`. `) : ``;
  const photos = destination ? generatePhotos(0, 5) : ``;
  const dates = [getRandomDate(), getRandomDate()];

  return {
    type,
    destination,
    photos,
    city: getRandomArrayItem(CITIES),
    options: options ? options.slice(getRandomIntegerNumber(0, options.length)) : ``,
    price: getRandomIntegerNumber(0, 1000),
    startDate: Math.min(...dates),
    endDate: Math.max(...dates),
  };
};

const generateWayPoints = (count) => {
  return new Array(count).fill(``).map(generateWayPoint);
};

export {generateWayPoint, generateWayPoints};
