import React from 'react';
import { Box } from '@chakra-ui/react';

const Snake = ({ snake,map }) => {
  return (
    <>
      {snake.map((segment, index) => (
        <Box
          key={index}
          bg="green"
          border="1px solid darkgreen"
          gridColumn={segment.x}
          gridRow={segment.y}
          width="100%"
          height="100%"
        />
      ))}
    </>
  );
};

export default Snake;
