import React, { useRef, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function signup() {
	// --- hooks ---
	const router = useRouter();

	// --- state ---
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);

	// --- refs ---
	const emailRef = useRef();
	const passwordRef = useRef();

	// --- context ---
	const { login } = useAuth();

	// --- funcitons ---
	const handleSubmit = async (e) => {
		e.preventDefault();
		// -- variables --
		const password: string = passwordRef?.current?.value;
		const email: string = emailRef?.current?.value;

		// sign up user
		try {
			setLoading(true);
			await login(email, password);
		} catch (err) {
			return setError('Failed to log in');
		}
		setLoading(false);
		router.push('/app');
	};

	// --- markup ---
	return (
		<div className='container mx-auto h-full flex flex-col justify-center align-center'>
			<form
				onSubmit={handleSubmit}
				className='flex flex-col bg-blue-100 rounded p-8 mx-auto w-5/6 shadow max-w-xl border border-blue-300'
			>
				<h2 className='text-center font-semibold text-3xl lg:text-4xl text-gray-800 mb-10'>
					Log in
				</h2>
				{error && (
					<div
						className='bg-red-200 border border-red-300 text-red-dark pl-4 pr-8 py-3 rounded relative'
						role='alert'
					>
						<span className=''>{error}</span>
					</div>
				)}
				<div className='mb-3'>
					<label>Email</label>
					<input
						ref={emailRef}
						className='block border border-grey-light w-full p-3 rounded mb-4 outline-none'
						type='email'
						required
					/>
				</div>
				<div className='mb-3'>
					<label>Password</label>
					<input
						ref={passwordRef}
						className='block border border-grey-light w-full p-3 rounded mb-4 outline-none'
						type='password'
						required
					/>
				</div>
				<button
					disabled={loading}
					type='submit'
					className='font-bold py-2 px-4 rounded bg-blue-400 hover:bg-blue-500 text-white hover:bg-transparent'
				>
					Submit
				</button>
				<div>
					<Link href='/forgotpassword'>
						<a>Forgot password?</a>
					</Link>
				</div>
			</form>
			<div>
				<p className='text-center text-gray-500 mt-4'>
					Need an account?{' '}
					<Link href='/signup'>
						<a>Sign up</a>
					</Link>
				</p>
			</div>
		</div>
	);
}
