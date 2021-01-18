import { useRouter } from 'next/router';
import React from 'react';
import { useAuth } from '../../../context/AuthContext';

export default function AppNav({ toggleMenu }) {
	const { currentUser, logout } = useAuth();
	const router = useRouter();

	const handleLogout = async () => {
		try {
			await logout();
			router.push('/');
			return;
		} catch (err) {
			console.error(err);
			return;
		}
	};

	return (
		<div className='bg-red-500 w-full h-11'>
			<nav className='mx-10 w-100 h-full flex justify-between items-center'>
				<div
					className='h-full flex justify-center items-center cursor-pointer'
					onClick={toggleMenu}
				>
					<svg viewBox='0 0 24 18' width='24' height='18'>
						<rect fill='white' width='24' height='2'></rect>
						<rect fill='white' y='8' width='24' height='2'></rect>
						<rect fill='white' y='16' width='24' height='2'></rect>
					</svg>
				</div>
				<div className='text-white flex'>
					<span className='ml-auto'>{currentUser.email}</span>
					<div className='rounded-full ml-1.5 h-7 w-7 overflow-hidden border-2 text-center bg-blue-500 bg-opacity-50 border-white flex items-center justify-center'>
						{currentUser.photoURL ? (
							<img src={currentUser.photoURL} />
						) : (
							<div>{currentUser.email[0]}</div>
						)}
					</div>
				</div>
				{/* <button className='h-full' onClick={handleLogout}>
					Logout
				</button> */}
			</nav>
		</div>
	);
}
