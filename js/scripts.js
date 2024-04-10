//IIFE wrap on pokemonList
let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=1025";
  let modalContainer = document.querySelector("#exampleModal");

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
    let listPokemon = document.createElement("list-group-item");
    let button = document.createElement("button");

    button.innerHTML = pokemon.name;
    button.classList.add("button-class");
    listPokemon.appendChild(button);
    pokemonList.appendChild(listPokemon);

    button.addEventListener("click", function (event) {
      showDetails(pokemon);
    });
  }
  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      showModal(pokemon);
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
    let loader = document.querySelector(".loader-showMessage");
    console.log("LOADER", loader);
    document.body.appendChild(loader);
  }
  function hideLoadingMessage() {
    let loader = document.querySelector(".loader-showMessage");
    document.body.removeChild(loader);
  }
  function showModal(pokemon) {
    let modalBody = $(".modal-body");
    let modalTitle = $(".modal-title");
    let modalHeader = $(".modal-header");

    modalTitle.empty();
    modalBody.empty();

    //creating element for name in modal content
    let nameElement = $("<h1>" + pokemon.name + "</h1>");
    //creating img in modal content
    let imageElement = $('<img class="modal-mg" style="width:50%">');
    imageElement.attr("src", pokemon.imageUrl);
    //creating element for height in modal content
    let heightElement = $("<p>" + "height: " + pokemon.height + "</p>");

    modalTitle.append(nameElement);
    modalBody.append(imageElement);
    modalBody.append(heightElement);
  }
  // function hideModal() {
  //   let modalContainer = document.querySelector("#exampleModal");
  //   modalContainer.classList.remove("is-visible");

  //   if (dialogPromiseReject) {
  //     dialogPromiseReject();
  //     dialogPromiseReject = null;
  //   }
  // }
  // function showDialog(title, text) {
  //   showModal(title, text);

  //   //we have defined modaleContainer here
  //   let modalContainer = document.querySelector("#modal-container");

  //   //we want to add a confirm and cancel button to the modal
  //   let modal = modalContainer.querySelector(".modal");

  //   let confirmButton = document.createElement("button");
  //   confirmButton.classList.add("modal-confirm");
  //   confirmButton.innerText = "Confirm";

  //   let cancelButton = document.createElement("button");
  //   cancelButton.classList.add("modal-cancel");
  //   cancelButton.innerText = "Cancel";

  //   modal.appendChild(confirmButton);
  //   modal.appendChild(cancelButton);

  //   //we want to focus the confirm button so that the user can simply press Enter
  //   confirmButton.focus();

  //   return new Promise((resolve, reject) => {
  //     cancelButton.addEventListener("click", hideModal);
  //     confirmButton.addEventListener("click", () => {
  //       dialogPromiseReject = null; // Reset this
  //       hideModal();
  //       resolve();
  //     });

  //     // This can be used to reject from other functions
  //     dialogPromiseReject = reject;
  //   });
  // }
  // let dialogPromiseReject;
  // window.addEventListener("keydown", (e) => {
  //   if (e.key === "Escape" && modalContainer.classList.contains("is-visible")) {
  //     hideModal();
  //   }
  // });

  // modalContainer.addEventListener("click", (e) => {
  //   // Since this is also triggered when clicking INSIDE the modal container,
  //   // We only want to close if the user clicks directly on the overlay
  //   let target = e.target;
  //   if (target === modalContainer) {
  //     hideModal();
  //   }
  // });

  return {
    getAll: getAll,
    add: add,
    addListItem: addListItem,
    showDetails: showDetails,
    loadList: loadList,
    loadDetails: loadDetails,
    showLoadingMessage: showLoadingMessage,
    hideLoadingMessage: hideLoadingMessage,
  };
})();

//execute forEach on the PokemonList from IIFE
pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
