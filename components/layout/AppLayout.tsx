import React, { useState } from 'react';
import AppNav from './AppNav';

// --- layout ---
export default function AppLayout({ children }) {
	// --- state ---
	const [isNavOpen, setIsNavOpen] = useState(false);
	// --- markup ---
	return (
		<div className='w-100 h-100'>
			<AppNav />
			<div className='container mx-auto'>{children}</div>
		</div>
	);
}
