import React, { useState, useEffect } from 'react';
import { ChakraProvider, Box, Text, VStack, Center } from '@chakra-ui/react';
import GameBoard from './components/GameBoard';
import { generateFood, checkCollisions, increaseSpeed } from './Utils/GameLogic';

const gridSize = 20;
const initialSpeed = 200;

const App = ({title, snakeProp}) => {
  debugger;
 
  const [direction, setDirection] = useState('right');
 
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [gameSpeed, setGameSpeed] = useState(initialSpeed);
  const [gameInterval, setGameInterval] = useState(null);
  const [gameStarted, setGameStarted] = useState(false);

 
  useEffect(()=> {
    initializeGame()
  },[])

  const startGame = () => {
    if (!gameStarted) {
      setGameStarted(true);
      setFood((prev) => {
        // return generateFood(gridSize, snake)
      });
      setGameInterval(setInterval(moveSnake, gameSpeed));
    }
  };

  const resetGame = () => {
    setHighScore(Math.max(score, highScore));
    setSnake([{ x: 10, y: 10 }]);
    setDirection('right');
    setFood(generateFood(gridSize, snake));
    setScore(0);
    setGameSpeed(initialSpeed);
    setGameStarted(false);
    clearInterval(gameInterval);
  };

  const moveSnake = () => {
    const newSnake = [...snake];
    const head = { ...newSnake[0] };

    switch (direction) {
      case 'up': head.y--; break;
      case 'down': head.y++; break;
      case 'left': head.x--; break;
      case 'right': head.x++; break;
      default: break;
    }

    if (checkCollisions(head, gridSize, snake)) {
      resetGame();
      return;
    }

    newSnake.unshift(head);
    if (head.x === food.x && head.y === food.y) {
      setScore(score + 1);
      setFood(generateFood(gridSize, newSnake));
      const newSpeed = increaseSpeed(gameSpeed);
      setGameSpeed(newSpeed);
      clearInterval(gameInterval);
      setGameInterval(setInterval(moveSnake, newSpeed));
    } else {
      newSnake.pop();
    }
    setSnake((prev) => {
      return newSnake;
    });
  };

  const handleKeyPress = (event) => {
    switch (event.key) {
      case 'ArrowUp': if (direction !== 'down') setDirection('up'); break;
      case 'ArrowDown': if (direction !== 'up') setDirection('down'); break;
      case 'ArrowLeft': if (direction !== 'right') setDirection('left'); break;
      case 'ArrowRight': if (direction !== 'left') setDirection('right'); break;
      case ' ': startGame(); break;
      default: break;
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
          { food && snake && <GameBoard snake={snake} food={food} gridSize={gridSize} />}
          {!gameStarted && (
            <Text id="instruction-text" color="black" textAlign="center" fontSize="xl">
              Press Space to Start  the Game
            </Text>
          )}
        </VStack>
      </Center>
    </ChakraProvider>
  );
};

export default App;
