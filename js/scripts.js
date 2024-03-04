let pokemonList = [
  { name: "Bulbasaur", height: 0.7, types: ["Grass", "Poison"] },
  { name: "Charmander", height: 0.6, types: ["Fire", "None"] },
  { name: "Charizard", height: 1.7, types: ["Fire", "Flying"] },
  { name: "Squirtle", height: 0.5, types: ["Water", "None"] },
  { name: "Pikachu", height: 0.4, types: ["Electric", "None"] },
];

for (let i = 0; i < pokemonList.length; i++) {
  let name = pokemonList[i].name;
  let height = pokemonList[i].height;
  document.write(name + " (height: " + height + ")");
  if (height >= 1.0) {
    document.write(" - Wow, that's big! <br>");
  } else {
    document.write("<br>");
  }
}
