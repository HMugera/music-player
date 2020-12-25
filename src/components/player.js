import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faPlay,
	faAngleLeft,
	faAngleRight,
	faPause,
} from "@fortawesome/free-solid-svg-icons";

function Player({
	currentSong,
	setSongInfo,
	songInfo,
	audioRef,
	isPlaying,
	setIsPlaying,
	songs,
	setSongs,
	setcurrentSong,
}) {
	//Use effect
	useEffect(() => {
		const newSongs = songs.map((song) => {
			if (song === currentSong) {
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
	}, [currentSong]);
	//Event Hnadlers
	const playSongHandler = () => {
		if (isPlaying) {
			audioRef.current.pause();
			setIsPlaying(!isPlaying);
		} else {
			audioRef.current.play();
			setIsPlaying(!isPlaying);
		}
	};

	const getTime = (time) => {
		return (
			Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
		);
	};
	const dragHandler = (e) => {
		audioRef.current.currentTime = e.target.value;
		setSongInfo({ ...songInfo, currentTime: e.target.value });
	};

	//skipforwardand back
	const skipTrackHandler = async (direction) => {
		let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
		if (direction === "skip-forward") {
			await setcurrentSong(songs[(currentIndex + 1) % songs.length]);
		} else if (direction === "skip-back") {
			if ((currentIndex - 1) % songs.length === -1) {
				await setcurrentSong(songs[songs.length - 1]);
				if (isPlaying) audioRef.current.play();
				return;
			}
			await setcurrentSong(songs[(currentIndex - 1) % songs.length]);
		}
		if (isPlaying) audioRef.current.play();
	};
	//Add animation styles
	const trackAnimation = {
		transform: `translateX(${songInfo.songProgressPercentage}%)`,
	};
	return (
		<div className="player">
			<div className="time-control">
				<p>{getTime(songInfo.currentTime)}</p>
				<div
					style={{
						background: `linear-gradient(to right,${currentSong.color[0]},${currentSong.color[1]})`,
					}}
					className="track"
				>
					<input
						max={songInfo.duration || 0}
						min={0}
						value={songInfo.currentTime}
						type="range"
						onChange={dragHandler}
					/>
					<div style={trackAnimation} className="animate-track"></div>
				</div>

				<p>{songInfo.duration ? getTime(songInfo.songProgress) : "0:00"}</p>
			</div>
			<div className="play-control">
				<FontAwesomeIcon
					onClick={() => {
						skipTrackHandler("skip-back");
					}}
					className="skip-back"
					size="2x"
					icon={faAngleLeft}
				/>
				<FontAwesomeIcon
					onClick={playSongHandler}
					className="play"
					size="2x"
					icon={isPlaying ? faPause : faPlay}
				/>

				<FontAwesomeIcon
					onClick={() => {
						skipTrackHandler("skip-forward");
					}}
					className="skip-forward"
					size="2x"
					icon={faAngleRight}
				/>
			</div>
		</div>
	);
}

export default Player;
