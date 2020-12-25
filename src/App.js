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
		songProgress: 0,
		songProgressPercentage: 0,
	});
	const [libraryStatus, setLibraryStatus] = useState(false);
	const timeUpdateHandler = (e) => {
		const current = e.target.currentTime;
		const duration = e.target.duration;
		//calculate song progress
		const songProgress = duration - current;
		//calculate percentage
		const roundedSongDuration = Math.round(duration);
		const roundedSongCurrentTime = Math.round(current);
		const animation = Math.round(
			(roundedSongCurrentTime / roundedSongDuration) * 100
		);

		setSongInfo({
			...songInfo,
			currentTime: current,
			duration,
			songProgress,
			songProgressPercentage: animation,
		});
	};
	//auto skip song functionality
	const songEndHandler = async () => {
		let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
		await setcurrentSong(songs[(currentIndex + 1) % songs.length]);
		if (isPlaying) audioRef.current.play();
	};
	return (
		<div>
			<Navbar
				libraryStatus={libraryStatus}
				setLibraryStatus={setLibraryStatus}
			/>

			<Song currentSong={currentSong} isPlaying={isPlaying} />
			<Player
				audioRef={audioRef}
				currentSong={currentSong}
				setIsPlaying={setIsPlaying}
				isPlaying={isPlaying}
				songInfo={songInfo}
				setSongInfo={setSongInfo}
				songs={songs}
				setSongs={setSongs}
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
				onEnded={songEndHandler}
			></audio>
		</div>
	);
}

export default App;
