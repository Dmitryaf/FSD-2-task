import './menu.scss';

class Menu {
  constructor(element) {
    this.$element = element;
    this.init();
  }

  init() {
    this.$humburger = this.$element.find('.js-menu__humburger');
    this.$menu = this.$element.find('.js-menu__list');
    this.$menuItemDropdown = this.$element.find('.js-menu__item');
    this.$humburger.on('click', this.openMenu.bind(this));
  }

  openMenu() {
    this.$menu.toggleClass('menu__list_open');
    this.$humburger.toggleClass('menu__humburger_open');
  }
}

$(() => {
  $('.js-menu').each((_, element) => {
    new Menu($(element));
  });
});
