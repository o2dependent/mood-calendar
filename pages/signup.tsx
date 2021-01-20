import React, { useRef, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Input from '../components/Styled/Input';
import HomeNav from '../components/layout/home/HomeNav';
import { getValueFromRef } from '../helpers/getValueFromRef';

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
	const { signup } = useAuth();

	// --- funcitons ---
	const handleSubmit = async (e) => {
		e.preventDefault();
		// -- variables --
		const password: string = getValueFromRef(passwordRef);
		const passwordConfirm: string = getValueFromRef(passwordConfirmRef);
		const email: string = getValueFromRef(emailRef);
		// return if password do not meet
		if (password !== passwordConfirm) {
			return setError('Passwords do not match');
		}
		// sign up user
		try {
			setLoading(true);
			await signup(email, password);
		} catch (err) {
			return setError('Failed to create new account');
		}
		setLoading(false);
		router.push('/app');
	};

	// --- markup ---
	return (
		<>
			<HomeNav />
			<div className='container mx-auto mt-10 flex flex-col justify-center align-center'>
				<form
					onSubmit={handleSubmit}
					className='flex flex-col p-4 md:p-8 mx-auto w-full md:w-5/6 max-w-xl'
				>
					<h2 className='box-accent text-center w-32 mx-auto p-3 mb-10'>
						Sign up
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
						<Input ref={emailRef} type='email' required />
					</div>
					<div className='mb-3'>
						<label>Password</label>
						<Input ref={passwordRef} type='password' required />
					</div>
					<div className='mb-3'>
						<label>Confirm Password</label>
						<Input ref={passwordConfirmRef} type='password' required />
					</div>
					<button
						tabIndex={0}
						disabled={loading}
						type='submit'
						className='w-full text-white rounded text-xl p-3 flex  justify-center align-center bg-red-500 hover:bg-red-600'
					>
						Sign up
					</button>
				</form>
				<div>
					<p className='text-center text-sm text-gray-500 mt-2'>
						Have an account?{' '}
						<Link href='/login'>
							<a>Log in</a>
						</Link>
					</p>
				</div>
			</div>
		</>
	);
}
