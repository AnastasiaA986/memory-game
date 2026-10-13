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
const levelButtons = document.querySelectorAll(".level-button");
const levelHint = document.querySelector(".level-hint");

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

// les GIFs qu'on n'utilise PAS en niveau facile
const extraGifs = [gif7, gif8];

let level = null;
let firstChoice = null;
let secondChoice = null;
let cardsLeftToMatch = 6; // au départ : niveau facile = 6 paires

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

  // est-ce que cette carte est en trop pour le niveau facile ?
  const isExtra = extraGifs.includes(gif);

  // au départ on est en niveau facile : on cache les cartes en trop
  if (isExtra) {
    card.style.display = "none";
  }

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

// ---------- choix du niveau ----------

levelButtons.forEach((button) => {
  button.addEventListener("click", () => {
    level = button.dataset.level;

    // on enlève "selected" de tous les boutons
    levelButtons.forEach((otherButton) => {
      otherButton.classList.remove("selected");
    });
    // on l'ajoute seulement au bouton cliqué
    button.classList.add("selected");

    // on lit l'étiquette data-level du bouton
    level = button.dataset.level;
    // un niveau est choisi : on active le bouton Commencer
    startButton.disabled = false;

    // toutes les cartes du plateau
    const cards = document.querySelectorAll(".card");

    if (level === "facile") {
      // ----- niveau facile : 12 cartes -----
      levelHint.textContent = "12 cartes · 6 paires";
      cardsLeftToMatch = 6;

      // on cache les cartes en trop (gif7 et gif8)
      cards.forEach((card) => {
        const isExtra = extraGifs.includes(card.dataset.gif);

        if (isExtra) {
          card.style.display = "none";
        }
      });
    } else {
      // ----- niveau difficile : 16 cartes -----
      levelHint.textContent = "16 cartes · 8 paires";
      cardsLeftToMatch = 8;

      // on montre toutes les cartes
      cards.forEach((card) => {
        card.style.display = "";
      });
    }
  });
});
