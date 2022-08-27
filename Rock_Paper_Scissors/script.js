function getComputerChoice() {
  const randomNum = Math.floor(Math.random() * 3);

  if (randomNum == 0) {
    return "Rock";
  } else if (randomNum == 1) {
    return "Paper";
  } else if (randomNum == 2) {
    return "Scissors";
  }
}

function getResult(playerChoice, computerChoice) {
  if (playerChoice == computerChoice) return 0;
  else if (playerChoice == "Rock" && computerChoice == "Scissors") return 1;
  else if (playerChoice == "Paper" && computerChoice == "Rock") return 1;
  else if (playerChoice == "Scissors" && computerChoice == "Paper") return 1;
  else if (playerChoice == "Scissors" && computerChoice == "Rock") return -1;
  else if (playerChoice == "Rock" && computerChoice == "Paper") return -1;
  else if (playerChoice == "Paper" && computerChoice == "Scissors") return -1;
}

function showResult(score, playerChoice, computerChoice) {
  const resultDiv = document.getElementById("result");

  if (score == 1)
    resultDiv.innerText = `Player: ${playerChoice}\nComputer: ${computerChoice}\nYou Win!`;
  if (score == 0)
    resultDiv.innerText = `Player: ${playerChoice}\nComputer: ${computerChoice}\nIt's a Draw`;
  if (score == -1)
    resultDiv.innerText = `Player: ${playerChoice}\nComputer: ${computerChoice}\nYou Lose :*(`;
}

function onClickRPS(playerChoice) {
  let computerChoice = getComputerChoice();
  let score = getResult(playerChoice, computerChoice);

  showResult(score, playerChoice, computerChoice);
}

function playGame() {
  const rpsButtons = document.querySelectorAll(".rpsButton");
  console.log(rpsButtons);

  rpsButtons.forEach((button) =>
    button.addEventListener("click", () => {
      onClickRPS(button.value);
    })
  );

  const endGameButton = document.getElementById("endGameButton");
  endGameButton.addEventListener("click", endGame);
}

function endGame() {
  const resultDiv = document.getElementById("result");
  resultDiv.innerText = "";
}

playGame();
