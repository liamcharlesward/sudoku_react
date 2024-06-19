import { BoardProps } from "./Board.Props";
import "./Board.css";
import clsx from "clsx";
import { useState } from "react";
import { useKeyPress } from "@uidotdev/usehooks";

function Board(props: BoardProps) {
  const [selectedCell, setSelectedCell] = useState<string | null>(null);

  function selectCell(id: string) {
    const cell = document.getElementById(id);
    if (cell) {
      if (selectedCell === id) {
        deselectCell();
      } else if (!cell.classList.contains("filled-cell")) setSelectedCell(id);
    }
  }

  function deselectCell() {
    setSelectedCell(null);
  }

  // This is hacky, there must be a bettwr way to do this
  useKeyPress("Escape", deselectCell);

  return (
    <table id="sudoku-table">
      <tbody>
        {props.board.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {row.map((cell, cellIndex) => (
              <td
                id={`${rowIndex}-${cellIndex}`}
                className={clsx(
                  cell !== null && "filled-cell",
                  selectedCell === `${rowIndex}-${cellIndex}` && "selected-cell"
                )}
                onClick={() => {
                  selectCell(`${rowIndex}-${cellIndex}`);
                }}
              >
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export { Board };
