import Link from 'next/link';
import React, { useState } from 'react';
import Friends from './menuTabs/Friends';

export default function ContactMenu({ isMenuOpen, toggleMenu }) {
	// --- hooks ---
	// --- functions ---

	return (
		<>
			<button className='fixed top-1 right-4 z-50' onClick={toggleMenu}>
				{'<'}
			</button>
			<div
				className={`md:pt-9 bg-gray-50 dark:bg-gray-700 md:px-4 md:w-72 w-full shadow-md dark:shadow-md-dark p-4 h-full fixed top-0 ${
					isMenuOpen ? 'right-0' : '-right-72'
				}`}
				style={{
					transition: 'right 500ms ease',
				}}
			>
				<h2 className='text-3xl font-medium mb-4'>Contacts</h2>
				<Friends />
			</div>
		</>
	);
}
