
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { ChakraProvider } from '@chakra-ui/react'
import { StrictMode } from 'react'

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <ChakraProvider>

    <App title="SnakeGame" snakeProp={[{ x: 10, y: 10 }]} />

  </ChakraProvider>
</StrictMode>
)
