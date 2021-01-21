import React, { useState } from 'react';

export default function inbox() {
	// --- hooks ---
	const [currentTab, setCurrentTab] = useState<'Recent' | 'Friends'>('Recent');
	const [isTabOpen, setIsTabOpen] = useState(true);

	// --- functions ---
	const renderTab = () => {
		switch (currentTab) {
			case 'Recent':
				return <div></div>;
			case 'Friends':
				return <div></div>;
		}
	};

	return (
		<>
			{/* Side menu */}
			<div className={`inbox-tab ${isTabOpen ? 'open' : ''}`}>
				<div className='relative w-full h-9 mb-4'>
					<div className='inbox-tab__title bg-gray-50'>
						<p
							className='cursor-pointer'
							onClick={() => setCurrentTab('Recent')}
						>
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
						className={`inbox-tab__title ${currentTab} text-white bg-red-500 rounded`}
					>
						<p className='cursor-default'>Recent</p>
						<p className='cursor-default'>Friends</p>
					</div>
				</div>
				<div className='h-full w-full'>
					<button onClick={() => setIsTabOpen(!isTabOpen)}>Close</button>
				</div>
				{renderTab()}
			</div>
			{/* Friend messages */}
			<div className={`inbox-main ${isTabOpen ? 'open' : ''}`}>
				<button onClick={() => setIsTabOpen(!isTabOpen)}>Close</button>
			</div>
		</>
	);
}
