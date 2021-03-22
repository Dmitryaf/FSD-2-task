import Dropdown from './Dropdown';
import './dropdown.scss';

const dropdownContainers = $('.js-dropdown');

dropdownContainers.each((_, element) => {
  let $element = $(element);
  let type = $element.attr('data-type');
  let isVisible = $element.attr('data-visible');
  new Dropdown($element, { type, isVisible });
});
