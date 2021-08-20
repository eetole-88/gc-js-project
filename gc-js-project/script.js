let startButton = document
  .getElementById("startButton")
  .addEventListener("click", () => {
    reset();
  });
let resetButton = document
  .getElementById("resetButton")
  .addEventListener("click", () => {
    reset();
  });
let encoreButton = document
  .querySelector(".button")
  .addEventListener("click", () => {
    removeReset();
  });
let playAgainButton = document
  .querySelector(".fail button")
  .addEventListener("click", () => {
    removeReset();
  });
let myTimer;
let newDeck = Array.from(document.querySelectorAll(".card"));
let cardDeck = document.querySelector(".cardDeck");
let timer = document.querySelector(".timer");
let seconds;
let flippedCards = [];




let modal = document.querySelector(".win modal");



let matchCounter = 0;
let winModal = document.querySelector(".win");
let failModal = document.querySelector(".fail");
let timeElapsed;
let clockTime = document.querySelector(".clockTime");
let removeModal = document.querySelectorAll(".modal");

//player must hit start button to begin play
window.onload = disable();


//shuffle deck and re-position cards
const shuffle = (array) => {
  let currentIndex = array.length,
    temporaryValue,
    randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
};

//shuffles deck and adds card elements to page
const shuffleDeck = () => {
  shuffle(newDeck);
  cardDeck.innerHTML = "";
  for (let item of newDeck) {
    cardDeck.append(item);
  }
};

// manipulate html text
const startTimer = () => {
  clearInterval(myTimer);
  seconds = 46;
  myTimer = setInterval(() => {
    if (seconds === 0) {
      fail();
      clearInterval(myTimer);
    } else {
      seconds--;
      timer.innerText = `Countown: ${seconds} seconds`;
    }
  }, 1000);
  console.log(startTimer);
};

function flipCard(event) {
  if (!event.target.classList.contains("cardFront")) {
    return;
    //exit the function. Don't run
  }
  const card = event.target.parentElement;
  console.log(card);
  card.classList.add("cardFlipped");
  flippedCards.push(card);
  let length = flippedCards.length;
  if (length === 2) {
    disable();
    if (flippedCards[0].dataset.pair === flippedCards[1].dataset.pair) {
      matched();
    } else {
      unmatched();
    }
  }
}

const reset = () => {
  shuffleDeck();
  for (let item of newDeck) {
    if (
      item.classList.contains("match") ||
      item.classList.contains("cardFlipped")
    ) {
      item.classList.remove("match", "cardFlipped");
    }
  }
  flippedCards = [];
  startTimer();
  enable();
};

function disable() {
  cardDeck.removeEventListener("click", flipCard);
}

const enable = () => {
  cardDeck.addEventListener("click", flipCard);
};

function matched() {
  setTimeout(function () {
    flippedCards[0].classList.add("match");
    flippedCards[1].classList.add("match");
    flippedCards[0].classList.remove("cardFlipped");
    flippedCards[1].classList.remove("cardFlipped");
    enable();
    flippedCards = [];
  }, 1000);
  if (matchCounter !== 6) {
    matchCounter++;
    if (matchCounter === 6) {
      win();
    }
  }
}
function unmatched() {
  disable();
  setTimeout(function () {
    console.log(flippedCards);
    flippedCards[0].classList.remove("cardFlipped");
    flippedCards[1].classList.remove("cardFlipped");
    enable();
    flippedCards = [];
  }, 1000);
}

function win() {
  setTimeout(function () {
    winModal.style.cssText = "visibility: visible";
    winModal.style.opacity = 1;
  }, 1000);
  timeElapsed = 45 - seconds;
  clockTime.innerText = `${timeElapsed} seconds!`;
  clearInterval(myTimer);
}

function fail() {
  setTimeout(function () {
    failModal.style.cssText = "visibility: visible";
    failModal.style.opacity = 1;
  }, 1000);
  clearInterval(myTimer);
  disable();
}

//remove modal and reset game
const removeReset = () => {
  for (let item of removeModal) {
    item.style.cssText = "visibility: none";
    item.style.opacity = 0;
  }
  reset();
};
