import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({ image, onImageLoad, box }) => {
	return (
		<div className='flex justify-center items-center m-auto relative'>
			<div className='mt-2'>
				<img
					id='inputImage'
					alt=''
					src={image}
					width='600px'
					height='auto'
					onLoad={onImageLoad}
				/>
				<div
					className='bounding-box'
					style={{
						top: box.topRow,
						right: box.rightCol,
						bottom: box.bottomRow,
						left: box.leftCol,
					}}
				></div>
			</div>
		</div>
	);
};

export default FaceRecognition;
