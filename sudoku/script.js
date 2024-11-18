class SudokuGame {
    constructor() {
        this.board = Array.from({length: 9}, () => Array(9).fill(0));
        this.solution = Array.from({length: 9}, () => Array(9).fill(0));
        this.startTime = null;
        this.timerInterval = null;
    }

    generateSudoku(difficulty) {
        this.board = this.createSolvedBoard();
        this.solution = JSON.parse(JSON.stringify(this.board));
        this.removeCells(difficulty);
    }

    createSolvedBoard() {
        const board = Array.from({length: 9}, () => Array(9).fill(0));
        this.solveSudoku(board);
        return board;
    }

    solveSudoku(board) {
        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                if (board[row][col] === 0) {
                    for (let num = 1; num <= 9; num++) {
                        if (this.isValidMove(board, row, col, num)) {
                            board[row][col] = num;
                            if (this.solveSudoku(board)) {
                                return true;
                            }
                            board[row][col] = 0;
                        }
                    }
                    return false;
                }
            }
        }
        return true;
    }

    isValidMove(board, row, col, num) {
        // Check row and column
        for (let i = 0; i < 9; i++) {
            if (board[row][i] === num || board[i][col] === num) return false;
        }
        
        // Check 3x3 box
        const startRow = Math.floor(row / 3) * 3;
        const startCol = Math.floor(col / 3) * 3;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (board[startRow + i][startCol + j] === num) return false;
            }
        }
        return true;
    }

    removeCells(difficulty) {
        const cellsToRemove = {
            'easy': 20,
            'medium': 40,
            'hard': 55
        };
        
        let count = cellsToRemove[difficulty];
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
const timerElement = document.getElementById('timer');
const difficultySelector = document.getElementById('difficulty');

function renderBoard() {
    boardElement.innerHTML = '';
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            const cell = document.createElement('div');
            cell.classList.add('sudoku-cell');
            cell.dataset.row = i;
            cell.dataset.col = j;
            
            if (game.board[i][j] !== 0) {
                cell.textContent = game.board[i][j];
                cell.classList.add('preset');
            }
            
            cell.addEventListener('click', () => selectCell(i, j));
            boardElement.appendChild(cell);
        }
    }
}

function selectCell(row, col) {
    const cells = document.querySelectorAll('.sudoku-cell');
    cells.forEach(cell => cell.classList.remove('selected'));
    
    const selectedCell = document.querySelector(`.sudoku-cell[data-row="${row}"][data-col="${col}"]`);
    selectedCell.classList.add('selected');
}

function newGame() {
    const difficulty = difficultySelector.value;
    game = new SudokuGame();
    game.generateSudoku(difficulty);
    renderBoard();
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
        const row = Math.floor(index / 9);
        const col = index % 9;
        
        if (!cell.classList.contains('preset')) {
            const cellValue = parseInt(cell.textContent) || 0;
            if (cellValue !== game.solution[row][col]) {
                cell.classList.add('error');
                isCorrect = false;
            }
        }
    });

    alert(isCorrect ? 'Congratulations! Correct solution!' : 'Some cells are incorrect. Keep trying!');
}

function getHint() {
    const emptyCells = [];
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (game.board[i][j] === 0) {
                emptyCells.push({row: i, col: j});
            }
        }
    }

    if (emptyCells.length > 0) {
        const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        const cell = document.querySelector(`.sudoku-cell[data-row="${randomCell.row}"][data-col="${randomCell.col}"]`);
        cell.textContent = game.solution[randomCell.row][randomCell.col];
        cell.classList.add('hint');
        game.board[randomCell.row][randomCell.col] = game.solution[randomCell.row][randomCell.col];
    }
}

function startTimer() {
    // Clear any existing timer
    if (game.timerInterval) {
        clearInterval(game.timerInterval);
    }

    game.startTime = new Date();
    game.timerInterval = setInterval(() => {
        const currentTime = new Date();
        const elapsedTime = new Date(currentTime - game.startTime);
        const minutes = elapsedTime.getUTCMinutes().toString().padStart(2, '0');
        const seconds = elapsedTime.getUTCSeconds().toString().padStart(2, '0');
        timerElement.textContent = `Time: ${minutes}:${seconds}`;
    }, 1000);
}

// Initialize game on page load
newGame();