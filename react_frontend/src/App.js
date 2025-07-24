import React, { useState } from 'react';
import './App.css';

// PUBLIC_INTERFACE
const Square = ({ value, onClick }) => (
  <button className={`square ${value?.toLowerCase()}`} onClick={onClick}>
    {value}
  </button>
);

// PUBLIC_INTERFACE
function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [scores, setScores] = useState({ X: 0, O: 0, Draws: 0 });

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
      [0, 4, 8], [2, 4, 6] // diagonals
    ];

    for (let line of lines) {
      const [a, b, c] = line;
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const handleClick = (i) => {
    if (board[i] || calculateWinner(board)) return;

    const newBoard = board.slice();
    newBoard[i] = xIsNext ? 'X' : 'O';
    setBoard(newBoard);
    setXIsNext(!xIsNext);

    const winner = calculateWinner(newBoard);
    if (winner) {
      setScores(prev => ({
        ...prev,
        [winner]: prev[winner] + 1
      }));
    } else if (!newBoard.includes(null)) {
      setScores(prev => ({
        ...prev,
        Draws: prev.Draws + 1
      }));
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
  };

  const winner = calculateWinner(board);
  const isDraw = !winner && !board.includes(null);
  const status = winner 
    ? `Winner: ${winner}`
    : isDraw 
    ? "It's a Draw!"
    : `Next player: ${xIsNext ? 'X' : 'O'}`;

  return (
    <div className="App">
      <h1 className="header">Tic Tac Toe</h1>
      
      <div className="score-board">
        <div className="score-item">
          <div className="score-label">Player X</div>
          <div className="score-value">{scores.X}</div>
        </div>
        <div className="score-item">
          <div className="score-label">Draws</div>
          <div className="score-value">{scores.Draws}</div>
        </div>
        <div className="score-item">
          <div className="score-label">Player O</div>
          <div className="score-value">{scores.O}</div>
        </div>
      </div>

      <div className="game-status">{status}</div>

      <div className="game-board">
        {board.map((square, i) => (
          <Square
            key={i}
            value={square}
            onClick={() => handleClick(i)}
          />
        ))}
      </div>

      <div className="controls">
        <button className="btn-restart" onClick={resetGame}>
          Restart Game
        </button>
      </div>
    </div>
  );
}

export default App;
