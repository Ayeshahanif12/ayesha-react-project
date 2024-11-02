import React, { useState, useEffect } from 'react';
import { ChakraProvider, Box, Text, VStack, Center } from '@chakra-ui/react';
import GameBoard from './components/GameBoard';
import { generateFood, checkCollisions, increaseSpeed } from './utils/GameLogic';
import GameOver from './components/GameOver';

const gridSize = 20;
const initialSpeed = 200;

const App = () => {
  const [snake, setSnake] = useState([{ x: 10, y: 10 }]);
  const [direction, setDirection] = useState('right');
  const [food, setFood] = useState(generateFood(gridSize, [{ x: 10, y: 10 }]));
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [gameSpeed, setGameSpeed] = useState(initialSpeed);
  const [gameStarted, setGameStarted] = useState(false);

  useEffect(() => {
    let gameInterval;
    if (gameStarted) {
      gameInterval = setInterval(() => {
        moveSnake();
      }, gameSpeed);
    }
    return () => clearInterval(gameInterval);
  }, [gameStarted, direction, gameSpeed, snake]);

  const startGame = () => {
    setGameStarted(true);
  };

  const resetGame = () => {
    setHighScore(Math.max(score, highScore));
    setSnake([{ x: 10, y: 10 }]);
    setDirection('right');
    setFood(generateFood(gridSize, [{ x: 10, y: 10 }]));
    setScore(0);
    setGameSpeed(initialSpeed);
    setGameStarted(false);
  };

  const moveSnake = () => {
    const newSnake = [...snake];
    const head = { ...newSnake[0] };

    switch (direction) {
      case 'up':
        head.y -= 1;
        break;
      case 'down':
        head.y += 1;
        break;
      case 'left':
        head.x -= 1;
        break;
      case 'right':
        head.x += 1;
        break;
      default:
        break;
    }

    if (checkCollisions(head, gridSize, newSnake)) {
      resetGame();
      return;
    }

    newSnake.unshift(head);
    if (head.x === food.x && head.y === food.y) {
      setScore(prev => prev + 1);
      setFood(generateFood(gridSize, newSnake));
      const newSpeed = increaseSpeed(gameSpeed);
      setGameSpeed(newSpeed);
    } else {
      newSnake.pop();
    }
    setSnake(newSnake);
  };

  const handleKeyPress = (event) => {
    switch (event.key) {
      case 'ArrowUp':
        if (direction !== 'down') setDirection('up');
        break;
      case 'ArrowDown':
        if (direction !== 'up') setDirection('down');
        break;
      case 'ArrowLeft':
        if (direction !== 'right') setDirection('left');
        break;
      case 'ArrowRight':
        if (direction !== 'left') setDirection('right');
        break;
      case ' ':
        startGame();
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [direction, gameStarted]);

  return (
    <ChakraProvider>
      <Center height="100vh" bg="#abb78a" flexDirection="column" fontFamily="VT323, monospace">
        <VStack spacing={5}>
          <Box className="scores" display="flex" justifyContent="space-between" width="400px">
            <Text color="green" fontSize="2xl">Score: {score}</Text>
            <Text color="green" fontSize="2xl">High Score: {highScore}</Text>
          </Box>
          <GameBoard snake={snake} food={food} gridSize={gridSize} />
          {!gameStarted && (
            <Text id="instruction-text" color="black" textAlign="center" fontSize="xl">
              Press Space to Start the Game
            </Text>
          )}
        </VStack>
      </Center>
    </ChakraProvider>
  );
};

export default App;
