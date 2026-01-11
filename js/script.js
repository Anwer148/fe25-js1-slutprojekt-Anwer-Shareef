import { fetchData } from './api.js';
import { displayMovies, displayPeople, clearPage, showError } from './epo.js';

const searchForm = document.getElementById('search-form');
const topRatedBtn = document.getElementById('top-rated-btn');
const popularBtn = document.getElementById('popular-btn');


searchForm.addEventListener('submit', (event) => { 
    event.preventDefault(); 
    handleSearch(); 
});

topRatedBtn.addEventListener('click', () => getMovies('top_rated'));
popularBtn.addEventListener('click', () => getMovies('popular'));

async function getMovies(endpoint) {
    clearPage();
    try {
        const data = await fetchData(`movie/${endpoint}`);
        const top10 = _.first(data.results, 10);
        displayMovies(top10, false);
    } catch (err) {
        showError(`Kunde inte hämta filmer: ${err.message}`);
    }
}

async function handleSearch() {
    clearPage();
    const query = document.getElementById('userInput').value;
    const type = document.getElementById('searchType').value;

    if(!query) return showError("Du måste skriva något i sökfältet!");

    try {
        const data = await fetchData(`search/${type}`, `&query=${encodeURIComponent(query)}`);

        if(data.results.length === 0) return showError("Inga resultat hittades.");

        let results = data.results;

    
        results = _.filter(results, (item) => type === 'movie' ? item.poster_path : item.profile_path);

        if(type === 'movie') {
            displayMovies(results, true); 
        } else {
            displayPeople(results);
        }
    } catch (err) {
        showError(`Nätverksfel.Kontrollera din internetanslutning: ${err.message}`);
    }
}