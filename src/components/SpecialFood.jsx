import React from 'react';
import { Box } from '@chakra-ui/react';

const SpecialFood = ({ specialFood }) => {
  return (
    <Box
      bg="red "
      border="2px solid red"
      gridColumn={specialFood.x}
      gridRow={specialFood.y}
      width="20px"
      height="20px"
    />
  );
};

export default SpecialFood;
