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
		<div
			className={`nav-menu dark:bg-gray-800 top-0 md:top-auto overflow-y-scroll ${
				isMenuOpen ? 'open' : ''
			}`}
		>
			<div>
				<button onClick={closeMenu}>close</button>
				<Link href='/app/settings'>
					<a onClick={closeMenu}>Settings</a>
				</Link>
			</div>
			<div className='relative w-full md:h-9 h-12 mb-4'>
				<div className='inbox-tab__title dark:shadow-inner   bg-gray-200 dark:bg-gray-900 dark:text-gray-400 rounded'>
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
					className={`inbox-tab__title dark:shadow-md-dark ${currentTab} text-white font-medium bg-red-500 rounded`}
				>
					<p className='cursor-default h-full flex items-center justify-center'>
						Social
					</p>
					<p className='cursor-default h-full flex items-center justify-center'>
						Lists
					</p>
				</div>
			</div>
			<div></div>
			<div className=''>{renderTab()}</div>
		</div>
	);
}
