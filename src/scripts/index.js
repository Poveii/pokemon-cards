/* ======== DECLARATIONS ======== */
const forwardButton = document.querySelector("#forward-button");
const backwardButton = document.querySelector("#backward-button");

const cards = document.querySelectorAll(".card");
let indexCards = 0;

/* ======== FUNCTIONS ======== */
function hideCurrentCard() {
  const selectedCard = document.querySelector(".selected");
  selectedCard.classList.remove("selected");
}

forwardButton.addEventListener("click", function () {
  if (indexCards === cards.length - 1) {
    hideCurrentCard();

    indexCards = 0;
    cards[indexCards].classList.add("selected");
    return;
  } // -1 cause cards.length returns 3 instead 2
  indexCards++;
  cards[indexCards].classList.add("selected");

  hideCurrentCard();
});

backwardButton.addEventListener("click", function () {
  if (indexCards === 0) {
    indexCards = cards.length - 1;
    hideCurrentCard();

    cards[indexCards].classList.add("selected");
    return;
  }
  hideCurrentCard();

  indexCards--;
  cards[indexCards].classList.add("selected");
});
