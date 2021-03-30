import 'slick-carousel';

class Gallery {
  constructor(element) {
    this.$element = $(element);

    this.init();
  }

  init() {
    this.$element.slick({
      dots: true,
      adaptiveHeight: true,
      nextArrow: this.getButton('next'),
      prevArrow: this.getButton('before'),
    });
  }

  getButton(type) {
    const icon = `<i class="material-icons">navigate_${type}</i>`;
    return `<button class="gallery__arrow gallery__arrow--${type}">${icon}</button>`;
  }
}

export default Gallery;
