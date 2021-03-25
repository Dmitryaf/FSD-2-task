import 'air-datepicker';

class Calendar {
  constructor(element) {
    this.$element = $(element);
    this.type = this.$element.attr('data-type');
    this.createDatepicker();
    this.initHandlers();
  }

  hideCalendar() {
    this.$element.css('display', 'none');
  }

  createDatepicker() {
    this.inputs = this.$element.parent().find('input');

    if (this.inputs.length <= 0) {
      this.isStatic = true;
    } else {
      this.hideCalendar();
    }
    let options;
    if (this.type === 'filter') {
      options = {
        range: true,
        multipleDates: true,
        multipleDatesSeparator: ' - ',
        prevHtml: '<i class="material-icons">arrow_back</i>',
        nextHtml: '<i class="material-icons">arrow_forward</i>',
        navTitles: {
          days: 'MM yyyy',
        },
        dateFormat: 'd M',
      };
    } else {
      options = {
        range: true,
        multipleDates: true,
        onSelect: this.onSelect.bind(this),
        prevHtml: '<i class="material-icons">arrow_back</i>',
        nextHtml: '<i class="material-icons">arrow_forward</i>',
        navTitles: {
          days: 'MM yyyy',
        },
      };
    }

    if (this.inputs.length <= 0) {
      this.datepicker = this.$element.datepicker(options).data('datepicker');
    } else {
      this.datepicker = $(this.inputs[0])
        .datepicker(options)
        .data('datepicker');
    }

    this.$clearButton = $(
      '<span class="datepicker-btns__clear">Очистить</span>'
    );
    this.$applyButton = $(
      '<span class="datepicker-btns__apply">Применить</span></div>'
    );
    const $btnContainer = $('<div class="datepicker-btns">')
      .append(this.$clearButton)
      .append(this.$applyButton);

    $(this.datepicker.$datepicker).append($btnContainer);
  }

  onSelect(_, date) {
    this.dates = date;
    this.clearInputs();
  }

  clearInputs() {
    this.inputs.each((index) => {
      this.inputs[index].value = '';
    });
  }

  clearData() {
    this.clearInputs();
    this.datepicker.clear();
  }

  onClickInput() {
    this.datepicker.show();
  }

  apply() {
    if (this.dates < 2) return;

    if (this.type !== 'filter') {
      this.inputs.each((index, input) => {
        if (this.dates[index]) {
          $(input).val(this.dates[index].toLocaleDateString());
        } else {
          $(input).val('');
        }
      });
    }

    this.datepicker.hide();
  }

  initHandlers() {
    this.$clearButton.on('click', this.clearData.bind(this));
    this.$applyButton.on('click', this.apply.bind(this));

    if (!this.isStatic) {
      this.inputs.on('click', this.onClickInput.bind(this));
      this.datepicker.hide();
    }
  }
}

export default Calendar;
