import Link from 'next/link';
import React, { useState } from 'react';
import Lists from './menuTabs/Lists';

export default function ListMenu({ isMenuOpen, toggleMenu }) {
	// --- hooks ---
	// --- functions ---

	return (
		<>
			<button
				className='fixed top-3 left-4 z-50 focus:outline-none'
				onClick={toggleMenu}
			>
				<svg
					className='transition-transform'
					style={{
						transform: `rotate(${isMenuOpen ? '-90deg' : '90deg'})`,
						transitionDuration: '500ms',
					}}
					xmlns='http://www.w3.org/2000/svg'
					width='16'
					height='16'
					viewBox='0 0 24 24'
				>
					<path d='M24 22h-24l12-20z' />
				</svg>
			</button>
			<div
				className={`md:pt-9 bg-gray-50 dark:bg-gray-700 md:px-4 md:w-72 w-full shadow-md dark:shadow-md-dark p-4 h-full fixed top-0 ${
					isMenuOpen ? 'left-0 shadow-xl' : '-left-72 shadow-none'
				}`}
				style={{
					transition: 'left 500ms ease, box-shadow 200ms 200ms ease',
				}}
			>
				<h2 className='text-3xl font-medium mb-4'>Lists</h2>
				<Lists />
			</div>
		</>
	);
}
