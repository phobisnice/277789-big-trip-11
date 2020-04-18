const POINTS_COUNT = 20;

const FILTERS = [
  `Everything`,
  `Future`,
  `Past`,
];

const CITIES = [
  `London`,
  `New York`,
  `Paris`,
  `Moscow`,
  `Rome`,
  `Tokyo`,
];

const POINT_TYPES = [
  `Taxi`,
  `Bus`,
  `Train`,
  `Ship`,
  `Transport`,
  `Drive`,
  `Flight`,
  `Check-in`,
  `Sightseeing`,
  `Restaurant`,
];

const ADDITIONAL_OPTIONS = [
  {
    type: `Taxi`,
    title: `Order Uber`,
    cost: `20`
  },
  {
    type: `Flight`,
    title: `Add luggage`,
    cost: `40`
  },
  {
    type: `Flight`,
    title: `Switch to comfort`,
    cost: `120`
  },
  {
    type: `Drive`,
    title: `Rent a car`,
    cost: `150`
  },
  {
    type: `Check-in`,
    title: `Add breakfast`,
    cost: `15`
  }
];

const MONTHS = [
  `Jan`,
  `Feb`,
  `Mar`,
  `Apr`,
  `May`,
  `Jun`,
  `Jul`,
  `Aug`,
  `Sep`,
  `Oct`,
  `Nov`,
  `Dec`
];

const DESTINATION_TEXT = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`;

export {POINTS_COUNT, FILTERS, CITIES, DESTINATION_TEXT, POINT_TYPES, ADDITIONAL_OPTIONS, MONTHS};
