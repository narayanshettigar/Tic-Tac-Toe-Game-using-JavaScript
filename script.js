let player1InputField = document.getElementById("player1Input");
let player2InputField = document.getElementById("player2Input");
let startGameButton = document.getElementById("start-button");
let player1Name = "Player 1"; // Default names
let player2Name = "Player 2"; // Default names

var isGameStarted = false;

let cellButtons = document.querySelectorAll(".cell");
let popupElement = document.querySelector(".popup");
let newGameButton = document.getElementById("new-game-button");
let messageElement = document.getElementById("message");

startGameButton.addEventListener("click", () => {
  player1Name = player1InputField.value || "Player 1";
  player2Name = player2InputField.value || "Player 2";
  isGameStarted = true;
});

let winningPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [2, 5, 8],
  [6, 7, 8],
  [3, 4, 5],
  [1, 4, 7],
  [0, 4, 8],
  [2, 4, 6],
];

let xTurn = true;
let moveCount = 0;


const disableCellButtons = () => {
  cellButtons.forEach((element) => (element.disabled = true));
  popupElement.classList.remove("hide");
};

const enableCellButtons = () => {
  cellButtons.forEach((element) => {
    element.innerText = "";
    element.disabled = false;
  });
  popupElement.classList.add("hide");
};

const winMessage = (letter) => {
  disableCellButtons();
  if (letter == "X") {
    messageElement.innerHTML = ` ${player1Name} Wins! 🏆`;
  } else {
    messageElement.innerHTML = ` ${player2Name} Wins! 🏆`;
  }
};

const drawMessage = () => {
  disableCellButtons();
  messageElement.innerHTML = "It's a Draw! 😮‍💨";
};

newGameButton.addEventListener("click", () => {
  isGameStarted = false;
  moveCount = 0;
  enableCellButtons();
});

const checkForWin = () => {
  for (let pattern of winningPatterns) {
    let [element1, element2, element3] = [
      cellButtons[pattern[0]].innerText,
      cellButtons[pattern[1]].innerText,
      cellButtons[pattern[2]].innerText,
    ];

    if (element1 != "" && element2 != "" && element3 != "") {
      if (element1 == element2 && element2 == element3) {
        winMessage(element1);
      }
    }
  }
};

cellButtons.forEach((element) => {
  element.addEventListener("click", () => {
    if (xTurn) {
      xTurn = false;
      if (isGameStarted == true) {
        element.innerText = "X";
        element.disabled = true;
      }
    } else {
      xTurn = true;
      if (isGameStarted == true) {
        element.innerText = "O";
        element.disabled = true;
      }
    }
    if (isGameStarted == true) {
      moveCount += 1;
      if (moveCount == 9) {
        drawMessage();
      }
    }
    checkForWin();
  });
});
window.onload = enableCellButtons;