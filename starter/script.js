// Activitating Strict Mode

"use strict";

const score0El = document.querySelector("#score--0");
const score1EL = document.getElementById("score--1");
const diceEL = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
const currentScore0 = document.getElementById("current--0");
const currentScore1 = document.getElementById("current--1");
const player0EL = document.querySelector(".player--0");
const player1EL = document.querySelector(".player--1");

let scores, currentScore, activePlayer, playing;

// Starting Conditions
const initialStage = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1EL.textContent = 0;
  currentScore0.textContent = 0;
  currentScore1.textContent = 0;

  diceEL.classList.add("hidden");
  player0EL.classList.remove("player--winner");
  player1EL.classList.remove("player--winner");
  player0EL.classList.add("player--active");
  player1EL.classList.remove("player--active");
};
initialStage();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0EL.classList.toggle("player--active");
  player1EL.classList.toggle("player--active");
};

// Rolling Dice Functionality

btnRoll.addEventListener("click", function () {
  if (playing) {
    // 1. Generating Random Dice Roll

    const dice = Math.trunc(Math.random() * 6) + 1;
    console.log(dice);

    //   2. Display Dice

    diceEL.classList.remove("hidden");
    diceEL.src = `dice-${dice}.png`;

    //   3. Check For Rolled 1

    if (dice !== 1) {
      // Add Dice To Current Score

      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // Switch To Next Player
      switchPlayer();
    }
  }
});

btnHold.addEventListener("click", function () {
  if (playing) {
    // Add Current Score To Active Player's Score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // Check If Player's Score is >= 100
    if (scores[activePlayer] >= 100) {
      // Finish The Game
      playing = false;

      diceEL.classList.add("hidden");

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player${activePlayer}`)
        .classList.remove("player--active");
    } else {
      //   Switch To The Next Player

      switchPlayer();
    }
  }
});

btnNew.addEventListener("click", initialStage);
