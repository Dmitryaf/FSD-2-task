import 'slick-carousel';

class Gallery {
  constructor(element, options) {
    this.$element = $(element);
    this.isNav = options.isNav;
    this.init();
  }

  init() {
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

export default Gallery;
