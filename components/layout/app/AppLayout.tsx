import React, { useState } from 'react';
import ListMenu from './ListMenu';
import ContactMenu from './ContactMenu';
import AppNav from './AppNav';

// --- layout ---
export default function AppLayout({ children }) {
	// --- state ---
	const [isListMenuOpen, setIsListMenuOpen] = useState(true);
	const [isContactMenuOpen, setIsContactMenuOpen] = useState(false);
	// --- markup ---
	return (
		<div className='w-100 h-full flex flex-col dark:text-gray-200 bg-gray-100 dark:bg-gray-800'>
			<div className='content-wrapper'>
				<ListMenu
					isMenuOpen={isListMenuOpen}
					toggleMenu={() => setIsListMenuOpen(!isListMenuOpen)}
				/>
				<div
					className={`flex-grow flex max-h-screen overflow-hidden ${
						isListMenuOpen ? 'ml-72' : 'ml-0'
					}  ${isContactMenuOpen ? 'mr-72' : 'mr-0'}`}
					style={{ transition: 'margin 500ms ease' }}
				>
					{children}
				</div>
				<ContactMenu
					isMenuOpen={isContactMenuOpen}
					toggleMenu={() => setIsContactMenuOpen(!isContactMenuOpen)}
				/>
			</div>
		</div>
	);
}
