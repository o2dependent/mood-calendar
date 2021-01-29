import React from 'react';

export default function settings() {
	// --- functions ---
	const isDarkMode = () => document.body.classList.contains('dark');
	function toggleDarkMode() {
		document.body.setAttribute('class', isDarkMode() ? '' : 'dark');
	}

	return (
		<div>
			<button onClick={toggleDarkMode}>
				{isDarkMode() ? 'Disable ' : 'Enable '}dark mode
			</button>
		</div>
	);
}
