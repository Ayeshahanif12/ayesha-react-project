import { useState, useEffect } from 'react'
import { ChakraProvider } from '@chakra-ui/react';
import { Box, Button, Text, grid, Flex, VStack } from '@chakra-ui/react';
import SpecialFood from './components/SpecialFood';
import GameBoard from './components/GameBoard';
import Snake from './components/Snake';
import { generateFood, increaseSpeed, checkCollisions } from './Utils/GameLogic'
import GameOver from './components/GameOver';



const App = () => {
  const [snake, setSnake] = useState([{ x: 10, y: 10 }]);
  const [direction, setDirection] = useState('right');
  const [score, setScore] = useState(0);
  const [specialFood, setSpecialFood] = useState([{ x: 0, y: 0 }]);
  const [gameInterval, setGameInterval] = useState(null);
  const [gameSpeed, setGameSpeed] = useState(10);
  const [gameStarted, setGameStarted] = useState(false);
  const [highScore, setHighScore] = useState(0);




  const startGame = () => {                  //starting of game
    if (!gameStarted) {
      setGameStarted(true);
      setSpecialFood(generateFood(gridSize, snake));
      setGameInterval(setInterval(moveSnake, gameSpeed));


    }
    const resetGame = () => {           // reset game
      setHighScore(Math.max(score, highScore));
      setSnake([{ x: 10, y: 10 }]);
      setSpecialFood(generateFood(gridSize, snake));
      setDirection('right');
      setGameStarted(false);
      setScore(0);
      setGameSpeed(initialspeed);
      clearInterval(gameInterval);
    }

    function updateScore() {
      scoreElement.textContent = `Score: ${score}`;
    }

  }

  return (
    <ChakraProvider>
      <Center height="100vh" bg="#abb78a" flexDirection="column" fontFamily="VT323, monospace">
        <VStack spacing={5}>
          <Box className="scores" display="flex" justifyContent="space-between" width="400px">
            <Text color="yellow" fontSize="2xl">Score: {score}</Text>
            <Text color="yellow" fontSize="2xl">High Score: {highScore}</Text>
          </Box>
          <GameBoard snake={snake} food={food} gridSize={gridSize} isGameOver={GameOver} />
          {GameOver && <Button onClick={() => setisGameOver(false)}>Restart Game</Button>}
        </VStack>
        {!gameStarted && (
          <Text id="instruction-text" color="black" textAlign="center" fontSize="xl">
            Press Space to Start the Game
          </Text>
        )}
      </Center>

    </ChakraProvider>


  );
}


export default App 
