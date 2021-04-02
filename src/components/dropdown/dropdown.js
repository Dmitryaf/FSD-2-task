import './dropdown.scss';
import DropdownItem from './dropdown-item/DropdownItem';

class Dropdown {
  constructor(container) {
    this.$container = container;
    this.init();
    this.initHandlers();
    this.hideClearBtn();
  }

  init() {
    this.type = this.$container.attr('data-type');
    this.isVisible = this.$container.attr('data-visible');
    this.isDefault = this.$container.attr('data-default');
    this.$content = this.$container.find('.dropdown__content');
    this.$input = this.$container.find('input');
    this.$applyBtn = this.$container.find('.dropdown__btns-apply');
    this.$clearBtn = this.$container.find('.dropdown__btns-clear');
    this.defaultValue = [2, 2, 0];
    this.dropdownItems = [];

    if (this.isVisible === 'show') {
      this.$content.addClass('dropdown__content_show');
    }
    this.$container.find('.dropdown-item').each((index, $element) => {
      this.dropdownItems.push(
        new DropdownItem($($element), {
          input: this.$input,
          dropdownValue: this.dropdownValue.bind(this),
          hideClearBtn: this.hideClearBtn.bind(this),
          value: this.defaultValue[index],
        })
      );
    });

    if (this.isDefault === 'show') {
      this.initDefault();
    }
  }

  initHandlers() {
    this.$input.on('click', this.showItems.bind(this));
    this.$applyBtn.on('click', this.apply.bind(this));
    this.$clearBtn.on('click', this.clear.bind(this));
    this.$container.on('click', this.onContainerClick.bind(this));
    $(document).on('click', this.hideItems.bind(this));
  }

  initDefault() {
    this.dropdownItems.forEach((item) => {
      item.default();
    });
  }

  apply() {
    this.$input.val(this.dropdownValue());
  }

  clear() {
    this.$input.val('Сколько гостей');
    this.dropdownItems.forEach((item) => {
      item.resetCounter();
    });
    this.hideClearBtn();
  }

  showItems() {
    this.$content.toggleClass('dropdown__content_show');
  }

  hideItems() {
    this.$content.removeClass('dropdown__content_show');
  }

  hideClearBtn() {
    let sum = 0;
    this.dropdownItems.forEach((item) => {
      sum += item.counterValue();
    });

    if (sum === 0) {
      this.$clearBtn.css('visibility', 'hidden');
    } else {
      this.$clearBtn.css('visibility', 'visible');
    }
  }

  onContainerClick(e) {
    e.stopPropagation();
  }

  dropdownValue() {
    if (this.type === 'guest') {
      const adults = {
        amount:
          this.dropdownItems[0].counterValue() +
          this.dropdownItems[1].counterValue(),
        words: ['гость', 'гостя', 'гостей'],
      };
      const babies = {
        amount: this.dropdownItems[2].counterValue(),
        words: ['младенец', 'младенца', 'младенцев'],
      };

      const adultValue = this.calculateValueInput(adults.amount, adults.words);
      const babiesValue = this.calculateValueInput(babies.amount, babies.words);

      if (adultValue && babiesValue) {
        return `${adultValue}, ${babiesValue}`;
      }
      if (!adultValue && !babiesValue) {
        return 'Сколько гостей';
      }
      return adultValue || babiesValue;
    } else if (this.type === 'room') {
      const bedrooms = {
        amount: this.dropdownItems[0].counterValue(),
        words: ['спальня', 'спальни', 'спален'],
      };
      const beds = {
        amount: this.dropdownItems[1].counterValue(),
        words: ['кровать', 'кровати', 'кроватей'],
      };
      const bathrooms = {
        amount: this.dropdownItems[2].counterValue(),
        words: ['ванная комната', 'ванные комнаты', 'ванных комнат'],
      };

      const bedroomsValue = this.calculateValueInput(
        bedrooms.amount,
        bedrooms.words
      );
      const bedsValue = this.calculateValueInput(beds.amount, beds.words);
      const bathroomsValue = this.calculateValueInput(
        bathrooms.amount,
        bathrooms.words
      );

      if (bedrooms.amount > 0 && beds.amount > 0 && bathrooms.amount > 0) {
        return `${bedroomsValue}, ${bedsValue}, ...`;
      }
      if (
        bedrooms.amount === 0 &&
        beds.amount === 0 &&
        bathrooms.amount === 0
      ) {
        return `Комната`;
      }
      if (bedrooms.amount > 0 && beds.amount > 0) {
        return `${bedroomsValue}, ${bedsValue}`;
      } else if (beds.amount > 0 && bathrooms.amount > 0) {
        return `${bedsValue}, ${bathroomsValue}`;
      } else if (bedrooms.amount > 0 && bathrooms.amount > 0) {
        return `${bedroomsValue}, ${bathroomsValue}`;
      }

      return bedroomsValue || bedsValue || bathroomsValue;
    }
  }

  calculateValueInput(count, words) {
    const amount = count % 100;
    const num = amount % 10;
    if (amount >= 10 && amount <= 20) {
      return `${amount} ${words[2]}`;
    }
    if (num > 1 && num < 5) {
      return `${amount} ${words[1]}`;
    }
    if (num === 1) {
      return `${amount} ${words[0]}`;
    }
    if (num === 0) {
      return '';
    }
    return `${amount} ${words[2]}`;
  }
}

$(() => {
  $('.js-dropdown').each((_, element) => {
    new Dropdown($(element));
  });
});
