import React, { useEffect } from 'react';
import { useDarkMode } from '../../context/DarkModeContext';

export default function settings() {
	// --- hooks ---
	const { setClientDarkMode, isDarkModeEnabled } = useDarkMode();

	// --- functions ---
	function toggleDarkMode() {
		console.log(isDarkModeEnabled);
		setClientDarkMode(isDarkModeEnabled === 'enabled' ? 'disabled' : 'enabled');
	}

	return (
		<div>
			<button onClick={toggleDarkMode}>
				{isDarkModeEnabled === 'enabled' ? 'Disable ' : 'Enable '}dark mode
			</button>
		</div>
	);
}
