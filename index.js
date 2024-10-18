const Board = (() => {
  let gameBoard = ['', '', '', '', '', '', '', '', ''];
  const render = () => {
    let boardHTML = '';
    Board.getBoard().forEach((box, index) => {
      boardHTML += `<div class="box" id="${index}">${box}</div>`;
    });
    document.querySelector('#game-board').innerHTML = boardHTML;
    const boxes = document.querySelectorAll('.box');
    boxes.forEach((box) => {
      box.addEventListener('click', Game.handleClick);
    });
  };
  const getBoard = () => {
    return gameBoard;
  };
  const update = (index, value) => {
    Board.getBoard()[index] = value;
    render();
  };
  let winnerText = document.querySelector('#gamestate-text');
  const announceWin = (name) => {
    winnerText.textContent = `${name} has won!`;
  };
  const announceDraw = () => {
    winnerText.textContent = `it's a tie.`;
  };
  const turnDisplay = (name) => {
    winnerText.textContent = `it's ${name}'s turn.`;
  };

  return {
    render,
    getBoard,
    update,
    announceWin,
    announceDraw,
    turnDisplay,
  };
})();

const createPlayer = (name, mark) => {
  return {
    name,
    mark,
  };
};
const Game = (() => {
  let players = [];
  let currentPlayer;
  let gameOver;
  const start = () => {
    players = [
      createPlayer(document.querySelector('#player-1').value, 'X'),
      createPlayer(document.querySelector('#player-2').value, 'O'),
    ];
    currentPlayer = players[0];
    gameOver = false;
    Board.render();
  };
  const checkWin = () => {
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
    for (let i = 0; i < winConditions.length; i++) {
      let [a, b, c] = winConditions[i];
      if (
        Board.getBoard()[a] &&
        Board.getBoard()[a] === Board.getBoard()[b] &&
        Board.getBoard()[a] === Board.getBoard()[c]
      ) {
        return true;
      }
    }
  };
  const checkDraw = (board) => {
    return board.every((box) => box !== '');
  };
  const handleClick = (e) => {
    let index = e.target.id;
    if (Board.getBoard()[index] !== '' || gameOver) return;
    Board.update(index, currentPlayer.mark);
    e.target.textContent = currentPlayer.mark;
    if (checkWin()) {
      Board.announceWin(currentPlayer.name);
      endGame();
    } else if (checkDraw(Board.getBoard())) {
      Board.announceDraw();
      endGame();
    } else {
      currentPlayer = players[currentPlayer === players[0] ? 1 : 0];
      Board.turnDisplay(currentPlayer.name);
    }
  };
  const restart = () => {
    currentPlayer = players[0];
    Board.turnDisplay(currentPlayer.name);
    gameOver = false;
    Board.getBoard().forEach((box, index) => {
      Board.update(index, '');
      Board.render();
    });
  };
  const endGame = () => {
    gameOver = true;
  };
  return {
    start,
    handleClick,
    restart,
  };
})();

const Buttons = () => {
  const resetButton = document.querySelector('#reset-button');
  const startButton = document.querySelector('#start-button');
  return {
    resetButton,
    startButton,
  };
};
Buttons().startButton.addEventListener('click', () => {
  Game.start();
});
Buttons().resetButton.addEventListener('click', () => {
  Game.restart();
});
