import React, { useContext, useEffect, useState } from 'react';

const DarkModeContext = React.createContext(null);

type I_DarkMode = 'enabled' | 'disabled';

export function useDarkMode() {
	return useContext(DarkModeContext);
}

export function DarkModeProvider({ children }) {
	// --- hooks ---
	const [isDarkModeEnabled, setIsDarkModeEnabled] = useState<I_DarkMode>(
		'enabled'
	);
	// set initial dark mode based on client local storage
	useEffect(() => {
		// *** prevent dark mode while settings page is disabled ***
		// TODO: reinstate darkmode when setttings page is navigatable
		// const localDarkMode: I_DarkMode = getClientDarkMode();
		// setClientDarkMode(localDarkMode);
	}, []);

	// --- functions ---
	const getClientDarkMode = (): I_DarkMode => {
		const localDarkMode = localStorage.getItem('darkMode');
		if (localDarkMode === 'enabled' || localDarkMode === 'disabled') {
			return localDarkMode;
		} else {
			return 'enabled';
		}
	};

	function setClientDarkMode(newDarkMode: I_DarkMode) {
		setIsDarkModeEnabled(newDarkMode);
		localStorage.setItem('darkMode', newDarkMode);
		document.body.setAttribute(
			'class',
			newDarkMode === 'enabled' ? 'dark' : ''
		);
	}

	const value = { setClientDarkMode, isDarkModeEnabled };

	return (
		<DarkModeContext.Provider value={value}>
			{children}
		</DarkModeContext.Provider>
	);
}
