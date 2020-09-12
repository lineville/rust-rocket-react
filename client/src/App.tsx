import React from 'react'
import Puppies from './components/PuppiesTable'
import CardList from './components/CardList'
import { Cards } from './constants/Cards'
import './App.css'

function App() {
  return (
    <div className="App">
      <Puppies />
      <CardList cards={Cards} />
    </div>
  )
}

export default App
