import React, { useRef, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Input from '../components/Styled/Input';
import HomeNav from '../components/layout/home/HomeNav';

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
		// ts validation
		const getValueFromRef = (ref) => {
			const current = ref.current;
			if (current) {
				return current.value;
			}
		};
		// -- variables --
		const password: string = getValueFromRef(passwordRef);
		const email: string = getValueFromRef(emailRef);

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
		<>
			<HomeNav />
			<div className='container mx-auto mt-10 flex flex-col justify-center align-center'>
				<form
					onSubmit={handleSubmit}
					className='flex flex-col p-4 md:p-8 mx-auto w-full md:w-5/6 max-w-xl'
				>
					<h2 className='box-accent text-center w-32 mx-auto p-3 mb-10'>
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
						<Input ref={emailRef} type='email' required />
					</div>
					<div className='mb-3'>
						<label>Password</label>
						<Input ref={passwordRef} type='password' required />
					</div>
					<button
						tabIndex={0}
						disabled={loading}
						type='submit'
						className='w-full text-white rounded text-xl p-3 flex  justify-center align-center bg-red-500 hover:bg-red-600'
					>
						Submit
					</button>
				</form>
				<div>
					<p className='text-center text-sm text-gray-500 mt-4'>
						Forgot password?{' '}
						<Link href='/forgotpassword'>
							<a>Reset password</a>
						</Link>
					</p>
				</div>
				<div>
					<p className='text-center text-sm text-gray-500 mt-2'>
						Need an account?{' '}
						<Link href='/signup'>
							<a>Sign up</a>
						</Link>
					</p>
				</div>
			</div>
		</>
	);
}
