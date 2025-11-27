// Variables globales
const API_URL = 'https://rickandmortyapi.com/api/character';
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const container = document.getElementById('container');

let allCharacters = [];

// Event listeners
searchBtn.addEventListener('click', handleSearch);
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        handleSearch();
    }
});

// Función para cargar todos los personajes al iniciar
async function loadAllCharacters() {
    try {
        container.innerHTML = '<div class="loading">Cargando personajes...</div>';
        allCharacters = await fetchAllCharacters();
        displayCharacters(allCharacters);
    } catch (error) {
        console.error('Error al cargar personajes:', error);
        container.innerHTML = '<div class="error">Error al cargar los personajes. Intenta nuevamente.</div>';
    }
}

// Función para obtener todos los personajes con paginación
async function fetchAllCharacters() {
    try {
        let characters = [];
        let nextUrl = API_URL;
        
        while (nextUrl) {
            const response = await fetch(nextUrl);
            if (!response.ok) {
                throw new Error(`Error en la API: ${response.status}`);
            }
            const data = await response.json();
            characters = characters.concat(data.results);
            nextUrl = data.info.next;
        }
        
        return characters;
    } catch (error) {
        throw error;
    }
}

// Función para buscar personajes
function handleSearch() {
    const searchTerm = searchInput.value.trim().toLowerCase();
    
    if (!searchTerm) {
        displayCharacters(allCharacters);
        return;
    }
    
    const filteredCharacters = allCharacters.filter(character =>
        character.name.toLowerCase().includes(searchTerm)
    );
    
    if (filteredCharacters.length === 0) {
        container.innerHTML = '<div class="no-results">No se encontraron personajes con ese nombre.</div>';
    } else {
        displayCharacters(filteredCharacters);
    }
}

// Función para mostrar personajes en el DOM
function displayCharacters(characters) {
    container.innerHTML = '';
    
    characters.forEach(character => {
        const card = createCharacterCard(character);
        container.appendChild(card);
    });
}

// Función para crear una tarjeta de personaje
function createCharacterCard(character) {
    const card = document.createElement('div');
    card.className = 'card';
    
    // Determinar la clase de estado
    const statusClass = character.status.toLowerCase();
    
    card.innerHTML = `
        <img src="${character.image}" alt="${character.name}" class="card-image">
        <div class="card-content">
            <div class="card-name">${character.name}</div>
            <div class="card-info">
                <strong>Estado:</strong>
                <span class="status ${statusClass}">${character.status}</span>
            </div>
            <div class="card-info">
                <strong>Especie:</strong> ${character.species}
            </div>
            <div class="card-info">
                <strong>Ubicación:</strong> ${character.location.name}
            </div>
        </div>
    `;
    
    return card;
}

// Cargar personajes cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', loadAllCharacters);
