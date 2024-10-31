export const generateFood = (gridSize, snake) => {
    let newFood;
    do {
      newFood = {
        x: Math.floor(Math.random() * gridSize) + 1,
        y: Math.floor(Math.random() * gridSize) + 1,
      };
    } while (snake.some(segment => segment.x === newFood.x && segment.y === newFood.y));
  
    return newFood;
  };
  
  export const checkCollisions = (head, gridSize, snake) => {
    return (
      head.x < 1 || head.x > gridSize || 
      head.y < 1 || head.y > gridSize ||
      snake.filter((_, index) => index !== 0).some(segment => segment.x === head.x && segment.y === head.y)
    );
  };
  
  export const increaseSpeed = (currentSpeed) => {
    const minimumSpeed = 50;
    return currentSpeed > minimumSpeed ? currentSpeed - 5 : minimumSpeed;
  };
  