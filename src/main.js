import { fetchImages, resetPage } from './js/pixabay-api.js';
import {
    renderImages,
    showLoadMoreButton,
    hideLoadMoreButton,
    showLoading,
    hideLoading,
    showNoResultsMessage,
    showEndOfResultsMessage,
} from './js/render-function.js';

const form = document.getElementById('search-form');
const loadMoreButton = document.getElementById('load-more');
let query = '';

form.addEventListener('submit', async (event) => {
    event.preventDefault();
    query = document.getElementById('search-input').value.trim();

    if (!query) {
        iziToast.error({
            title: 'Error',
            message: 'Search field cannot be empty!',
        });
        return;
    }

    resetPage();
    hideLoadMoreButton();
    document.getElementById('gallery').innerHTML = '';

    try {
        showLoading();
        const data = await fetchImages(query);
        const { hits, totalHits } = data;

        if (hits.length === 0) {
            showNoResultsMessage();
        } else {
            renderImages(hits);
            if (hits.length < 15 || totalHits <= 15) {
                hideLoadMoreButton();
                showEndOfResultsMessage();
            } else {
                showLoadMoreButton();
            }
        }
    } catch (error) {
        iziToast.error({
            title: 'Error',
            message: 'Something went wrong. Please try again later.',
        });
    } finally {
        hideLoading();
    }
});

loadMoreButton.addEventListener('click', async () => {
    try {
        showLoading();
        const data = await fetchImages(query);
        const { hits, totalHits } = data;

        if (hits.length === 0) {
            hideLoadMoreButton();
            showEndOfResultsMessage();
        } else {
            renderImages(hits);
            if (hits.length < 15 || totalHits <= 15) {
                hideLoadMoreButton();
                showEndOfResultsMessage();
            }
        }

        const card = document.querySelector('.card');
        if (card) {
            window.scrollBy({
                top: card.getBoundingClientRect().height * 2,
                behavior: 'smooth',
            });
        }
    } catch (error) {
        iziToast.error({
            title: 'Error',
            message: 'Something went wrong. Please try again later.',
        });
    } finally {
        hideLoading();
    }
});