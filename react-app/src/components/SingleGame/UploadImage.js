import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux"

const UploadImage = ({gameId}) => {
	const [image, setImage] = useState(null);
	const [imageLoading, setImageLoading] = useState(false);

	const history = useHistory(); // so that we can redirect after the image upload is successful

	const handleSubmit = async (e) => {
		e.preventDefault();
		const formData = new FormData();
		formData.append("image", image);
		formData.append("gameId", gameId);

		// aws uploads can be a bit slow—displaying
		// some sort of loading message is a good idea
		setImageLoading(true);

		const res = await fetch("/api/media", {
			method: "POST",
			body: formData,
		});
		if (res.ok) {
			await res.json();
			setImageLoading(false);
			// history.push("/media");
		} else {
			setImageLoading(false);
			// a real app would probably use more advanced
			// error handling
			console.log("error", res.errors);
		}
	};

	const updateImage = (e) => {
		const file = e.target.files[0];
		setImage(file);
	};

	return (
		<form onSubmit={handleSubmit}>
			<input type="file" accept="image/*" onChange={updateImage} />
			<button type="submit">Submit</button>
			{imageLoading && <p>Loading...</p>}
		</form>
	);
};

export default UploadImage;
