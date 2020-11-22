/* eslint-disable import/no-unresolved */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-array-index-key */
import styled from 'styled-components';
import React from 'react';
import Square from './Square';

const BoardRow = styled.div`
  margin: 20px auto;
  height: 475px;
  width: 475px;
  background-color: #eee;
  box-shadow: 
    inset 0 -3px 3px 0 rgba(0, 0, 0, 0.2), 
    inset 3px 0 3px 0 rgba(0, 0, 0, 0.2),
    inset -3px 0 3px 0 rgba(0, 0, 0, 0.2), 
    inset 0 -3px 3px 0 rgba(0, 0, 0, 0.2), 
    0 3px 3px 0px #272a27;
  border-radius: 5px;
`;

const Row = styled.div`
  clear: both;
`;

function Board({ squares, onClick }) {
  return (
    <BoardRow>
      {squares.map((row, yIndex) => (
        <Row key={yIndex}>
          {row.map((col, xIndex) => (
            <Square
              key={xIndex}
              value={col}
              onClick={() => onClick(xIndex, yIndex)}
            />
          ))}
        </Row>
      ))}
    </BoardRow>
  );
}


export default Board;
