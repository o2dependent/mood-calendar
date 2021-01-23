import Link from 'next/link';
import React, { useState } from 'react';
import Friends from '../../app/menu_tabs/Friends';
import Lists from '../../app/menu_tabs/Lists';

export default function AppMenu({ isMenuOpen, closeMenu }) {
	// --- hooks ---
	const [currentTab, setCurrentTab] = useState<'Social' | 'Lists'>('Lists');

	// --- functions ---
	const renderTab = () => {
		switch (currentTab) {
			case 'Lists':
				return <Lists closeMenu={closeMenu} />;
			case 'Social':
				return <Friends closeMenu={closeMenu} />;
		}
	};
	return (
		<div className={`nav-menu ${isMenuOpen ? 'open' : ''}`}>
			<div className='relative w-full md:h-9 h-12 mb-4'>
				<div className='inbox-tab__title bg-gray-200 rounded'>
					<p
						className='cursor-pointer h-full flex items-center justify-center'
						onClick={() => setCurrentTab('Social')}
					>
						Social
					</p>
					<p
						className='cursor-pointer h-full flex items-center justify-center'
						onClick={() => setCurrentTab('Lists')}
					>
						Lists
					</p>
				</div>
				<div
					className={`inbox-tab__title ${currentTab} text-white font-medium bg-red-500 rounded`}
				>
					<p className='cursor-default h-full flex items-center justify-center'>
						Social
					</p>
					<p className='cursor-default h-full flex items-center justify-center'>
						Lists
					</p>
				</div>
			</div>
			<div className='rounded overflow-hidden'>{renderTab()}</div>
		</div>
	);
}
