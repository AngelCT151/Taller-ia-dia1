// API Key para OMDb - Puedes obtener una gratis en: http://www.omdbapi.com/apikey.aspx
const API_KEY = '79dce510'; // Key de prueba para OMDb
const OMDB_API_URL = 'http://www.omdbapi.com/';

// Mapeo de géneros a palabras clave de búsqueda
const genreKeywords = {
    'action': 'action',
    'comedy': 'comedy',
    'drama': 'drama',
    'horror': 'horror',
    'romance': 'romance',
    'sci-fi': 'sci-fi',
    'thriller': 'thriller',
    'animation': 'animation'
};

// Variable para rastrear el filtro de género activo
let activeGenreFilter = null;

/**
 * Busca películas o series en la API
 */
async function searchMovies() {
    const searchTerm = document.getElementById('searchInput').value.trim();
    const typeFilter = document.getElementById('typeFilter').value;

    if (searchTerm === '') {
        showMessage('Por favor, ingresa un término de búsqueda', 'error');
        return;
    }

    showLoading(true);
    clearResults();

    try {
        // Construir URL con parámetros
        let url = `${OMDB_API_URL}?apikey=${API_KEY}&s=${encodeURIComponent(searchTerm)}&page=1`;
        
        if (typeFilter) {
            url += `&type=${typeFilter}`;
        }

        const response = await fetch(url);
        const data = await response.json();

        showLoading(false);

        if (data.Response === 'True' && data.Search && data.Search.length > 0) {
            displayResults(data.Search);
            showMessage(`✓ Se encontraron ${data.Search.length} resultados para "${searchTerm}"`, 'success');
        } else {
            showMessage(`✗ No se encontraron resultados para "${searchTerm}". Intenta con otro término.`, 'error');
        }
    } catch (error) {
        showLoading(false);
        showMessage(`Error al buscar: ${error.message}`, 'error');
        console.error('Error:', error);
    }
}

/**
 * Filtra búsquedas por género
 */
function filterByGenre(genre, buttonElement) {
    // Si es el mismo género, deseleccionar
    if (activeGenreFilter === genre) {
        activeGenreFilter = null;
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        clearResults();
        showMessage('Filtro de género removido', 'success');
        return;
    }

    // Actualizar género activo
    activeGenreFilter = genre;
    
    // Actualizar botones activos
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    if (buttonElement) {
        buttonElement.classList.add('active');
    }

    // Realizar búsqueda con el género
    const searchInput = document.getElementById('searchInput');
    searchInput.value = genre.charAt(0).toUpperCase() + genre.slice(1);
    searchMovies();
}

/**
 * Muestra los resultados en la página
 */
function displayResults(movies) {
    const resultsContainer = document.getElementById('resultsContainer');
    resultsContainer.innerHTML = '';

    if (!movies || movies.length === 0) {
        resultsContainer.innerHTML = '<div class="no-results">No hay resultados para mostrar</div>';
        return;
    }

    movies.forEach(movie => {
        const movieCard = createMovieCard(movie);
        resultsContainer.appendChild(movieCard);
    });
}

/**
 * Crea una tarjeta de película
 */
function createMovieCard(movie) {
    const card = document.createElement('div');
    card.className = 'movie-card';
    
    const type = movie.Type === 'series' ? 'Serie' : 'Película';
    const poster = movie.Poster !== 'N/A' ? movie.Poster : null;

    card.innerHTML = `
        ${poster ? 
            `<img src="${poster}" alt="${movie.Title}" class="movie-poster" onerror="this.classList.add('no-poster'); this.textContent='📽️';">` : 
            `<div class="movie-poster no-poster">📽️</div>`
        }
        <div class="movie-info">
            <div class="movie-type">${type}</div>
            <h3 class="movie-title">${movie.Title}</h3>
            <p class="movie-year">📅 ${movie.Year}</p>
            <div class="movie-rating">
                <span class="stars">⭐</span>
                <span class="rating-value">${movie.imdbID ? 'IMDb' : 'N/A'}</span>
            </div>
            <button onclick="getMovieDetails('${movie.imdbID}')" style="width: 100%; margin-top: 10px;">
                Ver Detalles
            </button>
        </div>
    `;

    // Agregar evento para ver detalles
    card.style.cursor = 'pointer';
    
    return card;
}

/**
 * Obtiene detalles completos de una película
 */
async function getMovieDetails(imdbID) {
    showLoading(true);

    try {
        const url = `${OMDB_API_URL}?apikey=${API_KEY}&i=${imdbID}`;
        const response = await fetch(url);
        const data = await response.json();

        showLoading(false);

        if (data.Response === 'True') {
            displayMovieDetails(data);
        } else {
            showMessage('No se pudo obtener los detalles', 'error');
        }
    } catch (error) {
        showLoading(false);
        showMessage(`Error: ${error.message}`, 'error');
        console.error('Error:', error);
    }
}

/**
 * Muestra los detalles completos de una película
 */
function displayMovieDetails(movie) {
    const resultsContainer = document.getElementById('resultsContainer');
    const poster = movie.Poster !== 'N/A' ? movie.Poster : null;

    resultsContainer.innerHTML = `
        <div style="grid-column: 1 / -1; background: rgba(20, 20, 20, 0.95); padding: 40px; border-radius: 12px; color: #fff; border: 1px solid rgba(229, 9, 20, 0.2);">
            <button onclick="location.reload()" style="margin-bottom: 30px; padding: 12px 24px; background: linear-gradient(135deg, #e50914 0%, #c4070c 100%); border: none; color: white; border-radius: 6px; cursor: pointer; font-weight: bold; text-transform: uppercase; letter-spacing: 1px;">← Volver a Resultados</button>
            
            <div style="display: grid; grid-template-columns: 1fr 2fr; gap: 40px; margin-bottom: 30px;">
                <div>
                    ${poster ? 
                        `<img src="${poster}" alt="${movie.Title}" style="width: 100%; border-radius: 8px; box-shadow: 0 8px 32px rgba(229, 9, 20, 0.3); border: 1px solid rgba(229, 9, 20, 0.2);">` : 
                        `<div style="background: linear-gradient(135deg, rgba(229, 9, 20, 0.3) 0%, rgba(255, 99, 99, 0.2) 100%); width: 100%; aspect-ratio: 2/3; display: flex; align-items: center; justify-content: center; color: rgba(255, 255, 255, 0.6); font-size: 4rem; border-radius: 8px; border: 1px solid rgba(229, 9, 20, 0.2);">📽️</div>`
                    }
                </div>
                
                <div>
                    <h2 style="font-size: 2.5rem; margin-bottom: 10px; background: linear-gradient(135deg, #e50914 0%, #ff6b6b 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">${movie.Title}</h2>
                    <p style="color: #ccc; margin-bottom: 25px; font-size: 1.1rem; line-height: 1.6;">${movie.Tagline || ''}</p>
                    
                    <div style="background: rgba(30, 30, 30, 0.8); padding: 25px; border-radius: 8px; margin-bottom: 25px; border: 1px solid rgba(229, 9, 20, 0.2);">
                        <p style="margin-bottom: 12px;"><strong style="color: #e50914;">📅 Año:</strong> <span style="color: #ccc;">${movie.Year}</span></p>
                        <p style="margin-bottom: 12px;"><strong style="color: #e50914;">⏱️ Duración:</strong> <span style="color: #ccc;">${movie.Runtime}</span></p>
                        <p style="margin-bottom: 12px;"><strong style="color: #e50914;">🎬 Tipo:</strong> <span style="color: #ccc;">${movie.Type === 'series' ? 'Serie' : 'Película'}</span></p>
                        <p style="margin-bottom: 12px;"><strong style="color: #e50914;">🎭 Género:</strong> <span style="color: #ccc;">${movie.Genre}</span></p>
                        <p style="margin-bottom: 12px;"><strong style="color: #e50914;">🎥 Director:</strong> <span style="color: #ccc;">${movie.Director}</span></p>
                        <p style="margin-bottom: 12px;"><strong style="color: #e50914;">👥 Actores:</strong> <span style="color: #ccc;">${movie.Actors}</span></p>
                        <p style="margin-bottom: 0;"><strong style="color: #e50914;">⭐ Calificación IMDb:</strong> <span style="color: #1db954; font-weight: bold;">${movie.imdbRating}/10</span> <span style="color: #999;">(${movie.imdbVotes} votos)</span></p>
                    </div>
                    
                    <div style="background: rgba(30, 30, 30, 0.6); padding: 25px; border-radius: 8px; margin-bottom: 25px; border-left: 4px solid #e50914;">
                        <p><strong style="color: #e50914; font-size: 1.1rem;">📝 Sinopsis</strong></p>
                        <p style="margin-top: 15px; line-height: 1.8; color: #ccc;">${movie.Plot}</p>
                    </div>
                    
                    <div style="background: rgba(30, 30, 30, 0.8); padding: 20px; border-radius: 8px; border: 1px solid rgba(229, 9, 20, 0.2);">
                        <p style="margin-bottom: 10px;"><strong style="color: #e50914;">🌍 País:</strong> <span style="color: #ccc;">${movie.Country}</span></p>
                        <p style="margin-bottom: 10px;"><strong style="color: #e50914;">🏆 Premios:</strong> <span style="color: #ccc;">${movie.Awards}</span></p>
                        <p style="margin-bottom: 0;"><strong style="color: #e50914;">📊 Calificación:</strong> <span style="color: #ccc;">${movie.Rated}</span></p>
                    </div>
                </div>
            </div>
        </div>
    `;
}

/**
 * Muestra un mensaje en la página
 */
function showMessage(message, type) {
    const messageContainer = document.getElementById('messageContainer');
    const messageClass = type === 'error' ? 'error-message' : 'success-message';
    
    messageContainer.innerHTML = `<div class="${messageClass}">${message}</div>`;
    
    setTimeout(() => {
        messageContainer.innerHTML = '';
    }, 4000);
}

/**
 * Muestra o oculta el spinner de carga
 */
function showLoading(show) {
    const loadingContainer = document.getElementById('loadingContainer');
    
    if (show) {
        loadingContainer.innerHTML = `
            <div class="loading">
                <div class="spinner"></div>
                <p>Buscando...</p>
            </div>
        `;
    } else {
        loadingContainer.innerHTML = '';
    }
}

/**
 * Limpia los resultados
 */
function clearResults() {
    document.getElementById('resultsContainer').innerHTML = '';
}

/**
 * Evento para buscar al presionar Enter
 */
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            searchMovies();
        }
    });

    // Búsqueda inicial de películas populares
    searchInput.value = 'Avengers';
    searchMovies();
});
