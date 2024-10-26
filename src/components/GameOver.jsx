import React, { useState, useEffect } from 'react';

export default function GameOver({
  finalScore,
  setIsGameOver,
  setIsPlaying,
  setJustStarted,
  setScore,
}) {
  const [highScore, setHighScore] = useState(0);

  const handleGameReset = () => {
    setIsGameOver(false);
    setIsPlaying(true);
    setgameStarted(true);
    setScore(0);
  };

  // Set the high score if the current score beats it
  useEffect(() => {
    if (finalScore > highScore) {
      setHighScore(finalScore);
    }
  }, [finalScore, highScore]);

  return (
    <div id="game-over-container" onClick={handleGameReset}>
      <div id="game-over">
        <h2>Game Over</h2>
        <p className="final-score">
          Your Final Score: <span>{finalScore}</span>
        </p>
        {finalScore > highScore && finalScore > 0 && (
          <p className="congratulate">🏆 You beat the high score! 🏆</p>
        )}
        <p className="click-container">(Click anywhere to continue)</p>
        <p>Current High Score: {highScore}</p>
      </div>
    </div>
  );
}     





