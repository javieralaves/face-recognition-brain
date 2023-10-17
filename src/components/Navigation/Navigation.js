import React from 'react';

const Navigation = ({ onRouteChange }) => {
	return (
		<nav className='flex justify-end text-lg min-w-full text-slate-700 font-medium p-4 cursor-pointer transition hover:opacity-60'>
			<p onClick={() => onRouteChange('signIn')}>Sign Out</p>
		</nav>
	);
};

export default Navigation;
