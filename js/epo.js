const IMG_PATH = 'https://image.tmdb.org/t/p/w500';
const resultsDiv = document.getElementById('results');
const errorDiv = document.getElementById('error-container');

export function displayMovies(movies, showDescription) {
    _.each(movies, (movie) => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <img src="${IMG_PATH + movie.poster_path}" alt="${movie.title}">
            <h3>${movie.title}</h3>
            <p>Release: ${movie.release_date || 'Okänt'}</p>
            ${showDescription && movie.overview ? `<p>${movie.overview.substring(0, 200)} ...</p>` : ''}
        `;
        resultsDiv.appendChild(card);
    });
}

export function displayPeople(people) {
    _.each(people, (person) => {
        const card = document.createElement('div');
        card.className = 'card';
        
        const knownFor = person.known_for.slice(0, 3).map(item => {
            const type = item.media_type === 'movie' ? 'Movie' : 'TV';
            const title = item.title || item.name;
            return `<li>${type}: ${title} </li>`;
        }).join('');

        card.innerHTML = `
            <img src="${IMG_PATH + person.profile_path}" alt="${person.name}">
            <h3>${person.name}</h3>
            <p>Område: ${person.known_for_department}</p>
            <ul>${knownFor}</ul>
        `;
        resultsDiv.appendChild(card);
    });
}

export function clearPage() {
    resultsDiv.innerHTML = '';
    errorDiv.style.display = 'none';
}

export function showError(msg) {
    errorDiv.textContent = msg;
    errorDiv.style.display = 'block';
}