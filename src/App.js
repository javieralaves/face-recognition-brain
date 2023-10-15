import { useState } from 'react';
import './App.css';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Logo from './components/Logo/Logo';
import Navigation from './components/Navigation/Navigation';

function App() {
	const [imageInput, setImageInput] = useState();

	const onSubmit = () => {
		console.log('click');
	};

	return (
		<div className='flex flex-col items-center min-h-screen'>
			<Navigation />
			<Logo />
			<ImageLinkForm onChange={setImageInput} onSubmit={onSubmit} />
			{/* <FaceRecognition /> */}
		</div>
	);
}

export default App;
