import Notiflix from 'notiflix';

import { createMarkup, lightbox } from './js/create-markup';
import { PixabayAPI } from './js/api-search';

const refs = {
  searchForm: document.querySelector('#search-form'),
  divGalleryContainer: document.querySelector('.gallery'),
};

const target = document.querySelector('.js-guard');

const PER_PAGE = 40;

const pixabayApiInstance = new PixabayAPI();

let options = {
  root: null,
  rootMargin: '300px',
  threshold: 1.0,
};

let observer = new IntersectionObserver(scrollLoadMore, options);

function scrollLoadMore(entries, observer) {
  try {
    entries.forEach(async entry => {
      if (entry.isIntersecting) {
        pixabayApiInstance.page += 1;

        const response = await pixabayApiInstance.fetchHits();
        const arrayImages = response.data.hits;

        refs.divGalleryContainer.insertAdjacentHTML(
          'beforeend',
          createMarkup(arrayImages)
        );
        lightbox.refresh();

        if (arrayImages <= PER_PAGE * pixabayApiInstance.page) {
          Notiflix.Notify.failure(
            'We`re sorry, but you`ve reached the end of search results.'
          );
          observer.unobserve(target);
        }
      }
    });
  } catch (error) {
    console.log(error);
  }
}

const handleSearchFormSubmit = async event => {
  event.preventDefault();

  const searchQuery = event.target.firstElementChild.value.trim();

  pixabayApiInstance.query = searchQuery;

  if (pixabayApiInstance.query === '') {
    return Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  }

  try {
    const response = await pixabayApiInstance.fetchHits();
    const arrayImages = response.data.hits;
    const totalImages = response.data.totalHits;

    if (totalImages !== 0) {
      Notiflix.Notify.success(`Hooray! We found ${totalImages} images.`);
    }

    refs.divGalleryContainer.innerHTML = createMarkup(arrayImages);
    lightbox.refresh();
    observer.observe(target);
  } catch (error) {
    console.log(error);
  }
};

refs.searchForm.addEventListener('submit', handleSearchFormSubmit);
