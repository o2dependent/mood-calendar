import React from 'react';
import { useAuth } from '../../../context/AuthContext';
import Link from 'next/link';

export default function HomeNav() {
	// --- hooks ---
	const { currentUser, logout } = useAuth();
	// --- log out ---
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
		<nav className='container mx-auto flex text-center py-2'>
			<div className='ml-auto flex'>
				{currentUser ? (
					<>
						<button
							className='w-24 mx-3 text-xl flex justify-center align-center p-2'
							onClick={handleLogout}
						>
							Logout
						</button>

						<NavLink isAction href='/app'>
							Dashboard
						</NavLink>
					</>
				) : (
					<>
						<NavLink href='/login'>Log in</NavLink>
						<NavLink isAction href='/signup'>
							Sign Up
						</NavLink>
					</>
				)}
			</div>
		</nav>
	);
}

const NavLink = ({ href, children, isAction, lg }) => {
	return (
		<div
			className={`min-w-24 mx-3 text-xl flex justify-center align-center ${
				isAction ? 'bg-red-500 rounded text-white' : ''
			} ${lg ? 'text-2xl' : ''}`}
		>
			<Link href={href}>
				<a className={`w-100 h-100 ${lg ? 'px-4 py-3' : 'p-2'}`}>{children}</a>
			</Link>
		</div>
	);
};
