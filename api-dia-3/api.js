//Ejercicio:  Consumo de APIs con fetch
//objetivo: buscar un pokemon con PokeAPI y mostrar su nombre en consola
//1. Crea una funcion llamado obtenerPokemonApi que reciba un nombre de pokemon, consulte la PokeAPI y devuelva los datos en JSON e imprima en consola 
function obtenerPokemonApi(nombrePokemon) {
    // Construir la URL de la API con el nombre del Pokémon proporcionado
    const url = `https://pokeapi.co/api/v2/pokemon/${nombrePokemon.toLowerCase()}`;
    
    // Mostrar indicador de carga
    mostrarCarga(true);
    
    // Usar fetch para hacer la solicitud a la API
    return fetch(url)
        .then(response => {
            // Verificar si la respuesta es exitosa
            if (!response.ok) {
                throw new Error(`Pokémon no encontrado: ${response.statusText}`);
            }
            return response.json(); // Convertir la respuesta a JSON
        })
        .then(data => {
            // Procesar y mostrar los datos en la tarjeta
            mostrarPokemon(data);
            console.log(`Pokémon encontrado: ${data.name}`);
            return data;
        })
        .catch(error => {
            // Manejar errores en la solicitud
            console.error('Hubo un problema con la solicitud Fetch:', error);
            mostrarError(error.message);
        })
        .finally(() => {
            mostrarCarga(false);
        });
}

// Función para mostrar el Pokémon en la tarjeta
function mostrarPokemon(pokemon) {
    const tarjeta = document.getElementById('pokemon-card');
    const nombre = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
    const imagen = pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default;
    const tipo = pokemon.types.map(t => t.type.name).join(', ');
    const altura = (pokemon.height / 10).toFixed(1);
    const peso = (pokemon.weight / 10).toFixed(1);
    const experiencia = pokemon.base_experience;
    
    let estadisticas = '';
    pokemon.stats.forEach(stat => {
        const nombreStat = stat.stat.name.charAt(0).toUpperCase() + stat.stat.name.slice(1);
        estadisticas += `
            <div class="stat-item">
                <span class="stat-name">${nombreStat}</span>
                <div class="stat-bar">
                    <div class="stat-value" style="width: ${(stat.base_stat / 255) * 100}%"></div>
                </div>
                <span class="stat-number">${stat.base_stat}</span>
            </div>
        `;
    });
    
    tarjeta.innerHTML = `
        <div class="pokemon-content">
            <div class="pokemon-image">
                <img src="${imagen}" alt="${nombre}" onerror="this.src='https://via.placeholder.com/300?text=${nombre}'">
            </div>
            <div class="pokemon-info">
                <h2 class="pokemon-nombre">${nombre}</h2>
                <p class="pokemon-id">#${pokemon.id}</p>
                <div class="pokemon-tipo">
                    ${pokemon.types.map(t => `<span class="tipo ${t.type.name}">${t.type.name.toUpperCase()}</span>`).join('')}
                </div>
                <div class="pokemon-details">
                    <div class="detail">
                        <span class="detail-label">Altura:</span>
                        <span class="detail-value">${altura} m</span>
                    </div>
                    <div class="detail">
                        <span class="detail-label">Peso:</span>
                        <span class="detail-value">${peso} kg</span>
                    </div>
                    <div class="detail">
                        <span class="detail-label">Experiencia Base:</span>
                        <span class="detail-value">${experiencia}</span>
                    </div>
                </div>
                <div class="pokemon-stats">
                    <h3>Estadísticas</h3>
                    ${estadisticas}
                </div>
            </div>
        </div>
    `;
    tarjeta.style.display = 'block';
}

// Función para mostrar errores
function mostrarError(mensaje) {
    const tarjeta = document.getElementById('pokemon-card');
    tarjeta.innerHTML = `
        <div class="error-message">
            <p>❌ ${mensaje}</p>
            <p>Por favor, intenta con otro Pokémon</p>
        </div>
    `;
    tarjeta.style.display = 'block';
}

// Función para mostrar/ocultar indicador de carga
function mostrarCarga(mostrar) {
    const carga = document.getElementById('loading');
    if (carga) {
        carga.style.display = mostrar ? 'block' : 'none';
    }
}

// Función para buscar Pokémon (se ejecuta al hacer clic en el botón)
function buscarPokemon() {
    const input = document.getElementById('pokemon-input');
    const nombrePokemon = input.value.trim();
    
    if (nombrePokemon === '') {
        alert('Por favor, ingresa el nombre de un Pokémon');
        return;
    }
    
    obtenerPokemonApi(nombrePokemon);
}

// Permitir búsqueda al presionar Enter
document.addEventListener('DOMContentLoaded', function() {
    const input = document.getElementById('pokemon-input');
    if (input) {
        input.addEventListener('keypress', function(event) {
            if (event.key === 'Enter') {
                buscarPokemon();
            }
        });
    }
});
