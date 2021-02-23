import Link from 'next/link';
import React, { useState } from 'react';
import Friends from './menuTabs/Friends';
import Lists from './menuTabs/Lists';

export default function ListMenu({}) {
	// --- hooks ---
	const [isMenuOpen, setIsMenuOpen] = useState(true);
	// --- functions ---

	return (
		<>
			<button
				className='fixed top-1 left-4 z-50'
				onClick={() => setIsMenuOpen(!isMenuOpen)}
			>
				{'<'}
			</button>
			<div className={`nav-menu-container ${isMenuOpen ? '' : 'closed'}`}>
				<div className={`nav-menu dark:bg-gray-800 overflow-y-scroll`}>
					<h2 className='text-3xl font-medium mb-4'>Lists</h2>
					<Lists />
				</div>
			</div>
		</>
	);
}
