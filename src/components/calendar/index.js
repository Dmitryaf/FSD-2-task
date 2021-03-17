import Calendar from './Calendar';
import './calendar.scss';

const calendarContainers = $('.js-calendar');

calendarContainers.each((_, element) => {
  new Calendar(element);
});
