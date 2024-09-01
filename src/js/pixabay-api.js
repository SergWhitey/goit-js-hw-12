import axios from 'axios';

const API_URL = 'https://pixabay.com/api/';
const API_KEY = '45735019-5668e0368fbdb80eca42c52b3';

export let page = 1;

export async function fetchImages(query) {
    try {
        const response = await axios.get(API_URL, {
            params: {
                key: API_KEY,
                q: query,
                image_type: 'photo',
                orientation: 'horizontal',
                safesearch: true,
                per_page: 15,
                page,
            },
        });

        page += 1;

        return response.data;
    } catch (error) {
        console.error('Error fetching images:', error);
        throw error;
    }
}

export function resetPage() {
    page = 1;
}