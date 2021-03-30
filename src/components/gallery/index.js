import Gallery from './Gallery';
import './gallery.scss';

const galleryContainers = $('.js-gallery');

galleryContainers.each((_, element) => {
  new Gallery(element);
});
