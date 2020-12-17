import React from 'react'
import './styles/app.scss'
import data from './songs-data/data'

//Components
import Player from './components/player';
import Song from "./components/song"
function App() {
  return( <div>
    <Song/>
    <Player/>
  </div>)
}

export default App;
