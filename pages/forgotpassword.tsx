import React, { useRef, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import Link from 'next/link';
import Input from '../components/Styled/Input';
import HomeNav from '../components/layout/home/HomeNav';

export default function signup() {
	// --- hooks ---

	// --- state ---
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);
	const [success, setSuccess] = useState('');

	// --- refs ---
	const emailRef = useRef();

	// --- context ---
	const { resetPassword } = useAuth();

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
		const email: string = getValueFromRef(emailRef);

		setSuccess('');
		setError('');
		// sign up user
		try {
			setLoading(true);
			await resetPassword(email);
			setSuccess('Check your inbox for further instructions');
		} catch (err) {
			return setError('Failed to reset password');
		}
		setLoading(false);
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
					<h2 className='box-accent text-center w-48 mx-auto p-3 mb-10'>
						Forgot password
					</h2>
					{error && (
						<div
							className='border-red-300 text-red-dark pl-4 pr-8 py-3 rounded '
							role='alert'
						>
							<span className=''>{error}</span>
						</div>
					)}
					{success && (
						<div
							className='bg-green-300 text-green-dark pl-4 pr-8 py-3 rounded '
							role='alert'
						>
							<span className=''>{success}</span>
						</div>
					)}
					<div className='mb-3'>
						<label>Email</label>
						<Input ref={emailRef} type='email' required />
					</div>
					<button
						tabIndex={0}
						disabled={loading}
						type='submit'
						className='w-full text-white rounded text-xl p-3 flex  justify-center align-center bg-red-500 hover:bg-red-600'
					>
						Reset password
					</button>
				</form>
				<div>
					<p className='text-center text-sm text-gray-500 mt-4'>
						Have an account?{' '}
						<Link href='/login'>
							<a>Log in</a>
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
