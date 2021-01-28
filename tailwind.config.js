module.exports = {
	darkMode: 'media',
	darkMode: 'class',
	purge: [
		'./pages/**/*.js',
		'./components/**/*.js',
		'./pages/**/*.tsx',
		'./components/**/*.tsx',
	],
	theme: {
		extend: {
			boxShadow: {
				md:
					// document.body.classList.contains('dark')?
					'hsl(215 28% 9% / 1) 2px 2px 5px, hsl(215 28% 25% / 1) -2px -2px 5px',
				// : '2px 2px 5px #b5b5b5, -2px -2px 5px #ffffff',
			},
			colors: {
				red: {
					500: '#FD3A69',
					600: '#FC0843',
				},
				blue: {
					900: '#0B0047',
				},
			},
		},
		minWidth: {
			'3/4': '75%',
			'9/10': '90%',
		},
	},
	variants: {
		extend: {},
	},
	plugins: [],
};
