import React from 'react'
import Puppies from './components/PuppiesTable'
import './App.css'
import { ThemeProvider } from '@material-ui/core'
import theme from './theme'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Puppies />
      </div>
    </ThemeProvider>
  )
}

export default App
