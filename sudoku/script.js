class SudokuGame {
    constructor() {
        this.board = Array.from({length: 9}, () => Array(9).fill(0));
        this.solution = Array.from({length: 9}, () => Array(9).fill(0));
        this.selectedCell = null;
        this.startTime = null;
        this.timerInterval = null;
    }

    generatePuzzle() {
        // Basic Sudoku generation
        this.board = this.createSolvedBoard();
        this.solution = JSON.parse(JSON.stringify(this.board));
        this.removeCells(40); // Remove 40 cells
    }

    createSolvedBoard() {
        const board = Array.from({length: 9}, () => Array(9).fill(0));
        this.solve(board);
        return board;
    }

    solve(board) {
        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                if (board[row][col] === 0) {
                    for (let num = 1; num <= 9; num++) {
                        if (this.isValid(board, row, col, num)) {
                            board[row][col] = num;
                            if (this.solve(board)) return true;
                            board[row][col] = 0;
                        }
                    }
                    return false;
                }
            }
        }
        return true;
    }

    isValid(board, row, col, num) {
        // Check row and column
        for (let i = 0; i < 9; i++) {
            if (board[row][i] === num || board[i][col] === num) return false;
        }
        
        // Check 3x3 box
        const boxRow = Math.floor(row / 3) * 3;
        const boxCol = Math.floor(col / 3) * 3;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (board[boxRow + i][boxCol + j] === num) return false;
            }
        }
        return true;
    }

    removeCells(count) {
        while (count > 0) {
            const row = Math.floor(Math.random() * 9);
            const col = Math.floor(Math.random() * 9);
            if (this.board[row][col] !== 0) {
                this.board[row][col] = 0;
                count--;
            }
        }
    }
}

let game = new SudokuGame();
const boardElement = document.getElementById('sudoku-board');
const numberPadElement = document.getElementById('number-pad');
const timerElement = document.getElementById('timer');

function renderBoard() {
    boardElement.innerHTML = '';
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            const cell = document.createElement('div');
            cell.classList.add('sudoku-cell');
            cell.dataset.row = row;
            cell.dataset.col = col;
            
            if (game.board[row][col] !== 0) {
                cell.textContent = game.board[row][col];
                cell.classList.add('preset');
            }
            
            cell.addEventListener('click', () => selectCell(cell));
            boardElement.appendChild(cell);
        }
    }
}

function renderNumberPad() {
    numberPadElement.innerHTML = '';
    for (let num = 1; num <= 9; num++) {
        const button = document.createElement('button');
        button.textContent = num;
        button.classList.add('number-button');
        button.addEventListener('click', () => enterNumber(num));
        numberPadElement.appendChild(button);
    }
}

function selectCell(cell) {
    const cells = document.querySelectorAll('.sudoku-cell');
    cells.forEach(c => c.classList.remove('selected'));
    cell.classList.add('selected');
    game.selectedCell = cell;
}

function enterNumber(num) {
    if (!game.selectedCell || game.selectedCell.classList.contains('preset')) return;

    const row = parseInt(game.selectedCell.dataset.row);
    const col = parseInt(game.selectedCell.dataset.col);

    game.selectedCell.textContent = num;
    game.board[row][col] = num;
}

function startTimer() {
    if (game.timerInterval) clearInterval(game.timerInterval);
    game.startTime = new Date();
    game.timerInterval = setInterval(() => {
        const currentTime = new Date();
        const elapsedTime = new Date(currentTime - game.startTime);
        const minutes = elapsedTime.getUTCMinutes().toString().padStart(2, '0');
        const seconds = elapsedTime.getUTCSeconds().toString().padStart(2, '0');
        timerElement.textContent = `${minutes}:${seconds}`;
    }, 1000);
}

function newGame() {
    game = new SudokuGame();
    game.generatePuzzle();
    renderBoard();
    renderNumberPad();
    startTimer();
}

function resetGame() {
    renderBoard();
    startTimer();
}

function checkSolution() {
    let isCorrect = true;
    const cells = document.querySelectorAll('.sudoku-cell');
    
    cells.forEach((cell, index) => {
        if (!cell.classList.contains('preset')) {
            const row = Math.floor(index / 9);
            const col = index % 9;
            const cellValue = parseInt(cell.textContent) || 0;
            
            if (cellValue !== game.solution[row][col]) {
                cell.classList.add('error');
                isCorrect = false;
            }
        }
    });

    alert(isCorrect ? 'Congratulations! Correct solution!' : 'Some cells are incorrect.');
}

// Initialize game on page load
newGame();