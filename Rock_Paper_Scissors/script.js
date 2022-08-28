const scores = { playerScore: 0, computerScore: 0 };

function getComputerChoice() {
  const choices = ["Rock", "Paper", "Scissors"];
  const randomNum = Math.floor(Math.random() * 3);

  return choices[randomNum];
}

function getResult(playerChoice, computerChoice) {
  let score;
  if (playerChoice == computerChoice) score = 0;
  else if (playerChoice == "Rock" && computerChoice == "Scissors") score = 1;
  else if (playerChoice == "Paper" && computerChoice == "Rock") score = 1;
  else if (playerChoice == "Scissors" && computerChoice == "Paper") score = 1;
  else if (playerChoice == "Scissors" && computerChoice == "Rock") score = -1;
  else if (playerChoice == "Rock" && computerChoice == "Paper") score = -1;
  else if (playerChoice == "Paper" && computerChoice == "Scissors") score = -1;

  return score;
}

function showResult(score, playerChoice, computerChoice) {
  const playerScoreDiv = document.getElementById("player-score");
  const handsDiv = document.getElementById("hands");
  const resultDiv = document.getElementById("result");

  handsDiv.innerText = `😉 ${playerChoice} vs 🤖 ${computerChoice}`;

  if (score == 1) {
    scores.playerScore++;
    resultDiv.innerText = "You Win! 🎉";
  }
  if (score == 0) {
    resultDiv.innerText = "It's a Draw 📍";
  }
  if (score == -1) {
    scores.computerScore++;
    resultDiv.innerText = "You Lose 😢";
  }

  playerScoreDiv.innerText = `Player: ${scores.playerScore}\nComputer: ${scores.computerScore}`;
}

function onClickRPS(playerChoice) {
  const computerChoice = getComputerChoice();
  const score = getResult(playerChoice, computerChoice);

  showResult(score, playerChoice, computerChoice);
}

function playGame() {
  const rpsButtons = document.querySelectorAll(".rpsButton");

  rpsButtons.forEach((button) =>
    button.addEventListener("click", () => {
      onClickRPS(button.value);
    })
  );

  const endGameButton = document.getElementById("endGameButton");
  endGameButton.addEventListener("click", endGame);
}

function endGame() {
  scores.playerScore = 0;
  scores.computerScore = 0;

  const playerScoreDiv = document.getElementById("player-score");
  const handsDiv = document.getElementById("hands");
  const resultDiv = document.getElementById("result");

  playerScoreDiv.innerText = "";
  handsDiv.innerText = "";
  resultDiv.innerText = "";
}

playGame();
