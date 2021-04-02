import './range-slider.scss';
import 'ion-rangeslider';

class RangeSlider {
  constructor(element) {
    this.$element = element;
    this.init();
  }

  init() {
    this.$values = this.$element.parent().find('.rslider__values');

    this.slider = this.$element.ionRangeSlider({
      type: 'double',
      min: 500,
      max: 15000,
      from: 5000,
      to: 10000,
      hide_min_max: true,
      hide_from_to: true,
      onChange: this.updateValues.bind(this),
      onStart: this.onStart.bind(this),
    });
  }

  updateValues(data) {
    this.$values.html(`${data.from_pretty}&#8381; - ${data.to_pretty}&#8381;`);
  }

  onStart(data) {
    this.updateValues(data);
  }
}

$(() => {
  $('.js-rslider').each((_, element) => {
    new RangeSlider($(element));
  });
});
