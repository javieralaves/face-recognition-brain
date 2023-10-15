import React from 'react';

const FaceRecognition = ({ image }) => {
	return (
		<div className='flex justify-center'>
			<img src={image} alt='' className='w-1/2 h-auto' />
		</div>
	);
};

export default FaceRecognition;
