import Link from 'next/link';
import React, { useState } from 'react';
import Friends from './Friends';

export default function AppMenu({ isMenuOpen, closeMenu }) {
	// --- hooks ---
	const [currentTab, setCurrentTab] = useState<'Recent' | 'Friends'>('Recent');

	// --- functions ---
	const renderTab = () => {
		switch (currentTab) {
			case 'Recent':
				return <div></div>;
			case 'Friends':
				return <Friends closeMenu={closeMenu} />;
		}
	};
	return (
		<div className={`nav-menu ${isMenuOpen ? 'open' : ''}`}>
			<div className='relative w-full md:h-9 h-12 mb-4'>
				<div className='inbox-tab__title bg-gray-200 rounded'>
					<p className='cursor-pointer' onClick={() => setCurrentTab('Recent')}>
						Recent
					</p>
					<p
						className='cursor-pointer'
						onClick={() => setCurrentTab('Friends')}
					>
						Friends
					</p>
				</div>
				<div
					className={`inbox-tab__title ${currentTab} text-white font-medium bg-red-500 rounded`}
				>
					<p className='cursor-default'>Recent</p>
					<p className='cursor-default'>Friends</p>
				</div>
			</div>
			<div className='rounded overflow-hidden'>{renderTab()}</div>
		</div>
	);
}
