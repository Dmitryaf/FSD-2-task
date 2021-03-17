import './text-field.scss';

const maskFields = $('.js-masked');
maskFields.mask('00.00.0000', { placeholder: 'ДД.ММ.ГГГГ' });
