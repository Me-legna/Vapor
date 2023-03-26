import React from "react";

function GenresList({genres}) {
	return (
		<>
			{genres.map((genre, idx) =>
				idx === 0 ? (
					<div key={`${idx}`}>{genre}</div>
				) : (
					<div key={`${idx}`}>{`, ${genre}`}</div>
				)
			)}
		</>
	);
}

export default GenresList;
