import React, { useState } from 'react';
import './TicTacToe.css';
import circle_icon from '../Assets/circle.png';
import cross_icon from '../Assets/cross.png';

const TicTacToe = () => {
  const [data, setData] = useState(Array(9).fill(""));
  const [count, setCount] = useState(0);
  const [lock, setLock] = useState(false);

  const winningPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], // Rows
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], // Columns
    [0, 4, 8],
    [2, 4, 6]  // Diagonals
  ];

  const checkWinner = (newData) => {
    for (let pattern of winningPatterns) {
      const [a, b, c] = pattern;
      if (
        newData[a] &&
        newData[a] === newData[b] &&
        newData[a] === newData[c]
      ) {
        setLock(true);
        setTimeout(() => {
          alert(`Player ${newData[a].toUpperCase()} wins!`);
        }, 100);
        return;
      }
    }

    // If board is full and no winner
    if (!newData.includes("") && !lock) {
      setTimeout(() => {
        alert("It's a draw!");
      }, 100);
      setLock(true);
    }
  };

  const toggle = (index) => {
    if (lock || data[index] !== "") return;

    const newData = [...data];
    newData[index] = count % 2 === 0 ? 'x' : 'o';
    setData(newData);
    setCount(count + 1);
    checkWinner(newData);
  };

  const getImage = (value) => {
    if (value === 'x') return <img src={cross_icon} alt="cross" />;
    if (value === 'o') return <img src={circle_icon} alt="circle" />;
    return null;
  };

  const resetGame = () => {
    setData(Array(9).fill(""));
    setCount(0);
    setLock(false);
  };

  return (
    <div className="container">
      <h1 className="title">Tic-Tac-Toe IN <span>React</span></h1>
      <div className="board">
        <div className="row1">
          {data.slice(0, 3).map((val, idx) => (
            <div className="boxes" key={idx} onClick={() => toggle(idx)}>
              {getImage(val)}
            </div>
          ))}
        </div>
        <div className="row2">
          {data.slice(3, 6).map((val, idx) => (
            <div className="boxes" key={idx + 3} onClick={() => toggle(idx + 3)}>
              {getImage(val)}
            </div>
          ))}
        </div>
        <div className="row3">
          {data.slice(6, 9).map((val, idx) => (
            <div className="boxes" key={idx + 6} onClick={() => toggle(idx + 6)}>
              {getImage(val)}
            </div>
          ))}
        </div>
      </div>
      <button className="reset" onClick={resetGame}>Reset</button>
    </div>
  );
};

export default TicTacToe;
