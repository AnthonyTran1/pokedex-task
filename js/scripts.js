fetch("https://pokeapi.co/api/v2/pokemon/")
  .then(function (response) {
    return response.json(); // This returns a promise!
  })
  .then(function (pokemonList) {
    console.log(pokemonList); // The actual JSON response
  })
  .catch(function () {
    // Error
  });

//IIFE wrap on pokemonList
let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=1025";

  // return functions
  function getAll() {
    return pokemonList;
  }
  function add(pokemon) {
    //check if pokemon is of correct type of data
    if (typeof pokemon === "object" && "name" in pokemon) {
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

    button.addEventListener("click", function (event) {
      showDetail(pokemon);
    });
  }
  function showDetail(pokemon) {
    loadDetails(pokemon).then(function () {
      console.log(pokemon);
    });
  }
  //load pokemon information from pokemonAPI
  function loadList() {
    showLoadingMessage();
    return fetch(apiUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        json.results.forEach(function (item) {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url,
          };
          add(pokemon);
        });
        hideLoadingMessage();
      })
      .catch(function (e) {
        console.error(e);
      });
  }
  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (details) {
        // Now we add the details to the item
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        item.types = details.types;
      })
      .catch(function (e) {
        console.error(e);
      });
  }
  function showLoadingMessage() {
    let loader = document.querySelector("loader-showMessage");
    document.appendChild(loader);
  }

  function hideLoadingMessage() {
    let loader = document.querySelector("loader-showMessage");
    document.removeChild(loader);
  }

  return {
    getAll: getAll,
    add: add,
    addListItem: addListItem,
    showDetail: showDetail,
    loadList: loadList,
    loadDetails: loadDetails,
    showLoadingMessage: showLoadingMessage,
    hideLoadingMessage: hideLoadingMessage,
  };
})();

pokemonRepository.loadList().then(function () {
  // Now the data is loaded!
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});

//execute forEach on the PokemonList from IIFE
pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
