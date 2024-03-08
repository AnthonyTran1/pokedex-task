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

  return {
    getAll: getAll,
    add: add,
  };
})();

//pokemon description function
function getPokemonDescription(pokemonObject) {
  let nameDescription = pokemonObject.name;
  let heightDescription = pokemonObject.height;
  let typeDescription = pokemonObject.types;

  document.write(
    nameDescription +
      " - Type [ " +
      typeDescription +
      " ]" +
      " (Height: " +
      heightDescription +
      ")"
  );
  if (heightDescription > 1) {
    document.write(" - Wow, that's big! <br>");
  } else {
    document.write("<br>");
  }
}

//execute forEach on the PokemonList from IIFE
pokemonRepository.getAll().forEach((pokemon) => getPokemonDescription(pokemon));
document.write("<br>");

//Testing
//add correct pokemon format
let testPokemon1 = {
  name: "Rayquaza",
  height: 7,
  types: ["Dragon", "Flying"],
};
pokemonRepository.add(testPokemon1);

//check repository
pokemonRepository.getAll().forEach((pokemon) => getPokemonDescription(pokemon));
document.write("<br>");

//add incorrect pokemon format
//name not string
let testPokemon2 = {
  name: 0,
  height: 7,
  types: ["Dragon", "Flying"],
};
pokemonRepository.add(testPokemon2);

//height not number
let testPokemon3 = {
  name: "Rayquaza",
  height: "7",
  types: ["Dragon", "Flying"],
};
pokemonRepository.add(testPokemon3);

//type 1 is not string
let testPokemon4 = {
  name: "Rayquaza",
  height: 7,
  types: [0, "Flying"],
};
pokemonRepository.add(testPokemon4);

//type 2 is not string
let testPokemon5 = {
  name: "Rayquaza",
  height: 7,
  types: ["Dragon", 0],
};
pokemonRepository.add(testPokemon5);
