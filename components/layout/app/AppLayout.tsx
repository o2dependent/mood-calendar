import React, { useState } from 'react';
import ListMenu from './ListMenu';
import AppNav from './AppNav';

// --- layout ---
export default function AppLayout({ children }) {
	// --- state ---
	// --- markup ---
	return (
		<div className='w-100 h-full flex flex-col dark:text-gray-200 bg-gray-100 dark:bg-gray-800'>
			{/* <AppNav toggleMenu={() => setIsMenuOpen(!isMenuOpen)} /> */}
			<div className='content-wrapper'>
				<ListMenu />
				<div className='flex-grow flex'>{children}</div>
			</div>
		</div>
	);
}
