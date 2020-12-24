import React, { useState } from "react";
import "./styles/app.scss";

//import data
import data from "./songs-data/data";

//Components
import Player from "./components/player";
import Song from "./components/song";
import Library from "./components/Library";
function App() {
	//state
	const [songs, setSongs] = useState(data());
	const [currentSong, setcurrentSong] = useState(songs[0]);
	const [isPlaying, setIsPlaying] = useState(false);

	return (
		<div>
			<Song currentSong={currentSong} />
			<Player
				currentSong={currentSong}
				setIsPlaying={setIsPlaying}
				isPlaying={isPlaying}
			/>
			<Library songs={songs} />
		</div>
	);
}

export default App;
