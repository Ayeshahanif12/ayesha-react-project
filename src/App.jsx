import { useState, useEffect } from 'react'
import { ChakraProvider } from '@chakra-ui/react';
import { Box, Button, Text, grid, Flex, VStack } from '@chakra-ui/react';
import SpecialFood from './components/SpecialFood';
import GameBoard from './components/GameBoard';
import Snake from './components/Snake';
import GameLogic from './Utils/GameLogic'



const App = () => {
    const [snake, setSnake] = useState([{ x: 10, y: 10 }]);
    const [direction, setDirection] = useState('right');
    const [score, setScore] = useState(0);
    const [specialFood, setSpecialFood] = useState([{ x: 0, y: 0 }]);
    const [gameInterval, setGameInterval] = useState(null);
    const [gameSpeed, setGameSpeed] = useState(10);
    const [gameStarted, setGameStarted] = useState(false);
    const [highScore, setHighScore] = useState(0);

    return (
        <GameBoard snake={snake} specialFood={specialFood}></GameBoard> // formation of gameboard
    )
}

const startGame = () => {                  //starting of game
    if (!gameStarted) {
        gameStarted = true;
        instructionText.style.display = 'none';


        food = { ...generateFood() };
        clearInterval = setInterval


    }
    const resetGame = () => {           // reset game
        updateHighScore();
        stopGame();
        food = { ...generateFood() };
        direction = 'right';
        gameSpeed = 200;
        score = 0;
        scoreElement.textContent = `Score: ${score}`;
    }

    function updateScore() {
        scoreElement.textContent = `Score: ${score}`;
    }

}



export default App 
