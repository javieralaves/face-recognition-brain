import { useState } from 'react';
import './App.css';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Logo from './components/Logo/Logo';
import Navigation from './components/Navigation/Navigation';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';

function App() {
	const [imageInput, setImageInput] = useState();
	const [displayedImage, setDisplayedImage] = useState();

	const returnClarifaiRequest = (imageUrl) => {
		console.log('imageUrl:', imageUrl);

		const PAT = '3e980f0c21ab48c7b9d4dbfa6d89427d';
		const USER_ID = 'javieralaves';
		const APP_ID = 'smart-brain';
		const IMAGE_URL = imageUrl;

		const raw = JSON.stringify({
			user_app_id: {
				user_id: USER_ID,
				app_id: APP_ID,
			},
			inputs: [
				{
					data: {
						image: {
							url: IMAGE_URL,
						},
					},
				},
			],
		});

		const requestOptions = {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				Authorization: 'Key ' + PAT,
			},
			body: raw,
		};

		return requestOptions;
	};

	const onSubmit = () => {
		fetch(
			'https://api.clarifai.com/v2/models/face-detection/outputs',
			returnClarifaiRequest(imageInput)
		)
			.then((response) => response.json())
			.then((response) => {
				console.log('response:', response);
				console.log(
					'bounding box',
					response.outputs[0].data.regions[0].region_info.bounding_box
				);
				setDisplayedImage(imageInput);
			});
	};

	return (
		<div className='flex flex-col items-center min-h-screen'>
			<Navigation />
			<Logo />
			<ImageLinkForm setImageInput={setImageInput} onSubmit={onSubmit} />
			<FaceRecognition image={displayedImage} />
		</div>
	);
}

export default App;
