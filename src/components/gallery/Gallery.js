import 'slick-carousel';
import './gallery.scss';

class Gallery {
  constructor(element) {
    this.$element = $(element);
    this.init();
  }

  init() {
    this.isNav = this.$element.attr('data-nav');
    this.$element.slick({
      dots: true,
      autoplay: true,
      adaptiveHeight: true,
      nextArrow: this.isNav === 'show' ? this.getButton('next') : '',
      prevArrow: this.isNav === 'show' ? this.getButton('before') : '',
    });
  }

  getButton(type) {
    const icon = `<i class="material-icons">navigate_${type}</i>`;
    return `<button class="gallery__arrow gallery__arrow_${type}">${icon}</button>`;
  }
}

$(() => {
  $('.js-gallery').each((_, element) => {
    const isNav = $(element);
    new Gallery($(element));
  });
});
