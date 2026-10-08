import gif1 from "url:../gifs/animation1.webp";
import gif2 from "url:../gifs/animation2.webp";
import gif3 from "url:../gifs/animation3.webp";
import gif4 from "url:../gifs/animation4.webp";
import gif5 from "url:../gifs/animation5.webp";
import gif6 from "url:../gifs/animation6.webp";
import gif7 from "url:../gifs/animation7.webp";
import gif8 from "url:../gifs/animation8.webp";

const board = document.querySelector("#board");
const startButton = document.querySelector(".start-button");

const gifs = [
  gif1,
  gif2,
  gif3,
  gif4,
  gif5,
  gif6,
  gif7,
  gif8,
  gif1,
  gif2,
  gif3,
  gif4,
  gif5,
  gif6,
  gif7,
  gif8,
];

let firstChoice = null;
let secondChoice = null;
let cardsLeftToMatch = gifs.length / 2;

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}

shuffleArray(gifs);

gifs.forEach((gif) => {
  const card = document.createElement("div");
  card.classList.add("card", "hidden");
  card.dataset.gif = gif;

  const img = document.createElement("img");
  img.src = gif;
  img.alt = "";
  card.appendChild(img);

  card.addEventListener("click", () => {
    //si la carte n'a PAS(!) de classe "hidden" -- on fait rien
    if (!card.classList.contains("hidden")) return;

    if (firstChoice === null) {
      firstChoice = card;
      card.classList.remove("hidden");
    } else if (secondChoice === null) {
      secondChoice = card;
      card.classList.remove("hidden");

      if (firstChoice.dataset.gif === secondChoice.dataset.gif) {
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

startButton.addEventListener("click", () => {
  const cards = document.querySelectorAll(".card");

  cards.forEach((card) => {
    card.classList.remove("hidden");
  });

  setTimeout(() => {
    cards.forEach((card) => {
      card.classList.add("hidden");
    });
  }, 2000);
});
