/* eslint-disable react-hooks/exhaustive-deps */
import "./App.css";
import { Board } from "./Board/Board";
import { useState, useEffect } from "react";

type SudokuBoard = (number | null)[][];

function App() {
  // State variables
  const [gameBoard, setGameBoard] = useState<SudokuBoard>([]);
  const [solvedGameBoard, setSolvedGameBoard] = useState<SudokuBoard>([]);

  function newPuzzle() {
    // Create a 9x9 array to represent the board
    let board = Array.from({ length: 9 }, () => Array(9).fill(10));
    // Generate a new puzzle

    // Randomise the first row of numbers in the board
    for (let i = 0; i < 9; i++) {
      let unique = false;
      while (!unique) {
        let randomInt = Math.floor(Math.random() * 9) + 1;
        if (!board[0].includes(randomInt)) {
          unique = true;
        }
        board[0][i] = randomInt;
      }
    }
    // Generate a solution for the board, and store in solvedBoard
    generateSolution(board);
    setSolvedGameBoard(board);
    // Remove numbers from each row to generate a puzzle
    setGameBoard(removeValues(board));
  }

  function generateSolution(board: SudokuBoard) {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        // Find an empty cell
        if (board[row][col] === 10) {
          // Try all numbers from 1 to 9
          for (let num = 1; num <= 9; num++) {
            if (isValid(board, row, col, num)) {
              board[row][col] = num;
              // Recur to solve the rest of the board
              if (generateSolution(board)) {
                return true;
              }
              // Undo the current cell for backtracking
              board[row][col] = 10;
            }
          }
          return false; // Trigger backtracking
        }
      }
    }
    return true; // Board is completely filled
  }

  function removeValues(solvedBoard: SudokuBoard) {
    let board: SudokuBoard = solvedBoard.map((row) => row.slice());
    board.forEach((row) => {
      let keptIndices: number[] = [];
      for (let i = 0; i < 5; i++) {
        let randomIndex = Math.floor(Math.random() * 9);
        if (!keptIndices.includes(randomIndex)) {
          keptIndices.push(randomIndex);
          row[randomIndex] = null;
        }
      }
    });
    return board;
  }

  function isValid(board: SudokuBoard, row: number, col: number, num: number) {
    // Check rows
    for (let i = 0; i < 9; i++) {
      if (board[row][i] === num) {
        return false;
      }
    }
    // Check columns
    for (let i = 0; i < 9; i++) {
      if (board[i][col] === num) {
        return false;
      }
    }
    // Check sub-grids
    // Check the 3x3 subgrid
    let startRow = row - (row % 3);
    let startCol = col - (col % 3);
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[i + startRow][j + startCol] === num) {
          return false;
        }
      }
    }

    return true;
  }

  function showSolution() {
    // TODO: Use a proper modal instead of a browser dialog
    // eslint-disable-next-line no-restricted-globals
    if (confirm("Are you sure you want to see the solution?")) {
      setGameBoard(solvedGameBoard);
    }
  }

  useEffect(() => {
    newPuzzle();
  }, []);

  return (
    <div className="App">
      <h1>Sudoku game</h1>
      <Board board={gameBoard} />
      <div id="button-row">
        <button onClick={() => newPuzzle()}>New Game</button>
        <button onClick={() => showSolution()}>Show solution</button>
      </div>
    </div>
  );
}

export default App;
export type { SudokuBoard };
