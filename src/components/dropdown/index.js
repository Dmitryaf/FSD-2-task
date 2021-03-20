import Dropdown from './Dropdown';
import './dropdown.scss';

const dropdownContainers = $('.js-dropdown');

dropdownContainers.each((_, element) => {
  let $element = $(element);
  new Dropdown($element, $element.attr('data-type'));
});
