//IIFE wrap on pokemonList
let pokemonRepository = (function () {
  let pokemonList = [
    { name: "Bulbasaur", height: 0.7, types: ["Grass", "Poison"] },
    { name: "Charmander", height: 0.6, types: ["Fire", "None"] },
    { name: "Charizard", height: 1.7, types: ["Fire", "Flying"] },
    { name: "Squirtle", height: 0.5, types: ["Water", "None"] },
    { name: "Pikachu", height: 0.4, types: ["Electric", "None"] },
  ];

  // return functions
  function getAll() {
    return pokemonList;
  }
  function add(pokemon) {
    //check if pokemon is of correct type of data
    if (
      typeof pokemon === "object" &&
      typeof pokemon.name === "string" &&
      typeof pokemon.height === "number" &&
      typeof pokemon.types[0] === "string" &&
      typeof pokemon.types[1] === "string"
    ) {
      pokemonList.push(pokemon);
    } else {
      document.write("This pokemon is not formatted correctly!" + "<br>");
    }
  }
  function addListItem(pokemon) {
    let pokemonList = document.querySelector(".pokemon-list");
    let listPokemon = document.createElement("li");
    let button = document.createElement("button");
    button.innerHTML = pokemon.name;
    button.classList.add("button-class");
    listPokemon.appendChild(button);
    pokemonList.appendChild(listPokemon);
  }
  return {
    getAll: getAll,
    add: add,
    addListItem: addListItem,
  };
})();

//add new pokemon to repository
let testPokemon1 = {
  name: "Rayquaza",
  height: 7,
  types: ["Dragon", "Flying"],
};
pokemonRepository.add(testPokemon1);
//execute forEach on the PokemonList from IIFE
pokemonRepository.getAll().forEach(function (pokemon) {
  pokemonRepository.addListItem(pokemon);
});
