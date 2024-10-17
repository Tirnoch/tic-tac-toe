const boardState = Array(9).fill('');
const winConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
const resetButton = document.querySelector('#reset-button');
const gameStateText = document.querySelector('#gamestate-text');
const pOneButton = document.getElementById('player-1-button');
const pTwoButton = document.getElementById('player-2-button');
const boxes = document.querySelectorAll('.box');
boxes.forEach((box) =>
  box.addEventListener('click', (e) => {
    const index = e.target.id;
    if (boardState[index] === '') {
      boardState[index] = currentPlayer.text;
      e.target.innerText = currentPlayer.text;
      currentPlayer = currentPlayer === playerOne ? playerTwo : playerOne;
      checkWin();
    }
  })
);

resetButton.addEventListener('click', resetBoard);
function resetBoard() {
  boardState.fill('');
  boxes.forEach((box) => (box.innerText = ''));
  pOneButton.disabled = false;
  pTwoButton.disabled = false;
}

function Player(name, text) {
  this.name = name;
  this.text = text;
}
let playerOne = new Player('', 'X');
let playerTwo = new Player('', 'O');
let currentPlayer = playerOne;
function getName(e) {
  if (e.target.id === 'player-1-button') {
    playerOne.name = document.getElementById('player-1').value;
    pOneButton.disabled = playerOne.name === '' ? false : true;
    gameStateText.innerText = `Player 1 is set to be ${playerOne.name}`;
  } else if (e.target.id === 'player-2-button') {
    playerTwo.name = document.getElementById('player-2').value;
    pTwoButton.disabled = playerTwo.name === '' ? false : true;
    gameStateText.innerText = `Player 2 is set to be ${playerTwo.name}`;
  }
}
pOneButton.addEventListener('click', getName);
pTwoButton.addEventListener('click', getName);

function checkWin() {
  for (let i = 0; i < winConditions.length; i++) {
    const [a, b, c] = winConditions[i];
    if (
      boardState[a] !== '' &&
      boardState[a] === boardState[b] &&
      boardState[a] === boardState[c]
    ) {
      gameStateText.innerText = `${currentPlayer.name} has won!`;
      resetBoard();
    }
  }
}
