import React from 'react';

const ImageLinkForm = ({ setImageInput, onSubmit }) => {
	return (
		<div className='text-lg'>
			<p>
				{'This magic brain will detect faces in your images. Give it a shot!'}
			</p>
			<div className='p-4'>
				<input
					type='text'
					className='w-96 rounded-md p-3'
					onChange={setImageInput}
				/>
				<button
					className='rounded-md font-medium py-3 px-4 ml-3 bg-slate-800 text-white transition-all duration-150 hover:bg-slate-900 hover:cursor-pointer'
					onClick={onSubmit}
				>
					Detect
				</button>
			</div>
		</div>
	);
};

export default ImageLinkForm;
