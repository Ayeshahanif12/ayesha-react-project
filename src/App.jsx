import { useState, useEffect } from 'react'
import { ChakraProvider } from '@chakra-ui/react';
import { Box, Button, Text, grid, Flex } from '@chakra-ui/react';
import SpecialFood from './components/SpecialFood';
import GameOver from './components/GameOver';


const gridSize = 20
const App = () => {
    const [snake, setSnake] = useState([{ x: 10, y: 10 }]);
    const [direction, setDirection] = useState('right');
    const [score, setScore] = useState(0);
    const [gameInterval, setGameInterval] = useState(null);
    const [gameSpeed, setGameSpeed] = useState(10);
    const [gameStarted, setGameStarted] = useState(false);

    useEffect(() => {
        generatefood();
    }, []);

    useEffect(() => {
        if (gameStarted) {
            const interval = setInterval(() => {
                move();
            }, gameSpeed);
            return () => clearInterval(interval);
        }
    }, [gameStarted, snake, direction, gameSpeed]);


    useEffect(() => {
        if (gameStarted) {
            const interval = setInterval(() => {
                move();
            })
            return () => clearInterval(interval)
        }
    }, [gameStarted, direction, snake, speed]);

    const drawSnake = () => {
        gridColumn = position.x;
        gridRow = position.y;
    }

}


export default App

