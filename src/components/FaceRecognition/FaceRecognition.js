import React from 'react';

const FaceRecognition = ({ image, onImageLoad }) => {
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
			</div>
		</div>
	);
};

export default FaceRecognition;
