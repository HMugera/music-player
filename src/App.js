import React, { useState } from "react";
import "./styles/app.scss";

//import data
import data from "./songs-data/data";

//Components
import Player from "./components/player";
import Song from "./components/song";
function App() {
	//state
	const [songs, setSongs] = useState(data());
	return (
		<div>
			<Song />
			<Player />
			{console.log(songs)}
		</div>
	);
}

export default App;
