import { useState } from 'react';
import './App.css';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Logo from './components/Logo/Logo';
import Navigation from './components/Navigation/Navigation';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';

function App() {
	const [imageInput, setImageInput] = useState();
	const [displayedImage, setDisplayedImage] = useState();
	const [box, setBox] = useState({});
	const [clarifaiResponse, setClarifaiResponse] = useState(null);

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

	const calculateFaceLocation = (data) => {
		const clarifaiFace =
			data.outputs[0].data.regions[0].region_info.bounding_box;

		const image = document.getElementById('inputImage');
		const width = Number(image.width);
		const height = Number(image.height);
		console.log('image dimensions:', width, height);
		console.log(
			clarifaiFace.left_col,
			clarifaiFace.top_row,
			clarifaiFace.right_col,
			clarifaiFace.bottom_row
		);
		return {
			leftCol: clarifaiFace.left_col * width,
			topRow: clarifaiFace.top_row * height,
			rightCol: width - clarifaiFace.right_col * width,
			bottomRow: height - clarifaiFace.bottom_row * height,
		};
	};

	const displayFaceBox = (box) => {
		console.log(box);
		setBox(box);
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
				setClarifaiResponse(response);
				setDisplayedImage(imageInput);
			});
	};

	const onImageLoad = () => {
		if (clarifaiResponse) {
			displayFaceBox(calculateFaceLocation(clarifaiResponse));
		}
	};

	return (
		<div className='flex flex-col items-center min-h-screen'>
			<Navigation />
			<Logo />
			<ImageLinkForm setImageInput={setImageInput} onSubmit={onSubmit} />
			<FaceRecognition image={displayedImage} onImageLoad={onImageLoad} />
		</div>
	);
}

export default App;
