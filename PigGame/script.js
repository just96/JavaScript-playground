'use strict';

// Selector # for ID
// Selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
// São as duas iguais, getElementById é mais rápido
const score1El = document.getElementById('score--1');
const currentScore0El = document.getElementById('current--0');
const currentScore1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnRoll = document.querySelector('.btn--roll');
const btnNew = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');

// Starting conditions
// Scores of each player
// player 0 -> player 1 ; player 1 -> player 2
// Boolean to check if we're still playing or not
let scores, currentScore, activePlayer, playing;

// Function to initialize the game
const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;
  // Reset all values
  currentScore0El.textContent = 0;
  currentScore1El.textContent = 0;
  score0El.textContent = 0;
  score1El.textContent = 0;

  // add/remove classes
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  diceEl.classList.add('hidden');
};

init();

const changeImage = function (dice) {
  diceEl.src = `dice-${dice}.png`;
};

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  // activePlayer if it's = 0 return true(1), change activePlayer to 1; if it's !== 0 return false(0), change activePlayer to 0
  activePlayer = activePlayer === 0 ? 1 : 0;
  // toggle removes or adds class depending if there's already or not
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};
// Rolling dice
btnRoll.addEventListener('click', function () {
  if (playing) {
    // Random number
    const dice = Math.trunc(Math.random() * 6) + 1;
    // Remove from being hidden
    diceEl.classList.remove('hidden');
    console.log(dice);
    // Change image
    changeImage(dice);

    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // Switch to next player
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  // Add current score to score
  if (playing) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    // Check if score >= 100
    // finish game
    if (scores[activePlayer] >= 100) {
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } // Switch Player if not finished
    else {
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', init);
