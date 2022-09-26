function moveButtonsToCenter() {
  if (window.outerWidth <= 425) {
    const forwardClone = forwardButton.cloneNode(true);
    const backwardClone = backwardButton.cloneNode(true);

    const buttonsDiv = document.querySelector(".buttons");

    buttonsDiv.insertBefore(backwardClone, refreshButton);
    buttonsDiv.appendChild(forwardClone);

    document.querySelector("#forwardButton").remove();
    document.querySelector("#backwardButton").remove();
  }
}

moveButtonsToCenter();

const limit = 905;

function randomNumberGenerator(array) {
  return Math.floor(Math.random() * array);
}

let randomNumber = randomNumberGenerator(limit);
// console.log(randomNumber);

function neverReturnZero(number) {
  if (number == 0) number++;
  return number;
}

const pokemonTypesList = [
  { name: "Normal", color: "#000000", textColor: "#FFFFFF" },
  { name: "Fighting", color: "#414338", textColor: "#FFFFFF" },
  { name: "Flying", color: "#B7E0E1", textColor: "#FFFFFF" },
  { name: "Poison", color: "#3EA923", textColor: "#FFFFFF" },
  { name: "Ground", color: "#7B6251", textColor: "#FFFFFF" },
  { name: "Rock", color: "#868683", textColor: "#FFFFFF" },
  { name: "Bug", color: "#09CE3A", textColor: "#FFFFFF" },
  { name: "Ghost", color: "#8D809D", textColor: "#FFFFFF" },
  { name: "Steel", color: "#564E4D", textColor: "#FFFFFF" },
  { name: "Fire", color: "#F42815", textColor: "#FFFFFF" },
  { name: "Water", color: "#79E2B3", textColor: "#FFFFFF" },
  { name: "Grass", color: "#A6CC3E", textColor: "#FFFFFF" },
  { name: "Electric", color: "#EECB1B", textColor: "#FFFFFF" },
  { name: "Psychic", color: "#AB73A6", textColor: "#FFFFFF" },
  { name: "Ice", color: "#F7F3F5", textColor: "#000000" },
  { name: "Dragon", color: "#E00F00", textColor: "#FFFFFF" },
  { name: "Dark", color: "#0D2430", textColor: "#FFFFFF" },
  { name: "Fairy", color: "#5FBF62", textColor: "#FFFFFF" },
  { name: "Unknown", color: "#887880", textColor: "#FFFFFF" },
  { name: "Shadow", color: "#281525", textColor: "#FFFFFF" },
];

fetch(`https://pokeapi.co/api/v2/pokemon/?limit=${limit}`)
  .then((response) => response.json())
  .then((data) => {
    // console.log(data.results);

    backwardButton.addEventListener("click", () => {
      const lastPokemonIdentity = pokemonIdentity.textContent;

      if (lastPokemonIdentity <= 1) {
        randomNumber = limit - 1;
        setPokemonCard(data.results[randomNumber].url);
        return;
      }
      randomNumber--;

      setPokemonCard(data.results[randomNumber].url);
    });

    forwardButton.addEventListener("click", () => {
      const lastPokemonIdentity = pokemonIdentity.textContent;

      if (lastPokemonIdentity >= limit) {
        randomNumber = 0;
        setPokemonCard(data.results[randomNumber].url);
        return;
      }
      randomNumber++;

      setPokemonCard(data.results[randomNumber].url);
    });

    refreshButton.addEventListener("click", () => {
      const lastPokemonIdentity = pokemonIdentity.textContent;

      randomNumber = randomNumberGenerator(limit);

      const newPokemonIdentity = data.results.filter(
        (p) => p.url.substring(34).replace("/", "") != lastPokemonIdentity
      )[randomNumber];

      setPokemonCard(newPokemonIdentity.url);
    });

    function setPokemonCard(url) {
      let randomNumberToBackground = randomNumberGenerator(5);

      fetch(url)
        .then((response) => response.json())
        .then((pokemon) => {
          // console.log(pokemon);

          pokemonImage.classList.remove("opacity");
          pokemonImage.classList.remove("animation");

          randomNumberToBackground = neverReturnZero(randomNumberToBackground);

          pokemonBackground.className = `card background-${randomNumberToBackground}`;

          pokemonImage.src = pokemon.sprites.other.home.front_default;

          if (pokemonImage.src == document.URL + null) {
            pokemonImage.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`;
            console.log("aaaaaaaa");
          }

          pokemonName.textContent =
            pokemon.name[0].toUpperCase() + pokemon.name.substring(1);

          pokemonHealth.textContent = pokemon.stats[0].base_stat;

          pokemonIdentity.textContent = pokemon.id;

          pokemonType.textContent =
            pokemon.types[0].type.name[0].toUpperCase() +
            pokemon.types[0].type.name.substring(1);

          pokemonTypesList.forEach((type) => {
            if (type.name != pokemonType.textContent) return;

            typeColor.style.backgroundColor = type.color;

            pokemonType.style.color = type.textColor;
            return;
          });

          try {
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
          } catch (err) {
            pokemonAbility.textContent = "??????";
            abilityText.textContent =
              "???????? ? ???? ????? ??????? ???? ???? ???????? ??? ?????? ???? ??? ? ??? ?????? ?? ????? ?????????? ??????? ???? ??? ?????? ?? ????????????? ????? ??? ????? ?? ????????? ?? ???? ???????? ?????????? ?? ??? ???? ??????? ??? ???? ???????? ????? ?? ? ??? ?????? ???? ?????????? ???? ?? ???? ?? ???????? ???????? ?? ???????????";
          }

          try {
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
          } catch (err) {
            pokemonMove.textContent = "??????????";
            moveText.textContent = "???????? ??????? ???????";
          }

          setTimeout(() => {
            pokemonImage.classList.add("opacity");
            pokemonImage.classList.add("animation");
          }, 400);
        });
    }

    setPokemonCard(data.results[randomNumber].url);
  });
