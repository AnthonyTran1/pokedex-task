let pokemonList = [
  { name: "Bulbasaur", height: 0.7, types: ["Grass", "Poison"] },
  { name: "Charmander", height: 0.6, types: ["Fire", "None"] },
  { name: "Charizard", height: 1.7, types: ["Fire", "Flying"] },
  { name: "Squirtle", height: 0.5, types: ["Water", "None"] },
  { name: "Pikachu", height: 0.4, types: ["Electric", "None"] },
];

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

pokemonList.forEach((pokemon) => getPokemonDescription(pokemon));
