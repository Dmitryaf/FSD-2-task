import $ from 'jquery';
import './expander.scss';

export class Expander {
  constructor(expander) {
    this.expander = expander;
    this.expander.on('click', this.toggle.bind(this));
  }

  toggle(e) {
    const target = $(e.currentTarget);
    target.toggleClass('expander__top_open');
    target.next().toggleClass('expander__list_show');
  }
}

$(() => {
  $('.js-expander').each((_, element) => {
    new Expander($(element));
  });
});
