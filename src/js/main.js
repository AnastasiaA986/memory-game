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
    }
  });

  board.appendChild(card);
});
