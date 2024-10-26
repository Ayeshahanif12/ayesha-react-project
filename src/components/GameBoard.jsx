import React from "react";
import { Box } from "@chakra-ui/react";
import Snake from "./Snake";
import SpecialFood from "./SpecialFood";

const GameBoard = () => {
    return (
        <Box
            id="GameBoard"
            width="400px"
            height="400px"
            display="grid"
            gridTemplateColumns="{`repeat(${gridSize},1fr`)}" /* 20 rows */
            gridTemplateRows="{`repeat(${gridSize},1fr`)}" /* 20 rows */
            border="10px solid black"
            bg="white" /* Background color of the board */
        >
            <Snake snake={Snake} />
            <SpecialFood specialFood={SpecialFood} />

        </Box>
    )
}
export default GameBoard