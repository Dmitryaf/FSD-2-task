export class Expander {
  constructor() {
    this.expander = $('.js-expander');
    this.expander.on('click', this.toggle.bind(this));
  }

  toggle(e) {
    const target = $(e.currentTarget);
    target.toggleClass('expander__top_open');
    target.next().toggleClass('expander__list_show');
  }
}

export default Expander;
