import React from "react";
import { Box } from "@chakra-ui/react";

const Snake = ({ snake }) => {
    return (
        <>
            {snake.map((segment, index) => (
                <Box
                    key={index}
                    bg={"green"}
                    border="1px solid darkgreen"
                    gridRow="segment.y"
                    gridColumn="segment.x"
                    width="100%"
                    height="100%"
                />
            ))}


        </>
    )
}
export default Snake