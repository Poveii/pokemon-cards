/* ======== DECLARATIONS ======== */
const forwardButton = document.querySelector("#forward-button");
const backwardButton = document.querySelector("#backward-button");

const cards = document.querySelectorAll(".card");
let indexCards = 0;

/* ======== FUNCTIONS ======== */
function hideCardSelected() {
  const selectedCard = document.querySelector(".selected");
  selectedCard.classList.remove("selected");
}

forwardButton.addEventListener("click", function () {
  if (indexCards === cards.length - 1) return; // -1 because cards.length returns 3 instead 2 (Counting by 1)
  indexCards++;
  cards[indexCards].classList.add("selected");

  hideCardSelected();
});

backwardButton.addEventListener("click", function () {
  if (indexCards === 0) return;
  hideCardSelected();

  indexCards--;
  cards[indexCards].classList.add("selected");
});
