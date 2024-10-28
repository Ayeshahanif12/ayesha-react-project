// src/components/GameOver.js
import React from 'react';
import { Center, Box, Text } from '@chakra-ui/react';

export default function GameOver({ resetGame }) {
  return (
    <Center
      pos="absolute"
      top="0"
      left="0"
      w="100%"
      h="100%"
      bg="rgba(0, 0, 0, 0.6)"
      onClick={resetGame}
    >
      <Box bg="white" p={5} borderRadius="md" boxShadow="lg">
        <Text fontSize="2xl" fontWeight="bold">Game Over</Text>
        <h2>Game Over</h2>
        <p className="final-score">
          Your Final Score: <span>{finalScore}</span>
        </p>
        {finalScore > highScore && finalScore > 0 && (
          <p className="congratulate">🏆 You beat the high score! 🏆</p>
        )}
        <Text>Click to Restart</Text>
      </Box>
    </Center>
  );
}

 
                                                
    