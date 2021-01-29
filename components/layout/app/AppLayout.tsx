import React, { useState } from 'react';
import AppMenu from './AppMenu';
import AppNav from './AppNav';

// --- layout ---
export default function AppLayout({ children }) {
	// --- state ---
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	// --- markup ---
	return (
		<div className='w-100 h-full flex flex-col dark:text-gray-200 bg-gray-100 dark:bg-gray-800'>
			<AppNav toggleMenu={() => setIsMenuOpen(!isMenuOpen)} />
			<div className={`content-wrapper ${isMenuOpen ? 'open' : ''}`}>
				<AppMenu
					isMenuOpen={isMenuOpen}
					closeMenu={() => setIsMenuOpen(false)}
				/>
				<div className='pt-10 w-full flex'>{children}</div>
			</div>
		</div>
	);
}
