import React, { useState, useEffect } from "react";
import GameOverModal from "./GameOverModal"; // Adjust the path as needed

function SnakeGame() {
  const [snake, setSnake] = useState([{ x: 10, y: 10 }]);
  const [food, setFood] = useState({ x: 5, y: 5 });
  const [direction, setDirection] = useState("right");
  const [score, setScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [finalScore, setFinalScore] = useState(0);

  // Function to handle game over
  const handleGameOver = () => {
    setFinalScore(score);
    setIsGameOver(true);
    setIsPlaying(false);
  };

  // Function to reset the game
  const resetGame = () => {
    setScore(0);
    setSnake([{ x: 10, y: 10 }]);
    setDirection("right");
    setIsGameOver(false);
    setIsPlaying(true);
    generateFood(); // Regenerate food position
  };

  // Handle food generation and avoid placing food on the snake
  const generateFood = () => {
    let newFood;
    do {
      newFood = {
        x: Math.floor(Math.random() * 20) + 1,
        y: Math.floor(Math.random() * 20) + 1,
      };
    } while (snake.some(segment => segment.x === newFood.x && segment.y === newFood.y));
    setFood(newFood);
  };

  // Movement and collision detection logic
  const moveSnake = () => {
    if (!isPlaying) return;

    const newHead = { ...snake[0] };
    switch (direction) {
      case "up": newHead.y -= 1; break;
      case "down": newHead.y += 1; break;
      case "left": newHead.x -= 1; break;
      case "right": newHead.x += 1; break;
      default: break;
    }

    // Check for collisions with walls or self
    if (
      newHead.x < 1 || newHead.x > 20 || newHead.y < 1 || newHead.y > 20 ||
      snake.slice(1).some(segment => segment.x === newHead.x && segment.y === newHead.y)
    ) {
      handleGameOver();
      return;
    }

    // Check for eating food
    if (newHead.x === food.x && newHead.y === food.y) {
      setScore(prevScore => prevScore + 1);
      generateFood();
    } else {
      snake.pop(); // Remove the tail segment if no food eaten
    }

    // Update snake's head position
    setSnake([newHead, ...snake]);
  };

  // Change direction based on keypresses
  const changeDirection = (event) => {
    switch (event.key) {
      case "ArrowUp": if (direction !== "down") setDirection("up"); break;
      case "ArrowDown": if (direction !== "up") setDirection("down"); break;
      case "ArrowLeft": if (direction !== "right") setDirection("left"); break;
      case "ArrowRight": if (direction !== "left") setDirection("right"); break;
      default: break;
    }
  };

  useEffect(() => {
    const gameInterval = setInterval(moveSnake, 200); // Game speed

    // Cleanup interval on unmount
    return () => clearInterval(gameInterval);
  }, [snake, direction, isPlaying]);

  useEffect(() => {
    document.addEventListener("keydown", changeDirection);
    return () => document.removeEventListener("keydown", changeDirection);
  }, [direction]);

  return (
    <div>
      {isGameOver && (
        <GameOverModal
          finalScore={finalScore}
          setIsGameOver={setIsGameOver}
          setIsPlaying={setIsPlaying}
          setJustStarted={() => {}}
          setScore={setScore}
        />
      )}
      <div id="gameBoard">
        {snake.map((segment, index) => (
          <div
            key={index}
            className="snake"
            style={{
              gridColumnStart: segment.x,
              gridRowStart: segment.y,
            }}
          />
        ))}
        <div
          className="food"
          style={{
            gridColumnStart: food.x,
            gridRowStart: food.y,
          }}
        />
      </div>
      <div>Score: {score}</div>
    </div>
  );
}

export default SnakeGame;
