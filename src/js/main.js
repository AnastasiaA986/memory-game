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

//écran de jeu
const gameInfo = document.querySelector(".game-info");
const startScreen = document.querySelector(".start-screen");
const gameScreen = document.querySelector(".game-screen");
const levelChip = document.querySelector(".level-chip");
const timer = document.querySelector(".timer");

// pour compter les paires et les coups
const pairsValue = document.querySelector(".pairs-value");
const movesValue = document.querySelector(".moves-value");
const timerValue = document.querySelector(".timer-value");

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

let totalPairs = 6; // nombre de paires du niveau (6 ou 8)
let pairsFound = 0; // paires trouvées
let moves = 0; // coups joués

// timer
let seconds = 0; // secondes écoulées
let timerInterval = null; // le chrono qui tourne

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}

shuffleArray(gifs);

// on affiche les chiffres à jour dans les cartes "Paires" et "Coups"
function updateStats() {
  pairsValue.textContent = pairsFound + "/" + totalPairs;
  movesValue.textContent = moves;
}

// on affiche le temps au format 00:00
function updateTimer() {
  const minutes = Math.floor(seconds / 60);
  const restSeconds = seconds % 60;

  timerValue.textContent =
    String(minutes).padStart(2, "0") +
    ":" +
    String(restSeconds).padStart(2, "0");
}

// on lance le chrono : +1 seconde chaque seconde
function startTimer() {
  timerInterval = setInterval(() => {
    seconds = seconds + 1;
    updateTimer();
  }, 1000);
}

// on arrête le chrono
function stopTimer() {
  clearInterval(timerInterval);
}

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

      // deux cartes retournées = un coup
      moves = moves + 1;
      updateStats();

      if (firstChoice.dataset.gif === secondChoice.dataset.gif) {
        firstChoice = null;
        secondChoice = null;
        //quand on a trouvé une paire, il en reste une de moins
        cardsLeftToMatch = cardsLeftToMatch - 1;

        // une paire de plus
        pairsFound = pairsFound + 1;
        updateStats();

        if (cardsLeftToMatch === 0) {
          stopTimer(); // partie gagnée : on arrête le chrono
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

  // ----- on change d'écran -----
  startScreen.hidden = true; // on cache le choix du niveau
  gameScreen.hidden = false; // on montre l'écran de jeu
  gameInfo.classList.add("in-game"); // titre plus petit

  // ----- chip + chrono selon le niveau -----
  if (level === "facile") {
    levelChip.textContent = "Facile · 12 cartes";
    timer.hidden = true; // pas de chrono en facile
  } else {
    levelChip.textContent = "Difficile · 16 cartes";
    timer.hidden = false; // chrono en difficile
  }

  // ----- on remet les compteurs à zéro -----
  pairsFound = 0;
  moves = 0;
  updateStats();

  seconds = 0;
  updateTimer(); // affiche 00:00

  cards.forEach((card) => {
    card.classList.remove("hidden");
  });

  setTimeout(() => {
    cards.forEach((card) => {
      card.classList.add("hidden");
    });
    // les cartes sont cachées : en difficile, le chrono démarre
    if (level === "difficile") {
      startTimer();
    }
  }, 2000);
});

// ---------- choix du niveau ----------

levelButtons.forEach((button) => {
  button.addEventListener("click", () => {
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
      totalPairs = 6;

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
      totalPairs = 8;

      // on montre toutes les cartes
      cards.forEach((card) => {
        card.style.display = "";
      });
    }
  });
});
