import React, { useState } from 'react';
import AppMenu from './AppMenu';
import AppNav from './AppNav';

// --- layout ---
export default function AppLayout({ children }) {
	// --- state ---
	const [isMenuOpen, setIsMenuOpen] = useState(true);
	// --- markup ---
	return (
		<div className='w-100 h-full flex flex-col'>
			<AppNav toggleMenu={() => setIsMenuOpen(!isMenuOpen)} />
			<div className={`content-wrapper ${isMenuOpen ? 'open' : ''}`}>
				<AppMenu isMenuOpen={isMenuOpen} />
				<div className='content-main'>{children}</div>
			</div>
		</div>
	);
}
