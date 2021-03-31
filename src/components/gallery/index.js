import Gallery from './Gallery';
import './gallery.scss';

const galleryContainers = $('.js-gallery');

galleryContainers.each((_, element) => {
  const isNav = $(element).attr('data-nav');
  new Gallery(element, { isNav });
});
