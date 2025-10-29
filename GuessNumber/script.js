"use strict";

let secretNumber = Math.trunc(Math.random() * 20) + 1;
let score = 20;
let highScore = 0;
let numbersUsed = [];
const inputNumber = document.querySelector(".guess");

const displayMessage = function (message) {
  document.querySelector(".message").textContent = message;
};

const displayNumber = function (number) {
  document.querySelector(".number").textContent = number;
};

const displayScore = function (score) {
  document.querySelector(".score").textContent = score;
};

const displayHighScore = function (highScore) {
  document.querySelector(".highscore").textContent = highScore;
};

const displayNumbersUsed = function (numberused) {
  document.querySelector(".numberused").textContent = numbersUsed;
};

const updateNumbersUsed = function (guess) {
  numbersUsed.push(guess);
  displayNumbersUsed();
};

const checkNumber = document.querySelector(".check").addEventListener("click", function () {
  const guess = Number(document.querySelector(".guess").value);
  console.log(guess, typeof guess);

  // Validação mínima/máxima
  if (!guess || guess < 1 || guess > 20) {
    displayMessage("⚠️ Number must be between 1 and 20!");
    return; // interrompe o restante do código
  }

  // When there is no input
  if (!guess) {
    displayMessage("⛔️ No number inserted!");

    // When player wins
  } else if (guess === secretNumber) {
    displayNumber(secretNumber);
    displayMessage("🎉 Correct Number!");

    inputNumber.disabled = true;

    document.querySelector("body").style.backgroundColor = "#60b347";
    document.querySelector(".number").style.width = "30rem";

    if (score > highScore) {
      highScore = score;
      displayHighScore(highScore);
    }

    // When guess is wrong
  } else if (guess !== secretNumber) {
    if (score > 1) {
      inputNumber.disabled = false;
      displayMessage(guess > secretNumber ? "📈 Too high!" : "📈 Too low!");
      score--;
      displayScore(score);
      updateNumbersUsed(guess);

      // Game lost
    } else {
      displayMessage("💥 You lost the game!");
      displayScore(0);
    }
  }
});

// reset button
document.querySelector(".again").addEventListener("click", function () {
  inputNumber.disabled = false;
  score = 20;
  secretNumber = Math.trunc(Math.random() * 20) + 1;
  numbersUsed = [];
  displayNumbersUsed(numbersUsed);
  displayScore(score);
  displayHighScore(highScore);
  displayMessage("Start guessing...");
  displayNumber("?");
  document.querySelector(".guess").value = "";
  document.querySelector("body").style.backgroundColor = "#222";
  document.querySelector(".number").style.width = "15rem";
});
