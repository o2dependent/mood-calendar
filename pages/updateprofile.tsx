import React, { useRef, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/router';
import Link from 'next/link';
import WithAuth from '../components/middleware/withAuth';

export default function signup() {
	// --- hooks ---
	const router = useRouter();

	// --- state ---
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);

	// --- refs ---
	const emailRef = useRef();
	const passwordRef = useRef();
	const passwordConfirmRef = useRef();

	// --- context ---
	const { updateEmail, updatePassword, currentUser } = useAuth();

	// --- funcitons ---
	const handleSubmit = (e) => {
		e.preventDefault();
		// -- variables --
		const password: string = passwordRef?.current?.value;
		const passwordConfirm: string = passwordConfirmRef?.current?.value;
		const email: string = emailRef?.current?.value;
		// return if password do not meet
		if (password !== passwordConfirm) {
			return setError('Passwords do not match');
		}

		const promises = [];
		if (email !== currentUser.email) {
			promises.push(updateEmail(email));
		}
		if (password) {
			promises.push(updatePassword(password));
		}
		Promise.all(promises)
			.then(() => {
				router.push('/app');
			})
			.catch(() => {
				setError('Failed to update account');
			})
			.finally(() => setLoading(false));
	};

	// --- markup ---
	return (
		<WithAuth>
			<div className='container mx-auto h-full flex flex-col justify-center align-center'>
				<form
					onSubmit={handleSubmit}
					className='flex flex-col bg-blue-100 rounded p-8 mx-auto w-5/6 shadow max-w-xl border border-blue-300'
				>
					<h2 className='text-center font-semibold text-3xl lg:text-4xl text-gray-800 mb-10'>
						Update Profile
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
							defaultValue={currentUser.email}
							required
						/>
					</div>
					<div className='mb-3'>
						<label>Password</label>
						<input
							ref={passwordRef}
							className='block border border-grey-light w-full p-3 rounded mb-4 outline-none'
							type='password'
							placeholder='Leave blank to keep current password'
						/>
					</div>
					<div className='mb-4'>
						<label>Password Confirmation</label>
						<input
							ref={passwordConfirmRef}
							className='block border border-grey-light w-full p-3 rounded mb-4 outline-none'
							type='password'
							placeholder='Leave blank to keep current password'
						/>
					</div>
					<button
						disabled={loading}
						type='submit'
						className='font-bold py-2 px-4 rounded bg-blue-400 hover:bg-blue-500 text-white hover:bg-transparent'
					>
						Submit
					</button>
				</form>
				<div>
					<p className='text-center text-gray-500 mt-4'>
						<Link href='/app'>
							<a>Cancel</a>
						</Link>
					</p>
				</div>
			</div>
		</WithAuth>
	);
}
