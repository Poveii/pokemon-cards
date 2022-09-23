function randomNumberGenerator(array) {
  return Math.floor(Math.random(1) * array);
}

let randomNumber = randomNumberGenerator(905);
console.log(randomNumber);

backwardButton.addEventListener("click", function () {
  randomNumber--;

  setPokemonCard();
});

forwardButton.addEventListener("click", function () {
  randomNumber++;

  setPokemonCard();
});

function setPokemonCard() {
  const url = `https://pokeapi.co/api/v2/pokemon/${randomNumber}`;

  fetch(url)
    .then((response) => response.json())
    .then((pokemon) => {
      // console.log(pokemon);

      pokemonImage.src = pokemon.sprites.other.home.front_default;

      pokemonName.textContent =
        pokemon.name[0].toUpperCase() + pokemon.name.substring(1);

      pokemonHealth.textContent = pokemon.stats[0].base_stat;

      pokemonType.textContent =
        pokemon.types[0].type.name[0].toUpperCase() +
        pokemon.types[0].type.name.substring(1);

      pokemonAbility.textContent =
        pokemon.abilities[0].ability.name[0].toUpperCase() +
        pokemon.abilities[0].ability.name.substring(1);

      fetch(pokemon.abilities[0].ability.url)
        .then((response) => response.json())
        .then((ability) => {
          // console.log(ability);

          ability.effect_entries.forEach((item) => {
            if (item.language.name != "en") return;

            abilityText.textContent = item.effect;
          });
        });

      pokemonMove.textContent =
        pokemon.moves[0].move.name[0].toUpperCase() +
        pokemon.moves[0].move.name.substring(1);

      fetch(pokemon.moves[0].move.url)
        .then((response) => response.json())
        .then((move) => {
          // console.log(move);

          move.effect_entries.forEach((item) => {
            if (item.language.name != "en") return;

            moveText.textContent = item.effect;
          });
        });

      pokemonImage.classList.add("opacity");
    });
}

setPokemonCard();

/*
const text = "Inflicts regular damage.";

function changeEveryLetter(text) {
  const letters = text.split("");

  // console.log(letters);

  const newArray = [];

  letters.forEach((letter) => {
    if (letter == " ") return newArray.push(" ");

    newArray.push("?");
  });

  // console.log(newArray);

  const newText = newArray.join("");

  console.log(newText);
}

changeEveryLetter(text);
*/
