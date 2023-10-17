import React from 'react';

const Navigation = ({ onRouteChange, signedIn }) => {
	if (signedIn) {
		return (
			<nav className='flex justify-end text-lg min-w-full text-slate-700 font-medium p-4 cursor-pointer transition hover:opacity-60'>
				<p onClick={() => onRouteChange('signIn')}>Sign Out</p>
			</nav>
		);
	} else {
		return (
			<nav className='flex justify-end gap-3 text-lg min-w-full text-slate-700 font-medium p-4'>
				<p
					onClick={() => onRouteChange('register')}
					className='cursor-pointer transition hover:opacity-60'
				>
					Sign up
				</p>
				<p
					onClick={() => onRouteChange('signIn')}
					className='cursor-pointer transition hover:opacity-60'
				>
					Sign in
				</p>
			</nav>
		);
	}
};

export default Navigation;
