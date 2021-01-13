import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';

export default function WithAuth({ children }) {
	const { currentUser } = useAuth();
	const router = useRouter();
	useEffect(() => {
		if (!currentUser) {
			router.push('/');
		}
	}, []);
	return <>{currentUser ? children : null}</>;
}
