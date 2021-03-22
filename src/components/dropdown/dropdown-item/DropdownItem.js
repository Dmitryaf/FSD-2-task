import './dropdown-item.scss';

class DropdownItem {
  constructor($element, options) {
    this.$element = $element;
    this.$title = this.$element.find('.dropdown-item__title');
    this.$plusBtn = this.$element.find(
      '.dropdown-item__button[data-btn="plus"]'
    );
    this.$minusBtn = this.$element.find(
      '.dropdown-item__button[data-btn="minus"]'
    );
    this.$counter = this.$element.find('.dropdown-item__counter');
    this.$input = options.input;
    this.getDropdownValue = options.dropdownValue;
    this.hideClearBtn = options.hideClearBtn;
    this.initHandlers();
  }

  dropdownValue() {
    return this.getDropdownValue();
  }

  counterValue() {
    return +`${this.$counter.text()}`;
  }

  resetCounter() {
    this.$counter.text('0');
  }

  initHandlers() {
    this.$minusBtn.on('click', this.decreaseCounter.bind(this));
    this.$plusBtn.on('click', this.increaseCounter.bind(this));
  }

  decreaseCounter() {
    let val = parseInt(this.$counter.text(), 10);
    if (val < 1) {
      return;
    } else {
      val -= 1;
      this.$counter.text(val.toString());
      this.$input.val(this.dropdownValue());
      this.hideClearBtn();
    }
  }

  increaseCounter() {
    let val = parseInt(this.$counter.text(), 10);
    val += 1;
    this.$counter.text(val.toString());
    this.$input.val(this.dropdownValue());
    this.hideClearBtn();
  }
}
export default DropdownItem;
