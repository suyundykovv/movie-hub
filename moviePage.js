window.onload = function() {
    const params = new URLSearchParams(window.location.search);
    const movieId = params.get('movie_id');
    
    fetchMovieData(movieId);
};

function fetchMovieData(movieId) {
    const apiKey = '72d5350b35db567a8661e67bff89c4b7';
    const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=en-US`;
  
    fetch(url)
        .then(response => response.json())
        .then(data => {
            displayMovieData(data);
            fetchMovieTrailer(movieId); // Получаем трейлер после получения данных о фильме
            fetchMovieCast(movieId); // Получаем актеров
        })
        .catch(error => console.error('Error fetching movie data:', error));
}

function displayMovieData(data) {
    const movieTitle = document.querySelector('#movieTitle');
    const movieDescription = document.querySelector('#movieDescription');
    const movieRating = document.querySelector('#movieRating');
    const moviePoster = document.querySelector('#moviePoster');
    const movieReleaseDate = document.querySelector('#movieReleaseDate');
    const movieGenres = document.querySelector('#movieGenres');
    
    movieTitle.textContent = data.title;
    movieDescription.textContent = data.overview;
    movieRating.textContent = `Rating: ${data.vote_average}/10`;
    movieReleaseDate.textContent = `Release Date: ${data.release_date}`;
    
    // Формируем строку с жанрами
    const genres = data.genres.map(genre => genre.name).join(', ');
    movieGenres.textContent = `Genres: ${genres}`;
    
    // Отображаем постер
    if (data.poster_path) {
        moviePoster.src = `https://image.tmdb.org/t/p/w500${data.poster_path}`;
    } else {
        moviePoster.src = 'default-poster.jpg'; // Если постер не найден
    }
}

function fetchMovieTrailer(movieId) {
    const apiKey = '72d5350b35db567a8661e67bff89c4b7';
    const url = `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${apiKey}&language=en-US`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.results && data.results.length > 0) {
                const trailer = data.results.find(video => video.type === 'Trailer');
                if (trailer) {
                    const trailerEmbed = `
                        <iframe width="100%" height="400" 
                                src="https://www.youtube.com/embed/${trailer.key}" 
                                frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
                                allowfullscreen>
                        </iframe>
                    `;
                    document.getElementById('trailerContainer').innerHTML = trailerEmbed;
                } else {
                    document.getElementById('trailerContainer').innerHTML = '<p>No trailer available.</p>';
                }
            }
        })
        .catch(error => console.error('Error fetching movie trailer:', error));
}

function fetchMovieCast(movieId) {
    const apiKey = '72d5350b35db567a8661e67bff89c4b7';
    const url = `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${apiKey}&language=en-US`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const castList = data.cast;
            const castContainer = document.getElementById('movieCast');
            castContainer.innerHTML = '';

            castList.forEach(castMember => {
                const castItem = document.createElement('li');
                castItem.textContent = `${castMember.name} as ${castMember.character}`;
                castContainer.appendChild(castItem);
            });
        })
        .catch(error => console.error('Error fetching movie cast:', error));
}
