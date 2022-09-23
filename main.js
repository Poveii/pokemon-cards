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

const pokemonTypesList = [
  { name: "Normal", color: "#000000" },
  { name: "Fighting", color: "#414338" },
  { name: "Flying", color: "#B7E0E1" },
  { name: "Poison", color: "#3EA923" },
  { name: "Ground", color: "#7B6251" },
  { name: "Rock", color: "#868683" },
  { name: "Bug", color: "#09CE3A" },
  { name: "Ghost", color: "#8D809D" },
  { name: "Steel", color: "#564E4D" },
  { name: "Fire", color: "#F42815" },
  { name: "Water", color: "#8AE5BC" },
  { name: "Grass", color: "#A6CC3E" },
  { name: "Electric", color: "#FFDA1F" },
  { name: "Psychic", color: "#AB73A6" },
  { name: "Ice", color: "#F7F3F5", textColor: "#000000" },
  { name: "Dragon", color: "#E00F00" },
  { name: "Dark", color: "#0D2430" },
  { name: "Fairy", color: "#5FBF62" },
  { name: "Unknown", color: "#887880" },
  { name: "Shadow", color: "#281525" },
];

function setPokemonCard() {
  let randomNumberToBackground = randomNumberGenerator(5);

  randomNumber = neverReturnZero(randomNumber);

  const url = `https://pokeapi.co/api/v2/pokemon/${randomNumber}`;

  fetch(url)
    .then((response) => response.json())
    .then((pokemon) => {
      // console.log(pokemon);

      randomNumberToBackground = neverReturnZero(randomNumberToBackground);

      pokemonBackground.className = `card background-${randomNumberToBackground}`;

      pokemonImage.src = pokemon.sprites.other.home.front_default;

      pokemonName.textContent =
        pokemon.name[0].toUpperCase() + pokemon.name.substring(1);

      pokemonHealth.textContent = pokemon.stats[0].base_stat;

      pokemonType.textContent =
        pokemon.types[0].type.name[0].toUpperCase() +
        pokemon.types[0].type.name.substring(1);

      pokemonTypesList.forEach((type) => {
        if (type.name != pokemonType.textContent) return;

        typeColor.style.backgroundColor = type.color;

        if (type.textColor == "#000000")
          pokemonType.style.color = type.textColor;
        return;
      });

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
