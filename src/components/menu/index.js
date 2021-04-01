import Menu from './Menu';
import './menu.scss';

const menuContainers = $('.js-menu');

console.log(menuContainers);

menuContainers.each((_, element) => {
  new Menu(element);
});
