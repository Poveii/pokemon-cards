function randomNumberGenerator(array) {
  return Math.floor(Math.random() * array);
}

let randomNumber = randomNumberGenerator(905);
console.log(randomNumber);

backwardButton.addEventListener("click", () => {
  randomNumber--;

  setPokemonCard();
});

forwardButton.addEventListener("click", () => {
  randomNumber++;

  setPokemonCard();
});

function neverReturnZero(number) {
  if (number == 0) number++;
  return number;
}

function setPokemonCard() {
  let randomNumberToBackground = randomNumberGenerator(5);

  randomNumber = neverReturnZero(randomNumber);

  const url = `https://pokeapi.co/api/v2/pokemon/${randomNumber}`;

  fetch(url)
    .then((response) => response.json())
    .then((pokemon) => {
      console.log(pokemon);

      randomNumberToBackground = neverReturnZero(randomNumberToBackground);

      pokemonBackground.className = `card background-${randomNumberToBackground}`;

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
