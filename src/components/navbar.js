import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { faMusic } from "@fortawesome/free-solid-svg-icons";

function Navbar({ libraryStatus, setLibraryStatus }) {
	return (
		<nav>
			<h1>Music man</h1>
			<button onClick={() => setLibraryStatus(!libraryStatus)}>
				Library
				<FontAwesomeIcon icon={faMusic} />
			</button>
		</nav>
	);
}

export default Navbar;
