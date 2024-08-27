import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

function Board({ nrows = 3, ncols = 3, chanceLightStartsOn = 0.25 }) {
  const [board, setBoard] = useState(createBoard());

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard() {
    let initialBoard = [];
    // TODO: create array-of-arrays of true/false values

    // Creates nrows high
    for(let i=0; i<nrows; i++){
      let row =[];
      // Creates ncols wide
      for(let j=0; j<ncols; j++){
        // Generate random lit or unlit cells
        row.push(Math.random() < chanceLightStartsOn);
      }
      initialBoard.push(row);
    }
    return initialBoard;
  }

  function hasWon() {
    // TODO: check the board in state to determine whether the player has won.
    
    // Should check every row and cell to determine if it's all false in order to win
    return board.every(row => row.every(cell => !cell));
    
  }

  function flipCellsAround(coord) {
    setBoard(oldBoard => {
      const [y, x] = coord.split("-").map(Number);

      const flipCell = (y, x, boardCopy) => {
        // if this coord is actually on board, flip it

        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
        }
      };

      // TODO: Make a (deep) copy of the oldBoard
      
      const boardCopy = oldBoard.map(row => [...row]);
      
      // TODO: in the copy, flip this cell and the cells around it

      flipCell(y, x, boardCopy) //Flip the clicked cell
      flipCell(y - 1, x, boardCopy) //Flip the top cell
      flipCell(y + 1, x, boardCopy) //Flip the bottom cell
      flipCell(y, x - 1, boardCopy) //Flip the left cell
      flipCell(y, x + 1, boardCopy) //Flip the right cell
      

      // TODO: return the copy

      return boardCopy;
 
    });
  }

  // if the game is won, just show a winning msg & render nothing else

  // TODO

  if(hasWon()){
    return <h1> You Have Won!!!</h1>
  }

  // make table board

  // TODO

return(
  <div>
    <table>
      <tbody>
        {board.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {row.map((cell, colIndex) => (
              <Cell 
                key={`${rowIndex}-${colIndex}`}
                isLit={cell}
                flipCellsAroundMe={() => flipCellsAround(`${rowIndex}-${colIndex}`)}
              />
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)
 
}

export default Board;




