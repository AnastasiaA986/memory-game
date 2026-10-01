import gif1 from "url:../gifs/animation1.gif";
import gif2 from "url:../gifs/animation2.gif";
import gif3 from "url:../gifs/animation3.gif";
import gif4 from "url:../gifs/animation4.gif";
import gif5 from "url:../gifs/animation5.gif";
import gif6 from "url:../gifs/animation6.gif";
import gif7 from "url:../gifs/animation7.gif";
import gif8 from "url:../gifs/animation8.gif";

const board = document.querySelector("#board");

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
let boardLocked = true;

function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}

shuffleArray(gifs);

gifs.forEach((gif) => {
  const card = document.createElement("div");
  card.classList.add("card", "hidden");
  card.dataset.gif = gif;

  const startButton = document.querySelector(".start-button");
  startButton.addEventListener("click", () => {
    gifs.forEach((gif) => {
      card.classList.remove("hidden");
    });
    setTimeout(() => {
      gifs.forEach((gif) => {
        card.classList.add("hidden");
      });
    }, 2000);
  });

  const img = document.createElement("img");
  img.src = gif;
  img.alt = "";
  card.appendChild(img);

  card.addEventListener("click", () => {
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
