const pokemonList = document.querySelector("#pokemon-list");
let URL = "https://pokeapi.co/api/v2/pokemon/";

const fetchPromises = [];

for (let i = 1; i <= 251; i++) {
    fetchPromises.push(fetch(URL + i).then((response) => response.json()));
}

Promise.all(fetchPromises)
    .then((pokemons) => {
        pokemons.forEach((poke) => showPokemon(poke));
    })
    .catch((error) => {
        console.error("Error al cargar los Pokémon: ", error);
    });

function showPokemon(poke) {
    let types = poke.types.map(type => `<p class="${type.type.name} type">${type.type.name}</p>`);
    types = types.join('');

    let pokeId = poke.id.toString();
    if (pokeId.length === 1) {
        pokeId = "00" + pokeId;
    } else if (pokeId.length === 2) {
        pokeId = "00" + pokeId;
    }

    const div = document.createElement("div");
    div.classList.add("pokemon");
    div.innerHTML = `<div class="pokemon">
    <p class="pokemon-id-back">#${pokeId}</p>
    <div class="pokemon-img">
      <img src=${poke.sprites.other["official-artwork"].front_default} alt="${poke.name}">
    </div>
    <div class="pokemon-info">
      <div class="name-container">
        <p class="pokemon-id">#${pokeId}</p>
        <h2 class="pokemon-name">${poke.name}</h2>
      </div>
      <div class="pokemon-types">
        ${types}
      </div>
      <div class="pokemon-stats">
        <p class="stat">${poke.height}m</p>
        <p class="stat">${poke.weight}kg</p>
      </div>
    </div>
  </div>
  `;
  pokemonList.append(div);

}

/*
<div class="pokemon">
            <p class="pokemon-id-back">#001</p>
            <div class="pokemon-img">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png" alt="Bulbasaur">
            </div>
            <div class="pokemon-info">
              <div class="name-container">
                <p class="pokemon-id">#001</p>
                <h2 class="pokemon-name">Bulbasaur</h2>
              </div>
              <div class="pokemon-types">
                <p class="grass type">Grass</p>
                <p class="poison type">Poison</p>
              </div>
              <div class="pokemon-stats">
                <p class="stat">1m</p>
                <p class="stat">1kg</p>
              </div>
            </div>
          </div>
*/