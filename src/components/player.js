import React, { useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faPlay,
	faAngleLeft,
	faAngleRight,
	faPause,
} from "@fortawesome/free-solid-svg-icons";

function Player({ currentSong, isPlaying, setIsPlaying }) {
	//Ref
	const audioRef = useRef(null);
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
	const timeUpdateHandler = (e) => {
		const current = e.target.currentTime;
		const duration = e.target.duration;
		const progress = duration - current;

		setSongInfo({ ...songInfo, currentTime: current, duration, progress });
	};
	const getTime = (time) => {
		return (
			Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
		);
	};

	//State
	const [songInfo, setSongInfo] = useState({
		currentTime: null,
		duration: null,
		progress: null,
	});
	return (
		<div className="player">
			<div className="time-control">
				<p>{getTime(songInfo.currentTime)}</p>
				<input type="range" />
				<p>{getTime(songInfo.progress)}</p>
			</div>
			<div className="play-control">
				<FontAwesomeIcon className="skip-back" size="2x" icon={faAngleLeft} />

				{isPlaying ? (
					<FontAwesomeIcon
						onClick={playSongHandler}
						className="play"
						size="2x"
						icon={faPause}
					/>
				) : (
					<FontAwesomeIcon
						onClick={playSongHandler}
						className="play"
						size="2x"
						icon={faPlay}
					/>
				)}
				<FontAwesomeIcon
					className="skip-forward"
					size="2x"
					icon={faAngleRight}
				/>
			</div>
			<audio
				onTimeUpdate={timeUpdateHandler}
				onLoadedMetadata={timeUpdateHandler}
				ref={audioRef}
				src={currentSong.audio}
			></audio>
		</div>
	);
}

export default Player;
