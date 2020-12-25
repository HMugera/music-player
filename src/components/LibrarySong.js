import React from "react";

function LibrarySong({
	song,
	songs,
	audioRef,
	setcurrentSong,
	setSongs,
	isPlaying,
}) {
	const songSelecthandler = () => {
		const selectedSong = song;
		console.log(selectedSong);
		setcurrentSong(selectedSong);
		//Add active state
		const newSongs = songs.map((song) => {
			if (song === selectedSong) {
				return {
					...song,
					active: true,
				};
			} else {
				return {
					...song,
					active: false,
				};
			}
		});
		setSongs(newSongs);
		//check if song is playing
		if (isPlaying) {
			const playPromise = audioRef.current.play();
			if (playPromise !== undefined) {
				playPromise.then((audio) => {
					audioRef.current.play();
				});
			}
		}
	};
	return (
		<div
			className={`library-song ${song.active ? "selected" : ""}`}
			onClick={songSelecthandler}
		>
			<img src={song.cover} alt={song.name} />
			<div className="song-description">
				<h3>{song.name}</h3>
				<h4>{song.artist}</h4>
			</div>
		</div>
	);
}

export default LibrarySong;
