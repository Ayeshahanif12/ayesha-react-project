import { useState, useEffect } from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { Box, Center, Text, VStack } from '@chakra-ui/react';
import SpecialFood from './components/SpecialFood';
import GameBoard from './components/GameBoard';
import { generateFood, increaseSpeed, checkCollisions } from './Utils/GameLogic';
import GameOver from './components/GameOver';

const gridSize = 20; // Size of the game grid
const initialSpeed = 200; // Initial speed of the snake

function App() {
  // State variables for game state
  const [snake, setSnake] = useState([{ x: 10, y: 10 }]); // Initial position of the snake
  const [direction, setDirection] = useState('right'); // Initial direction of the snake
  const [score, setScore] = useState(0); // Player's current score
  const [specialFood, setSpecialFood] = useState(generateFood(gridSize, snake)); // Position of the special food
  const [gameInterval, setGameInterval] = useState(null); // Interval for the snake movement
  const [gameSpeed, setGameSpeed] = useState(initialSpeed); // Speed of the game
  const [gameStarted, setGameStarted] = useState(false); // Indicates if the game has started
  const [highScore, setHighScore] = useState(0); // High score tracker
  const [gameOver, setGameOver] = useState(false); // Indicates if the game is over

  // Function to start the game
  const startGame = () => {
    if (!gameStarted) {
      setGameStarted(true); // Set the game as started
      setGameOver(false); // Reset game over state
      setSnake([{ x: 10, y: 10 }]); // Reset the snake position
      setSpecialFood(generateFood(gridSize, snake)); // Generate initial food
      setScore(0); // Reset the score
      setDirection('right'); // Reset direction
      setGameSpeed(initialSpeed); // Reset game speed
      // Set the game interval for snake movement
      setGameInterval(setInterval(moveSnake, gameSpeed));
    }
  };

  // Function to reset the game
  const resetGame = () => {
    setHighScore(Math.max(score, highScore)); // Update high score if applicable
    setGameStarted(false); // Mark game as not started
    setGameOver(false); // Reset game over state
    setSnake([{ x: 10, y: 10 }]); // Reset the snake position
    setScore(0); // Reset the score
    setDirection('right'); // Reset direction
    setGameSpeed(initialSpeed); // Reset speed
    setSpecialFood(generateFood(gridSize, snake)); // Generate initial food
    clearInterval(gameInterval); // Clear the movement interval
  };

  // Function to move the snake
  const moveSnake = () => {
    const newSnake = [...snake]; // Create a copy of the current snake
    const head = { ...newSnake[0] }; // Get the current head of the snake

    // Update the head position based on the current direction
    switch (direction) {
      case 'up':
        head.y--;
        break;
      case 'down':
        head.y++;
        break;
      case 'left':
        head.x--;
        break;
      case 'right':
        head.x++;
        break;
      default:
        break;
    }

    // Check for collisions (with walls or itself)
    if (checkCollisions(head)) {
      setGameOver(true); // Set game over state
      clearInterval(gameInterval); // Stop the game interval
      return; // Exit the function
    }

    newSnake.unshift(head); // Add the new head to the snake

    // Check if the snake has eaten the special food
    if (head.x === specialFood.x && head.y === specialFood.y) {
      setScore(score + 1); // Increase score
      setSpecialFood(generateFood(gridSize, newSnake)); // Generate new food
      const newSpeed = increaseSpeed(gameSpeed); // Increase speed
      setGameSpeed(newSpeed); // Update game speed
      clearInterval(gameInterval); // Clear the previous interval
      setGameInterval(setInterval(moveSnake, newSpeed)); // Start a new interval with updated speed
    } else {
      newSnake.pop(); // Remove the last segment of the snake if no food was eaten
    }

    setSnake(newSnake); // Update the state with the new snake position
  };

  // Function to handle key presses for game controls
  const handleKeyPress = (event) => {
    if (!gameStarted && event.code === 'Space') {
      startGame(); // Start the game when Space is pressed
    } else {
      // Update the snake direction based on arrow key presses
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
        default:
          break;
      }
    }
  };

  // useEffect to handle key press event listeners
  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress); // Add key press listener
    return () => document.removeEventListener('keydown', handleKeyPress); // Cleanup listener on component unmount
  }, [direction, gameStarted]); // Re-run effect if direction or gameStarted changes

  return (
    <ChakraProvider>
      <Center height="100vh" bg="#abb78a" flexDirection="column" fontFamily="VT323, monospace">
        <VStack spacing={5}>
          <Box className="scores" display="flex" justifyContent="space-between" width="400px">
            <Text color="yellow" fontSize="2xl">Score: {score}</Text>
            <Text color="yellow" fontSize="2xl">High Score: {highScore}</Text>
          </Box>
          <GameBoard snake={snake} specialFood={specialFood} gridSize={gridSize} />
          {!gameStarted && !gameOver && (
            <Text id="instruction-text" color="black" textAlign="center" fontSize="xl">
              Press Space to Start the Game
            </Text>
          )}
          {gameOver && <GameOver resetGame={resetGame} score={score} highScore={highScore} />}
        </VStack>
      </Center>
    </ChakraProvider>
  );
}

export default App;
