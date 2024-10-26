import React from "react";
const generateFood = ()=>{

    let newFood;
    do {
        
        newFood = {
            x: Math.floor(Math.random() * gridSize) + 1,
            y: Math.floor(Math.random() * gridSize) + 1,
        };
        return newFood;
                
            } while (snake.some(segment => segment.x === newFood.x && segment.y === newFood.y));
        
            return newFood;
        }
       