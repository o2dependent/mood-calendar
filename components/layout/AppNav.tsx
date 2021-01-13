import { useRouter } from 'next/router';
import React from 'react';
import { useAuth } from '../../context/AuthContext';

export default function AppNav() {
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
		<nav>
			<span>{currentUser.email}</span>
			<button onClick={handleLogout}>Logout</button>
		</nav>
	);
}
