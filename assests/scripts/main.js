const pokemonList = document.querySelector("#pokemon-list");
const URL = "https://pokeapi.co/api/v2/pokemon/";
let pokemonsData = [];

// Función para cargar todos los Pokémon
function loadAllPokemon(totalPokemonCount) {
    const fetchPromises = [];

    for (let i = 1; i <= totalPokemonCount; i++) {
        fetchPromises.push(
            fetch(URL + i)
                .then((response) => response.json())
                .then((poke) => pokemonsData.push(poke))
        );
    }

    Promise.all(fetchPromises)
        .then(() => {
            displayPokemonList(pokemonsData); // Mostrar todos los Pokémon
            initializeFilterButtons(pokemonsData); // Inicializar botones de filtrado
        })
        .catch((error) => {
            console.error("Error al cargar los Pokémon: ", error);
        });
}

// Función para mostrar una lista de Pokémon
function displayPokemonList(pokemonData) {
    pokemonList.innerHTML = ""; // Limpiar la lista de Pokémon

    // Ordenar los Pokémon por su ID antes de mostrarlos
    const sortedPokemon = pokemonData.sort((a, b) => a.id - b.id);

    sortedPokemon.forEach((poke) => {
        const types = poke.types.map(type => `<p class="${type.type.name} type">${type.type.name}</p>`).join('');
        const pokeId = poke.id.toString().padStart(3, "0");

        const div = document.createElement("div");
        div.classList.add("pokemon");
        div.innerHTML = `
            <div class="pokemon">
                <p class="pokemon-id-back">#${pokeId}</p>
                <div class="pokemon-img">
                    <img src="${poke.sprites.other["official-artwork"].front_default}" alt="${poke.name}">
                </div>
                <div class "pokemon-info">
                    <div class="name-container">
                        <p class="pokemon-id">#${pokeId}</p>
                        <h2 class="pokemon-name">${poke.name}</h2>
                    </div>
                    <div class="pokemon-types">
                        ${types}
                    </div>
                    <div class="pokemon-stats">
                        <p class="stat">${poke.height / 10}m</p>
                        <p class="stat">${poke.weight / 10}kg</p>
                    </div>
                </div>
            </div>
        `;
        pokemonList.appendChild(div);
    });
}

// Función para inicializar los botones de filtrado
function initializeFilterButtons(pokemonData) {
    const filterButtons = document.querySelectorAll(".btn-header");
    filterButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const filterType = button.id;

            if (filterType === "see-all") {
                displayPokemonList(pokemonData); // Mostrar todos los Pokémon
            } else {
                const filteredPokemon = pokemonData.filter((poke) => {
                    return poke.types.some(type => type.type.name === filterType);
                });

                displayPokemonList(filteredPokemon); // Mostrar Pokémon filtrados por tipo
            }
        });
    });
}

// Llama a la función para cargar todos los Pokémon
loadAllPokemon(807);
