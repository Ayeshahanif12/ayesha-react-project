import React from 'react';
import { Box } from '@chakra-ui/react';
import Snake from './Snake.jsx';
import Food from './Food.jsx';

const GameBoard = ({ snake, food, gridSize }) => {
  return (
    <Box
      id="gameBoard"
      width="400px"
      height="400px"
      display="grid"
      gridTemplateColumns={`repeat(${gridSize}, 1fr)`}
      gridTemplateRows={`repeat(${gridSize}, 1fr)`}
      border="10px solid black"
      bg="white"
    >
      <Snake snake={snake} />
      <Food food={food} />
    </Box>
  );
};

export default GameBoard;
