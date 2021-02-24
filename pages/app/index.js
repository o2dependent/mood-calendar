import Link from 'next/link';
import React, { useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';

export default function index() {
	// --- hooks ---
	const { currentUser } = useAuth();
	return (
		<div className='flex-grow flex justify-center items-center'>
			<p className='text-center text-gray-500 text-2xl'>
				Welcome {currentUser?.displayName}
			</p>
		</div>
	);
}
