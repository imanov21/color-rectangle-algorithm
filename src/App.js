import logo from './logo.svg';
import { useState } from 'react';
import './App.css';

function App() {
  const cellNumbers = 10;
  const [curHightLightColor, setCurHightLightColor] = useState(null);
  const [clickedPlace, setClickedPlace] = useState(null);
  const [hightlightedState, sethightlightedState] = useState(false);

  const colorCell = (nRow, nColumn) => {
    const el = document.getElementById(`cube_row_${nRow}_data_${nColumn}`);

    if (curHightLightColor === 'red') {
      if (!el.classList.contains('red')) {
        el.classList.toggle("red");
      }
    } else {
      if (el.classList.contains('red')) {
        el.classList.toggle("red");
      }
    }
  }

  const colorSquare = (currentCell) => {
    const cellDifWidth = clickedPlace.nColumn - currentCell.nColumn
    const cellDifHeight = clickedPlace.nRow - currentCell.nRow
    const startx = clickedPlace.nColumn;
    const starty = clickedPlace.nRow;

    const makeColor = (x, y) => {
      if (cellDifWidth < 0 && cellDifHeight < 0 && cellDifWidth === cellDifHeight) {
        for (let i = starty; i <= y; i++) {
          for (let j = startx; j <= x; j++) {
            /* str 37, 43, 49, 55 - color cell in position
               with i ( number of Row) and j (number of Column) */
            colorCell(i, j);
          }
        }
      } else if (cellDifWidth > 0 && cellDifHeight > 0 && cellDifWidth === cellDifHeight) {
        for (let i = starty; i >= y; i--) {
          for (let j = startx; j >= x; j--) {
            colorCell(i, j);
          }
        }
      } else if (cellDifWidth > 0 && cellDifHeight < 0 && cellDifWidth === Math.abs(cellDifHeight)) {
        for (let i = starty; i <= y; i++) {
          for (let j = startx; j >= x; j--) {
            colorCell(i, j);
          }
        }
      } else {
        for (let i = starty; i >= y; i--) {
          for (let j = startx; j <= x; j++) {
            colorCell(i, j);
          }
        }
      }

    }
    makeColor(currentCell.nColumn, currentCell.nRow);
  }

  const hightlightArea = (nRow, nColumn) => {
    if (hightlightedState) {
      if (nRow === clickedPlace.nRow) {
        if (nColumn !== clickedPlace.nColumn) {
          colorCell(nRow, nColumn); // horizontal line
        }
      } else {
        if (nColumn === clickedPlace.nColumn) {
          colorCell(nRow, nColumn); // vertical line
        } else {
          colorSquare({ nRow, nColumn }); // draw a square on an oblique
        }
      }
    }
  }

  const toggleCube = (nRow, nColumn, event) => {
    event.preventDefault();
    sethightlightedState(true);
    setClickedPlace({ nRow, nColumn });
    const el = document.getElementById(`cube_row_${nRow}_data_${nColumn}`);

    if (!el.classList.contains('red')) {
      setCurHightLightColor('red');
    } else {
      setCurHightLightColor('grey');
    }
    el.classList.toggle("red");
  }

  const clearState = () => {
    sethightlightedState(false);
    setCurHightLightColor(null);
  }

  const genenateCells = (num, nRow) => {
    const result = [];
    for (let x = 1; x <= num; x++) {
      result.push(<td
        className="td"
        id={`cube_row_${nRow}_data_${x}`}
        onMouseEnter={() => hightlightArea(nRow, x)}
        onMouseDown={(event) => toggleCube(nRow, x, event)}
        onMouseUp={() => clearState()}
      ></td>);
    }
    return result;
  }

  const generateRows = (num) => {
    const result = [];
    for (let i = 1; i <= num; i++) {
      result.push(<tr>
        {genenateCells(cellNumbers, i).map(el => el)}
      </tr>);
    }
    return result;
  }

  const table = generateRows(cellNumbers);

  return (
    <div className="App">
      <table>
        {table}
      </table>
    </div>
  );
}

export default App;
