import Link from 'next/link';
import React, { useState } from 'react';
import Lists from './menuTabs/Lists';

export default function ListMenu({ isMenuOpen, toggleMenu }) {
	// --- hooks ---
	// --- functions ---

	return (
		<>
			<button className='fixed top-1 left-4 z-50' onClick={toggleMenu}>
				{'<'}
			</button>
			<div
				className={`md:pt-9 bg-gray-50 dark:bg-gray-700 md:px-4 md:w-72 w-full shadow-md dark:shadow-md-dark p-4 h-full fixed top-0 ${
					isMenuOpen ? 'left-0' : '-left-72'
				}`}
				style={{
					transition: 'left 500ms ease',
				}}
			>
				<h2 className='text-3xl font-medium mb-4'>Lists</h2>
				<Lists />
			</div>
		</>
	);
}
