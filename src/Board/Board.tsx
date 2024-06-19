import { BoardProps } from "./Board.Props";
import "./Board.css";
import clsx from "clsx";

function Board(props: BoardProps) {
  return (
    <table id="sudoku-table">
      {props.board.map((row, rowIndex) => (
        <tr key={rowIndex}>
          {row.map((cell, cellIndex) => (
            <td
              key={`${rowIndex}-${cellIndex}`}
              className={clsx(cell !== null && "filled-cell")}
            >
              {cell}
            </td>
          ))}
        </tr>
      ))}
    </table>
  );
}

export { Board };
