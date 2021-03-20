import DropdownItem from './dropdown-item/DropdownItem';

class Dropdown {
  constructor($container, type) {
    this.$container = $container;
    this.type = type;
    this.$content = this.$container.find('.dropdown__content');
    this.$input = this.$container.find('input');
    this.$applyBtn = this.$container.find('.dropdown__btns-apply');
    this.$clearBtn = this.$container.find('.dropdown__btns-clear');
    this.$dropdownItems = [];
    this.words = {
      guest: ['гость', 'гостя', 'гостей'],
      rooms: ['кровати', 'спальни', 'ванные комнаты'],
    };

    this.$container.find('.dropdown-item').each((_, $element) => {
      this.$dropdownItems.push(
        new DropdownItem(
          $($element),
          this.$input,
          this.dropdownValue.bind(this)
        )
      );
    });
    this.initHandlers();
  }

  showItems() {
    this.$content.toggleClass('dropdown__content_show');
  }

  initHandlers() {
    this.$input.on('click', this.showItems.bind(this));
    this.$applyBtn.on('click', this.apply.bind(this));
    this.$clearBtn.on('click', this.clear.bind(this));
  }

  apply() {
    this.$input.val(this.dropdownValue());
  }

  clear() {
    this.$input.val('Сколько гостей');
  }

  dropdownValue() {
    if (this.type === 'guest') {
      const guest = this.words.guest;
      let sum = 0;

      $(this.$dropdownItems).each((_, item) => {
        sum += item.counterValue();
      });

      sum = Math.abs(sum) % 100;
      const num = sum % 10;

      if (sum > 10 && sum < 20) {
        return `${sum} ${guest[2]}`;
      }
      if (num > 1 && num < 5) {
        return `${sum} ${guest[1]}`;
      }
      if (num === 1) {
        return `${sum} ${guest[0]}`;
      }
      if (num === 0) {
        return `Сколько гостей`;
      }
      return `${sum} ${guest[2]}`;
    } else if (this.type === 'room') {
      const bedrooms = {
        amount: this.$dropdownItems[0].counterValue(),
        words: ['спальня', 'спален', 'спальни'],
      };
      const beds = {
        amount: this.$dropdownItems[1].counterValue(),
        words: ['кровать', 'Кроватей', 'Кровати'],
      };
      const bathrooms = {
        amount: this.$dropdownItems[2].counterValue(),
        words: ['ванная комната', 'ванных комнат', 'ванные комнаты'],
      };
    }
  }
}

export default Dropdown;
