import React, { useRef, useState } from "react";
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
}) {
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

	//State

	return (
		<div className="player">
			<div className="time-control">
				<p>{getTime(songInfo.currentTime)}</p>
				<input
					max={songInfo.duration}
					min={0}
					value={songInfo.currentTime}
					type="range"
					onChange={dragHandler}
				/>
				<p>{getTime(songInfo.progress)}</p>
			</div>
			<div className="play-control">
				<FontAwesomeIcon className="skip-back" size="2x" icon={faAngleLeft} />
				<FontAwesomeIcon
					onClick={playSongHandler}
					className="play"
					size="2x"
					icon={isPlaying ? faPause : faPlay}
				/>

				<FontAwesomeIcon
					className="skip-forward"
					size="2x"
					icon={faAngleRight}
				/>
			</div>
		</div>
	);
}

export default Player;
