import React from "react";

function GenresList({genres}) {
	return (
		<>
			{genres.map((genre, idx) =>
				idx === 0 ? (
					<React.Fragment key={`${idx}`}>{genre}</React.Fragment>
				) : (
					<React.Fragment key={`${idx}`}>{`, ${genre}`}</React.Fragment>
				)
			)}
		</>
	);
}

export default GenresList;
