const API_KEY = '72d5350b35db567a8661e67bff89c4b7'; // Замените на свой ключ

async function fetchGenres() {
    const url = `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        const genres = data.genres;
        populateGenreFilter(genres);
    } catch (error) {
        console.error('Error fetching genres:', error);
    }
}

function populateGenreFilter(genres) {
    const genreFilter = document.getElementById('genreFilter');
    genres.forEach(genre => {
        const option = document.createElement('option');
        option.value = genre.id;
        option.textContent = genre.name;
        genreFilter.appendChild(option);
    });
}

async function fetchMovies(genreId = '') {
    let url = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`;

    if (genreId) {
        url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${genreId}&language=en-US&page=1`;
    }

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.results) {
            displayMovies(data.results);
        } else {
            document.getElementById('moviesContainer').innerHTML = '<p>No movies found!</p>';
        }
    } catch (error) {
        console.error('Error fetching movies:', error);
    }
}

function displayMovies(movies) {
    const container = document.getElementById('moviesContainer');
    container.innerHTML = ''; 

    movies.forEach(movie => {
        const movieCard = `
            <div class="col-md-4">
                <div class="card h-100">
                    <img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" class="card-img-top" alt="${movie.title}">
                    <div class="card-body">
                        <h5 class="card-title">${movie.title}</h5>
                        <p class="card-text">Rating: ${movie.vote_average}/10</p>
                        <p class="card-text">Release Date: ${movie.release_date}</p>
                        <p class="card-text">${movie.overview.substring(0, 100)}...</p>
                    </div>
                    <div class="card-footer text-center">
                        <a href="Interstellar.html?movie_id=${movie.id}" class="btn btn-primary">Details</a>
                    </div>
                </div>
            </div>
        `;
        container.innerHTML += movieCard;
    });
}

function filterMoviesByGenre() {
    const selectedGenreId = document.getElementById('genreFilter').value;
    fetchMovies(selectedGenreId);
}

document.addEventListener('DOMContentLoaded', () => {
    fetchGenres(); // Загружаем жанры
    fetchMovies(); // Загружаем популярные фильмы
    document.getElementById('genreFilter').addEventListener('change', filterMoviesByGenre);
});
