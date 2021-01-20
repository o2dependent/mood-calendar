import Link from 'next/link';
import React from 'react';

export default function AppMenu({ isMenuOpen }) {
	return (
		<div className={`nav-menu ${isMenuOpen ? 'open' : ''}`}>
			{[
				{ name: 'Messages', color: 'purple' },
				{ name: 'Friends', color: 'blue' },
				{ name: 'Lists', color: 'red' },
			].map((link) => (
				<Link key={link.name} href={`/app/${link.name.toLowerCase()}`}>
					<a className='flex justify-start items-center w-full h-9 p-1 rounded hover:bg-white'>
						<div
							className={`rounded-full ml-2 my-2 bg-${link.color}-500 h-4 w-4`}
						></div>
						<p className='ml-2 text-base'>{link.name}</p>
					</a>
				</Link>
			))}
		</div>
	);
}
