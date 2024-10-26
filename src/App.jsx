import { useState, useEffect } from 'react'
import { ChakraProvider } from '@chakra-ui/react';
import { Box, Button, Text, grid, Flex } from '@chakra-ui/react';
import SpecialFood from './components/SpecialFood';

const gridSize = 20
const SnakeGame = () => {
  const [snake, setSnake] = useState([{ x: 10, y: 10 }]);
  const [direction, setDirection] = useState('right');
  const [score, setScore] = useState(0);
  const [gameInterval, setGameInterval] = useState(null);
  const [gameSpeed, setGameSpeed] = useState(10);
  const [gameStarted, setGameStarted] = useState(false);
  const [highScore, setHighScore] = useState(0);
}


export default App 
