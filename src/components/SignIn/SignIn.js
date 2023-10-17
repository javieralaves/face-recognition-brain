import React from 'react';

const SignIn = () => {
	return (
		<div className=''>
			<div className='max-w-lg w-full'>
				<form className='bg-white p-6 rounded-md shadow-md'>
					<fieldset id='sign_up' className='mb-4'>
						<legend className='text-center text-2xl font-semibold text-gray-900'>
							Sign in
						</legend>
						<div className='mt-4'>
							<label htmlFor='email-address' className='sr-only'>
								Email
							</label>
							<input
								type='email'
								name='email-address'
								id='email-address'
								className='appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
								placeholder='Email address'
							/>
						</div>
						<div className='mt-4'>
							<label htmlFor='password' className='sr-only'>
								Password
							</label>
							<input
								type='password'
								name='password'
								id='password'
								className='appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
								placeholder='Password'
							/>
						</div>
					</fieldset>
					<div>
						<input
							type='submit'
							value='Sign in'
							className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 cursor-pointer hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
						/>
					</div>
					<div className='mt-4 text-center text-sm'>
						<a href='/' className='text-indigo-600 hover:text-indigo-500'>
							Register
						</a>
					</div>
				</form>
			</div>
		</div>
	);
};

export default SignIn;