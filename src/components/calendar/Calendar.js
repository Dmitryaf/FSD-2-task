import 'air-datepicker';

class Calendar {
  constructor(element) {
    this.$element = element;

    this.createDatepicker();
  }

  hideCalendar() {
    this.$element.style.display = 'none';
  }

  createDatepicker() {
    this.inputs = $(this.$element).parent().find('input');

    if (this.inputs.length > 0) {
      this.hideContainer();
    }

    const options = {
      range: true,
      multipleDates: true,
      onSelect: this.onSelect.bind(this),
      prevHtml: '<',
      nextHtml: '>',
      navTitles: {
        days: 'MM yyyy',
      },
    };

    if (this.inputs.length <= 0) {
      this.datepicker = $(this.$element).datepicker(options).data('datepicker');
    } else {
      this.datepicker = $(this.inputs[0])
        .datepicker(options)
        .data('datepicker');
    }
  }

  onSelect(_, date) {
    this.dates = date;
  }
}

export default Calendar;
