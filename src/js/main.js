const board = document.querySelector("#board");

const emojis = [
  "👄",
  "🧚‍♀️",
  "🍋",
  "🐢",
  "🤍",
  "♠️",
  "🐤",
  "🙊",
  "🌽",
  "🌵",
  "🥥",
  "🐝",
  "👄",
  "🧚‍♀️",
  "🍋",
  "🐢",
  "🤍",
  "♠️",
  "🐤",
  "🙊",
  "🌽",
  "🌵",
  "🥥",
  "🐝",
];

let firstChoice = null;
let secondChoice = null;
let cardsLeftToMatch = emojis.length / 2; //quantite des paires pour gagner
let boardLocked = true; //bloque le tableau avant le debut du jeu

const startButton = document.createElement("button");
startButton.textContent = "Start";

function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}

shuffleArray(emojis);

emojis.forEach((emoji) => {
  const card = document.createElement("div");
  card.classList.add("card", "hidden");
  card.dataset.emoji = emoji;

  card.addEventListener("click", () => {
    if (firstChoice === null) {
      firstChoice = card;
      card.classList.remove("hidden");
    } else if (secondChoice === null) {
      secondChoice = card;
      card.classList.remove("hidden");

      if (firstChoice.dataset.emoji === secondChoice.dataset.emoji) {
        firstChoice = null;
        secondChoice = null;
        //quand on a trouvé une paire, il en reste une de moins
        cardsLeftToMatch = cardsLeftToMatch - 1;
        if (cardsLeftToMatch === 0) {
          setTimeout(() => {
            window.alert("Bravo! Vous avez gagné!");
          }, 800);
        }
      } else {
        setTimeout(() => {
          firstChoice.classList.add("hidden");
          secondChoice.classList.add("hidden");
          firstChoice = null;
          secondChoice = null;
        }, 1000);
      }
    }
  });

  board.appendChild(card);
});
