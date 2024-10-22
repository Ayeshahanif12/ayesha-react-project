import  {useState,useEffect}  from 'react'
import { ChakraProvider } from '@chakra-ui/react';
import { Box,Button,Text,grid,Flex } from '@chakra-ui/react';
import SpecialFood from './components/SpecialFood';
import GameOver from './components/GameOver';

const gridSize = 20 
const SnakeGame = ()=>{
 const [snake,setSnake] = useState([{ x: 10, y: 10 }]);
const[direction,setDirection] = useState('right');
const [score,setScore] = useState(0);
const [gameInterval,setGameInterval]=useState;
const [gameSpeed,setGameSpeed] = useState(10);
const [gameStarted,setGameStarted] = useState(false);
}
 

