import Dropdown from './Dropdown';
import './dropdown.scss';

const dropdownContainers = $('.js-dropdown');

dropdownContainers.each((_, element) => {
  let $element = $(element);
  let type = $element.attr('data-type');
  let isVisible = $element.attr('data-visible');
  let isDefault = $element.attr('data-default');
  new Dropdown($element, { type, isVisible, isDefault });
});
