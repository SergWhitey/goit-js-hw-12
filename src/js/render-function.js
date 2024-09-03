import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const gallery = document.getElementById('gallery');
const loadMoreButton = document.getElementById('load-more');
const loadingIndicator = document.getElementById('loading');


const lightbox = new SimpleLightbox('.gallery a', {
    captionsData: 'data-caption',
    captionDelay: 250,
});

export function renderImages(images) {
    const markup = images
        .map(image => {
            return `
                <a class="card" href="${image.largeImageURL}" data-caption="
                    <p>Likes: ${image.likes}</p>
                    <p>Views: ${image.views}</p>
                    <p>Comments: ${image.comments}</p>
                    <p>Downloads: ${image.downloads}</p>
                ">
                    <img src="${image.webformatURL}" alt="${image.tags}">
                    <div class="card-info">${image.tags}</div>
                </a>
            `;
        })
        .join('');

    gallery.insertAdjacentHTML('beforeend', markup);

    lightbox.refresh();
}


export function showLoadMoreButton() {
    loadMoreButton.style.display = 'block';
}

export function hideLoadMoreButton() {
    loadMoreButton.style.display = 'none';
}

export function showLoading() {
    loadingIndicator.style.display = 'block';
}

export function hideLoading() {
    loadingIndicator.style.display = 'none';
}

export function showNoResultsMessage() {
    iziToast.warning({
        title: 'No results',
        message: "Sorry, there are no images matching your search query. Please try again!",
    });
}

export function showEndOfResultsMessage() {
    iziToast.info({
        title: 'End of results',
        message: "We're sorry, but you've reached the end of search results.",
    });
}