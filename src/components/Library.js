import React from "react";
import LibrarySong from "./LibrarySong";
function Library({
	songs,
	isPlaying,
	setcurrentSong,
	setSongs,
	audioRef,
	libraryStatus,
	setLibraryStatus,
}) {
	return (
		<div className={`library ${libraryStatus ? "active-library" : null}`}>
			<h2>Library</h2>
			<div className="library-songs">
				{songs.map((song) => (
					<LibrarySong
						song={song}
						songs={songs}
						setcurrentSong={setcurrentSong}
						key={song.id}
						audioRef={audioRef}
						isPlaying={isPlaying}
						setSongs={setSongs}
						libraryStatus={libraryStatus}
						setLibraryStatus={setLibraryStatus}
					/>
				))}
			</div>
		</div>
	);
}

export default Library;
