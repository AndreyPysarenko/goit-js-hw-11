import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

export function createMarkup(arr) {
  return arr
    .map(
      ({
        largeImageURL,
        webformatURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `<div class="gallery-card">
    
            <a class="gallery-card__link" href="${largeImageURL}">
                <img class="gallery-card__img" src="${webformatURL}" alt="${tags}"  loading="lazy" />
            </a>
        
    <div class="gallery-card__info">
      <p class="gallery-card__info--item">
        <b>Likes: ${likes}</b>
      </p>
      <p class="gallery-card__info--item">
        <b>Views: ${views}</b>
      </p>
      <p class="gallery-card__info--item">
        <b>Comments: ${comments}</b>
      </p>
      <p class="gallery-card__info--item">
        <b>Downloads: ${downloads}</b>
      </p>
    </div>
  </div>`
    )
    .join('');
}

export let lightbox = new SimpleLightbox('.gallery-card__link', {
  captionDelay: 250,
});
