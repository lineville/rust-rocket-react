import React from 'react'
import Puppies from './components/PuppiesTable'
import CardList from './components/CardList'
import { cards } from './constants/cards'
import './App.css'

function App() {
  return (
    <div className="App">
      <Puppies />
      <CardList cards={[...cards]} />
    </div>
  )
}

export default App
