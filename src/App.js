import { useEffect, useState } from 'react';
import './App.css';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Logo from './components/Logo/Logo';
import Navigation from './components/Navigation/Navigation';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';

function App() {
	// image input state
	const [imageInput, setImageInput] = useState();

	// displayed image state (once it loads)
	const [displayedImage, setDisplayedImage] = useState();

	// face box state initialized at empty object
	const [box, setBox] = useState({});

	// clarifai response state once a response is processed
	const [clarifaiResponse, setClarifaiResponse] = useState(null);

	// routing state to move between screens
	const [route, setRoute] = useState('signIn');

	// state for whether user is signed in or not depending on route
	const [signedIn, setsignedIn] = useState(false);

	// state for signed in user
	const [user, setUser] = useState({
		id: '',
		name: '',
		email: '',
		joined: '',
	});

	// load sign in user into session
	const loadUser = (data) => {
		setUser({
			id: data.id,
			name: data.name,
			email: data.email,
			joined: data.joined,
		});
	};

	useEffect(() => {
		fetch('http://localhost:3000/')
			.then((response) => response.json())
			.then(console.log);
	}, []);

	// returning request options from clarifai given the image url
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

	// calculating the face location given some data, returning object with box margins
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

	// setting box to state given box properties
	const displayFaceBox = (box) => {
		console.log(box);
		setBox(box);
	};

	//  submit function, fetches request given the image, turns response to json, sets response, and sets displayed image
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

	// given a clarifai response is provided, display face box given the calculated face location from the clarifai response
	const onImageLoad = () => {
		if (clarifaiResponse) {
			displayFaceBox(calculateFaceLocation(clarifaiResponse));
		}
	};

	// given a new route, set the route and handle signedIn state value to true or false
	const onRouteChange = (route) => {
		setRoute(route);
		route === 'home' ? setsignedIn(true) : setsignedIn(false);
	};

	return (
		<div className='flex flex-col items-center min-h-screen'>
			<Navigation onRouteChange={onRouteChange} signedIn={signedIn} />
			{route === 'home' ? (
				<>
					<Logo />
					<ImageLinkForm setImageInput={setImageInput} onSubmit={onSubmit} />
					<FaceRecognition
						image={displayedImage}
						onImageLoad={onImageLoad}
						box={box}
					/>
				</>
			) : route === 'signIn' ? (
				<SignIn loadUser={loadUser} onRouteChange={onRouteChange} />
			) : (
				<Register loadUser={loadUser} onRouteChange={onRouteChange} />
			)}
		</div>
	);
}

export default App;
