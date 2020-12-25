import React, { useState, useRef } from "react";
import "./styles/app.scss";

//import data
import data from "./songs-data/data";

//Components
import Player from "./components/player";
import Song from "./components/song";
import Library from "./components/Library";
import Navbar from "./components/navbar";
function App() {
	//Ref
	const audioRef = useRef(null);
	//state
	const [songs, setSongs] = useState(data());
	const [currentSong, setcurrentSong] = useState(songs[0]);
	const [isPlaying, setIsPlaying] = useState(false);
	const [songInfo, setSongInfo] = useState({
		currentTime: 0,
		duration: 0,
		progress: 0,
	});
	const [libraryStatus, setLibraryStatus] = useState(false);
	const timeUpdateHandler = (e) => {
		const current = e.target.currentTime;
		const duration = e.target.duration;
		const progress = duration - current;

		setSongInfo({ ...songInfo, currentTime: current, duration, progress });
	};
	return (
		<div>
			<Navbar
				libraryStatus={libraryStatus}
				setLibraryStatus={setLibraryStatus}
			/>

			<Song currentSong={currentSong} />
			<Player
				audioRef={audioRef}
				currentSong={currentSong}
				setIsPlaying={setIsPlaying}
				isPlaying={isPlaying}
				songInfo={songInfo}
				setSongInfo={setSongInfo}
				songs={songs}
				setcurrentSong={setcurrentSong}
			/>

			<Library
				libraryStatus={libraryStatus}
				audioRef={audioRef}
				songs={songs}
				setSongs={setSongs}
				setcurrentSong={setcurrentSong}
				isPlaying={isPlaying}
			/>

			<audio
				onTimeUpdate={timeUpdateHandler}
				onLoadedMetadata={timeUpdateHandler}
				ref={audioRef}
				src={currentSong.audio}
			></audio>
		</div>
	);
}

export default App;
