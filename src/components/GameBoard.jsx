import React from "react";
import { Box, Center } from "@chakra-ui/react";
import Snake from "./Snake";
import SpecialFood from "./SpecialFood";

export default function  GameBoard({ snake, specialFood }){
    return (
        <Box
        display="flex"                // Enable flexbox
            justifyContent="center"       // Center horizontally
            alignItems="center"           // Center vertically
            height="100vh"                // Full viewport height
            bg="gray"                // Optional: background color for contrast
        >
        <Box
            id="GameBoard"
            width="400px"
            height="400px"
            display="grid"
            gridTemplateColumns={`repeat(${20}, 1fr)`}
            gridTemplateRows={`repeat(${20}, 1fr)`}     // 20 is the gridSize
            border="10px solid black"
            bg="lightyellow"
            marginInline="auto"
            marginBlock="1.5rem"
        >
            <Snake snake={snake} />
            <SpecialFood specialFood={specialFood} />
            {isGameOver && <GameOver />}

        </Box>
        </Box>
    );
};


