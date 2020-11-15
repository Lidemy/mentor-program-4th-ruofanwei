/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable import/no-duplicates */
/* eslint-disable import/no-unresolved */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/accessible-emoji */
/* eslint-disable no-shadow */
import React from 'react';
import { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import Board from './Board';
import findTheWinner from './Rule';

const Blink = keyframes`
  78% {
    color: inherit;
    text-shadow: inherit;
  }
  79%{
     color: #333;
  }
  80% {
    
    text-shadow: none;
  }
  81% {
    color: inherit;
    text-shadow: inherit;
  }
  82% {
    color: #333;
    text-shadow: none;
  }
  83% {
    color: inherit;
    text-shadow: inherit;
  }
  92% {
    color: #333;
    text-shadow: none;
  }
  92.5% {
    color: inherit;
    text-shadow: inherit;
  }
`;

const Game = styled.div`
  min-height: 100vh;
  justify-content: center;
  background-color: #204051;
`;
const H1 = styled.div`
  text-align: center;
  font-size: 40px;
  font-weight: bold;
  color: #fee;
  text-shadow: 
    0 -49px 10px, 
    0 0 2px, 
    0 0 1em #fcbf1e, 
    0 0 0.5em #fcbf1e,
    0 0 0.1em #fcbf1e, 
    0 4px 3px #000;

`;
const H3 = styled.div`
  text-align: center;
  font-size: 24px;
  color: #ffffff;
  text-shadow: 
    2px 2px 2px rgba(0, 0, 0, 0.3),
    -2px -2px 2px rgba(255, 255, 255, 0.4);
`;
const Win = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.55);
  font-size: 60px;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  letter-spacing: 4px;
  color: #fee;
  text-shadow: 
    0 -40px 100px, 
    0 0 2px, 
    0 0 1em #ff4444, 
    0 0 0.5em #ff4444, 
    0 0 0.1em #ff4444, 
    0 10px 3px #000;

`;
const Span = styled.span`
  animation: ${Blink} linear infinite 2s;
  &:nth-of-type(2) {
    animation: ${Blink} linear infinite 3s;
  }
  &:nth-of-type(3) {
    transition: 2s;
    animation: ${Blink} linear infinite 1s;
  }
`;
const Button = styled.button`
 margin-top: 10px;
 font-size: 20px;
 padding: 5px 18px; 
 cursor: pointer;
`;
const Text = styled.div``;
const Title = ({ blackOrWhite, winner }) => (
  <div>
    <H1>五子棋</H1>
    {winner && (
    <Win>
      <Text>
      🎉<Span>Con</Span>gratu<Span>lati</Span>ons !<Span>Winn</Span>er is {winner} 🎉
      </Text>
      <Button
        onClick={() => {
          window.location.reload();
        }}
      >
            再玩一次
      </Button>

    </Win>
    )}
    <H3>Next is 🤞{blackOrWhite} </H3>
  </div>
);

function App() {
  const [board, setBoard] = useState(Array(19).fill(Array(19).fill(null)));
  const [stepPlayed, setStepPlayed] = useState(0);
  const [blackIsNext, setBlackIsNext] = useState(true);
  const [currentX, setCurrentX] = useState(null);
  const [currentY, setCurrentY] = useState(null);
  const blackOrWhite = blackIsNext ? 'black' : 'white';
  const winner = findTheWinner(board, currentX, currentY);
  const handleMove = (xIndex, yIndex) => {
    setCurrentX(xIndex);
    setCurrentY(yIndex);
    const squares = [...board];
    if (winner || squares[yIndex][xIndex]) return;
    setBoard(
      squares.map((row, currentY) => {
        if (currentY !== yIndex) return row;
        return row.map((col, currentX) => {
          if (currentX !== xIndex) return col;
          return blackOrWhite;
        });
      }),
    );
    setStepPlayed(stepPlayed + 1);
    setBlackIsNext(!blackIsNext);
  };

  return (
    <Game>
      <Title blackOrWhite={blackOrWhite} winner={winner} />
      <Board squares={board} onClick={handleMove} />
    </Game>
  );
}

export default App;
