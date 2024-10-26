import { useState, useEffect } from 'react'
import { ChakraProvider } from '@chakra-ui/react';
import { Box, Button, Text, grid, Flex,VStack} from '@chakra-ui/react';
import SpecialFood from './components/SpecialFood';
import GameBoard from './components/GameBoard';
import Snake from './components/Snake';
import GameUtils from'./u';

const gridSize = 20
const App = () => {
  const [snake, setSnake] = useState([{ x: 10, y: 10 }]);
  const [direction, setDirection] = useState('right');
  const [score, setScore] = useState(0);
  const [gameInterval, setGameInterval] = useState(null);
  const [gameSpeed, setGameSpeed] = useState(10);
  const [gameStarted, setGameStarted] = useState(false);
  const [highScore, setHighScore] = useState(0);
}   
useEffect(()=>{
  
})


export default App 
