const container = document.querySelector('.container');
const alertContainer = document.querySelector('.alert');
const formContainer = document.querySelector('.form-container');
const restart = document.querySelector('.restart');
const player1 = document.querySelector('.player1');
const player2 = document.querySelector('.player2');
container.classList.add('invisible');
restart.classList.add('invisible');
alertContainer.classList.add('invisible');
class Player {
  constructor(name, xOro) {
    this.name = name;
    this.xOro = xOro;
    this.moves = [];
  }
}

class GameBoard {
  createBoard = () => {
    for (let i = 1; i < 10; i++) {
      let element = document.createElement('div');
      element.classList.add('board-piece');
      element.classList.add(i.toString());
      container.appendChild(element);
    }
  };
}

class Game {
  constructor() {
    this.player1 = new Player('Test player', 'x');
    this.player2 = new Player('Test player 2', 'o');
    this.currentPlayer = 'player1';
    this.gameBoard = new GameBoard();
    this.gameEnd = false;
  }

  toggleCurrentPlayer() {
    this.currentPlayer === 'player1'
      ? (this.currentPlayer = 'player2')
      : (this.currentPlayer = 'player1');
  }

  getCurrentPlayer() {
    return this.currentPlayer;
  }
  start() {
    this.gameBoard.createBoard();
    this.select();
  }

  select() {
    const element = document.querySelectorAll('.board-piece');
    element.forEach((i) => {
      i.addEventListener('click', (event) => {
        if (event.target.textContent === '') {
          if (this.getCurrentPlayer() === 'player1') {
            this.player1.moves.push(Number(event.target.classList[1]));
            event.target.textContent = this.player1.xOro;
            this.checkWin(this.player1);
            this.toggleCurrentPlayer();
          } else if (this.getCurrentPlayer() === 'player2') {
            this.player2.moves.push(Number(event.target.classList[1]));
            event.target.textContent = this.player2.xOro;
            this.checkWin(this.player2);
            this.toggleCurrentPlayer();
          }
        }
      });
    });
  }

  checkWin(moveArray) {
    const winArrays = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
      [1, 4, 7],
      [1, 5, 8],
      [3, 6, 9],
      [1, 5, 9],
      [3, 5, 7],
    ];
    let i = 0;
    while (i < 8) {
      const winArray = winArrays[i];
      if (this.wins(moveArray.moves, winArray)) {
        this.gameEnd = true;
        alertContainer.classList.remove('invisible');
        document.querySelector('#info').textContent = `${moveArray.name}  Wins`;
        container.innerHTML = '';
      }
      i++;
    }
    if (
      this.player1.moves.length + this.player2.moves.length === 9 &&
      !this.gameEnd
    ) {
      alertContainer.classList.remove('invisible');
      document.querySelector('#info').textContent = `Tie`;
    }
  }

  wins(winArray, moveArray) {
    return moveArray.every((i) => winArray.includes(i));
  }
}

restart.addEventListener('click', () => {
  container.classList.add('invisible');
  restart.classList.add('invisible');
  alertContainer.classList.add('invisible');
  formContainer.classList.remove('invisible');
  player1.value = '';
  player2.value = '';
  startGame();
});

const startGame = () => {
  formContainer.addEventListener('submit', (event) => {
    event.preventDefault();
    formContainer.classList.add('invisible');
    container.classList.remove('invisible');
    restart.classList.remove('invisible');
    container.innerHTML = '';
    const game = new Game();
    game.player1 = new Player(player1.value, 'x');
    game.player2 = new Player(player2.value, 'o');
    game.gameBoard = new GameBoard();
    game.start();
  });
};

startGame();
