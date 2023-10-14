import './App.css';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Logo from './components/Logo/Logo';
import Navigation from './components/Navigation/Navigation';

function App() {
	return (
		<div className='flex flex-col items-center min-h-screen'>
			<Navigation />
			<Logo />
			<ImageLinkForm />
			{/* <FaceRecognition /> */}
		</div>
	);
}

export default App;
